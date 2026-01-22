---
title: "Building an AI Chatbot with Next.js and OpenAI"
excerpt: "Learn how I built Gaariwala, an AI-powered customer support chatbot that handles thousands of queries. A practical guide with code examples, streaming responses, and production optimization."
date: "2026-01-08"
updatedAt: "2026-01-15"
category: "AI/ML"
tags: ["AI", "ChatBot", "Next.js", "OpenAI", "Tutorial", "Machine Learning"]
featured: true
readingTime: 12
author: "Rizwanul Islam"
---## The 3 AM Problem


It was 3 AM when I received the notification: another customer had abandoned their booking on Gaari.

The pattern was becoming frustratingly familiar. Users would browse our car rental platform, find a vehicle they liked, and then... stop. Our analytics showed they were getting stuck at the same points—questions about insurance, pickup locations, driver requirements.

The solution seemed obvious: hire more customer support. But at a startup, scaling humans is expensive. What I needed was something that could answer questions instantly, 24/7, and actually understand context.

That's when I decided to build **Gaariwala**—an AI chatbot that now handles over 80% of our customer queries without human intervention.

In this guide, I'll show you exactly how I built it, including the mistakes I made along the way and the optimizations that made it production-ready.

## What We're Building

By the end of this tutorial, you'll have:
- A conversational AI chatbot with streaming responses
- Context-aware conversations (it remembers what you talked about)
- Integration with your business data
- Production-ready error handling
- Rate limiting and cost optimization

## Prerequisites

- Node.js 18+
- Next.js 15 project
- OpenAI API key

## Part 1: The Foundation

### Project Setup

```bash
npx create-next-app@latest ai-chatbot --typescript --tailwind --app
cd ai-chatbot
npm install openai ai
```

### Environment Variables

```bash
# .env.local
OPENAI_API_KEY=sk-your-key-here
```

### The Chat API Route

Here's where the magic happens. We'll use the Vercel AI SDK for streaming:

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: `You are Gaariwala, a helpful assistant for Gaari car rental platform.
    
Your personality:
- Friendly and professional
- Concise but thorough
- You use occasional car/driving puns
- You always try to help customers find the right vehicle

Key information:
- Gaari offers car rentals, travel packages, and activities
- Pickup locations: Dhaka, Chittagong, Sylhet
- Fleet includes: sedans, SUVs, luxury cars, microbuses
- Bookings can be made online or via phone
- Payment: Stripe and bKash accepted`,
    messages,
  })

  return result.toDataStreamResponse()
}
```

### The Chat Interface

```typescript
// app/page.tsx
'use client'

import { useChat } from 'ai/react'
import { Send, Bot, User } from 'lucide-react'

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center gap-3">
        <Bot className="w-8 h-8" />
        <div>
          <h1 className="font-bold">Gaariwala</h1>
          <p className="text-sm opacity-80">Your AI Booking Assistant</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Hi! I'm Gaariwala 🚗</p>
            <p className="text-sm">Ask me anything about car rentals!</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}

            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about car rentals..."
            className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-primary text-white rounded-full disabled:opacity-50 hover:bg-primary/90"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
```

## Part 2: Making It Smart

The basic chatbot works, but it doesn't know anything about your actual business data. Let's fix that.

### Adding Business Context with RAG

When a user asks "What SUVs do you have?", the chatbot should query your actual inventory:

```typescript
// lib/rag.ts
import { createClient } from '@/lib/supabase/server'

export async function getRelevantContext(query: string): Promise<string> {
  const supabase = await createClient()
  
  // Simple keyword matching (for production, use embeddings)
  const keywords = query.toLowerCase().split(' ')
  
  let context = ''

  // Check for vehicle queries
  if (keywords.some(k => ['car', 'suv', 'sedan', 'vehicle', 'rent'].includes(k))) {
    const { data: vehicles } = await supabase
      .from('vehicles')
      .select('name, category, price_per_day, features')
      .eq('is_available', true)
      .limit(5)

    if (vehicles?.length) {
      context += '\n\nAvailable Vehicles:\n'
      vehicles.forEach(v => {
        context += `- ${v.name} (${v.category}): $${v.price_per_day}/day. Features: ${v.features.join(', ')}\n`
      })
    }
  }

  // Check for location queries
  if (keywords.some(k => ['location', 'pickup', 'where', 'office'].includes(k))) {
    const { data: locations } = await supabase
      .from('locations')
      .select('city, address, hours')
    
    if (locations?.length) {
      context += '\n\nPickup Locations:\n'
      locations.forEach(l => {
        context += `- ${l.city}: ${l.address} (Hours: ${l.hours})\n`
      })
    }
  }

  return context
}
```

### Updated API Route with RAG

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { getRelevantContext } from '@/lib/rag'

export const runtime = 'edge'

export async function POST(request: Request) {
  const { messages } = await request.json()
  
  // Get the latest user message
  const lastMessage = messages[messages.length - 1]
  
  // Fetch relevant business data
  const context = await getRelevantContext(lastMessage.content)

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: `You are Gaariwala, a helpful assistant for Gaari car rental platform.

