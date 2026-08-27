-- Enquiries, Commercial Partner applications, and the Trade Account /
-- company-membership auth foundation. Builds on the deny-by-default
-- public/private split established in 20260718133937_foundation_schemas.sql:
--   - `private`: internal operational records (enquiries, applications) —
--     never exposed via the Data API, written only by trusted server code
--     using the service-role key. Matches the frontend's existing
--     EnquiryDraft / CommercialPartnerApplicationDraft shapes 1:1 (see
--     src/modules/enquiry/draft.ts, src/modules/enquiry/commercial-partner-application.ts)
--     so a future backend integration only has to replace the stubbed
--     submit*() function bodies — this migration does not change any
--     frontend code.
--   - `public`: `companies` / `company_members` — the Trade Account
--     foundation. These *will* eventually be read directly by
--     authenticated users once Trade Account UI exists, so they live in
--     `public` with RLS enforcing "only your own company", rather than in
--     `private`. No Trade Account UI is built by this migration; only the
--     schema, so a future feature only has to add policies for writes
--     (self-service signup, profile edits) once that flow is designed.
--
-- Table order below is dependency order (companies/company_members first —
-- enquiries and commercial_partner_applications both hold an optional FK to
-- companies).

-- ---------------------------------------------------------------------------
-- Shared trigger: keep `updated_at` current on every UPDATE.
-- ---------------------------------------------------------------------------
create function private.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function private.set_updated_at() is
  'BEFORE UPDATE trigger: stamps updated_at = now() on every row update.';

-- ---------------------------------------------------------------------------
-- public.companies / public.company_members — Trade Account auth
-- foundation. Supabase Auth (auth.users) owns identity; these tables only
-- model the company <-> user relationship. No self-service signup or write
-- path exists yet — RLS below is read-only for members, by design, until a
-- signup/invite flow is built.
-- ---------------------------------------------------------------------------
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  name text not null,
  slug text not null unique,
  market text not null check (market in ('uk', 'ua')),
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended'))
);

comment on table public.companies is
  'Trade Account companies. Exposed via the Data API with RLS — members may SELECT their own company only; no client-side write policy exists yet.';

create index companies_slug_idx on public.companies (slug);
create index companies_status_idx on public.companies (status);

create trigger companies_set_updated_at
  before update on public.companies
  for each row execute function private.set_updated_at();

create table public.company_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),

  unique (company_id, user_id)
);

comment on table public.company_members is
  'Links auth.users to the company/companies they belong to. Exposed via the Data API with RLS — a user may SELECT their own membership rows only.';

create index company_members_company_id_idx on public.company_members (company_id);
create index company_members_user_id_idx on public.company_members (user_id);

-- SECURITY DEFINER helper so the companies/company_members RLS policies can
-- check membership without the classic self-referencing-RLS recursion
-- problem (a policy on company_members that queries company_members).
create function private.is_company_member(target_company_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.company_members m
    where m.company_id = target_company_id
      and m.user_id = auth.uid()
  );
$$;

comment on function private.is_company_member(uuid) is
  'True if the current authenticated user is a member of target_company_id. SECURITY DEFINER to avoid RLS recursion on company_members.';

-- ---------------------------------------------------------------------------
-- private.enquiries — /contact submissions (mirrors EnquiryDraft in
-- src/modules/enquiry/draft.ts).
-- ---------------------------------------------------------------------------
create table private.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  reference_no text not null unique,
  type text not null check (type in ('product', 'quote', 'technical', 'technical-document', 'project', 'general')),
  market text not null check (market in ('uk', 'ua')),
  status text not null default 'new' check (status in ('new', 'in_review', 'responded', 'closed')),

  -- Optional link once the submitter is known to belong to an approved trade account.
  company_id uuid references public.companies (id) on delete set null,

  -- EnquiryContactDetails
  first_name text not null,
  last_name text not null,
  company text not null,
  job_title text not null,
  email text not null,
  phone text not null,

  -- EnquiryProjectDetails
  project_name text not null default '',
  project_location text not null default '',
  project_type text not null default '',
  project_stage text not null default '',
  estimated_quantity text not null default '',
  required_date text not null default '',
  interested_systems text[] not null default '{}',

  -- EnquiryTechnicalDetails
  product_system text not null default '',
  product_series text not null default '',
  model_code text not null default '',
  information_required text[] not null default '{}',
  documents_required text[] not null default '{}',

  subject text not null default '',
  message text not null default '',

  -- EnquirySourceContext — a small, optional, non-PII bag of fields; jsonb
  -- keeps this table stable as that shape evolves without new migrations.
  source_context jsonb not null default '{}'::jsonb
);

comment on table private.enquiries is
  'Contact page submissions. Never exposed via the Data API; written only by trusted server code with the service-role key.';

create index enquiries_created_at_idx on private.enquiries (created_at desc);
create index enquiries_status_idx on private.enquiries (status);
create index enquiries_email_idx on private.enquiries (email);
create index enquiries_company_id_idx on private.enquiries (company_id);

create trigger enquiries_set_updated_at
  before update on private.enquiries
  for each row execute function private.set_updated_at();

