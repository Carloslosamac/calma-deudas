ALTER TABLE public.sales_leads
  ADD COLUMN IF NOT EXISTS zoho_sync_status text,
  ADD COLUMN IF NOT EXISTS zoho_synced_at timestamptz,
  ADD COLUMN IF NOT EXISTS zoho_sync_error text;