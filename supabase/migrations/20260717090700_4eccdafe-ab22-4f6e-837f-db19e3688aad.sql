SELECT cron.schedule(
  'regenerate-blog-heroes-batch',
  '*/5 * * * *',
  $$
  SELECT net.http_get(
    url := 'https://tjmaeeagoenecoiqwyld.supabase.co/functions/v1/regenerate-blog-heroes?limit=3',
    headers := '{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbWFlZWFnb2VuZWNvaXF3eWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMjY4NzQsImV4cCI6MjA3NjcwMjg3NH0.fWRo-SkqWbH8OuKt7ZukpETILMMStnoGLklIAxFqq1k"}'::jsonb
  );
  $$
);