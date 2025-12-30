"use client";

import { useEffect, useState } from "react";
import { markdownToHtml } from "@/lib/markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processMarkdown = async () => {
      try {
        const html = await markdownToHtml(content);
        setHtmlContent(html);
      } catch (error) {
        console.error("Error processing markdown:", error);
        setHtmlContent(content); // Fallback to raw content
      } finally {
        setIsLoading(false);
      }
    };

    processMarkdown();
  }, [content]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-foreground/10 rounded w-3/4"></div>
        <div className="h-4 bg-foreground/10 rounded"></div>
        <div className="h-4 bg-foreground/10 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div
      className={`prose prose-lg max-w-none dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

