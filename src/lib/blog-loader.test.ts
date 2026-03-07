import { describe, it, expect } from 'vitest';
import { getAllBlogPosts, getAllBlogPostPreviews } from '@/lib/blog-loader';

describe('blog-loader', () => {
    describe('getAllBlogPosts', () => {
        it('returns an array of posts', () => {
            const posts = getAllBlogPosts();
            expect(Array.isArray(posts)).toBe(true);
        });

        it('excludes future-dated posts', () => {
            const posts = getAllBlogPosts();
            const now = new Date();
            for (const post of posts) {
                expect(new Date(post.date).getTime()).toBeLessThanOrEqual(now.getTime());
            }
        });

        it('returns posts sorted by date descending', () => {
            const posts = getAllBlogPosts();
            for (let i = 1; i < posts.length; i++) {
                expect(new Date(posts[i - 1].date).getTime()).toBeGreaterThanOrEqual(
                    new Date(posts[i].date).getTime()
                );
            }
        });

        it('each post has required fields', () => {
            const posts = getAllBlogPosts();
            for (const post of posts) {
                expect(post.slug, `${post.slug}: missing slug`).toBeTruthy();
                expect(post.title, `${post.slug}: missing title`).toBeTruthy();
                expect(post.date, `${post.slug}: missing date`).toBeTruthy();
                expect(post.category, `${post.slug}: missing category`).toBeDefined();
                expect(Array.isArray(post.tags), `${post.slug}: tags should be array`).toBe(true);
                expect(typeof post.content, `${post.slug}: content should be string`).toBe('string');
            }
        });

        it('has valid frontmatter (content does not start with raw frontmatter text)', () => {
            const posts = getAllBlogPosts();
            for (const post of posts) {
                // If gray-matter failed to parse frontmatter, title would be empty
                // or content would contain the raw YAML
                expect(post.title).not.toBe('');
                expect(post.content).not.toMatch(/^title:/);
            }
        });
    });

    describe('getAllBlogPostPreviews', () => {
        it('returns posts without content field', () => {
            const previews = getAllBlogPostPreviews();
            for (const preview of previews) {
                expect(preview).not.toHaveProperty('content');
            }
        });

        it('preserves all metadata fields', () => {
            const previews = getAllBlogPostPreviews();
            for (const preview of previews) {
                expect(preview.slug).toBeTruthy();
                expect(preview.title).toBeTruthy();
                expect(preview.date).toBeTruthy();
                expect(preview.category).toBeDefined();
                expect(Array.isArray(preview.tags)).toBe(true);
            }
        });

        it('has the same count as getAllBlogPosts', () => {
            const posts = getAllBlogPosts();
            const previews = getAllBlogPostPreviews();
            expect(previews.length).toBe(posts.length);
        });
    });
});
