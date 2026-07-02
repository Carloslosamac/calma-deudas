DROP INDEX IF EXISTS public.sales_leads_created_by_external_id_key;
CREATE UNIQUE INDEX sales_leads_batch_external_id_key
  ON public.sales_leads (batch_id, external_id)
  WHERE external_id IS NOT NULL AND batch_id IS NOT NULL;