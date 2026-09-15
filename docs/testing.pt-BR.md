# Testes

## O que realmente merece um teste aqui

Cobertura é um piso, não uma meta. Veja os limiares e a razão deles em
`vitest.config.mts`. O que importa mais que o número é _o quê_ testar:

- **Lógica de verdade**: um cálculo, um branch, um pedaço de estado que
  pode dar errado. O schema zod do formulário de contato, o estado
  sólido/transparente do header e o menu mobile, o expandir/colapsar do
  acordeão do FAQ, o slide ativo do carrossel — todos merecem um teste.
- **Interação real do usuário**: clicar em algo, esperar um resultado
  específico. Os testes de componente aqui renderizam o componente de
  verdade e interagem com ele por queries da Testing Library
  (`getByRole`, `getByLabelText`), não acessando internals.
- **Resultados de envio de formulário**: um envio válido chama a função
  certa com o payload certo e mostra sucesso; um inválido bloqueia o
  envio e mostra os erros de campo; uma falha mostra o estado de erro.
  `sendEmail`/`emailjs.send` são sempre mockados — veja a regra "nunca
  enviar e-mail de verdade nos testes" no `AGENTS.md`.
- **Destinos de link**: todo botão ou link que aponta pra algo externo
  (GitHub, LinkedIn, mailto, as páginas legais) merece uma asserção — é
  exatamente o tipo de coisa que um erro de copiar e colar quebra em
  silêncio.

O que deliberadamente **não** é perseguido, e fica excluído da cobertura
em `vitest.config.mts`:

- **Seções estáticas sem branch nenhum**: `cta-section.tsx`,
  `features-section.tsx`, `hero-section.tsx`, `workflow-section.tsx`, os
  dois componentes wrapper `*-section.tsx` (`faq`, `screenshots`), e os
  dois conteúdos de página legal. Markup fixo sem props e sem
  renderização condicional — não há lógica pra dar errado. Coberto de
  verdade por `e2e/smoke.spec.ts` e `e2e/navigation.spec.ts`.
- **Objetos de dado simples**:
  `features/layout/data/{nav-links,social-links}.ts` e
  `features/faq/data/faqs.ts`. Nada pra ramificar (`faqs.ts` já é
  exercitado indiretamente via `faq-section.test.tsx` de qualquer jeito).
- **Primitivas shadcn/Radix** (`shared/components/ui/**`): só estilo, sem
  lógica nossa.
- **Arquivos `*-page-content.tsx`**: composição pura de texto estático
  mais um componente de formulário já testado (`ContactForm`,
  `BetaAccessForm`). Sem lógica própria.
- **SVGs de ícone de marca** (`shared/icons/**`): um `<svg>` com path
  fixo, nada pra ramificar.

## Lacunas conhecidas, não exclusões

Essas continuam contando contra o piso de cobertura, de propósito, pra
que corrigi-las suba o número em vez de serem esquecidas em silêncio:

- **O branch da prop `glow` do `ping-indicator.tsx`**: só é renderizado
  com o padrão dela nas páginas que o usam até agora.
- **Alguns branches em `contact-form.tsx` e
  `screenshots-carousel.tsx`**: combinações menos comuns de erro de campo
  e o cálculo de `priority` em slides distantes.

## Test doubles

- **As lacunas do jsdom são reais e merecem um comentário, não um
  workaround.** `IntersectionObserver`, `ResizeObserver` e `matchMedia`
  simplesmente não existem no jsdom; veja os polyfills em
  `vitest.setup.ts` — o `embla-carousel` (carrossel de screenshots)
  precisa de `ResizeObserver`. Os outros dois ainda não são exercitados
  por nenhum componente, mas ficam polyfilled com antecedência, batendo
  com o que um navegador de verdade fornece.
- **O embla-carousel funciona no jsdom sem layout de verdade**, pelo
  menos pra esse carrossel: todo slide tem o mesmo tamanho (zero) quando
  `getBoundingClientRect` não está disponível, então o cálculo do ponto
  de snap ainda resolve certo. `screenshots-carousel.test.tsx` afirma
  navegação de verdade (botões próximo/anterior, clicar num ponto)
  direto, sem precisar de um recorte só pra e2e.
- **O Accordion do Radix desmonta o conteúdo fechado**, não só esconde —
  `faq-section.test.tsx` afirma a ausência de uma resposta colapsada com
  `queryByText(...)` retornando `null`, não um atributo
  `data-state="closed"` num elemento que não existe.

## Rodando as suítes

```bash
pnpm test               # Vitest em modo watch
pnpm run test:run       # Vitest uma vez
pnpm run test:coverage  # Vitest uma vez, com os limiares de cobertura aplicados
pnpm run test:e2e       # Playwright, contra o app buildado
```
