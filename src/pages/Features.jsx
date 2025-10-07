import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Zap, Shield, BarChart3, Clock, Trophy, Brain, Search, Globe, Palette, Target, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const features = [
  {
    icon: <Brain className="h-8 w-8 text-blue-600" />,
    title: "AI-Powered Content Generation",
    description: "Advanced GPT-4 technology creates compelling, unique descriptions that capture your product's best features and benefits.",
    benefits: ["Natural language processing", "SEO-optimized content", "Brand voice consistency", "Multilingual support"]
  },
  {
    icon: <Search className="h-8 w-8 text-green-600" />,
    title: "Smart URL Analysis",
    description: "Extract product details from any e-commerce URL automatically, saving hours of manual data entry.",
    benefits: ["Auto product detection", "Price extraction", "Image analysis", "Competitor research"]
  },
  {
    icon: <Target className="h-8 w-8 text-purple-600" />,
    title: "eBay Optimization",
    description: "Tailored specifically for eBay's algorithm and buyer behavior patterns to maximize visibility and conversions.",
    benefits: ["Category optimization", "Keyword density", "Buyer psychology", "Mobile-first design"]
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
    title: "Performance Analytics",
    description: "Track your listing performance with detailed analytics and insights to continuously improve your sales.",
    benefits: ["Conversion tracking", "A/B testing", "Performance metrics", "ROI analysis"]
  },
  {
    icon: <Shield className="h-8 w-8 text-red-600" />,
    title: "Compliance & Safety",
    description: "Ensure your listings meet eBay's policies and guidelines with automatic compliance checking.",
    benefits: ["Policy compliance", "Prohibited content detection", "Brand safety", "Legal compliance"]
  },
  {
    icon: <Clock className="h-8 w-8 text-teal-600" />,
    title: "Bulk Processing",
    description: "Scale your business with bulk listing creation and management tools for high-volume sellers.",
    benefits: ["Batch processing", "Template management", "Automation workflows", "Time savings"]
  }
];

const integrations = [
  { name: "eBay Marketplace", logo: "🛒", description: "Optimized specifically for eBay listing requirements" },
  { name: "Amazon URLs", logo: "📦", description: "Extract product details from Amazon product pages" },
  { name: "Shopify URLs", logo: "🏪", description: "Import product information from Shopify stores" },
  { name: "WooCommerce URLs", logo: "🔧", description: "Extract details from WooCommerce product pages" },
  { name: "AliExpress URLs", logo: "🌐", description: "Source product information from AliExpress listings" },
  { name: "General E-commerce", logo: "🔗", description: "Smart extraction from most e-commerce websites" }
];

const stats = [
  { number: "99.8%", label: "Accuracy Rate" },
  { number: "< 30s", label: "Generation Time" },
  { number: "50+ Languages", label: "Supported" },
  { number: "24/7", label: "Availability" }
];

export default function Features() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Features - eBay Listing AI | AI-Powered Content Generation & Analytics"
        description="Discover advanced features including AI content generation, smart URL analysis, performance analytics, and multi-store management. Boost your eBay sales with intelligent automation."
        keywords="eBay listing features, AI content creation, URL analysis, performance analytics, multi-store management, eBay automation"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-features.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Features"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              🚀 Powered by Advanced AI Technology
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> eBay Success</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Discover the comprehensive suite of AI-powered tools designed to transform your eBay selling experience 
              and maximize your sales potential.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to={createPageUrl("Wizard")}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                  Try Features Free
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to={createPageUrl("Pricing")}>
                <Button size="lg" variant="outline" className="px-8 py-3">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Our platform combines cutting-edge AI with deep eBay marketplace knowledge 
              to give you a competitive advantage.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Smart URL Extraction
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Extract product information from URLs across major e-commerce platforms to quickly create eBay listings.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{integration.logo}</div>
                  <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
                  <p className="text-slate-600 text-sm">{integration.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Experience These Features?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Start creating better eBay listings today with our powerful AI tools. 
            No credit card required for your free trial.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to={createPageUrl("Wizard")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3">
                Start Free Trial
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl("Pricing")}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}