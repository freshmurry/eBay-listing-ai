
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

const planDetails = {
  FREE: { name: "Free", price: "$0/mo" },
  BASIC: { name: "Basic", price: "$9/mo" },
  STANDARD: { name: "Standard", price: "$19/mo" },
  PREMIUM: { name: "Premium", price: "$49/mo" },
};

export default function AccountSettings() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const { subscription, usage, triggerUpgrade } = useSubscription();

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

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploadingImage(true);
    try {
      console.log('Uploading file:', { name: file.name, size: file.size, type: file.type });
      const result = await UploadFile({ file });
      console.log('Upload result:', result);
      
      if (!result || !result.success) {
        throw new Error(result?.message || 'Upload failed with no success flag');
      }
      
      const imageUrl = result.url || result.file_url || result.signedUrl;
      if (!imageUrl) {
        throw new Error('No image URL returned from upload service');
      }
      
      console.log('Setting profile image URL:', imageUrl);
      setProfileImage(imageUrl);
      
      // Immediately save the profile image to the user record
      if (user) {
        console.log('Updating user profile with image URL');
        await User.update(user.id, { profile_image: imageUrl });
        setUser({ ...user, profile_image: imageUrl });
        
        // Update localStorage for immediate navbar update
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        userData.profile_image = imageUrl;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Trigger window event to update navbar
        window.dispatchEvent(new Event('userProfileUpdated'));
        console.log('Profile image updated successfully');
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to upload image. Please try again.';
      if (error.message.includes('No image URL')) {
        errorMessage = 'Upload succeeded but no image URL was returned. Please try again.';
      } else if (error.message.includes('Upload failed')) {
        errorMessage = 'Upload service returned an error. Please try again.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      alert(errorMessage);
    } finally {
      setIsUploadingImage(false);
    }
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
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Account Settings</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage your profile, subscription, and billing information.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
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
                        Change Photo
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
                    JPG, PNG, or GIF<br/>Max 5MB
                  </p>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input value={user?.email || ""} disabled className="bg-gray-50" />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Your eBay store name"
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleProfileSave} disabled={isSaving || isUploadingImage}>
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              {subscription && usage ? (
                `You are currently on the ${currentPlan?.name || 'Free'} plan. ${usage.listingsGenerated} of ${limits.listings === -1 ? 'unlimited' : limits.listings} listings used this month.`
              ) : (
                'Manage your subscription and view usage details.'
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
                  {limits.listings === -1 ? 'Unlimited listings' : `${limits.listings} listings per month`}
                </p>
              </div>
              <div className="flex gap-2">
                {subscription?.plan === 'FREE' ? (
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={triggerUpgrade}>
                    Upgrade Now
                  </Button>
                ) : (
                  <Button variant="outline" className="bg-white" onClick={triggerUpgrade}>
                    Change Plan
                  </Button>
                )}
                <Link to={createPageUrl("Pricing")}>
                  <Button variant="outline" className="bg-white">View All Plans</Button>
                </Link>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Monthly Usage</Label>
                <p className="text-sm text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-primary)]">{usage?.listingsGenerated || 0}</span> / {limits.listings === -1 ? '∞' : limits.listings} listings used
                </p>
              </div>
              <Progress value={usagePercentage} className="h-3" />
              {usagePercentage > 80 && usagePercentage < 100 && (
                <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
                  <i className="bi bi-exclamation-triangle"></i>
                  You're approaching your monthly limit. Consider upgrading to avoid interruption.
                </p>
              )}
              {usagePercentage >= 100 && (
                <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                  <i className="bi bi-x-circle"></i>
                  You've reached your monthly limit. Upgrade to continue creating listings.
                </p>
              )}
              {usagePercentage === 0 && (
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <i className="bi bi-check-circle"></i>
                  Your monthly allowance is ready to use!
                </p>
              )}
            </div>

            {/* Plan Features */}
            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm text-slate-900 mb-3">Your Plan Includes:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <i className="bi bi-check text-green-600"></i>
                  <span>{limits.listings === -1 ? 'Unlimited' : limits.listings} listings per month</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <i className="bi bi-check text-green-600"></i>
                  <span>AI-powered descriptions</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <i className="bi bi-check text-green-600"></i>
                  <span>SEO optimization</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <i className="bi bi-check text-green-600"></i>
                  <span>Image optimization</span>
                </div>
                {subscription?.plan !== 'FREE' && (
                  <>
                    <div className="flex items-center gap-2 text-slate-600">
                      <i className="bi bi-check text-green-600"></i>
                      <span>Priority support</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <i className="bi bi-check text-green-600"></i>
                      <span>Advanced templates</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="text-sm text-[var(--text-secondary)] bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <i className="bi bi-info-circle text-blue-600"></i>
                <span className="font-semibold text-blue-900">Billing Information</span>
              </div>
              {subscription?.resetDate ? (
                <p>Your usage resets on {format(new Date(subscription.resetDate), "MMMM d, yyyy")}.</p>
              ) : (
                <p>Free plan with {limits.listings} listings per month. Upgrade anytime for unlimited access.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
