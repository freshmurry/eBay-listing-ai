import React from 'react';

const SEOHead = ({ 
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  children
}) => {
  const baseUrl = 'https://ebaylistingai.com';
  const fullTitle = title ? `${title} | eBay Listing AI` : 'eBay Listing AI - AI-Powered eBay Description Generator';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgImage = ogImage || `${baseUrl}/og-image.png`;

  React.useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    if (description) updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index,follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1');
    updateMetaTag('author', 'eBay Listing AI');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, 'property');
    updateMetaTag('og:description', description || 'Create compelling eBay listing descriptions with AI technology. Boost your sales with SEO-optimized, conversion-focused product descriptions.', 'property');
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:url', fullCanonical, 'property');
    updateMetaTag('og:image', fullOgImage, 'property');
    updateMetaTag('og:site_name', 'eBay Listing AI', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description || 'Create compelling eBay listing descriptions with AI technology.', 'property');
    updateMetaTag('twitter:image', fullOgImage);
    updateMetaTag('twitter:site', '@ebaylistingai');

    // Canonical link
    let canonical_link = document.querySelector('link[rel="canonical"]');
    if (!canonical_link) {
      canonical_link = document.createElement('link');
      canonical_link.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical_link);
    }
    canonical_link.setAttribute('href', fullCanonical);

    // Structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Add hreflang for international SEO
    const hreflangLinks = [
      { lang: 'en', region: 'us', href: fullCanonical },
      { lang: 'en', region: 'gb', href: fullCanonical },
      { lang: 'en', region: 'ca', href: fullCanonical },
      { lang: 'en', region: 'au', href: fullCanonical }
    ];

    hreflangLinks.forEach(({ lang, region, href }) => {
      let hreflang = document.querySelector(`link[hreflang="${lang}-${region}"]`);
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', `${lang}-${region}`);
        document.head.appendChild(hreflang);
      }
      hreflang.setAttribute('href', href);
    });

    // Add x-default hreflang
    let xDefault = document.querySelector('link[hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute('href', fullCanonical);

  }, [fullTitle, description, keywords, fullCanonical, fullOgImage, ogType, twitterCard, structuredData]);

  return (
    <>
      {children}
      {/* Additional head elements can be added here */}
    </>
  );
};

// Organization structured data
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "eBay Listing AI",
  "url": "https://ebaylistingai.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://ebaylistingai.com/logo.png",
    "width": 600,
    "height": 200
  },
  "description": "AI-powered eBay listing description generator helping sellers create compelling, SEO-optimized product descriptions.",
  "founder": {
    "@type": "Person",
    "name": "Lawrence Murry"
  },
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "CA",
    "addressLocality": "San Francisco"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-EBAY-AI1",
    "contactType": "customer service",
    "email": "info@ebaylistingdescriptionai.com",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://twitter.com/ebaylistingai",
    "https://github.com/ebaylistingai"
  ]
};

// Software application structured data
export const softwareApplicationStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "eBay Listing AI",
  "description": "AI-powered tool for creating compelling eBay listing descriptions that boost sales and improve search rankings.",
  "url": "https://ebaylistingai.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free plan available with premium features"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "2547",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "AI-powered description generation",
    "SEO optimization",
    "eBay marketplace integration",
    "Bulk processing",
    "Mobile optimization",
    "Performance analytics"
  ]
};

export default SEOHead;