ALTER TABLE public.seo_index_checks
  ADD COLUMN IF NOT EXISTS requested boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS requested_at timestamptz;

-- Mejor esfuerzo: las marcas manuales existentes se conservan como solicitadas
UPDATE public.seo_index_checks
SET requested = done,
    requested_at = COALESCE(done_at, requested_at)
WHERE done = true AND requested = false;