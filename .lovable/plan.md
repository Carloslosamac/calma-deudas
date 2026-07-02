## Objetivo

En desktop la herramienta deja mucho espacio vacío debajo de la columna principal (los 3 guiones ocupan solo la franja superior) mientras la columna izquierda llega casi al final. Vamos a equilibrar el reparto horizontal y hacer que el contenido ocupe toda la pantalla, sin scroll de página.

## Cambios (todo en `src/pages/AdminVentas.tsx`)

### 1. Rejilla de dos columnas equilibrada y a altura completa
- La rejilla (`lg:grid-cols-[300px_minmax(0,1fr)]`) pasa a estirar ambas columnas a la altura disponible (`lg:items-stretch` en vez de `lg:items-start`) para que las dos lleguen al mismo alto.
- Ligero aumento del ancho de la columna izquierda (de `300px` a ~`340px`) y del gap para que el reparto quede compensado y no se vea la barra lateral pegada.

### 2. La columna principal ocupa toda la altura
- El contenedor de la columna principal pasa a `lg:flex lg:h-full lg:flex-col`.
- El contenedor de cada fase (`space-y-3`) se convierte en `lg:flex-1 lg:flex lg:flex-col`, y la `PhaseCard` activa crece con `lg:flex-1` para llenar el alto disponible.

### 3. Presentación: los guiones llenan el espacio vertical
- La rejilla de los 3 guiones (`grid ... lg:grid-cols-3`) crece para ocupar el alto (`lg:flex-1`), y cada tarjeta de guion se estira (`h-full`) para repartir el espacio de forma uniforme.
- El texto del guion se coloca de modo que la tarjeta rellene el alto sin dejar hueco muerto.

### 4. Columna izquierda equilibrada
- El engagement gate del final se ancla al fondo de la columna izquierda (empujándolo con `mt-auto`) para que la barra lateral quede repartida de arriba a abajo en lugar de amontonada arriba.

## Resultado esperado
Las dos columnas llegan al mismo alto, el espacio entre ellas queda compensado, y las tarjetas de guion y el panel lateral se reparten toda la pantalla sin dejar el gran vacío inferior. Se mantiene la regla de cero scroll de página en desktop.

## Nota
Este ajuste optimiza la fase de Presentación (la más "vacía"). Las demás fases ya tienen más contenido; heredarán el estiramiento de la card pero conviene revisar visualmente Cualificación/Diagnóstico tras el cambio por si algún módulo queda demasiado estirado.
