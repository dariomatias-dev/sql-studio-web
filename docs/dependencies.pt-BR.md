# Dependências

## Dependências com versão exata fixada

A maioria das dependências no `package.json` usa uma faixa com `^`.
Essas quatro não:

- **`next`, `eslint-config-next`** — sempre atualizadas juntas, no mesmo
  commit. As regras do `eslint-config-next` são geradas contra um
  release específico do Next.js e não têm compatibilidade garantida
  entre versões.
- **`react`, `react-dom`** — atualizadas juntas uma com a outra. Uma
  faixa com `^` aqui poderia puxar uma versão do React à frente da que o
  release fixado do `next` foi construído e testado contra.

## `pnpm.overrides`

O `pnpm audit` aponta vulnerabilidades em dependências transitivas —
pacotes que este projeto nunca instala diretamente, puxados pelo
`eslint-config-next`, `@commitlint/cli`, e ferramentas de dev
parecidas. O `pnpm.overrides` no `package.json` força só esses pacotes
pra uma versão corrigida, sem tocar no que realmente vai pro site.

Cada override mira uma linha major por vez
(`"<pacote>@<faixa>": "<versão>"`), não o nome puro do pacote, quando
mais de uma versão major dele está em uso por cadeias transitivas
diferentes — forçar todo consumidor pro mesmo major poderia quebrar
qualquer um que foi escrito contra a API mais antiga.

Em 13/09/2026, depois das atualizações de pacote do Bloco 4, o `pnpm
audit` ainda apontava esses como **high**:

| Pacote                  | Override             | Versão corrigida | Puxado por                                                 |
| ----------------------- | -------------------- | ---------------- | ---------------------------------------------------------- |
| `minimatch` (linha 3.x) | `minimatch@^3`       | `3.1.5`          | `eslint` → `glob` (major mais antigo)                      |
| `minimatch` (linha 9.x) | `minimatch@^9`       | `9.0.9`          | `eslint-config-next` → `@typescript-eslint/*`              |
| `flatted`               | `flatted`            | `3.4.4`          | `eslint-config-next` → `@typescript-eslint/*`              |
| `picomatch` (linha 2.x) | `picomatch@^2`       | `2.3.2`          | `eslint-config-next` → `@next/eslint-plugin-next`          |
| `picomatch` (linha 4.x) | `picomatch@^4`       | `4.0.7`          | `eslint-config-next` → `eslint-import-resolver-typescript` |
| `brace-expansion` (1.x) | `brace-expansion@^1` | `1.1.18`         | `eslint-config-next` → `@typescript-eslint/*`              |
| `brace-expansion` (2.x) | `brace-expansion@^2` | `2.1.4`          | mesma coisa, um major diferente na mesma árvore            |
| `js-yaml`               | `js-yaml@^4`         | `4.3.2`          | `@commitlint/cli` → `cosmiconfig`                          |
| `browserslist`          | `browserslist`       | `4.28.9`         | `eslint-config-next` → `@babel/core`                       |

Isso limpou todo aviso `high`/`critical` (`pnpm audit`: 30 → 3). Os 3
restantes são `moderate`/`low`, todos dentro da própria árvore de
dependências do `eslint` (`ajv`, `@humanfs/node`, `@babel/core`), fora
do escopo desta passada — veja o job `vulnerabilities` do CI pro
relatório contínuo.

**Removendo um override:** assim que o pacote que ele mira atualizar
transitivamente (um `eslint-config-next` mais novo, um
`@commitlint/cli` mais novo) pra uma versão que já inclui a correção, o
`pnpm audit` para de apontá-lo e o override vira um no-op. Seguro de
apagar nesse ponto — confirme com `pnpm why <pacote>` que a versão
instalada já atende o alvo do override por conta própria.

## Renovate

O `renovate.json` abre um PR pra dependências desatualizadas
semanalmente (segunda antes das 6h, `America/Sao_Paulo`), prefixando
commits com `build(deps):` e rotulando PRs com `dependencies`.

Desativado por completo pra `next`, `eslint-config-next`, `react`,
`react-dom` — esses quatro são atualizados à mão, juntos, num commit só
(veja "Dependências com versão exata fixada" acima); uma faixa com `^`
ou um PR automático tocando só um deles arrisca uma combinação de
versão que ninguém testou. `@types/react` e `@types/react-dom` são
agrupados num único PR `react-types` em vez de desativados, já que só
tipam qualquer React que estiver fixado e não precisam da mesma
coordenação manual. Atualizações minor/patch do GitHub Actions são
agrupadas num PR só pra reduzir ruído; atualizações major ainda abrem
individualmente.

**Triando um PR do Renovate:**

1. Confira se o PR é de um dos tipos agrupados/esperados
   (`react-types`, `github-actions`, ou um pacote único) — um pacote
   inesperado aparecendo geralmente significa que uma regra em
   `packageRules` precisa de ajuste.
2. Deixe o CI rodar (`quality`, `unit`, `build`, `e2e`); um resultado
   verde normalmente é suficiente pra mergear uma atualização
   patch/minor.
3. Pra uma atualização major, dê uma olhada no changelog do pacote
   procurando mudanças que quebram compatibilidade antes de mergear,
   mesmo com o CI verde — o Renovate não sabe sobre quebras que só
   aparecem em runtime (por exemplo, uma classe CSS removida, um padrão
   mudado).
