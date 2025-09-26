
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
import { InvokeLLM } from "@/api/integrations";

const ProjectCard = ({ project, onDelete }) => {
  const [suggestedTime, setSuggestedTime] = useState(project.suggestedListTime || "");
  const [isGettingTime, setIsGettingTime] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const fetchListingTime = async () => {
    if (suggestedTime) return;
    setIsGettingTime(true);
    try {
      const result = await InvokeLLM({
        prompt: `For the product "${project.title}", what is the single best day and time window (e.g., "Tuesday, 7-9 PM CST") to list on eBay for maximum visibility? Provide ONLY the day and time recommendation, nothing else. Be concise.`,
        add_context_from_internet: true
      });
      const time = typeof result === 'string' ? result.trim() : "Could not generate suggestion.";
      setSuggestedTime(time);
      await ListingProject.update(project.id, { suggestedListTime: time });
    } catch (e) {
      console.error(e);
      setSuggestedTime("Could not generate suggestion.");
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
      className="p-6 bg-white rounded-xl border border-[var(--border-color)] hover:shadow-lg transition-all duration-300">

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-slate-900 text-lg truncate">{project.title || 'Untitled Project'}</h3>
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
        <div className="flex items-center gap-1">
          <TooltipProvider>
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
  const [stats, setStats] = useState({ total: 0, completed: 0, draft: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

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

  const completedProjects = projects.filter((p) => p.status === 'COMPLETED');

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[var(--text-primary)]">Welcome to eBay Listing Description AI

            </h1>
            <p className="text-[var(--text-secondary)] text-lg mt-2">
              Generate professional eBay listings with AI-powered optimization
            </p>
          </div>
          <Link to={createPageUrl("Wizard")}>
            <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl">
              <i className="bi bi-plus-circle mr-2"></i>
              Create New Listing
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-[var(--text-secondary)]">Total Projects</CardTitle>
                  <i className="bi bi-file-earmark-text text-xl text-[var(--text-secondary)]"></i>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[var(--text-primary)]">{stats.total}</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-[var(--text-secondary)]">Completed</CardTitle>
                  <i className="bi bi-stars text-xl text-emerald-500"></i>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{stats.completed}</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-[var(--text-secondary)]">Draft Projects</CardTitle>
                  <i className="bi bi-pencil-square text-xl text-amber-500"></i>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">{stats.draft}</div>
              </CardContent>
            </Card>
        </div>

        <Card className="bg-white shadow-sm border-[var(--border-color)]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[var(--text-primary)]">Recent Completed Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ?
            <div className="space-y-4">
                {Array(3).fill(0).map((_, i) =>
              <div key={i} className="animate-pulse">
                    <div className="h-20 bg-slate-200 rounded-lg"></div>
                  </div>
              )}
              </div> :
            completedProjects.length === 0 ?
            <div className="text-center py-12">
                <i className="bi bi-check2-circle text-5xl text-slate-300 mx-auto mb-4"></i>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No completed projects yet</h3>
                <p className="text-[var(--text-secondary)] mb-6">Complete a listing in the wizard to see it here!</p>
                <Link to={createPageUrl("Wizard")}>
                  <Button className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl">
                    <i className="bi bi-plus-circle mr-2"></i>
                    Create First Listing
                  </Button>
                </Link>
              </div> :

            <div className="space-y-4">
                {completedProjects.map((project) =>
              <ProjectCard key={project.id} project={project} onDelete={deleteProject} />
              )}
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </div>);

}