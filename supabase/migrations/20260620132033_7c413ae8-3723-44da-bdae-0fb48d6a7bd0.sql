DROP POLICY IF EXISTS "roadmap readable by authenticated" ON public.seo_roadmap;
REVOKE SELECT ON public.seo_roadmap FROM authenticated;