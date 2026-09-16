# Arquitectura

Cómo está organizado el código y por qué.

## Estructura

```text
src/
├── app/                    rutas delgadas, solo componen features
│   ├── layout.tsx          layout raíz: shell html, Header, Footer
│   ├── page.tsx            página de inicio
│   ├── not-found.tsx       página 404
│   ├── contact/
│   ├── download/
│   ├── privacy-policy/
│   └── terms-of-service/
│
├── features/               un directorio por feature
│   ├── beta-access/        contenido y formulario de /download
│   ├── contact/            contenido y formulario de /contact
│   ├── cta/
│   ├── faq/
│   ├── features-showcase/
│   ├── hero/
│   ├── layout/             header, footer, botón de volver arriba
│   ├── legal/              contenido de política de privacidad y términos de servicio
│   ├── screenshots/        carrusel
│   └── workflow/
│
└── shared/                 código sin feature propia
    ├── components/         download-button, ping-indicator
    │   └── ui/              primitivas de shadcn (accordion)
    ├── icons/               SVGs de marca (Google Play, GitHub, LinkedIn)
    └── lib/                 cn (combinar clases), email (wrapper de EmailJS)
```

Cada feature guarda solo las capas que realmente necesita:

```text
features/<nombre>/
├── components/       la UI de la feature
├── data/             contenido estático y sus tipos (solo cuando la feature tiene alguno)
└── index.ts          la API pública de la feature
```

## Reglas de dependencia

- Los imports solo bajan: `app` → `features` → `shared`.
- `shared/` nunca importa de `features/`.
- `app/` y una feature solo pueden acceder a otra feature a través de su
  barrel `index.ts`, nunca un archivo interno. Los propios archivos
  internos de una feature son válidos para esa misma feature.
- Archivos en kebab-case, componentes en PascalCase.

El `import/no-restricted-paths` de `eslint.config.mjs` es lo que
realmente aplica estas reglas: `pnpm lint` falla ante un import que cruza
el límite, así que este documento no corre el riesgo de desviarse de lo
que realmente está permitido, como sí podría pasar con una convención
que solo existiera en un comentario.

## Excepciones

Ninguna por ahora. Todo import de una feature a otra pasa por un barrel.

## Renderizado

- `app/page.tsx` y `app/layout.tsx` son Server Components: solo componen
  componentes de feature, sin hooks ni estado propio.
- `/privacy-policy`, `/terms-of-service` y la página 404 también son
  Server Components puros — sin interactividad, solo texto y `Link`.
- `/contact` y `/download` se dividen cada uno en un Server Component
  para el chrome estático de la página (título, texto, enlaces
  laterales) y un Client Component pequeño para el formulario en sí
  (`ContactForm`, `BetaAccessForm`), que es la única parte que necesita
  `useState`/`useForm`.
- `Header` sigue siendo Client Component de principio a fin: deriva si
  debe renderizarse sólido o transparente a partir de la ruta actual
  (`usePathname()`) y reacciona al scroll y al menú móvil, así que
  necesita estado y efectos todo el tiempo. `Footer` es Server Component,
  excepto por `BackToTopButton`, su única pieza interactiva.
- El resto de las secciones de la página de inicio (hero, features,
  workflow, screenshots, FAQ, CTA) son Client Components, principalmente
  por sus interacciones de hover y entrada; convertirlas se rastrea por
  separado, junto con el resto del trabajo de animación y accesibilidad
  en el plan de actualización.
- Todo el sitio es estático: cada ruta se pre-renderiza en tiempo de
  build (`next build`), sin renderizado por solicitud en el servidor y
  sin datos dinámicos.

## Formularios

`/contact` y `/download` envían a través de EmailJS (`@emailjs/browser`),
directamente desde el navegador — no hay backend propio. Ambos pasan por
el mismo helper `shared/lib/email.ts` (`sendEmail`), que lee las tres
variables de entorno
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`/`NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`/`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`,
inlineadas en tiempo de build, y lanza un error amigable si falta alguna
en vez de intentar la solicitud. Ninguna prueba, spec de e2e, o ejecución
de `act` deja que una solicitud llegue de verdad a `api.emailjs.com` —
siempre se intercepta o recibe credenciales falsas que solo funcionan
contra un endpoint simulado.

## Capturas de pantalla

Las capturas en `public/screenshots/` (`01_home.png` …
`10_workspace_layout_settings.png`) y su texto `alt` en
`screenshots-carousel.tsx` vienen directo de
`sql_studio_app/screenshots/en/` y de los subtítulos del `README.md` de
ese repositorio. Para actualizarlas después de un release del app: copia
los PNG nuevos de `sql_studio_app/screenshots/en/` sobre los archivos en
`public/screenshots/` (mismos nombres), y actualiza los valores de `alt`
en `features/screenshots/components/screenshots-carousel.tsx` si los
subtítulos del README del app cambiaron. El mockup de la sección de
workflow (`features/workflow/components/workflow-section.tsx`) reutiliza
`03_editor.png` y no necesita una actualización aparte.

## Decisiones

- **Por qué SSG.** El sitio no tiene cuentas de usuario, contenido por
  visitante, ni datos que cambien entre solicitudes: una página de
  marketing, capturas de pantalla, un FAQ, páginas legales, dos
  formularios. No hay nada que renderizar por solicitud, así que
  pre-renderizar cada ruta en tiempo de build convierte cada una en un
  archivo estático, cacheable en el borde, sin ningún costo de
  renderizado de servidor que nadie necesita.
- **Por qué feature-first.** El sitio es un puñado de páginas y secciones
  claramente separadas (hero, formulario de contacto, páginas legales,
  ...), cada una con su propio texto y, en algunos casos, su propia
  lógica de datos o formulario. Agrupar por feature mantiene todo lo que
  una página o sección necesita en un solo lugar, en vez de repartirlo
  entre árboles paralelos de `components/`, `constants/`, `context/`,
  `lib/`, `utils/` y `@types/`, como era el proyecto antes de esta
  reestructuración — la estructura que describe este documento reemplazó
  eso.
- **Por qué separar el contenido de la página del formulario.**
  `/contact` y `/download` solían ser un Client Component grande cada
  uno, formulario y texto estático juntos, porque el formulario
  necesitaba `"use client"` para sus hooks. Sacar el formulario a su
  propio componente permite que el resto de la página (la mayor parte:
  títulos, párrafos, enlaces laterales) salga como HTML renderizado en el
  servidor, sin JavaScript propio.
