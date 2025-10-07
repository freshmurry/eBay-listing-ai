import React from "react";
import { Link } from "react-router-dom";
import { Zap, Github, Twitter, Mail, Instagram } from "lucide-react";
import { createPageUrl } from "@/utils";

const footerSections = {
  product: {
    title: "Product",
    links: [
      { name: "Features", href: "/Features" },
      { name: "Pricing", href: "/Pricing" },
      { name: "FAQ", href: createPageUrl("FAQ") },
      { name: "About", href: "/About" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/Documentation" },
      { name: "API", href: "/Documentation" },
      { name: "Guides", href: "/Blog" },
      { name: "Blog", href: "/Blog" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About", href: "/About" },
      { name: "Careers", href: "/About" },
      { name: "Contact", href: "/Contact" },
      { name: "Privacy", href: "/Privacy" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Terms of Service", href: "/Terms" },
      { name: "Privacy Policy", href: "/Privacy" },
      { name: "Cookie Policy", href: "/Privacy" },
      { name: "GDPR", href: "/Privacy" },
    ],
  },
};

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/ebaylistingai", icon: Twitter },
  { name: "Instagram", href: "https://instagram.com/l.a.murry", icon: Instagram },
  { name: "Email", href: "mailto:info@murryconsultancy.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">eBay DescriptionAI</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 max-w-xs">
              AI-powered eBay listing description generator that creates compelling product descriptions, 
              optimizes SEO, and maximizes your sales potential.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} eBay DescriptionAI. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-sm text-gray-600">
                Built with❤️at <a href="https://murryconsultancy.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Murry Consultancy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}