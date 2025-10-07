import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, Search, Star, TrendingUp, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const practices = [
  {
    icon: <Search className="h-8 w-8 text-blue-600" />,
    title: "SEO Optimization",
    description: "Maximize your listing visibility in eBay search results.",
    tips: [
      "Include primary keywords in your title and first 80 characters",
      "Use relevant category-specific terms that buyers search for",
      "Include brand names, model numbers, and key specifications",
      "Avoid keyword stuffing - focus on natural, readable content",
      "Research what successful competitors are using in their titles"
    ]
  },
  {
    icon: <Target className="h-8 w-8 text-green-600" />,
    title: "Keyword Research",
    description: "Find the right keywords that buyers are actually searching for.",
    tips: [
      "Use eBay's search suggestions to find popular terms",
      "Check completed listings to see what keywords work",
      "Include size, color, brand, and condition keywords",
      "Use long-tail keywords for less competition",
      "Monitor trending keywords in your category"
    ]
  },
  {
    icon: <Star className="h-8 w-8 text-purple-600" />,
    title: "Image Guidelines",
    description: "High-quality images lead to better AI-generated descriptions.",
    tips: [
      "Use high-resolution images with good lighting",
      "Show multiple angles and important details",
      "Include lifestyle shots showing the product in use",
      "Ensure images are clear and free of watermarks",
      "Use white or neutral backgrounds for main product shots"
    ]
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
    title: "Pricing Strategies",
    description: "Competitive pricing approaches that work with great descriptions.",
    tips: [
      "Research competitor pricing in your category",
      "Consider offering free shipping with higher item price",
      "Use psychological pricing (e.g., $19.99 vs $20.00)",
      "Highlight value propositions in your description",
      "Test different price points and measure conversion"
    ]
  }
];

const commonMistakes = [
  {
    title: "Overwhelming Product Descriptions",
    description: "Too much information can overwhelm buyers and hurt conversions.",
    solution: "Focus on 3-5 key benefits and features. Use bullet points for easy scanning."
  },
  {
    title: "Ignoring Mobile Users",
    description: "Over 60% of eBay traffic comes from mobile devices.",
    solution: "Keep descriptions concise and use short paragraphs that read well on small screens."
  },
  {
    title: "Missing Call-to-Action",
    description: "Descriptions without clear next steps leave buyers uncertain.",
    solution: "End with compelling calls-to-action like 'Buy Now' or 'Add to Cart Today'."
  },
  {
    title: "Poor Category Selection",
    description: "Wrong categories limit your listing's visibility to the right buyers.",
    solution: "Research where similar successful items are listed and use the most specific category."
  }
];

const advancedTips = [
  {
    title: "Seasonal Optimization",
    content: "Adjust your keywords and messaging based on seasons, holidays, and trending events."
  },
  {
    title: "Cross-Selling Opportunities",
    content: "Mention complementary products or accessories to increase average order value."
  },
  {
    title: "Urgency and Scarcity",
    content: "Use phrases like 'Limited Stock' or 'Fast Shipping' to encourage quick decisions."
  },
  {
    title: "Social Proof",
    content: "Include customer testimonials or highlight positive feedback when possible."
  }
];

export default function BestPractices() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Best Practices - eBay Listing AI | Proven Strategies for Maximum Sales"
        description="Learn proven strategies to maximize your eBay listing performance and sales conversion. SEO optimization, keyword research, pricing strategies, and more."
        keywords="eBay listing best practices, eBay SEO optimization, eBay keyword research, eBay pricing strategies, eBay selling tips"
        author="eBay Listing AI"
        ogType="article"
        ogImage="https://ebaylistingai.com/images/og-best-practices.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Documentation/BestPractices"
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
              <Badge className="mb-4 bg-purple-100 text-purple-800">
                <Lightbulb className="h-3 w-3 mr-1" />
                Best Practices
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Proven Strategies for eBay Success
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                Learn from successful sellers and optimize your listings for maximum visibility and conversions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Practices */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Core Best Practices</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              {practices.map((practice, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {practice.icon}
                      <div>
                        <CardTitle className="text-xl">{practice.title}</CardTitle>
                        <CardDescription>{practice.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {practice.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Common Mistakes to Avoid</h2>
            
            <div className="space-y-6">
              {commonMistakes.map((mistake, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg mb-2">{mistake.title}</h3>
                        <p className="text-slate-600 mb-3">{mistake.description}</p>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-green-800 text-sm">
                            <strong>Solution:</strong> {mistake.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Advanced Optimization Tips</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {advancedTips.map((tip, index) => (
                <Card key={index} className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-blue-900">{tip.title}</h3>
                    <p className="text-blue-800">{tip.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Apply These Strategies?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Put these best practices into action by creating optimized listings with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Wizard")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Create Optimized Listing
              </Button>
            </Link>
            <Link to={createPageUrl("Documentation")}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">
                More Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}