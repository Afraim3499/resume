import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost } from './blog';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export function getAllBlogPosts(): BlogPost[] {
    // Ensure directory exists
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const files = fs.readdirSync(contentDirectory).filter(file => file.endsWith('.md'));

    const posts = files.map(filename => {
        const filePath = path.join(contentDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const slug = filename.replace(/\.md$/, '');

        return {
            slug,
            title: data.title,
            excerpt: data.excerpt,
            date: data.date,
            updatedAt: data.updatedAt,
            category: data.category,
            tags: data.tags || [],
            featured: data.featured || false,
            readingTime: data.readingTime || 5, // Default or calculate
            author: {
                name: data.author || 'Rizwanul Islam',
            },
            content: content,
            views: 0, // Dynamic views not stored in markdown
        } as BlogPost;
    });

    // Sort by date desc
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    const posts = getAllBlogPosts();
    return posts.find(post => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
    return getAllBlogPosts().filter(post => post.featured);
}

export function getAllCategories(): string[] {
    const categories = new Set(getAllBlogPosts().map(post => post.category));
    return Array.from(categories).sort();
}

export function getAllTags(): string[] {
    const tags = new Set(getAllBlogPosts().flatMap(post => post.tags));
    return Array.from(tags).sort();
}

// Map project slugs to blog post slugs
const projectToBlogMap: Record<string, string> = {
    "gaari": "building-gaari-booking-system",
    "the-trail": "launching-trail-news-platform",
    "yagacalls": "4-layer-seo-framework-yagacalls",
};

export function getBlogPostByProjectSlug(projectSlug: string): BlogPost | undefined {
    const blogSlug = projectToBlogMap[projectSlug];
    if (!blogSlug) return undefined;
    return getBlogPostBySlug(blogSlug);
}
