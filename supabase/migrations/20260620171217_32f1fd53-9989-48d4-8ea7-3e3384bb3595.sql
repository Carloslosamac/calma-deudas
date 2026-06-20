DROP POLICY IF EXISTS "Admins can view roadmap" ON public.seo_roadmap;
DROP POLICY IF EXISTS "Admins can view all generated posts" ON public.generated_posts;
DROP POLICY IF EXISTS "Admins can view generator runs" ON public.generator_runs;

CREATE POLICY "Admins can view roadmap"
ON public.seo_roadmap
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = (SELECT auth.uid())
      AND ur.role = 'admin'::public.app_role
  )
);

CREATE POLICY "Admins can view all generated posts"
ON public.generated_posts
FOR SELECT
TO authenticated
USING (
  status = 'published'
  OR EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = (SELECT auth.uid())
      AND ur.role = 'admin'::public.app_role
  )
);

CREATE POLICY "Admins can view generator runs"
ON public.generator_runs
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = (SELECT auth.uid())
      AND ur.role = 'admin'::public.app_role
  )
);

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;