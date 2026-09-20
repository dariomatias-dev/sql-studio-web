# Arquitetura

Como o código está organizado e por quê.

## Estrutura

```text
src/
├── app/                    rotas finas, só compõem features
│   ├── layout.tsx          layout raiz: shell html, Header, Footer
│   ├── page.tsx            página inicial
│   ├── not-found.tsx       página 404
│   ├── contact/
│   ├── download/
│   ├── privacy-policy/
│   └── terms-of-service/
│
├── features/               um diretório por feature
│   ├── beta-access/        conteúdo e formulário de /download
│   ├── contact/            conteúdo e formulário de /contact
│   ├── cta/
│   ├── faq/
│   ├── features-showcase/
│   ├── hero/
│   ├── layout/             header, footer, botão de voltar ao topo
│   ├── legal/              conteúdo de política de privacidade e termos de serviço
│   ├── screenshots/        carrossel
│   └── workflow/
│
└── shared/                 código sem feature própria
    ├── components/         download-button, ping-indicator
    │   └── ui/              primitivas do shadcn (accordion)
    ├── icons/               SVGs de marca (Google Play, GitHub, LinkedIn)
    └── lib/                 cn (merge de classes), email (wrapper do EmailJS)
```

Cada feature guarda só as camadas que realmente precisa:

```text
features/<nome>/
├── components/       a UI da feature
├── data/             conteúdo estático e seus tipos (só quando a feature tem algum)
└── index.ts          a API pública da feature
```

## Regras de dependência

- Imports só descem: `app` → `features` → `shared`.
- `shared/` nunca importa de `features/`.
- `app/` e uma feature só podem acessar outra feature pelo barrel
  `index.ts` dela, nunca um arquivo interno. Os próprios arquivos internos
  de uma feature são livres pra ela mesma.
- Arquivos em kebab-case, componentes em PascalCase.

O `import/no-restricted-paths` do `eslint.config.mjs` é o que de fato
aplica essas regras: `pnpm lint` falha num import que cruza a fronteira,
então este documento não corre o risco de descolar do que é realmente
permitido, como aconteceria com uma convenção só de comentário.

## Exceções

Nenhuma no momento. Todo import de uma feature pra outra passa por um
barrel.

## Renderização

- `app/page.tsx` e `app/layout.tsx` são Server Components: só compõem
  componentes de feature, sem hooks ou estado próprio.
- `/privacy-policy`, `/terms-of-service` e a página 404 também são Server
  Components puros: sem interatividade, só texto e `Link`.
- `/contact` e `/download` cada um se divide num Server Component pro
  chrome estático da página (título, texto, links laterais) e num Client
  Component pequeno pro formulário em si (`ContactForm`, `BetaAccessForm`),
  que é a única parte que precisa de `useState`/`useForm`.
- `Header` continua Client Component do início ao fim: ele deriva se deve
  renderizar sólido ou transparente a partir da rota atual (`usePathname()`)
  e reage ao scroll e ao menu mobile, então precisa de estado e efeitos o
  tempo todo. `Footer` é Server Component, exceto pelo `BackToTopButton`,
  sua única parte interativa.
- O resto das seções da página inicial (hero, features, workflow,
  screenshots, FAQ, CTA) são Client Components, principalmente por causa
  das interações de hover e entrada; convertê-las é acompanhado separadamente,
  junto com o resto do trabalho de animação e acessibilidade no plano de
  atualização.
- O site inteiro é estático: toda rota é pré-renderizada em tempo de build
  (`next build`), sem renderização por requisição no servidor e sem dado
  dinâmico.

## Formulários

`/contact` e `/download` enviam pelo EmailJS (`@emailjs/browser`), direto
do navegador: não há backend próprio. Os dois passam pelo mesmo helper
`shared/lib/email.ts` (`sendEmail`), que lê as três variáveis de ambiente
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`/`NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`/`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`,
inlinadas em tempo de build, e lança um erro amigável se alguma faltar em
vez de tentar a requisição. Nenhum teste, spec de e2e, ou execução de
`act` deixa uma requisição chegar de verdade em `api.emailjs.com`: ela é
sempre interceptada ou recebe credenciais falsas que só funcionam contra
um endpoint mockado.

## Screenshots

As screenshots em `public/screenshots/` (`01_home.png` …
`10_workspace_layout_settings.png`) e o texto `alt` delas em
`screenshots-carousel.tsx` vêm direto de `sql_studio_app/screenshots/en/`
e das legendas do `README.md` desse repositório. Pra atualizar depois de
um release do app: copie os PNGs novos de
`sql_studio_app/screenshots/en/` por cima dos arquivos em
`public/screenshots/` (mesmos nomes), e atualize os valores de `alt` em
`features/screenshots/components/screenshots-carousel.tsx` se as legendas
do README do app mudaram. O mockup da seção de workflow
(`features/workflow/components/workflow-section.tsx`) reaproveita o
`03_editor.png` e não precisa de atualização separada.

## Decisões

- **Por que SSG.** O site não tem contas de usuário, conteúdo por
  visitante, nem dado que muda entre requisições: uma página de marketing,
  screenshots, um FAQ, páginas legais, dois formulários. Não há nada pra
  renderizar por requisição, então pré-renderizar cada rota em tempo de
  build transforma cada uma num arquivo estático, cacheável na borda, sem
  nenhum custo de renderização de servidor que ninguém precisa.
- **Por que feature-first.** O site é um punhado de páginas e seções
  claramente separadas (hero, formulário de contato, páginas legais, ...),
  cada uma com seu próprio texto e, em alguns casos, sua própria lógica de
  dado ou formulário. Agrupar por feature mantém tudo que uma página ou
  seção precisa num lugar só, em vez de espalhar entre árvores paralelas
  de `components/`, `constants/`, `context/`, `lib/`, `utils/` e
  `@types/`, do jeito que o projeto era antes dessa reestruturação: a
  estrutura que este documento descreve substituiu aquilo.
- **Por que separar o conteúdo da página do formulário.** `/contact` e
  `/download` costumavam ser um Client Component grande cada, formulário e
  texto estático juntos, porque o formulário precisava de `"use client"`
  pros seus hooks. Tirar o formulário pro componente próprio deixa o resto
  da página (a maior parte: títulos, parágrafos, links laterais) sair como
  HTML renderizado no servidor, sem JavaScript próprio nenhum.
