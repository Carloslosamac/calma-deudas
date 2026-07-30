Diagnóstico confirmado (leído en el código desplegado):

- El prompt actual pide literalmente “objetos usados”, “marcas de desgaste”, “polvo leve”, “paredes gastadas”, “bolígrafo barato”, “mesa de formica”, “portal antiguo”. De ahí la sensación de sucio y pobre.
- Además prohíbe cualquier presencia humana (“CERO HUMANOS”), lo que empuja a portadas frías de objetos aislados.

Nueva dirección visual: personas SÍ, stock NO.

1. Reabrir la presencia humana con reglas duras
   - Permitido: 1 persona (excepcionalmente 2 si la escena lo justifica), integrada en un entorno real, haciendo algo cotidiano y creíble.
   - Persona no protagonista de catálogo: puede aparecer de espaldas, de perfil, parcialmente cortada por el encuadre o a media distancia.
   - Prohibido: mirar a cámara, sonrisa de catálogo, pose de anuncio, gestos de "preocupación" teatral, manos entrelazadas sobre la mesa, asesor+cliente frente a un portátil, familia perfecta, apretón de manos.

2. Matar el look stock por entorno, no por ausencia de gente
   - Prohibido: fondos blancos, oficinas neutras luminosas, salas acristaladas, paredes lisas sin contexto, mobiliario de catálogo, plantas decorativas de escaparate.
   - Obligatorio: entorno español identificable y con contexto (cocina real, terraza de bar, portal de vecinos, calle con toldos, mostrador de comercio local, oficina modesta con objetos reales).

3. Quitar el sesgo "pobre/sucio" del prompt
   - Eliminar: polvo, desgaste, suciedad, deterioro, objetos rotos, "cutre", "barato", "antiguo".
   - Sustituir por: cotidiano, ordenado, digno, vivido pero cuidado.
   - Mantener imperfección fotográfica (encuadre, luz, ruido), no imperfección social.

4. Reescribir el bloque de escenas
   - Actualizar `SCENE_RULES` y `DEFAULT_VARIANTS` para que muchas variantes incluyan una persona en acción concreta y creíble, por ejemplo:
     - alguien abriendo el buzón en un portal de vecinos
     - alguien mirando el móvil en una terraza de bar
     - alguien sacando dinero en un cajero de calle
     - alguien en el mostrador de su propio negocio
     - alguien cerrando la puerta de casa con las llaves
   - Conservar variantes sin personas para dar ritmo visual entre posts.

5. Reescribir el prompt final en ambas funciones
   - `supabase/functions/generate-daily-posts/index.ts`
   - `supabase/functions/regenerate-blog-hero/index.ts`

   Intención resultante:

   ```text
   fotografía realista tipo móvil en España, cotidiana, limpia y digna;
   puede aparecer 1 persona natural e integrada, nunca posando ni mirando a cámara;
   entorno real con contexto, nunca fondo blanco ni oficina neutra;
   nada de banco de imágenes, nada de suciedad ni estética de pobreza.
   ```

6. Validar con muestra corta antes del barrido
   - Desplegar y regenerar solo los últimos 4 posts.
   - Revisar visualmente y comparar contra el feed actual.

7. Barrido posterior
   - Si la muestra convence, regenerar el resto de posts automáticos recientes.
   - No tocar imágenes manuales ni las de guías pilares salvo petición expresa.