ALTER TABLE public.sales_leads
ADD COLUMN relevant_facts text[] NOT NULL DEFAULT '{}'::text[];