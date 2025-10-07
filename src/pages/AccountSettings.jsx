import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User, UserSubscription, SellerProfile } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { useSubscription } from "@/components/SubscriptionManager";
import { STRIPE_PLANS, getPlanLimits } from "@/utils/stripe";
import { UploadFile } from "@/api/integrations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from 'react-i18next';

const planDetails = {
  FREE: { name: "Free", price: "$0/mo" },
  BASIC: { name: "Basic", price: "$9/mo" },
  STANDARD: { name: "Standard", price: "$19/mo" },
  PREMIUM: { name: "Premium", price: "$49/mo" },
};

export default function AccountSettings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const { subscription, usage } = useSubscription();
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        setUser(currentUser);

        if (currentUser) {
          setFullName(currentUser.full_name || "");
          setProfileImage(currentUser.profile_image || "");
          const [profileData] = await SellerProfile.filter({ created_by: currentUser.email }, "-created_date", 1);
          setProfile(profileData);
          setStoreName(profileData?.storeName || "");
        }
      } catch (error) {
        console.error("Error loading account data:", error);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

    const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Please select an image file");
      return;
    }

    setIsUploadingImage(true);
    
    try {
      // Create blob URL for immediate preview (works better than API call)
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      
      // In a real app, you would also upload to your server here:
      // const result = await UploadFile({ file: file });
      // if (result.success) {
      //   setProfileImage(result.url); // Use server URL instead of blob
      // }
      
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpgradeClick = () => {
    // Instead of navigating to pricing page directly, call your backend endpoint
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'your_stripe_price_id', // Pass the selected plan's price ID
      }),
    })
      .then(res => res.json())
      .then(data => {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      });
  };

  const handleProfileSave = async () => {
    if (!user) {
      alert("No user data available. Please try logging in again.");
      return;
    }
    
    setIsSaving(true);
    try {
      const updates = { 
        full_name: fullName,
        profile_image: profileImage
      };
      
      console.log('Saving profile with updates:', updates);
      const result = await User.updateMyUserData(updates);
      console.log('Profile update result:', result);
      
      if (!result || !result.success) {
        throw new Error(result?.error || 'Update failed with no success flag');
      }
      
      // Update local state with the returned user data
      setUser(result.user);
      
      // Update localStorage
      const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
      Object.assign(userData, result.user);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Trigger window event to update navbar
      window.dispatchEvent(new Event('userProfileUpdated'));

      // Update seller profile if needed
      if (profile && storeName !== profile.storeName) {
        console.log('Updating seller profile store name');
        await SellerProfile.update(profile.id, { storeName });
      } else if (storeName && !profile) {
        console.log('Creating new seller profile');
        await SellerProfile.create({ storeName, created_by: user.email });
      }
      
      alert("Profile updated successfully!");
      console.log('Profile saved successfully');
    } catch (error) {
      console.error("Failed to save profile:", error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to save profile.';
      if (error.message.includes('No user logged in')) {
        errorMessage = 'Session expired. Please log in again.';
      } else if (error.message.includes('User ID mismatch')) {
        errorMessage = 'Authentication error. Please log in again.';
      } else if (error.message.includes('Update failed')) {
        errorMessage = 'Profile update service returned an error. Please try again.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };
  
  const getPlanBadgeColor = (plan) => {
    switch(plan) {
      case 'PREMIUM': return 'bg-purple-100 text-purple-800';
      case 'STANDARD': return 'bg-blue-100 text-blue-800';
      case 'BASIC': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  const currentPlan = subscription ? STRIPE_PLANS[subscription.plan] : STRIPE_PLANS.FREE;
  const limits = subscription ? getPlanLimits(subscription.plan) : getPlanLimits('FREE');
  const usagePercentage = usage && limits.listings !== -1 ? (usage.listingsGenerated / limits.listings) * 100 : 0;
  
  const getBillingDay = () => {
    if (!subscription) return null;
    const date = new Date(subscription.created_date);
    // Add 1 to day because of zero-based UTC conversion issues, then normalize.
    // This is a simple way to get a consistent "billing day" for display.
    const day = (date.getUTCDate() % 28) + 1; // Keep it within a reasonable month day range
    return day;
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[var(--background-light)]">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">{t('account.title')}</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage your profile, subscription, and billing information.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>{t('account.profile.title')}</CardTitle>
            <CardDescription>Update your store details and personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Image Section */}
            <div className="flex items-center space-x-6">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileImage} alt="Profile" />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    {fullName ? fullName.split(' ').map(n => n[0]).join('').toUpperCase() : user?.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="text-xs"
                  >
                    {isUploadingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-camera mr-1"></i>
                        {t('account.profile.uploadImage')}
                      </>
                    )}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 text-center">
                    {t('account.profile.fileFormat')}<br/>{t('account.profile.maxSize')}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="fullName">{t('account.profile.fullName')}</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label>{t('account.profile.email')}</Label>
                  <Input value={user?.email || ""} disabled className="bg-gray-50" />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="storeName">{t('account.profile.storeName')}</Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Your eBay store name"
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleProfileSave} disabled={isSaving || isUploadingImage}>
                {isSaving ? t('account.profile.saving') : t('account.profile.saveProfile')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('account.subscription.title')}</CardTitle>
            <CardDescription>
              {subscription && usage ? (
                t('account.currentPlan', {
                  plan: currentPlan?.name || 'Free',
                  used: usage.listingsGenerated,
                  total: limits.listings === -1 ? 'unlimited' : limits.listings,
                  type: subscription?.plan === 'FREE' ? t('account.usage.descriptionsTotal') : t('account.usage.listingsMonth')
                })
              ) : (
                t('account.subscription.defaultDescription')
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-slate-50 border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getPlanBadgeColor(subscription?.plan)}>{currentPlan?.name || 'Free'} Plan</Badge>
                  {subscription?.plan === 'FREE' && (
                    <Badge variant="outline" className="text-xs">Trial</Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-[var(--text-primary)] mb-1">{currentPlan?.price || '$0/mo'}</p>
                <p className="text-sm text-slate-600">
                  {limits.listings === -1 ? t('account.subscription.unlimitedListings') : 
                   subscription?.plan === 'FREE' ? t('account.subscription.listingDescriptionsTotal', { count: limits.listings }) : t('account.subscription.listingsPerMonth', { count: limits.listings })}
                </p>
              </div>
              <div className="flex gap-2">
                {subscription?.plan === 'FREE' ? (
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleUpgradeClick}>
                    {t('account.upgradeNow')}
                  </Button>
                ) : (
                  <Button variant="outline" className="bg-white" onClick={handleUpgradeClick}>
                    {t('account.changePlan')}
                  </Button>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>{subscription?.plan === 'FREE' ? t('account.usage.title') : t('account.usage.monthlyTitle')}</Label>
                <p className="text-sm text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-primary)]">{usage?.listingsGenerated || 0}</span> / {limits.listings === -1 ? '∞' : limits.listings} {subscription?.plan === 'FREE' ? t('account.usage.descriptionsUsed') : t('account.usage.listingsUsed')}
                </p>
              </div>
              <Progress value={usagePercentage} className="h-3" />
              {usagePercentage > 80 && usagePercentage < 100 && (
                <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
                  <i className="bi bi-exclamation-triangle"></i>
                  {subscription?.plan === 'FREE' ? 
                    t('account.limits.approaching') :
                    t('account.limits.approachingMonthly')}
                </p>
              )}
              {usagePercentage >= 100 && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                  <i className="bi bi-x-circle"></i>
                  {subscription?.plan === 'FREE' ? 
                    t('account.limits.reached') :
                    t('account.limits.reachedMonthly')}
                </p>
              )}
              {usagePercentage === 0 && (
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <i className="bi bi-check-circle"></i>
                  {subscription?.plan === 'FREE' ? 
                    t('account.limits.ready') :
                    t('account.limits.monthlyReady')}
                </p>
              )}
            </div>

            {/* Plan Features */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm text-slate-900 mb-3">{t('account.features.title')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <i className="bi bi-check text-green-600"></i>
                  <span>{limits.listings === -1 ? t('account.features.unlimited') : limits.listings} {subscription?.plan === 'FREE' ? t('account.features.descriptionsTotal') : t('account.features.listingsMonth')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <i className="bi bi-check text-green-600"></i>
                  <span>{t('account.features.aiDescriptions')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <i className="bi bi-check text-green-600"></i>
                  <span>{t('account.features.seoOptimization')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <i className="bi bi-check text-green-600"></i>
                  <span>{t('account.features.imageOptimization')}</span>
                </div>
                {subscription?.plan !== 'FREE' && (
                  <>
                    <div className="flex items-center gap-2 text-slate-600">
                      <i className="bi bi-check text-green-600"></i>
                      <span>{t('account.features.prioritySupport')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <i className="bi bi-check text-green-600"></i>
                      <span>{t('account.features.advancedTemplates')}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="text-sm text-[var(--text-secondary)] bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <i className="bi bi-info-circle text-blue-600"></i>
                <span className="font-semibold text-blue-900">{t('account.billing.title')}</span>
              </div>
              {subscription?.resetDate ? (
                <p>{t('account.billing.resetDate', { date: format(new Date(subscription.resetDate), "MMMM d, yyyy") })}</p>
              ) : (
                <p>{t('account.billing.freePlan', { count: limits.listings })}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Server-side: Create a Checkout session
const session = await stripe.checkout.sessions.create({
  billing_address_collection: 'auto',
  line_items: [
    {
      price: priceId, // Get your price ID from Stripe Dashboard
      quantity: 1,
    },
  ],
  mode: 'subscription',
  success_url: `${YOUR_DOMAIN}/account?success=true&session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${YOUR_DOMAIN}/account?canceled=true`,
});

// Then redirect to the session URL
res.redirect(303, session.url);
