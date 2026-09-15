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
| `/`                 | 720 KB    | ~690,7 KB                |
| `/contact`          | 820 KB    | ~798,2 KB                |
| `/download`         | 690 KB    | ~663,5 KB                |
| `/privacy-policy`   | 680 KB    | ~652,9 KB                |
| `/terms-of-service` | 680 KB    | ~652,9 KB                |

Esses são um **piso contra regredir além da linha de base medida**, não
uma meta: mesma filosofia dos limiares de cobertura do Vitest em
`vitest.config.mts`. Baixar um orçamento é uma escolha deliberada que
precisa de uma medição pra justificar, assim como subir um.

### O que realmente compõe esse peso

`/contact` é a rota mais pesada: ela envia `react-hook-form` e o
resolver zod dele pro formulário de contato, além da linha de base
compartilhada do framework (React, React DOM, o runtime do Next.js,
`embla-carousel-react` usado pelo carrossel de screenshots da página
inicial). `/download` é mais leve já que o formulário dela usa
`useState` puro, sem biblioteca de formulário. As páginas legais
(`/privacy-policy`, `/terms-of-service`) não enviam nenhum código de
formulário — o peso delas fica perto da linha de base pura do
framework, já que nenhuma das duas páginas tem uma ilha client própria
além do `Header`/`Footer` compartilhado.

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
