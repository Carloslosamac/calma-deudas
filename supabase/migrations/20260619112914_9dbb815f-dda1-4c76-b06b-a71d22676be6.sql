CREATE TABLE public.zoho_tokens (
  id INTEGER PRIMARY KEY DEFAULT 1,
  refresh_token TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT zoho_tokens_singleton CHECK (id = 1)
);

GRANT ALL ON public.zoho_tokens TO service_role;

ALTER TABLE public.zoho_tokens ENABLE ROW LEVEL SECURITY;
-- No policies: only the service role (edge functions) can access this table.