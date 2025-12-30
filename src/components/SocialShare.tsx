"use client";

import { Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400">Share:</span>
      <div className="flex items-center gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all group"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all group"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all group"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
        </a>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all group"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Link2 className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
}

