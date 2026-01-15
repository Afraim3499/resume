-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Incomes Table
create table budget_incomes (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  amount numeric not null,
  start_date date,
  repeats text check (repeats in ('monthly', 'once')) default 'monthly'
);

-- 2. Expenses Table
create table budget_expenses (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  amount numeric not null,
  category text not null,
  is_fixed boolean default false,
  is_reimbursable boolean default false,
  frequency text check (frequency in ('monthly', 'yearly')) default 'monthly'
);

-- 3. Loans Table (Ledger of Truth)
create table budget_loans (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  person_name text not null,
  amount numeric not null,
  type text check (type in ('lent', 'borrowed')) not null,
  status text check (status in ('active', 'paid')) default 'active',
  due_date date
);

-- 4. Budget Config (Global Settings)
create table budget_config (
  id uuid default uuid_generate_v4() primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  target_investment numeric default 0,
  current_balance numeric default 0,
  last_balance_update timestamp with time zone
);

-- SECURITY: Enable Row Level Security (RLS) but allow Anon access for now (Personal Tool)
-- In a real multi-user app, we would restrict this to auth.uid()

alter table budget_incomes enable row level security;
alter table budget_expenses enable row level security;
alter table budget_loans enable row level security;
alter table budget_config enable row level security;

-- Policy: Allow full access to Anon (since only you have the API key in this personal deployment)
create policy "Allow Anon Select" on budget_incomes for select using (true);
create policy "Allow Anon Insert" on budget_incomes for insert with check (true);
create policy "Allow Anon Update" on budget_incomes for update using (true);
create policy "Allow Anon Delete" on budget_incomes for delete using (true);

create policy "Allow Anon Select" on budget_expenses for select using (true);
create policy "Allow Anon Insert" on budget_expenses for insert with check (true);
create policy "Allow Anon Update" on budget_expenses for update using (true);
create policy "Allow Anon Delete" on budget_expenses for delete using (true);

create policy "Allow Anon Select" on budget_loans for select using (true);
create policy "Allow Anon Insert" on budget_loans for insert with check (true);
create policy "Allow Anon Update" on budget_loans for update using (true);
create policy "Allow Anon Delete" on budget_loans for delete using (true);

create policy "Allow Anon Select" on budget_config for select using (true);
create policy "Allow Anon Insert" on budget_config for insert with check (true);
create policy "Allow Anon Update" on budget_config for update using (true);
create policy "Allow Anon Delete" on budget_config for delete using (true);

-- Initial Config Row
insert into budget_config (target_investment, current_balance) values (10000, 0);
