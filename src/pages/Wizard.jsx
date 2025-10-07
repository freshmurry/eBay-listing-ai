
import React, { useState, useEffect } from "react";
import { ListingProject } from "@/api/entities";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSubscription } from "@/components/SubscriptionManager";

import StepProductSource from "../components/wizard/StepProductSource";
import StepProductBasics from "../components/wizard/StepProductBasics";
import StepImages from "../components/wizard/StepImages";
import StepBranding from "../components/wizard/StepBranding";
import StepShipping from "../components/wizard/StepShipping";
import StepSEO from "../components/wizard/StepSEO";
import StepPreview from "../components/wizard/StepPreview";

const STEPS = [
  { id: 1, name: "Product Source", component: StepProductSource },
  { id: 2, name: "Basic Info", component: StepProductBasics },
  { id: 3, name: "Images", component: StepImages },
  { id: 4, name: "Store Branding", component: StepBranding },
  { id: 5, name: "Shipping", component: StepShipping },
  { id: 6, name: "SEO & Copy", component: StepSEO },
  { id: 7, name: "Preview & Export", component: StepPreview }
];

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const { checkUsageLimit, incrementUsage, setShowUpgradeModal } = useSubscription();

  useEffect(() => {
    initializeProject();
  }, []);

  const initializeProject = async () => {
    setIsLoading(true);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const projectId = urlParams.get('projectId');
      
      if (projectId) {
        const existingProject = await ListingProject.get(projectId);
        setProject(existingProject);
        // Determine completed steps based on project data
        const completed = new Set();
        if (existingProject.title) completed.add(2);
        if (existingProject.images?.length > 0) completed.add(3);
        if (existingProject.storeName) completed.add(4);
        if (existingProject.shippingPolicy) completed.add(5);
        setCompletedSteps(completed);
      } else {
        // Check usage limit before creating new project
        if (checkUsageLimit('listings')) {
          setShowUpgradeModal(true);
          // Don't redirect - let the modal stay visible
          return;
        }
        
        const newProject = await ListingProject.create({
          status: "DRAFT",
          title: "Untitled Project",
          description: "",
          images: [],
          seoKeywords: [],
          highlights: []
        });
        setProject(newProject);
        
        // Increment usage for new project
        await incrementUsage('listings', 1);
      }
    } catch (error) {
      console.error("Error initializing project:", error);
    }
    setIsLoading(false);
  };

  const updateProject = async (updates) => {
    if (!project) return;
    try {
      const updatedProject = await ListingProject.update(project.id, updates);
      setProject(updatedProject);
      return updatedProject;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  };

  const markStepCompleted = (stepId) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepId) => {
    // Allow navigation only to completed steps or the next logical step
    if (stepId === 1 || completedSteps.has(stepId) || completedSteps.has(stepId - 1)) {
      setCurrentStep(stepId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-slate-600 mt-4">Initializing wizard...</p>
        </div>
      </div>
    );
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-[var(--background-light)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.history.back()}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-white"
            >
              <i className="bi bi-arrow-left mr-2"></i>
              Back
            </Button>
            <div>
                            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                eBay Description Generator
              </h1>
              <p className="text-[var(--text-secondary)]">Create professional descriptions with AI assistance</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Step {currentStep} of {STEPS.length}
              </span>
              <span className="text-sm text-slate-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 [&>*]:bg-brand-primary" />
          </div>

          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2 lg:gap-4">
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  step.id === currentStep
                    ? "bg-brand-primary text-white shadow-lg"
                    : completedSteps.has(step.id)
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "bg-white text-[var(--text-secondary)] hover:bg-slate-50 border border-[var(--border-color)]"
                }`}
              >
                {completedSteps.has(step.id) ? (
                  <i className="bi bi-check-circle-fill"></i>
                ) : (
                  <i className="bi bi-circle"></i>
                )}
                <span className="hidden sm:inline">{step.name}</span>
                <span className="sm:hidden">{step.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white shadow-sm border-[var(--border-color)]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[var(--text-primary)]">
              {STEPS[currentStep - 1].name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentStepComponent
                  project={project}
                  updateProject={updateProject}
                  onStepComplete={() => markStepCompleted(currentStep)}
                  onNext={nextStep}
                  onPrev={currentStep > 1 ? prevStep : null}
                  isLastStep={currentStep === STEPS.length}
                  isFirstStep={currentStep === 1}
                />
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
