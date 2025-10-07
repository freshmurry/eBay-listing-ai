import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Clock, User, CheckCircle, ArrowRight, Copy, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const tutorialSteps = [
  {
    title: "Access the Creation Wizard",
    description: "Navigate to the listing creation tool from your dashboard.",
    details: "From your dashboard, click the prominent 'Create New Description' button. This will take you to our step-by-step wizard that guides you through the entire process.",
    image: "/images/tutorial/step1-dashboard.jpg",
    tips: ["Make sure you're logged into your account", "The button is prominently displayed on your dashboard"]
  },
  {
    title: "Choose Your Input Method",
    description: "Select between URL import or manual product entry.",
    details: "You have two options: paste a product URL from any e-commerce site for automatic extraction, or manually enter your product details. URL import is faster and recommended for most users.",
    image: "/images/tutorial/step2-input-method.jpg",
    tips: ["URL import works with Amazon, Shopify, AliExpress, and most e-commerce sites", "Manual entry gives you full control over the input"]
  },
  {
    title: "Enter Product Information",
    description: "Provide your product details through your chosen method.",
    details: "If using URL import, simply paste the product URL and our AI will extract all relevant information. For manual entry, fill in the product title, description, price, and upload images.",
    image: "/images/tutorial/step3-product-info.jpg",
    tips: ["URLs should be direct product pages, not category pages", "High-quality images lead to better descriptions"]
  },
  {
    title: "Review Extracted Data",
    description: "Check and edit the automatically extracted product information.",
    details: "Our AI will present the extracted product details for your review. You can edit any field, add missing information, or remove irrelevant details before proceeding.",
    image: "/images/tutorial/step4-review-data.jpg",
    tips: ["Review all fields carefully", "Add any unique selling points the AI might have missed"]
  },
  {
    title: "Customize Your Listing",
    description: "Add your personal branding and style preferences.",
    details: "Choose your preferred writing tone, add your store branding, select shipping information, and specify any special features you want highlighted in the description.",
    image: "/images/tutorial/step5-customize.jpg",
    tips: ["Consistent branding helps build customer trust", "Include your return policy and shipping details"]
  },
  {
    title: "Generate AI Description",
    description: "Let our AI create your optimized eBay listing description.",
    details: "Click 'Generate Description' and our AI will create a professional, SEO-optimized listing description based on all the information you've provided. This usually takes 10-30 seconds.",
    image: "/images/tutorial/step6-generate.jpg",
    tips: ["Generation time depends on complexity", "The AI optimizes for eBay's search algorithm"]
  },
  {
    title: "Preview and Edit",
    description: "Review your generated description and make any final adjustments.",
    details: "Preview how your listing will look on eBay. You can edit any part of the generated description, adjust formatting, or regenerate sections if needed.",
    image: "/images/tutorial/step7-preview.jpg",
    tips: ["Check how it looks on mobile devices", "Make sure all key selling points are included"]
  },
  {
    title: "Export to eBay",
    description: "Copy your completed description and publish it to eBay.",
    details: "Copy the generated HTML code and paste it directly into eBay's listing editor. The description is fully formatted and ready for immediate use.",
    image: "/images/tutorial/step8-export.jpg",
    tips: ["Copy the HTML version for best formatting", "Save your project for future edits"]
  }
];

export default function CreateFirstDescription() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="How to Create Your First eBay Description - eBay Listing AI Tutorial"
        description="Step-by-step tutorial on creating your first professional eBay listing description using AI. Complete beginner guide with screenshots and tips."
        keywords="eBay description tutorial, AI listing creation, eBay selling guide, how to create eBay listing, eBay listing wizard"
        author="eBay Listing AI"
        ogType="article"
        ogImage="https://ebaylistingai.com/images/og-tutorial.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Documentation/CreateFirstDescription"
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
                Beginner Tutorial
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                How to Create Your First eBay Description
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                Follow this step-by-step tutorial to create your first professional eBay listing description with AI assistance.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  5 min read
                </span>
                <span className="flex items-center gap-1">
                  <Play className="h-4 w-4" />
                  Interactive tutorial
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Before You Start</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>You have a free account with eBay Listing AI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>You have product information or a product URL ready</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>You have an eBay seller account for publishing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tutorial Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Step-by-Step Tutorial</h2>
            
            <div className="space-y-12">
              {tutorialSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-6">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-lg text-slate-600 mb-4">{step.description}</p>
                      
                      {/* Detailed explanation */}
                      <div className="bg-slate-50 rounded-lg p-6 mb-4">
                        <p className="text-slate-700">{step.details}</p>
                      </div>
                      
                      {/* Tips */}
                      {step.tips.length > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">💡 Pro Tips:</h4>
                          <ul className="space-y-1">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-green-700 text-sm">
                                • {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Connector line */}
                  {index < tutorialSteps.length - 1 && (
                    <div className="ml-6 mt-6 mb-6">
                      <div className="w-0.5 h-8 bg-slate-200"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Completion Section */}
            <Card className="mt-16 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  Congratulations!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  You've successfully created your first AI-powered eBay listing description! 
                  Your listing is now optimized for search visibility and conversion.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">What's Next?</h4>
                  <ul className="space-y-1 text-green-700">
                    <li>• Monitor your listing performance in eBay's analytics</li>
                    <li>• Create more listings using the same process</li>
                    <li>• Experiment with different templates and styles</li>
                    <li>• Consider upgrading for unlimited descriptions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Create Your First Description?</h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Follow along with this tutorial by creating your actual listing in our wizard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Wizard")}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Start Creating Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Documentation/BestPractices")}>
                  <Button size="lg" variant="outline">
                    Learn Best Practices
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