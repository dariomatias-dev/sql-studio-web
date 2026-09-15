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
| `/`                 | 720 KB      | ~690.7 KB                    |
| `/contact`          | 820 KB      | ~798.2 KB                    |
| `/download`         | 690 KB      | ~663.5 KB                    |
| `/privacy-policy`   | 680 KB      | ~652.9 KB                    |
| `/terms-of-service` | 680 KB      | ~652.9 KB                    |

Estos son un **piso contra retroceder más allá de la línea base
medida**, no una meta: la misma filosofía que los umbrales de cobertura
de Vitest en `vitest.config.mts`. Bajar un presupuesto es una decisión
deliberada que necesita una medición que la respalde, igual que
subirlo.

### Qué compone realmente ese peso

`/contact` es la ruta más pesada: envía `react-hook-form` y su resolver
zod para el formulario de contacto, además de la línea base compartida
del framework (React, React DOM, el runtime de Next.js,
`embla-carousel-react` usado por el carrusel de capturas de la página
principal). `/download` es más liviana ya que su formulario usa
`useState` puro, sin librería de formularios. Las páginas legales
(`/privacy-policy`, `/terms-of-service`) no envían código de formulario
alguno — su peso está cerca de la línea base pura del framework, ya
que ninguna de las dos páginas tiene una isla de cliente propia más
allá del `Header`/`Footer` compartido.

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