${context ? `Here is current information from our system:${context}` : ''}

Guidelines:
- Be helpful and conversational
- If you have specific data, use it
- If you don't know something, say so
- Always guide users toward making a booking`,
    messages,
  })

  return result.toDataStreamResponse()
}
```

## Part 3: Production Optimization

### Rate Limiting

Protect your API from abuse:

```typescript
// lib/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
})
```

```typescript
// app/api/chat/route.ts
import { ratelimit } from '@/lib/ratelimit'

export async function POST(request: Request) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }

  // ... rest of the code
}
```

### Cost Optimization

GPT-4 is expensive. Here's how I reduced costs by 70%:

```typescript
// Use GPT-3.5 for simple queries, GPT-4 for complex ones
function selectModel(messages: Message[]): string {
  const lastMessage = messages[messages.length - 1].content.toLowerCase()
  
  // Simple queries use cheaper model
  const simplePatterns = [
    'hello', 'hi', 'thanks', 'bye', 'hours', 'location', 'price'
  ]
  
  const isSimple = simplePatterns.some(p => lastMessage.includes(p))
  
  return isSimple ? 'gpt-3.5-turbo' : 'gpt-4-turbo'
}
```

### Conversation Memory with Redis

For multi-turn conversations:

```typescript
// lib/memory.ts
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()
const TTL = 60 * 60 // 1 hour

export async function getConversation(sessionId: string) {
  const messages = await redis.get(`chat:${sessionId}`)
  return messages ? JSON.parse(messages as string) : []
}

export async function saveConversation(sessionId: string, messages: any[]) {
  // Keep only last 10 messages to save tokens
  const trimmed = messages.slice(-10)
  await redis.set(`chat:${sessionId}`, JSON.stringify(trimmed), { ex: TTL })
}
```

## Part 4: Error Handling

Real-world chatbots face many failure modes:

```typescript
// app/api/chat/route.ts
export async function POST(request: Request) {
  try {
    const { messages, sessionId } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 })
    }

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      messages,
      maxTokens: 500, // Prevent runaway responses
      temperature: 0.7, // Balance creativity and consistency
    })

    return result.toDataStreamResponse()
    
  } catch (error) {
    console.error('Chat error:', error)
    
    if (error.code === 'rate_limit_exceeded') {
      return new Response('AI service is busy. Please try again.', { status: 503 })
    }
    
    if (error.code === 'context_length_exceeded') {
      return new Response('Conversation too long. Please start a new chat.', { status: 400 })
    }
    
    return new Response('Something went wrong. Please try again.', { status: 500 })
  }
}
```

## The Results

After deploying Gaariwala on Gaari:

- **80% reduction** in support tickets
- **3x faster** response time (instant vs 10+ minutes)
- **24/7 availability** without additional staff
- **30% increase** in completed bookings

## What I Learned

1. **Start simple**: Basic streaming chat → add RAG → add memory
2. **Context is everything**: The system prompt defines your chatbot's personality
3. **Cost matters**: GPT-4 for everything will bankrupt you
4. **Test extensively**: Users will ask things you never imagined
5. **Fallback to humans**: Always have an escalation path

## Conclusion

Building an AI chatbot in 2026 is remarkably accessible. With Next.js, the Vercel AI SDK, and OpenAI, you can have a production-ready assistant in a day.

The key is not just building the chat interface—it's connecting it to your real business data and optimizing for cost and reliability.

### Resources

- [Gaari](https://www.rizwanulafraim.com/projects/gaari) - See Gaariwala in action
- [Vercel AI SDK](https://sdk.vercel.ai)
- [OpenAI API Reference](https://platform.openai.com/docs)

---

*Building an AI chatbot for your business? Let's connect on [LinkedIn](https://www.linkedin.com/in/rizwanul-islam-afraim99/) or [Twitter](https://x.com/rizwanul_afraim).*