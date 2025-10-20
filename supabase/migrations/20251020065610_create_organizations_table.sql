/*
  # Create Organizations Table

  1. New Tables
    - `organizations`
      - `id` (uuid, primary key)
      - `company_name` (text, not null)
      - `industry` (text, not null)
      - `size` (integer, not null)
      - `status` (text, not null, default 'Active')
      - `first_engagement` (date, not null)
      - `last_engagement` (date, not null)
      - `final_engagement_summary` (text, not null)
      - `icon_color` (text, not null) - hex color for company icon
      - `created_at` (timestamptz, default now())
      
  2. Security
    - Enable RLS on `organizations` table
    - Add policy for authenticated users to read all organizations
    - Add policy for authenticated users to insert organizations
*/

CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  industry text NOT NULL DEFAULT 'SAAS',
  size integer NOT NULL DEFAULT 2000,
  status text NOT NULL DEFAULT 'Active',
  first_engagement date NOT NULL,
  last_engagement date NOT NULL,
  final_engagement_summary text NOT NULL,
  icon_color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read organizations"
  ON organizations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert organizations"
  ON organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert sample data
INSERT INTO organizations (company_name, industry, size, status, first_engagement, last_engagement, final_engagement_summary, icon_color)
VALUES
  ('Aerospace', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#9333EA'),
  ('Healthcare', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#F97316'),
  ('Finance', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#14B8A6'),
  ('Telecommunications', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#3B82F6'),
  ('Education', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#9333EA'),
  ('Retail', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#EC4899'),
  ('Transportation', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#8B5CF6'),
  ('Construction', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#9333EA'),
  ('Energy', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#EF4444'),
  ('Agriculture', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#F59E0B'),
  ('Food & Beverage', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#14B8A6'),
  ('Pharmaceutical', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#EF4444'),
  ('Biotechnology', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#10B981'),
  ('Entertainment', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#F97316'),
  ('Mining', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#3B82F6'),
  ('Logistics', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#8B5CF6'),
  ('Hospitality', 'SAAS', 2000, 'Active', '2025-02-06', '2025-10-06', 'On June 12, 2025, Mark Nickel from', '#10B981')
ON CONFLICT DO NOTHING;