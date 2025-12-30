"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import type { GitHubRepository } from "@/lib/github";

interface GitHubContributionsProps {
  username?: string;
  limit?: number;
}

export function GitHubContributions({ username = "Afraim3499", limit = 6 }: GitHubContributionsProps) {
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`/api/github?username=${username}&type=repos&limit=${limit}`);
        if (response.ok) {
          const data = await response.json();
          setRepos(data.repos || []);
        }
      } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, [username, limit]);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-lg bg-white/5 animate-pulse">
            <div className="h-4 bg-white/10 rounded mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (repos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Github className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold">Featured Repositories</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {repos.map((repo, index) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="block p-4 rounded-lg bg-secondary/30 border border-white/5 hover:border-primary/50 transition-all group"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h4 className="font-bold text-white group-hover:text-primary transition-colors">
                {repo.name}
              </h4>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{repo.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                {repo.language}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                {repo.forks}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

