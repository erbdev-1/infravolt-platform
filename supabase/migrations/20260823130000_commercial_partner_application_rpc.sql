-- Wires up private.commercial_partner_applications for real submissions
-- (src/modules/enquiry/commercial-partner-application.ts). Two changes:
--   1. Renames the "not yet reviewed" status value from 'new' to
--      'pending_review' — clearer for a flow where "submission does not
--      mean appointment" is a hard commercial rule.
--   2. Adds public.submit_commercial_partner_application(), mirroring
--      public.submit_enquiry() (see 20260823090000_submit_enquiry_rpc.sql
--      and 20260823100000_submit_enquiry_rate_limit.sql): atomic insert,
--      generated reference number, and abuse protection in the same
--      transaction as the insert — SECURITY DEFINER, service_role only.

-- ---------------------------------------------------------------------------
-- 1. status: 'new' -> 'pending_review'
-- ---------------------------------------------------------------------------
do $$
declare
  v_constraint_name text;
begin
  select conname into v_constraint_name
  from pg_constraint
  where conrelid = 'private.commercial_partner_applications'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) like '%status%';

  if v_constraint_name is not null then
    execute format('alter table private.commercial_partner_applications drop constraint %I', v_constraint_name);
  end if;
end $$;

update private.commercial_partner_applications
  set status = 'pending_review'
  where status = 'new';

alter table private.commercial_partner_applications
  alter column status set default 'pending_review';

alter table private.commercial_partner_applications
  add constraint commercial_partner_applications_status_check
    check (status in ('pending_review', 'in_review', 'approved', 'declined'));

-- ---------------------------------------------------------------------------
-- 2. public.submit_commercial_partner_application() — the only write path
-- into private.commercial_partner_applications. Reference format:
-- IV-CP-{YYYY}-{6-digit}, generated inside the same transaction as the
-- insert and retried on collision (matches submit_enquiry's approach) —
-- uniqueness is enforced at the DB level via the existing
-- reference_no unique constraint, not only in application code.
--
-- Abuse protection, same transaction as the insert:
--   - rate limit: reject a 4th+ submission from the same email within 15
--     minutes (mirrors submit_enquiry's per-email rate limit).
--   - duplicate guard: reject a second submission from the same
--     email+company_name within 5 minutes, catching accidental
--     double-submits distinctly from a genuine, intentional re-application.
-- Both failures raise a generic exception — PostgREST turns this into a
-- non-2xx response, which the caller (commercial-partner-application.ts)
-- already maps to the same generic { ok: false, error: "network" } result
-- as any other server-side failure, so neither condition is distinguishable
-- to an abuser.
-- ---------------------------------------------------------------------------
create function public.submit_commercial_partner_application(
  p_market text,
  p_company_name text,
  p_website text,
  p_company_location text,
  p_years_trading text,
  p_business_type text,
  p_partnership_interest text,
  p_contact_name text,
  p_job_title text,
  p_email text,
  p_phone text,
  p_current_sales_service_coverage text[],
  p_requested_dealership_scale text,
  p_requested_dealership_regions text[],
  p_requested_dealership_cities text,
  p_product_system_interests text[],
  p_industry_interests text[],
  p_commercial_requirements text,
  p_declaration_accepted boolean,
  p_source_path text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_application_id uuid;
  v_reference_no text;
  v_attempt int := 0;
  v_recent_count int;
  v_duplicate_count int;
begin
  if not p_declaration_accepted then
    raise exception 'submit_commercial_partner_application: declaration must be accepted';
  end if;

  select count(*) into v_recent_count
  from private.commercial_partner_applications
  where email = p_email
    and created_at > now() - interval '15 minutes';

  if v_recent_count >= 3 then
    raise exception 'submit_commercial_partner_application: rate limit exceeded for this email';
  end if;

  select count(*) into v_duplicate_count
  from private.commercial_partner_applications
  where email = p_email
    and company_name = p_company_name
    and created_at > now() - interval '5 minutes';

  if v_duplicate_count > 0 then
    raise exception 'submit_commercial_partner_application: duplicate submission detected';
  end if;

  loop
    v_attempt := v_attempt + 1;
    v_reference_no := 'IV-CP-' || to_char(now(), 'YYYY') || '-' || lpad(floor(random() * 1000000)::text, 6, '0');

    begin
      insert into private.commercial_partner_applications (
        reference_no, market, status,
        company_name, website, company_location, years_trading, business_type, partnership_interest,
        contact_name, job_title, email, phone,
        current_sales_service_coverage,
        requested_dealership_scale, requested_dealership_regions, requested_dealership_cities,
        product_system_interests, industry_interests, commercial_requirements,
        declaration_accepted, source_path
      ) values (
        v_reference_no, p_market, 'pending_review',
        p_company_name, p_website, p_company_location, p_years_trading, p_business_type, p_partnership_interest,
        p_contact_name, p_job_title, p_email, p_phone,
        p_current_sales_service_coverage,
        p_requested_dealership_scale, p_requested_dealership_regions, p_requested_dealership_cities,
        p_product_system_interests, p_industry_interests, p_commercial_requirements,
        p_declaration_accepted, p_source_path
      )
      returning id into v_application_id;

      exit;
    exception when unique_violation then
      if v_attempt >= 5 then
        raise exception 'submit_commercial_partner_application: could not generate a unique reference number';
      end if;
    end;
  end loop;

  return v_reference_no;
end;
$$;

comment on function public.submit_commercial_partner_application is
  'Atomic insert into private.commercial_partner_applications with a generated IV-CP-{YYYY}-{6-digit} reference, a per-email rate limit, and a same-email+company duplicate-submission guard. SECURITY DEFINER — the only write path into that table. Granted to service_role only.';

revoke all on function public.submit_commercial_partner_application from public;
grant execute on function public.submit_commercial_partner_application to service_role;
