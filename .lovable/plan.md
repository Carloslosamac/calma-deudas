Objetivo: reemplazar la imagen pilar de `cancelar microcréditos` por una que se entienda a simple vista, manteniendo el estilo documental del resto de imágenes del blog.

Problema actual
- La imagen actual (`blog-pilar-microcréditos.jpg`) muestra a una persona cerrando un portátil con un recibo "PAID IN FULL". El usuario considera que no se entiende el tema a simple vista y parece más una escena de ahorro que de cancelar microcréditos.

Solución propuesta
- Nuevo concepto: recibos o avales de microcréditos arrugados y tirados a la papelera.
- Estilo: fotografía documental, luz natural, grano de 35 mm, plano cercano, sin marcas ni logotipos bancarios reales, contexto español/europeo.
- Mensaje visual: deshacerse de los microcréditos de forma definitiva.

Tareas
1. Generar `src/assets/blog-pilar-microcreditos.jpg` con el concepto aprobado (recibos arrugados en papelera).
2. Asegurar coherencia estilística con las otras tres imágenes pilares (documental, luz natural, grano 35 mm).
3. Revisar en el preview del blog que la imagen se lea claramente como "microcréditos" y que no se confunda con cancelar deudas, reunificación o revolving.
4. No se requieren cambios de código: el componente `Blog.tsx` ya importa `src/assets/blog-pilar-microcreditos.jpg`.

Criterios de aceptación
- La imagen transmite el tema a primera vista.
- No aparecen logotipos bancarios reales ni textos en inglés fuera de lugar.
- Mantiene el mismo tono fotográfico que el resto de pilares.
- Se visualiza correctamente en la tarjeta del blog sin recortes ni distorsiones.