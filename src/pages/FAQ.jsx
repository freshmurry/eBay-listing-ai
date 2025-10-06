import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function FAQ() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="FAQ - eBay Listing AI | Frequently Asked Questions & Help"
        description="Get answers to common questions about eBay Listing AI. Learn about features, pricing, getting started, AI copywriting, SEO optimization, and troubleshooting."
        keywords="eBay Listing AI FAQ, frequently asked questions, help center, support, getting started, troubleshooting"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-faq.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/FAQ"
      />
      <Navigation />
      
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to know about eBay Listing AI
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How do I create my first eBay listing?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Simply paste any product URL into our wizard, and our AI will extract all the details automatically. You can then customize the title, description, images, and branding before generating your professional HTML listing.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What types of URLs does the system support?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We support most major e-commerce platforms including Amazon, eBay, Etsy, Shopify stores, AliExpress, and many more. If you have a product page with basic info, our AI can likely extract the details.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Do I need any technical skills to use this?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Not at all! Our platform is designed for sellers of all skill levels. Simply follow our step-by-step wizard, and we will handle all the technical details. You will get copy-paste ready HTML at the end.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Features & Functionality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How does the AI copywriting work?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our AI analyzes your product information and creates compelling, SEO-optimized descriptions that follow eBay best practices. It includes keyword optimization, benefit-focused language, and proper formatting.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Can I customize the generated listings?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Absolutely! You can edit the title, description, add or remove images, modify SEO keywords, and customize your store branding. The AI provides a great starting point that you can personalize.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still need help?
                </h3>
                <p className="text-gray-600 mb-6">
                  Cannot find what you are looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/Contact">
                    <Button className="w-full sm:w-auto">
                      Contact Support
                    </Button>
                  </Link>
                  <Link to="/Documentation">
                    <Button variant="outline" className="w-full sm:w-auto">
                      View Documentation
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
