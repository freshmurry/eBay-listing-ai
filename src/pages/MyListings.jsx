import React, { useState, useEffect, useMemo } from "react";
import { ListingProject } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Eye, 
  Copy, 
  Pencil, 
  Download, 
  Trash2, 
  Search,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";
import { format } from "date-fns";
import ListingPreview from "@/components/preview/ListingPreview";

const MyListings = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewProject, setPreviewProject] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const itemsPerPage = 15;

  // Load projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        
        // Get all projects using the correct method
        const allProjects = await ListingProject.findMany();
        setProjects(allProjects || []);
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title?.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower) ||
        project.brand?.toLowerCase().includes(searchLower) ||
        project.model?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [projects, statusFilter, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (projectId) => {
    // Navigate to wizard with project ID
    window.location.href = `/wizard?id=${projectId}`;
  };

  const handleDownload = (project) => {
    // Download project data as JSON
    const dataStr = JSON.stringify(project, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.title || 'project'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = async (projectId) => {
    const link = `${window.location.origin}/listing/${projectId}`;
    try {
      await navigator.clipboard.writeText(link);
      // You might want to show a toast notification here
      console.log("Link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handlePreview = (project) => {
    setPreviewProject(project);
    setShowPreview(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await ListingProject.delete(projectId);
        setProjects(prev => prev.filter(p => p.id !== projectId));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "draft": return "secondary";
      case "published": return "default";
      case "sold": return "destructive";
      default: return "outline";
    }
  };

  const renderImagePreview = (project) => {
    if (project.images && project.images.length > 0) {
      const firstImage = project.images[0];
      
      // Handle different image formats safely
      let imageUrl = null;
      if (typeof firstImage === 'string') {
        imageUrl = firstImage;
      } else if (firstImage && typeof firstImage === 'object') {
        imageUrl = firstImage.url || firstImage.src || null;
      }
      
      if (imageUrl) {
        return (
          <div className="relative w-full h-25 mb-3 overflow-hidden rounded-md bg-gray-100">
            <img
              src={imageUrl}
              alt={project.title || "Product image"}
              className="w-full h-full object-cover transition-transform hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">No image</div>';
              }}
            />
          </div>
        );
      }
    }
    
    return (
      <div className="w-full h-32 mb-3 bg-gray-100 rounded-md flex items-center justify-center">
        <span className="text-gray-500 text-sm">No image</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your listings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
        <p className="text-gray-600">Manage your eBay listing projects</p>
      </div>

      {/* Controls */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("all")}
            >
              All ({projects.length})
            </Button>
            <Button
              variant={statusFilter === "draft" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("draft")}
            >
              Drafts ({projects.filter(p => p.status === "draft").length})
            </Button>
            <Button
              variant={statusFilter === "published" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("published")}
            >
              Published ({projects.filter(p => p.status === "published").length})
            </Button>
            <Button
              variant={statusFilter === "sold" ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter("sold")}
            >
              Sold ({projects.filter(p => p.status === "sold").length})
            </Button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
        {searchTerm && ` for "${searchTerm}"`}
      </div>

      {/* Projects Grid */}
      {currentProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchTerm ? "No projects match your search." : "No projects found."}
          </div>
          <Button onClick={() => window.location.href = "/wizard"}>
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                {renderImagePreview(project)}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-2 mb-1">
                      {project.title || "Untitled Project"}
                    </CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {project.description || "No description"}
                    </p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(project.status)} className="ml-2 flex-shrink-0">
                    {project.status || "draft"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Project Details */}
                <div className="space-y-2 mb-4 text-sm">
                  {project.brand && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Brand:</span>
                      <span className="font-medium">{project.brand}</span>
                    </div>
                  )}
                  {project.model && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Model:</span>
                      <span className="font-medium">{project.model}</span>
                    </div>
                  )}
                  {project.price && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-medium text-green-600">${project.price}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span className="font-medium">
                      {project.createdAt ? format(new Date(project.createdAt), "MMM d, yyyy") : "Unknown"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <TooltipProvider>
                  <div className="flex gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePreview(project)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Preview listing</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(project.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit project</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(project)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Export project</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyLink(project.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy link</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(project.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete project</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="min-w-[2.5rem]"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[60vw] w-[99vw] max-h-[88vh] h-[88vh] p-2 overflow-hidden">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base">
              {previewProject?.title || "Listing Preview"}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto h-[calc(98vh-4rem)]">
            {previewProject && (
              <ListingPreview 
                project={previewProject}
                isVisible={showPreview}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyListings;