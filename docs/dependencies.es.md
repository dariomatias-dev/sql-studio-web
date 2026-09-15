# Dependencias

## Dependencias con versión exacta fijada

La mayoría de las dependencias en `package.json` usan un rango con `^`.
Estas cuatro no:

- **`next`, `eslint-config-next`** — siempre actualizadas juntas, en el
  mismo commit. Las reglas de `eslint-config-next` se generan contra un
  release específico de Next.js y no tienen compatibilidad garantizada
  entre versiones.
- **`react`, `react-dom`** — actualizadas juntas una con la otra. Un
  rango con `^` aquí podría traer una versión de React por delante de
  la que el release fijado de `next` fue construido y probado.

## `pnpm.overrides`

`pnpm audit` señala vulnerabilidades en dependencias transitivas —
paquetes que este proyecto nunca instala directamente, traídos por
`eslint-config-next`, `@commitlint/cli`, y herramientas de dev
similares. `pnpm.overrides` en `package.json` fuerza solo esos paquetes
a una versión parcheada, sin tocar lo que realmente se envía al sitio.

Cada override apunta a una línea major a la vez
(`"<paquete>@<rango>": "<versión>"`), no al nombre puro del paquete,
cuando hay más de una versión major en uso por diferentes cadenas
transitivas — forzar a cada consumidor al mismo major podría romper
cualquiera que estuviera escrito contra la API más antigua.

Al 13/09/2026, después de las actualizaciones de paquetes del Bloque 4,
`pnpm audit` todavía marcaba estos como **high**:

| Paquete                 | Override             | Versión parcheada | Traído por                                                 |
| ----------------------- | -------------------- | ----------------- | ---------------------------------------------------------- |
| `minimatch` (línea 3.x) | `minimatch@^3`       | `3.1.5`           | `eslint` → `glob` (major más antiguo)                      |
| `minimatch` (línea 9.x) | `minimatch@^9`       | `9.0.9`           | `eslint-config-next` → `@typescript-eslint/*`              |
| `flatted`               | `flatted`            | `3.4.4`           | `eslint-config-next` → `@typescript-eslint/*`              |
| `picomatch` (línea 2.x) | `picomatch@^2`       | `2.3.2`           | `eslint-config-next` → `@next/eslint-plugin-next`          |
| `picomatch` (línea 4.x) | `picomatch@^4`       | `4.0.7`           | `eslint-config-next` → `eslint-import-resolver-typescript` |
| `brace-expansion` (1.x) | `brace-expansion@^1` | `1.1.18`          | `eslint-config-next` → `@typescript-eslint/*`              |
| `brace-expansion` (2.x) | `brace-expansion@^2` | `2.1.4`           | lo mismo, un major diferente en el mismo árbol             |
| `js-yaml`               | `js-yaml@^4`         | `4.3.2`           | `@commitlint/cli` → `cosmiconfig`                          |
| `browserslist`          | `browserslist`       | `4.28.9`          | `eslint-config-next` → `@babel/core`                       |

Esto eliminó todo aviso `high`/`critical` (`pnpm audit`: 30 → 3). Los 3
restantes son `moderate`/`low`, todos dentro del propio árbol de
dependencias de `eslint` (`ajv`, `@humanfs/node`, `@babel/core`), fuera
del alcance de esta pasada — ver el job `vulnerabilities` del CI para
el reporte continuo.

**Eliminando un override:** en cuanto el paquete al que apunta se
actualice transitivamente (un `eslint-config-next` más nuevo, un
`@commitlint/cli` más nuevo) a una versión que ya incluya la
corrección, `pnpm audit` deja de marcarlo y el override se vuelve un
no-op. Seguro de borrar en ese punto — verifica con `pnpm why
<paquete>` que la versión instalada ya cumple el objetivo del override
por sí misma.

## Renovate

`renovate.json` abre un PR para dependencias desactualizadas
semanalmente (lunes antes de las 6am, `America/Sao_Paulo`), prefijando
commits con `build(deps):` y etiquetando PRs con `dependencies`.

Desactivado por completo para `next`, `eslint-config-next`, `react`,
`react-dom` — estos cuatro se actualizan a mano, juntos, en un solo
commit (ver "Dependencias con versión exacta fijada" arriba); un rango
con `^` o un PR automático que toque solo uno de ellos arriesga una
combinación de versión que nadie probó. `@types/react` y
`@types/react-dom` se agrupan en un único PR `react-types` en vez de
desactivarse, ya que solo tipan la versión de React que esté fijada y
no necesitan la misma coordinación manual. Las actualizaciones
minor/patch de GitHub Actions se agrupan en un solo PR para reducir el
ruido; las actualizaciones major todavía se abren individualmente.

**Cómo revisar un PR de Renovate:**

1. Verifica que el PR sea de uno de los tipos agrupados/esperados
   (`react-types`, `github-actions`, o un solo paquete) — un paquete
   inesperado apareciendo generalmente significa que una regla en
   `packageRules` necesita ajuste.
2. Deja que el CI corra (`quality`, `unit`, `build`, `e2e`); un
   resultado verde normalmente es suficiente para fusionar una
   actualización patch/minor.
3. Para una actualización major, revisa el changelog del paquete
   buscando cambios que rompan compatibilidad antes de fusionar,
   incluso con el CI en verde — Renovate no sabe sobre roturas que solo
   aparecen en runtime (por ejemplo, una clase CSS eliminada, un valor
   por defecto cambiado).
