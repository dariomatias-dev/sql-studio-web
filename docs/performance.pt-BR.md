# Performance

Duas checagens automatizadas observam performance: um orçamento rígido
de tamanho de bundle por rota, e o Lighthouse CI, que só reporta sem
bloquear ainda.

## Orçamento de tamanho de bundle

`scripts/check-bundle-size.mjs` lê a saída de um `next build` de
verdade: pra cada rota que checa, ele parseia o HTML pré-renderizado
daquela rota procurando toda tag `<script src="/_next/static/chunks/*.js">`,
soma o tamanho real em disco desses arquivos, e falha se o total passar
do orçamento da rota. Rode com `pnpm run check:bundle-size` (faz parte
do `pnpm run verify` e do job `build` do CI, logo depois do `next
build`).

Isso mede a saída estática por rota diretamente em vez de parsear o
formato interno do client-reference-manifest do Next, que não é um
contrato estável pra depender.

### Orçamentos atuais

| Rota                | Orçamento | Medido na última revisão |
| ------------------- | --------- | ------------------------ |
| `/contact`          | 1.240 KB  | ~1.218,3 KB              |
| `/download`         | 1.210 KB  | ~1.183,9 KB              |
| `/privacy-policy`   | 1.200 KB  | ~1.174,6 KB              |
| `/terms-of-service` | 1.200 KB  | ~1.174,6 KB              |

`/` não tem orçamento: ela é renderizada no servidor sob demanda em vez
de pré-renderizada como HTML estático, então não existe arquivo HTML
com `<script src>` pra esse script medir. A detecção de locale do
`next-intl` não pôde ser ajustada pra renderizar a home totalmente
estática nessa versão do Next.js; isso fica em aberto, não foi
resolvido aqui.

Esses são um **piso contra regredir além da linha de base medida**, não
uma meta: mesma filosofia dos limiares de cobertura do Vitest em
`vitest.config.mts`. Baixar um orçamento é uma escolha deliberada que
precisa de uma medição pra justificar, assim como subir um.

### O que realmente compõe esse peso

O baseline de toda rota deu um salto de uns 370 KB quando o roteamento
por locale entrou: o runtime cliente do `next-intl` (contexto de
locale/mensagens, formatação de mensagens ICU) agora faz parte do chunk
compartilhado do framework, já que `Header`/`Footer`, renderizados em
toda rota, leem os textos deles por ali. `/contact` é a rota mais
pesada: ela envia `react-hook-form` e o resolver zod dele pro
formulário de contato, além dessa linha de base compartilhada (React,
React DOM, o runtime do Next.js, `next-intl`, `embla-carousel-react`
usado pelo carrossel de screenshots da página inicial). `/download` é
mais leve já que o formulário dela usa `useState` puro, sem biblioteca
de formulário. As páginas legais (`/privacy-policy`,
`/terms-of-service`) não enviam nenhum código de formulário: o peso
delas fica perto dessa linha de base compartilhada, já que nenhuma das
duas páginas tem uma ilha client própria além do `Header`/`Footer`.

Os orçamentos subiram de novo quando o `Header` ganhou um seletor de
idioma construído com `@radix-ui/react-dropdown-menu` (~15 KB/rota, já
que o `Header` faz parte do chunk compartilhado em toda rota).

## Lighthouse CI

`lighthouserc.json` roda o Lighthouse três vezes contra cada uma das 5
rotas, num servidor `next start` de verdade. `pnpm run lighthouse` roda
localmente; o CI roda isso num job `lighthouse` dedicado que baixa o
artefato do job `build` em vez de rebuildar.

Toda asserção no `lighthouserc.json` é `"warn"`, não `"error"`: ela
reporta uma nota sem derrubar o job ou o pipeline. Isso é deliberado: a
intenção é reportar por um tempo, confirmar que os números se mantêm
estáveis entre commits de verdade (as notas do Lighthouse têm ruído
natural de execução pra execução), e só então considerar trocar as
categorias que importam pra `"error"` numa mudança futura.
