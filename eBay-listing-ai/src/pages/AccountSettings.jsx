
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { UserSubscription } from "@/api/entities";
import { SellerProfile } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

const planDetails = {
  FREE: { name: "Free", price: "$0/mo" },
  BASIC: { name: "Basic", price: "$9/mo" },
  STANDARD: { name: "Standard", price: "$19/mo" },
  PREMIUM: { name: "Premium", price: "$49/mo" },
};

export default function AccountSettings() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        setUser(currentUser);

        if (currentUser) {
          setFullName(currentUser.full_name || "");
          const [subData] = await UserSubscription.filter({ created_by: currentUser.email }, "-created_date", 1);
          setSubscription(subData);

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

  const handleProfileSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await User.updateMyUserData({ full_name: fullName });

      if (profile) {
        await SellerProfile.update(profile.id, { storeName });
      } else if (storeName) {
        await SellerProfile.create({ storeName });
      }
      
      alert("Profile updated successfully!");
      // Refetch user to reflect name change immediately if layout doesn't auto-update
      const updatedUser = await User.me();
      setUser(updatedUser);

    } catch (error) {
      console.error("Failed to save profile", error);
      alert("Failed to save profile.");
    }
    setIsSaving(false);
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

  const usagePercentage = subscription ? (subscription.listingsUsed / subscription.listingsLimit) * 100 : 0;
  
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
          <CardContent className="space-y-4">
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
              <Input value={user?.email || ""} disabled />
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
              <Button onClick={handleProfileSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>You are currently on the {planDetails[subscription?.plan]?.name || 'Free'} plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-slate-50 border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Badge className={getPlanBadgeColor(subscription?.plan)}>{planDetails[subscription?.plan]?.name || 'Free'} Plan</Badge>
                <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{planDetails[subscription?.plan]?.price || '$0/mo'}</p>
              </div>
              <Link to={createPageUrl("Pricing")}>
                <Button variant="outline" className="bg-white">Manage Subscription</Button>
              </Link>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Monthly Usage</Label>
                <p className="text-sm text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-primary)]">{subscription?.listingsUsed || 0}</span> / {subscription?.listingsLimit || 1} listings used
                </p>
              </div>
              <Progress value={usagePercentage} />
            </div>

            <div className="text-sm text-[var(--text-secondary)]">
              {subscription?.renewalDate 
                ? `Your plan will renew on ${format(new Date(subscription.renewalDate), "MMMM d, yyyy")}.`
                : `Your monthly listing limit resets on the ${getBillingDay() || '1st'} of each month.`
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
