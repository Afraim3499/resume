"use client";

import { useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { BlogSearch } from "@/components/BlogSearch";
import { BlogFilters } from "@/components/BlogFilters";
import { blogPosts } from "@/data/blog";
import type { BlogPost } from "@/lib/blog";

export function BlogListing() {
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

    return (
        <div className="container px-4 mx-auto max-w-6xl py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                    Advanced Technical <span className="text-gradient">Insights</span>
                </h1>
                <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
                    Expert deep dives into AI/ML, Next.js architecture, RAG pipelines, and operational data strategy.
                </p>
            </div>

            {blogPosts.length > 0 ? (
                <>
                    <BlogSearch posts={blogPosts} onSearchChange={setFilteredPosts} />
                    <BlogFilters posts={blogPosts} onFilterChange={setFilteredPosts} />

                    {filteredPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post, index) => (
                                <BlogCard
                                    key={post.slug}
                                    post={{
                                        slug: post.slug,
                                        title: post.title,
                                        excerpt: post.excerpt,
                                        date: post.date,
                                        category: post.category,
                                        tags: post.tags,
                                        readingTime: `${post.readingTime} min read`,
                                        image: post.image,
                                    }}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-foreground/70 text-lg mb-4">No articles found matching your filters.</p>
                            <p className="text-foreground/60">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <p className="text-foreground/70 text-lg mb-4">Blog posts coming soon!</p>
                    <p className="text-foreground/60">Check back later for technical articles and insights.</p>
                </div>
            )}
        </div>
    );
}
