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
import { useTranslation } from 'react-i18next';

export default function Pricing() {
  const { t } = useTranslation();
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [user, setUser] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pricingTiers = [
    {
      id: 'free',
      name: t('pricing.plans.free.name'),
      description: t('pricing.plans.free.description'),
      price: { monthly: 0, yearly: 0 },
      icon: Zap,
      features: t('pricing.plans.free.features', { returnObjects: true }),
      limitations: [],
      cta: t('pricing.plans.free.cta'),
      popular: false,
    },
    {
      id: 'price_pro_monthly',
      name: t('pricing.plans.pro.name'),
      description: t('pricing.plans.pro.description'),
      price: { monthly: 29, yearly: 290 },
      icon: Star,
      features: t('pricing.plans.pro.features', { returnObjects: true }),
      limitations: [],
      cta: t('pricing.plans.pro.cta'),
      popular: true,
    },
    {
      id: 'price_enterprise_monthly', 
      name: t('pricing.plans.enterprise.name'),
      description: t('pricing.plans.enterprise.description'),
      price: { monthly: 99, yearly: 990 },
      icon: Crown,
      features: t('pricing.plans.enterprise.features', { returnObjects: true }),
      limitations: [],
      cta: t('pricing.plans.enterprise.cta'),
      popular: false,
    },
  ];

  const faqs = t('pricing.faq.questions', { returnObjects: true });

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
    // Handle free plan
    if (tier.id === 'free') {
      if (!user) {
        navigate('/Signup');
        return;
      }
      // User already has access to free plan
      navigate('/Dashboard');
      return;
    }

    // Handle enterprise plan - contact sales
    if (tier.name === 'Enterprise') {
      window.location.href = 'mailto:sales@ebaylistingai.com?subject=Enterprise Plan Inquiry&body=Hi, I\'m interested in learning more about the Enterprise plan. Please contact me with more details.';
      return;
    }

    // Require authentication for paid plans
    if (!user) {
      // Store intended plan in sessionStorage for after signup
      sessionStorage.setItem('intendedPlan', tier.id);
      navigate('/Signup?upgrade=true');
      return;
    }

    try {
      setIsLoading(true);
      setLoadingPlan(tier.id);
      
      // Show user-friendly loading message
      console.log(`Initiating checkout for ${tier.name} plan...`);
      
      await initiateCheckout(tier.id);
      
      // Note: If we reach here in real Stripe integration, 
      // it means there was an error since successful checkout redirects away
      
    } catch (error) {
      console.error('Checkout failed:', error);
      
      // Show user-friendly error message
      let errorMessage = 'Failed to start checkout process. Please try again.';
      
      if (error.message.includes('authentication')) {
        errorMessage = 'Please log in to upgrade your plan.';
      } else if (error.message.includes('Stripe')) {
        errorMessage = 'Payment system is currently unavailable. Please try again later.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      // In a real app, you might want to use a toast notification instead of alert
      alert(errorMessage);
      
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
            <span className={`text-sm ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>{t('pricing.monthly')}</span>
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
              {t('pricing.yearly')} <Badge variant="secondary" className="ml-1">{t('pricing.save')}</Badge>
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
                    {t('pricing.mostPopular')}
                  </Badge>
                )}
                {currentPlan && (
                  <Badge className="absolute -top-3 right-4 bg-green-600 text-white">
                    {t('pricing.currentPlan')}
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
                    {price > 0 && <span className="text-gray-600">/{isYearly ? t('pricing.year') : t('pricing.month')}</span>}
                    {isYearly && price > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        {t('pricing.saveYearly', { amount: tier.price.monthly * 12 - tier.price.yearly })}
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
                        {t('pricing.processing')}
                      </>
                    ) : currentPlan ? (
                      t('pricing.currentPlan')
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
            {t('pricing.allPlansInclude.title')}
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">{t('pricing.allPlansInclude.aiDescriptions.title')}</h4>
              <p className="text-sm text-gray-600">{t('pricing.allPlansInclude.aiDescriptions.description')}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">{t('pricing.allPlansInclude.templates.title')}</h4>
              <p className="text-sm text-gray-600">{t('pricing.allPlansInclude.templates.description')}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Crown className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">{t('pricing.allPlansInclude.browserRendering.title')}</h4>
              <p className="text-sm text-gray-600">{t('pricing.allPlansInclude.browserRendering.description')}</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {t('pricing.faq.title')}
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
            {t('pricing.cta.title')}
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            {t('pricing.cta.subtitle')}
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button size="lg" onClick={() => navigate('/Signup')} className="bg-blue-600 hover:bg-blue-700">
              {t('pricing.cta.startTrial')}
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/Dashboard">{t('pricing.cta.viewDemo')}</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}