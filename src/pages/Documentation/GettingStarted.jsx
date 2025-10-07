import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, CheckCircle, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const steps = [
  {
    number: "1",
    title: "Create Your Account",
    description: "Sign up for free and get access to 3 complimentary listing descriptions.",
    details: [
      "Visit our signup page and provide your email address",
      "Choose a secure password for your account",
      "Verify your email to activate your account",
      "You'll automatically start with our Free plan"
    ]
  },
  {
    number: "2", 
    title: "Start the Wizard",
    description: "Navigate to the listing creation wizard to begin your first description.",
    details: [
      "Click 'Create New Description' from your dashboard",
      "Choose your preferred method: URL import or manual entry",
      "The wizard will guide you through each step",
      "No experience required - it's designed for beginners"
    ]
  },
  {
    number: "3",
    title: "Add Product Information", 
    description: "Provide your product details either by URL or manual input.",
    details: [
      "For URL import: Simply paste any e-commerce product URL",
      "For manual entry: Fill in product title, description, and images",
      "Our AI will automatically extract and enhance the information",
      "Review and edit any details as needed"
    ]
  },
  {
    number: "4",
    title: "Customize & Generate",
    description: "Personalize your listing with branding and generate your description.",
    details: [
      "Add your store branding and preferred style",
      "Choose from various template options",
      "Let our AI generate your optimized description", 
      "Preview the result in real-time"
    ]
  },
  {
    number: "5",
    title: "Export to eBay",
    description: "Copy your completed description and publish it to eBay.",
    details: [
      "Review your final description and make any last edits",
      "Copy the generated HTML code",
      "Paste directly into eBay's listing editor",
      "Publish your professional listing and start selling!"
    ]
  }
];

export default function GettingStartedGuide() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Getting Started Guide - eBay Listing AI | Complete Beginner Tutorial"
        description="Learn how to create your first eBay listing description with our AI-powered platform. Step-by-step guide from account setup to publishing your first listing."
        keywords="eBay listing tutorial, getting started guide, AI description generator, eBay selling guide, beginner tutorial"
        author="eBay Listing AI"
        ogType="article"
        ogImage="https://ebaylistingai.com/images/og-getting-started.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Documentation/GettingStarted"
      />
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link to={createPageUrl("Documentation")} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documentation
            </Link>
            
            <div className="mb-8">
              <Badge className="mb-4 bg-green-100 text-green-800">
                <User className="h-3 w-3 mr-1" />
                Beginner Guide
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Getting Started Guide
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                Complete walkthrough from account setup to your first successful eBay listing description.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  15 min read
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Step-by-step tutorial
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <Card className="mb-12 bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                <p className="text-slate-700 mb-4">
                  This comprehensive guide will walk you through everything you need to know to create your first 
                  professional eBay listing description using our AI-powered platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>How to set up your account and navigate the platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Using the listing creation wizard effectively</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Best practices for product information input</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>How to customize and optimize your listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Exporting and publishing your descriptions to eBay</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index}>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-lg text-slate-600 mb-6">{step.description}</p>
                      
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="ml-6 mt-8 mb-4">
                      <div className="w-0.5 h-8 bg-slate-200"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <Card className="mt-16 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">💡 Pro Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span><strong>Start with URL import:</strong> If you're selling items that exist on other e-commerce sites, use URL import for fastest results.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span><strong>Review and customize:</strong> Always review the AI-generated content and add your personal touch.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span><strong>Use high-quality images:</strong> The better your product images, the better your generated description will be.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span><strong>Save as you go:</strong> The wizard auto-saves your progress, but you can manually save at any time.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Now that you know the basics, it's time to create your first listing description. 
                The wizard will guide you through each step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Wizard")}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Create Your First Description
                  </Button>
                </Link>
                <Link to={createPageUrl("Documentation")}>
                  <Button size="lg" variant="outline">
                    Browse More Guides
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}