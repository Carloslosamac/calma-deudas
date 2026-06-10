## Objetivo

Que cada money page deje de ser "la misma plantilla con otro texto" y exprima el ángulo de su servicio, con **módulos visuales propios**, orden y acento diferenciados. Aplicarlo a **las 15 money pages** (las 6 con journey + las 9 que hoy son placeholder) y añadir un hub `/servicios` para reforzar el enlazado interno sin tocar las URLs de keyword.

## Decisión de routing (lo mejor para SEO)

- Las URLs de cada servicio se **mantienen en la raíz** (`/cancelar-deudas`, `/reunificar-deudas`, `/tarjetas-revolving/cancelar-tarjetas-revolving`…). Mover a `/servicios/...` diluiría la keyword y forzaría redirecciones 301 innecesarias. Es la opción correcta para posicionar.
- Se crea **`/servicios`** como página índice/hub navegable que lista todas las soluciones con tarjetas y `ItemList` (structured data). Aporta un hub de enlazado interno y una URL limpia para campañas, sin canibalizar. Se añade al menú y al footer.

## Cómo se logra la diferenciación (clave del encargo)

Hoy `MoneyJourney` renderiza SIEMPRE el mismo orden fijo de bloques. Se reescribe para que cada página declare:

1. **`accent` / identidad visual por servicio**: cada money page elige un acento semántico (token) y una iconografía dominante, de modo que urgencias (embargos, ASNEF, monitorio) se sientan más enérgicas y las jurídicas (LSO, EPI, concurso) más sobrias.
2. **`layout`: orden de módulos configurable**: un array que define qué bloques aparecen y en qué orden. Una página de urgencia abre con timeline + CTA; una jurídica abre con credenciales del equipo; una transaccional con simulador.
3. **Módulos exclusivos por servicio** (lo que de verdad rompe la sensación de clon):

```text
Servicio                         Módulo único destacado
-------------------------------  -------------------------------------------
Abogados LSO / EPI / Concurso    Bloque equipo + credenciales (E-E-A-T)
Tarjetas revolving               Calculadora de usura (interés pagado vs legal)
Microcréditos                    Comparador "lo que devuelves vs lo que pediste"
Reunificación / Reunificar       Tabla comparativa reunificar vs cancelar
Embargos / Monitorio / ASNEF     Timeline de urgencia "qué pasa si no actúas"
LSO (hub) / EPI / Concurso       Línea temporal de fases legales
Deudas Hacienda / Seg. Social    Bloque límites de exoneración (callout)
Cancelar / Cancelación           Selector de vías legales (ya existe, se potencia)
```

Cada módulo es un componente nuevo y opcional; una página solo renderiza los que declara.

## Fases de entrega

**Fase 1 — Infraestructura (sin cambios visibles de contenido)**
- Extender `types.ts`: `accent`, `layout` (orden de módulos), y nuevos tipos de módulo (`usuryCalculator`, `valueComparison`, `comparisonTable`, `teamCredentials`, `urgencyTimeline`, `legalTimeline`, `exonerationLimits`).
- Reescribir `MoneyJourney.tsx` para renderizar según `layout` (con orden por defecto para compatibilidad) y aplicar el `accent` de la página.
- Crear los componentes nuevos en `src/components/seo/interactive/`.

**Fase 2 — Re-diferenciar las 6 páginas con journey ya creadas**
- LSO, Abogados LSO, Cancelar, Cancelación, Reunificación, Reunificar: asignar acento, reordenar módulos y enchufar su módulo exclusivo (credenciales en Abogados LSO; tabla comparativa en reunificación; selector de vías potenciado en cancelación; etc.).

**Fase 3 — Construir journey completo para las 9 money pages restantes**
- ASNEF, Parar embargo, Cancelar revolving, Cancelar microcréditos, EPI, Concurso persona física, Juicio monitorio, Deudas Hacienda, Deudas Seguridad Social.
- Cada una con copy propio (hero, beneficios, pasos, testimonios adaptados, secciones SEO, FAQ con `plain` para JSON-LD), su acento y su módulo exclusivo. Las jurídicas sensibles quedan con `reviewed: false` (aviso de revisión) hasta validar el copy legal.

**Fase 4 — Hub `/servicios` + navegación**
- Nueva página `Servicios` (lista por clusters con tarjetas y `ItemList`), ruta en `App.tsx`, enlace en `Header` y `Footer`, y entrada en el sitemap.

## Anti-canibalización e interlinking

- Se respeta la diferenciación de ángulo ya definida entre pares (cancelar vs cancelación, reunificar vs reunificación) y se refuerza con módulos distintos (uno lleva tabla comparativa, el otro selector de vías).
- Interlinking horizontal entre hermanos del cluster, hub correspondiente y `/servicios`.

## Detalles técnicos

- Sin tocar `client.ts`, `types.ts` de Supabase ni migraciones (no hay backend implicado).
- Todos los CTA siguen scrolleando a `#hero-form`; sin gradientes en CTAs (regla de marca).
- Colores nuevos solo vía tokens semánticos en `index.css` / `tailwind.config.ts`; nada de clases de color hardcodeadas.
- Archivos: editar `types.ts`, `MoneyJourney.tsx`, `MoneyLanding.tsx` (paso de `accent`), `index.ts` (registro), `Header.tsx`, `Footer.tsx`, `App.tsx`, `scripts/generate-sitemap.ts`; nuevos componentes de módulo y 9 nuevos archivos de contenido + `src/pages/seo/Servicios.tsx`.
- Verificación: build + revisión visual de varias rutas (móvil y escritorio) para confirmar que cada servicio se ve distinto.

Por volumen, propongo ejecutar por fases y enseñarte la Fase 1+2 (infra + las 6 ya creadas, claramente diferenciadas) antes de seguir con las 9 nuevas, salvo que prefieras que avance del tirón.