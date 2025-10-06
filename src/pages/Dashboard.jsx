
import React, { useState, useEffect } from "react";
import { ListingProject } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger } from
"@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ListingPreview from "@/components/preview/ListingPreview";
import { InvokeLLM } from "@/api/integrations";
import { useSubscription, UsageLimitGuard } from "@/components/SubscriptionManager";
import { Progress } from "@/components/ui/progress";
import { STRIPE_PLANS, getPlanLimits } from "@/utils/stripe";

const ProjectCard = ({ project, onDelete, onView }) => {
  const [suggestedTime, setSuggestedTime] = useState(project.suggestedListTime || "");
  const [isGettingTime, setIsGettingTime] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const handleCardClick = () => {
    // Navigate to wizard for any project
    window.location.href = createPageUrl("Wizard") + "?projectId=" + project.id;
  };

  const handlePreviewClick = (e) => {
    e.stopPropagation();
    onView(project);
  };

  const fetchListingTime = async () => {
    if (suggestedTime && suggestedTime !== "Could not generate suggestion.") return;
    setIsGettingTime(true);
    try {
      const categoryKeywords = project.title ? project.title.toLowerCase() : '';
      const result = await InvokeLLM({
        prompt: `Based on eBay's Cassini search algorithm and current market data, what is the optimal time to list "${project.title}" on eBay?

Consider:
- eBay's peak traffic times (typically Sunday-Thursday 6-10 PM EST)
- Product category best practices
- Auction vs Buy-It-Now timing
- Seasonal factors

Provide ONE specific recommendation in format: "Day, Time (EST)" - Example: "Sunday, 7:00 PM EST"

Product: ${project.title}
Category: ${categoryKeywords.includes('electronics') ? 'Electronics' : categoryKeywords.includes('clothing') ? 'Fashion' : categoryKeywords.includes('home') ? 'Home & Garden' : 'General'}

Provide ONLY the day and time, nothing else.`,
        maxTokens: 50
      });
      
      let time = "Could not generate suggestion.";
      if (typeof result === 'string' && result.trim()) {
        time = result.trim();
        // Validate the format
        if (time.includes(',') && (time.includes('PM') || time.includes('AM'))) {
          time = time;
        } else {
          time = "Sunday, 7:00 PM EST"; // Default fallback
        }
      } else {
        // Intelligent fallback based on general eBay best practices
        const dayOfWeek = new Date().getDay();
        const bestDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
        const randomDay = bestDays[Math.floor(Math.random() * bestDays.length)];
        const bestTimes = ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
        const randomTime = bestTimes[Math.floor(Math.random() * bestTimes.length)];
        time = `${randomDay}, ${randomTime} EST`;
      }
      
      setSuggestedTime(time);
      await ListingProject.update(project.id, { suggestedListTime: time });
    } catch (e) {
      console.error('Error fetching listing time:', e);
      // Intelligent fallback based on eBay best practices
      const bestDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
      const randomDay = bestDays[Math.floor(Math.random() * bestDays.length)];
      const bestTimes = ['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
      const randomTime = bestTimes[Math.floor(Math.random() * bestTimes.length)];
      setSuggestedTime(`${randomDay}, ${randomTime} EST`);
    }
    setIsGettingTime(false);
  };

  useEffect(() => {
    if (project.status === 'COMPLETED' && !project.suggestedListTime) {
      fetchListingTime();
    }
  }, [project.status, project.suggestedListTime, fetchListingTime]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={handleCardClick}
      className="p-6 bg-white rounded-xl border border-[var(--border-color)] hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer group">

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-slate-900 text-lg truncate group-hover:text-blue-600 transition-colors">{project.title || 'Untitled Project'}</h3>
            <Badge className={`${getStatusColor(project.status)} border`}>
              {project.status === 'COMPLETED' ? 'Completed' : 'Draft'}
            </Badge>
          </div>
          <p className="text-slate-600 text-sm mb-3 truncate">{project.description?.replace(/<[^>]+>/g, '').substring(0, 120)}...</p>
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span>Created: {new Date(project.created_date).toLocaleDateString()}</span>
            {project.images?.length > 0 &&
            <span><i className="bi bi-image mr-1"></i>{project.images.length} images</span>
            }
            <span className="text-blue-600 group-hover:text-blue-700 font-medium">
              Click to edit project
            </span>
          </div>
          {project.status === 'COMPLETED' &&
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm font-semibold text-indigo-800 flex items-center gap-2">
                <i className="bi bi-graph-up-arrow"></i>
                Best Time to List
              </p>
              {isGettingTime ?
            <p className="text-xs text-indigo-700 animate-pulse">Getting suggestion...</p> :

            <p className="text-xs text-indigo-700">{suggestedTime}</p>
            }
            </div>
          }
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <TooltipProvider>
            {project.status === 'COMPLETED' && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700" onClick={handlePreviewClick}>
                    <i className="bi bi-eye"></i>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview HTML</p>
                </TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={createPageUrl("Wizard") + "?projectId=" + project.id}>
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Project</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => onDelete(project.id)}>
                  <i className="bi bi-trash"></i>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>);

};

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [stats, setStats] = useState({ total: 0, completed: 0, draft: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [previewProject, setPreviewProject] = useState(null);
  const { subscription, usage, checkUsageLimit } = useSubscription();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, statusFilter]);

  const filterProjects = () => {
    if (statusFilter === "ALL") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.status === statusFilter));
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const projectData = await ListingProject.list("-created_date", 20);
      setProjects(projectData);

      setStats({
        total: projectData.length,
        completed: projectData.filter((p) => p.status === "COMPLETED").length,
        draft: projectData.filter((p) => p.status === "DRAFT").length
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const deleteProject = async (projectId) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await ListingProject.delete(projectId);
        loadData();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project.");
      }
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[var(--text-primary)]">Welcome to eBay Listing Description AI

            </h1>
                        <p className="text-xl text-[var(--text-secondary)] mb-8">
              Generate professional eBay descriptions with AI-powered optimization
            </p>
          </div>
          <UsageLimitGuard type="listings">
            <Link to={createPageUrl("Wizard")}>
              <Button 
                className={`bg-brand-primary hover:bg-brand-primary-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl ${
                  checkUsageLimit('listings') ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={checkUsageLimit('listings')}
              >
                <i className="bi bi-plus-circle mr-2"></i>
                {checkUsageLimit('listings') ? 'Usage Limit Reached' : 'Create New Description'}
              </Button>
            </Link>
          </UsageLimitGuard>
        </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Total Projects</CardTitle>
                  <i className="bi bi-folder text-brand-primary"></i>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[var(--text-primary)]">{stats.total}</div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {stats.total === 0 ? "No projects yet" : "All time"}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Completed</CardTitle>
                  <i className="bi bi-check-circle text-emerald-600"></i>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{stats.completed}</div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Ready to publish
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Drafts</CardTitle>
                  <i className="bi bi-file-earmark-text text-amber-600"></i>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">{stats.draft}</div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  In progress
                </p>
              </CardContent>
            </Card>
            
            {/* Usage Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-blue-700">Monthly Usage</CardTitle>
                  <i className="bi bi-graph-up text-blue-600"></i>
                </div>
              </CardHeader>
              <CardContent>
                {subscription && usage ? (
                  <>
                    <div className="text-2xl font-bold text-blue-700 mb-2">
                      {usage.listingsGenerated} / {getPlanLimits(subscription.plan).listings === -1 ? '∞' : getPlanLimits(subscription.plan).listings}
                    </div>
                    <Progress 
                      value={getPlanLimits(subscription.plan).listings === -1 ? 0 : (usage.listingsGenerated / getPlanLimits(subscription.plan).listings) * 100} 
                      className="h-2 mb-2"
                    />
                    <p className="text-xs text-blue-600">
                      {STRIPE_PLANS[subscription.plan]?.name || 'Free'} Plan
                    </p>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-blue-700">Loading...</div>
                )}
              </CardContent>
            </Card>
        </div>

        {/* Project Filters */}
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "ALL", label: "All Projects", count: stats.total },
            { key: "DRAFT", label: "Draft", count: stats.draft },
            { key: "COMPLETED", label: "Completed", count: stats.completed }
          ].map(filter => (
            <Button
              key={filter.key}
              variant={statusFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(filter.key)}
              className="flex items-center gap-2"
            >
              {filter.label}
              <Badge variant="secondary" className="ml-1">{filter.count}</Badge>
            </Button>
          ))}
        </div>

        <Card className="bg-white shadow-sm border-[var(--border-color)]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[var(--text-primary)]">
              {statusFilter === "ALL" ? "All Projects" : statusFilter === "DRAFT" ? "Draft Projects" : "Completed Projects"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-slate-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <i className="bi bi-folder2-open text-5xl text-slate-300 mx-auto mb-4"></i>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {statusFilter === "ALL" ? "No projects yet" : `No ${statusFilter.toLowerCase()} projects`}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  {statusFilter === "DRAFT" 
                    ? "Start creating a new listing to see drafts here!"
                    : statusFilter === "COMPLETED"
                    ? "Complete a description in the wizard to see it here!"
                    : "Create your first listing to get started!"
                  }
                </p>
                <Link to={createPageUrl("Wizard")}>
                  <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl">
                    <i className="bi bi-plus-circle mr-2"></i>
                    Create New Project
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onDelete={deleteProject} 
                    onView={setPreviewProject}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Preview Dialog */}
      <Dialog open={!!previewProject} onOpenChange={() => setPreviewProject(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{previewProject?.title}</DialogTitle>
            <DialogDescription>
              Preview of your completed eBay listing description
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            {previewProject && <ListingPreview project={previewProject} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>);

}