DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;

DROP POLICY IF EXISTS "Anyone can log site events" ON public.site_events;
CREATE POLICY "Anyone can log site events" ON public.site_events
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(event_name) BETWEEN 1 AND 100
  AND coalesce(length(page_path),0) <= 2000
  AND coalesce(length(page_type),0) <= 100
  AND coalesce(length(cta_id),0) <= 200
  AND coalesce(length(cta_label),0) <= 500
  AND coalesce(length(placement),0) <= 200
  AND coalesce(length(target_url),0) <= 2000
  AND coalesce(length(referrer),0) <= 2000
  AND coalesce(length(utm_source),0) <= 500
  AND coalesce(length(utm_medium),0) <= 500
  AND coalesce(length(utm_campaign),0) <= 500
  AND coalesce(length(utm_term),0) <= 500
  AND coalesce(length(utm_content),0) <= 500
  AND pg_column_size(meta) <= 8192
);

DROP POLICY IF EXISTS "Anyone can log orphan gracias hits" ON public.orphan_gracias_hits;
CREATE POLICY "Anyone can log orphan gracias hits" ON public.orphan_gracias_hits
FOR INSERT TO anon, authenticated
WITH CHECK (
  coalesce(length(referrer),0) <= 2000
  AND coalesce(length(user_agent),0) <= 500
  AND coalesce(length(page),0) <= 2000
  AND coalesce(length(utm_source),0) <= 500
  AND coalesce(length(utm_medium),0) <= 500
  AND coalesce(length(utm_campaign),0) <= 500
  AND coalesce(length(utm_term),0) <= 500
  AND coalesce(length(utm_content),0) <= 500
);