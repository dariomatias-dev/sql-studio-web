<br>
<div align="center">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
</div>
<br>

<p align="center">
<a href="https://github.com/dariomatias-dev/sql-studio-web/actions/workflows/ci.yml"><img src="https://github.com/dariomatias-dev/sql-studio-web/actions/workflows/ci.yml/badge.svg" alt="Estado del CI"></a>
<a href="https://codecov.io/gh/dariomatias-dev/sql-studio-web"><img src="https://img.shields.io/codecov/c/github/dariomatias-dev/sql-studio-web" alt="Cobertura"></a>
<a href="LICENSE"><img src="https://img.shields.io/github/license/dariomatias-dev/sql-studio-web" alt="Licencia"></a>
<img src="https://img.shields.io/badge/node-%3E%3D24-339933?logo=node.js&logoColor=white" alt="Versión de Node.js">
</p>

<p align="center">
<strong>Idioma:</strong> <a href="README.md">English</a> | Español | <a href="README.pt-BR.md">Português (Brasil)</a>
</p>

# <p align="center">SQL Studio: Sitio Oficial</p>

<p align="center">
Sitio oficial de la app móvil SQL Studio: un cliente de bases de datos para practicar SQL en bases SQLite locales y totalmente personalizables, offline-first.
<br>
<a href="#sobre-el-proyecto"><strong>Explora la documentación »</strong></a>
<br><br>
<a href="https://sql-studio.vercel.app/">Ver Sitio en Vivo</a>
·
<a href="https://github.com/dariomatias-dev/sql-studio-web/issues">Reportar un Error</a>
·
<a href="https://github.com/dariomatias-dev/sql-studio-web/issues">Solicitar una Función</a>
</p>

## Índice

