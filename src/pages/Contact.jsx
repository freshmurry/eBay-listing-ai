import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Zap, Shield, BarChart3, Clock, Trophy, Mail, Phone, MapPin, MessageCircle, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const contactMethods = [
  {
    icon: <Mail className="h-8 w-8 text-blue-600" />,
    title: "Email Support",
    description: "Get detailed help with technical questions and account issues.",
    detail: "info@ebaylistingdescriptionai.com",
    response: "Within 24 hours",
    action: "Send Email",
    link: "mailto:info@ebaylistingdescriptionai.com"
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-green-600" />,
    title: "Live Chat",
    description: "Instant support for urgent questions during business hours.",
    detail: "Available 9 AM - 6 PM PST",
    response: "Immediate",
    action: "Start Chat",
    link: "#chat"
  },
  {
    icon: <Phone className="h-8 w-8 text-purple-600" />,
    title: "Phone Support",
    description: "Speak directly with our technical support team.",
    detail: "+1 (555) EBAY-AI1",
    response: "Immediate",
    action: "Call Now",
    link: "tel:+1-555-EBAY-AI1"
  },
  {
    icon: <Calendar className="h-8 w-8 text-orange-600" />,
    title: "Schedule a Demo",
    description: "Book a personalized demo with our product specialists.",
    detail: "30-minute sessions available",
    response: "Same day booking",
    action: "Book Demo",
    link: "#demo"
  }
];

const supportTopics = [
  {
    category: "Getting Started",
    topics: ["Account setup", "First description creation", "eBay integration", "Basic troubleshooting"]
  },
  {
    category: "Technical Support",
    topics: ["API integration", "Bulk processing", "Performance issues", "Feature requests"]
  },
  {
    category: "Billing & Plans",
    topics: ["Subscription management", "Payment issues", "Plan upgrades", "Refund requests"]
  },
  {
    category: "Business Inquiries",
    topics: ["Enterprise solutions", "Partnership opportunities", "Custom integrations", "Volume discounts"]
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Contact Us - eBay Listing AI | Get Support & Sales Help"
        description="Contact eBay Listing AI for support, sales questions, or partnership inquiries. 24/7 support available. Email, live chat, and phone support options available."
        keywords="contact eBay Listing AI, customer support, sales help, technical support, partnership inquiries"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-contact.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Contact"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              💬 24/7 Support Available
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Get the Help You Need,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> When You Need It</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Our dedicated support team is here to help you succeed. Whether you're just getting started 
              or scaling your business, we're committed to your success.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3" onClick={() => document.getElementById('contact-methods').scrollIntoView()}>
                Get Support Now
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
              <Link to={createPageUrl("FAQ")}>
                <Button size="lg" variant="outline" className="px-8 py-3">
                  Browse FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section id="contact-methods" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Choose Your Preferred Contact Method
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              We offer multiple ways to get in touch, ensuring you can reach us however is most convenient for you.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {contactMethods.map((method, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {method.icon}
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Contact:</span>
                      <span className="text-sm font-medium">{method.detail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Response time:</span>
                      <span className="text-sm font-medium">{method.response}</span>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <a href={method.link}>
                      {method.action}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Topics */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Can We Help You With?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Browse common support categories to find the right help for your specific needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {supportTopics.map((category, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
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
            Still Have Questions?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Don't hesitate to reach out. Our team is here to ensure you get the most out of our platform 
            and achieve your eBay selling goals.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3" asChild>
              <a href="mailto:info@ebaylistingdescriptionai.com">
                Send Us an Email
                <Mail className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Link to={createPageUrl("Documentation")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Browse Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}