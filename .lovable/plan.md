
# Rediseño del panel /admin

Hoy `/admin` es la cola diaria de publicación y el resto de páginas están escondidas detrás de enlaces sueltos (por ejemplo, para llegar a los leads hay que pasar por Ventas). La navegación no refleja las dos áreas reales del negocio: **Ventas** (leads + diagnóstico) y **Contenido/SEO** (posts, casos, indexación, salud).

## Objetivo

- `/admin` pasa a ser un **dashboard-home** con accesos rápidos y KPIs.
- Todas las páginas cuelgan de un **shell con sidebar** persistente y agrupado por área.
- Los **leads son ciudadanos de primera clase** (no un submenú de Ventas).
- La cola diaria de publicación deja de ser la home y se mueve a Contenido.

## Nueva estructura de rutas

```text
/admin                     → Dashboard (nuevo)
/admin/ventas              → Diagnóstico de venta (actual AdminVentas)
/admin/ventas/leads        → Leads de llamadas (actual AdminLeads)
/admin/leads-web           → Leads capturados en la web (actual AdminWebLeads, movido)
/admin/contenido/cola      → Cola diaria (actual AdminQueue, movida desde /admin)
/admin/contenido/indexacion→ (actual AdminIndexacion)
/admin/contenido/salud     → (actual AdminHealth)
/admin/auth                → Login (sin sidebar)
```

Se mantienen redirecciones desde las rutas antiguas (`/admin/web-leads`, `/admin/indexacion`, `/admin/health`) a las nuevas para no romper marcadores.

## Shell con sidebar (`AdminLayout`)

Layout compartido usando `SidebarProvider` de shadcn (variant `collapsible="icon"`), con `SidebarTrigger` en un header fino y `Outlet` para las páginas. Grupos del sidebar:

- **Panel** — Dashboard (`/admin`)
- **Ventas** — Diagnóstico · Leads llamadas · Leads web
- **Contenido** — Cola de publicación · Indexación · Salud
- **Cuenta** — Cerrar sesión

Item activo resaltado con `NavLink` + `isActive`. Colapsable a modo icono. Se elimina el patrón actual de "chips de navegación" (los tres `<Link>` en la cabecera de AdminQueue, el back-link "← Ventas" en AdminLeads, etc.) porque el sidebar ya cubre esa función.

## Dashboard nuevo (`/admin`)

Contenido, sin inventar métricas nuevas: consume lo que ya existe.

1. **Tarjetas de acción rápida** (grid 2×3):
   - Nuevo diagnóstico de venta → `/admin/ventas`
   - Leads de llamadas → `/admin/ventas/leads`
   - Leads web → `/admin/leads-web`
   - Cola de publicación → `/admin/contenido/cola`
   - Indexación → `/admin/contenido/indexacion`
   - Salud del sitio → `/admin/contenido/salud`

2. **KPIs de un vistazo** (lecturas ligeras, ya disponibles):
   - Nº de posts/casos pendientes hoy en la cola.
   - Nº de leads web en las últimas 24 h.
   - Nº de leads de ventas abiertos.
   
   Si alguna consulta es cara o no está lista, la tarjeta se degrada a "Ver detalle →" sin número.

3. **Últimos leads web** (tabla mini de 5 filas, enlace a "Ver todos").

## Detalles técnicos

- Nuevo archivo `src/pages/admin/AdminLayout.tsx` con el `SidebarProvider` + `AppSidebar` + `<Outlet />`. Protege con `useAdminAuth` una sola vez (hoy cada página lo hace por su cuenta — se puede dejar el guard duplicado en cada page para no tocarlas, pero preferiblemente centralizarlo aquí).
- Nuevo `src/components/admin/AdminSidebar.tsx` con la estructura de grupos anterior.
- Nuevo `src/pages/admin/AdminDashboard.tsx` (la home).
- En `src/App.tsx`: envolver las rutas `/admin/*` bajo `<Route element={<AdminLayout />}>` con rutas hijas. `/admin/auth` queda fuera del layout.
- Añadir redirects: `/admin/web-leads → /admin/leads-web`, `/admin/indexacion → /admin/contenido/indexacion`, `/admin/health → /admin/contenido/salud`.
- Quitar de cada página admin los "chips" de navegación superior y el back-link "← Ventas", ahora redundantes con el sidebar.
- No se toca lógica de negocio, edge functions, triage, ni la UI interna de cada página — solo su cascarón y sus enlaces.

## Fuera de alcance

- Rediseño visual de las páginas internas (Ventas, Leads, Cola…).
- Cambios en RLS, edge functions o esquema de datos.
- Métricas nuevas que requieran queries no existentes.
