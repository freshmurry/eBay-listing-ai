import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Zap, Shield, BarChart3, Clock, Trophy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { base44 } from "@/api/base44Client";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: "AI-Powered Descriptions",
    description: "Generate compelling eBay listing descriptions using advanced AI technology that understands product details and market trends."
  },
  {
    icon: <Shield className="h-6 w-6 text-green-600" />,
    title: "Browser Rendering & Scraping",
    description: "Extract product information from any URL automatically using real browser rendering technology."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
    title: "Smart Analytics",
    description: "Track description performance and optimize your eBay sales with built-in analytics and insights."
  },
  {
    icon: <Users className="h-6 w-6 text-orange-600" />,
    title: "Multi-Store Support",
    description: "Import products from Amazon, Etsy, Shopify, and thousands of other e-commerce platforms."
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "eBay Power Seller",
    rating: 5,
    comment: "This tool has transformed my listing process. I can create professional eBay descriptions in minutes instead of hours."
  },
  {
    name: "Mike Rodriguez",
    role: "E-commerce Entrepreneur",
    rating: 5,
    comment: "The AI descriptions are incredibly accurate and engaging. My conversion rates have increased by 40%."
  },
  {
    name: "Jessica Park",
    role: "Online Retailer",
    rating: 5,
    comment: "The URL extraction feature is a game-changer. I can import products from any website instantly."
  }
];

const stats = [
  { number: "50K+", label: "Descriptions Created" },
  { number: "2,500+", label: "Happy Sellers" },
  { number: "98%", label: "Success Rate" },
  { number: "24/7", label: "AI Availability" }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, []);

  const handleStartCreating = async () => {
    setIsLoading(true);
    try {
      if (user) {
        // User is authenticated, go to wizard
        navigate('/Wizard');
      } else {
        // User is not authenticated, go to login
        navigate('/Login');
      }
    } catch (error) {
      console.error('Navigation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="eBay Listing AI - Create Perfect Listing Descriptions in Minutes"
        description="Generate compelling eBay listing descriptions using advanced AI technology. Increase sales with smart analytics, browser rendering, and multi-store support. Try it free today!"
        keywords="eBay listing descriptions, AI content creation, eBay SEO, e-commerce tools, automatic listing generator"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-home.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/"
      />
      <Navigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Create Perfect
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> eBay Listing Descriptions</span>
              <br />in Minutes
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-slate-600 px-4">
              Transform any product URL into a compelling eBay listing description with AI-powered content, 
              smart optimization, and automated market research.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center px-4">
              <Button 
                size="lg" 
                onClick={handleStartCreating}
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 py-3 text-base sm:text-lg"
              >
                {isLoading ? 'Loading...' : 'Start Creating Descriptions'}
                <Zap className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg">
                Watch Demo
                <svg className="ml-2 h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 hidden lg:block">
          <div className="rounded-full bg-blue-100 p-3">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="absolute bottom-20 right-20 hidden lg:block">
          <div className="rounded-full bg-purple-100 p-3">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-slate-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                  {stat.number}
                </div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Everything you need to dominate eBay
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Our AI-powered platform handles the heavy lifting so you can focus on growing your business.
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-slate-100 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Create professional eBay listings in three simple steps.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold">Paste Product URL</h3>
                <p className="mt-2 text-slate-600">
                  Simply paste a link from Amazon, your website, or any online store.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-semibold">AI Enhancement</h3>
                <p className="mt-2 text-slate-600">
                  Our AI extracts details and creates compelling, SEO-optimized descriptions.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="text-xl font-semibold">Publish to eBay</h3>
                <p className="mt-2 text-slate-600">
                  Review, customize, and publish your professional description to eBay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Loved by sellers worldwide
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              See what successful eBay sellers are saying about our platform.
            </p>
          </div>
          <div className="mx-auto mt-12 sm:mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <div className="mt-3 sm:mt-4 border-t pt-3 sm:pt-4">
                    <p className="text-sm sm:text-base font-semibold">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                About eBay DescriptionAI
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
                We're on a mission to help sellers succeed with AI-powered description tools.
              </p>
            </div>
            
            <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-100">
                  <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Proven Results</h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  Our AI has helped create over 50,000 successful eBay descriptions with higher conversion rates.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Save Time</h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  Reduce description creation time from hours to minutes with our intelligent automation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-purple-100">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Trusted Community</h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  Join over 2,500 happy sellers who trust our platform for their eBay success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Ready to transform your eBay business?
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-blue-100 px-4">
            Join thousands of successful sellers who are using AI to create better descriptions, 
            save time, and increase sales.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center px-4">
            <Link to={createPageUrl("Wizard")} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-slate-100 px-6 sm:px-8 py-3 text-base sm:text-lg">
                Get Started Free
                <Zap className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl("Pricing")} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 text-base sm:text-lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}