# Integração Contínua

Dois princípios atravessam todo workflow aqui:

1. **Um gate e um relatório são coisas diferentes.** O que realmente
   reprova um pull request vive neste repositório (um script, um
   limiar): nunca só num serviço externo, pra um PR de fork sem um
   secret configurado nunca ficar bloqueado por um token faltando.
2. **O gate local espelha o CI.** `pnpm run verify` roda as mesmas
   checagens que o `ci.yml` roda, na mesma ordem (`typecheck` → `lint`
   → `format:check` → `check:docs-locales` → `test:coverage` → `build`
   → `check:bundle-size` → `test:e2e`; `--fast` pula `build`,
   `check:bundle-size`, e `test:e2e`). Um resultado local verde deve
   significar um CI verde.

## `.github/workflows/ci.yml`

| Job               | Checagens                                                                            | Gate ou relatório?                     |
| ----------------- | ------------------------------------------------------------------------------------ | -------------------------------------- |
| `commit-lint`     | Título do PR contra Conventional Commits (só em pull requests)                       | Gate, bloqueia merge                   |
| `quality`         | format, lint, tipos, paridade de idioma dos docs                                     | Gate, bloqueia merge                   |
| `unit`            | Vitest com limiares de cobertura, depois um upload pro Codecov                       | Gate, bloqueia merge                   |
| `build`           | `next build`                                                                         | Gate, bloqueia merge                   |
| `e2e`             | Playwright (smoke, navigation, app integration, no-js; desktop e um viewport mobile) | Gate, bloqueia merge                   |
| `vulnerabilities` | `pnpm audit`, `osv-scanner` contra o lockfile, `gitleaks` pra segredos commitados    | Só relatório, nunca bloqueia um PR     |
| `lighthouse`      | Lighthouse (performance, acessibilidade, SEO, boas práticas) contra as 5 rotas       | Só relatório, toda asserção é `"warn"` |

`build` sobe `.next` como artefato; `e2e` e `lighthouse` baixam esse
artefato em vez de rebuildar, então o app é buildado só uma vez por
execução.

Os jobs `vulnerabilities` e `lighthouse` são propositalmente
não-bloqueantes: um aviso novo de severidade alta numa dependência de
ferramenta de dev que não tem relação não deveria segurar todo PR
não-relacionado até alguém atualizar um pacote que não controla
diretamente, e as notas do Lighthouse têm ruído real de execução pra
execução.

## Outros workflows

- **`codeql.yml`**: análise estática (JavaScript/TypeScript), em todo
  PR, todo push pra `main`, e um agendamento semanal pra uma
  atualização de pacote de query aparecer mesmo numa semana quieta.
  Bloqueia via a checagem de code scanning do GitHub.
- **`dependency-review.yml`**: em todo PR, falha só num aviso de
  severidade alta ou acima **recém-introduzido** ou uma licença fora da
  lista permitida; um aviso que já existia na `main` não bloqueia
  retroativamente um PR não-relacionado (é o que o job
  `vulnerabilities` já reporta).
- **`release-please.yml`**: em todo push pra `main`, mantém um pull
  request de release permanente com o `CHANGELOG.md` e o bump de versão
  do `package.json`.

## Reproduzindo o CI localmente com `act`

```bash
act -l               # lista os jobs e a ordem de dependência deles
act -j quality        # roda um job
```

`commit-lint`, `quality`, `unit`, e `vulnerabilities` rodam limpo sob o
`act`. O resto tem limites documentados:

- **`build` e `e2e`** precisam do servidor local de artefatos do `act`
  explicitamente ativado — sem isso, `actions/upload-artifact` e
  `actions/download-artifact` falham com "Unable to get the
  ACTIONS_RUNTIME_TOKEN env variable":

  ```bash
  act -j build --artifact-server-path /tmp/artifacts
  act -j e2e --artifact-server-path /tmp/artifacts
  ```

- **`lighthouse`** baixa o artefato do build direitinho sob o `act`,
  mas falha na checagem de saúde do Chrome ("Chrome installation not
  found") — a imagem mínima `catthehacker/ubuntu:act-latest` não vem
  com Chrome. Só roda de verdade num runner `ubuntu-latest` de verdade
  do GitHub, que tem; `continue-on-error` evita que isso derrube o job
  localmente de qualquer jeito. `pnpm run lighthouse` roda as mesmas
  checagens direto contra um build local, sem `act`, como substituto
  durante o desenvolvimento.
- **O job `analyze` do `codeql.yml`** roda o scan completo localmente
  sob o `act` (todos os pacotes de query, todo arquivo fonte) e só
  falha no último passo, subindo o resultado SARIF pra API de code
  scanning do GitHub — que não existe pra uma execução de workflow que
  nunca foi disparada pelo GitHub. Essa falha é esperada localmente e
  não diz nada sobre o scan em si.
- **`dependency-review.yml`** e **`release-please.yml`** precisam de
  um pull request de verdade ou uma branch `main` de verdade no GitHub
  pra fazer algo útil (o diff de dependência de um PR; o arquivo de
  config buscado da branch remota) — sob o `act` eles falham
  imediatamente com um número de PR faltando ou um arquivo de config
  remoto faltando. Os dois são validados de outra forma
  estaticamente (`act -l`, parsing de JSON/YAML, o validador do próprio
  fornecedor quando existe um).

O upload pro Codecov do job `unit` é pulado quando `CODECOV_TOKEN` não
está configurado, então `act -j unit` roda os testes de verdade e nunca
publica cobertura. Com token configurado, um upload que falha derruba o
job: uma falha silenciosa deixaria o badge de cobertura mostrando um
commit antigo.

## Depurando uma execução de e2e que falhou

O `playwright.config.ts` define `trace: "retain-on-failure"`; uma
execução de CI que falha sobe `playwright-report/` e `test-results/`
como artefato (veja o passo "Upload Playwright report" do job `e2e`).
Baixe ele, depois:

```bash
npx playwright show-trace path/to/trace.zip
```

Isso abre uma linha do tempo com um screenshot, o DOM, e a atividade de
rede no momento da falha, geralmente mais rápido que tentar reproduzir
uma falha que só acontece no CI relendo a asserção.
