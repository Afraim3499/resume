import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('sitemap', () => {
    it('returns an array of sitemap entries', () => {
        const entries = sitemap();
        expect(Array.isArray(entries)).toBe(true);
        expect(entries.length).toBeGreaterThan(0);
    });

    it('all entries have valid URLs starting with https://www.rizwanulafraim.com', () => {
        const entries = sitemap();
        for (const entry of entries) {
            expect(entry.url).toMatch(/^https:\/\/www\.rizwanulafraim\.com/);
        }
    });

    it('does not include blog posts with future dates', () => {
        const entries = sitemap();
        const blogEntries = entries.filter(e => e.url.includes('/blog/'));
        const now = new Date();

        for (const entry of blogEntries) {
            if (entry.lastModified) {
                // lastModified is derived from post date, so it should not be future
                expect(new Date(entry.lastModified).getTime()).toBeLessThanOrEqual(
                    now.getTime() + 24 * 60 * 60 * 1000 // 1-day tolerance for timezones
                );
            }
        }
    });

    it('includes core routes', () => {
        const entries = sitemap();
        const urls = entries.map(e => e.url);

        expect(urls).toContain('https://www.rizwanulafraim.com');
        expect(urls).toContain('https://www.rizwanulafraim.com/blog');
        expect(urls).toContain('https://www.rizwanulafraim.com/services');
        expect(urls).toContain('https://www.rizwanulafraim.com/resume');
    });

    it('contains valid absolute URLs in images arrays', () => {
        const entries = sitemap();
        let imageCount = 0;

        for (const entry of entries) {
            if (entry.images) {
                expect(Array.isArray(entry.images)).toBe(true);
                for (const img of entry.images) {
                    imageCount++;
                    expect(img).toMatch(/^https:\/\/(www\.rizwanulafraim\.com|brshoodoihexflrolqvu\.supabase\.co)/);
                }
            }
        }
        expect(imageCount).toBeGreaterThan(0);
    });

    it('maps images correctly for specific routes', () => {
        const entries = sitemap();
        
        const homeEntry = entries.find(e => e.url === 'https://www.rizwanulafraim.com');
        expect(homeEntry?.images).toContain('https://www.rizwanulafraim.com/assets/afraim-logo.png');

        const aboutEntry = entries.find(e => e.url === 'https://www.rizwanulafraim.com/about');
        expect(aboutEntry?.images).toContain('https://www.rizwanulafraim.com/assets/rizwanul-islam-afraim.webp');
    });
});
