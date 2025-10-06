import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Users, Globe, Calendar, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Privacy Policy - eBay Listing AI | Data Protection & Security"
        description="eBay Listing AI privacy policy. Learn how we protect your data, what information we collect, and your rights. GDPR compliant with transparent data practices."
        keywords="privacy policy, data protection, GDPR compliance, data security, user privacy, eBay Listing AI privacy"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-privacy.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Privacy"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              🔒 Your Privacy Matters
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Privacy Policy &
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Data Protection</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              We are committed to protecting your privacy and ensuring the security of your personal information. 
              This policy explains how we collect, use, and safeguard your data.
            </p>
            <div className="mt-10">
              <p className="text-sm text-slate-500">
                Last updated: October 5, 2025 | Effective Date: October 5, 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-blue-50 border-blue-200 mb-12">
              <CardContent className="p-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Data Protection</h3>
                    <p className="text-sm text-slate-600">Enterprise-grade security protects your information</p>
                  </div>
                  <div className="text-center">
                    <Eye className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Transparency</h3>
                    <p className="text-sm text-slate-600">Clear information about what data we collect and why</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Your Rights</h3>
                    <p className="text-sm text-slate-600">Full control over your personal information</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="prose prose-slate max-w-none">
              <h2>1. Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <p>When you create an account or use our services, we may collect:</p>
              <ul>
                <li>Name and email address</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>eBay integration data (when you connect your eBay account)</li>
                <li>Communication preferences and settings</li>
              </ul>

              <h3>Usage Information</h3>
              <p>To improve our services, we automatically collect:</p>
              <ul>
                <li>Product URLs you submit for description generation</li>
                <li>Generated descriptions and your modifications</li>
                <li>Feature usage patterns and performance metrics</li>
                <li>Device information and IP address for security purposes</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              
              <h3>Service Delivery</h3>
              <ul>
                <li>Generate AI-powered eBay listing descriptions</li>
                <li>Process payments and manage your subscription</li>
                <li>Provide customer support and technical assistance</li>
                <li>Send important service updates and notifications</li>
              </ul>

              <h3>Product Improvement</h3>
              <ul>
                <li>Analyze usage patterns to enhance our AI models</li>
                <li>Develop new features based on user needs</li>
                <li>Ensure platform security and prevent abuse</li>
                <li>Conduct research to improve description quality</li>
              </ul>

              <h2>3. Information Sharing and Disclosure</h2>
              
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in these limited circumstances:</p>
              
              <h3>Service Providers</h3>
              <ul>
                <li><strong>Payment Processing:</strong> Stripe for secure payment handling</li>
                <li><strong>Cloud Infrastructure:</strong> Cloudflare and AWS for hosting and security</li>
                <li><strong>Analytics:</strong> Privacy-focused analytics to understand usage patterns</li>
                <li><strong>Email Services:</strong> Transactional emails and support communications</li>
              </ul>

              <h3>Legal Requirements</h3>
              <p>We may disclose information when required by law, such as:</p>
              <ul>
                <li>Responding to valid legal requests or court orders</li>
                <li>Protecting our rights, property, or safety</li>
                <li>Preventing fraud or security threats</li>
                <li>Complying with applicable regulations</li>
              </ul>

              <h2>4. Data Security</h2>
              
              <p>We implement industry-standard security measures to protect your information:</p>
              
              <h3>Technical Safeguards</h3>
              <ul>
                <li>Encryption in transit and at rest using AES-256</li>
                <li>Secure API endpoints with rate limiting</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Multi-factor authentication for admin access</li>
              </ul>

              <h3>Operational Safeguards</h3>
              <ul>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Employee training on data protection best practices</li>
                <li>Incident response procedures for data breaches</li>
                <li>Regular backups with encrypted storage</li>
              </ul>

              <h2>5. Your Privacy Rights</h2>
              
              <p>You have the following rights regarding your personal information:</p>
              
              <h3>Access and Portability</h3>
              <ul>
                <li>Request a copy of your personal data</li>
                <li>Export your generated descriptions and settings</li>
                <li>Download your account information in a portable format</li>
              </ul>

              <h3>Correction and Deletion</h3>
              <ul>
                <li>Update or correct inaccurate personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of marketing communications</li>
              </ul>

              <h3>Control and Consent</h3>
              <ul>
                <li>Manage your privacy settings and preferences</li>
                <li>Withdraw consent for data processing</li>
                <li>Object to automated decision-making</li>
              </ul>

              <h2>6. International Data Transfers</h2>
              
              <p>Our services are hosted in the United States. If you are accessing our services from outside the US, your information may be transferred to, stored, and processed in the United States. We ensure appropriate safeguards are in place for international transfers, including:</p>
              
              <ul>
                <li>Compliance with applicable data protection laws</li>
                <li>Standard contractual clauses for data transfers</li>
                <li>Adequate security measures in all jurisdictions</li>
              </ul>

              <h2>7. Children's Privacy</h2>
              
              <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.</p>

              <h2>8. Changes to This Policy</h2>
              
              <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. When we make changes, we will:</p>
              
              <ul>
                <li>Post the updated policy on our website</li>
                <li>Update the "Last Modified" date</li>
                <li>Notify you of significant changes via email</li>
                <li>Provide a summary of changes when material</li>
              </ul>

              <h2>9. Contact Information</h2>
              
              <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              
              <div className="bg-slate-50 p-6 rounded-lg mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Privacy Officer</h4>
                    <p className="text-sm text-slate-600">
                      Email: privacy@ebaylistingdescriptionai.com<br />
                      Response time: Within 48 hours
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">General Support</h4>
                    <p className="text-sm text-slate-600">
                      Email: info@ebaylistingdescriptionai.com<br />
                      Phone: +1 (555) EBAY-AI1
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Questions About Your Privacy?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            We're committed to transparency and protecting your rights. 
            Contact us anytime for clarification or to exercise your privacy rights.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3" asChild>
              <a href="mailto:privacy@ebaylistingdescriptionai.com">
                Contact Privacy Team
                <Mail className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                General Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}