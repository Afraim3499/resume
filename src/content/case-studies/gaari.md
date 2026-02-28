---
slug: "gaari"
projectSlug: "gaari" 
title: "Gaari: Architecting Bangladesh's First Multi-Service Travel Platform"
problem: |
  Building Bangladesh's first comprehensive car rental and travel platform required solving multiple complex challenges simultaneously. The platform needed to handle three distinct service types (Car Rental, Travel Packages, Activities) with different booking parameters, pricing models, and availability constraints. 
  
  The core challenge was creating a unified booking system that could manage real-time availability across hundreds of vehicles and services while preventing double bookings during high-traffic periods. Additionally, the system needed to support dynamic pricing algorithms that adjust based on demand, duration, and seasonality—all while maintaining sub-second response times for search queries.
  
  Payment integration presented another layer of complexity, requiring seamless integration with both Stripe (international) and Bkash (local) payment gateways, each with different webhook structures and security requirements. The geographic services component needed to support 500+ landmarks and provide route optimization for travel planning.
solution: |
  I architected a unified booking engine using Next.js 14's App Router with Server Components for optimal performance. The solution involved three core layers:
  
  **State Management Layer**: Created a centralized booking state manager using React Context API and custom hooks that handles multi-step booking flows, cross-service availability checks, and real-time price calculations.
  
  **Real-Time Availability Layer**: Implemented Supabase Realtime subscriptions with PostgreSQL triggers to maintain live availability counts. The system uses optimistic UI updates with backend confirmation to handle race conditions when multiple users book simultaneously.
  
  **Dynamic Pricing Engine**: Built a server-side pricing calculator that considers base rates, duration multipliers, seasonal demand factors, promotional discounts, and last-minute booking premiums. All calculations are cached in Redis for performance.
  
  For payment integration, I created a unified abstraction layer that handles both Stripe and Bkash webhooks with idempotency checks to prevent duplicate charges. The geographic services component uses geocoding APIs with route optimization algorithms.
results:
  impact: |
    Successfully launched Gaari with a production-ready booking system that handles multiple service types seamlessly. The platform now processes bookings efficiently with real-time availability management and supports dynamic pricing that adapts to market conditions. The unified payment system processes transactions through both international and local gateways without friction.
  metrics:
    - label: "Components"
      value: "80+"
    - label: "API Endpoints"
      value: "110+"
    - label: "Database Tables"
      value: "20+"
    - label: "Lighthouse Score"
      value: "98/100"
    - label: "Load Time"
      value: "0.4s"
  improvements:
    - "Achieved 98/100 Lighthouse performance score through strategic optimization"
    - "Built scalable architecture supporting concurrent bookings without conflicts"
    - "Implemented real-time availability management with Supabase Realtime"
    - "Created unified payment abstraction supporting multiple gateways"
    - "Optimized search queries to sub-second response times"
lessonsLearned:
  - "Complex booking flows benefit significantly from centralized state management"
  - "Supabase Realtime makes live updates seamless but requires careful conflict resolution"
  - "Abstracting payment logic allows easy addition of new payment gateways"
  - "Performance optimization from the start prevents technical debt accumulation"
  - "Multi-step flows with clear progress indicators significantly reduce abandonment rates"
  - "Redis caching is essential for dynamic pricing calculations at scale"
  - "Geographic services require careful API rate limit management"
technologies: ["Next.js 14", "TypeScript", "Supabase", "Redis", "Stripe", "Bkash", "Cloudinary", "PostgreSQL"]

timeline: "2023 - Present"
challenges:
  - "Complex booking system with multiple service types (Car Rental, Travel Packages, Activities)"
  - "Advanced search functionality with multiple filters (location, date, time, car type)"
  - "Dynamic pricing algorithms based on demand and duration"
  - "Real-time availability management across multiple services"
  - "Payment gateway integration (Stripe & Bkash) with webhook handling"
  - "Geographic services with 500+ landmarks and route optimization"
  - "Building intuitive UI for complex booking flows"
beforeAfter:
  before: "No unified platform existed for car rentals or travel in Bangladesh. Manual bookings via phone/WhatsApp, zero availability visibility, zero pricing consistency."
  after: "A 98/100 Lighthouse platform processing bookings in real-time across three service verticals with dynamic pricing and dual-gateway payments."
---

## The Founding Problem

Bangladesh had no unified digital platform for car rentals or travel booking. The entire industry ran on phone calls, WhatsApp messages, and physical offices — a completely offline workflow with zero inventory visibility and wildly inconsistent pricing. Gaari was built to fix this from the ground up.

The technical challenge was not building a *booking form*. It was building three distinct booking engines — for Car Rentals, Travel Packages, and Activity bookings — each with fundamentally different parameters, pricing models, and availability windows, all unified behind a single coherent interface.

## Architecture Decisions That Mattered

### The Availability Layer

Double bookings are a death sentence for a rental platform. Every booking must be an atomic operation — claim the inventory, confirm the user, charge the card, and mark the slot unavailable with zero race conditions. We solved this with **Supabase Realtime + PostgreSQL triggers**: when a booking is initiated, a trigger fires immediately to lock the resource row, and the frontend subscribes to the state change. Optimistic UI updates give the user instant feedback; the database is the source of truth.

### The Pricing Engine

Dynamic pricing was the core competitive differentiator. We built a server-side pricing calculator that evaluates:
- **Base rate** from the database
- **Duration multipliers** (hourly, daily, weekly)
- **Demand-based surge factors**
- **Seasonal adjustments** (Eid, summer holiday peaks)
- **Last-minute premiums**

All calculations are cached in **Redis** with short TTLs to ensure freshness without hammering the database on every search query.

### Dual Payment Gateway Integration

Integrating both **Stripe** (international cards) and **Bkash** (Bangladesh mobile payments) required building a unified abstraction layer. Each gateway has different webhook shapes, authentication flows, and failure modes. We implemented idempotency keys on every webhook handler to prevent duplicate charges — a critical safety mechanism when money is involved.

## The 98/100 Lighthouse Score

Performance was non-negotiable for a market where many users are on mid-range Android devices and 4G networks. We achieved 98/100 through:
- **Next.js Server Components** for zero-JavaScript on the critical path
- **Cloudinary image optimization** with automatic WebP conversion
- **Route-based code splitting** so booking pages only load what they need
- **Connection pooling** via Supabase's built-in PgBouncer to handle concurrent bookings during peak periods

## What Gaari Proved

The platform demonstrated that even in a market with no existing digital infrastructure, a well-engineered product can leapfrog the status quo entirely. The key insight: **solve the coordination problem first, let the revenue follow**.
