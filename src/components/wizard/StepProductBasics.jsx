
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { InvokeLLM } from "@/api/integrations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSubscription } from "@/components/SubscriptionManager";


export default function StepProductBasics({ project, updateProject, onStepComplete, onNext, onPrev }) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || ""
  });
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [originalDescription, setOriginalDescription] = useState("");
  const { incrementUsage } = useSubscription();

  useEffect(() => {
    if (project?.description) {
      setOriginalDescription(project.description);
    }
  }, [project]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const enhanceDescription = async () => {
    if (!formData.description.trim()) return;

    setIsEnhancing(true);
    const plainTextDescription = formData.description.replace(/<[^>]+>/g, '');
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
        // Track usage for AI enhancement
        await incrementUsage('ai_enhancements');
      }
    } catch (error) {
      console.error("Error enhancing description:", error);
    }
    setIsEnhancing(false);
  };

  const handleNext = async () => {
    if (!formData.title.trim()) {
      alert("Please enter a valid product title");
      return;
    }

    try {
      await updateProject({
        title: formData.title,
        description: formData.description
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
        <Card className="border-[var(--border-color)]">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-slate-700 mb-2 block">
                  Product Title *
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a clear, descriptive product title..."
                  value={formData.title}
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
                    disabled={!formData.description.trim() || isEnhancing}
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
                  value={formData.description} 
                  onChange={(value) => handleInputChange('description', value)}
                  modules={modules}
                  className="bg-white"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-slate-500">
                    Use the toolbar to format your description.
                  </p>
                  {formData.description !== originalDescription && originalDescription && (
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
          <Button
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2 bg-white"
          >
            <i className="bi bi-arrow-left"></i>
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!formData.title.trim()}
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
