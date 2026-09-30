/*
# Create muni_configurations table (single-tenant, no auth)

1. New Tables
- `muni_configurations`
- `id` (uuid, primary key)
- `experience` (text, nullable) — experiencia seleccionada: calma, exploracion, manipulacion, acompanamiento
- `textures` (text[], nullable) — texturas seleccionadas (multiple)
- `reliefs` (text[], nullable) — relieves seleccionados (multiple)
- `squeeze_zone` (text, nullable) — zona para apretar: blanda, crunchi, ninguna
- `motor_skills` (text[], nullable) — elementos de motricidad (multiple)
- `communication_cards` (text[], nullable) — tarjetas de comunicacion (multiple)
- `weight` (text, nullable) — sin peso, con peso
- `weight_level` (text, nullable) — carga baja, media, alta
- `textile_source` (text, nullable) — propia, muni
- `custom_garment_desc` (text, nullable) — descripcion de la prenda a reutilizar
- `contact_name` (text, nullable) — nombre del solicitante
- `contact_phone` (text, nullable) — telefono del solicitante
- `contact_email` (text, nullable) — email del solicitante
- `status` (text, default 'pending')
- `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `muni_configurations`.
- Allow anon + authenticated INSERT only.
- No SELECT/UPDATE/DELETE from the frontend.
*/

CREATE TABLE IF NOT EXISTS muni_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experience text,
  textures text[],
  reliefs text[],
  squeeze_zone text,
  motor_skills text[],
  communication_cards text[],
  weight text,
  weight_level text,
  textile_source text,
  custom_garment_desc text,
  contact_name text,
  contact_phone text,
  contact_email text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE muni_configurations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_muni_configurations" ON muni_configurations;
CREATE POLICY "anon_insert_muni_configurations"
ON muni_configurations FOR INSERT
TO anon, authenticated
WITH CHECK (true);
