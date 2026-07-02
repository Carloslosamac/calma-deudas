CREATE TABLE public.sales_lead_batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_by UUID NOT NULL,
  lead_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales_lead_batches TO authenticated;
GRANT ALL ON public.sales_lead_batches TO service_role;

ALTER TABLE public.sales_lead_batches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage their own batches (select)" ON public.sales_lead_batches
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());
CREATE POLICY "Admins manage their own batches (insert)" ON public.sales_lead_batches
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());
CREATE POLICY "Admins manage their own batches (update)" ON public.sales_lead_batches
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid())
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());
CREATE POLICY "Admins manage their own batches (delete)" ON public.sales_lead_batches
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());

CREATE TRIGGER update_sales_lead_batches_updated_at
  BEFORE UPDATE ON public.sales_lead_batches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.sales_leads
  ADD COLUMN batch_id UUID REFERENCES public.sales_lead_batches(id) ON DELETE SET NULL;

CREATE INDEX idx_sales_leads_batch_id ON public.sales_leads(batch_id);