-- Run once in the Supabase SQL editor when provisioning the project.

create extension if not exists pgcrypto;

create table contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  contact_method text not null check (contact_method in ('Email', 'Phone', 'WhatsApp')),
  contact_detail text,
  service text not null,
  service_notes text,
  notes text,
  status text not null default 'new' check (status in ('new', 'contacted', 'in_progress', 'closed')),
  email_sent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table clients (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  contact_info text not null,
  project_description text not null,
  amount_charged numeric(12,2),
  website_url text,
  github_url text,
  status text default 'lead' check (status in ('lead', 'active', 'completed', 'on_hold', 'cancelled')),
  service text check (service in ('Web Development', 'Mobile Apps', 'Digital Transformation', 'Custom Software', 'UI/UX Design', 'Other')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index contact_requests_created_at_idx on contact_requests (created_at desc);
create index clients_created_at_idx on clients (created_at desc);
