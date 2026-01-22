---
title: "How to Build a Complete Booking System with Next.js 15 (2026 Guide)"
excerpt: "A step-by-step tutorial on building a production-ready booking system using Next.js 15, TypeScript, Supabase, and Stripe. Learn database design, real-time availability, payment integration, and deployment."
date: "2026-12-28"
category: "Web Development"
tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tutorial", "Booking System"]
featured: true
readingTime: 15
author: "Rizwanul Islam"
---# How to Build a Complete Booking System with Next.js 15 (2026 Guide)

Building a booking system is one of the most common yet challenging projects for developers. Whether you're creating a car rental platform, hotel reservation system, or appointment scheduler, the core concepts remain the same.

In this comprehensive guide, I'll walk you through building a production-ready booking system from scratch using **Next.js 14**, **TypeScript**, **Supabase**, and **Stripe**. This tutorial is based on my experience building [Gaari](https://www.rizwanulafraim.com/projects/gaari), a car rental platform with 80+ components and 110+ API endpoints.

## What You'll Learn

- Setting up a Next.js 14 project with TypeScript
- Designing a scalable database schema for bookings
- Implementing real-time availability checking
- Building a multi-step booking flow
- Integrating Stripe for payments
- Handling race conditions in concurrent bookings
- Deploying to production

## Prerequisites

Before starting, you should have:
- Node.js 18+ installed
- Basic knowledge of React and TypeScript
- A Supabase account (free tier works)
- A Stripe account (test mode)

## Project Setup

Let's start by creating a new Next.js 14 project:

```bash
npx create-next-app@latest booking-system --typescript --tailwind --eslint --app
cd booking-system
```

Install the required dependencies:

```bash
npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js date-fns zod react-hook-form
```

### Project Structure

Organize your project like this:

```
src/
├── app/
│   ├── (booking)/
│   │   ├── search/page.tsx
│   │   ├── select/page.tsx
│   │   ├── details/page.tsx
│   │   └── payment/page.tsx
│   ├── api/
│   │   ├── bookings/route.ts
│   │   ├── availability/route.ts
│   │   └── webhooks/stripe/route.ts
│   └── layout.tsx
├── components/
│   ├── booking/
│   │   ├── SearchForm.tsx
│   │   ├── SelectionGrid.tsx
│   │   ├── BookingDetails.tsx
│   │   └── PaymentForm.tsx
│   └── ui/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── stripe.ts
│   └── utils.ts
├── hooks/
│   └── useBooking.ts
└── types/
    └── booking.ts
```

## Database Schema Design

A well-designed schema is crucial for a booking system. Here's the schema we'll use:

```sql
-- Items that can be booked (cars, rooms, services, etc.)
CREATE TABLE bookable_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price_per_day DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Availability slots for each item
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES bookable_items(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT true,
  price_override DECIMAL(10, 2), -- For dynamic pricing
  UNIQUE(item_id, date)
);

-- Booking records
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES bookable_items(id),
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  payment_intent_id TEXT,
  payment_status TEXT DEFAULT 'unpaid', -- unpaid, paid, refunded
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_availability_date ON availability(date);
CREATE INDEX idx_availability_item ON availability(item_id, date);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_bookings_status ON bookings(status);
```

### Why This Schema Works

1. **Separation of Concerns**: Items, availability, and bookings are separate tables
2. **Flexible Pricing**: `price_override` allows dynamic pricing per date
3. **Scalable**: Indexes on frequently queried columns
4. **Date-based Availability**: Each date has its own availability record

## Setting Up Supabase

Create a Supabase client for both server and client components:

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

## Building the Search Component

The search form is the entry point for users:

