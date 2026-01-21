---
title: "Building Gaari's Multi-Service Booking System"
excerpt: "A technical deep dive into how I built a scalable booking engine supporting car rentals, travel packages, and activities with real-time availability management, dynamic pricing, and seamless payment integration."
date: "2025-11-15"
category: "Web Development"
tags: ["Next.js", "TypeScript", "E-commerce", "Supabase", "Payment Integration"]
featured: true
readingTime: 8
author: "Rizwanul Islam"
---# Building Gaari's Multi-Service Booking System

When I set out to build Gaari, Bangladesh's premium car rental and travel platform, I knew the booking system would be the heart of the entire platform. The challenge wasn't just building a booking system—it was creating a unified engine that could handle multiple service types (Car Rental, Travel Packages, Activities) while maintaining real-time availability, dynamic pricing, and seamless user experience.

## The Architecture Challenge

The core challenge was designing a system that could:
- Handle multiple service types with different booking parameters
- Manage real-time availability across hundreds of vehicles and services
- Implement dynamic pricing based on demand, duration, and seasonality
- Process payments through multiple gateways (Stripe & Bkash)
- Scale to handle concurrent bookings without conflicts

## The Solution: Unified Booking Engine

I architected a unified booking engine using Next.js 14's App Router with Server Components for optimal performance. The system is built on three core layers:

### 1. State Management Layer

Using React Context API combined with custom hooks, I created a booking state manager that handles:
- Multi-step booking flow (Search → Selection → Details → Payment)
- Cross-service availability checks
- Price calculations in real-time
- Form validation and error handling

```typescript
// Simplified booking state structure
interface BookingState {
  serviceType: 'car-rental' | 'travel-package' | 'activity';
  searchParams: SearchParams;
  selectedItem: ServiceItem | null;
  bookingDetails: BookingDetails;
  pricing: PricingBreakdown;
}
```

### 2. Real-Time Availability Layer

Using Supabase Realtime subscriptions, the system maintains live availability:

- **Database Triggers**: PostgreSQL triggers update availability counts instantly
- **Realtime Subscriptions**: Frontend subscribes to availability changes
- **Optimistic Updates**: UI updates immediately while confirming with backend
- **Conflict Resolution**: Handles race conditions when multiple users book simultaneously

### 3. Dynamic Pricing Engine

The pricing engine calculates costs based on:
- Base rates stored in database
- Duration multipliers (hourly, daily, weekly)
- Seasonal demand factors
- Promotional discounts
- Last-minute booking premiums

All pricing calculations happen server-side to prevent manipulation, with results cached in Redis for performance.

## Payment Integration: Stripe & Bkash

Integrating two payment gateways required careful webhook handling:

1. **Unified Payment Interface**: Created abstraction layer for both gateways
2. **Webhook Processing**: Separate endpoints for Stripe and Bkash webhooks
3. **Idempotency**: Ensured webhook handlers are idempotent to prevent duplicate charges
4. **Status Synchronization**: Real-time status updates after payment confirmation

## Performance Optimizations

- **Redis Caching**: Cached availability data and pricing calculations
- **Database Indexing**: Strategic indexes on search parameters (location, date, service type)
- **Image Optimization**: Cloudinary integration for responsive images
- **Code Splitting**: Lazy-loaded booking components
- **Server Components**: Leveraged Next.js Server Components for zero-client JavaScript

## Results

The booking system now handles:
- **80+ components** working in harmony
- **110+ API endpoints** for various booking operations
- **20 database tables** with optimized relationships
- **98/100 Lighthouse score** for performance
- **0.4s load time** for booking pages

## Key Learnings

1. **State Management**: Complex booking flows benefit from centralized state management
2. **Real-Time Systems**: Supabase Realtime made live updates seamless
3. **Payment Gateways**: Abstracting payment logic allows easy addition of new gateways
4. **Performance First**: Optimizing from the start prevents technical debt
5. **User Experience**: Multi-step flows with clear progress indicators reduce abandonment

Building Gaari's booking system taught me that the best technical solutions are those that feel invisible to users—complexity hidden behind simplicity.