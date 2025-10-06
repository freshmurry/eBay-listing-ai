// Sitemap Generator for eBay Listing AI
// This generates an XML sitemap for better SEO crawling

const generateSitemap = () => {
  const baseUrl = 'https://ebaylistingai.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    // Main pages
    { loc: '/', changefreq: 'daily', priority: '1.0', lastmod: currentDate },
    { loc: '/Features', changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
    { loc: '/Pricing', changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
    { loc: '/About', changefreq: 'monthly', priority: '0.8', lastmod: currentDate },
    { loc: '/Contact', changefreq: 'monthly', priority: '0.7', lastmod: currentDate },
    { loc: '/Documentation', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
    { loc: '/Blog', changefreq: 'daily', priority: '0.8', lastmod: currentDate },
    { loc: '/FAQ', changefreq: 'weekly', priority: '0.7', lastmod: currentDate },
    
    // Legal pages
    { loc: '/Privacy', changefreq: 'monthly', priority: '0.5', lastmod: currentDate },
    { loc: '/Terms', changefreq: 'monthly', priority: '0.5', lastmod: currentDate },
    
    // Blog posts
    { loc: '/blog/ten-strategies-increase-sales', changefreq: 'weekly', priority: '0.8', lastmod: '2025-10-01' },
    { loc: '/blog/ultimate-guide-ebay-seo-optimization', changefreq: 'weekly', priority: '0.8', lastmod: '2025-09-28' },
    { loc: '/blog/ai-revolutionizing-ecommerce-content-creation', changefreq: 'weekly', priority: '0.8', lastmod: '2025-09-25' },
    
    // Application pages (require authentication)
    { loc: '/Login', changefreq: 'never', priority: '0.3', lastmod: currentDate },
    { loc: '/Signup', changefreq: 'never', priority: '0.3', lastmod: currentDate },
    { loc: '/Dashboard', changefreq: 'never', priority: '0.1', lastmod: currentDate },
    { loc: '/Wizard', changefreq: 'never', priority: '0.1', lastmod: currentDate },
    { loc: '/MyListings', changefreq: 'never', priority: '0.1', lastmod: currentDate },
  ];

  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
  
  const urlEntries = urls.map(url => {
    return `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
  }).join('\n');
  
  const urlsetClose = '\n</urlset>';
  
  return xmlHeader + urlsetOpen + urlEntries + urlsetClose;
};

// Robots.txt content
export const robotsTxt = `User-agent: *
Allow: /
Disallow: /Dashboard
Disallow: /Wizard
Disallow: /MyListings
Disallow: /AccountSettings
Disallow: /ResetPassword

# Sitemap
Sitemap: https://ebaylistingai.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;

// Generate and save sitemap
export const saveSitemap = () => {
  const sitemapContent = generateSitemap();
  
  // In a real application, you would save this to your public directory
  // For now, we'll log it to console
  console.log('Generated sitemap.xml:');
  console.log(sitemapContent);
  
  return sitemapContent;
};

export default generateSitemap;