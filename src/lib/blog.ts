import { calculateReadingTime, extractExcerpt, extractHeadings } from "./markdown";
import { format } from "date-fns";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  views?: number;
  featured?: boolean;
  image?: string;
  author?: {
    name: string;
    email?: string;
  };
}

export function calculatePostReadingTime(content: string): number {
  return calculateReadingTime(content);
}

export function generateExcerpt(content: string, maxLength: number = 150): string {
  return extractExcerpt(content, maxLength);
}

export function formatPostDate(date: string): string {
  try {
    return format(new Date(date), "MMMM d, yyyy");
  } catch {
    return date;
  }
}

export function getPostHeadings(content: string) {
  return extractHeadings(content);
}

export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit: number = 3
): BlogPost[] {
  return allPosts
    .filter(
      (post) =>
        post.slug !== currentPost.slug &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

