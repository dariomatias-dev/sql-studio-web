# Integración Continua

Dos principios atraviesan todo workflow aquí:

1. **Un gate y un reporte son cosas distintas.** Lo que realmente
   reprueba un pull request vive en este repositorio (un script, un
   umbral): nunca solo en un servicio externo, para que un PR de fork
   sin un secret configurado nunca quede bloqueado por un token
   faltante.
2. **El gate local refleja el CI.** `pnpm run verify` corre las mismas
   verificaciones que corre `ci.yml`, en el mismo orden (`typecheck` →
   `lint` → `format:check` → `check:docs-locales` → `test:coverage` →
   `build` → `check:bundle-size` → `test:e2e`; `--fast` omite `build`,
   `check:bundle-size`, y `test:e2e`). Una corrida local en verde
   debería significar un CI en verde.

## `.github/workflows/ci.yml`

| Job               | Verificaciones                                                                         | ¿Gate o reporte?                        |
| ----------------- | -------------------------------------------------------------------------------------- | --------------------------------------- |
| `commit-lint`     | Título del PR contra Conventional Commits (solo en pull requests)                      | Gate, bloquea el merge                  |
| `quality`         | format, lint, tipos, paridad de idioma de los docs                                     | Gate, bloquea el merge                  |
| `unit`            | Vitest con umbrales de cobertura, luego una subida a Codecov                           | Gate, bloquea el merge                  |
| `build`           | `next build`                                                                           | Gate, bloquea el merge                  |
| `e2e`             | Playwright (smoke, navigation, app integration, no-js; escritorio y un viewport móvil) | Gate, bloquea el merge                  |
| `vulnerabilities` | `pnpm audit`, `osv-scanner` contra el lockfile, `gitleaks` para secretos commiteados   | Solo reporte, nunca bloquea un PR       |
| `lighthouse`      | Lighthouse (rendimiento, accesibilidad, SEO, mejores prácticas) contra las 5 rutas     | Solo reporte, cada aserción es `"warn"` |

`build` sube `.next` como artefacto; `e2e` y `lighthouse` lo descargan
en vez de reconstruir, así la app se construye una sola vez por
ejecución.

Los jobs `vulnerabilities` y `lighthouse` son deliberadamente no
bloqueantes: un aviso nuevo de severidad alta en una dependencia de
herramientas de desarrollo sin relación no debería detener todo PR no
relacionado hasta que alguien actualice un paquete que no controla
directamente, y las puntuaciones de Lighthouse tienen ruido real de
ejecución a ejecución.

## Otros workflows

- **`codeql.yml`**: análisis estático (JavaScript/TypeScript), en cada
  PR, cada push a `main`, y una programación semanal para que una
  actualización de paquete de consultas aparezca incluso en una semana
  tranquila. Bloquea vía la verificación de code scanning de GitHub.
- **`dependency-review.yml`**: en cada PR, falla solo ante un aviso de
  severidad alta o superior **recién introducido** o una licencia fuera
  de la lista permitida; un aviso que ya existía en `main` no bloquea
  retroactivamente un PR no relacionado (eso es lo que ya reporta el
  job `vulnerabilities`).
- **`release-please.yml`**: en cada push a `main`, mantiene un pull
  request de release permanente con el `CHANGELOG.md` y el incremento
  de versión de `package.json`. Necesita Settings → Actions → General →
  Workflow permissions → "Allow GitHub Actions to create and approve pull
  requests" activado; sin eso la ejecución sube la rama de release y
  luego falla con "GitHub Actions is not permitted to create or approve
  pull requests".

## Reproduciendo el CI localmente con `act`

```bash
act -l               # lista los jobs y su orden de dependencia
act -j quality        # corre un job
```

`commit-lint`, `quality`, `unit`, y `vulnerabilities` corren limpio bajo
`act`. El resto tiene límites documentados:

- **`build` y `e2e`** necesitan el servidor local de artefactos de
  `act` habilitado explícitamente: sin eso, `actions/upload-artifact`
  y `actions/download-artifact` fallan con "Unable to get the
  ACTIONS_RUNTIME_TOKEN env variable":

  ```bash
  act -j build --artifact-server-path /tmp/artifacts
  act -j e2e --artifact-server-path /tmp/artifacts
  ```

- **`lighthouse`** descarga el artefacto del build sin problema bajo
  `act`, pero falla la verificación de salud de Chrome ("Chrome
  installation not found"): la imagen mínima
  `catthehacker/ubuntu:act-latest` no trae Chrome. Solo corre de
  verdad en un runner `ubuntu-latest` real de GitHub, que sí lo tiene;
  `continue-on-error` evita que esto tumbe el job localmente de todos
  modos. `pnpm run lighthouse` corre las mismas verificaciones
  directamente contra un build local, sin `act`, como sustituto
  durante el desarrollo.
- **El job `analyze` de `codeql.yml`** corre el escaneo completo
  localmente bajo `act` (todos los paquetes de consultas, cada archivo
  fuente) y solo falla en el último paso, al subir el resultado SARIF a
  la API de code scanning de GitHub: que no existe para una ejecución
  de workflow que nunca fue disparada por GitHub. Ese fallo es esperado
  localmente y no dice nada sobre el escaneo en sí.
- **`dependency-review.yml`** y **`release-please.yml`** necesitan un
  pull request real o una rama `main` real en GitHub para hacer algo
  útil (el diff de dependencias de un PR; el archivo de configuración
  obtenido de la rama remota): bajo `act` fallan de inmediato con un
  número de PR faltante o un archivo de configuración remoto faltante.
  Ambos se validan de otra forma estáticamente (`act -l`, parsing de
  JSON/YAML, el validador del propio proveedor cuando existe uno).

La subida a Codecov del job `unit` se omite cuando `CODECOV_TOKEN` no
está configurado, así que `act -j unit` ejecuta las pruebas de verdad y
nunca publica cobertura. Con token configurado, una subida que falla
hace fallar el job: un fallo silencioso dejaría el badge de cobertura
mostrando un commit antiguo.

## Depurando una ejecución de e2e que falló

`playwright.config.ts` define `trace: "retain-on-failure"`; una
ejecución de CI que falla sube `playwright-report/` y `test-results/`
como artefacto (ver el paso "Upload Playwright report" del job `e2e`).
Descárgalo, luego:

```bash
npx playwright show-trace path/to/trace.zip
```

Eso abre una línea de tiempo con una captura de pantalla, el DOM, y la
actividad de red en el momento del fallo, generalmente más rápido que
intentar reproducir un fallo exclusivo del CI releyendo la aserción.
