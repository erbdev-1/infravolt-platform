-- `public`, RLS ve açık nesne grant'larıyla yönetilen uygulama Data API yüzeyidir.
comment on schema public is
  'InfraVolt application schema; exposed objects require explicit grants and RLS.';

-- İç operasyon nesneleri Data API şema listesine alınmaz ve browser rollerine açılmaz.
create schema if not exists private authorization postgres;
comment on schema private is
  'InfraVolt internal schema; access is limited to explicitly authorised server paths.';

-- Pseudo-role `public` tüm rolleri kapsadığı için önce geniş varsayımlar kaldırılır.
revoke all on schema public from public;
revoke all on schema private from public;

-- Browser rolleri yalnız açıkça izin verilen `public` nesnelerine erişebilir.
grant usage on schema public to anon, authenticated, service_role;
revoke create on schema public from anon, authenticated, service_role;

-- `service_role` şemayı çözebilir; gelecekteki private nesneler ayrıca yetkilendirilmelidir.
grant usage on schema private to service_role;
revoke all on schema private from anon, authenticated;
revoke create on schema private from service_role;

-- Yeni nesneler browser rollerine kendiliğinden açılmasın diye varsayılan yetkiler deny-by-default'tur.
-- PostgreSQL function EXECUTE yetkisini global `PUBLIC` default'undan verdiği için revoke schema kapsamından önce uygulanır.
alter default privileges for role postgres
  revoke execute on functions from public;
alter default privileges for role postgres in schema public
  revoke all on tables from public, anon, authenticated, service_role;
alter default privileges for role postgres in schema public
  revoke all on sequences from public, anon, authenticated, service_role;
alter default privileges for role postgres in schema public
  revoke execute on functions from public, anon, authenticated, service_role;

-- Private nesneler için de her erişim ihtiyacı nesne bazında ve ayrı migration ile verilmelidir.
alter default privileges for role postgres in schema private
  revoke all on tables from public, anon, authenticated, service_role;
alter default privileges for role postgres in schema private
  revoke all on sequences from public, anon, authenticated, service_role;
alter default privileges for role postgres in schema private
  revoke execute on functions from public, anon, authenticated, service_role;
