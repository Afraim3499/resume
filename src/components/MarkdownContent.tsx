"use client";

import { useEffect, useState } from "react";
import { markdownToHtml } from "@/lib/markdown";
import { getAllTerms } from "@/data/knowledge-graph";

interface MarkdownContentProps {
  content: string;
  className?: string;
  autoLink?: boolean;
}

export function MarkdownContent({ content, className = "", autoLink = true }: MarkdownContentProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processMarkdown = async () => {
      try {
        let html = await markdownToHtml(content);

        if (autoLink) {
          const terms = getAllTerms();
          // Sort terms by length descending to avoid partial matches (e.g., "Venture Architecture" vs "Venture")
          const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);

          sortedTerms.forEach((term) => {
            // Only link if it's not already inside an <a> tag
            // Using a simple regex for finding text outside of HTML tags
            const regex = new RegExp(`(?<!<[^>]*)\\b(${term.term})\\b(?![^<]*>)`, "gi");
            html = html.replace(regex, (match) => {
              return `<a href="/wiki/${term.id}" class="text-primary hover:underline hover:text-primary/80 transition-colors font-medium decoration-primary/30 underline-offset-4 decoration-2">${match}</a>`;
            });
          });
        }

        setHtmlContent(html);
      } catch (error) {
        console.error("Error processing markdown:", error);
        setHtmlContent(content); // Fallback to raw content
      } finally {
        setIsLoading(false);
      }
    };

    processMarkdown();
  }, [content, autoLink]);

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

