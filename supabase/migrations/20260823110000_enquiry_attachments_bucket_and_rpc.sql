-- Creates the private-enquiry-attachments Storage bucket and the RPC used
-- to record attachment metadata after a successful upload.
--
-- Bucket: public = false. storage.objects already has RLS enabled with
-- zero policies for anon/authenticated (verified: `select policyname from
-- pg_policies where schemaname='storage' and tablename='objects'` returns
-- no rows) — service_role bypasses RLS as usual, so no additional policy
-- is needed for "server-side upload only, no public access". No
-- allowed_mime_types restriction is set deliberately: the frontend
-- (src/components/public/contact/file-upload-field.tsx) validates by file
-- EXTENSION, not MIME type, specifically because browsers report MIME
-- types unreliably for CAD formats (DWG/DXF) — a bucket-level MIME
-- allowlist would silently reject legitimate uploads the frontend already
-- accepted, i.e. inventing a stricter rule than the real one. file_size_limit
-- matches the frontend's real MAX_FILE_SIZE_BYTES (25 MiB) exactly.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('private-enquiry-attachments', 'private-enquiry-attachments', false, 26214400, null)
on conflict (id) do nothing;

-- public.record_enquiry_attachment() — the only write path into
-- private.enquiry_attachments, mirroring the submit_enquiry() pattern
-- (private schema is not in the exposed-schemas list). Looks the enquiry
-- up by reference_no (already returned to the caller by submit_enquiry(),
-- so no change to that function's signature/behaviour is needed) rather
-- than taking a raw enquiry_id, keeping submit_enquiry() completely
-- untouched. Called once per file AFTER that file's bytes are already
-- confirmed uploaded to Storage — never before — so a failed upload never
-- produces a metadata row with no backing object.
create function public.record_enquiry_attachment(
  p_reference_no text,
  p_file_name text,
  p_storage_object_path text,
  p_content_type text,
  p_size_bytes bigint
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_enquiry_id uuid;
  v_attachment_id uuid;
begin
  select id into v_enquiry_id
  from private.enquiries
  where reference_no = p_reference_no;

  if v_enquiry_id is null then
    raise exception 'record_enquiry_attachment: unknown enquiry reference';
  end if;

  insert into private.enquiry_attachments (
    enquiry_id, file_name, storage_object_path, content_type, size_bytes
  ) values (
    v_enquiry_id, p_file_name, p_storage_object_path, p_content_type, p_size_bytes
  )
  returning id into v_attachment_id;

  return v_attachment_id;
end;
$$;

comment on function public.record_enquiry_attachment is
  'Records one uploaded attachment for an enquiry (looked up by reference_no) into private.enquiry_attachments. SECURITY DEFINER — the only write path into that table. Granted to service_role only. Call only after the object is confirmed uploaded to the private-enquiry-attachments bucket.';

revoke all on function public.record_enquiry_attachment from public;
grant execute on function public.record_enquiry_attachment to service_role;
