# Como contribuir

Esse é um projeto pessoal (veja o [README](../README.pt-BR.md)),
mantido majoritariamente por uma pessoa. Correções, relatos de bug e
ajustes pequenos são genuinamente bem-vindos; propostas de
funcionalidade maiores são mais fáceis de aceitar se abertas como issue
primeiro, já que o escopo do site é intencionalmente estreito.

## Configuração

```bash
git clone https://github.com/dariomatias-dev/sql-studio-web.git
cd sql-studio-web
pnpm install
cp .env.example .env.local   # configure as credenciais do EmailJS pra habilitar os formulários
pnpm run dev                  # http://localhost:3000
```

A versão do Node está fixada em [`.nvmrc`](../.nvmrc); `nvm use` (ou
equivalente) pega ela automaticamente.

## Antes de abrir um pull request

- [ ] A mudança tem escopo em uma única coisa (correção de bug,
      funcionalidade, refatoração, não uma mistura).
- [ ] `pnpm run verify` passa localmente (veja [O gate local](#o-gate-local)
      abaixo).
- [ ] Testes foram adicionados ou atualizados pra comportamento que pode
      regredir.
- [ ] A mensagem de commit segue
      [Conventional Commits](https://www.conventionalcommits.org/)
      (aplicado pelo commitlint; veja [Commits](#commits) abaixo).

## O gate local

```bash
pnpm run verify         # gate completo: tudo que o CI roda, incluindo e2e
pnpm run verify --fast  # pula build, a checagem de bundle e e2e: o que o pre-push roda
```

O [`scripts/verify.sh`](../scripts/verify.sh) roda as mesmas checagens
do [CI](../.github/workflows/ci.yml), na mesma ordem. Um `pnpm run
verify` verde localmente deve significar um CI verde também. Se não
significar, é um bug no gate, não uma coincidência pra ignorar.

Veja [ci.md](ci.md) pro detalhamento completo job por job (gate vs.
relatório), o que os outros workflows fazem (CodeQL, dependency review,
release-please, Lighthouse), como reproduzir uma execução localmente
com `act`, e como depurar uma execução de e2e que falhou a partir do
trace que ela sobe.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/), aplicado
por um hook `commit-msg` (`@commitlint/config-conventional`). Linha de
título ≤ 72 caracteres. O escopo é a área afetada (`header`, `contact`,
`deps`, `ci`), nunca um caminho de arquivo.

```
fix(header): keep the header solid while the mobile menu is open
```

## Atualizações de dependência

O Renovate abre PRs semanalmente, agrupados onde faz sentido (veja
[dependencies.md](dependencies.md)) pra ter um só pra revisar em vez de
uma dúzia. Veja o mesmo doc pra quais pacotes estão fixados com versão
exata (excluídos de atualização automática) e como triar um PR do
Renovate.

## Branches

Não há um esquema de nomenclatura aplicado. Crie a branch a partir da
`main`, abra um pull request contra a `main`, e deixe o
[template de PR](../.github/pull_request_template.md) guiar a
descrição.

## Trabalhando com um agente de IA

Se você está usando um agente de codificação com IA (Claude Code ou
parecido) nesse repositório, leia [`AGENTS.md`](../AGENTS.md) primeiro:
ele carrega regras específicas do repositório que o agente precisa e
que não pertencem a este guia voltado pra humanos.
