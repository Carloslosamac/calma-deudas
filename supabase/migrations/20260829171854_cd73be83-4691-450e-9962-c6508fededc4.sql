ALTER TABLE public.generated_posts
  ADD COLUMN IF NOT EXISTS direct_answer text,
  ADD COLUMN IF NOT EXISTS reviewer text,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS content_updated_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS bridge jsonb;

CREATE TABLE IF NOT EXISTS public.site_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  event_name text NOT NULL,
  page_path text,
  page_type text,
  cta_id text,
  cta_label text,
  placement text,
  target_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb
);

GRANT INSERT ON public.site_events TO anon, authenticated;
GRANT SELECT ON public.site_events TO authenticated;
GRANT ALL ON public.site_events TO service_role;

ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log site events"
  ON public.site_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read site events"
  ON public.site_events FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS site_events_created_at_idx ON public.site_events (created_at DESC);
CREATE INDEX IF NOT EXISTS site_events_name_idx ON public.site_events (event_name);