```typescript
// components/booking/SearchForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

interface SearchFormProps {
  categories: string[]
}

export function SearchForm({ categories }: SearchFormProps) {
  const router = useRouter()
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const params = new URLSearchParams({
      category,
      start: startDate,
      end: endDate,
    })

    router.push(`/select?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={format(new Date(), 'yyyy-MM-dd')}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || format(new Date(), 'yyyy-MM-dd')}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white p-4 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search Available Items'}
      </button>
    </form>
  )
}
```

## Implementing Real-Time Availability

This is the most critical part of any booking system. We need to check availability efficiently:

```typescript
// app/api/availability/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { eachDayOfInterval, parseISO } from 'date-fns'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const startDate = searchParams.get('start')
  const endDate = searchParams.get('end')

  if (!category || !startDate || !endDate) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  // Get all items in the category
  const { data: items, error: itemsError } = await supabase
    .from('bookable_items')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }

  // Generate array of dates to check
  const dates = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  })

  // Check availability for each item
  const availableItems = await Promise.all(
    items.map(async (item) => {
      // Check if all dates are available
      const { data: availability } = await supabase
        .from('availability')
        .select('date, is_available, price_override')
        .eq('item_id', item.id)
        .gte('date', startDate)
        .lte('date', endDate)

      // Check for existing bookings
      const { data: existingBookings } = await supabase
        .from('bookings')
        .select('start_date, end_date')
        .eq('item_id', item.id)
        .neq('status', 'cancelled')
        .or(`start_date.lte.${endDate},end_date.gte.${startDate}`)

      // Check if there's any overlap with existing bookings
      const hasConflict = existingBookings?.some((booking) => {
        const bookingStart = new Date(booking.start_date)
        const bookingEnd = new Date(booking.end_date)
        const searchStart = parseISO(startDate)
        const searchEnd = parseISO(endDate)

        return bookingStart <= searchEnd && bookingEnd >= searchStart
      })

      if (hasConflict) {
        return { ...item, available: false }
      }

      // Calculate total price
      const days = dates.length
      let totalPrice = item.price_per_day * days

      // Apply any price overrides
      availability?.forEach((avail) => {
        if (avail.price_override) {
          totalPrice += avail.price_override - item.price_per_day
        }
      })

      return {
        ...item,
        available: true,
        totalPrice,
        days,
      }
    })
  )

  return NextResponse.json({
    items: availableItems.filter((item) => item.available),
    searchParams: { category, startDate, endDate },
  })
}
```

## Multi-Step Booking Flow

Create a booking context to manage state across steps:

```typescript
// hooks/useBooking.ts
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface BookingItem {
  id: string
  name: string
  totalPrice: number
  days: number
}

interface BookingDetails {
  name: string
  email: string
  phone: string
}

interface BookingState {
  item: BookingItem | null
  startDate: string
  endDate: string
  details: BookingDetails | null
}

interface BookingContextType {
  state: BookingState
  setItem: (item: BookingItem) => void
  setDates: (start: string, end: string) => void
  setDetails: (details: BookingDetails) => void
  reset: () => void
}

