"use client";

import { useState, useMemo, useEffect } from "react";
import { Flame, TrendingUp, Clock, Star } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { getAllCategories, getAllTags } from "@/data/blog";

interface BlogFiltersProps {
  posts: BlogPost[];
  onFilterChange: (filteredPosts: BlogPost[]) => void;
}

type SortOption = "latest" | "popular" | "trending" | "hot";

export function BlogFilters({ posts, onFilterChange }: BlogFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [dateFilter, setDateFilter] = useState<string>("all");

  const categories = useMemo(() => ["all", ...getAllCategories()], []);
  const tags = useMemo(() => ["all", ...getAllTags()], []);

  // Capture timestamp once for stable sorting
  const [nowTimestamp] = useState(() => Date.now());

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...posts];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag !== "all") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter((post) => new Date(post.date) >= filterDate);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "popular":
          return (b.views || 0) - (a.views || 0);
        case "trending":
          // Combine views and recency for trending
          const aScore = (a.views || 0) * (1 / (nowTimestamp - new Date(a.date).getTime() + 1));
          const bScore = (b.views || 0) * (1 / (nowTimestamp - new Date(b.date).getTime() + 1));
          return bScore - aScore;
        case "hot":
          // Recent posts with high views
          const aHot = (a.views || 0) * (new Date(a.date).getTime() > nowTimestamp - 7 * 24 * 60 * 60 * 1000 ? 2 : 1);
          const bHot = (b.views || 0) * (new Date(b.date).getTime() > nowTimestamp - 7 * 24 * 60 * 60 * 1000 ? 2 : 1);
          return bHot - aHot;
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, selectedCategory, selectedTag, sortBy, dateFilter, nowTimestamp]);

  // Update parent when filters change
  useEffect(() => {
    onFilterChange(filteredAndSortedPosts);
  }, [filteredAndSortedPosts, onFilterChange]);

  return (
    <div className="space-y-6 mb-12">
      {/* Sort Buttons (Inspired by Trail) */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-gray-400">Filter:</span>
        <button
          onClick={() => setSortBy("latest")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${sortBy === "latest"
            ? "bg-primary text-white"
            : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
            }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Latest
        </button>
        <button
          onClick={() => setSortBy("popular")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${sortBy === "popular"
            ? "bg-primary text-white"
            : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
            }`}
        >
          <Star className="w-4 h-4 inline mr-2" />
          Most Popular
        </button>
        <button
          onClick={() => setSortBy("trending")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${sortBy === "trending"
            ? "bg-primary text-white"
            : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
            }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" />
          Trending
        </button>
        <button
          onClick={() => setSortBy("hot")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${sortBy === "hot"
            ? "bg-primary text-white"
            : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
            }`}
        >
          <Flame className="w-4 h-4 inline mr-2" />
          Hot
        </button>
      </div>

      {/* Category and Tag Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-gray-400 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
            style={{
              backgroundColor: 'rgb(10, 10, 10)',
            }}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                style={{ backgroundColor: 'rgb(10, 10, 10)', color: 'white' }}
              >
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-gray-400 mb-2">Tag</label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
            style={{
              backgroundColor: 'rgb(10, 10, 10)',
            }}
          >
            {tags.map((tag) => (
              <option
                key={tag}
                value={tag}
                style={{ backgroundColor: 'rgb(10, 10, 10)', color: 'white' }}
              >
                {tag === "all" ? "All Tags" : tag}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm text-gray-400 mb-2">Date</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors"
          >
            <option value="all" className="bg-[#0a0a0a] text-white">All Time</option>
            <option value="week" className="bg-[#0a0a0a] text-white">Past Week</option>
            <option value="month" className="bg-[#0a0a0a] text-white">Past Month</option>
            <option value="year" className="bg-[#0a0a0a] text-white">Past Year</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        Showing {filteredAndSortedPosts.length} of {posts.length} articles
      </div>
    </div>
  );
}

