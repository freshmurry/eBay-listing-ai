import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Zap, Star, Crown, Loader2, ArrowRight } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { STRIPE_PLANS, initiateCheckout, getCurrentSubscription } from "@/utils/stripe";
import { base44 } from "@/api/base44Client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const pricingTiers = [
  {
    id: 'free',
    name: "Free",
    description: "Perfect for getting started",
    price: { monthly: 0, yearly: 0 },
    icon: Zap,
    features: [
      "5 AI-generated descriptions per month",
      "Basic SEO optimization", 
      "Standard templates",
      "Email support",
      "Basic browser rendering",
    ],
    limitations: [
      "Limited AI requests",
      "Basic templates only",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    id: 'price_pro_monthly',
    name: "Pro",
    description: "Ideal for regular sellers",
    price: { monthly: 29, yearly: 290 },
    icon: Star,
    features: [
      "100 AI-generated descriptions per month",
      "Advanced SEO optimization",
      "Premium templates",
      "Priority email support",
      "Advanced browser rendering",
      "Detailed analytics & insights",
      "Bulk operations",
      "A/B testing tools",
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    id: 'price_enterprise_monthly', 
    name: "Enterprise",
    description: "For high-volume sellers",
    price: { monthly: 99, yearly: 990 },
    icon: Crown,
    features: [
      "Unlimited AI-generated descriptions",
      "Custom AI training",
      "White-label solution", 
      "24/7 phone support",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Custom templates",
      "Priority processing",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and you'll be prorated for any difference in cost."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All paid plans include a 14-day free trial. You can cancel anytime during the trial period without being charged."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal through our secure Stripe integration."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund."
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [user, setUser] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      
      if (currentUser) {
        const subscription = await getCurrentSubscription(currentUser.id);
        setCurrentSubscription(subscription);
      }
    };
    checkAuth();
  }, []);

  const handleSubscribe = async (tier) => {
    if (tier.id === 'free') {
      // Handle free plan signup
      if (!user) {
        navigate('/Signup');
        return;
      }
      // User already has access to free plan
      navigate('/Dashboard');
      return;
    }

    if (tier.name === 'Enterprise') {
      // Handle enterprise contact
      window.location.href = 'mailto:sales@example.com?subject=Enterprise Plan Inquiry';
      return;
    }

    if (!user) {
      // Redirect to signup for paid plans
      navigate('/Signup');
      return;
    }

    try {
      setIsLoading(true);
      setLoadingPlan(tier.id);
      await initiateCheckout(tier.id);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to start checkout process. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingPlan(null);
    }
  };

  const isCurrentPlan = (planId) => {
    if (!currentSubscription) {
      return planId === 'free';
    }
    return currentSubscription.plan?.id === planId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Pricing Plans - eBay Listing AI | Choose Your Perfect Plan"
        description="Choose from flexible pricing plans for eBay Listing AI. Start free or upgrade to Premium for unlimited listings, advanced analytics, and priority support. 30-day money-back guarantee."
        keywords="eBay Listing AI pricing, subscription plans, premium features, free trial, eBay automation pricing"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-pricing.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Pricing"
      />
      <Navigation />
      
      {/* Success Messages */}
      {searchParams.get('upgrade') === 'success' && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="container mx-auto px-4 py-3">
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                🎉 <strong>Welcome to your new plan!</strong> Your upgrade was successful. You now have access to all premium features.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Choose the perfect plan for your eBay selling needs. All plans include our core AI features with no hidden fees.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isYearly ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isYearly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly <Badge variant="secondary" className="ml-1">Save 17%</Badge>
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => {
            const IconComponent = tier.icon;
            const price = isYearly ? tier.price.yearly : tier.price.monthly;
            const currentPlan = isCurrentPlan(tier.id);
            
            return (
              <Card 
                key={tier.name} 
                className={`relative ${tier.popular ? 'border-blue-500 shadow-lg scale-105' : ''} ${currentPlan ? 'border-green-500' : ''}`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                    Most Popular
                  </Badge>
                )}
                {currentPlan && (
                  <Badge className="absolute -top-3 right-4 bg-green-600 text-white">
                    Current Plan
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">${price}</span>
                    {price > 0 && <span className="text-gray-600">/{isYearly ? 'year' : 'month'}</span>}
                    {isYearly && price > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Save ${tier.price.monthly * 12 - tier.price.yearly} yearly
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button
                    onClick={() => handleSubscribe(tier)}
                    disabled={isLoading || currentPlan}
                    className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : ''} ${currentPlan ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    {isLoading && loadingPlan === tier.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : currentPlan ? (
                      'Current Plan'
                    ) : (
                      <>
                        {tier.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            All plans include
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">AI-Powered Descriptions</h4>
              <p className="text-sm text-gray-600">Generate compelling, SEO-optimized listing descriptions</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Template Library</h4>
              <p className="text-sm text-gray-600">Professional templates for every product category</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Crown className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Browser Rendering</h4>
              <p className="text-sm text-gray-600">Extract product details from any URL automatically</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to supercharge your eBay descriptions?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of sellers who are already using AI to create better descriptions faster.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button size="lg" onClick={() => navigate('/Signup')} className="bg-blue-600 hover:bg-blue-700">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/Dashboard">View Demo</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}