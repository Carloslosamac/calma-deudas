## Objetivo

Disparar **IndexNow** para todas las URLs publicadas de `mi-calma.es`, de forma que Bing, Yandex, Seznam, Naver y Copilot reciban la notificación inmediata de rastreo. (Google no admite indexación masiva por API; esto no le afecta, pero sí acelera el resto de buscadores.)

## Qué se hará

1. Leer el sitemap en vivo (`https://mi-calma.es/sitemap.xml`) y extraer las ~214 URLs.
2. Llamar a la edge function ya desplegada `indexnow-submit` con el lote completo de URLs.
3. Confirmar la respuesta (se espera `202 Accepted` de la API de IndexNow, igual que en la prueba inicial).
4. Reportar cuántas URLs se enviaron y el resultado.

## Notas

- No hay cambios de código. Es una ejecución puntual usando la infraestructura ya creada (clave IndexNow verificada + edge function).
- El archivo de verificación `bcaea9ccc48b727f321e61b3569b63be.txt` ya está publicado y responde 200, así que IndexNow aceptará el envío.
- Si la API rechaza el lote por tamaño, se dividirá en bloques (máx. 10.000 URLs por petición, muy por encima de las 214, así que no debería hacer falta).

## Técnico

- Endpoint interno: edge function `indexnow-submit`, body `{ "urls": [...] }` con rutas/URLs de `mi-calma.es`.
- Verificación posterior con la respuesta HTTP de la función y, opcionalmente, los logs de la edge function.
