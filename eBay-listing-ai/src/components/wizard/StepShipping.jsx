
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SHIPPING_OPTIONS = [
  {
    id: "SAME_DAY",
    title: "Same Business Day",
    description: "Ships within hours of purchase",
    icon: "bi-lightning-charge-fill",
    popular: true
  },
  {
    id: "D2_5",
    title: "2-5 Business Days",
    description: "Standard processing time",
    icon: "bi-box-seam",
    popular: false
  },
  {
    id: "D15_20",
    title: "15-20 Business Days",
    description: "Extended processing for international/custom items",
    icon: "bi-globe-americas",
    popular: false
  }
];

export default function StepShipping({ project, updateProject, onStepComplete, onNext, onPrev }) {
  const [selectedShipping, setSelectedShipping] = useState(project?.shippingPolicy || "D2_5");

  const handleNext = async () => {
    try {
      await updateProject({ shippingPolicy: selectedShipping });
      onStepComplete();
      onNext();
    } catch (error) {
      console.error("Error saving shipping policy:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <i className="bi bi-truck text-5xl text-brand-primary mx-auto mb-4"></i>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Shipping Policy
        </h2>
        <p className="text-slate-600">
          Choose your shipping timeframe to set buyer expectations
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="grid gap-4">
          {SHIPPING_OPTIONS.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedShipping === option.id
                  ? "border-brand-primary bg-red-50 shadow-lg"
                  : "border-[var(--border-color)] hover:border-slate-300 bg-white"
              }`}
              onClick={() => setSelectedShipping(option.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-2xl text-slate-600"> <i className={`bi ${option.icon}`}></i> </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{option.title}</h3>
                      {option.popular && (
                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm">{option.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedShipping === option.id
                      ? "border-brand-primary bg-brand-primary"
                      : "border-slate-300"
                  }`}>
                    {selectedShipping === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <i className="bi bi-clock w-5 h-5 text-blue-600 mt-0.5"></i>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Shipping Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Same-day shipping builds buyer confidence and can increase sales</li>
                  <li>• Be realistic about your processing capabilities</li>
                  <li>• Consider offering expedited shipping as a paid option</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
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
            Continue
            <i className="bi bi-arrow-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}
