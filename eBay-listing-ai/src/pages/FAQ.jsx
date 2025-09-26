
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I create my first eBay listing?",
        a: "Simply paste any product URL into our wizard, and our AI will extract all the details automatically. You can then customize the title, description, images, and branding before generating your professional HTML listing."
      },
      {
        q: "What types of URLs does the system support?",
        a: "We support most major e-commerce platforms including Amazon, eBay, Etsy, Shopify stores, AliExpress, and many more. If you have a product page with basic info, our AI can likely extract the details."
      },
      {
        q: "Do I need any technical skills to use this?",
        a: "Not at all! Our platform is designed for sellers of all skill levels. Simply follow our step-by-step wizard, and we'll handle all the technical details. You'll get copy-paste ready HTML at the end."
      }
    ]
  },
  {
    category: "Features & Functionality",
    questions: [
      {
        q: "How does the AI copywriting work?",
        a: "Our AI analyzes your product information and creates compelling, SEO-optimized descriptions that follow eBay's best practices. It includes keyword optimization, benefit-focused language, and proper formatting."
      },
      {
        q: "Can I customize the generated listings?",
        a: "Absolutely! You can edit the title, description, add or remove images, modify SEO keywords, and customize your store branding. The AI provides a great starting point that you can personalize."
      },
      {
        q: "What's included in the SEO optimization?",
        a: "Our SEO features include keyword research, competitor analysis, meta tag generation, Schema.org markup, and optimal timing recommendations to maximize your listing's visibility on eBay."
      }
    ]
  },
  {
    category: "Plans & Billing",
    questions: [
      {
        q: "How does the listing limit work?",
        a: "Each plan includes a monthly allocation of listings. For example, the Basic plan includes 10 listings per month. Limits reset on your billing date each month."
      },
      {
        q: "What happens if I exceed my monthly limit?",
        a: "If you try to create more listings than your plan allows, you'll be prompted to upgrade to a higher tier. You can upgrade instantly and continue creating listings right away."
      },
      {
        q: "Can I downgrade my plan?",
        a: "Yes, you can change your plan at any time. Downgrades take effect at your next billing cycle, while upgrades take effect immediately with prorated pricing."
      },
      {
        q: "Do you offer refunds?",
        a: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund within 30 days of your purchase."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        q: "How do I use the generated HTML in eBay?",
        a: "Copy the generated HTML code and paste it directly into eBay's listing editor. Our HTML is optimized for eBay's system and will display beautifully on desktop and mobile."
      },
      {
        q: "Are the listings mobile-responsive?",
        a: "Yes! All our generated listings are fully responsive and look great on desktop, tablet, and mobile devices. This is crucial since most eBay browsing happens on mobile."
      },
      {
        q: "Can I save and reuse my listings?",
        a: "Absolutely! All your created listings are saved in your account indefinitely. You can access, edit, and regenerate them anytime, even after canceling your subscription."
      },
      {
        q: "What if I need help with my listings?",
        a: "We offer email support for all users and priority support for paid plans. You can also check our knowledge base for tutorials and best practices."
      }
    ]
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (category, index) => {
    const key = `${category}-${index}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-[var(--background-light)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                <i className="bi bi-stars text-xl text-white"></i>
              </div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">eBay DescriptionAI</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link to={createPageUrl("Home")}>
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to={createPageUrl("Pricing")}>
                <Button variant="ghost">Pricing</Button>
              </Link>
              <Button variant="outline" onClick={() => window.location.href = '/auth/login'}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* FAQ Content */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8">
              Find answers to common questions about eBay DescriptionAI
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Input
                type="search"
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]"></i>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredFAQ.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-white border-[var(--border-color)]">
                <CardHeader>
                  <CardTitle className="text-2xl text-[var(--text-primary)] flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                      <i className="bi bi-question-circle text-brand-primary"></i>
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((item, itemIndex) => {
                      const key = `${category.category}-${itemIndex}`;
                      const isOpen = openItems[key];
                      
                      return (
                        <Collapsible key={itemIndex}>
                          <CollapsibleTrigger
                            className="flex items-center justify-between w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-left"
                            onClick={() => toggleItem(category.category, itemIndex)}
                          >
                            <span className="font-semibold text-[var(--text-primary)]">{item.q}</span>
                            <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} text-[var(--text-secondary)]`}></i>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="p-4 text-[var(--text-secondary)] leading-relaxed">
                            {item.a}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {searchTerm && filteredFAQ.length === 0 && (
            <div className="text-center py-12">
              <i className="bi bi-search text-5xl text-slate-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No results found</h3>
              <p className="text-[var(--text-secondary)]">
                Try different search terms or browse all categories above.
              </p>
            </div>
          )}

          {/* Contact Support */}
          <Card className="mt-12 bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 border-brand-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-headset text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                Still need help?
              </h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Our support team is here to help you create amazing eBay listings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white">
                  <i className="bi bi-envelope mr-2"></i>
                  Contact Support
                </Button>
                <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/10">
                  <i className="bi bi-chat-dots mr-2"></i>
                  Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
