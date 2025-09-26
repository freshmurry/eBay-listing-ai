
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[var(--border-color)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                <i className="bi bi-stars text-xl text-white"></i>
              </div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">eBay DescriptionAI</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to={createPageUrl("Pricing")}>
                <Button variant="ghost" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Pricing
                </Button>
              </Link>
              <Link to={createPageUrl("FAQ")}>
                <Button variant="ghost" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  FAQ
                </Button>
              </Link>
              <Button variant="outline" className="border-[var(--border-color)]" onClick={() => window.location.href = '/auth/login'}>
                Sign In
              </Button>
              <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white" onClick={() => window.location.href = '/auth/signup'}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 mb-6">
            <i className="bi bi-stars mr-2"></i>
            AI-Powered eBay Listings
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6">
            Generate Professional eBay Listings in
            <span className="text-brand-primary"> Minutes</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Transform any product URL into a stunning, SEO-optimized eBay listing with AI-powered copywriting, 
            professional templates, and smart optimization features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 text-lg" onClick={() => window.location.href = '/auth/signup'}>
              <i className="bi bi-rocket-takeoff mr-2"></i>
              Start Free Trial
            </Button>
            <Link to={createPageUrl("Demo")}>
              <Button size="lg" variant="outline" className="border-[var(--border-color)] px-8 py-4 text-lg">
                <i className="bi bi-play-circle mr-2"></i>
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Everything You Need to Dominate eBay
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Our AI-powered platform handles every aspect of creating professional eBay listings
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-globe text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>URL to Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  Paste any product URL and watch our AI extract title, description, images, and specifications automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-magic text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>AI Copywriting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  Transform basic product info into compelling, SEO-optimized copy that converts browsers into buyers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-search text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>SEO Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  Boost visibility with intelligent keyword research, competitor analysis, and eBay-specific SEO tactics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-images text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>Image Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  Upload, organize, and optimize product images with drag-and-drop simplicity and automatic resizing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-clock text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>Optimal Timing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  Get AI-powered recommendations for the best days and times to list your items for maximum visibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border-color)] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <i className="bi bi-code-slash text-2xl text-brand-primary"></i>
                </div>
                <CardTitle>Ready-to-Use HTML</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)]">
                  Export professional, responsive HTML that you can copy and paste directly into eBay's listing editor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6 bg-[var(--background-light)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Start Free, Scale as You Grow
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Choose the perfect plan for your eBay business
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="border-[var(--border-color)] bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Free</CardTitle>
                <div className="text-3xl font-bold text-[var(--text-primary)]">$0</div>
                <p className="text-sm text-[var(--text-secondary)]">1 listing/month</p>
              </CardHeader>
            </Card>
            <Card className="border-[var(--border-color)] bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Basic</CardTitle>
                <div className="text-3xl font-bold text-[var(--text-primary)]">$9</div>
                <p className="text-sm text-[var(--text-secondary)]">10 listings/month</p>
              </CardHeader>
            </Card>
            <Card className="border-[var(--border-color)] bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Standard</CardTitle>
                <div className="text-3xl font-bold text-[var(--text-primary)]">$19</div>
                <p className="text-sm text-[var(--text-secondary)]">20 listings/month</p>
              </CardHeader>
            </Card>
            <Card className="border-brand-primary bg-brand-primary/5 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-brand-primary text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Premium</CardTitle>
                <div className="text-3xl font-bold text-brand-primary">$49</div>
                <p className="text-sm text-[var(--text-secondary)]">Unlimited listings</p>
              </CardHeader>
            </Card>
          </div>

          <Link to={createPageUrl("Pricing")}>
            <Button size="lg" className="bg-brand-primary hover:bg-brand-primary-hover text-white">
              View All Plans & Features
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--border-color)] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <i className="bi bi-stars text-white"></i>
                </div>
                <span className="font-bold text-[var(--text-primary)]">eBay DescriptionAI</span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm">
                Generate professional eBay listings with AI-powered optimization.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link to={createPageUrl("Features")}>Features</Link></li>
                <li><Link to={createPageUrl("Pricing")}>Pricing</Link></li>
                <li><Link to={createPageUrl("Demo")}>Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link to={createPageUrl("FAQ")}>FAQ</Link></li>
                <li><Link to={createPageUrl("Help")}>Help Center</Link></li>
                <li><Link to={createPageUrl("Contact")}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link to={createPageUrl("Privacy")}>Privacy Policy</Link></li>
                <li><Link to={createPageUrl("Terms")}>Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--border-color)] mt-8 pt-8 text-center text-sm text-[var(--text-secondary)]">
            © 2024 eBay DescriptionAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
