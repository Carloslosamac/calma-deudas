ALTER TABLE public.generated_posts
  ADD COLUMN IF NOT EXISTS tldr text,
  ADD COLUMN IF NOT EXISTS key_takeaways text[] DEFAULT '{}'::text[];