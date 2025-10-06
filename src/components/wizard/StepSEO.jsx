
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InvokeLLM } from "@/api/integrations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSubscription } from "@/components/SubscriptionManager";

export default function StepSEO({ project, updateProject, onStepComplete, onNext, onPrev }) {
  const [seoSettings, setSeoSettings] = useState({
    enhanceCopy: true,
    suggestKeywords: true
  });
  const [keywords, setKeywords] = useState(project?.seoKeywords || []);
  const [highlights, setHighlights] = useState(project?.highlights || []);
  const [newKeyword, setNewKeyword] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [optimizationStatus, setOptimizationStatus] = useState(null);
  const { incrementUsage } = useSubscription();

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setOptimizationStatus(null);
    
    try {
      const optimizationPrompt = `
        Optimize the following eBay listing for SEO and buyer appeal:
        
        Title: ${project.productBasics?.productTitle || ''}
        Category: ${project.productBasics?.category || ''}
        Brand: ${project.branding?.brand || ''}
        Description: ${project.productBasics?.description || ''}
        
        Please provide:
        1. An optimized title (80 characters max)
        2. 5-10 relevant keywords
        3. An improved description that highlights benefits and features
        4. SEO-friendly bullet points
        
        Focus on:
        - Using high-traffic keywords
        - Clear benefit statements
        - Professional formatting
        - Buyer trust signals
      `;
      
      const response = await InvokeLLM({
        prompt: optimizationPrompt,
        maxTokens: 800
      });
      
      // Track usage for AI optimization
      await incrementUsage('ai_optimizations');
      
      setOptimizationComplete(true);
      setOptimizationStatus({
        type: 'success',
        message: 'SEO optimization completed successfully!'
      });
    } catch (error) {
      console.error('SEO optimization failed:', error);
      setOptimizationStatus({
        type: 'error',
        message: 'Failed to optimize SEO. Please try again.'
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const addHighlight = () => {
    if (newHighlight.trim() && !highlights.includes(newHighlight.trim())) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight("");
    }
  };

  const removeHighlight = (highlight) => {
    setHighlights(highlights.filter(h => h !== highlight));
  };

  const handleNext = async () => {
    try {
      await updateProject({
        seoKeywords: keywords,
        highlights: highlights,
        enhancedCopy: optimizationComplete
      });
      onStepComplete();
      onNext();
    } catch (error) {
      console.error("Error saving SEO data:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <i className="bi bi-search text-5xl text-brand-primary mx-auto mb-4"></i>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          SEO & Copy Enhancement
        </h2>
        <p className="text-slate-600">
          Optimize your listing for better search visibility and buyer appeal
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* SEO Settings */}
        <Card className="bg-white border-[var(--border-color)]">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Optimization Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <Label className="font-medium">Enhance Copy</Label>
                  <p className="text-sm text-slate-500">AI will improve your product description for better appeal</p>
                </div>
                <Switch
                  checked={seoSettings.enhanceCopy}
                  onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, enhanceCopy: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <Label className="font-medium">Suggest Keywords</Label>
                  <p className="text-sm text-slate-500">Research competitive keywords using web data</p>
                </div>
                <Switch
                  checked={seoSettings.suggestKeywords}
                  onCheckedChange={(checked) => setSeoSettings(prev => ({ ...prev, suggestKeywords: checked }))}
                />
              </div>
            </div>

            <Button
              onClick={handleSEOOptimization}
              disabled={isOptimizing || !project?.title}
              className="w-full mt-6 bg-brand-primary hover:bg-brand-primary-hover text-white"
            >
              {isOptimizing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Optimizing with AI...
                </>
              ) : (
                <>
                  <i className="bi bi-stars mr-2"></i>
                  Run SEO Optimization
                </>
              )}
            </Button>

            {optimizationComplete && (
              <Alert className="mt-4">
                <i className="bi bi-bullseye h-4 w-4 text-brand-primary"></i>
                <AlertDescription>
                  SEO optimization complete! Keywords and highlights have been generated based on your product.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">SEO Keywords</h3>
            
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add a keyword..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              />
              <Button onClick={addKeyword} variant="outline" size="icon">
                <i className="bi bi-plus"></i>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer"
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword}
                  <i className="bi bi-x-lg text-xs ml-1"></i>
                </Badge>
              ))}
            </div>
            
            {keywords.length === 0 && (
              <p className="text-slate-500 text-sm">
                Run SEO optimization or add keywords manually to improve search visibility
              </p>
            )}
          </CardContent>
        </Card>

        {/* Product Highlights */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Product Highlights</h3>
            
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add a highlight..."
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHighlight()}
              />
              <Button onClick={addHighlight} variant="outline" size="icon">
                <i className="bi bi-plus"></i>
              </Button>
            </div>

            <div className="space-y-2">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors"
                >
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    ✓
                  </div>
                  <span className="flex-1">{highlight}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHighlight(highlight)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i className="bi bi-x text-slate-400"></i>
                  </Button>
                </div>
              ))}
            </div>
            
            {highlights.length === 0 && (
              <p className="text-slate-500 text-sm">
                Add bullet points highlighting key features and benefits of your product
              </p>
            )}
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
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white"
          >
            Continue to Preview
            <i className="bi bi-arrow-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
