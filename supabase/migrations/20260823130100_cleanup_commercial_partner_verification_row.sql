-- One-off cleanup: removes the single row inserted while manually
-- verifying public.submit_commercial_partner_application() end-to-end
-- against hosted infravolt-production immediately after
-- 20260823130000_commercial_partner_application_rpc.sql was applied. No
-- application code depends on this migration; it exists only so hosted
-- production never carries test data.
delete from private.commercial_partner_applications
where reference_no = 'IV-CP-2026-415873'
  and company_name = '__vitest_verification_probe__';
