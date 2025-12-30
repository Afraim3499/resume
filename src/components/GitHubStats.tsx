"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Users, Code } from "lucide-react";
import type { GitHubStats as GitHubStatsType } from "@/lib/github";

interface GitHubStatsProps {
  username?: string;
}

export function GitHubStats({ username = "rizwanulislam" }: GitHubStatsProps) {
  const [stats, setStats] = useState<GitHubStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/github?username=${username}&type=stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-lg bg-foreground/5 animate-pulse">
            <div className="h-4 bg-foreground/10 rounded mb-2"></div>
            <div className="h-8 bg-foreground/10 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statItems = [
    {
      icon: Code,
      label: "Repositories",
      value: stats.publicRepos,
      color: "text-blue-400",
    },
    {
      icon: Star,
      label: "Stars",
      value: stats.totalStars,
      color: "text-yellow-400",
    },
    {
      icon: GitFork,
      label: "Forks",
      value: stats.totalForks,
      color: "text-purple-400",
    },
    {
      icon: Users,
      label: "Followers",
      value: stats.followers,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">
          GitHub <span className="text-gradient">Activity</span>
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          Open source contributions and code repositories.
        </p>
      </motion.div>
      
      <div className="flex items-center justify-center gap-3 mb-8">
        <a
          href={`https://github.com/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center gap-2"
        >
          <Github className="w-5 h-5" />
          <span>@{stats.username}</span>
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 rounded-lg bg-secondary/30 border border-white/5 hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${item.color}`} />
                <div className="text-xs text-foreground/70">{item.label}</div>
              </div>
              <div className={`text-2xl font-bold ${item.color}`}>
                {item.value.toLocaleString()}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

