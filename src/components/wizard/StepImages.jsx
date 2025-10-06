
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
  const [dragPreview, setDragPreview] = useState(null); // For showing preview of dragged image
  const fileInputRef = useRef(null);

  // Handle paste events for copying images or URLs
  React.useEffect(() => {
    const handlePaste = async (e) => {
      e.preventDefault();
      
      // Check if we have clipboard items
      if (e.clipboardData.items) {
        const items = Array.from(e.clipboardData.items);
        
        // Look for image files first
        const imageFiles = items
          .filter(item => item.type.startsWith('image/'))
          .map(item => item.getAsFile())
          .filter(file => file !== null);
        
        if (imageFiles.length > 0) {
          console.log('Pasted image files:', imageFiles);
          uploadImages(imageFiles);
          return;
        }
        
        // Look for text (URLs)
        const textItems = items.filter(item => item.type === 'text/plain');
        if (textItems.length > 0) {
          const text = e.clipboardData.getData('text/plain');
          if (text && (text.startsWith('http') || text.startsWith('data:image'))) {
            console.log('Pasted image URL:', text);
            addWebImages([text]);
            return;
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [images]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      
      // Try to extract image info during drag for preview
      const extractImageInfo = () => {
        const htmlData = e.dataTransfer.getData('text/html');
        const urlData = e.dataTransfer.getData('text/uri-list');
        const plainText = e.dataTransfer.getData('text/plain');
        
        let imageUrl = null;
        let imageName = null;
        
        // Extract from HTML (most common for dragged images)
        if (htmlData) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlData, 'text/html');
          const img = doc.querySelector('img');
          if (img && img.src) {
            imageUrl = img.src;
            imageName = img.alt || img.title || 'Web Image';
          }
        }
        
        // Extract from URL data
        if (!imageUrl && urlData && urlData.startsWith('http')) {
          imageUrl = urlData;
          imageName = urlData.split('/').pop()?.split('?')[0] || 'Web Image';
        }
        
        // Extract from plain text
        if (!imageUrl && plainText && plainText.startsWith('http') &&
            (plainText.includes('.jpg') || plainText.includes('.jpeg') || 
             plainText.includes('.png') || plainText.includes('.gif') || 
             plainText.includes('.webp'))) {
          imageUrl = plainText;
          imageName = plainText.split('/').pop()?.split('?')[0] || 'Web Image';
        }
        
        if (imageUrl) {
          setDragPreview({ url: imageUrl, name: imageName });
        }
      };
      
      // Only extract if we don't have files (meaning it's likely a web image)
      if (e.dataTransfer.files.length === 0) {
        extractImageInfo();
      }
      
    } else if (e.type === "dragleave") {
      setDragActive(false);
      setDragPreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setDragPreview(null);

    console.log('Drop event detected');
    console.log('DataTransfer types:', e.dataTransfer.types);
    
    // Handle regular file drops first
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith("image/")
    );
    
    if (files.length > 0) {
      console.log('Processing file uploads:', files);
      uploadImages(files);
      return;
    }
    
    // Smart extraction for web images
    const extractedUrls = extractImageUrlsFromDrop(e.dataTransfer);
    
    if (extractedUrls.length > 0) {
      console.log('Processing web images:', extractedUrls);
      addWebImages(extractedUrls);
    } else {
      console.log('No valid images found in drop data');
      // Show helpful message
      alert('No images detected. Try dragging the image itself (not text or links) from the web page.');
    }
  };
  
  // Enhanced image URL extraction function
  const extractImageUrlsFromDrop = (dataTransfer) => {
    const webImageUrls = [];
    const htmlData = dataTransfer.getData('text/html');
    const urlData = dataTransfer.getData('text/uri-list');
    const plainText = dataTransfer.getData('text/plain');
    
    console.log('HTML data:', htmlData);
    console.log('URL data:', urlData);
    console.log('Plain text:', plainText);
    
    // Priority 1: Extract from HTML (most reliable for dragged images)
    if (htmlData) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlData, 'text/html');
      const imgs = doc.querySelectorAll('img');
      
      imgs.forEach(img => {
        let src = img.src;
        
        // Handle relative URLs by checking various attributes
        if (!src) src = img.getAttribute('data-src'); // Lazy loading
        if (!src) src = img.getAttribute('data-original'); // Some galleries
        if (!src) src = img.getAttribute('srcset')?.split(' ')[0]; // Responsive images
        
        if (src && (src.startsWith('http') || src.startsWith('data:') || src.startsWith('//'))) {
          // Handle protocol-relative URLs
          if (src.startsWith('//')) {
            src = 'https:' + src;
          }
          webImageUrls.push(src);
        }
      });
    }
    
    // Priority 2: Direct URL data
    if (urlData) {
      const urls = urlData.split('\n').filter(url => url.trim());
      urls.forEach(url => {
        if (url.startsWith('http') || url.startsWith('data:image')) {
          webImageUrls.push(url);
        }
      });
    }
    
    // Priority 3: Plain text URLs (be more selective)
    if (plainText && !webImageUrls.length) {
      const lines = plainText.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.match(/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|avif|svg)(\?.*)?$/i) || 
            trimmed.startsWith('data:image')) {
          webImageUrls.push(trimmed);
        }
      });
    }
    
    // Remove duplicates and return
    return [...new Set(webImageUrls)];
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(file => 
      file.type.startsWith("image/")
    );
    
    if (files.length > 0) {
      uploadImages(files);
    }
  };

  const addWebImages = async (imageUrls) => {
    console.log('Adding web images:', imageUrls);
    const newImages = [];
    
    for (const url of imageUrls) {
      console.log('Processing URL:', url);
      
      // For data URLs, add directly
      if (url.startsWith('data:image')) {
        newImages.push({
          id: Date.now() + Math.random(),
          url: url,
          name: 'Copied Image',
          isWeb: true
        });
        continue;
      }
      
      // For HTTP URLs, test accessibility
      try {
        // First, try to load the image directly
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        const loadPromise = new Promise((resolve, reject) => {
          img.onload = () => {
            console.log('Image loaded successfully:', url);
            resolve();
          };
          img.onerror = () => {
            console.log('Image failed to load:', url);
            reject(new Error('Failed to load'));
          };
          img.src = url;
        });
        
        // Set a timeout for the image load
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        
        await Promise.race([loadPromise, timeoutPromise]);
        
        newImages.push({
          id: Date.now() + Math.random(),
          url: url,
          name: url.split('/').pop()?.split('?')[0] || 'Web Image',
          isWeb: true
        });
        
      } catch (error) {
        console.warn('Failed to load web image:', url, error);
        
        // Try using a CORS proxy for the image
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        
        newImages.push({
          id: Date.now() + Math.random(),
          url: proxyUrl,
          originalUrl: url,
          name: url.split('/').pop()?.split('?')[0] || 'Web Image',
          isWeb: true,
          isProxied: true
        });
      }
    }
    
    if (newImages.length > 0) {
      console.log('Adding images to state:', newImages);
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      await updateProject({ images: updatedImages });
    } else {
      alert('Could not load any of the dropped images. They may be protected by CORS policy.');
    }
  };

  const uploadImages = async (files) => {
    setIsUploading(true);
    const newImages = [];

    try {
      for (const file of files) {
        // Create a local URL for immediate preview
        const localUrl = URL.createObjectURL(file);
        
        try {
          const result = await UploadFile({ file });
          // Handle different response formats
          const imageUrl = result.url || result.file_url || result.signedUrl || localUrl;
          const imageId = result.id || result.fileId || Date.now() + Math.random();
          
          newImages.push({
            id: imageId,
            url: imageUrl,
            file: file,
            name: file.name
          });
        } catch (uploadError) {
          console.warn("Upload failed, using local preview:", uploadError);
          // Fallback to local preview if upload fails
          newImages.push({
            id: Date.now() + Math.random(),
            url: localUrl,
            file: file,
            name: file.name,
            isLocal: true
          });
        }
      }

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      await updateProject({ images: updatedImages });
    } catch (error) {
      console.error("Error processing images:", error);
      alert("Error processing images. Please try again.");
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
                <p className="text-[var(--text-secondary)] mb-6">
          Upload high-quality images of your product. The first image will be your main description photo.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Card 
          className={`transition-all duration-300 border-dashed border-2 rounded-xl cursor-pointer ${
            dragActive 
              ? "border-brand-primary bg-brand-primary/10 scale-[1.02] shadow-lg" 
              : "border-slate-300 bg-white hover:border-brand-primary hover:bg-brand-primary/5 hover:shadow-md"
          }`}
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
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br rounded-full flex items-center justify-center transition-all duration-300 ${
                dragActive 
                  ? "from-brand-primary/20 to-brand-primary/30 scale-110" 
                  : "from-blue-50 to-purple-100"
              }`}>
                <i className={`text-3xl transition-all duration-300 ${
                  dragActive 
                    ? "bi bi-cloud-arrow-down text-brand-primary scale-125" 
                    : "bi bi-images text-brand-primary"
                }`}></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {dragActive && dragPreview ? `Drop "${dragPreview.name}"` : dragActive ? "Drop Your Images Here!" : "Add Product Images"}
              </h3>
              <p className="text-slate-600 mb-6">
                {dragActive && dragPreview ? (
                  <span className="text-brand-primary font-medium flex items-center gap-2">
                    <img 
                      src={dragPreview.url} 
                      alt="Preview" 
                      className="w-12 h-12 object-cover rounded border border-brand-primary"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    Release to add this image: {dragPreview.url.length > 50 ? dragPreview.url.substring(0, 50) + '...' : dragPreview.url}
                  </span>
                ) : dragActive ? (
                  <span className="text-brand-primary font-medium">
                    Release to add images from files or web pages
                  </span>
                ) : (
                  <>
                    <span className="font-medium">Multiple ways to add images:</span><br/>
                    • Drag & drop files from your computer<br/>
                    • Drag images directly from web pages<br/>
                    • Copy & paste images or URLs (Ctrl+C, Ctrl+V)<br/>
                    • Click to browse your files<br/>
                    <span className="text-sm text-slate-500 mt-2 block">Supports: JPG, PNG, WebP, GIF from any source</span>
                  </>
                )}
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-folder2-open mr-2"></i>
                      Browse Files
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const url = prompt('Enter image URL (e.g., https://example.com/image.jpg):');
                    if (url && (url.startsWith('http') || url.startsWith('data:image'))) {
                      addWebImages([url]);
                    } else if (url) {
                      alert('Please enter a valid image URL starting with http:// or https://');
                    }
                  }}
                  disabled={isUploading}
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                >
                  <i className="bi bi-link-45deg mr-2"></i>
                  Add URL
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                Supported: JPG, PNG, WebP, GIF • Max 10MB per file • Web images auto-processed
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
                        {images.map((image, index) => {
                          const imageUrl = typeof image === 'string' ? image : image.url;
                          const imageId = typeof image === 'string' ? image : (image.id || index);
                          const imageName = typeof image === 'string' ? `Image ${index + 1}` : (image.name || `Image ${index + 1}`);
                          
                          return (
                            <Draggable key={imageId} draggableId={String(imageId)} index={index}>
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
                                    alt={imageName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f3f4f6'/%3e%3ctext x='50' y='50' font-family='Arial, sans-serif' font-size='10' fill='%236b7280' text-anchor='middle' dy='3'%3eImage Not Found%3c/text%3e%3c/svg%3e";
                                    }}
                                  />
                                  
                                  {index === 0 && (
                                    <div className="absolute top-2 left-2 bg-brand-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                                      Cover
                                    </div>
                                  )}
                                  
                                  {typeof image === 'object' && image.isLocal && (
                                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                      Local
                                    </div>
                                  )}
                                  
                                  {typeof image === 'object' && image.isWeb && (
                                    <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                      Web
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
                          );
                        })}
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
