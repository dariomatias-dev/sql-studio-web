# Rendimiento

Dos verificaciones automatizadas vigilan el rendimiento: un presupuesto
rígido de tamaño de bundle por ruta, y Lighthouse CI, que por ahora solo
reporta sin bloquear.

## Presupuesto de tamaño de bundle

`scripts/check-bundle-size.mjs` lee la salida de un `next build` real:
para cada ruta que verifica, parsea el HTML pre-renderizado de esa ruta
buscando cada etiqueta `<script src="/_next/static/chunks/*.js">`, suma
el tamaño real en disco de esos archivos, y falla si el total supera el
presupuesto de la ruta. Ejecútalo con `pnpm run check:bundle-size` (es
parte de `pnpm run verify` y del job `build` del CI, justo después de
`next build`).

Esto mide la salida estática por ruta directamente en vez de parsear el
formato interno del client-reference-manifest de Next, que no es un
contrato estable del cual depender.

### Presupuestos actuales

| Ruta                | Presupuesto | Medido en la última revisión |
| ------------------- | ----------- | ---------------------------- |
| `/contact`          | 1.240 KB    | ~1.218,3 KB                  |
| `/download`         | 1.210 KB    | ~1.183,9 KB                  |
| `/privacy-policy`   | 1.200 KB    | ~1.174,6 KB                  |
| `/terms-of-service` | 1.200 KB    | ~1.174,6 KB                  |

`/` no tiene presupuesto: se renderiza en el servidor bajo demanda en
vez de pre-renderizarse como HTML estático, así que no hay ningún
archivo HTML con `<script src>` que este script pueda medir. La
detección de locale de `next-intl` no se pudo ajustar para renderizar
la página principal completamente estática en esta versión de
Next.js; eso queda como pendiente, no como algo resuelto aquí.

Estos son un **piso contra retroceder más allá de la línea base
medida**, no una meta: la misma filosofía que los umbrales de cobertura
de Vitest en `vitest.config.mts`. Bajar un presupuesto es una decisión
deliberada que necesita una medición que la respalde, igual que
subirlo.

### Qué compone realmente ese peso

La línea base de cada ruta subió unos 370 KB cuando llegó el
enrutamiento por locale: el runtime de cliente de `next-intl` (contexto
de locale/mensajes, formateo de mensajes ICU) ahora es parte del chunk
compartido del framework, ya que `Header`/`Footer`, renderizados en
cada ruta, leen sus textos a través de él. `/contact` es la ruta más
pesada: envía `react-hook-form` y su resolver zod para el formulario de
contacto, además de esa línea base compartida (React, React DOM, el
runtime de Next.js, `next-intl`, `embla-carousel-react` usado por el
carrusel de capturas de la página principal). `/download` es más
liviana ya que su formulario usa `useState` puro, sin librería de
formularios. Las páginas legales (`/privacy-policy`,
`/terms-of-service`) no envían código de formulario alguno: su peso
está cerca de esa línea base compartida, ya que ninguna de las dos
páginas tiene una isla de cliente propia más allá del `Header`/`Footer`.

Los presupuestos subieron de nuevo cuando `Header` ganó un selector de
idioma construido con `@radix-ui/react-dropdown-menu` (~15 KB/ruta, ya
que `Header` es parte del chunk compartido en cada ruta).

## Lighthouse CI

`lighthouserc.json` corre Lighthouse tres veces contra cada una de las
5 rutas, en un servidor `next start` real. `pnpm run lighthouse` lo
corre localmente; el CI lo corre en un job `lighthouse` dedicado que
descarga el artefacto del job `build` en vez de reconstruir.

Cada aserción en `lighthouserc.json` es `"warn"`, no `"error"`: reporta
una puntuación sin hacer fallar el job ni el pipeline. Esto es
deliberado: la intención es reportar por un tiempo, confirmar que los
números se mantienen estables entre commits reales (las puntuaciones de
Lighthouse tienen ruido natural de ejecución a ejecución), y solo
entonces considerar cambiar las categorías que importan a `"error"` en
un cambio posterior.
