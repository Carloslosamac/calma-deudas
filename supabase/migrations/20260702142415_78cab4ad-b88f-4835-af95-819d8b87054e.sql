CREATE TABLE public.sales_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id text,
  name text,
  phone text,
  email text,
  lead_status text NOT NULL DEFAULT 'Sin contactar',
  debt numeric,
  income numeric,
  expense numeric,
  employment text,
  housing text,
  vehicle text,
  is_default boolean,
  source text,
  appointment_at text,
  tier text,
  raw jsonb,
  sales_case_id uuid,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales_leads TO authenticated;
GRANT ALL ON public.sales_leads TO service_role;

ALTER TABLE public.sales_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage their own leads (select)"
  ON public.sales_leads FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid());

CREATE POLICY "Admins manage their own leads (insert)"
  ON public.sales_leads FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid());

CREATE POLICY "Admins manage their own leads (update)"
  ON public.sales_leads FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid())
  WITH CHECK (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid());

CREATE POLICY "Admins manage their own leads (delete)"
  ON public.sales_leads FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid());

CREATE UNIQUE INDEX sales_leads_created_by_external_id_key
  ON public.sales_leads (created_by, external_id)
  WHERE external_id IS NOT NULL;

CREATE TRIGGER update_sales_leads_updated_at
  BEFORE UPDATE ON public.sales_leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();