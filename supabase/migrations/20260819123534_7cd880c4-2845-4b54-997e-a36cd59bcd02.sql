DROP POLICY IF EXISTS "Admins manage their own batches (select)" ON public.sales_lead_batches;
DROP POLICY IF EXISTS "Admins manage their own batches (insert)" ON public.sales_lead_batches;
DROP POLICY IF EXISTS "Admins manage their own batches (update)" ON public.sales_lead_batches;
DROP POLICY IF EXISTS "Admins manage their own batches (delete)" ON public.sales_lead_batches;
CREATE POLICY "Admins manage all batches" ON public.sales_lead_batches FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage their own leads (select)" ON public.sales_leads;
DROP POLICY IF EXISTS "Admins manage their own leads (insert)" ON public.sales_leads;
DROP POLICY IF EXISTS "Admins manage their own leads (update)" ON public.sales_leads;
DROP POLICY IF EXISTS "Admins manage their own leads (delete)" ON public.sales_leads;
CREATE POLICY "Admins manage all leads" ON public.sales_leads FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales_lead_batches TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales_leads TO authenticated;