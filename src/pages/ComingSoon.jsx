import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Zap, Bell, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import { createPageUrl } from "@/utils";

export default function ComingSoon() {
  const currentPath = window.location.pathname.replace('/', '');
  const featureName = currentPath.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEOHead 
        title={`${featureName} - Coming Soon | eBay Listing AI`}
        description={`${featureName} is currently in development. Get notified when this exciting new feature launches on eBay Listing AI.`}
        keywords={`${featureName.toLowerCase()}, ebay listing ai, coming soon, new features, development`}
        canonicalUrl={`https://ebaylistingai.com/${currentPath}`}
      />

      {/* Header */}
      <div className="relative overflow-hidden bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to={createPageUrl("Features")}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Features
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Clock className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
              {featureName}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're working hard to bring you this exciting new feature. 
              Stay tuned for updates and be the first to know when it launches!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Feature Preview */}
          <Card className="mb-12">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">What's Coming</CardTitle>
              <CardDescription className="text-base">
                This feature is currently in active development and will include:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Enhanced Functionality</h3>
                      <p className="text-slate-600 text-sm">Advanced capabilities designed to streamline your eBay listing workflow.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-slate-900">AI-Powered Intelligence</h3>
                      <p className="text-slate-600 text-sm">Smart automation that learns from your preferences and optimizes results.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Seamless Integration</h3>
                      <p className="text-slate-600 text-sm">Works perfectly with your existing tools and eBay seller workflow.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Performance Optimization</h3>
                      <p className="text-slate-600 text-sm">Built for speed and reliability to handle high-volume operations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Signup */}
          <Card className="mb-12">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Bell className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Get Notified</CardTitle>
              <CardDescription className="text-base">
                Be the first to know when {featureName} is ready for you to use.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <p className="text-slate-600">
                  Join thousands of eBay sellers who trust us to deliver cutting-edge tools 
                  that drive sales and save time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Link to={createPageUrl("Signup")} className="flex-1">
                    <Button size="lg" className="w-full">
                      <Star className="h-4 w-4 mr-2" />
                      Join Waitlist
                    </Button>
                  </Link>
                  <Link to={createPageUrl("Contact")} className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Features CTA */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Explore What's Available Now</CardTitle>
              <CardDescription className="text-base">
                While you wait, check out our current powerful features that are helping 
                thousands of sellers create better eBay listings.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Wizard")}>
                  <Button variant="outline" size="lg">
                    Create Description
                  </Button>
                </Link>
                <Link to={createPageUrl("Features")}>
                  <Button variant="outline" size="lg">
                    View All Features
                  </Button>
                </Link>
                <Link to={createPageUrl("Documentation")}>
                  <Button variant="outline" size="lg">
                    Read Documentation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}