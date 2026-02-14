---
title: "Edge Computing and Serverless: Deploying Web Apps Closer to Dhaka"
excerpt: "Why edge computing matters for Bangladeshi users and how to deploy Next.js applications at the edge for sub-100ms latency. A practical guide from a Dhaka-based developer."
date: "2026-01-20"
category: "Web Development"
tags: ["Edge Computing", "Serverless", "Next.js", "Performance", "Bangladesh"]
featured: false
readingTime: 9
author: "Rizwanul Islam"
---

# Edge Computing and Serverless: Deploying Web Apps Closer to Dhaka

When I launched [Gaari](https://gaaribd.com), our car rental platform, the first performance report was disappointing. Despite a 98/100 Lighthouse score locally, real users in Dhaka experienced 800ms+ time-to-first-byte. The reason was simple: the server was in Virginia. Every request travelled 13,000 kilometres before the user saw a single pixel.

Edge computing solved this problem. Here is how — and why it matters for every developer building for Bangladeshi audiences.

## Why Latency Matters for Bangladeshi Users

Bangladesh has over 130 million internet users, but the infrastructure differs significantly from Western markets:

- **Average mobile connection**: 25-40 Mbps (improving, but latency-sensitive)
- **Primary device**: Mobile (78% of web traffic in Bangladesh)
- **Network variability**: Significant variation between urban Dhaka and rural areas
- **User expectations**: Instant. Bangladeshi users are accustomed to apps like bKash and Pathao that load in under a second

Every 100ms of latency reduces conversion by approximately 1%. For a booking platform like Gaari, that directly translates to lost revenue.

### The Physics Problem

Traditional server deployments force a choice:

| Deployment Region | Latency to Dhaka | Latency to US | Trade-off |
|-------------------|-----------------|---------------|-----------|
| US East (Virginia) | ~250ms | ~20ms | Great for US, terrible for BD |
| Singapore | ~80ms | ~200ms | Better for BD, worse for US |
| Edge (Global CDN) | ~30ms everywhere | ~30ms everywhere | No trade-off |

Edge computing eliminates the trade-off by running your code at the nearest data centre to the user — whether they are in Dhaka, Chittagong, or New York.

## Edge Runtimes vs Traditional Servers

Understanding the difference is critical before choosing an approach.

### Traditional Server (Node.js)

- Full Node.js API available
- Persistent connections (WebSockets, database connections)
- No cold start concerns
- Deployed in one or a few regions

### Edge Runtime (Cloudflare Workers, Vercel Edge)

- Limited API surface (no `fs`, limited `crypto`, no native modules)
- Stateless by design (no persistent connections)
- Sub-millisecond cold starts
- Deployed to 200+ locations globally

### When to Use Each

| Use Case | Traditional Server | Edge Runtime |
|----------|-------------------|--------------|
| API routes with database queries | ✅ | ⚠️ Via connection pooling |
| Static page rendering | ❌ Overkill | ✅ Ideal |
| Authentication | ✅ | ✅ With JWT |
| WebSocket connections | ✅ | ❌ |
| Image processing | ✅ | ❌ |
| Middleware (redirects, headers) | ✅ | ✅ Ideal |

## Meta-Frameworks and Edge by Default

Modern meta-frameworks are designed with edge deployment in mind.

### Next.js 16 Edge Configuration

Next.js allows per-route runtime selection:

```typescript
// app/api/availability/route.ts
// This runs at the edge — closest server to the user
export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  // Using edge-compatible database client
  const availability = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.location, location))
    .limit(20);

  return Response.json(availability, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

### Middleware at the Edge

Next.js Middleware runs at the edge by default, making it ideal for:

```typescript
// middleware.ts
// Runs before every request, at the nearest edge location
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Geo-based personalisation
  const country = request.geo?.country || 'BD';
  const city = request.geo?.city || 'Dhaka';

  // Set headers for downstream components
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);
  response.headers.set('x-user-city', city);

  // Redirect Bangladeshi users to localised content
  if (country === 'BD' && !request.nextUrl.pathname.startsWith('/bd')) {
    // Serve Bangladesh-optimised version
    response.headers.set('x-locale', 'bn-BD');
  }

  return response;
}
```

## Self-Hosting vs Platform: The Bangladesh Perspective

This is where the conversation gets practical for Bangladeshi developers.

### Platform Deployment (Vercel, Netlify, Cloudflare)

**Advantages:**
- Zero infrastructure management
- Global edge network included
- Automatic SSL, DDoS protection
- CI/CD built in

**Disadvantages:**
- Cost scales with traffic (can become expensive for high-traffic BD apps)
- Vendor lock-in risk
- Data residency concerns for regulated industries
- Payment in USD (exchange rate impact)

**Cost estimate for a medium BD app:**
- Vercel Pro: $20/month (~BDT 2,400)
- Vercel with heavy traffic: $40-100/month
- Cloudflare Pages: Free tier is generous

### Self-Hosting (VPS + Docker)

**Advantages:**
- Predictable monthly cost
- Full control over infrastructure
- Data stays where you choose
- Can optimise for BD-specific requirements

**Disadvantages:**
- Requires DevOps expertise
- No built-in edge network
- SSL, monitoring, backups are your responsibility
- Scaling requires manual intervention

**Cost estimate:**
- DigitalOcean Singapore (closest to BD): $12-24/month
- Local BD hosting: BDT 500-2000/month (limited, less reliable)

### My Recommendation for Bangladeshi Developers

For most projects, I recommend a **hybrid approach**:

1. **Use Vercel/Cloudflare for the frontend** — Edge deployment, free or low cost for most sites
2. **Self-host the database in Singapore** — Supabase or a VPS with PostgreSQL, lowest latency to BD
3. **Use Cloudflare for CDN** — Cache static assets at the edge, free plan is sufficient

This is exactly how [The Trail](https://trailheadlines.com) is deployed. The frontend runs on Vercel's edge network. The database sits on Supabase (Singapore region). Static assets are cached globally. The result: sub-second load times for users in Dhaka, Chittagong, and Sylhet.

## Real-World Deployment Tips for Bangladeshi Apps

### 1. Choose Singapore as Your Primary Region

Singapore is the closest major cloud region to Bangladesh. Every major provider (AWS, GCP, Azure, DigitalOcean, Supabase) has a Singapore data centre.

### 2. Implement Aggressive Caching

Bangladeshi mobile networks have higher latency variability. Caching compensates:

```typescript
// Cache-Control headers for different content types
const cacheStrategies = {
  static: 'public, max-age=31536000, immutable',       // 1 year
  dynamic: 'public, s-maxage=60, stale-while-revalidate=300',  // 1 min fresh, 5 min stale
  api: 'private, no-cache, no-store',                    // Never cache
  images: 'public, max-age=86400, stale-while-revalidate=3600', // 1 day
};
```

### 3. Optimise for Mobile First

With 78% mobile traffic in Bangladesh:
- Use responsive images with `srcset` and `sizes`
- Implement lazy loading for below-the-fold content
- Minimise JavaScript bundle size (target under 100KB for initial load)
- Use `preconnect` hints for critical third-party domains

### 4. Implement Service Workers for Offline Support

Network reliability varies across Bangladesh. A service worker ensures your app works even with intermittent connectivity:

- Cache critical pages and assets
- Show cached content when offline
- Queue form submissions for when connectivity returns
- Update cache in the background

## Results: Gaari's Performance After Edge Migration

| Metric | Before (US Server) | After (Edge + Singapore) |
|--------|-------------------|--------------------------|
| TTFB (Dhaka) | 820ms | 95ms |
| LCP (Mobile, BD) | 3.2s | 1.1s |
| Bounce Rate | 34% | 18% |
| Booking Completion | 12% | 19% |

The numbers speak for themselves. Deploying closer to your users is not an optimisation — it is a requirement.

## Key Learnings

1. **Latency is not optional** — For Bangladeshi users, every 100ms matters. Deploy in Singapore or at the edge
2. **Edge is not all-or-nothing** — Use edge for middleware and static pages, traditional servers for complex API logic
3. **Hybrid deployment wins** — Combine Vercel/Cloudflare frontend with Singapore-region database
4. **Cache aggressively** — Mobile networks in BD benefit enormously from proper caching strategies
5. **Test from Bangladesh** — Run performance tests from BD networks, not just US-based tools
6. **PWA capabilities help** — Service workers compensate for network variability

Edge computing is not just a Silicon Valley trend. For Bangladeshi developers building for local users, it is the difference between a fast app and a frustrating one. The infrastructure is available, the tools are mature, and the cost is manageable. There is no reason to keep your server 13,000 kilometres away from your users.
