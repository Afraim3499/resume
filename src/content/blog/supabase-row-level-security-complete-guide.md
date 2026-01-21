---
title: "Supabase Row Level Security (RLS): The 2026 Guide"
excerpt: "Master Supabase Row Level Security with this comprehensive guide. Learn how to implement secure, scalable authorization policies for your Next.js applications with practical examples."
date: "2026-12-25"
category: "Database"
tags: ["Supabase", "PostgreSQL", "Security", "RLS", "Tutorial", "Database"]
featured: true
readingTime: 14
author: "Rizwanul Islam"
---Row Level Security (RLS) is one of Supabase's most powerful features, yet it's often misunderstood or underutilized. In this comprehensive guide, I'll show you how to implement bulletproof security policies that protect your data at the database level.


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

```javascript
// ❌ Without RLS - Security in application code (DANGEROUS)
const { data } = await supabase
  .from('posts')
  .select('*')
  .eq('user_id', currentUser.id)

// A malicious user could bypass this by modifying the request
```

```sql
-- ✅ With RLS - Security at database level (SECURE)
-- Even if application code is bypassed, database enforces rules
CREATE POLICY "Users can only see own posts"
ON posts FOR SELECT
USING (auth.uid() = user_id);
```

## Getting Started: Enable RLS

First, enable RLS on your table:

```sql
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
```

> ⚠️ **Warning**: Once RLS is enabled, all access is blocked by default. You MUST create policies to allow access.

## Understanding Policy Structure

Every RLS policy has this structure:

```sql
CREATE POLICY "policy_name"
ON table_name
FOR operation -- SELECT, INSERT, UPDATE, DELETE, ALL
TO role -- authenticated, anon, service_role, or specific role
USING (condition) -- For SELECT, UPDATE, DELETE (row visibility)
WITH CHECK (condition); -- For INSERT, UPDATE (row validation)
```

### USING vs WITH CHECK

- **USING**: Determines which existing rows are visible/accessible
- **WITH CHECK**: Validates new or updated data

```sql
-- Example: Users can only UPDATE their own posts
CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id) -- Can only see their posts
WITH CHECK (auth.uid() = user_id); -- Can only set user_id to themselves
```

## Common RLS Patterns

### Pattern 1: Ownership-Based Access

The most common pattern - users can only access their own data:

```sql
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
```

### Pattern 2: Public/Private Content

Some rows are public, others are private:

```sql
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
```

### Pattern 3: Role-Based Access Control (RBAC)

Different users have different permissions:

```sql
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
```

### Pattern 4: Multi-Tenant Applications

Organizations with multiple users:

```sql
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
```

## Advanced Techniques

### Using JWTs for Custom Claims

You can add custom claims to JWTs for faster policy checks:

```sql
-- Access custom claims from JWT
CREATE POLICY "Check JWT claims"
ON posts FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'role' = 'admin'
  OR auth.uid() = user_id
);
```

### Subqueries in Policies

For complex relationships:

```sql
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
```

### Recursive Policies (Hierarchical Data)

For tree structures like folders or comments:

```sql
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
```

## Performance Optimization

### Index Strategy

RLS policies run on every query. Proper indexing is crucial:

```sql
-- Index columns used in RLS policies
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_published ON posts(is_published) WHERE is_published = true;
CREATE INDEX idx_org_members_user_org ON org_members(user_id, org_id);
```

### Avoid Complex Subqueries

```sql
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
```

## Testing RLS Policies

### Method 1: Supabase Dashboard

Use the SQL Editor with role impersonation:

```sql
-- Test as a specific user
SET request.jwt.claims = '{"sub": "user-uuid-here"}';
SET ROLE authenticated;

SELECT * FROM posts; -- Should only show allowed rows
```

### Method 2: Integration Tests

```typescript
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
```

## Common Mistakes to Avoid

### Mistake 1: Forgetting to Enable RLS

```sql
-- ❌ Table created without RLS - ANYONE can access!
CREATE TABLE secrets (
  id UUID PRIMARY KEY,
  data TEXT
);

-- ✅ Always enable RLS immediately
ALTER TABLE secrets ENABLE ROW LEVEL SECURITY;
```

### Mistake 2: Overly Permissive Policies

```sql
-- ❌ Too permissive - anyone can read everything
CREATE POLICY "Allow all reads"
ON posts FOR SELECT
USING (true);

-- ✅ Be specific about who can access what
CREATE POLICY "Public reads published, authors read own"
ON posts FOR SELECT
USING (is_published = true OR auth.uid() = user_id);
```

### Mistake 3: Not Using WITH CHECK for Writes

```sql
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
```

### Mistake 4: Not Handling Service Role

```sql
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
```

## Real-World Example: News Platform

Here's how I implemented RLS for [The Trail](https://portfolio-rizwanul.vercel.app/projects/the-trail):

```sql
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
```

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

*Have questions about implementing RLS? Connect with me on [LinkedIn](https://www.linkedin.com/in/rizwanul-islam-afraim99/) or [Twitter](https://x.com/rizwanul_afraim).*