"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectFiltersProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

export function ProjectFilters({ projects, onFilterChange }: ProjectFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Project["category"] | "all">("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");

  const categories: Project["category"][] = ["ecommerce", "cms", "ai", "operations", "news"];
  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.techStack?.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;

      // Tech filter
      const matchesTech =
        selectedTech === "all" ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(selectedTech.toLowerCase())
        );

      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [projects, searchQuery, selectedCategory, selectedTech]);

  // Update parent when filters change
  useEffect(() => {
    onFilterChange(filteredProjects);
  }, [filteredProjects, onFilterChange]);

  return (
    <div className="space-y-6 mb-12">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-10 py-3 rounded-lg bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Category Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-foreground/70 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Project["category"] | "all")}
            className="w-full px-4 py-2 rounded-lg bg-background border border-foreground/10 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option 
                key={category} 
                value={category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Tech Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-foreground/70 mb-2">Technology</label>
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-background border border-foreground/10 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
          >
            <option value="all">All Technologies</option>
            {allTechs.map((tech) => (
              <option 
                key={tech} 
                value={tech}
              >
                {tech}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-foreground/70">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>
    </div>
  );
}

