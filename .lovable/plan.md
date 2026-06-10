## Objetivo
Reordenar las secciones de la landing `/abogados-ley-segunda-oportunidad` para que sigan una lógica de conversión clara: enganchar, dar valor, explicar el proceso, cualificar, demostrar con pruebas sociales y cerrar con CTA. Todo el cambio se hace en un único array (`layout`), sin tocar componentes ni estilos.

## Situación actual
Estructura fija (no se toca): Hero con CTA → Barra de confianza → [módulos del `layout`] → bloque E-E-A-T → enlaces relacionados → Formulario `#hero-form`.

Orden actual del `layout`:
1. simulator (simulador de deuda)
2. benefits (beneficios)
3. teamCredentials (equipo de 20 personas)
4. steps (paso a paso)
5. quiz (test de elegibilidad)
6. metrics (cifras)
7. testimonials (testimonios)
8. sections (contenido SEO largo)
9. eligibility (requisitos)
10. faq
11. beforeAfter (antes/después)
12. closing (CTA final)

Problemas de conversión detectados:
- El equipo de 20 personas (`teamCredentials`) está en posición 3, muy arriba: es un bloque enorme que empuja el funnel hacia abajo antes de explicar el proceso.
- El contenido SEO largo (`sections`) está en mitad del funnel (pos. 8), separando la prueba social de los requisitos y el cierre.
- Las pruebas sociales (metrics, testimonials, beforeAfter, equipo) están dispersas en vez de agrupadas en un bloque de confianza.
- `debtTypes` (selector "¿Qué tipo de deuda tienes?") tiene datos pero **no está en el `layout`, así que no se renderiza**. Es un módulo de engagement útil y está desaprovechado.

## Orden propuesto (optimizado para conversión)
Reescribir el array `layout` así:
1. simulator — gancho interactivo inmediato
2. debtTypes — segundo micro-engagement (recuperado)
3. benefits — propuesta de valor / por qué Calma
4. metrics — cifras de confianza rápidas
5. steps — cómo funciona, paso a paso
6. quiz — cualificación / micro-conversión
7. eligibility — "¿cumplo los requisitos?"
8. testimonials — prueba social
9. beforeAfter — prueba de resultados
10. teamCredentials — equipo / E-E-A-T como cierre de confianza
11. sections — contenido SEO en profundidad (hacia el final)
12. faq — manejo de objeciones
13. closing — CTA final

Lógica: enganchar (1-2) → valor y confianza inicial (3-4) → proceso (5) → cualificar (6-7) → demostrar (8-10) → contenido profundo + objeciones (11-12) → cerrar (13).

## Detalles técnicos
- Único archivo a editar: `src/data/seo/content/abogadosLeySegundaOportunidad.tsx`, array `layout` (líneas 47-60).
- Añadir `"debtTypes"` al array (recupera el módulo ya existente, líneas 357-401).
- No se modifica `MoneyJourney.tsx` ni ningún componente: cada bloque solo se pinta si tiene datos, y el orden lo dicta este array.
- El CTA del hero y el bloque E-E-A-T/relacionados/formulario siguen igual. Los CTAs siguen apuntando a `#hero-form`.

## Nota
Si prefieres mantener `debtTypes` oculto, lo dejo fuera del array; mi recomendación es incluirlo por su valor de engagement.
