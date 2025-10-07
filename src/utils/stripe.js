// Stripe integration utilities
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
// In production, this should come from environment variables
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51SFN0BExOSz5XG4RkkusBe4E9IEsic1Vj8fSulQE7JKirV7kR9n0Z4FTYRHId04zFaqcLHekQt90s3QiK7bRAKw400pfaI5RKD';
let stripePromise;

// Initialize Stripe
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};
export const STRIPE_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: null,
    features: [
      '3 listing descriptions total',
      'Basic AI descriptions',
      'Standard templates',
      'Email support'
    ],
    limits: {
      listings: 3,
      aiRequests: 10,
      templates: 3
    }
  },
  pro: {
    id: 'price_1QCexaExOSz5XG4R12345678', // Replace with your actual Stripe Price ID
    name: 'Pro',
    price: 29,
    interval: 'month',
    features: [
      '100 listings per month',
      'Advanced AI descriptions',
      'Premium templates',
      'Priority support',
      'Bulk operations',
      'Analytics dashboard'
    ],
    limits: {
      listings: 100,
      aiRequests: 200,
      templates: 10
    }
  },
  enterprise: {
    id: 'price_1QCexbExOSz5XG4R87654321', // Replace with your actual Stripe Price ID
    name: 'Enterprise',
    price: 99,
    interval: 'month',
    features: [
      'Unlimited listings',
      'Custom AI training',
      'White-label solution',
      '24/7 phone support',
      'API access',
      'Custom integrations',
      'Dedicated account manager'
    ],
    limits: {
      listings: -1, // unlimited
      aiRequests: -1,
      templates: -1
    }
  }
};

// Mock Stripe integration for demo
export const mockStripe = {
  createCheckoutSession: async (planId, customerId = null) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const plan = Object.values(STRIPE_PLANS).find(p => p.id === planId);
    if (!plan) {
      throw new Error('Plan not found');
    }
    
    // In real Stripe integration, this would create an actual checkout session
    const mockSession = {
      id: `cs_${Date.now()}`,
      url: `https://checkout.stripe.com/pay/mock-session-${planId}`,
      success_url: `${window.location.origin}/dashboard?success=true`,
      cancel_url: `${window.location.origin}/pricing?canceled=true`,
      payment_status: 'unpaid',
      amount_total: plan.price * 100, // Stripe uses cents
      currency: 'usd',
      mode: 'subscription',
      metadata: {
        planId: planId,
        customerId: customerId
      }
    };
    
    return { session: mockSession, success: true };
  },
  
  createCustomerPortalSession: async (customerId) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      url: `https://billing.stripe.com/p/session/mock-portal-${customerId}`,
      success: true
    };
  },
  
  getSubscriptions: async (customerId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock subscription data
    const mockSubscription = localStorage.getItem(`subscription_${customerId}`);
    if (mockSubscription) {
      return { subscriptions: [JSON.parse(mockSubscription)], success: true };
    }
    
    return { subscriptions: [], success: true };
  },
  
  cancelSubscription: async (subscriptionId) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock cancellation
    return {
      subscription: {
        id: subscriptionId,
        status: 'canceled',
        canceled_at: new Date().toISOString()
      },
      success: true
    };
  }
};