-- ---------------------------------------------------------------------------
-- private.enquiry_items — the product/family/model lines attached to an
-- enquiry (mirrors EnquiryItem in src/modules/enquiry/types.ts).
-- ---------------------------------------------------------------------------
create table private.enquiry_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  enquiry_id uuid not null references private.enquiries (id) on delete cascade,
  sort_order int not null default 0,

  -- The client-generated EnquiryItem.id — kept for traceability, not a DB key.
  client_item_id text not null,

  title text not null,
  system text not null check (
    system in ('busbar', 'cable-management', 'earthing-lightning', 'underfloor', 'led-systems', 'ev-charging', 'g-bus')
  ),
  model text,
  category_label text,
  source_route text,
  -- Free-text project quantity, matches EnquiryItem.quantity (never a contact field).
  quantity text
);

comment on table private.enquiry_items is
  'Product/family/model lines attached to an enquiry. One enquiry has many items.';

create index enquiry_items_enquiry_id_idx on private.enquiry_items (enquiry_id);

-- ---------------------------------------------------------------------------
-- private.enquiry_attachments — foreshadowed explicitly in
-- src/modules/enquiry/draft.ts ("a future backend maps this onto
-- enquiries / enquiry_items / enquiry_attachments"). Object storage lives in
-- the private-enquiry-attachments Supabase Storage bucket (see
-- src/modules/storage/buckets.ts); this table indexes it.
-- ---------------------------------------------------------------------------
create table private.enquiry_attachments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  enquiry_id uuid not null references private.enquiries (id) on delete cascade,

  file_name text not null,
  storage_object_path text not null,
  content_type text,
  size_bytes bigint
);

comment on table private.enquiry_attachments is
  'Indexes files uploaded to the private-enquiry-attachments Storage bucket for a given enquiry.';

create index enquiry_attachments_enquiry_id_idx on private.enquiry_attachments (enquiry_id);

-- ---------------------------------------------------------------------------
-- private.commercial_partner_applications — /commercial-partners submissions
-- (mirrors CommercialPartnerApplicationDraft in
-- src/modules/enquiry/commercial-partner-application.ts). An application is
-- an expression of interest only; declaration_accepted records the explicit
-- acknowledgement that it implies no appointment/pricing/credit relationship
-- until InfraVolt confirms in writing.
-- ---------------------------------------------------------------------------
create table private.commercial_partner_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  reference_no text not null unique,
  market text not null check (market in ('uk', 'ua')),
  status text not null default 'new' check (status in ('new', 'in_review', 'approved', 'declined')),

  -- Linked once InfraVolt approves the application and creates a company record.
  company_id uuid references public.companies (id) on delete set null,

  company_name text not null,
  website text not null default '',
  company_location text not null default '',
  years_trading text not null default '',
  business_type text not null default '',
  partnership_interest text not null default '',

  contact_name text not null,
  job_title text not null default '',
  email text not null,
  phone text not null default '',

  current_sales_service_coverage text[] not null default '{}',

  requested_dealership_scale text not null default '',
  requested_dealership_regions text[] not null default '{}',
  requested_dealership_cities text not null default '',

  product_system_interests text[] not null default '{}',
  industry_interests text[] not null default '{}',
  commercial_requirements text not null default '',

  declaration_accepted boolean not null default false,
  source_path text not null default ''
);

comment on table private.commercial_partner_applications is
  'Commercial Partner applications. Never exposed via the Data API; written only by trusted server code with the service-role key.';

create index commercial_partner_applications_created_at_idx on private.commercial_partner_applications (created_at desc);
create index commercial_partner_applications_status_idx on private.commercial_partner_applications (status);
create index commercial_partner_applications_email_idx on private.commercial_partner_applications (email);
create index commercial_partner_applications_company_id_idx on private.commercial_partner_applications (company_id);

create trigger commercial_partner_applications_set_updated_at
  before update on private.commercial_partner_applications
  for each row execute function private.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — enable on every new table; no policy means no
-- access for anon/authenticated (default deny), matching the deny-by-default
-- posture of 20260718133937_foundation_schemas.sql.
-- ---------------------------------------------------------------------------
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table private.enquiries enable row level security;
alter table private.enquiry_items enable row level security;
alter table private.enquiry_attachments enable row level security;
alter table private.commercial_partner_applications enable row level security;

-- Trade Account read policies: a member may see their own company and their
-- own membership rows. No INSERT/UPDATE/DELETE policy exists for anon or
-- authenticated yet — writes happen only via service_role until a
-- signup/invite flow is designed.
create policy "companies_select_own" on public.companies
  for select
  to authenticated
  using (private.is_company_member(id));

create policy "company_members_select_own" on public.company_members
  for select
  to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Grants — deny-by-default (see 20260718133937_foundation_schemas.sql);
-- every role/table combination below is explicit.
-- ---------------------------------------------------------------------------
-- public.companies / public.company_members — authenticated gets SELECT
-- (RLS-scoped to their own company above); service_role gets full access
-- for server-side provisioning (creating a company on partner approval, etc.).
grant select on public.companies to authenticated;
grant select, insert, update, delete on public.companies to service_role;
grant select on public.company_members to authenticated;
grant select, insert, update, delete on public.company_members to service_role;
grant execute on function private.is_company_member(uuid) to authenticated, service_role;

-- private.* — service_role only; anon/authenticated get nothing (not even
-- schema usage extends automatic table access, per default-privilege revokes).
grant select, insert, update, delete on private.enquiries to service_role;
grant select, insert, update, delete on private.enquiry_items to service_role;
grant select, insert, update, delete on private.enquiry_attachments to service_role;
grant select, insert, update, delete on private.commercial_partner_applications to service_role;
grant execute on function private.set_updated_at() to service_role;
