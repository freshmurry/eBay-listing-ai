import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { InvokeLLM } from "@/api/integrations";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function StepProductSource({ project, updateProject, onStepComplete, onNext }) {
  const [sourceUrl, setSourceUrl] = useState(project?.sourceUrl || "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleExtractData = async () => {
    if (!sourceUrl.trim()) {
      setError("Please enter a valid product URL");
      return;
    }

    if (!isValidUrl(sourceUrl.trim())) {
      setError("Please enter a valid URL (must include http:// or https://)");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await InvokeLLM({
        prompt: `Extract product information from this URL: ${sourceUrl}
        
        Please provide:
        1. Product title
        2. Product description (comprehensive)
        3. Key features and specifications
        4. Brand information
        5. Any pricing information visible
        
        Format the response as JSON with keys: title, description, features, brand, price`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            features: { type: "array", items: { type: "string" } },
            brand: { type: "string" },
            price: { type: "string" }
          }
        }
      });

      setExtractedData(result);
      
      // Update project with extracted data
      await updateProject({
        sourceUrl: sourceUrl,
        title: result.title || "",
        description: result.description || "",
        highlights: result.features || []
      });

      onStepComplete();
    } catch (error) {
      console.error("Error extracting data:", error);
      setError("Failed to extract product data. You can continue manually or try a different URL.");
    }

    setIsProcessing(false);
  };

  const handleSkip = async () => {
    await updateProject({ sourceUrl: sourceUrl || null });
    onStepComplete();
    onNext();
  };

  const handleContinue = () => {
    onNext();
  };

  const canProceed = sourceUrl.trim() && isValidUrl(sourceUrl.trim());

  return (
    <div className="space-y-8">
      <div className="text-center">
        <i className="bi bi-globe text-5xl text-brand-primary mx-auto mb-4"></i>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Start with a Product URL
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Paste a link to your product from Amazon, Etsy, your own website, or any online store. 
          We'll automatically extract the title, description, and key details to speed up your listing creation.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="sourceUrl" className="text-sm font-medium text-slate-700">
                Product URL *
              </Label>
              <Input
                id="sourceUrl"
                type="url"
                placeholder="https://amazon.com/product... or https://etsy.com/listing..."
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="mt-1"
                disabled={isProcessing}
              />
              {sourceUrl && !isValidUrl(sourceUrl) && (
                <p className="text-sm text-red-600 mt-1">Please enter a valid URL</p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <i className="bi bi-exclamation-circle h-4 w-4"></i>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {extractedData && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <i className="bi bi-stars text-emerald-600"></i>
                  <span className="text-sm font-medium text-emerald-800">Data Extracted Successfully!</span>
                </div>
                <p className="text-sm text-emerald-700">
                  Found: "{extractedData.title}" - Ready to enhance your listing!
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleExtractData}
                disabled={!canProceed || isProcessing}
                className="flex-1 bg-brand-primary hover:bg-brand-primary-hover text-white"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Extracting Data...
                  </>
                ) : (
                  <>
                    <i className="bi bi-stars mr-2"></i>
                    Extract Product Data
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleSkip}
                disabled={isProcessing}
              >
                Skip & Enter Manually
              </Button>
            </div>

            {extractedData && (
              <Button
                onClick={handleContinue}
                className="w-full mt-4"
                variant="outline"
              >
                Continue to Next Step
                <i className="bi bi-arrow-right ml-2"></i>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-slate-500">
        <p>
          <i className="bi bi-link-45deg inline mr-1"></i>
          Supported: Amazon, eBay, Etsy, Shopify stores, and most e-commerce websites
        </p>
      </div>
    </div>
  );
}