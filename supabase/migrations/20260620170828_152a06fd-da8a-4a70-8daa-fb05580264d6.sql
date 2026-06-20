GRANT SELECT ON public.seo_roadmap TO authenticated;
GRANT ALL ON public.seo_roadmap TO service_role;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

GRANT SELECT ON public.generated_posts TO anon, authenticated;
GRANT ALL ON public.generated_posts TO service_role;

GRANT SELECT ON public.generator_runs TO authenticated;
GRANT ALL ON public.generator_runs TO service_role;

GRANT SELECT ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;