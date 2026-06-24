CREATE TABLE public.seo_index_checks (
  url TEXT PRIMARY KEY,
  done BOOLEAN NOT NULL DEFAULT true,
  done_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_index_checks TO authenticated;
GRANT ALL ON public.seo_index_checks TO service_role;

ALTER TABLE public.seo_index_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage index checks"
  ON public.seo_index_checks FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_seo_index_checks_updated_at
  BEFORE UPDATE ON public.seo_index_checks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();