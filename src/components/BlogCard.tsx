"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  image?: string;
}

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block p-6 rounded-xl bg-secondary/30 border border-foreground/10 dark:border-white/5 hover:border-primary/50 transition-all hover:bg-secondary/40"
      >
        {post.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-foreground/60 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
          {post.title}
        </h2>

        <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30">
            {post.category}
          </span>
          {post.tags.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-foreground/60">
              <Tag className="w-3 h-3" />
              {post.tags.slice(0, 2).join(", ")}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

