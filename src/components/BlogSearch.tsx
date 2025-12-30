"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface BlogSearchProps {
  posts: BlogPost[];
  onSearchChange: (filteredPosts: BlogPost[]) => void;
}

export function BlogSearch({ posts, onSearchChange }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      onSearchChange(posts);
      return;
    }

    const filtered = posts.filter((post) => {
      const searchLower = query.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        post.category.toLowerCase().includes(searchLower)
      );
    });

    onSearchChange(filtered);
  };

  return (
    <div className="relative mb-8">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-12 pr-10 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
      />
      {searchQuery && (
        <button
          onClick={() => handleSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

