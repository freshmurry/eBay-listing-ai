
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadFile } from "@/api/integrations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function StepImages({ project, updateProject, onStepComplete, onNext, onPrev }) {
  const [images, setImages] = useState(project?.images || []);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith("image/")
    );
    
    if (files.length > 0) {
      uploadImages(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(file => 
      file.type.startsWith("image/")
    );
    
    if (files.length > 0) {
      uploadImages(files);
    }
  };

  const uploadImages = async (files) => {
    setIsUploading(true);
    const newImageUrls = [];

    try {
      for (const file of files) {
        const result = await UploadFile({ file });
        newImageUrls.push(result.file_url);
      }

      const updatedImages = [...images, ...newImageUrls];
      setImages(updatedImages);
      await updateProject({ images: updatedImages });
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images. Please try again.");
    }

    setIsUploading(false);
  };

  const removeImage = async (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    await updateProject({ images: updatedImages });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    setImages(reorderedImages);
    updateProject({ images: reorderedImages });
  };

  const handleNext = async () => {
    if (images.length === 0) {
      alert("Please add at least one product image");
      return;
    }

    onStepComplete();
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <i className="bi bi-image text-5xl text-brand-primary mx-auto mb-4"></i>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Product Images
        </h2>
        <p className="text-slate-600">
          Upload high-quality images of your product. The first image will be your main listing photo.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card 
          className={`transition-colors duration-200 border-dashed border-2 ${dragActive ? "border-brand-primary bg-red-50" : "border-[var(--border-color)] bg-white"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center">
                <i className="bi bi-cloud-arrow-up text-3xl text-brand-primary"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload Product Images</h3>
              <p className="text-slate-600 mb-6">
                Drag and drop your images here, or click to browse
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-brand-primary hover:bg-brand-primary-hover text-white"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-plus mr-2"></i>
                      Choose Images
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Supported formats: JPG, PNG, WebP. Max 10MB per image.
              </p>
            </div>
          </CardContent>
        </Card>

        {images.length > 0 && (
          <Card className="bg-white border-[var(--border-color)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Uploaded Images ({images.length})</h3>
                <p className="text-sm text-slate-500">
                  Drag to reorder. First image is the cover.
                </p>
              </div>
              
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                      <AnimatePresence>
                        {images.map((imageUrl, index) => (
                          <Draggable key={imageUrl} draggableId={imageUrl} index={index}>
                            {(providedDraggable) => (
                              <motion.div
                                ref={providedDraggable.innerRef}
                                {...providedDraggable.draggableProps}
                                {...providedDraggable.dragHandleProps}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group aspect-square bg-slate-100 rounded-lg overflow-hidden"
                              >
                                <img
                                  src={imageUrl}
                                  alt={`Product image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                
                                {index === 0 && (
                                  <div className="absolute top-2 left-2 bg-brand-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                                    Cover
                                  </div>
                                )}
                                
                                <button
                                  onClick={() => removeImage(index)}
                                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                  <i className="bi bi-x text-sm"></i>
                                </button>
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                      </AnimatePresence>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        )}

        <Alert>
          <i className="bi bi-camera h-4 w-4 text-brand-primary"></i>
          <AlertDescription>
            <strong>Image Tips:</strong> Use well-lit, high-resolution photos. Show your product from multiple angles, 
            include close-ups of important details, and ensure the main image has a clean background.
          </AlertDescription>
        </Alert>

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
            disabled={images.length === 0}
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
