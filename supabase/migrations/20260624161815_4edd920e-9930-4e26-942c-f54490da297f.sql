CREATE TABLE public.sales_cases (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
  case_text text NOT NULL,
  guide_fields jsonb NOT NULL DEFAULT '{}'::jsonb,
  triage_solution text,
  triage_title text,
  diagnosis_internal text,
  diagnosis_client text,
  solution_internal text,
  solution_client text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales_cases TO authenticated;
GRANT ALL ON public.sales_cases TO service_role;

ALTER TABLE public.sales_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view sales cases"
ON public.sales_cases FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert sales cases"
ON public.sales_cases FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sales cases"
ON public.sales_cases FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sales cases"
ON public.sales_cases FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_sales_cases_updated_at
BEFORE UPDATE ON public.sales_cases
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();