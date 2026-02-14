---
title: "Building Resilient Web Applications: Security, Reliability, and Defense in Depth"
excerpt: "Modern web apps face threats from prompt injection to supply chain attacks. A practical guide to building resilient systems with rate limiting, circuit breakers, and runtime validation in Next.js."
date: "2025-10-25"
category: "Web Development"
tags: ["Security", "Reliability", "Next.js", "Web Architecture", "Best Practices"]
featured: false
readingTime: 10
author: "Rizwanul Islam"
---

# Building Resilient Web Applications: Security, Reliability, and Defense in Depth

Resilience is not a feature you add after launch. It is a design philosophy you embed from the first line of code. In 2025-2026, the threat landscape has expanded: prompt injection attacks, supply chain vulnerabilities, and AI-specific exploits join traditional threats like XSS, CSRF, and SQL injection.

Building [Gaari](https://gaaribd.com), a platform that handles financial transactions and personal data, taught me that security cannot be an afterthought. Here is the framework I use for building resilient web applications.

## The 2026 Threat Landscape

### Traditional Threats (Still Relevant)

- **Cross-Site Scripting (XSS)** — Injecting malicious scripts into web pages
- **Cross-Site Request Forgery (CSRF)** — Tricking users into performing unintended actions
- **SQL/NoSQL Injection** — Manipulating database queries through user input
- **Broken Authentication** — Weak session management, credential stuffing

### New Threats

- **Prompt Injection** — Manipulating AI agent behaviour through crafted inputs
- **Supply Chain Attacks** — Compromised npm packages, GitHub Actions, or CI/CD pipelines
- **API Abuse** — Automated scraping, credential stuffing, and resource exhaustion
- **Data Poisoning** — Corrupting training data or knowledge bases used by AI agents

## Framework Security Defaults

Modern meta-frameworks provide security defaults. Understanding and augmenting them is critical.

### Next.js Built-In Protections

```typescript
// next.config.ts — Security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: buildCSP(),
  },
];
```

### Content Security Policy (CSP) Strategy

A well-configured CSP is your strongest defense against XSS:

```typescript
function buildCSP(): string {
  const directives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://va.vercel-scripts.com'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'img-src': ["'self'", 'blob:', 'data:', 'https://your-cdn.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'connect-src': ["'self'", 'https://vitals.vercel-insights.com'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  };

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}
```

## Rate Limiting and API Protection

### Implementing Rate Limiting in Next.js

```typescript
// lib/rate-limiter.ts
import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  interval: number;    // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

const rateLimiters = new Map<string, LRUCache<string, number>>();

export function rateLimit(
  key: string,
  options: RateLimitOptions
): LRUCache<string, number> {
  if (!rateLimiters.has(key)) {
    rateLimiters.set(
      key,
      new LRUCache<string, number>({
        max: 500,
        ttl: options.interval,
      })
    );
  }
  return rateLimiters.get(key)!;
}

export function checkRateLimit(
  limiter: LRUCache<string, number>,
  identifier: string,
  maxRequests: number
): { success: boolean; remaining: number } {
  const currentCount = limiter.get(identifier) || 0;

  if (currentCount >= maxRequests) {
    return { success: false, remaining: 0 };
  }

  limiter.set(identifier, currentCount + 1);
  return { success: true, remaining: maxRequests - currentCount - 1 };
}
```

### Applying Rate Limits to API Routes

```typescript
// app/api/bookings/route.ts
import { rateLimit, checkRateLimit } from '@/lib/rate-limiter';
import { NextRequest, NextResponse } from 'next/server';

const limiter = rateLimit('bookings', {
  interval: 60 * 1000,  // 1 minute
  maxRequests: 10,       // 10 requests per minute
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success, remaining } = checkRateLimit(limiter, ip, 10);

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  // Process the booking request
}
```

## Circuit Breakers for External Dependencies

When your application depends on external services (payment gateways, enrichment APIs, AI models), circuit breakers prevent cascading failures.

### The Circuit Breaker Pattern

```typescript
// lib/circuit-breaker.ts
enum CircuitState {
  CLOSED = 'CLOSED',     // Normal operation
  OPEN = 'OPEN',         // Failing, reject immediately
  HALF_OPEN = 'HALF_OPEN', // Testing if service recovered
}

class CircuitBreaker {
  private state = CircuitState.CLOSED;
  private failureCount = 0;
  private lastFailureTime = 0;

  constructor(
    private readonly threshold: number = 5,
    private readonly resetTimeout: number = 30000,
  ) {}

  async execute<T>(fn: () => Promise<T>, fallback: () => T): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = CircuitState.HALF_OPEN;
      } else {
        return fallback();
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      return fallback();
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    this.state = CircuitState.CLOSED;
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.threshold) {
      this.state = CircuitState.OPEN;
    }
  }
}
```

### Applying to Payment Processing

At Gaari, we use circuit breakers for both Stripe and Bkash payment gateways:

```typescript
const stripeBreaker = new CircuitBreaker(3, 60000); // 3 failures, 60s reset
const bkashBreaker = new CircuitBreaker(3, 60000);

async function processPayment(amount: number, method: 'stripe' | 'bkash') {
  if (method === 'stripe') {
    return stripeBreaker.execute(
      () => stripe.charges.create({ amount }),
      () => ({ status: 'queued', message: 'Payment queued. You will be charged when our payment system recovers.' })
    );
  }
  // Similar for bkash
}
```

## Runtime Validation with Zod

Every input boundary — API routes, form submissions, webhook payloads — must be validated at runtime. TypeScript types disappear at runtime; Zod schemas persist.

```typescript
// lib/validation/booking.ts
import { z } from 'zod';

export const BookingInputSchema = z.object({
  serviceType: z.enum(['car-rental', 'travel-package', 'activity']),
  startDate: z.string().datetime().refine(
    (date) => new Date(date) > new Date(),
    'Start date must be in the future'
  ),
  endDate: z.string().datetime(),
  passengers: z.number()
    .int()
    .min(1, 'At least one passenger required')
    .max(50, 'Maximum 50 passengers'),
  locationId: z.string().uuid('Invalid location ID'),
  notes: z.string()
    .max(500, 'Notes cannot exceed 500 characters')
    .optional(),
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  'End date must be after start date'
);

// Use in API routes, Server Actions, webhook handlers
export type BookingInput = z.infer<typeof BookingInputSchema>;
```

## Row-Level Security at the Database

Application-level authorization is not enough. Row-Level Security (RLS) at the database ensures that even if your application code has a bug, the database itself enforces access rules.

I wrote extensively about this in my [Supabase RLS guide](/blog/supabase-row-level-security-complete-guide). The key principles:

1. **Enable RLS on every table** — No exceptions
2. **Deny by default** — No access without an explicit policy
3. **Use service role only in server-side code** — Never expose the service role key to the client
4. **Test policies with different user roles** — Verify that users can only see and modify their own data

## Key Learnings

1. **Security is a design decision, not a feature** — Build it in from the start, not as a patch after an incident
2. **Defense in depth** — Multiple layers (CSP, rate limiting, validation, RLS) catch what individual layers miss
3. **Circuit breakers prevent cascading failures** — External dependencies will fail. Plan for it
4. **Validate at every boundary** — API routes, webhooks, form submissions, and inter-service calls all need runtime validation
5. **Database-level security is essential** — RLS ensures data integrity even when application code has bugs
6. **Monitor for new threats** — The threat landscape evolves. Regular security reviews and dependency audits are ongoing responsibilities

Building resilient applications is not about preventing every possible failure. It is about ensuring that when failures happen — and they will — your system degrades gracefully, recovers quickly, and never compromises user data. That is the standard every production application should meet.
