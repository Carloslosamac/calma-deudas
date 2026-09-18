ALTER TABLE public.generated_posts
  ADD COLUMN IF NOT EXISTS quality_score integer,
  ADD COLUMN IF NOT EXISTS quality_notes text[] NOT NULL DEFAULT '{}'::text[];

-- Admins need write access to manage retained posts and clean the roadmap.
DROP POLICY IF EXISTS "Admins manage generated posts" ON public.generated_posts;
CREATE POLICY "Admins manage generated posts"
ON public.generated_posts
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins manage roadmap" ON public.seo_roadmap;
CREATE POLICY "Admins manage roadmap"
ON public.seo_roadmap
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.generated_posts TO authenticated;
GRANT SELECT ON public.generated_posts TO anon;
GRANT ALL ON public.generated_posts TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_roadmap TO authenticated;
GRANT ALL ON public.seo_roadmap TO service_role;