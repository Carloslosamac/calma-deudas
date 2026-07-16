
-- Permitir INSERT anónimo en web_submissions restringido a estado inicial 'pending'
CREATE POLICY "Anon can create pending web submissions"
  ON public.web_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (zoho_status = 'pending' AND zoho_lead_id IS NULL AND retry_count = 0);

GRANT INSERT ON public.web_submissions TO anon;

-- Tabla de aterrizajes huérfanos en /gracias (usuario abre sin state)
CREATE TABLE public.orphan_gracias_hits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  referrer text,
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  page text
);

GRANT INSERT ON public.orphan_gracias_hits TO anon;
GRANT SELECT ON public.orphan_gracias_hits TO authenticated;
GRANT ALL ON public.orphan_gracias_hits TO service_role;

ALTER TABLE public.orphan_gracias_hits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log orphan gracias hits"
  ON public.orphan_gracias_hits
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read orphan gracias hits"
  ON public.orphan_gracias_hits
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_orphan_gracias_hits_created_at ON public.orphan_gracias_hits (created_at DESC);
