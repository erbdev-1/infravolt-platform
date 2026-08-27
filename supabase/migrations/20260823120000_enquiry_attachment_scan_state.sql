-- Malware-scan state for private.enquiry_attachments, and the RPCs that
-- enforce "a file is never downloadable to staff until scan_status =
-- 'clean'". public.get_clean_attachment_for_download() is the single,
-- centralized gate — it is the ONLY function that confirms an object is
-- safe to sign a download URL for (see src/modules/enquiry/email.ts); no
-- other code path may mint a signed URL for an attachment.

alter table private.enquiry_attachments
  add column scan_status text not null default 'pending'
    check (scan_status in ('pending', 'clean', 'infected', 'scan_failed')),
  add column scanned_at timestamptz,
  add column scanner_provider text,
  add column sha256 text,
  add column scan_notes text;

create index enquiry_attachments_scan_status_idx on private.enquiry_attachments (scan_status);

comment on column private.enquiry_attachments.scan_status is
  'pending (default) | clean | infected | scan_failed. Only clean may ever be signed for staff download.';

-- public.update_attachment_scan_result() — the only write path for scan
-- state, called by the malware-scan integration after a real scan
-- completes (src/modules/enquiry/malware-scan.ts). SECURITY DEFINER,
-- service_role only.
create function public.update_attachment_scan_result(
  p_storage_object_path text,
  p_scan_status text,
  p_scanner_provider text default null,
  p_sha256 text default null,
  p_scan_notes text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_scan_status not in ('pending', 'clean', 'infected', 'scan_failed') then
    raise exception 'update_attachment_scan_result: invalid scan_status';
  end if;

  update private.enquiry_attachments
  set scan_status = p_scan_status,
      scanned_at = now(),
      scanner_provider = p_scanner_provider,
      sha256 = coalesce(p_sha256, sha256),
      scan_notes = p_scan_notes
  where storage_object_path = p_storage_object_path;
end;
$$;

comment on function public.update_attachment_scan_result is
  'Records a malware-scan result for one attachment, looked up by its storage object path. SECURITY DEFINER — service_role only.';

revoke all on function public.update_attachment_scan_result from public;
grant execute on function public.update_attachment_scan_result to service_role;

-- public.list_enquiry_attachments_for_email() — every attachment for an
-- enquiry with its current scan_status, so the internal notification can
-- render the correct per-status message. SECURITY DEFINER, service_role only.
create function public.list_enquiry_attachments_for_email(p_reference_no text)
returns table (
  file_name text,
  storage_object_path text,
  content_type text,
  size_bytes bigint,
  scan_status text
)
language sql
security definer
set search_path = ''
stable
as $$
  select ea.file_name, ea.storage_object_path, ea.content_type, ea.size_bytes, ea.scan_status
  from private.enquiry_attachments ea
  join private.enquiries e on e.id = ea.enquiry_id
  where e.reference_no = p_reference_no
  order by ea.created_at;
$$;

comment on function public.list_enquiry_attachments_for_email is
  'Lists every attachment (with scan_status) for an enquiry, for the internal notification email. SECURITY DEFINER — service_role only.';

revoke all on function public.list_enquiry_attachments_for_email from public;
grant execute on function public.list_enquiry_attachments_for_email to service_role;

-- public.get_clean_attachment_for_download() — returns exactly one row
-- IF AND ONLY IF the object belongs to the given enquiry reference AND
-- has scan_status = 'clean'. Empty result means "do not sign a download
-- URL" — this is the single centralized authorization gate; no other
-- function/query may be used to justify minting a signed URL.
create function public.get_clean_attachment_for_download(p_reference_no text, p_storage_object_path text)
returns table (file_name text, content_type text)
language sql
security definer
set search_path = ''
stable
as $$
  select ea.file_name, ea.content_type
  from private.enquiry_attachments ea
  join private.enquiries e on e.id = ea.enquiry_id
  where e.reference_no = p_reference_no
    and ea.storage_object_path = p_storage_object_path
    and ea.scan_status = 'clean';
$$;

comment on function public.get_clean_attachment_for_download is
  'Returns one row only if the object belongs to the given enquiry and scan_status = clean. Empty result = do not sign. SECURITY DEFINER — service_role only.';

revoke all on function public.get_clean_attachment_for_download from public;
grant execute on function public.get_clean_attachment_for_download to service_role;