- [Sobre el Proyecto](#sobre-el-proyecto)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Cómo Empezar](#cómo-empezar)
- [Scripts](#scripts)
- [Arquitectura](#arquitectura)
- [Pruebas](#pruebas)
- [Documentación](#documentación)
- [Cómo Contribuir](#cómo-contribuir)
- [Seguridad](#seguridad)
- [Changelog](#changelog)
- [Licencia](#licencia)
- [Autor](#autor)

## Sobre el Proyecto

Este repositorio contiene solo el código de la landing page oficial de SQL
Studio: no la app móvil en sí. Es un sitio totalmente estático (SSG)
hecho con Next.js, que presenta las funcionalidades de la app, capturas de
pantalla, y una forma de solicitar acceso mientras la app está en beta
cerrada.

SQL Studio en sí es una app móvil para practicar SQL completamente sin
conexión, usando SQLite como motor de almacenamiento: crea, edita,
ejecuta e inspecciona consultas en bases de datos locales totalmente
personalizables, sin necesitar conexión a internet.

## Funcionalidades

- Vitrina de funcionalidades, carrusel de capturas de pantalla, recorrido del flujo de uso y preguntas frecuentes en la página principal.
- Formulario de solicitud de acceso beta en `/download`, ya que la app está en beta cerrada en Google Play.
- Formulario de contacto para soporte, reportes de errores y sugerencias de funcionalidades.
- Páginas reales de política de privacidad y términos de servicio, enlazadas desde la propia app.
- Protección contra spam en ambos formularios (honeypot y tiempo mínimo de llenado).
- Accesible por defecto: jerarquía de encabezados correcta, `aria-*` en formularios e íconos, carrusel navegable por teclado, `prefers-reduced-motion` respetado, verificado con axe.
- SEO: metadata propia por página, sitemap, robots, imagen Open Graph generada y JSON-LD `MobileApplication`.
- Cabeceras de seguridad y Content Security Policy.

## Tecnologías

- Next.js (App Router), React y TypeScript en modo strict.
- Tailwind CSS v4.
- `react-hook-form` con resolver `zod` en el formulario de contacto.
- `embla-carousel-react` en el carrusel de capturas, Radix UI en el acordeón y en el diálogo del menú móvil.
- `@emailjs/browser`: los formularios se envían directamente desde el navegador, sin backend propio.
- Vitest con Testing Library, y Playwright con axe.
- ESLint, Prettier, Husky, commitlint y GitHub Actions.

## Cómo Empezar

```bash
pnpm install
cp .env.example .env.local   # configura las credenciales de EmailJS para habilitar los formularios
pnpm run dev                  # http://localhost:3000
```

Sin las variables de entorno de EmailJS, ambos formularios se siguen
renderizando normalmente: solo muestran un error amigable en vez de
enviar.

## Scripts

| Comando                      | Descripción                                 |
| ---------------------------- | ------------------------------------------- |
| `pnpm run dev`               | Servidor de desarrollo                      |
| `pnpm run build`             | Build de producción (SSG)                   |
| `pnpm run start`             | Sirve el build de producción                |
| `pnpm run lint`              | ESLint                                      |
| `pnpm run typecheck`         | `tsc --noEmit`                              |
| `pnpm run format`            | Prettier (escritura)                        |
| `pnpm run test`              | Vitest (watch)                              |
| `pnpm run test:run`          | Vitest (una vez)                            |
| `pnpm run test:coverage`     | Vitest con umbrales de cobertura            |
| `pnpm run test:e2e`          | Playwright (smoke, formularios, a11y)       |
| `pnpm run check:bundle-size` | Verificación del presupuesto de JS por ruta |
| `pnpm run verify`            | El gate local completo, en el orden del CI  |
| `pnpm run lighthouse`        | Lighthouse CI (solo reporte)                |

## Arquitectura

El código está organizado feature-first en `src/features/*`, con solo lo
genuinamente compartido en `src/shared/*`. Ver
[docs/architecture.es.md](docs/architecture.es.md) para las reglas de
dependencia y la estrategia de renderizado (qué es un Server vs. un
Client Component, y por qué).

## Pruebas

- Pruebas unitarias y de componentes con Vitest y Testing Library (`pnpm run test:run`).
- Pruebas end-to-end con Playwright, incluyendo escaneos de accesibilidad con axe (`pnpm run test:e2e`).
- Los formularios nunca envían correo real en ninguna prueba: las solicitudes a EmailJS siempre se interceptan o simulan. Ver [docs/testing.es.md](docs/testing.es.md).

## Documentación

| Doc                                                      | Cubre                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| [docs/architecture.es.md](docs/architecture.es.md)       | Estructura feature-first, renderizado, formularios          |
| [docs/testing.es.md](docs/testing.es.md)                 | Qué merece una prueba, la regla de mock de EmailJS          |
| [docs/ci.es.md](docs/ci.es.md)                           | Cada job del CI, gate vs. reporte, reproducir con `act`     |
| [docs/dependencies.es.md](docs/dependencies.es.md)       | Paquetes con versión exacta, `pnpm.overrides`, Renovate     |
| [docs/performance.es.md](docs/performance.es.md)         | El presupuesto de bundle y Lighthouse CI                    |
| [docs/security.es.md](docs/security.es.md)               | Alcance de amenazas y cómo reportar una vulnerabilidad      |
| [docs/contributing.es.md](docs/contributing.es.md)       | Configuración, el gate local, convenciones de commit y rama |
| [docs/code_of_conduct.es.md](docs/code_of_conduct.es.md) | El Contributor Covenant que sigue este proyecto             |

## Cómo Contribuir

Las contribuciones hacen de la comunidad open-source un lugar increíble
para aprender y crear. Cualquier contribución es bienvenida.

1. Haz un fork del proyecto.
2. Crea tu rama de funcionalidad: `git checkout -b feature/MiFuncionalidad`.
3. Ejecuta el gate local antes de hacer commit: `pnpm run verify`.
4. Haz commit usando [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m 'feat(contact): add MiFuncionalidad'`.
5. Sube la rama: `git push origin feature/MiFuncionalidad`.
6. Abre un pull request.

Ver [docs/contributing.es.md](docs/contributing.es.md) para los
detalles completos de configuración y gate. Este proyecto sigue el
[Contributor Covenant](docs/code_of_conduct.es.md).

## Seguridad

¿Encontraste una vulnerabilidad? Por favor no abras un issue público. Ver
[docs/security.es.md](docs/security.es.md) para cómo reportarla de forma
privada.

## Changelog

Los releases se versionan automáticamente:
[release-please](https://github.com/googleapis/release-please) mantiene
un PR permanente con el `CHANGELOG.md` y el incremento de versión de
`package.json`, generando un release etiquetado en GitHub cuando se
fusiona.

## Licencia

Distribuido bajo la **Licencia MIT**. Ver el archivo [LICENSE](LICENSE)
para más detalles.

## Autor

Desarrollado por **Dário Matias**:

- Portafolio: [https://dariomatias-dev.com](https://dariomatias-dev.com)
- GitHub: [https://github.com/dariomatias-dev](https://github.com/dariomatias-dev)
- Email: [matiasdario75@gmail.com](mailto:matiasdario75@gmail.com)
- Instagram: [https://instagram.com/dariomatias_dev](https://instagram.com/dariomatias_dev)
- LinkedIn: [https://linkedin.com/in/dariomatias-dev](https://linkedin.com/in/dariomatias-dev)
