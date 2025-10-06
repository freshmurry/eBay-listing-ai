// Stripe integration utilities
export const STRIPE_PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: null,
    features: [
      '5 listings per month',
      'Basic AI descriptions',
      'Standard templates',
      'Email support'
    ],
    limits: {
      listings: 5,
      aiRequests: 10,
      templates: 3
    }
  },
  pro: {
    id: 'price_pro_monthly', // Would be actual Stripe price ID
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
    id: 'price_enterprise_monthly',
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
    const user = JSON.parse(localStorage.getItem('mockUser') || '{}');
    const result = await mockStripe.createCheckoutSession(planId, user.id);
    
    if (result.success) {
      // In a real app, redirect to Stripe checkout
      // window.location.href = result.session.url;
      
      // For demo, simulate successful payment
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
      
      // Redirect to success page
      window.location.href = '/dashboard?upgrade=success';
      
      return result;
    }
    
    throw new Error('Failed to create checkout session');
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

// Helper to get user's current subscription
export const getCurrentSubscription = async (userId) => {
  const result = await mockStripe.getSubscriptions(userId);
  if (result.success && result.subscriptions.length > 0) {
    return result.subscriptions[0];
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