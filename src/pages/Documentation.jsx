import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Zap, Shield, BarChart3, Clock, Trophy, BookOpen, Code, Play, FileText, Download, ExternalLink, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const documentationSections = [
  {
    icon: <BookOpen className="h-8 w-8 text-blue-600" />,
    title: "GettingStarted",
    description: "Complete walkthrough from account setup to your first eBay listing description.",
    topics: ["Account registration", "Initial setup", "Creating your first description", "Publishing to eBay"]
  },
  {
    icon: <Code className="h-8 w-8 text-green-600" />,
    title: "CreateFirstDescription", 
    description: "Step-by-step tutorial to create your first professional eBay listing description.",
    topics: ["Product analysis", "Description generation", "SEO optimization", "Final review"]
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-purple-600" />,
    title: "BestPractices",
    description: "Proven strategies to maximize your eBay listing performance and sales conversion.",
    topics: ["SEO optimization", "Keyword research", "Image guidelines", "Pricing strategies"]
  },
  {
    icon: <FileText className="h-8 w-8 text-orange-600" />,
    title: "Advanced Features",
    description: "Master advanced tools like bulk processing, custom templates, and analytics.",
    topics: ["Bulk operations", "Custom templates", "Performance analytics", "Integration options"]
  }
];

const tutorials = [
  { title: "CreateFirstDescription", duration: "5 min read", difficulty: "Beginner" },
  { title: "BestPractices", duration: "8 min read", difficulty: "Intermediate" },
  { title: "GettingStarted", duration: "3 min read", difficulty: "Beginner" },
  { title: "Integrating with Your Existing Workflow", duration: "12 min read", difficulty: "Advanced" },
  { title: "Understanding Analytics and Performance Metrics", duration: "6 min read", difficulty: "Intermediate" }
];

const faqs = [
  {
    question: "How accurate are the AI-generated descriptions?",
    answer: "Our AI achieves 99.8% accuracy in generating relevant, compelling descriptions. The system is trained on millions of successful eBay listings and continuously improved based on performance data."
  },
  {
    question: "Can I customize the generated descriptions?",
    answer: "Absolutely! Every generated description can be fully customized. You can edit, add, or remove content to match your brand voice and specific requirements."
  },
  {
    question: "Is there a limit to how many descriptions I can generate?",
    answer: "Limits depend on your subscription plan. Free users get 3 descriptions total, while paid plans offer unlimited generations with various feature tiers."
  },
  {
    question: "How does the URL extraction feature work?",
    answer: "Simply paste any product URL from major e-commerce sites. Our AI extracts product details, images, specifications, and pricing to automatically generate a comprehensive eBay description."
  }
];

export default function Documentation() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Documentation - eBay Listing AI | Complete User Guide & API Docs"
        description="Complete documentation for eBay Listing AI. Learn how to create perfect listings, use advanced features, integrate APIs, and maximize your eBay sales with our comprehensive guides."
        keywords="eBay Listing AI documentation, user guide, API documentation, tutorial, how to create listings, help center"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-documentation.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Documentation"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              📚 Comprehensive Documentation
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Master Our Platform</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              From beginner tutorials to advanced API integration, find all the resources you need 
              to maximize your eBay selling success with our AI tools.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to={createPageUrl("Wizard")}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                  Start Creating Now
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => document.getElementById('getting-started').scrollIntoView()}>
                View Getting Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section id="getting-started" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Documentation Sections
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Choose your learning path based on your experience level and goals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {documentationSections.map((section, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {section.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={createPageUrl(`Documentation/${section.title.replace(/[^a-zA-Z0-9]/g, '')}`)}>  
                    <Button variant="outline" className="w-full">
                      Read Documentation
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Step-by-Step Tutorials
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Learn with practical, hands-on tutorials designed for real-world scenarios.
            </p>
          </div>

          <div className="space-y-4">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-1">{tutorial.title}</h3>
                    <div className="flex gap-4 text-sm text-slate-600">
                      <span>{tutorial.duration}</span>
                      <Badge variant={tutorial.difficulty === 'Beginner' ? 'default' : tutorial.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Link to={createPageUrl(`Documentation/${tutorial.title.replace(/[^a-zA-Z0-9]/g, '')}`)}>  
                    <Button variant="ghost">
                      Read Tutorial →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Quick answers to common questions about our platform and features.
            </p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Can't find what you're looking for?</p>
            <Link to={createPageUrl("FAQ")}>
              <Button variant="outline">
                View All FAQs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Put This Knowledge to Work?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Start creating professional eBay descriptions with our AI-powered tools. 
            No experience necessary - our documentation will guide you every step of the way.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to={createPageUrl("Wizard")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3">
                Create Your First Description
                <BookOpen className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl("About")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}