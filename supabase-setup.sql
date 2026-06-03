-- ══════════════════════════════════════════════════════════════
--  À exécuter dans Supabase → SQL Editor (une seule fois)
--  Crée la table des demandes de contact + la politique d'accès.
-- ══════════════════════════════════════════════════════════════

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  firstname text,
  name text not null,
  email text not null,
  phone text,
  company text,
  business_type text,
  message text not null
);

-- Si la table existe DÉJÀ (créée avant), ajoute les nouvelles colonnes :
alter table contact_requests add column if not exists firstname text;
alter table contact_requests add column if not exists company text;
alter table contact_requests add column if not exists business_type text;

-- Active la sécurité au niveau des lignes
alter table contact_requests enable row level security;

-- Autorise UNIQUEMENT l'insertion depuis le formulaire public (clé anon).
-- La lecture reste impossible avec la clé anon → le dashboard lit via la
-- clé service_role qui contourne RLS côté serveur.
create policy "allow_anonymous_inserts"
  on contact_requests
  for insert
  to anon
  with check (true);
