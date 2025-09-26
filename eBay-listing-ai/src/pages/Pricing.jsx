
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { User } from "@/api/entities";
import { UserSubscription } from "@/api/entities";


const plans = [
  {
    id: "FREE",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    listings: 1,
    features: [
      "1 listing per month",
      "Basic AI copywriting",
      "Standard templates",
      "Email support"
    ],
    limitations: [
      "Limited SEO optimization",
      "No priority support",
      "Basic image handling"
    ],
    popular: false
  },
  {
    id: "BASIC",
    name: "Basic",
    monthlyPrice: 9,
    yearlyPrice: 90,
    listings: 10,
    features: [
      "10 listings per month",
      "Advanced AI copywriting",
      "SEO optimization",
      "Image management",
      "Priority email support"
    ],
    popular: false
  },
  {
    id: "STANDARD",
    name: "Standard",
    monthlyPrice: 19,
    yearlyPrice: 190,
    listings: 20,
    features: [
      "20 listings per month",
      "Advanced AI copywriting",
      "Full SEO optimization",
      "Advanced image management",
      "Priority support",
      "Competitor analysis",
      "Optimal timing suggestions"
    ],
    popular: true
  },
  {
    id: "PREMIUM",
    name: "Premium",
    monthlyPrice: 49,
    yearlyPrice: 490,
    listings: 9999, // Using a high number for "Unlimited"
    features: [
      "Unlimited listings",
      "Premium AI copywriting",
      "Advanced SEO & analytics",
      "Bulk listing tools",
      "Priority phone support",
      "Custom templates",
      "API access",
      "White-label options"
    ],
    popular: false
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        if (currentUser) {
          // Assuming user.email is the identifier for created_by
          const [subData] = await UserSubscription.filter({ created_by: currentUser.email }, "-created_date", 1);
          setSubscription(subData);
        }
      } catch (error) {
        // Not logged in or error fetching user/subscription, proceed without user data
        console.error("Failed to load user or subscription data:", error);
      }
    };
    loadData();
  }, []);

  const handlePlanSelection = async (newPlan) => {
    if (!user) {
      // Redirect to login page, then back to pricing after login
      window.location.href = '/auth/login?redirect=' + encodeURIComponent(createPageUrl('Pricing'));
      return;
    }

    if (subscription?.plan === newPlan.id) {
        // Already on this plan, do nothing
        return;
    }
    
    const currentPlanIndex = plans.findIndex(p => p.id === subscription?.plan);
    const newPlanIndex = plans.findIndex(p => p.id === newPlan.id);
    const isDowngrade = currentPlanIndex > newPlanIndex;

    const confirmationMessage = isDowngrade
        ? `You are about to change your plan to the ${newPlan.name} plan. Do you want to continue?`
        : `You are about to upgrade to the ${newPlan.name} plan for $${isYearly ? newPlan.yearlyPrice : newPlan.monthlyPrice}${isYearly ? '/year' : '/month'}. Do you want to continue?`;

    if (!confirm(confirmationMessage)) {
      return;
    }

    try {
      const renewalDate = new Date();
      renewalDate.setMonth(renewalDate.getMonth() + 1); // Set to next month for monthly renewal

      const subscriptionData = {
        plan: newPlan.id,
        listingsLimit: newPlan.listings,
        renewalDate: renewalDate.toISOString().split('T')[0] // Format YYYY-MM-DD
      };

      if (subscription) {
        await UserSubscription.update(subscription.id, subscriptionData);
      } else {
        await UserSubscription.create({
          ...subscriptionData,
          created_by: user.email, // Assign current user as creator
          listingsUsed: 0,
          status: 'ACTIVE'
        });
      }

      alert(`Successfully ${subscription ? 'updated' : 'subscribed to'} the ${newPlan.name} plan!`);
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Subscription operation failed:", error);
      alert("An error occurred while updating your subscription. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                <i className="bi bi-stars text-xl text-white"></i>
              </div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">eBay DescriptionAI</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link to={createPageUrl("Home")}>
                <Button variant="ghost">Home</Button>
              </Link>
              <Button variant="outline" onClick={() => window.location.href = '/auth/login'}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your eBay business. Upgrade, downgrade, or cancel anytime.
            </p>
            
            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${!isYearly ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)]'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-brand-primary"
              />
              <span className={`text-lg ${isYearly ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)]'}`}>
                Yearly
              </span>
              <Badge className="bg-green-100 text-green-800 ml-2">Save 20%</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative bg-white border-[var(--border-color)] hover:shadow-xl transition-all duration-300 flex flex-col ${
                  subscription?.plan === plan.id ? 'border-brand-primary shadow-lg scale-105' : ''
                }`}
              >
                {subscription?.plan === plan.id && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brand-primary text-white px-4">Current Plan</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-[var(--text-primary)]">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </div>
                    <div className="text-[var(--text-secondary)] text-sm">
                      {isYearly ? '/year' : '/month'}
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-brand-primary">
                    {plan.listings === 9999 ? 'Unlimited listings' : `${plan.listings} listings`}
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-8 flex-grow flex flex-col">
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <i className="bi bi-check-circle-fill text-green-500 mt-0.5"></i>
                        <span className="text-[var(--text-secondary)] text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <i className="bi bi-x-circle-fill text-red-400 mt-0.5"></i>
                        <span className="text-[var(--text-secondary)] text-sm line-through opacity-60">{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      subscription?.plan === plan.id
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-brand-primary hover:bg-brand-primary-hover text-white'
                        : 'bg-white hover:bg-slate-50 text-[var(--text-primary)] border border-[var(--border-color)]'
                    }`}
                    onClick={() => handlePlanSelection(plan)}
                    disabled={subscription?.plan === plan.id}
                  >
                    {subscription?.plan === plan.id ? 'Current Plan' : plan.id === 'FREE' ? 'Get Started' : `Upgrade to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white border-[var(--border-color)]">
                <CardHeader>
                  <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-secondary)]">
                    Yes! You can upgrade, downgrade, or cancel your subscription at any time. 
                    Changes take effect immediately, and you'll only pay the prorated difference.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[var(--border-color)]">
                <CardHeader>
                  <CardTitle className="text-lg">Do unused listings roll over?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-secondary)]">
                    Listings reset each month and don't roll over. However, all your created 
                    listings remain saved in your account forever, regardless of your plan.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[var(--border-color)]">
                <CardHeader>
                  <CardTitle className="text-lg">Is there a free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-secondary)]">
                    Our Free plan gives you 1 listing per month forever. You can also 
                    start any paid plan with a 7-day free trial to test all premium features.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[var(--border-color)]">
                <CardHeader>
                  <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-secondary)]">
                    We accept all major credit cards (Visa, Mastercard, American Express) 
                    and PayPal through our secure Stripe payment processor.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
