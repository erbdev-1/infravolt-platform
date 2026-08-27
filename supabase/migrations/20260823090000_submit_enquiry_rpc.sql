-- public.submit_enquiry() — the only write path into private.enquiries /
-- private.enquiry_items. `private` is deliberately NOT in the project's
-- exposed-schemas list (confirmed: PostgREST rejects Accept-Profile/
-- Content-Profile: private with PGRST106), so direct REST inserts into
-- those tables are impossible for any role, including service_role — this
-- is the whole point of keeping enquiries out of the Data API surface.
--
-- SECURITY DEFINER lets this single, narrow function reach into `private`
-- on the caller's behalf without exposing the schema itself. It is granted
-- to service_role only — never anon/authenticated — so the only caller is
-- trusted server code (see src/modules/enquiry/draft.ts) using
-- SUPABASE_SECRET_KEY; the browser can never call this directly. Generates
-- and returns the reference number itself so enquiry + items insert in one
-- transaction (atomic: either both succeed or the whole call rolls back).
create function public.submit_enquiry(
  p_type text,
  p_market text,
  p_subject text,
  p_first_name text,
  p_last_name text,
  p_company text,
  p_job_title text,
  p_email text,
  p_phone text,
  p_project_name text,
  p_project_location text,
  p_project_type text,
  p_project_stage text,
  p_estimated_quantity text,
  p_required_date text,
  p_interested_systems text[],
  p_product_system text,
  p_product_series text,
  p_model_code text,
  p_information_required text[],
  p_documents_required text[],
  p_message text,
  p_source_context jsonb,
  -- Each element: {"clientItemId","title","system","model","categoryLabel","sourceRoute","quantity","sortOrder"}
  p_items jsonb
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_enquiry_id uuid;
  v_reference_no text;
  v_attempt int := 0;
  v_item jsonb;
begin
  loop
    v_attempt := v_attempt + 1;
    v_reference_no := 'IV-' || to_char(now(), 'YYYY') || '-' || lpad(floor(random() * 1000000)::text, 6, '0');

    begin
      insert into private.enquiries (
        reference_no, type, market, subject,
        first_name, last_name, company, job_title, email, phone,
        project_name, project_location, project_type, project_stage, estimated_quantity, required_date, interested_systems,
        product_system, product_series, model_code, information_required, documents_required,
        message, source_context
      ) values (
        v_reference_no, p_type, p_market, p_subject,
        p_first_name, p_last_name, p_company, p_job_title, p_email, p_phone,
        p_project_name, p_project_location, p_project_type, p_project_stage, p_estimated_quantity, p_required_date, p_interested_systems,
        p_product_system, p_product_series, p_model_code, p_information_required, p_documents_required,
        p_message, p_source_context
      )
      returning id into v_enquiry_id;

      exit;
    exception when unique_violation then
      if v_attempt >= 5 then
        raise exception 'submit_enquiry: could not generate a unique reference number';
      end if;
      -- retry the loop with a freshly generated reference_no
    end;
  end loop;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    insert into private.enquiry_items (
      enquiry_id, sort_order, client_item_id, title, system, model, category_label, source_route, quantity
    ) values (
      v_enquiry_id,
      coalesce((v_item->>'sortOrder')::int, 0),
      v_item->>'clientItemId',
      v_item->>'title',
      v_item->>'system',
      v_item->>'model',
      v_item->>'categoryLabel',
      v_item->>'sourceRoute',
      v_item->>'quantity'
    );
  end loop;

  return v_reference_no;
end;
$$;

comment on function public.submit_enquiry is
  'Atomic insert into private.enquiries + private.enquiry_items with a generated reference number. SECURITY DEFINER — the only write path into those tables. Granted to service_role only.';

revoke all on function public.submit_enquiry from public;
grant execute on function public.submit_enquiry to service_role;
