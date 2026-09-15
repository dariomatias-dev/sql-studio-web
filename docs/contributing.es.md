# Cómo contribuir

Este es un proyecto personal (ver el [README](../README.es.md)),
mantenido mayormente por una sola persona. Correcciones, reportes de
errores y ajustes pequeños son genuinamente bienvenidos; propuestas de
funcionalidades más grandes son más fáciles de aceptar si se abren
primero como un issue, ya que el alcance del sitio es intencionalmente
acotado.

## Configuración

```bash
git clone https://github.com/dariomatias-dev/sql-studio-web.git
cd sql-studio-web
pnpm install
cp .env.example .env.local   # configura las credenciales de EmailJS para habilitar los formularios
pnpm run dev                  # http://localhost:3000
```

La versión de Node está fijada en [`.nvmrc`](../.nvmrc); `nvm use` (o
equivalente) la toma automáticamente.

## Antes de abrir un pull request

- [ ] El cambio tiene alcance sobre una sola cosa (corrección de error,
      funcionalidad, refactorización, no una mezcla).
- [ ] `pnpm run verify` pasa localmente (ver [El gate local](#el-gate-local)
      abajo).
- [ ] Se agregaron o actualizaron pruebas para comportamiento que puede
      regresar.
- [ ] El mensaje de commit sigue
      [Conventional Commits](https://www.conventionalcommits.org/)
      (aplicado por commitlint; ver [Commits](#commits) abajo).

## El gate local

```bash
pnpm run verify         # gate completo: todo lo que corre el CI, incluyendo e2e
pnpm run verify --fast  # omite build, la verificación de bundle y e2e: lo que corre el pre-push
```

[`scripts/verify.sh`](../scripts/verify.sh) corre las mismas
verificaciones que el [CI](../.github/workflows/ci.yml), en el mismo
orden. Un `pnpm run verify` en verde localmente debería significar un
CI también en verde. Si no lo significa, es un bug en el gate, no una
coincidencia para ignorar.

Ver [ci.md](ci.md) para el desglose completo job por job (gate vs.
reporte), qué hacen los otros workflows (CodeQL, dependency review,
release-please, Lighthouse), cómo reproducir una ejecución localmente
con `act`, y cómo depurar una ejecución de e2e que falló a partir de su
trace subido.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/), aplicado
por un hook `commit-msg` (`@commitlint/config-conventional`). Línea de
título ≤ 72 caracteres. El scope es el área afectada (`header`,
`contact`, `deps`, `ci`), nunca una ruta de archivo.

```
fix(header): keep the header solid while the mobile menu is open
```

## Actualizaciones de dependencias

Renovate abre PRs semanalmente, agrupados donde tiene sentido (ver
[dependencies.md](dependencies.md)) para tener uno solo que revisar en
vez de una docena. Ver ese mismo doc para qué paquetes están fijados
con versión exacta (excluidos de actualización automática) y cómo
revisar un PR de Renovate.

## Ramas

No hay un esquema de nombres forzado. Crea la rama a partir de `main`,
abre un pull request contra `main`, y deja que la
[plantilla de PR](../.github/pull_request_template.md) guíe la
descripción.

## Trabajando con un agente de IA

Si estás usando un agente de codificación con IA (Claude Code o
similar) en este repositorio, leé [`AGENTS.md`](../AGENTS.md) primero:
lleva reglas específicas del repositorio que el agente necesita y que
no pertenecen a esta guía orientada a humanos.