// Helper function to initiate Stripe checkout
export const initiateCheckout = async (planId) => {
  try {
    // Get user information
    const user = JSON.parse(localStorage.getItem('mockUser') || '{}');
    
    if (!user.id) {
      throw new Error('User not authenticated');
    }

    // Find the selected plan
    const plan = Object.values(STRIPE_PLANS).find(p => p.id === planId);
    if (!plan) {
      throw new Error('Invalid plan selected');
    }

    // Initialize Stripe
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }

    // For development/demo mode, use mock checkout only if no real Stripe key is configured
    if (STRIPE_PUBLISHABLE_KEY.includes('your_stripe_publishable_key_here')) {
      console.log('Running in demo mode - using mock checkout (no real Stripe key configured)');
      return await mockCheckout(planId, user);
    }

    console.log('Using real Stripe checkout with key:', STRIPE_TEST_PUBLISHABLE_KEY.substring(0, 20) + '...');

    // TEMPORARY: For testing without backend, create a simple Stripe checkout
    // In production, you would call your backend API here
    try {
      // Create a simple test checkout session directly with Stripe
      // Note: This is a simplified approach for testing
      console.log('Creating direct Stripe checkout for plan:', plan.name);
      
      // For now, let's simulate the Stripe checkout process
      // You can replace this with your actual backend call when ready
      
      // Redirect to Stripe's test checkout (you'll need to set this up)
      // This is just for demonstration - normally your backend creates the session
      alert(`Testing Stripe checkout for ${plan.name} plan ($${plan.price}/month)\n\nTo complete setup:\n1. Create prices in Stripe Dashboard\n2. Replace price IDs in stripe.js\n3. Set up backend endpoint\n\nFor now, using mock checkout...`);
      
      // Fall back to mock for testing
      return await mockCheckout(planId, user);
      
    } catch (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }

    // Real Stripe integration
    // Create checkout session on your backend
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: planId,
        customerId: user.id,
        customerEmail: user.email,
        successUrl: `${window.location.origin}/dashboard?upgrade=success`,
        cancelUrl: `${window.location.origin}/pricing?upgrade=cancelled`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

// Mock checkout for development/demo
const mockCheckout = async (planId, user) => {
  try {
    const result = await mockStripe.createCheckoutSession(planId, user.id);
    
    if (result.success) {
      // For demo, simulate successful payment after a brief delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const plan = Object.values(STRIPE_PLANS).find(p => p.id === planId);
      const mockSubscription = {
        id: `sub_${Date.now()}`,
        customer: user.id,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        plan: plan,
        created: new Date().toISOString()
      };
      
      // Save mock subscription
      localStorage.setItem(`subscription_${user.id}`, JSON.stringify(mockSubscription));
      
      // Update user's subscription status
      const updatedUser = { ...user, subscription: planId };
      localStorage.setItem('mockUser', JSON.stringify(updatedUser));
      
      // Fire custom event for subscription update
      window.dispatchEvent(new CustomEvent('subscriptionUpdated', { 
        detail: mockSubscription 
      }));
      
      // Redirect to success page
      window.location.href = '/dashboard?upgrade=success';
      
      return result;
    }
    
    throw new Error('Failed to create checkout session');
  } catch (error) {
    console.error('Mock checkout error:', error);
    throw error;
  }
};

// Helper to access Stripe Customer Portal
export const accessCustomerPortal = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('mockUser') || '{}');
    
    if (!user.id) {
      throw new Error('User not authenticated');
    }

    // For development/demo mode, use mock portal
    if (STRIPE_PUBLISHABLE_KEY.includes('your_stripe_publishable_key_here') || import.meta.env.DEV) {
      console.log('Running in demo mode - using mock customer portal');
      const result = await mockStripe.createPortalSession(user.id);
      if (result.success) {
        // For demo, redirect to billing info page or show modal
        window.location.href = '/account-settings?tab=billing';
      }
      return result;
    }

    // Real Stripe Customer Portal
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: user.stripeCustomerId, // This should be stored when user first subscribes
        returnUrl: `${window.location.origin}/account-settings`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }

    const { url } = await response.json();
    window.location.href = url;

    return { success: true };
  } catch (error) {
    console.error('Customer portal error:', error);
    throw error;
  }
};

// Helper to get user's current subscription
export const getCurrentSubscription = async (userId) => {
  // Check for local mock subscription first
  const mockSub = localStorage.getItem(`subscription_${userId}`);
  if (mockSub) {
    return JSON.parse(mockSub);
  }

  // For real implementation, fetch from your backend
  if (!STRIPE_PUBLISHABLE_KEY.includes('your_stripe_publishable_key_here') && !import.meta.env.DEV) {
    try {
      const response = await fetch(`/api/subscription/${userId}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  }

  return null;
};

// Helper to check if user has access to a feature
export const hasFeatureAccess = (userPlan, requiredPlan) => {
  const planHierarchy = ['free', 'pro', 'enterprise'];
  const userIndex = planHierarchy.indexOf(userPlan);
  const requiredIndex = planHierarchy.indexOf(requiredPlan);
  
  return userIndex >= requiredIndex;
};

// Helper to get usage limits for current plan
export const getPlanLimits = (planId) => {
  const plan = Object.values(STRIPE_PLANS).find(p => p.id === planId);
  return plan ? plan.limits : STRIPE_PLANS.free.limits;
};