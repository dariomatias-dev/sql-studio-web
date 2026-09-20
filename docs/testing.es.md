# Pruebas

## Qué realmente merece una prueba aquí

La cobertura es un piso, no una meta. Ver los umbrales y su razón en
`vitest.config.mts`. Lo que importa más que el número es _qué_ probar:

- **Lógica real**: un cálculo, una rama, un pedazo de estado que puede
  estar mal. El schema zod del formulario de contacto, el estado
  sólido/transparente del header y el menú móvil, el expandir/colapsar
  del acordeón del FAQ, la diapositiva activa del carrusel: todos
  merecen una prueba.
- **Interacción real del usuario**: hacer clic en algo, esperar un
  resultado específico. Las pruebas de componente aquí renderizan el
  componente real e interactúan con él mediante consultas de Testing
  Library (`getByRole`, `getByLabelText`), no accediendo a internals.
- **Resultados de envío de formulario**: un envío válido llama a la
  función correcta con el payload correcto y muestra éxito; uno inválido
  bloquea el envío y muestra los errores de campo; un fallo muestra el
  estado de error. `sendEmail`/`emailjs.send` siempre están simulados:
  ver la regla "nunca enviar correo real en las pruebas" en `AGENTS.md`.
- **Destinos de enlaces**: todo botón o enlace que apunta a algo externo
  (GitHub, LinkedIn, mailto, las páginas legales) merece una aserción:
  es exactamente el tipo de cosa que un error de copiar y pegar rompe en
  silencio.

Lo que deliberadamente **no** se persigue, y queda excluido de la
cobertura en `vitest.config.mts`:

- **Secciones estáticas sin ninguna rama**: `cta-section.tsx`,
  `features-section.tsx`, `hero-section.tsx`, `workflow-section.tsx`, los
  dos componentes wrapper `*-section.tsx` (`faq`, `screenshots`), y los
  dos contenidos de página legal. Markup fijo sin props y sin
  renderizado condicional: no hay lógica que pueda fallar. Cubierto de
  verdad por `e2e/smoke.spec.ts` y `e2e/navigation.spec.ts`.
- **Objetos de datos simples**:
  `features/layout/data/{nav-links,social-links}.ts` y
  `features/faq/data/faqs.ts`. Nada que ramificar (`faqs.ts` ya se
  ejercita indirectamente vía `faq-section.test.tsx` de todos modos).
- **Primitivas de shadcn/Radix** (`shared/components/ui/**`): solo
  estilo, sin lógica propia.
- **Archivos `*-page-content.tsx`**: composición pura de texto estático
  más un componente de formulario ya probado (`ContactForm`,
  `BetaAccessForm`). Sin lógica propia.
- **SVGs de ícono de marca** (`shared/icons/**`): un `<svg>` con path
  fijo, nada que ramificar.

## Brechas conocidas, no exclusiones

Estas siguen contando contra el piso de cobertura, a propósito, para que
corregirlas suba el número en vez de olvidarse en silencio:

- **La rama de la prop `glow` de `ping-indicator.tsx`**: solo se
  renderiza con su valor por defecto en las páginas que lo usan hasta
  ahora.
- **Algunas ramas en `contact-form.tsx` y
  `screenshots-carousel.tsx`**: combinaciones menos comunes de error de
  campo y el cálculo de `priority` en diapositivas lejanas.

## Test doubles

- **Las brechas de jsdom son reales y merecen un comentario, no un
  workaround.** `IntersectionObserver`, `ResizeObserver` y `matchMedia`
  simplemente no existen en jsdom; ver los polyfills en
  `vitest.setup.ts`: `embla-carousel` (el carrusel de capturas)
  necesita `ResizeObserver`. Los otros dos todavía no los ejercita
  ningún componente, pero están polyfilled de antemano, igualando lo que
  provee un navegador real.
- **embla-carousel funciona en jsdom sin layout real**, al menos para
  este carrusel: cada diapositiva tiene el mismo tamaño (cero) cuando
  `getBoundingClientRect` no está disponible, así que el cálculo del
  punto de ajuste igual resuelve correctamente.
  `screenshots-carousel.test.tsx` verifica navegación real (botones
  siguiente/anterior, hacer clic en un punto) directamente, sin
  necesitar un recorte exclusivo para e2e.
- **El Accordion de Radix desmonta el contenido cerrado**, no solo lo
  oculta: `faq-section.test.tsx` verifica la ausencia de una respuesta
  colapsada con `queryByText(...)` devolviendo `null`, no un atributo
  `data-state="closed"` en un elemento que no existe.

## Ejecutando las suites

```bash
pnpm test               # Vitest en modo watch
pnpm run test:run       # Vitest una vez
pnpm run test:coverage  # Vitest una vez, con los umbrales de cobertura aplicados
pnpm run test:e2e       # Playwright, contra la app compilada
```
