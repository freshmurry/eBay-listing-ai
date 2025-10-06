
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { InvokeLLM } from "@/api/integrations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function StepProductSource({ project, updateProject, onStepComplete, onNext, onPrev, isFirstStep }) {
  const [url, setUrl] = useState(project?.productUrl || "");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isScrapingUrl, setIsScrapingUrl] = useState(false);
  const [originalDescription, setOriginalDescription] = useState("");

  useEffect(() => {
    if (project?.description) {
      setOriginalDescription(project.description);
    }
  }, [project]);

  const handleInputChange = (field, value) => {
    updateProject({
      [field]: value
    });
  };

  const scrapeProductUrl = async () => {
    if (!url.trim()) {
      alert("Please enter a valid product URL");
      return;
    }

    // Basic URL validation
    if (!url.trim().startsWith('http')) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setIsScrapingUrl(true);
    try {
      // Import the scraping function
      const { ScrapeContent } = await import("@/api/integrations");
      
      console.log('Starting URL scrape for:', url.trim());
      
      const result = await ScrapeContent({
        url: url.trim()
      });
      
      console.log('Scrape result:', result);

      if (result.success && result.content) {
        console.log('Scraped content length:', result.content.length);
        
        // Use AI to extract product information from scraped content
        const extractionResult = await InvokeLLM({
          prompt: `Extract product information from this webpage content and format it for an eBay listing:

Content: "${result.content.substring(0, 4000)}..." 

Please extract and return ONLY a JSON object with these fields:
{
  "title": "Product title (50-80 characters, eBay optimized)",
  "description": "Detailed product description in HTML format with bullet points and key features",
  "price": "Price if found",
  "images": "Array of image URLs if found",
  "specifications": "Key product specifications"
}

Make the title eBay-search optimized and the description compelling with HTML formatting.`,
        });
        
        console.log('AI extraction result:', extractionResult);

        if (typeof extractionResult === 'string') {
          try {
            const productData = JSON.parse(extractionResult);
            
            console.log('Parsed product data:', productData);
            
            // Update project with extracted data
            const updates = {
              productUrl: url,
              title: productData.title || project?.title || "",
              description: productData.description || project?.description || "",
            };

            if (productData.images && Array.isArray(productData.images)) {
              updates.images = productData.images.map(url => ({ url, id: Date.now() + Math.random() }));
            }

            await updateProject(updates);
            
            alert("Product information extracted successfully! Review the details below.");
          } catch (parseError) {
            console.error("Failed to parse extracted data:", parseError);
            console.log('Raw extraction result:', extractionResult);
            
            // Fallback: use the raw result as description
            await updateProject({
              productUrl: url,
              description: extractionResult
            });
            alert("Product URL processed! The extracted content has been added to your description. Please review and edit as needed.");
          }
        } else {
          console.error('Unexpected extraction result type:', typeof extractionResult);
          alert("Unable to extract structured data. Please try a different URL or enter details manually.");
        }
      } else {
        console.error('Scraping failed or no content:', result);
        alert("Could not extract product information from this URL. This might be due to:\n\n• The website blocks automated access\n• The URL is not accessible\n• The page doesn't contain product information\n\nPlease try a different URL or enter details manually.");
      }
    } catch (error) {
      console.error("Error scraping URL:", error);
      alert("Failed to scrape product URL. Please check the URL and try again.\n\nError: " + error.message);
    }
    setIsScrapingUrl(false);
  };

  const enhanceDescription = async () => {
    if (!project?.description?.trim()) return;

    setIsEnhancing(true);
    const plainTextDescription = project.description.replace(/<[^>]+>/g, '');
    try {
      const result = await InvokeLLM({
        prompt: `Enhance this product description for an eBay listing. Create compelling, SEO-optimized copy in HTML format.

        Key requirements:
        - Use HTML tags for formatting (p, strong, ul, li, etc.)
        - For features with colons (like "Color: Red"), wrap the text before the colon in <strong> tags
        - Make it scan-friendly with bullet points
        - Include benefit-focused language
        - Optimize for eBay search

        Original description: "${plainTextDescription}"
        
        Return clean HTML that's ready to use in an eBay listing.`,
      });

      if (typeof result === 'string') {
        handleInputChange("description", result);
      }
    } catch (error) {
      console.error("Error enhancing description:", error);
    }
    setIsEnhancing(false);
  };

  const handleNext = async () => {
    if (!project?.title?.trim()) {
      alert("Please enter a valid product title");
      return;
    }

    try {
      await updateProject({
        title: project.title,
        description: project.description
      });
      onStepComplete();
      onNext();
    } catch (error) {
      console.error("Error saving product basics:", error);
    }
  };
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <i className="bi bi-file-earmark-text text-5xl text-brand-primary mx-auto mb-4"></i>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Product Title & Description
        </h2>
        <p className="text-slate-600">
          Create compelling product information that attracts buyers and ranks well in eBay search
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* URL Input Section */}
        <Card className="border-[var(--border-color)] bg-blue-50">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <i className="bi bi-link-45deg text-2xl text-blue-600"></i>
                <h3 className="text-lg font-semibold text-slate-900">Quick Start: Import from URL</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Paste a product URL from Amazon, eBay, or other e-commerce sites to automatically extract product details.
              </p>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="https://www.amazon.com/product-url or https://www.ebay.com/item/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-sm"
                    disabled={isScrapingUrl}
                  />
                </div>
                <Button
                  onClick={scrapeProductUrl}
                  disabled={!url.trim() || isScrapingUrl}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 whitespace-nowrap"
                >
                  {isScrapingUrl ? (
                    <>
                      <i className="bi bi-arrow-clockwise animate-spin mr-2"></i>
                      Extracting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-download mr-2"></i>
                      Extract Info
                    </>
                  )}
                </Button>
              </div>
              
              {isScrapingUrl && (
                <div className="text-xs text-blue-600 mt-2 flex items-center gap-2">
                  <i className="bi bi-info-circle"></i>
                  <span>Extracting product information from URL... This may take a few moments.</span>
                </div>
              )}
              
              <div className="text-xs text-slate-500 mt-2">
                <strong>Supported:</strong> Amazon, eBay, Shopify stores, AliExpress, and most product pages
                <br />
                <strong>Tip:</strong> Make sure the URL points to a specific product page with title, description, and images.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manual Input Section */}
        <Card className="border-[var(--border-color)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <i className="bi bi-pencil-square text-2xl text-slate-600"></i>
              <h3 className="text-lg font-semibold text-slate-900">Manual Entry</h3>
            </div>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-slate-700 mb-2 block">
                  Product Title *
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a clear, descriptive product title..."
                  value={project?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                    Product Description
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={enhanceDescription}
                    disabled={!project?.description?.trim() || isEnhancing}
                    className="text-xs"
                  >
                    {isEnhancing ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-indigo-500 mr-1" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-magic mr-1"></i>
                        AI Enhance
                      </>
                    )}
                  </Button>
                </div>
                <ReactQuill 
                  theme="snow" 
                  value={project?.description || ""} 
                  onChange={(value) => handleInputChange('description', value)}
                  modules={modules}
                  className="bg-white"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-slate-500">
                    Use the toolbar to format your description.
                  </p>
                  {project?.description !== originalDescription && originalDescription && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInputChange("description", originalDescription)}
                      className="text-xs text-slate-500 hover:text-slate-700"
                    >
                      Restore Original
                    </Button>
                  )}
                </div>
              </div>

              {/* Tips */}
              <Alert>
                <i className="bi bi-stars h-4 w-4 text-brand-primary"></i>
                <AlertDescription>
                  <strong>Pro Tips:</strong> Use the AI enhance feature to automatically optimize your description for eBay SEO. Manually add any key details using the editor.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          {!isFirstStep && onPrev ? (
            <Button
              variant="outline"
              onClick={onPrev}
              className="flex items-center gap-2 bg-white"
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button
            onClick={handleNext}
            disabled={!project?.title?.trim()}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white"
          >
            Continue
            <i className="bi bi-arrow-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
