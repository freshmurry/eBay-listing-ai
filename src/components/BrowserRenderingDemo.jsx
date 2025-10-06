import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TakeScreenshot, ScrapeContent, ExtractLinks, ExtractPageContent } from '@/api/integrations';

export default function BrowserRenderingDemo() {
  const [url, setUrl] = useState('https://example.com');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});

  const handleScreenshot = async () => {
    setLoading(true);
    try {
      const result = await TakeScreenshot({ url });
      setResults(prev => ({ ...prev, screenshot: result }));
    } catch (error) {
      console.error('Screenshot error:', error);
    }
    setLoading(false);
  };

  const handleScrapeContent = async () => {
    setLoading(true);
    try {
      const result = await ScrapeContent({ url, selector: 'body' });
      setResults(prev => ({ ...prev, scrape: result }));
    } catch (error) {
      console.error('Scrape error:', error);
    }
    setLoading(false);
  };

  const handleExtractLinks = async () => {
    setLoading(true);
    try {
      const result = await ExtractLinks({ url });
      setResults(prev => ({ ...prev, links: result }));
    } catch (error) {
      console.error('Links error:', error);
    }
    setLoading(false);
  };

  const handleExtractContent = async () => {
    setLoading(true);
    try {
      const result = await ExtractPageContent({ url });
      setResults(prev => ({ ...prev, content: result }));
    } catch (error) {
      console.error('Content error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🌐 Browser Rendering & Web Scraping Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to analyze..."
              className="flex-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleScreenshot} disabled={loading}>
              📸 Take Screenshot
            </Button>
            <Button onClick={handleScrapeContent} disabled={loading}>
              🔍 Scrape Content
            </Button>
            <Button onClick={handleExtractLinks} disabled={loading}>
              🔗 Extract Links
            </Button>
            <Button onClick={handleExtractContent} disabled={loading}>
              📄 Get Page Content
            </Button>
          </div>
        </CardContent>
      </Card>

      {results.screenshot && (
        <Card>
          <CardHeader>
            <CardTitle>Screenshot Result</CardTitle>
          </CardHeader>
          <CardContent>
            {results.screenshot.success ? (
              <div>
                <p className="text-green-600 mb-2">✅ Screenshot taken successfully!</p>
                {results.screenshot.url && (
                  <img 
                    src={results.screenshot.url} 
                    alt="Website screenshot" 
                    className="max-w-full h-auto border rounded"
                  />
                )}
              </div>
            ) : (
              <p className="text-red-600">❌ Screenshot failed: {results.screenshot.error}</p>
            )}
          </CardContent>
        </Card>
      )}

      {results.scrape && (
        <Card>
          <CardHeader>
            <CardTitle>Scraped Content</CardTitle>
          </CardHeader>
          <CardContent>
            {results.scrape.success ? (
              <div>
                <p className="text-green-600 mb-2">✅ Content scraped successfully!</p>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-40">
                  {JSON.stringify(results.scrape.content, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-red-600">❌ Scraping failed: {results.scrape.error}</p>
            )}
          </CardContent>
        </Card>
      )}

      {results.links && (
        <Card>
          <CardHeader>
            <CardTitle>Extracted Links</CardTitle>
          </CardHeader>
          <CardContent>
            {results.links.success ? (
              <div>
                <p className="text-green-600 mb-2">✅ Links extracted successfully!</p>
                <div className="space-y-1 max-h-40 overflow-auto">
                  {results.links.links?.map((link, index) => (
                    <div key={index} className="text-sm">
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {link.text || link.href}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-red-600">❌ Link extraction failed: {results.links.error}</p>
            )}
          </CardContent>
        </Card>
      )}

      {results.content && (
        <Card>
          <CardHeader>
            <CardTitle>Page Content</CardTitle>
          </CardHeader>
          <CardContent>
            {results.content.success ? (
              <div>
                <p className="text-green-600 mb-2">✅ Content extracted successfully!</p>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-40">
                  {JSON.stringify(results.content.content, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-red-600">❌ Content extraction failed: {results.content.error}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}