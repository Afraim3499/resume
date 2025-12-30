"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ size = "md", text = "Loading...", fullScreen = false }: LoadingProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const content = (
    <div className="flex flex-col items-center gap-4">
      <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
      {text && <p className="text-gray-400">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {content}
      </div>
    );
  }

  return content;
}

export function SkeletonCard() {
  return (
    <div className="p-6 rounded-xl bg-secondary/30 border border-white/5 animate-pulse">
      <div className="h-6 bg-white/10 rounded mb-4 w-3/4" />
      <div className="h-4 bg-white/10 rounded mb-2" />
      <div className="h-4 bg-white/10 rounded mb-2 w-5/6" />
      <div className="h-4 bg-white/10 rounded w-4/6" />
    </div>
  );
}

export function SkeletonProjectCard() {
  return (
    <div className="rounded-xl bg-secondary/30 border border-white/5 overflow-hidden animate-pulse">
      <div className="h-48 bg-white/10" />
      <div className="p-6 md:p-8">
        <div className="h-8 bg-white/10 rounded mb-4 w-2/3" />
        <div className="h-4 bg-white/10 rounded mb-2" />
        <div className="h-4 bg-white/10 rounded mb-2 w-5/6" />
        <div className="h-4 bg-white/10 rounded mb-6 w-4/6" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-white/10 rounded-full" />
          <div className="h-6 w-20 bg-white/10 rounded-full" />
          <div className="h-6 w-24 bg-white/10 rounded-full" />
        </div>
        <div className="h-10 bg-white/10 rounded w-32" />
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div className="p-6 rounded-xl bg-secondary/30 border border-white/5 animate-pulse">
      <div className="h-48 bg-white/10 rounded-lg mb-4" />
      <div className="h-4 bg-white/10 rounded mb-2 w-1/4" />
      <div className="h-6 bg-white/10 rounded mb-2 w-3/4" />
      <div className="h-4 bg-white/10 rounded mb-2" />
      <div className="h-4 bg-white/10 rounded mb-4 w-5/6" />
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-white/10 rounded-full" />
        <div className="h-6 w-16 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-white/10 rounded ${
            i === lines - 1 ? "w-3/4" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonList({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-4 h-4 bg-white/10 rounded-full" />
          <div className="h-4 bg-white/10 rounded flex-1" />
        </div>
      ))}
    </div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {children}
    </div>
  );
}

