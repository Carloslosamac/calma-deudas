
-- Función de saneamiento: cierra generator_runs que llevan >30 min en "running"
-- (edge functions mueren por timeout sin poder actualizar el registro).
CREATE OR REPLACE FUNCTION public.close_stale_generator_runs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  closed_count integer;
BEGIN
  UPDATE public.generator_runs
  SET
    status = 'failed',
    finished_at = now(),
    error = COALESCE(error, '') ||
      CASE WHEN COALESCE(error, '') = '' THEN '' ELSE ' | ' END ||
      'Cerrado por saneamiento: run colgado >30min (probable timeout del edge function)'
  WHERE status = 'running'
    AND started_at < now() - interval '30 minutes';

  GET DIAGNOSTICS closed_count = ROW_COUNT;
  RETURN closed_count;
END;
$$;

-- Cierra los runs ya colgados de días anteriores.
SELECT public.close_stale_generator_runs();
