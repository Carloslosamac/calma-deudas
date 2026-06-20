CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.seo_roadmap (
  id bigint PRIMARY KEY,
  titulo text NOT NULL,
  cluster text,
  intencion text,
  tipo_pagina text,
  prioridad text,
  sprint text,
  url_sugerida text,
  entidad text,
  keywords text[] DEFAULT '{}',
  estado text NOT NULL DEFAULT 'backlog',
  post_slug text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.seo_roadmap TO authenticated;
GRANT ALL ON public.seo_roadmap TO service_role;
ALTER TABLE public.seo_roadmap ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roadmap readable by authenticated" ON public.seo_roadmap FOR SELECT TO authenticated USING (true);
CREATE INDEX idx_roadmap_estado_prioridad ON public.seo_roadmap (estado, prioridad);
CREATE TRIGGER update_seo_roadmap_updated_at BEFORE UPDATE ON public.seo_roadmap FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.generated_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  read_time text,
  authors text[] NOT NULL DEFAULT '{}',
  hero_image text,
  hero_alt text,
  sections jsonb NOT NULL DEFAULT '[]',
  faq jsonb NOT NULL DEFAULT '[]',
  keywords text[] DEFAULT '{}',
  seo_title text,
  meta_description text,
  sidebar jsonb,
  roadmap_id bigint REFERENCES public.seo_roadmap(id),
  status text NOT NULL DEFAULT 'published',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.generated_posts TO anon, authenticated;
GRANT ALL ON public.generated_posts TO service_role;
ALTER TABLE public.generated_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "published posts are public" ON public.generated_posts FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE INDEX idx_generated_posts_status_pub ON public.generated_posts (status, published_at DESC);
CREATE TRIGGER update_generated_posts_updated_at BEFORE UPDATE ON public.generated_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();