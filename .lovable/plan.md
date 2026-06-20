## Objetivo

Que el CTA de cada post (título, descripción y, sobre todo, el `buttonLabel`) esté siempre orientado al intent del artículo, y dejarlo como regla de sistema para futuros posts.

## Diagnóstico

Casi todos los CTA ya tienen título/descripción específicos del intent. Solo 3 posts usan el `buttonLabel` genérico "Analizar mi caso gratis":

```text
cancelar-microcreditos            -> Cancelar mis microcréditos
deudas-hacienda-seguridad-social  -> Resolver mi deuda pública
juicio-monitorio-deuda            -> Frenar el juicio monitorio
```

El resto ya están bien orientados (Parar mi embargo, Revisar mi tarjeta gratis, Salir de ASNEF, Renegociar mi deuda, Salvar mi negocio, Comprobar requisitos, Cancelar mi deuda, Empezar de cero, etc.) y no se tocan.

## Cambios

1. En esos 3 archivos `src/data/blog/posts/*.tsx`, cambiar el `buttonLabel` del `<InlineCTA>` por la versión orientada al intent (lista de arriba). Título y descripción se mantienen.
2. Verificar que todos los CTA siguen apuntando a `#hero-form` (ya es el comportamiento del componente `InlineCTA`, que enlaza a `/#hero-form`).

## Regla de sistema (memoria)

Guardar/actualizar una memoria de tipo `feature`/`preference`:
- Todo post debe incluir al menos un `InlineCTA` cuyo `buttonLabel`, título y descripción reflejen el intent específico del post (la acción que el lector quiere realizar), nunca un CTA genérico tipo "Analizar mi caso gratis".
- El CTA sigue apuntando siempre a `#hero-form` (regla core ya existente).
- Ejemplos de mapping intent → label para reutilizar en nuevos posts.

## Notas técnicas

- Solo se edita el campo `buttonLabel` en 3 posts y se añade una memoria. Sin cambios en el componente `InlineCTA` ni en la lógica.
