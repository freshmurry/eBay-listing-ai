
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { UploadFile } from "@/api/integrations";

export default function StepBranding({ project, updateProject, onStepComplete, onNext, onPrev }) {
  const [formData, setFormData] = useState({
    storeName: project?.storeName || "",
    storeLogo: project?.storeLogo || ""
  });
  const [isUploading, setIsUploading] = useState(false);
  const logoInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setIsUploading(true);
    try {
      const result = await UploadFile({ file });
      handleInputChange("storeLogo", result.file_url);
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Error uploading logo. Please try again.");
    }
    setIsUploading(false);
  };

  const handleNext = async () => {
    if (!formData.storeName.trim()) {
      alert("Please enter your store name");
      return;
    }

    try {
      await updateProject({
        storeName: formData.storeName,
        storeLogo: formData.storeLogo
      });
      onStepComplete();
      onNext();
    } catch (error) {
      console.error("Error saving branding:", error);
    }
  };

  const generateInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <i className="bi bi-shop text-5xl text-indigo-500 mx-auto mb-4"></i>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Store Branding
        </h2>
        <p className="text-slate-600">
          Add your store information to build trust with potential buyers
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Store Name */}
              <div>
                <Label htmlFor="storeName" className="text-sm font-medium text-slate-700 mb-2 block">
                  Store Name *
                </Label>
                <Input
                  id="storeName"
                  placeholder="Your Store Name"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                />
              </div>

              {/* Store Logo */}
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Store Logo (Optional)
                </Label>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    
                    <Button
                      variant="outline"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full"
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500 mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-upload mr-2"></i>
                          Upload Logo
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Logo Preview */}
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border">
                    {formData.storeLogo ? (
                      <img
                        src={formData.storeLogo}
                        alt="Store logo"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : formData.storeName ? (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {generateInitials(formData.storeName)}
                        </span>
                      </div>
                    ) : (
                      <i className="bi bi-person text-3xl text-slate-400"></i>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 mt-2">
                  If no logo is uploaded, we'll create an icon using your store name initials
                </p>
              </div>

              {/* Store Preview */}
              {formData.storeName && (
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Preview</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
                      {formData.storeLogo ? (
                        <img
                          src={formData.storeLogo}
                          alt="Store logo"
                          className="w-full h-full object-contain rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {generateInitials(formData.storeName)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{formData.storeName}</p>
                      <p className="text-sm text-slate-500">Seller with great rating!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2"
          >
            <i className="bi bi-arrow-left"></i>
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!formData.storeName.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            Continue
            <i className="bi bi-arrow-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
