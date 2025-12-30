# Placeholder Content Guide

This guide helps you fill in the placeholder content throughout your portfolio.

## 1. Social Media Links (`src/data/social.ts`)

Update the URLs with your actual social media profiles:

```typescript
{
  platform: "LinkedIn",
  url: "https://linkedin.com/in/your-actual-profile", // ← Update this
  username: "yourusername",
  icon: "linkedin",
},
{
  platform: "GitHub",
  url: "https://github.com/your-actual-username", // ← Update this
  username: "yourusername",
  icon: "github",
},
{
  platform: "Twitter",
  url: "https://twitter.com/your-actual-handle", // ← Update this
  username: "@yourhandle",
  icon: "twitter",
},
```

## 2. Testimonials (`src/data/testimonials.ts`)

Add real testimonials from:
- **Gaari**: Users, partners, or team members
- **The Trail**: Readers, contributors, or team members
- **Yagacalls**: Community members (3,500+ investors)
- **NSUSS**: Team members, event attendees, or collaborators
- **PrimeSync**: Colleagues or clients
- **Carnival of Crust**: Customers or delivery platform partners
- **Vibrance**: Customers who loved the doodle hoodies

Example structure:
```typescript
{
  id: "testimonial-1",
  name: "Real Person Name",
  role: "Their Role",
  company: "Their Company",
  companyUrl: "https://example.com", // Optional
  content: "Real testimonial quote here...",
  rating: 5,
  date: "2024-01-15",
  image: "/assets/testimonial-avatar.jpg", // Optional
},
```

## 3. Certifications (`src/data/certifications.ts`)

Add any certifications you have:
- Technical certifications (Next.js, AWS, Google Cloud, etc.)
- Business/Management certifications
- University degrees or professional qualifications

Example:
```typescript
{
  id: "cert-1",
  name: "Certification Name",
  issuer: "Issuing Organization",
  issuerUrl: "https://issuer.com",
  issueDate: "2024-01-15",
  expiryDate: "2025-01-15", // Optional if it expires
  credentialId: "ABC123", // Optional
  credentialUrl: "https://issuer.com/verify/ABC123", // Optional
  description: "What this certification represents",
},
```

## 4. Blog Posts (`src/data/blog.ts`)

Add real blog posts about:
- Technical deep dives (e.g., "How I Built Gaari's Booking System")
- Lessons learned from your ventures
- Market research insights from PrimeSync
- Event management strategies from NSUSS
- SEO strategies from Yagacalls
- Startup experiences

Example:
```typescript
{
  slug: "building-gaari-booking-system",
  title: "Building Gaari's Multi-Service Booking System",
  excerpt: "A technical deep dive into how I built a scalable booking engine...",
  content: "# Full markdown content here...",
  date: "2024-01-15",
  category: "Web Development",
  tags: ["Next.js", "TypeScript", "E-commerce"],
  readingTime: 8,
  views: 0,
  featured: true,
  author: {
    name: "Rizwanul Islam",
  },
},
```

## 5. Project Screenshots

Add real screenshots from your live sites:
- `public/assets/gaari-preview.jpg` - Screenshot from gaaribd.com
- `public/assets/trail-preview.jpg` - Screenshot from trailheadlines.com
- `public/assets/yagacalls-preview.jpg` - Screenshot from yagacalls.com
- `public/assets/primesync-preview.jpg` - Screenshot from primesyncsolutions.com
- `public/assets/carnival-preview.jpg` - Screenshot from Carnival of Crust
- `public/assets/vibrance-preview.jpg` - Screenshot from Vibrance

## 6. GitHub Repository URLs

If you have public repositories, add them to projects in `src/data/projects.ts`:

```typescript
{
  slug: "gaari",
  // ... other fields
  githubUrl: "https://github.com/yourusername/gaari", // ← Add if available
},
```

## 7. Domain Configuration

Update all placeholder URLs with your actual domain:

**Files to update:**
- `src/app/layout.tsx` - `metadataBase` and Open Graph URLs
- `src/app/sitemap.ts` - `baseUrl`
- `src/app/robots.ts` - `sitemap` URL
- `src/components/SchemaData.tsx` - All URLs
- `src/app/blog/[slug]/page.tsx` - Post URLs
- `src/app/case-studies/[slug]/page.tsx` - Case study URLs

Replace `https://rizwanulislam.com` with your actual domain.

## 8. Email Service Configuration

For contact form and newsletter to work:

1. **Get API Key**: Sign up for Resend (https://resend.com) or use another email service
2. **Add to `.env.local`**:
   ```
   RESEND_API_KEY=your_api_key_here
   CONTACT_EMAIL=your-email@example.com
   ```
3. **Update `src/app/api/contact/route.ts`**: Uncomment the Resend integration code
4. **Update `src/app/api/newsletter/route.ts`**: Uncomment the Resend integration code

## 9. Google Analytics

1. **Get Measurement ID**: From Google Analytics 4
2. **Add to `.env.local`**:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. The Analytics component will automatically use it

## 10. Resume PDF

Add your resume PDF:
- `public/assets/resume.pdf` - Your actual resume file

## Quick Checklist

- [ ] Update social media URLs
- [ ] Add real testimonials (at least 2-3)
- [ ] Add certifications (if any)
- [ ] Add blog posts (start with 2-3)
- [ ] Add project screenshots
- [ ] Add GitHub URLs (if repositories are public)
- [ ] Update domain URLs
- [ ] Configure email service
- [ ] Add Google Analytics ID
- [ ] Add resume PDF

## Notes

- All placeholders are clearly marked with comments
- The site works perfectly with placeholders - you can launch and update content gradually
- Testimonials section won't show if the array is empty
- Certifications section won't show if the array is empty
- Blog will show "coming soon" message if no posts exist

