import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Zap, Shield, BarChart3, Clock, Trophy, Calendar, RefreshCw, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const blogPosts = [
  {
    title: "10 Proven Strategies to Increase eBay Sales in 2025",
    excerpt: "Discover the latest techniques that top sellers are using to boost their conversion rates and maximize profits.",
    date: "October 1, 2025",
    readTime: "8 min read",
    category: "Sales Strategy",
    featured: true,
    slug: "ten-strategies-increase-sales"
  },
  {
    title: "The Ultimate Guide to eBay SEO Optimization",
    excerpt: "Master the art of eBay search optimization with our comprehensive guide to keywords, categories, and listing structure.",
    date: "September 28, 2025",
    readTime: "12 min read",
    category: "SEO & Marketing",
    slug: "ultimate-guide-ebay-seo-optimization"
  },
  {
    title: "How AI is Revolutionizing E-commerce Content Creation",
    excerpt: "Explore the impact of artificial intelligence on product descriptions, customer engagement, and sales conversion.",
    date: "September 25, 2025",
    readTime: "6 min read",
    category: "Technology",
    slug: "ai-revolutionizing-ecommerce-content-creation"
  },
  {
    title: "Case Study: How Sarah Increased Her eBay Revenue by 300%",
    excerpt: "Follow Sarah's journey from struggling seller to eBay success story using AI-powered listing optimization.",
    date: "September 22, 2025",
    readTime: "10 min read",
    category: "Case Study",
    slug: "case-study-sarah-300-percent-revenue-increase"
  },
  {
    title: "Mobile Commerce Trends: Optimizing for Mobile Buyers",
    excerpt: "Learn how to create mobile-friendly listings that convert, as mobile commerce continues to dominate eBay.",
    date: "September 18, 2025",
    readTime: "7 min read",
    category: "Mobile Commerce",
    slug: "mobile-commerce-trends-optimizing-mobile-buyers"
  },
  {
    title: "International Selling: Expanding Your eBay Business Globally",
    excerpt: "Everything you need to know about selling internationally on eBay, from shipping to currency considerations.",
    date: "September 15, 2025",
    readTime: "9 min read",
    category: "International",
    slug: "international-selling-expanding-ebay-business-globally"
  }
];

const categories = [
  { name: "Sales Strategy", count: 15 },
  { name: "SEO & Marketing", count: 12 },
  { name: "Technology", count: 8 },
  { name: "Case Studies", count: 6 },
  { name: "Mobile Commerce", count: 5 },
  { name: "International", count: 4 }
];

const featuredResources = [
  {
    title: "eBay Seller's Toolkit",
    description: "Essential tools and resources every eBay seller needs to succeed.",
    downloadCount: "10,000+"
  },
  {
    title: "Keyword Research Guide",
    description: "Step-by-step guide to finding profitable keywords for your listings.",
    downloadCount: "8,500+"
  },
  {
    title: "Pricing Strategy Worksheet",
    description: "Calculate optimal pricing for maximum profit and competitiveness.",
    downloadCount: "7,200+"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="eBay Selling Success Blog & Resources | Expert Tips & Strategies"
        description="Master eBay selling with expert guides, SEO tips, AI strategies, and proven techniques. Stay updated with the latest e-commerce trends and boost your sales performance."
        keywords="eBay selling tips, e-commerce blog, eBay SEO guide, selling strategies, AI e-commerce, online marketplace success"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-blog.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Blog"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              📝 Latest Insights & Strategies
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              eBay Selling Success
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Blog & Resources</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Stay ahead of the competition with expert insights, proven strategies, and the latest trends 
              in eBay selling and e-commerce marketing.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to={createPageUrl("Wizard")}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                  Start Creating Descriptions
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => document.getElementById('featured-post').scrollIntoView()}>
                Read Latest Post
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section id="featured-post" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge className="bg-yellow-100 text-yellow-800">Featured Post</Badge>
          </div>
          <Card className="overflow-hidden border-2 border-blue-200 hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div>
                  <Badge className="mb-3 bg-blue-100 text-blue-800">
                    {blogPosts[0].category}
                  </Badge>
                  <h3 className="font-semibold text-xl mb-2">{blogPosts[0].title}</h3>
                  <p className="text-lg text-slate-600 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {blogPosts[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <Link to={`/blog/${blogPosts[0].slug}`}>
                    <Button size="lg">
                      Read Full Article
                      <CheckCircle className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-lg text-center">
                  <BarChart3 className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-slate-700">
                    Boost Your Sales with Proven Strategies
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
              <div className="space-y-8">
                {blogPosts.slice(1).map((post, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-grow">
                          <Badge className="mb-2 text-xs">
                            {post.category}
                          </Badge>
                          <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                            <Link to={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-slate-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </span>
                            </div>
                            <Link to={`/blog/${post.slug}`}>
                              <Button variant="ghost" size="sm">
                                Read More →
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                        <span className="text-slate-700 hover:text-blue-600 cursor-pointer">
                          {category.name}
                        </span>
                        <Badge variant="secondary">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Free Resources</CardTitle>
                  <CardDescription>
                    Download our free guides and toolkits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredResources.map((resource, index) => (
                      <div key={index} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <h4 className="font-semibold text-sm mb-1">{resource.title}</h4>
                        <p className="text-xs text-slate-600 mb-2">{resource.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-green-600">{resource.downloadCount} downloads</span>
                          <Button size="sm" variant="outline">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle>Stay Updated</CardTitle>
                  <CardDescription>
                    Get the latest tips and strategies delivered to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Subscribe Now
                    </Button>
                    <p className="text-xs text-slate-600">
                      Join 25,000+ sellers getting our weekly newsletter
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Apply These Strategies?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Turn knowledge into action. Start creating better eBay descriptions with our AI-powered tools 
            and implement the strategies you've learned.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to={createPageUrl("Wizard")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3">
                Create Your First Description
                <Zap className="ml-2 h-5 w-5" />
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