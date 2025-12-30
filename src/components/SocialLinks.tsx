"use client";

import { Linkedin, Github, Facebook } from "lucide-react";
import { socialProfiles } from "@/data/social";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
};

interface SocialLinksProps {
  variant?: "default" | "minimal" | "icons-only";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SocialLinks({ variant = "default", size = "md", className = "" }: SocialLinksProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialProfiles.map((profile) => {
        const Icon = iconMap[profile.icon as keyof typeof iconMap] || Github;
        return (
          <a
            key={profile.platform}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all group`}
            aria-label={`Visit ${profile.platform} profile`}
          >
            <Icon className={`${size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"} text-foreground/70 group-hover:text-primary transition-colors`} />
          </a>
        );
      })}
    </div>
  );
}

