
UPDATE public.seo_roadmap SET estado = 'descartado_calidad'
 WHERE id IN (
   SELECT roadmap_id FROM public.generated_posts
   WHERE slug IN (
     'delitos-contra-derechos-trabajdores',
     'diego-c-liquida-sus-deudas-microcreditos-recupera-dinero-soluciona',
     'manuel-cancela-su-deuda-0-euros-recupera-2-807',
     'soluciona-mi-deuda-recibe-subvencion-fondo-social-europeo-plus',
     'crecimiento-precio-alimentos-ralentizara-2024'
   )
 );

DELETE FROM public.generated_posts
 WHERE slug IN (
   'delitos-contra-derechos-trabajdores',
   'diego-c-liquida-sus-deudas-microcreditos-recupera-dinero-soluciona',
   'manuel-cancela-su-deuda-0-euros-recupera-2-807',
   'soluciona-mi-deuda-recibe-subvencion-fondo-social-europeo-plus',
   'crecimiento-precio-alimentos-ralentizara-2024'
 );
