/*
# Create donations table (single-tenant, no auth)

1. New Tables
- `donations`
- `id` (uuid, primary key)
- `full_name` (text, not null) — nombre y apellido del donante
- `phone` (text, not null) — teléfono o WhatsApp
- `email` (text, nullable) — email opcional
- `clothing_type` (text, not null) — tipo de ropa (remeras, pantalones, buzos, vestidos, etc.)
- `quantity` (text, not null) — cantidad aproximada de prendas
- `condition` (text, not null) — estado de la ropa (muy buen estado, buen estado, con pequeños detalles)
- `delivery_method` (text, not null) — preferencia de entrega (punto de entrega / coordinar retiro)
- `location` (text, not null) — localidad o zona
- `notes` (text, nullable) — observaciones adicionales
- `status` (text, default 'pending') — estado interno de la donación
- `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `donations`.
- Allow anon + authenticated INSERT only (anyone can submit a donation).
- No SELECT/UPDATE/DELETE from the frontend — donations are managed internally.
*/

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  clothing_type text NOT NULL,
  quantity text NOT NULL,
  condition text NOT NULL,
  delivery_method text NOT NULL,
  location text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_donations" ON donations;
CREATE POLICY "anon_insert_donations"
ON donations FOR INSERT
TO anon, authenticated
WITH CHECK (true);
