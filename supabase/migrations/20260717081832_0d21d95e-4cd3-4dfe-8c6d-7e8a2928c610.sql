ALTER TABLE public.seo_index_checks
  ADD COLUMN IF NOT EXISTS discovered_outside_sitemap boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS google_canonical text,
  ADD COLUMN IF NOT EXISTS user_canonical text;