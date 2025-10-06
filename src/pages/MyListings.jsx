
import React, { useState, useEffect } from "react";
import { ListingProject } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ListingPreview from "@/components/preview/ListingPreview";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Copy, Pencil, Download, Trash2, Check } from "lucide-react";


export default function MyListings() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [previewProject, setPreviewProject] = useState(null);
  const [copiedProjectId, setCopiedProjectId] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await ListingProject.list("-created_date");
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
    setIsLoading(false);
  };

  const deleteProject = async (projectId) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await ListingProject.delete(projectId);
        setProjects(projects.filter(p => p.id !== projectId));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filter === "ALL") return true;
    return project.status === filter;
  });

  const downloadHtml = (project) => {
    const blob = new Blob([project.htmlPreview || ''], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title?.replace(/[^a-z0-9]/gi, '_') || 'listing'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyHtml = (project) => {
    if (project.htmlPreview) {
      navigator.clipboard.writeText(project.htmlPreview);
      setCopiedProjectId(project.id);
      setTimeout(() => setCopiedProjectId(null), 2000);
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Descriptions
              </h1>
                            <p className="text-gray-600">
                Manage and export your eBay description projects
              </p>
            </div>
            <Link to={createPageUrl("Wizard")}>
                            <Button onClick={() => window.location.href = '/wizard'} className="bg-blue-600 hover:bg-blue-700">
                Create New Description
              </Button>
            </Link>
          </div>

          <div className="flex gap-2 mb-8">
            {["ALL", "DRAFT", "COMPLETED"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status)}
                className={filter === status ? "bg-brand-primary hover:bg-brand-primary-hover text-white rounded-lg" : "rounded-lg"}
              >
                {status === "ALL" ? "All Projects" : status.charAt(0) + status.slice(1).toLowerCase()}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse bg-white">
                  <CardHeader>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-slate-200 rounded mb-4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-[var(--border-color)]">
              <i className="bi bi-file-earmark-text text-5xl text-slate-300 mx-auto mb-4"></i>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">No projects found</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                {filter === "ALL" ? "Create your first listing to get started!" : `No ${filter.toLowerCase()} projects found.`}
              </p>
              <Link to={createPageUrl("Wizard")}>
                                <Button onClick={() => window.location.href = '/wizard'} variant="outline">
                  Create First Description
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white hover:shadow-xl transition-all duration-300 group border border-[var(--border-color)] flex flex-col h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-semibold truncate text-[var(--text-primary)]">
                              {project.title || 'Untitled Project'}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                                {project.status === 'COMPLETED' ? 'Completed' : 'Draft'}
                              </Badge>
                              <span className="text-xs text-[var(--text-secondary)]">
                                {format(new Date(project.created_date), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <div className="flex-grow">
                          {project.images?.[0] ? (
                            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-4">
                              <img 
                                src={project.images[0]} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                             <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                                <i className="bi bi-image text-4xl text-slate-300"></i>
                             </div>
                          )}
                        </div>
                        
                        <div className="flex justify-around items-center pt-4 border-t mt-4">
                           <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-slate-500 hover:text-slate-900"
                                    onClick={() => {
                                      if (project.status === "DRAFT") {
                                        window.location.href = createPageUrl("Wizard") + "?projectId=" + project.id;
                                      } else {
                                        setPreviewProject(project);
                                      }
                                    }}
                                  >
                                    <Eye className="w-5 h-5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{project.status === 'DRAFT' ? 'Continue Editing' : 'View Description'}</p>
                                </TooltipContent>
                              </Tooltip>

                              <Tooltip>
                                <TooltipTrigger asChild>
                                   <Link to={createPageUrl("Wizard") + "?projectId=" + project.id}>
                                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-brand-primary">
                                      <Pencil className="w-5 h-5" />
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent><p>Edit</p></TooltipContent>
                              </Tooltip>

                              {project.status === "COMPLETED" && (
                                <>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900" onClick={() => copyHtml(project)}>
                                        {copiedProjectId === project.id ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>{copiedProjectId === project.id ? 'Copied!' : 'Copy HTML'}</p></TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900" onClick={() => downloadHtml(project)}>
                                        <Download className="w-5 h-5" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Export HTML</p></TooltipContent>
                                  </Tooltip>
                                </>
                              )}

                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => deleteProject(project.id)}>
                                    <Trash2 className="w-5 h-5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Delete</p></TooltipContent>
                              </Tooltip>
                           </TooltipProvider>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <Dialog open={!!previewProject} onOpenChange={() => setPreviewProject(null)}>
        <DialogContent className="max-w-4xl h-[90vh] bg-white p-0">
          <DialogHeader className="p-6 border-b">
            <DialogTitle>{previewProject?.title}</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto h-full">
            {previewProject && <ListingPreview project={previewProject} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
