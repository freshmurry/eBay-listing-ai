import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, Users, AlertTriangle, Scale, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Terms of Service - eBay Listing AI | Legal Terms & Conditions"
        description="eBay Listing AI terms of service and legal conditions. Understand your rights, responsibilities, and our service agreements. Clear and transparent terms."
        keywords="terms of service, legal terms, user agreement, service conditions, eBay Listing AI terms"
        author="eBay Listing AI"
        ogType="website"
        ogImage="https://ebaylistingai.com/images/og-terms.jpg"
        twitterCard="summary_large_image"
        canonical="https://ebaylistingai.com/Terms"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              📋 Legal Terms & Conditions
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Terms of Service &
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> User Agreement</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              These terms govern your use of our AI-powered eBay listing description service. 
              Please read carefully to understand your rights and responsibilities.
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
                    <Scale className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Fair Terms</h3>
                    <p className="text-sm text-slate-600">Balanced agreement protecting both parties</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Your Rights</h3>
                    <p className="text-sm text-slate-600">Clear explanation of what you can expect</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Responsibilities</h3>
                    <p className="text-sm text-slate-600">What we expect from our users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="prose prose-slate max-w-none">
              <h2>1. Acceptance of Terms</h2>
              
              <p>By accessing or using eBay Listing AI ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.</p>
              
              <p>These Terms constitute a legally binding agreement between you and eBay Listing AI. We may modify these Terms at any time, and such modifications will be effective immediately upon posting. Your continued use of the Service after posting of revised Terms constitutes your acceptance of such revised Terms.</p>

              <h2>2. Description of Service</h2>
              
              <p>eBay Listing AI provides an artificial intelligence-powered platform that generates eBay listing descriptions based on product URLs and user inputs. Our Service includes:</p>
              
              <ul>
                <li>AI-generated product descriptions</li>
                <li>URL-based product data extraction</li>
                <li>eBay-optimized content creation</li>
                <li>Bulk processing capabilities</li>
                <li>Analytics and performance tracking</li>
                <li>Integration tools and APIs</li>
              </ul>

              <h2>3. User Accounts and Registration</h2>
              
              <h3>Account Creation</h3>
              <p>To use certain features of the Service, you must create an account by providing accurate and complete information. You are responsible for:</p>
              <ul>
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your contact information is current and accurate</li>
              </ul>

              <h3>Account Restrictions</h3>
              <p>You may not:</p>
              <ul>
                <li>Create multiple accounts to circumvent limitations</li>
                <li>Share your account with others</li>
                <li>Use false or misleading information during registration</li>
                <li>Create accounts through automated means</li>
              </ul>

              <h2>4. Acceptable Use Policy</h2>
              
              <h3>Permitted Uses</h3>
              <p>You may use the Service to:</p>
              <ul>
                <li>Generate legitimate eBay listing descriptions for your own products</li>
                <li>Improve your existing product descriptions</li>
                <li>Research and analyze market trends (within reasonable limits)</li>
                <li>Integrate our API into your business workflows</li>
              </ul>

              <h3>Prohibited Uses</h3>
              <p>You may not use the Service to:</p>
              <ul>
                <li>Generate content that violates eBay's policies or any applicable laws</li>
                <li>Create false, misleading, or deceptive product descriptions</li>
                <li>Infringe on intellectual property rights of others</li>
                <li>Compete directly with our Service or reverse engineer our technology</li>
                <li>Abuse our systems through excessive API calls or automated scraping</li>
                <li>Generate content for illegal products or services</li>
                <li>Distribute malware, spam, or harmful content</li>
              </ul>

              <h2>5. Subscription Plans and Billing</h2>
              
              <h3>Payment Terms</h3>
              <ul>
                <li>Subscription fees are billed monthly or annually in advance</li>
                <li>All payments are processed securely through Stripe</li>
                <li>Prices are subject to change with 30 days notice</li>
                <li>Refunds are provided in accordance with our refund policy</li>
              </ul>

              <h3>Cancellation</h3>
              <ul>
                <li>You may cancel your subscription at any time</li>
                <li>Cancellation takes effect at the end of your current billing period</li>
                <li>No refunds for partial months unless required by law</li>
                <li>Access continues until the end of the paid period</li>
              </ul>

              <h2>6. Intellectual Property Rights</h2>
              
              <h3>Our IP Rights</h3>
              <p>The Service, including all content, features, and functionality, is owned by eBay Listing AI and is protected by copyright, trademark, and other intellectual property laws. You may not:</p>
              <ul>
                <li>Copy, modify, or distribute our proprietary content</li>
                <li>Reverse engineer our AI models or algorithms</li>
                <li>Use our trademarks without written permission</li>
                <li>Create derivative works based on our Service</li>
              </ul>

              <h3>Your Content Rights</h3>
              <p>You retain ownership of:</p>
              <ul>
                <li>Product information you provide to the Service</li>
                <li>Generated descriptions after creation (with exceptions below)</li>
                <li>Your business data and customer information</li>
              </ul>

              <h3>License Grant</h3>
              <p>By using the Service, you grant us a limited license to:</p>
              <ul>
                <li>Process your input data to generate descriptions</li>
                <li>Use aggregated, anonymized data to improve our AI models</li>
                <li>Display your content within the Service interface</li>
                <li>Backup and secure your data for service provision</li>
              </ul>

              <h2>7. Privacy and Data Protection</h2>
              
              <p>Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
              
              <p>Key privacy commitments:</p>
              <ul>
                <li>We do not sell your personal information to third parties</li>
                <li>Generated descriptions are private to your account</li>
                <li>We implement industry-standard security measures</li>
                <li>You can request deletion of your data at any time</li>
              </ul>

              <h2>8. Service Availability and Support</h2>
              
              <h3>Service Level</h3>
              <p>We strive to maintain high service availability but cannot guarantee uninterrupted access. We aim for:</p>
              <ul>
                <li>99.9% uptime for paid subscribers</li>
                <li>Regular maintenance windows with advance notice</li>
                <li>Prompt resolution of technical issues</li>
                <li>Continuous monitoring and improvement</li>
              </ul>

              <h3>Support</h3>
              <p>We provide support through:</p>
              <ul>
                <li>Email support for all users</li>
                <li>Priority support for paid subscribers</li>
                <li>Comprehensive documentation and FAQs</li>
                <li>Community forums and resources</li>
              </ul>

              <h2>9. Disclaimers and Limitations of Liability</h2>
              
              <h3>Service Disclaimers</h3>
              <p>The Service is provided "as is" without warranties of any kind. We disclaim all warranties, including:</p>
              <ul>
                <li>Accuracy or completeness of generated content</li>
                <li>Compliance with eBay policies (your responsibility to verify)</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Specific business outcomes or sales results</li>
              </ul>

              <h3>Limitation of Liability</h3>
              <p>To the maximum extent permitted by law, we shall not be liable for:</p>
              <ul>
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages exceeding the amount paid for the Service</li>
                <li>Third-party actions or eBay policy violations</li>
              </ul>

              <h2>10. Indemnification</h2>
              
              <p>You agree to indemnify and hold harmless eBay Listing AI from any claims, damages, or expenses arising from:</p>
              <ul>
                <li>Your use of generated descriptions</li>
                <li>Violation of these Terms or applicable laws</li>
                <li>Infringement of third-party rights</li>
                <li>Your business practices or customer relationships</li>
              </ul>

              <h2>11. Termination</h2>
              
              <h3>Termination by You</h3>
              <p>You may terminate your account at any time by:</p>
              <ul>
                <li>Canceling your subscription through your account settings</li>
                <li>Contacting our support team</li>
                <li>Following account deletion procedures</li>
              </ul>

              <h3>Termination by Us</h3>
              <p>We may suspend or terminate your account if you:</p>
              <ul>
                <li>Violate these Terms or our policies</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Abuse our systems or other users</li>
                <li>Fail to pay subscription fees</li>
              </ul>

              <h2>12. Governing Law and Dispute Resolution</h2>
              
              <p>These Terms are governed by the laws of California, United States, without regard to conflict of law principles. Any disputes will be resolved through:</p>
              
              <ol>
                <li><strong>Informal Resolution:</strong> Good faith negotiation for 30 days</li>
                <li><strong>Binding Arbitration:</strong> Individual arbitration in San Francisco, CA</li>
                <li><strong>Class Action Waiver:</strong> No class actions or collective proceedings</li>
              </ol>

              <h2>13. Contact Information</h2>
              
              <p>For questions about these Terms, please contact us:</p>
              
              <div className="bg-slate-50 p-6 rounded-lg mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Legal Department</h4>
                    <p className="text-sm text-slate-600">
                      Email: legal@ebaylistingai.com<br />
                      Response time: Within 5 business days
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
            Questions About Our Terms?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            We're here to help clarify any questions about our terms of service. 
            Contact our legal team for detailed explanations.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3" asChild>
              <a href="mailto:legal@ebaylistingai.com">
                Contact Legal Team
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