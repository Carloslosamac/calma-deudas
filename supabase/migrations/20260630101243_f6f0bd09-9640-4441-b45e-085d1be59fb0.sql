ALTER TABLE public.seo_index_checks
  ADD COLUMN IF NOT EXISTS verdict text,
  ADD COLUMN IF NOT EXISTS coverage_state text,
  ADD COLUMN IF NOT EXISTS indexed boolean,
  ADD COLUMN IF NOT EXISTS last_crawl_time timestamptz,
  ADD COLUMN IF NOT EXISTS last_inspected_at timestamptz;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_index_checks TO authenticated;
GRANT ALL ON public.seo_index_checks TO service_role;