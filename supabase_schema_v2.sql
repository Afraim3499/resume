-- SAAS V2 SCHEMA: Multi-User, Goal-Oriented, Personalized

-- RESET (Careful: This wipes data! Use only for fresh setup)
drop table if exists budget_profiles cascade;
drop table if exists budget_goals cascade;
drop table if exists budget_incomes cascade;
drop table if exists budget_expenses cascade;
drop table if exists budget_investments cascade;
drop table if exists budget_loans cascade;
drop table if exists budget_snapshots cascade;
drop table if exists budget_config cascade; -- V1 cleanup

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Personalization Engine)
-- Stores functionality preferences, ensuring the dashboard "adapts" to them.
create table budget_profiles (
  id uuid references auth.users not null primary key, -- 1:1 with Auth User
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text,
  currency_symbol text default '৳',
  
  -- The "Persona" (Influences Dashboard Layout)
  financial_goal_primary text check (financial_goal_primary in ('startup', 'retirement', 'debt_free', 'purchase')),
  
  -- Onboarding State
  has_completed_onboarding boolean default false,
  
  -- Config
  monthly_savings_target numeric default 0
);

-- 2. GOALS ( The "Why" )
-- Supports: Startup Fund, Wedding, Travel, Emergency Fund
create table budget_goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  name text not null, -- e.g. "My SaaS Startup", "Bali 2026"
  target_amount numeric not null,
  current_amount numeric default 0,
  deadline date,
  priority text check (priority in ('high', 'medium', 'low')) default 'medium',
  
  -- Auto-Allocation: "Put 10% of surplus here"
  auto_save_percentage numeric default 0 
);

-- 3. INCOMES (The Fuel)
create table budget_incomes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  name text not null,
  amount numeric not null,
  start_date date, -- For Calendar Logic
  repeats text check (repeats in ('monthly', 'once')) default 'monthly'
);

-- 4. EXPENSES (The Burn)
create table budget_expenses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  name text not null,
  amount numeric not null,
  category text, -- "Rent", "Server Costs", "Marketing" (Adaptive based on Persona)
  is_fixed boolean default false,
  is_reimbursable boolean default false
);

-- 5. INVESTMENTS (The Wealth Builder)
-- Tracks active SIPs, DPS, Stock Purchases
create table budget_investments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  name text not null, -- e.g. "S&P 500 SIP", "Startup Equity"
  amount numeric not null,
  frequency text check (frequency in ('monthly', 'yearly', 'once')) default 'monthly',
  
  -- "Act on it" logic:
  -- If 'auto_deduct' is true, this reduces "Safe Daily Spend" but ADDs to "Projected Net Worth"
  auto_deduct boolean default true
);

-- 6. LOANS (Ledger of Truth)
create table budget_loans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  person_name text not null,
  amount numeric not null,
  type text check (type in ('lent', 'borrowed')) not null,
  status text check (status in ('active', 'paid')) default 'active',
  due_date date
);

-- 6. SNAPSHOTS (History)
-- To show "Net Worth Trend" charts later
create table budget_snapshots (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  date date default CURRENT_DATE,
  total_balance numeric,
  net_worth numeric
);


-- SECURITY: ROW LEVEL SECURITY (RLS)
-- "Users can only see their own data"

alter table budget_profiles enable row level security;
alter table budget_goals enable row level security;
alter table budget_incomes enable row level security;
alter table budget_expenses enable row level security;
alter table budget_investments enable row level security;
alter table budget_loans enable row level security;
alter table budget_snapshots enable row level security;

-- Policy Generator
-- 1. Profiles
create policy "Users can view own profile" on budget_profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on budget_profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on budget_profiles for insert with check (auth.uid() = id);

-- 2. Generic Resources (Goals, Incomes, etc.)
create policy "Users can view own goals" on budget_goals for select using (auth.uid() = user_id);
create policy "Users can insert own goals" on budget_goals for insert with check (auth.uid() = user_id);
create policy "Users can update own goals" on budget_goals for update using (auth.uid() = user_id);
create policy "Users can delete own goals" on budget_goals for delete using (auth.uid() = user_id);

create policy "Users can view own incomes" on budget_incomes for select using (auth.uid() = user_id);
create policy "Users can insert own incomes" on budget_incomes for insert with check (auth.uid() = user_id);
create policy "Users can update own incomes" on budget_incomes for update using (auth.uid() = user_id);
create policy "Users can delete own incomes" on budget_incomes for delete using (auth.uid() = user_id);

create policy "Users can view own expenses" on budget_expenses for select using (auth.uid() = user_id);
create policy "Users can insert own expenses" on budget_expenses for insert with check (auth.uid() = user_id);
create policy "Users can update own expenses" on budget_expenses for update using (auth.uid() = user_id);
create policy "Users can delete own expenses" on budget_expenses for delete using (auth.uid() = user_id);

create policy "Users can view own investments" on budget_investments for select using (auth.uid() = user_id);
create policy "Users can insert own investments" on budget_investments for insert with check (auth.uid() = user_id);
create policy "Users can update own investments" on budget_investments for update using (auth.uid() = user_id);
create policy "Users can delete own investments" on budget_investments for delete using (auth.uid() = user_id);

create policy "Users can view own loans" on budget_loans for select using (auth.uid() = user_id);
create policy "Users can insert own loans" on budget_loans for insert with check (auth.uid() = user_id);
create policy "Users can update own loans" on budget_loans for update using (auth.uid() = user_id);
create policy "Users can delete own loans" on budget_loans for delete using (auth.uid() = user_id);

-- TRIGGER: Auto-create Profile on Auth Signup
-- This requires the Supabase 'moddatetime' extension or similar, but for now we'll handle creation in the App Wizard.
