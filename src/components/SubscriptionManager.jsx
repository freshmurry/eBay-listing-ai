import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Crown, Zap, Star, Check, X, ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import { STRIPE_PLANS, getPlanLimits, initiateCheckout } from "@/utils/stripe";
import { base44 } from "@/api/base44Client";

// Subscription context and hook
export const SubscriptionContext = React.createContext({
  subscription: null,
  usage: null,
  checkUsageLimit: () => false,
  incrementUsage: () => {},
  showUpgradeModal: false,
  setShowUpgradeModal: () => {}
});

export const useSubscription = () => {
  const context = React.useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};

// Subscription Provider Component
export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState(null);
  const [user, setUser] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserAndSubscription();
  }, []);

  const loadUserAndSubscription = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      
      if (currentUser) {
        await loadSubscriptionData(currentUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    setIsLoading(false);
  };

  const loadSubscriptionData = async (currentUser) => {
    // Get or create subscription data
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    const storedSubscription = localStorage.getItem(`subscription_${currentUser.id}`);
    const storedUsage = localStorage.getItem(`usage_${currentUser.id}_${currentMonth}`);
    
    let subscriptionData = {
      userId: currentUser.id,
      plan: currentUser.subscription || 'free',
      status: 'active',
      createdAt: currentUser.createdAt || new Date().toISOString(),
      currentPeriodStart: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(),
      currentPeriodEnd: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString()
    };
    
    if (storedSubscription) {
      subscriptionData = { ...subscriptionData, ...JSON.parse(storedSubscription) };
    }
    
    let usageData = {
      userId: currentUser.id,
      month: currentMonth,
      listingsGenerated: 0,
      aiRequestsMade: 0,
      lastReset: new Date(today.getFullYear(), today.getMonth(), 1).toISOString()
    };
    
    if (storedUsage) {
      usageData = { ...usageData, ...JSON.parse(storedUsage) };
    }
    
    // Save to localStorage
    localStorage.setItem(`subscription_${currentUser.id}`, JSON.stringify(subscriptionData));
    localStorage.setItem(`usage_${currentUser.id}_${currentMonth}`, JSON.stringify(usageData));
    
    setSubscription(subscriptionData);
    setUsage(usageData);
  };

  const checkUsageLimit = (type = 'listings') => {
    if (!subscription || !usage) return false;
    
    const limits = getPlanLimits(subscription.plan);
    
    switch (type) {
      case 'listings':
        return limits.listings === -1 ? false : usage.listingsGenerated >= limits.listings;
      case 'aiRequests':
        return limits.aiRequests === -1 ? false : usage.aiRequestsMade >= limits.aiRequests;
      default:
        return false;
    }
  };

  const incrementUsage = async (type = 'listings', amount = 1) => {
    if (!user || !usage) return;
    
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    const updatedUsage = { ...usage };
    
    switch (type) {
      case 'listings':
        updatedUsage.listingsGenerated += amount;
        break;
      case 'aiRequests':
        updatedUsage.aiRequestsMade += amount;
        break;
    }
    
    updatedUsage.lastUpdated = new Date().toISOString();
    
    localStorage.setItem(`usage_${user.id}_${currentMonth}`, JSON.stringify(updatedUsage));
    setUsage(updatedUsage);
  };

  const contextValue = {
    subscription,
    usage,
    user,
    isLoading,
    checkUsageLimit,
    incrementUsage,
    showUpgradeModal,
    setShowUpgradeModal,
    loadUserAndSubscription
  };

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
      <UpgradeModal />
    </SubscriptionContext.Provider>
  );
};

// Usage Limit Guard Component
export const UsageLimitGuard = ({ children, type = 'listings', onLimitReached }) => {
  const { checkUsageLimit, setShowUpgradeModal } = useSubscription();
  
  const handleClick = (e) => {
    if (checkUsageLimit(type)) {
      e.preventDefault();
      e.stopPropagation();
      if (onLimitReached) {
        onLimitReached();
      } else {
        setShowUpgradeModal(true);
      }
      return false;
    }
  };
  
  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
};

// Upgrade Modal Component
const UpgradeModal = () => {
  const { showUpgradeModal, setShowUpgradeModal, subscription, usage } = useSubscription();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingTiers = [
    {
      id: 'price_pro_monthly',
      name: "Pro",
      price: 29,
      icon: Star,
      features: [
        "100 AI-generated descriptions/month",
        "Advanced SEO optimization",
        "Premium templates",
        "Priority support",
        "Bulk operations",
        "Analytics dashboard"
      ],
      popular: true,
    },
    {
      id: 'price_enterprise_monthly',
      name: "Enterprise", 
      price: 99,
      icon: Crown,
      features: [
        "Unlimited descriptions",
        "Custom AI training",
        "White-label solution",
        "24/7 phone support",
        "API access",
        "Custom integrations"
      ],
      popular: false,
    }
  ];

  const handleUpgrade = async (tier) => {
    setIsLoading(true);
    setSelectedPlan(tier.id);
    
    try {
      await initiateCheckout(tier.id);
    } catch (error) {
      console.error('Upgrade failed:', error);
      alert('Failed to start upgrade process. Please try again.');
    }
    
    setIsLoading(false);
    setSelectedPlan(null);
  };

  if (!subscription || !usage) return null;

  const limits = getPlanLimits(subscription.plan);
  const usagePercentage = limits.listings === -1 ? 0 : (usage.listingsGenerated / limits.listings) * 100;

  return (
    <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🚀 Upgrade Your Plan
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            You've reached your limit. Upgrade to continue creating amazing listings!
          </DialogDescription>
        </DialogHeader>

        {/* Current Usage */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Current Plan: {STRIPE_PLANS[subscription.plan]?.name || 'Free'}</span>
            <Badge variant="outline">{subscription.plan}</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Listings used</span>
              <span>{usage.listingsGenerated} / {limits.listings === -1 ? '∞' : limits.listings}</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>
        </div>

        {/* Upgrade Options */}
        <div className="grid gap-6 md:grid-cols-2">
          {pricingTiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedPlan === tier.id;
            const isLoadingThis = isLoading && isSelected;
            
            return (
              <Card key={tier.id} className={`relative ${tier.popular ? 'border-blue-500 shadow-lg' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-3 py-1">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold">${tier.price}<span className="text-lg font-normal text-slate-600">/mo</span></div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleUpgrade(tier)}
                    disabled={isLoading}
                    className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    {isLoadingThis ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Upgrade to {tier.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-6 border-t">
          <p className="text-sm text-slate-600 mb-4">
            Need a custom solution? <button 
              onClick={() => window.location.href = createPageUrl("Contact")} 
              className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
            >
              Contact our sales team
            </button>
          </p>
          <p className="text-xs text-slate-500">
            All plans include a 30-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionProvider;