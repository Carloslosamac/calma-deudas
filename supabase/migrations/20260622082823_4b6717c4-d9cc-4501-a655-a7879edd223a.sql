UPDATE public.seo_roadmap
SET titulo = trim(regexp_replace(titulo, '\s*[-–—|]\s*(MiSolvencia\.es|Abogados\s+para\s+tus\s+deudas)\s*$', '', 'i'))
WHERE titulo ~* '\s*[-–—|]\s*(MiSolvencia\.es|Abogados\s+para\s+tus\s+deudas)\s*$';

UPDATE public.generated_posts
SET title = trim(regexp_replace(title, '\s*[-–—|]\s*(MiSolvencia\.es|Abogados\s+para\s+tus\s+deudas)\s*$', '', 'i'))
WHERE title ~* '\s*[-–—|]\s*(MiSolvencia\.es|Abogados\s+para\s+tus\s+deudas)\s*$';