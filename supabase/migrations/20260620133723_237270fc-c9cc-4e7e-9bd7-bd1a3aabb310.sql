CREATE TABLE public.generator_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  status text NOT NULL DEFAULT 'running',
  source text NOT NULL DEFAULT 'cron',
  target integer,
  published_count integer NOT NULL DEFAULT 0,
  failed_count integer NOT NULL DEFAULT 0,
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.generator_runs TO authenticated;
GRANT ALL ON public.generator_runs TO service_role;

ALTER TABLE public.generator_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view generator runs"
ON public.generator_runs FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_generator_runs_started_at ON public.generator_runs (started_at DESC);