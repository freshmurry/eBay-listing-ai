
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

import ListingPreview from "../preview/ListingPreview";

export default function StepPreview({ project, updateProject, onPrev, isLastStep }) {
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const generateHtml = async () => {
      if (!project) return;

      setIsGenerating(true);
      try {
        // Generate the HTML using the master template
        const html = generateMasterTemplate(project);
        setGeneratedHtml(html);
        
        // Only update the project if the status is not already completed or if the HTML has changed.
        // This prevents an infinite loop of updates.
        if (project.status !== "COMPLETED" || project.htmlPreview !== html) {
          await updateProject({
            status: "COMPLETED",
            htmlPreview: html
          });
        }
      } catch (error) {
        console.error("Error generating HTML:", error);
      }
      setIsGenerating(false);
    };

    generateHtml();
  }, [project, updateProject]); // Added updateProject as a dependency

  const generateMasterTemplate = (projectData) => {
    const shippingText = {
      "SAME_DAY": "Same Business Day",
      "D2_5": "2-5 Business Days", 
      "D15_20": "15-20 Business Days"
    }[projectData.shippingPolicy] || "2-5 Business Days";

    // Sanitize description for injection into HTML
    const sanitizedDescription = (projectData.description || '').replace(/`/g, '\\`').replace(/<[^>]+>/g, '');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectData.title}</title>
    
    <meta name="description" content="${sanitizedDescription.substring(0, 160)}">
    <meta name="keywords" content="${(projectData.seoKeywords || []).join(', ')}">
    <meta name="robots" content="index, follow">

    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet">

    <style>
        /* Base styling for a clean, Airbnb-like feel */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #222;
            background-color: #FFF;
            margin: 0;
            padding: 0;
        }
        
        /* Utility classes for consistency */
        .card-container {
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            background-color: #fff;
            padding: 24px;
        }

        /* Image grid styling with pure CSS hover effect */
        .image-grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        .image-grid-container .main-image {
            grid-column: span 1 / span 1;
            grid-row: span 2 / span 2;
        }
        @media (min-width: 768px) {
            .image-grid-container {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-template-rows: repeat(2, minmax(0, 1fr));
                gap: 12px;
            }
            .image-grid-container .main-image {
                grid-column: span 2 / span 2;
                grid-row: span 2 / span 2;
            }
        }
        .image-grid-item {
            position: relative;
            padding-top: 100%; /* Creates a 1:1 aspect ratio container */
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .image-grid-item:hover, .image-grid-item:focus-within {
            transform: scale(1.03);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }
        .image-grid-item img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
        
        /* Sticky bottom bar for mobile */
        @media (max-width: 1023px) {
            .mobile-sticky-footer {
                position: -webkit-sticky;
                position: sticky;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 50;
                background-color: white;
                box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
                padding: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
        }
    </style>

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${projectData.title}",
      "image": ${JSON.stringify(projectData.images || [])},
      "description": "${sanitizedDescription}",
      "brand": {
        "@type": "Brand",
        "name": "${projectData.storeName || 'Store'}"
      },
      "offers": {
        "@type": "Offer",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "${projectData.storeName || 'Store'}"
        }
      }
    }
    </script>
</head>
<body>

<div class="max-w-6xl mx-auto p-4 lg:p-8">
    
    <header class="mb-8 hidden md:block">
        <h1 class="text-3xl md:text-4xl font-semibold">${projectData.title}</h1>
    </header>

    <section class="mb-8">
        <div class="image-grid-container">
            ${(projectData.images || []).map((img, index) => `
            <div class="image-grid-item ${index === 0 ? 'main-image' : ''}">
                <img src="${img}" alt="${projectData.title} - Image ${index + 1}" class="w-full h-full object-cover rounded-md">
            </div>
            `).join('')}
        </div>
    </section>

    <main class="grid lg:grid-cols-3 lg:gap-8 lg:pb-8">
        
        <section class="lg:col-span-2 flex flex-col justify-start">
            
            <div class="flex items-start justify-between w-full mb-6">
                <div class="flex items-center space-x-4">
                    <div class="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                        ${projectData.storeLogo ? 
                            `<img src="${projectData.storeLogo}" alt="Store logo" class="w-full h-full object-contain rounded-full">` :
                            `<i class="bi bi-shop text-3xl text-gray-500"></i>`
                        }
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold">Hosted by ${projectData.storeName || 'Store'}</h2>
                        <p class="text-sm text-gray-500">Seller with a great rating!</p>
                    </div>
                </div>
                <div class="flex-shrink-0 mt-1 sm:mt-0">
                    <div class="flex items-center text-gray-500 text-sm">
                        <i class="bi bi-patch-check-fill text-blue-500 mr-1"></i>
                        <span>Verified Authentic</span>
                    </div>
                </div>
            </div>

            <div class="card-container mb-6">
                <h2 class="text-xl md:text-2xl font-semibold mb-4">About this item</h2>
                <div class="text-gray-700 leading-relaxed">
                    ${projectData.description || ''}
                </div>
            </div>

            ${(projectData.highlights || []).length > 0 ? `
            <div class="card-container mb-6">
                <h2 class="text-xl md:text-2xl font-semibold mb-4">What this item offers</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    ${(projectData.highlights || []).map(highlight => `
                    <div class="flex items-start space-x-3">
                        <i class="bi bi-check-circle-fill text-xl text-green-500 mt-1"></i>
                        <div>
                            <p class="font-semibold text-sm">${highlight.replace(/\*([^*]+)\*/g, '$1')}</p>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <div class="card-container mb-6">
                <h2 class="text-xl md:text-2xl font-semibold mb-4">Key Details</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div class="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
                        <i class="bi bi-truck text-xl text-gray-500"></i>
                        <div>
                            <h3 class="font-semibold text-sm">Shipping</h3>
                            <p class="text-sm">${shippingText} Shipping</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
                        <i class="bi bi-house-door text-xl text-gray-500"></i>
                        <div>
                            <h3 class="font-semibold text-sm">Condition</h3>
                            <p class="text-sm">Brand New</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
                        <i class="bi bi-patch-check text-xl text-gray-500"></i>
                        <div>
                            <h3 class="font-semibold text-sm">Authenticity</h3>
                            <p class="text-sm">100% Guaranteed</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
                        <i class="bi bi-arrow-return-left text-xl text-gray-500"></i>
                        <div>
                            <h3 class="font-semibold text-sm">Returns</h3>
                            <p class="text-sm">30-day return policy</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card-container mb-6">
                <h2 class="text-xl md:text-2xl font-semibold mb-4">Things to Know</h2>
                <ul class="list-none space-y-4 text-gray-700">
                    <li class="flex items-start space-x-3">
                        <i class="bi bi-box-seam text-xl text-gray-500 mt-1"></i>
                        <div>
                            <h3 class="font-semibold text-sm">Shipping Policy</h3>
                            <p class="text-sm text-gray-700">${shippingText === "Same Business Day" ? "Orders are shipped on the same business day if placed by 2 PM." : `Orders typically ship within ${shippingText.toLowerCase()}.`} We offer free shipping on all orders.</p>
                        </div>
                    </li>
                    <li class="flex items-start space-x-3">
                        <i class="bi bi-arrow-return-left text-xl text-gray-500 mt-1"></i>
                        <div>
                            <h3 class="font-semibold text-sm">Return Policy</h3>
                            <p class="text-sm text-gray-700">We offer a 30-day return policy. Item must be in original, unused condition with all tags and packaging.</p>
                        </div>
                    </li>
                    <li class="flex items-start space-x-3">
                        <i class="bi bi-patch-check text-xl text-gray-500 mt-1"></i>
                        <div>
                            <h3 class="font-semibold text-sm">Authenticity Guarantee</h3>
                            <p class="text-sm text-gray-700">All products are 100% authentic. Your satisfaction is our priority.</p>
                        </div>
                    </li>
                </ul>
            </div>

            ${projectData.suggestedListTime ? `
            <div class="card-container mb-6 bg-blue-50 border-blue-200">
                <div class="flex items-start space-x-3">
                    <i class="bi bi-clock text-xl text-blue-600 mt-1"></i>
                    <div>
                        <h3 class="font-semibold text-sm text-blue-900">Recommended Listing Time</h3>
                        <p class="text-sm text-blue-700">${projectData.suggestedListTime}</p>
                    </div>
                </div>
            </div>
            ` : ''}

        </section>
    </main>
</div>

</body>
</html>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const downloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title?.replace(/[^a-z0-9]/gi, '_') || 'listing'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <i className="bi bi-eye text-5xl text-brand-primary mx-auto mb-4"></i>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Preview & Export
        </h2>
        <p className="text-slate-600">
          Review your professional eBay listing and export the HTML code
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Success Alert */}
        <Alert className="mb-6 border-emerald-200 bg-emerald-50">
          <i className="bi bi-check-circle-fill h-4 w-4 text-emerald-600"></i>
          <AlertDescription className="text-emerald-800">
            <strong>Listing Completed!</strong> Your professional eBay listing is ready to use.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="code">HTML Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-6">
            <Card className="overflow-hidden border-[var(--border-color)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <i className="bi bi-eye"></i>
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isGenerating ? (
                  <div className="h-[70vh] flex items-center justify-center bg-white">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
                      <p className="text-slate-600">Generating your listing...</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-[70vh] overflow-y-auto border bg-white">
                    <iframe 
                      srcDoc={generatedHtml}
                      title="listing-preview"
                      className="w-full h-full border-0"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="code" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <i className="bi bi-code-slash"></i>
                    HTML Code
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className={copySuccess ? "bg-emerald-50 border-emerald-200 text-emerald-700" : ""}
                    >
                      {copySuccess ? (
                        <>
                          <i className="bi bi-check-circle mr-1"></i>
                          Copied!
                        </>
                      ) : (
                        <>
                          <i className="bi bi-clipboard mr-1"></i>
                          Copy Code
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadHtml}
                    >
                      <i className="bi bi-download mr-1"></i>
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">
                    {generatedHtml}
                  </pre>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  Copy this HTML code and paste it into your eBay listing description editor.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Final Actions */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2 bg-white"
          >
            <i className="bi bi-arrow-left"></i>
            Back to SEO
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={downloadHtml}
              className="flex items-center gap-2 bg-white"
            >
              <i className="bi bi-download"></i>
              Download HTML
            </Button>
            <Button
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white"
            >
              <i className="bi bi-clipboard"></i>
              {copySuccess ? "Copied!" : "Copy to eBay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
