CREATE TABLE public.web_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text,
  email text,
  phone text,
  debt_amount numeric,
  entities text[],
  payload jsonb NOT NULL,
  page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  user_agent text,
  zoho_lead_id text,
  zoho_status text NOT NULL DEFAULT 'pending',
  zoho_error text,
  retry_count integer NOT NULL DEFAULT 0
);

GRANT SELECT, UPDATE ON public.web_submissions TO authenticated;
GRANT ALL ON public.web_submissions TO service_role;

ALTER TABLE public.web_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read web submissions"
  ON public.web_submissions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update web submissions"
  ON public.web_submissions
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER web_submissions_updated_at
  BEFORE UPDATE ON public.web_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_web_submissions_created_at ON public.web_submissions (created_at DESC);
CREATE INDEX idx_web_submissions_status ON public.web_submissions (zoho_status);