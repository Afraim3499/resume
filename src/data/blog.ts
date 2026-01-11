import type { BlogPost } from "@/lib/blog";

// Blog posts data structure
export const blogPosts: BlogPost[] = [
  {
    slug: "building-ai-chatbot-nextjs-openai",
    title: "Building an AI Chatbot with Next.js and OpenAI: From Zero to Production",
    excerpt: "Learn how I built Gaariwala, an AI-powered customer support chatbot that handles thousands of queries. A practical guide with code examples, streaming responses, and production optimization.",
    content: `# Building an AI Chatbot with Next.js and OpenAI: From Zero to Production

## The 3 AM Problem

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

\`\`\`bash
npx create-next-app@latest ai-chatbot --typescript --tailwind --app
cd ai-chatbot
npm install openai ai
\`\`\`

### Environment Variables

\`\`\`bash
# .env.local
OPENAI_API_KEY=sk-your-key-here
\`\`\`

### The Chat API Route

Here's where the magic happens. We'll use the Vercel AI SDK for streaming:

\`\`\`typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'edge'

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: \`You are Gaariwala, a helpful assistant for Gaari car rental platform.
    
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
- Payment: Stripe and bKash accepted\`,
    messages,
  })

  return result.toDataStreamResponse()
}
\`\`\`

### The Chat Interface

\`\`\`typescript
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
            className={\`flex gap-3 \${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }\`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}

            <div
              className={\`max-w-[80%] p-3 rounded-2xl \${
                message.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 rounded-bl-none'
              }\`}
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
\`\`\`

## Part 2: Making It Smart

The basic chatbot works, but it doesn't know anything about your actual business data. Let's fix that.

### Adding Business Context with RAG

When a user asks "What SUVs do you have?", the chatbot should query your actual inventory:

\`\`\`typescript
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
      context += '\\n\\nAvailable Vehicles:\\n'
      vehicles.forEach(v => {
        context += \`- \${v.name} (\${v.category}): $\${v.price_per_day}/day. Features: \${v.features.join(', ')}\\n\`
      })
    }
  }

  // Check for location queries
  if (keywords.some(k => ['location', 'pickup', 'where', 'office'].includes(k))) {
    const { data: locations } = await supabase
      .from('locations')
      .select('city, address, hours')
    
    if (locations?.length) {
      context += '\\n\\nPickup Locations:\\n'
      locations.forEach(l => {
        context += \`- \${l.city}: \${l.address} (Hours: \${l.hours})\\n\`
      })
    }
  }

  return context
}
\`\`\`

### Updated API Route with RAG

\`\`\`typescript
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
    system: \`You are Gaariwala, a helpful assistant for Gaari car rental platform.

\${context ? \`Here is current information from our system:\${context}\` : ''}

Guidelines:
- Be helpful and conversational
- If you have specific data, use it
- If you don't know something, say so
- Always guide users toward making a booking\`,
    messages,
  })

  return result.toDataStreamResponse()
}
\`\`\`

## Part 3: Production Optimization

### Rate Limiting

Protect your API from abuse:

\`\`\`typescript
// lib/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
})
\`\`\`

\`\`\`typescript
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
\`\`\`

### Cost Optimization

GPT-4 is expensive. Here's how I reduced costs by 70%:

\`\`\`typescript
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
\`\`\`

### Conversation Memory with Redis

For multi-turn conversations:

\`\`\`typescript
// lib/memory.ts
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()
const TTL = 60 * 60 // 1 hour

export async function getConversation(sessionId: string) {
  const messages = await redis.get(\`chat:\${sessionId}\`)
  return messages ? JSON.parse(messages as string) : []
}

export async function saveConversation(sessionId: string, messages: any[]) {
  // Keep only last 10 messages to save tokens
  const trimmed = messages.slice(-10)
  await redis.set(\`chat:\${sessionId}\`, JSON.stringify(trimmed), { ex: TTL })
}
\`\`\`

## Part 4: Error Handling

Real-world chatbots face many failure modes:

\`\`\`typescript
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
\`\`\`

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

- [Gaari](https://portfolio-rizwanul.vercel.app/projects/gaari) - See Gaariwala in action
- [Vercel AI SDK](https://sdk.vercel.ai)
- [OpenAI API Reference](https://platform.openai.com/docs)

---

*Building an AI chatbot for your business? Let's connect on [LinkedIn](https://www.linkedin.com/in/rizwanul-islam-afraim99/) or [Twitter](https://x.com/rizwanul_afraim).*`,
    date: "2026-01-08",
    category: "AI/ML",
    tags: ["AI", "ChatBot", "Next.js", "OpenAI", "Tutorial", "Machine Learning"],
    readingTime: 12,
    views: 0,
    featured: true,
    author: {
      name: "Rizwanul Islam",
    },
  },
  {
    slug: "supabase-row-level-security-complete-guide",
    title: "Supabase Row Level Security (RLS) - Complete Guide for 2026",
    excerpt: "Master Supabase Row Level Security with this comprehensive guide. Learn how to implement secure, scalable authorization policies for your Next.js applications with practical examples.",
    content: `# Supabase Row Level Security (RLS) - Complete Guide for 2026

Row Level Security (RLS) is one of Supabase's most powerful features, yet it's often misunderstood or underutilized. In this comprehensive guide, I'll show you how to implement bulletproof security policies that protect your data at the database level.

This tutorial is based on my experience building [The Trail](https://portfolio-rizwanul.vercel.app/projects/the-trail) (a news platform with 30+ database tables) and [Gaari](https://portfolio-rizwanul.vercel.app/projects/gaari) (a booking platform), where RLS was critical for multi-user security.

## What You'll Learn

- Understanding Row Level Security fundamentals
- Writing secure RLS policies
- Common policy patterns (ownership, roles, public/private)
- Multi-tenant application security
- Performance optimization
- Testing and debugging RLS policies
- Common mistakes to avoid

## Prerequisites

- Basic SQL knowledge
- Familiarity with Supabase
- A Supabase project (free tier works)

## What is Row Level Security?

Row Level Security is a PostgreSQL feature that allows you to control which rows a user can access in a table. Instead of filtering data in your application code, RLS enforces security rules directly in the database.

### Why RLS Matters

\`\`\`javascript
// ❌ Without RLS - Security in application code (DANGEROUS)
const { data } = await supabase
  .from('posts')
  .select('*')
  .eq('user_id', currentUser.id)

// A malicious user could bypass this by modifying the request
\`\`\`

\`\`\`sql
-- ✅ With RLS - Security at database level (SECURE)
-- Even if application code is bypassed, database enforces rules
CREATE POLICY "Users can only see own posts"
ON posts FOR SELECT
USING (auth.uid() = user_id);
\`\`\`

## Getting Started: Enable RLS

First, enable RLS on your table:

\`\`\`sql
-- Create a sample table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- IMPORTANT: Without policies, NO ONE can access the table
-- (except service role)
\`\`\`

> ⚠️ **Warning**: Once RLS is enabled, all access is blocked by default. You MUST create policies to allow access.

## Understanding Policy Structure

Every RLS policy has this structure:

\`\`\`sql
CREATE POLICY "policy_name"
ON table_name
FOR operation -- SELECT, INSERT, UPDATE, DELETE, ALL
TO role -- authenticated, anon, service_role, or specific role
USING (condition) -- For SELECT, UPDATE, DELETE (row visibility)
WITH CHECK (condition); -- For INSERT, UPDATE (row validation)
\`\`\`

### USING vs WITH CHECK

- **USING**: Determines which existing rows are visible/accessible
- **WITH CHECK**: Validates new or updated data

\`\`\`sql
-- Example: Users can only UPDATE their own posts
CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id) -- Can only see their posts
WITH CHECK (auth.uid() = user_id); -- Can only set user_id to themselves
\`\`\`

## Common RLS Patterns

### Pattern 1: Ownership-Based Access

The most common pattern - users can only access their own data:

\`\`\`sql
-- Users can read their own posts
CREATE POLICY "Users read own posts"
ON posts FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can create posts (as themselves)
CREATE POLICY "Users create posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users update own posts"
ON posts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users delete own posts"
ON posts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
\`\`\`

### Pattern 2: Public/Private Content

Some rows are public, others are private:

\`\`\`sql
-- Anyone can read published posts
CREATE POLICY "Public can read published posts"
ON posts FOR SELECT
TO anon, authenticated
USING (is_published = true);

-- Authors can read their own unpublished posts
CREATE POLICY "Authors read own drafts"
ON posts FOR SELECT
TO authenticated
USING (auth.uid() = user_id AND is_published = false);
\`\`\`

### Pattern 3: Role-Based Access Control (RBAC)

Different users have different permissions:

\`\`\`sql
-- First, create a profiles table with roles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'editor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER;

-- Now use roles in policies
CREATE POLICY "Admins can do everything"
ON posts FOR ALL
TO authenticated
USING (get_user_role() = 'admin')
WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "Editors can edit all posts"
ON posts FOR UPDATE
TO authenticated
USING (get_user_role() IN ('editor', 'admin'))
WITH CHECK (get_user_role() IN ('editor', 'admin'));
\`\`\`

### Pattern 4: Multi-Tenant Applications

Organizations with multiple users:

\`\`\`sql
-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization members
CREATE TABLE org_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'admin', 'owner')),
  UNIQUE(org_id, user_id)
);

-- Posts belong to organizations
CREATE TABLE org_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_posts ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if user is member of org
CREATE OR REPLACE FUNCTION is_org_member(org_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM org_members
    WHERE org_members.org_id = $1
    AND org_members.user_id = auth.uid()
  )
$$ LANGUAGE sql SECURITY DEFINER;

-- Members can read org posts
CREATE POLICY "Org members can read posts"
ON org_posts FOR SELECT
TO authenticated
USING (is_org_member(org_id));

-- Members can create posts in their org
CREATE POLICY "Org members can create posts"
ON org_posts FOR INSERT
TO authenticated
WITH CHECK (
  is_org_member(org_id)
  AND auth.uid() = author_id
);
\`\`\`

## Advanced Techniques

### Using JWTs for Custom Claims

You can add custom claims to JWTs for faster policy checks:

\`\`\`sql
-- Access custom claims from JWT
CREATE POLICY "Check JWT claims"
ON posts FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'role' = 'admin'
  OR auth.uid() = user_id
);
\`\`\`

### Subqueries in Policies

For complex relationships:

\`\`\`sql
-- Users can read posts from accounts they follow
CREATE POLICY "Read posts from followed users"
ON posts FOR SELECT
TO authenticated
USING (
  user_id IN (
    SELECT following_id FROM follows
    WHERE follower_id = auth.uid()
  )
  OR user_id = auth.uid()
  OR is_published = true
);
\`\`\`

### Recursive Policies (Hierarchical Data)

For tree structures like folders or comments:

\`\`\`sql
-- Recursive CTE for folder access
CREATE OR REPLACE FUNCTION has_folder_access(folder_id UUID)
RETURNS BOOLEAN AS $$
WITH RECURSIVE folder_tree AS (
  -- Base case: direct access
  SELECT id, parent_id, owner_id
  FROM folders
  WHERE id = folder_id
  
  UNION ALL
  
  -- Recursive case: check parent folders
  SELECT f.id, f.parent_id, f.owner_id
  FROM folders f
  INNER JOIN folder_tree ft ON f.id = ft.parent_id
)
SELECT EXISTS (
  SELECT 1 FROM folder_tree
  WHERE owner_id = auth.uid()
)
$$ LANGUAGE sql SECURITY DEFINER;
\`\`\`

## Performance Optimization

### Index Strategy

RLS policies run on every query. Proper indexing is crucial:

\`\`\`sql
-- Index columns used in RLS policies
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published ON posts(is_published) WHERE is_published = true;
CREATE INDEX idx_org_members_user_org ON org_members(user_id, org_id);
\`\`\`

### Avoid Complex Subqueries

\`\`\`sql
-- ❌ Slow: Subquery in every row check
USING (
  user_id IN (SELECT following_id FROM follows WHERE follower_id = auth.uid())
)

-- ✅ Fast: Use a SECURITY DEFINER function with caching
CREATE OR REPLACE FUNCTION get_following_ids()
RETURNS UUID[] AS $$
  SELECT ARRAY_AGG(following_id)
  FROM follows
  WHERE follower_id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

USING (user_id = ANY(get_following_ids()))
\`\`\`

## Testing RLS Policies

### Method 1: Supabase Dashboard

Use the SQL Editor with role impersonation:

\`\`\`sql
-- Test as a specific user
SET request.jwt.claims = '{"sub": "user-uuid-here"}';
SET ROLE authenticated;

SELECT * FROM posts; -- Should only show allowed rows
\`\`\`

### Method 2: Integration Tests

\`\`\`typescript
// __tests__/rls.test.ts
import { createClient } from '@supabase/supabase-js'

describe('RLS Policies', () => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  test('User can only read own posts', async () => {
    // Sign in as test user
    await supabase.auth.signInWithPassword({
      email: 'testuser@example.com',
      password: 'password123'
    })

    const { data, error } = await supabase.from('posts').select('*')

    expect(error).toBeNull()
    expect(data?.every(post => post.user_id === testUserId)).toBe(true)
  })

  test('User cannot read other users posts', async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', 'other-user-id')

    expect(data).toHaveLength(0)
  })
})
\`\`\`

## Common Mistakes to Avoid

### Mistake 1: Forgetting to Enable RLS

\`\`\`sql
-- ❌ Table created without RLS - ANYONE can access!
CREATE TABLE secrets (
  id UUID PRIMARY KEY,
  data TEXT
);

-- ✅ Always enable RLS immediately
ALTER TABLE secrets ENABLE ROW LEVEL SECURITY;
\`\`\`

### Mistake 2: Overly Permissive Policies

\`\`\`sql
-- ❌ Too permissive - anyone can read everything
CREATE POLICY "Allow all reads"
ON posts FOR SELECT
USING (true);

-- ✅ Be specific about who can access what
CREATE POLICY "Public reads published, authors read own"
ON posts FOR SELECT
USING (is_published = true OR auth.uid() = user_id);
\`\`\`

### Mistake 3: Not Using WITH CHECK for Writes

\`\`\`sql
-- ❌ Missing WITH CHECK - user can set any user_id
CREATE POLICY "Insert posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (true);

-- ✅ Validate that user_id matches authenticated user
CREATE POLICY "Insert posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
\`\`\`

### Mistake 4: Not Handling Service Role

\`\`\`sql
-- Service role bypasses RLS by default
-- If you need to enforce RLS for service role too:

-- Option 1: Create policies for service_role
CREATE POLICY "Service role access"
ON posts FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Option 2: In application, use impersonation
const { data } = await supabase
  .from('posts')
  .select('*')
  .headers({ 'x-supabase-role': 'authenticated' })
\`\`\`

## Real-World Example: News Platform

Here's how I implemented RLS for [The Trail](https://portfolio-rizwanul.vercel.app/projects/the-trail):

\`\`\`sql
-- Articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content JSONB,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Public read published"
ON articles FOR SELECT
TO anon, authenticated
USING (status = 'published' AND published_at <= NOW());

-- Authors can read their own articles (any status)
CREATE POLICY "Authors read own"
ON articles FOR SELECT
TO authenticated
USING (author_id = auth.uid());

-- Authors can create articles
CREATE POLICY "Authors create"
ON articles FOR INSERT
TO authenticated
WITH CHECK (author_id = auth.uid());

-- Authors can update their own drafts
CREATE POLICY "Authors update drafts"
ON articles FOR UPDATE
TO authenticated
USING (author_id = auth.uid() AND status = 'draft')
WITH CHECK (author_id = auth.uid());

-- Editors can update any article
CREATE POLICY "Editors update all"
ON articles FOR UPDATE
TO authenticated
USING (get_user_role() IN ('editor', 'admin'))
WITH CHECK (get_user_role() IN ('editor', 'admin'));
\`\`\`

## Conclusion

Row Level Security is a game-changer for application security. By enforcing rules at the database level, you:

✅ **Prevent data leaks** - Even if application code has bugs  
✅ **Simplify authorization** - Single source of truth  
✅ **Scale securely** - Rules apply to all access paths  
✅ **Sleep better** - Database-level protection  

### Key Takeaways

1. **Always enable RLS** on sensitive tables
2. **Use USING for reads**, WITH CHECK for writes
3. **Create helper functions** for complex logic
4. **Index policy columns** for performance
5. **Test your policies** thoroughly

### Related Resources

- [Gaari Project](https://portfolio-rizwanul.vercel.app/projects/gaari) - Multi-tenant booking system with RLS
- [The Trail Project](https://portfolio-rizwanul.vercel.app/projects/the-trail) - News platform with role-based RLS
- [Supabase Docs](https://supabase.com/docs/guides/auth/row-level-security)

---

*Have questions about implementing RLS? Connect with me on [LinkedIn](https://www.linkedin.com/in/rizwanul-islam-afraim99/) or [Twitter](https://x.com/rizwanul_afraim).*`,
    date: "2024-12-25",
    category: "Database",
    tags: ["Supabase", "PostgreSQL", "Security", "RLS", "Tutorial", "Database"],
    readingTime: 14,
    views: 0,
    featured: true,
    author: {
      name: "Rizwanul Islam",
    },
  },
  {
    slug: "how-to-build-booking-system-nextjs",
    title: "How to Build a Complete Booking System with Next.js 15 (2026 Guide)",
    excerpt: "A step-by-step tutorial on building a production-ready booking system using Next.js 15, TypeScript, Supabase, and Stripe. Learn database design, real-time availability, payment integration, and deployment.",
    content: `# How to Build a Complete Booking System with Next.js 15 (2026 Guide)

Building a booking system is one of the most common yet challenging projects for developers. Whether you're creating a car rental platform, hotel reservation system, or appointment scheduler, the core concepts remain the same.

In this comprehensive guide, I'll walk you through building a production-ready booking system from scratch using **Next.js 14**, **TypeScript**, **Supabase**, and **Stripe**. This tutorial is based on my experience building [Gaari](https://portfolio-rizwanul.vercel.app/projects/gaari), a car rental platform with 80+ components and 110+ API endpoints.

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

\`\`\`bash
npx create-next-app@latest booking-system --typescript --tailwind --eslint --app
cd booking-system
\`\`\`

Install the required dependencies:

\`\`\`bash
npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js date-fns zod react-hook-form
\`\`\`

### Project Structure

Organize your project like this:

\`\`\`
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
\`\`\`

## Database Schema Design

A well-designed schema is crucial for a booking system. Here's the schema we'll use:

\`\`\`sql
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
\`\`\`

### Why This Schema Works

1. **Separation of Concerns**: Items, availability, and bookings are separate tables
2. **Flexible Pricing**: \`price_override\` allows dynamic pricing per date
3. **Scalable**: Indexes on frequently queried columns
4. **Date-based Availability**: Each date has its own availability record

## Setting Up Supabase

Create a Supabase client for both server and client components:

\`\`\`typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
\`\`\`

\`\`\`typescript
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
\`\`\`

## Building the Search Component

The search form is the entry point for users:

\`\`\`typescript
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

    router.push(\`/select?\${params.toString()}\`)
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
\`\`\`

## Implementing Real-Time Availability

This is the most critical part of any booking system. We need to check availability efficiently:

\`\`\`typescript
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
        .or(\`start_date.lte.\${endDate},end_date.gte.\${startDate}\`)

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
\`\`\`

## Multi-Step Booking Flow

Create a booking context to manage state across steps:

\`\`\`typescript
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
\`\`\`

## Stripe Payment Integration

Set up Stripe for secure payment processing:

\`\`\`typescript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})
\`\`\`

\`\`\`typescript
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
      .or(\`start_date.lte.\${endDate},end_date.gte.\${startDate}\`)

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
\`\`\`

## Handling Stripe Webhooks

Webhooks confirm payment and update booking status:

\`\`\`typescript
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
\`\`\`

## Preventing Race Conditions

When multiple users try to book the same item simultaneously, you need to handle race conditions:

\`\`\`typescript
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
\`\`\`

## Deployment

Deploy your booking system to Vercel:

\`\`\`bash
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
\`\`\`

Don't forget to:
1. Set up Stripe webhook endpoint: \`https://your-domain.com/api/webhooks/stripe\`
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

- [Gaari](https://portfolio-rizwanul.vercel.app/projects/gaari) - My car rental platform built with these concepts
- [View the Gaari Case Study](https://portfolio-rizwanul.vercel.app/blog/building-gaari-booking-system)

---

*Have questions about building booking systems? Connect with me on [LinkedIn](https://www.linkedin.com/in/rizwanul-islam-afraim99/) or [Twitter](https://x.com/rizwanul_afraim).*`,
    date: "2024-12-28",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tutorial", "Booking System"],
    readingTime: 15,
    views: 0,
    featured: true,
    author: {
      name: "Rizwanul Islam",
    },
  },
  {
    slug: "building-gaari-booking-system",
    title: "Building Gaari's Multi-Service Booking System",
    excerpt: "A technical deep dive into how I built a scalable booking engine supporting car rentals, travel packages, and activities with real-time availability management, dynamic pricing, and seamless payment integration.",
    content: `# Building Gaari's Multi-Service Booking System

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

\`\`\`typescript
// Simplified booking state structure
interface BookingState {
  serviceType: 'car-rental' | 'travel-package' | 'activity';
  searchParams: SearchParams;
  selectedItem: ServiceItem | null;
  bookingDetails: BookingDetails;
  pricing: PricingBreakdown;
}
\`\`\`

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

Building Gaari's booking system taught me that the best technical solutions are those that feel invisible to users—complexity hidden behind simplicity.`,
    date: "2024-11-15",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "E-commerce", "Supabase", "Payment Integration"],
    readingTime: 8,
    views: 0,
    featured: true,
    author: {
      name: "Rizwanul Islam",
    },
  },
  {
    slug: "launching-trail-news-platform",
    title: "From Idea to Production: Launching The Trail News Platform",
    excerpt: "The journey of building a production-ready news aggregator with custom CMS, analytics, and high-performance delivery. Lessons learned from architecting a scalable content platform.",
    content: `# From Idea to Production: Launching The Trail News Platform

Launching The Trail wasn't just about building another news website—it was about creating a platform that could handle high traffic, provide rich editorial tools, and deliver content at lightning speed. Here's how we went from concept to production in record time.

## The Vision

The Trail needed to be:
- **Fast**: Sub-second load times even with rich content
- **Scalable**: Handle traffic spikes without breaking
- **Editor-Friendly**: Custom CMS that non-technical editors could use
- **SEO-Optimized**: Rank well for news searches
- **Analytics-Rich**: Track what content performs best

## Building the Custom CMS

Rather than using WordPress or other off-the-shelf solutions, I built a custom CMS from scratch using Next.js 14 and Tiptap rich text editor. This gave us:

### Content Workflow System

The workflow follows a clear path:
1. **Draft**: Writers create content
2. **Review**: Editors review and suggest changes
3. **Approved**: Content approved for publishing
4. **Published**: Live on the site

Each stage has role-based permissions, ensuring content quality before publication.

### Advanced Filtering System

I implemented four content filters:
- **Latest**: Chronologically newest articles
- **Most Popular**: Based on view counts and engagement
- **Trending**: Articles gaining traction quickly
- **Hot**: High engagement in short time

The filtering algorithm considers:
- View counts (weighted by recency)
- Time on page
- Social shares
- Comments engagement

### Rich Text Editor with Tiptap

Tiptap provided a modern editing experience:
- Real-time collaboration support
- Custom extensions for embeds
- Image optimization on upload
- SEO-friendly markup generation

## Database Architecture

With 30+ database tables, careful schema design was crucial:

- **Normalized Structure**: Separate tables for articles, authors, categories, tags
- **RLS Policies**: Row-level security for multi-user access
- **Indexes**: Strategic indexing on frequently queried fields
- **Full-Text Search**: PostgreSQL full-text search for article discovery

## Analytics Dashboard

Built a custom analytics system tracking:
- Article views (real-time and historical)
- Popular categories and tags
- Reader engagement metrics
- Traffic sources
- Peak reading times

Data visualization using Recharts provides editors with actionable insights.

## Performance Optimization

Achieving 95/100 Lighthouse score required:

1. **Server Components**: Leveraged Next.js Server Components for zero-client JS
2. **Image Optimization**: Next.js Image component with Cloudinary
3. **Caching Strategy**: Multi-layer caching (CDN, Redis, database)
4. **Code Splitting**: Route-based code splitting
5. **Database Optimization**: Query optimization and connection pooling

## SEO Implementation

Comprehensive SEO strategy:
- **Structured Data**: Schema.org markup for articles
- **Sitemap Generation**: Dynamic sitemap.xml
- **RSS Feed**: Feed.xml for content syndication
- **Meta Tags**: Dynamic Open Graph and Twitter Cards
- **Canonical URLs**: Proper canonicalization

## Deployment with Docker

Containerized deployment ensures:
- Consistent environments (dev, staging, production)
- Easy scaling
- Simplified CI/CD
- Nginx reverse proxy for SSL and caching

## Results

The Trail now features:
- **150+ components** for various features
- **25+ API endpoints** for content management
- **30+ database tables** with optimized queries
- **95/100 Lighthouse score**
- **0.4s average load time**

## Key Learnings

1. **Custom CMS**: Building your own CMS gives complete control but requires more time
2. **Performance First**: Optimizing from day one prevents major refactoring later
3. **Editor Experience**: Non-technical users need intuitive interfaces
4. **Analytics Matter**: Data-driven decisions improve content strategy
5. **Scalability Planning**: Design for growth from the start

Building The Trail taught me that successful platforms balance technical excellence with user experience—both for readers and content creators.`,
    date: "2024-10-20",
    category: "Web Development",
    tags: ["Next.js", "CMS", "TypeScript", "PostgreSQL", "Performance"],
    readingTime: 7,
    views: 0,
    featured: true,
    author: {
      name: "Rizwanul Islam",
    },
  },
  {
    slug: "4-layer-seo-framework-yagacalls",
    title: "4-Layer SEO Framework: How I Optimized Yagacalls",
    excerpt: "A comprehensive SEO strategy that transformed Yagacalls into a high-ranking platform. Learn about the SXO, AIO, GEO, and AEO layers that drive organic traffic.",
    content: `# 4-Layer SEO Framework: How I Optimized Yagacalls

When I took on the lead developer role at Yagacalls, a platform serving 3,500+ investors with trading calls and market analysis, SEO wasn't just important—it was critical for growth. I developed a 4-layer SEO framework that transformed our organic visibility.

## The Challenge

Yagacalls needed to rank for:
- Trading signal keywords
- Market analysis terms
- Financial education content
- Platform-specific searches

Traditional SEO wasn't enough. We needed a comprehensive approach.

## The 4-Layer Framework

### Layer 1: SXO (Search Experience Optimization)

SXO goes beyond SEO to optimize the entire search experience:

**On-Page Elements:**
- Semantic HTML structure
- Proper heading hierarchy (H1-H6)
- Alt text for all images
- Internal linking strategy
- Breadcrumb navigation

**Content Quality:**
- Comprehensive, in-depth articles (2000+ words)
- Regular content updates
- User intent matching
- Answer-focused content

**Technical SEO:**
- Page speed optimization (Core Web Vitals)
- Mobile responsiveness
- SSL certificate
- XML sitemap
- Robots.txt optimization

### Layer 2: AIO (AI Optimization)

Leveraging AI for SEO:

**Content Generation:**
- AI-powered content creation for trading insights
- Automated meta descriptions
- Keyword optimization suggestions
- Content gap analysis

**User Experience:**
- AI chatbot for user queries
- Personalized content recommendations
- Automated content categorization

**Performance:**
- AI-driven caching strategies
- Predictive content loading
- Smart image optimization

### Layer 3: GEO (Geographic Optimization)

Targeting location-specific searches:

**Local SEO:**
- Google My Business optimization
- Location-based content
- Regional keyword targeting
- Local backlink strategy

**Content Localization:**
- Region-specific market analysis
- Local trading regulations content
- Timezone-aware content scheduling

### Layer 4: AEO (Answer Engine Optimization)

Optimizing for answer engines (Google's featured snippets, voice search):

**Structured Data:**
- FAQ schema markup
- HowTo schema for tutorials
- Article schema for blog posts
- Review schema for testimonials

**Content Format:**
- Answer-first content structure
- Bullet points and lists
- Clear, concise answers
- Question-based headings

**Voice Search Optimization:**
- Natural language queries
- Conversational content
- Long-tail keywords
- Question-based content

## Implementation Strategy

### Phase 1: Technical Foundation (Weeks 1-2)
- Site speed optimization
- Mobile responsiveness
- SSL implementation
- Sitemap generation

### Phase 2: Content Optimization (Weeks 3-4)
- On-page SEO audit
- Meta tag optimization
- Content structure improvements
- Internal linking

### Phase 3: Advanced Features (Weeks 5-6)
- Schema markup implementation
- AI content generation
- Analytics integration
- Performance monitoring

### Phase 4: Continuous Optimization (Ongoing)
- Content updates
- Backlink building
- Performance monitoring
- A/B testing

## Results

The 4-layer framework delivered:
- **300% increase** in organic traffic
- **Top 3 rankings** for target keywords
- **50+ featured snippets** captured
- **Improved Core Web Vitals** scores
- **Higher engagement** metrics

## Key Learnings

1. **Multi-Layer Approach**: SEO isn't one-size-fits-all; layers work together
2. **Technical Foundation**: Fast, mobile-friendly sites rank better
3. **Content Quality**: Comprehensive content outperforms thin content
4. **Structured Data**: Schema markup increases visibility
5. **Continuous Optimization**: SEO is ongoing, not one-time

## Tools & Technologies

- **Google Search Console**: Monitoring and insights
- **Google Analytics**: Traffic analysis
- **Schema.org**: Structured data markup
- **Custom CMS**: Built-in SEO features
- **Performance Monitoring**: Core Web Vitals tracking

The 4-layer SEO framework transformed Yagacalls from a startup platform to a recognized authority in trading signals and market analysis. The key was treating SEO as a comprehensive strategy, not just keyword optimization.`,
    date: "2024-09-10",
    category: "SEO",
    tags: ["SEO", "Content Strategy", "Performance", "Analytics"],
    readingTime: 6,
    views: 0,
    featured: false,
    author: {
      name: "Rizwanul Islam",
    },
  },
  {
    slug: "leading-200-people-nsuss",
    title: "Leading 200+ People: Event Management at Scale (NSUSS)",
    excerpt: "Lessons learned from managing teams of 200+ people to execute mega-events with 25,000+ attendees. Strategic planning, delegation, and execution at scale.",
    content: `# Leading 200+ People: Event Management at Scale (NSUSS)

As Vice President of Programs at North South University Shangskritik Shangathan (NSUSS), I led teams of approximately 200 people to organize, plan, and execute large-scale cultural events. This role taught me invaluable lessons about leadership, strategic planning, and execution at scale.

## The Challenge

NSUSS is the only cultural club of North South University and the biggest, most renowned club in the cultural space of Bangladeshi educational institutes. Established in 1993, NSUSS has been bringing out the cultural aspects of Bangladesh and portraying them in innovative ways.

The challenge was coordinating:
- **200+ team members** across multiple departments
- **25,000+ attendees** at major events
- **Multiple events** running simultaneously
- **Limited resources** and tight timelines
- **High expectations** from university and community

## Strategic Planning Framework

### 1. Department Structure

I organized the team into specialized departments:
- **Event Planning**: Conceptualization and logistics
- **Technical**: Sound, lighting, stage setup
- **Marketing**: Promotion and social media
- **Finance**: Budget management and sponsorships
- **Coordination**: Inter-department communication
- **Security**: Crowd management and safety

Each department had:
- Clear objectives
- Defined responsibilities
- Regular check-ins
- Accountability measures

### 2. Communication Systems

With 200+ people, communication was critical:

**Hierarchical Structure:**
- Department heads reported directly to me
- Department heads managed their teams
- Clear escalation paths
- Regular all-hands meetings

**Tools & Platforms:**
- WhatsApp groups for quick updates
- Google Sheets for shared planning documents
- Regular in-person meetings for major decisions
- Email for formal communications

### 3. Delegation Strategy

Effective delegation required:
- **Trust**: Empowering department heads to make decisions
- **Clear Boundaries**: Defining decision-making authority
- **Support**: Being available for guidance without micromanaging
- **Accountability**: Regular progress reviews

## Event Execution: ACE (Annual Cultural Evening)

ACE is NSUSS's flagship event, attracting 25,000+ attendees. Here's how we executed it:

### Pre-Event (3 Months Out)
- Concept finalization
- Budget approval
- Team assignments
- Vendor contracts

### Mid-Event (1 Month Out)
- Final rehearsals
- Marketing push
- Logistics confirmation
- Safety protocols

### Event Day
- **6 AM**: Team briefing
- **8 AM**: Setup begins
- **2 PM**: Final checks
- **4 PM**: Doors open
- **6 PM**: Event starts
- **10 PM**: Event concludes
- **11 PM**: Cleanup begins

### Post-Event
- Team debrief
- Feedback collection
- Financial reconciliation
- Documentation

## Key Leadership Principles

### 1. Vision Alignment

Every team member understood:
- The event's purpose
- Their role in achieving it
- How success would be measured

### 2. Empowerment

I gave department heads:
- Autonomy to make decisions
- Resources to execute
- Support when needed
- Recognition for achievements

### 3. Crisis Management

When things went wrong (and they always do):
- Stay calm and assess
- Communicate clearly
- Delegate solutions
- Learn for next time

### 4. Recognition

Celebrating wins:
- Public recognition at events
- Team appreciation messages
- Highlighting individual contributions
- Building team culture

## Results

Under my leadership, NSUSS achieved:
- **25,000+ attendees** at ACE
- **Viral performances** gaining millions of views
- **Celebrity acknowledgements** from artists
- **Successful collaborations** with media companies
- **Campus-wide celebrations** (Boshonto, Boishakh)
- **Inter-University recognition** at cultural fests

## Lessons Learned

1. **Scale Requires Structure**: Large teams need clear organization
2. **Communication is Everything**: Regular updates prevent misunderstandings
3. **Trust Your Team**: Empowerment leads to better outcomes
4. **Plan for Problems**: Always have contingency plans
5. **Celebrate Success**: Recognition motivates teams
6. **Learn Continuously**: Each event teaches new lessons

## Skills Developed

- **Strategic Planning**: Long-term vision with short-term execution
- **Team Leadership**: Managing diverse personalities and skills
- **Crisis Management**: Handling unexpected challenges
- **Resource Management**: Optimizing limited budgets
- **Stakeholder Management**: Balancing multiple interests

Leading 200+ people taught me that leadership isn't about control—it's about enabling others to succeed. The best leaders create systems, empower teams, and step back to let excellence happen.`,
    date: "2024-08-05",
    category: "Leadership",
    tags: ["Leadership", "Event Management", "Team Management", "Strategy"],
    readingTime: 7,
    views: 0,
    featured: false,
    author: {
      name: "Rizwanul Islam",
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getAllCategories(): string[] {
  const categories = new Set(blogPosts.map((post) => post.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const tags = new Set(blogPosts.flatMap((post) => post.tags));
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


