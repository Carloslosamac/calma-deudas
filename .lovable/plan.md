# Sección "Herramientas" para personas con deuda

Nueva sección con un hub en `/herramientas` y una página SEO independiente por cada herramienta. Cada herramienta es interactiva, muestra un resultado y termina con un CTA al formulario de lead (`#n`), siguiendo la regla de marca de que todos los CTA llevan al formulario.

## Herramientas (4 en esta primera entrega)

1. **Test de diagnóstico de solución** — `/herramientas/test-solucion-deuda`
   Cuestionario por pasos (insolvencia, activos pagados, usura, importe) que recomienda la vía adecuada según la regla de triaje del proyecto:
   - Insolvente + sin activos pagados → **Ley de Segunda Oportunidad**
   - Insolvente + con activos valiosos pagados (casa/terreno) → **Reunificación** (negociación extrajudicial)
   - Solvente + usura + deuda baja → **Reclamación judicial**
   El resultado enlaza a la money page correspondiente y al formulario.

2. **Calculadora de deuda cancelable** — `/herramientas/calculadora-deuda-cancelable`
   El usuario introduce su deuda total y tipos de deuda; estima un rango orientativo de lo cancelable y el alivio mensual. Texto claro de que es una estimación, no asesoramiento.

3. **Calculadora de sueldo inembargable** — `/herramientas/calculadora-sueldo-inembargable`
   Calcula el mínimo protegido frente a embargos según los tramos legales sobre el SMI (escala del art. 607 LEC). Entrada: salario neto mensual. Salida: cantidad embargable y cantidad protegida, con la fuente legal citada.

4. **Simulador de tarjetas revolving / usura** — `/herramientas/simulador-revolving-usura`
   Entrada: TAE y saldo. Detecta si la TAE es potencialmente usuraria comparándola con el tipo medio de referencia y estima el importe reclamable. Reutiliza la lógica del componente `UsuryCalculator` existente.

## Comportamiento común

- Cada herramienta muestra el resultado en pantalla y debajo un bloque CTA "Habla gratis con un experto" que hace scroll/redirige al formulario (`#n`) usando los helpers existentes (`scrollToForm`, `CtaButton`).
- Cada página incluye contenido SEO explicativo alrededor de la herramienta (qué es, cómo se calcula, fuentes legales, preguntas frecuentes) para posicionar y para GEO, en módulos legibles (no muros de texto).
- Avisos de "estimación orientativa, no constituye asesoramiento legal" donde aplica (páginas YMYL).

## Hub `/herramientas`

Página índice con tarjetas a cada herramienta, intro orientada a "calculadoras y tests gratuitos para personas con deudas", enlazado interno hacia las money pages relevantes y CTA final al formulario.

## Navegación y descubribilidad

- Añadir "Herramientas" al menú del `Header` (escritorio y móvil) y al `Footer`.
- Añadir las nuevas URLs a `public/sitemap.xml`, `public/llms.txt` y verificar `public/robots.txt`.

## SEO por página

- Title < 60 y meta description < 160 únicos, optimizados para CTR (estudiando el top 10 y batiéndolo), sin "| Calma", con hook diferenciador.
- Canonical, Open Graph, y JSON-LD: `WebApplication`/`WebPage` + `BreadcrumbList` + `FAQPage` cuando haya FAQ. El test usa `speakable` en pregunta/respuesta.
- H1 único y HTML semántico por página.

---

## Detalles técnicos

- **Rutas**: nuevo array de datos `src/data/seo/tools.ts` (slug, path, title, metaDescription, h1, intro, FAQ, módulos). En `src/App.tsx` añadir `<Route path="/herramientas" element={<HerramientasHub />} />` y mapear `tools.map(... <Route path={t.path} element={<ToolPage />} />)`, por encima del catch-all `/:cluster`.
- **Páginas nuevas**: `src/pages/seo/HerramientasHub.tsx` y `src/pages/seo/ToolPage.tsx` (resuelve la tool por pathname, como hace `MoneyLanding`), reutilizando `SeoPageScaffold`/`Seo` y las funciones de `src/lib/seo/structuredData.ts`.
- **Componentes interactivos** en `src/components/seo/interactive/`:
  - Reutilizar/extender `UsuryCalculator` (revolving) y la lógica de `EligibilityQuiz`/`DebtTypeSelector` para el test.
  - Nuevos: `CancelableDebtCalculator`, `UnseizableSalaryCalculator`, `SolutionDiagnosisTool`.
- **CTA**: usar `CtaButton` + `scrollToForm` (`#n`) ya existentes; sin gradientes en los CTA (regla de marca).
- **structuredData**: añadir un helper `buildWebApplication` (o reutilizar `buildWebPage`) para las tools.
- **Constantes legales** (tramos SMI art. 607 LEC, tipo medio de referencia revolving) centralizadas en el archivo de datos con fuente citada; sin inventar cifras de la marca.

## Fuera de alcance (posible siguiente fase)

- Más herramientas (simulador de plan de pagos, comparador de soluciones interactivo).
- Guardado de resultados o envío del resultado por email.
- Tests automatizados de los cálculos (se pueden añadir si lo deseas).
</content>
<summary>Hub /herramientas + una página SEO por herramienta (test de diagnóstico, calculadora de deuda cancelable, sueldo inembargable y simulador revolving/usura), cada una con resultado y CTA al formulario, navegación, sitemap y JSON-LD.</summary>
</invoke>
