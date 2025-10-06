import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Zap, Shield, BarChart3, Clock, Trophy, Heart, Target, Award, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const teamMembers = [
  {
    name: "Lawrence Murry",
    role: "CEO & Co-Founder",
    bio: "Former eBay Seller with 18+ years in e-commerce. Built marketplaces serving thousands of customers."
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder", 
    bio: "AI/ML Engineer from Google. Specialized in natural language processing and recommendation systems."
  },
  {
    name: "Emily Watson",
    role: "Head of Product",
    bio: "UX expert who's helped scale startups from MVP to IPO. Passionate about seller empowerment."
  },
  {
    name: "David Kim",
    role: "Lead AI Engineer",
    bio: "PhD in Computer Science. Published researcher in AI-generated content and marketplace optimization."
  }
];

const values = [
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "Seller-First Approach",
    description: "Every feature we build is designed with sellers' success in mind. Your growth is our mission."
  },
  {
    icon: <Target className="h-8 w-8 text-blue-500" />,
    title: "Innovation Excellence", 
    description: "We push the boundaries of AI technology to give you competitive advantages in the marketplace."
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: "Trust & Transparency",
    description: "We believe in honest pricing, clear communication, and building long-term partnerships."
  },
  {
    icon: <Globe className="h-8 w-8 text-purple-500" />,
    title: "Global Impact",
    description: "Empowering sellers worldwide to build successful businesses and achieve financial independence."
  }
];

const milestones = [
  { year: "2025", title: "Company Founded", description: "Started with a vision to democratize AI for eBay sellers" },
  { year: "2025", title: "MVP Launch", description: "Released first version serving 100+ beta users" },
  { year: "2025", title: "10K Users", description: "Reached 10,000 active sellers generating millions in sales" },
  { year: "2025", title: "AI Enhancement", description: "Launched GPT-4 powered descriptions with 99.8% accuracy" },
  { year: "2025", title: "Global Expansion", description: "Serving sellers in 50+ countries with localized features" }
];

const stats = [
  { number: "50,000+", label: "Active Sellers" },
  { number: "$100M+", label: "Generated Sales" },
  { number: "2M+", label: "Descriptions Created" },
  { number: "98%", label: "Customer Satisfaction" }
];

export default function About() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="About Us - eBay Listing AI | Meet Our Team & Company Mission"
        description="Learn about eBay Listing AI's mission to revolutionize e-commerce with AI technology. Meet our experienced team led by Lawrence Murry, former eBay seller with 18+ years experience."
        keywords="about eBay Listing AI, company mission, e-commerce team, Lawrence Murry, AI technology leadership"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-about.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/About"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              🌟 Trusted by 50,000+ Sellers Worldwide
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Empowering eBay Sellers with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Innovation</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              We're on a mission to democratize AI technology for e-commerce sellers, helping you build 
              successful businesses with cutting-edge tools and unwavering support.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to={createPageUrl("Wizard")}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                  Start Your Journey
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
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

      {/* Mission Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-slate-600">
                We believe that every seller deserves access to enterprise-level AI tools, regardless of their size or budget. 
                Our platform democratizes advanced technology, making it simple and affordable for anyone to create 
                professional eBay listings that drive results.
              </p>
              <p className="mt-4 text-lg text-slate-600">
                Since our founding, we've helped sellers generate over $100 million in sales through better listings, 
                proving that the right tools can truly transform businesses.
              </p>
              <div className="mt-8">
                <Link to={createPageUrl("Features")}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Explore Our Features
                    <Target className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              We're a diverse team of technologists, sellers, and innovators united by our passion 
              for helping businesses succeed.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Journey
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              From a simple idea to serving thousands of sellers worldwide.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-1">{milestone.title}</h3>
                  <p className="text-slate-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get In Touch
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Have questions? Want to partner with us? We'd love to hear from you.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-slate-600 mb-4">Get support or ask questions</p>
                <a href="mailto:info@ebaylistingdescriptionai.com" className="text-blue-600 hover:underline">
                  info@ebaylistingdescriptionai.com
                </a>
              </CardContent>
            </Card>

            {/* <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-slate-600 mb-4">Speak with our team</p>
                <a href="tel:+1-555-EBAY-AI1" className="text-green-600 hover:underline">
                  +1 (555) EBAY-AI1
                </a>
              </CardContent>
            </Card> */}

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-slate-600 mb-4">Our headquarters</p>
                <address className="text-purple-600 not-italic">
                  Chicago, IL<br />
                  United States
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Join Our Success Story?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Become part of a community of successful sellers who are transforming their eBay businesses with AI.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to={createPageUrl("Wizard")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3">
                Start Creating Today
                <Award className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl("Pricing")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                View Our Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}