const initialState: BookingState = {
  item: null,
  startDate: '',
  endDate: '',
  details: null,
}

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState)

  const setItem = (item: BookingItem) => {
    setState((prev) => ({ ...prev, item }))
  }

  const setDates = (startDate: string, endDate: string) => {
    setState((prev) => ({ ...prev, startDate, endDate }))
  }

  const setDetails = (details: BookingDetails) => {
    setState((prev) => ({ ...prev, details }))
  }

  const reset = () => {
    setState(initialState)
  }

  return (
    <BookingContext.Provider value={{ state, setItem, setDates, setDetails, reset }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
```

## Stripe Payment Integration

Set up Stripe for secure payment processing:

```typescript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})
```

```typescript
// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { itemId, startDate, endDate, userDetails, totalPrice } = body

  const supabase = await createClient()

  try {
    // Double-check availability (prevent race conditions)
    const { data: existingBookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('item_id', itemId)
      .neq('status', 'cancelled')
      .or(`start_date.lte.${endDate},end_date.gte.${startDate}`)

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Item is no longer available for these dates' },
        { status: 409 }
      )
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), // Stripe uses cents
      currency: 'usd',
      metadata: {
        itemId,
        startDate,
        endDate,
        userEmail: userDetails.email,
      },
    })

    // Create pending booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        item_id: itemId,
        user_email: userDetails.email,
        user_name: userDetails.name,
        user_phone: userDetails.phone,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        status: 'pending',
        payment_intent_id: paymentIntent.id,
        payment_status: 'unpaid',
      })
      .select()
      .single()

    if (bookingError) {
      throw bookingError
    }

    return NextResponse.json({
      bookingId: booking.id,
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
```

## Handling Stripe Webhooks

Webhooks confirm payment and update booking status:

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      
      // Update booking status
      await supabaseAdmin
        .from('bookings')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          updated_at: new Date().toISOString(),
        })
        .eq('payment_intent_id', paymentIntent.id)

      // TODO: Send confirmation email
      break

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object
      
      await supabaseAdmin
        .from('bookings')
        .update({
          status: 'cancelled',
          payment_status: 'failed',
          updated_at: new Date().toISOString(),
        })
        .eq('payment_intent_id', failedPayment.id)
      break
  }

  return NextResponse.json({ received: true })
}
```

## Preventing Race Conditions

When multiple users try to book the same item simultaneously, you need to handle race conditions:

```typescript
// Using PostgreSQL transaction with row locking
const { data, error } = await supabase.rpc('create_booking_with_lock', {
  p_item_id: itemId,
  p_start_date: startDate,
  p_end_date: endDate,
  p_user_email: userDetails.email,
  p_user_name: userDetails.name,
  p_total_price: totalPrice,
})

// PostgreSQL function
/*
CREATE OR REPLACE FUNCTION create_booking_with_lock(
  p_item_id UUID,
  p_start_date DATE,
  p_end_date DATE,
  p_user_email TEXT,
  p_user_name TEXT,
  p_total_price DECIMAL
)
RETURNS UUID AS $$
DECLARE
  v_booking_id UUID;
  v_conflict_count INTEGER;
BEGIN
  -- Lock the item row
  PERFORM * FROM bookable_items WHERE id = p_item_id FOR UPDATE;
  
  -- Check for conflicts
  SELECT COUNT(*) INTO v_conflict_count
  FROM bookings
  WHERE item_id = p_item_id
    AND status != 'cancelled'
    AND (start_date <= p_end_date AND end_date >= p_start_date);
  
  IF v_conflict_count > 0 THEN
    RAISE EXCEPTION 'Booking conflict detected';
  END IF;
  
  -- Create the booking
  INSERT INTO bookings (item_id, user_email, user_name, start_date, end_date, total_price)
  VALUES (p_item_id, p_user_email, p_user_name, p_start_date, p_end_date, p_total_price)
  RETURNING id INTO v_booking_id;
  
  RETURN v_booking_id;
END;
$$ LANGUAGE plpgsql;
*/
```

## Deployment

Deploy your booking system to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
```

Don't forget to:
1. Set up Stripe webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
2. Configure production database in Supabase
3. Enable Row Level Security policies

## Conclusion

You've now built a complete booking system with:

✅ **Database Design** - Scalable schema for bookings and availability  
✅ **Real-Time Availability** - Efficient conflict checking  
✅ **Multi-Step Flow** - State management across booking steps  
✅ **Stripe Integration** - Secure payment processing  
✅ **Race Condition Handling** - Database-level locking  
✅ **Production Ready** - Deployed to Vercel  

### Next Steps

- Add email notifications with Resend or SendGrid
- Implement refund logic
- Add admin dashboard for managing bookings
- Integrate calendar sync (Google Calendar, iCal)
- Add reviews and ratings

### Related Projects

- [Gaari](https://www.rizwanulafraim.com/projects/gaari) - My car rental platform built with these concepts
- [View the Gaari Case Study](https://www.rizwanulafraim.com/blog/building-gaari-booking-system)

---

*Have questions about building booking systems? Connect with me on [LinkedIn](https://www.linkedin.com/in/rizwanul-islam-afraim99/) or [Twitter](https://x.com/rizwanul_afraim).*