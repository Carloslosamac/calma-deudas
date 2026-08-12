# Arreglar: el caso de prueba se queda pegado en el batch de llamadas

## Qué pasa

El guion de ventas guarda un borrador automático en el navegador para no perder el progreso si el comercial navega fuera. Al cargar un caso de prueba, ese caso se guarda como borrador igual que un caso real, y además queda enganchado al lead que estuviera abierto en ese momento (el botón de prueba rellena todos los campos pero no suelta el vínculo con el lead).

Resultado: al volver a la lista de llamadas y abrir otro lead, la pantalla sigue mostrando los datos de la prueba en lugar de los del nuevo lead.

## Cómo lo arreglo

1. **Cargar una prueba deja de contaminar el caso real**: al pulsar un perfil de prueba se desvincula el lead actual y el borrador se marca como "prueba", de forma que nunca se restaura como si fuera trabajo en curso.
2. **Abrir un lead siempre gana**: cuando se entra desde el paquete de llamadas con un lead concreto, se limpia todo lo anterior y se cargan sus datos, aunque haya un borrador previo (solo se restaura si el borrador es de ese mismo lead y no es de prueba).
3. **Cambiar de lead sin recargar**: hoy la precarga solo ocurre al montar la pantalla; pasará a reaccionar cada vez que llegue un lead nuevo, para que en un batch de llamadas seguidas cada lead entre limpio.
4. **Salida rápida**: el botón de reiniciar quedará visible también cuando hay una prueba cargada, con aviso claro de que se está en modo prueba.

## Detalles técnicos

- `src/pages/AdminVentas.tsx`: `loadTestCase` limpia `leadId`/`leadExternalId` y activa un flag `isTestCase` incluido en el snapshot del borrador; el efecto de hidratación pasa a depender de `location.state?.lead` y hace `resetForm()` antes de aplicar los datos del lead entrante; la restauración de borrador ignora los que tengan `isTestCase: true`.
- Sin cambios en base de datos ni en funciones del backend.
