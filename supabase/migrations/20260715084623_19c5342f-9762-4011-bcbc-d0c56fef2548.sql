
REVOKE EXECUTE ON FUNCTION public.close_stale_generator_runs() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.close_stale_generator_runs() FROM anon;
REVOKE EXECUTE ON FUNCTION public.close_stale_generator_runs() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.close_stale_generator_runs() TO service_role;
