<br>
<div align="center">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
</div>
<br>

<p align="center">
<a href="https://github.com/dariomatias-dev/sql-studio-web/actions/workflows/ci.yml"><img src="https://github.com/dariomatias-dev/sql-studio-web/actions/workflows/ci.yml/badge.svg" alt="Status do CI"></a>
<a href="https://codecov.io/gh/dariomatias-dev/sql-studio-web"><img src="https://img.shields.io/codecov/c/github/dariomatias-dev/sql-studio-web" alt="Cobertura"></a>
<a href="LICENSE"><img src="https://img.shields.io/github/license/dariomatias-dev/sql-studio-web" alt="Licença"></a>
<img src="https://img.shields.io/badge/node-%3E%3D24-339933?logo=node.js&logoColor=white" alt="Versão do Node.js">
</p>

<p align="center">
<strong>Idioma:</strong> <a href="README.md">English</a> | <a href="README.es.md">Español</a> | Português (Brasil)
</p>

# <p align="center">SQL Studio — Site Oficial</p>

<p align="center">
Site oficial do aplicativo móvel SQL Studio: um cliente de banco de dados para praticar SQL em bancos SQLite locais e totalmente customizáveis, offline-first.
<br>
<a href="#sobre-o-projeto"><strong>Explore a documentação »</strong></a>
<br><br>
<a href="https://sql-studio.vercel.app/">Ver Site em Produção</a>
·
<a href="https://github.com/dariomatias-dev/sql-studio-web/issues">Reportar Bug</a>
·
<a href="https://github.com/dariomatias-dev/sql-studio-web/issues">Solicitar Funcionalidade</a>
</p>

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Começando](#começando)
- [Scripts](#scripts)
- [Arquitetura](#arquitetura)
- [Testes](#testes)
- [Documentação](#documentação)
- [Como contribuir](#como-contribuir)
- [Segurança](#segurança)
- [Changelog](#changelog)
- [Licença](#licença)
- [Autor](#autor)

## Sobre o Projeto

Este repositório contém apenas o código da landing page oficial do SQL
Studio — não o aplicativo móvel em si. É um site totalmente estático (SSG)
feito com Next.js, que apresenta as funcionalidades do app, screenshots, e
uma forma de solicitar acesso enquanto o app está em beta fechado.

O SQL Studio em si é um aplicativo móvel para praticar SQL totalmente
offline, usando SQLite como motor de armazenamento — crie, edite, execute
e inspecione queries em bancos de dados locais totalmente customizáveis,
sem precisar de conexão com a internet.

## Funcionalidades

- Vitrine de funcionalidades, carrossel de screenshots, passo a passo do fluxo de uso e FAQ na página inicial.
- Formulário de solicitação de acesso beta em `/download`, já que o app está em beta fechado no Google Play.
- Formulário de contato para suporte, relato de bugs e sugestões de funcionalidades.
- Páginas reais de política de privacidade e termos de serviço, linkadas a partir do próprio app.
- Proteção contra spam nos dois formulários (honeypot e tempo mínimo de preenchimento).
- Acessível por padrão: hierarquia de títulos correta, `aria-*` em formulários e ícones, carrossel navegável por teclado, `prefers-reduced-motion` respeitado, verificado com axe.
- SEO: metadata própria por página, sitemap, robots, imagem Open Graph gerada e JSON-LD `MobileApplication`.
- Cabeçalhos de segurança e Content Security Policy.

## Tecnologias

- Next.js (App Router), React e TypeScript em modo strict.
- Tailwind CSS v4.
- `react-hook-form` com resolver `zod` no formulário de contato.
- `embla-carousel-react` no carrossel de screenshots, Radix UI no acordeão e no diálogo do menu mobile.
- `@emailjs/browser` — os formulários enviam direto do navegador, sem backend próprio.
- Vitest com Testing Library, e Playwright com axe.
- ESLint, Prettier, Husky, commitlint e GitHub Actions.

## Começando

```bash
pnpm install
cp .env.example .env.local   # configure as credenciais do EmailJS pra habilitar os formulários
pnpm run dev                  # http://localhost:3000
```

Sem as variáveis de ambiente do EmailJS, os dois formulários continuam
renderizando normalmente — só mostram um erro amigável em vez de enviar.

## Scripts

| Comando                      | Descrição                             |
| ---------------------------- | ------------------------------------- |
| `pnpm run dev`               | Servidor de desenvolvimento           |
| `pnpm run build`             | Build de produção (SSG)               |
| `pnpm run start`             | Serve o build de produção             |
| `pnpm run lint`              | ESLint                                |
| `pnpm run typecheck`         | `tsc --noEmit`                        |
| `pnpm run format`            | Prettier (escrita)                    |
| `pnpm run test`              | Vitest (watch)                        |
| `pnpm run test:run`          | Vitest (uma vez)                      |
| `pnpm run test:coverage`     | Vitest com limiares de cobertura      |
| `pnpm run test:e2e`          | Playwright (smoke, formulários, a11y) |
| `pnpm run check:bundle-size` | Checagem do orçamento de JS por rota  |
| `pnpm run verify`            | O gate local completo, na ordem do CI |
| `pnpm run lighthouse`        | Lighthouse CI (só relatório)          |

## Arquitetura

O código é organizado feature-first em `src/features/*`, com apenas o
genuinamente compartilhado em `src/shared/*`. Veja
[docs/architecture.md](docs/architecture.md) pras regras de dependência e
a estratégia de renderização (o que é Server vs. Client Component, e por
quê).

## Testes

- Testes de unidade e componente com Vitest e Testing Library (`pnpm run test:run`).
- Testes end-to-end com Playwright, incluindo varreduras de acessibilidade com axe (`pnpm run test:e2e`).
- Formulários nunca enviam e-mail de verdade em nenhum teste — as requisições ao EmailJS são sempre interceptadas ou mockadas. Veja [docs/testing.md](docs/testing.md).

## Documentação

> A documentação em `docs/` ainda está só em inglês.

| Doc                                          | Cobre                                                    |
| -------------------------------------------- | -------------------------------------------------------- |
| [docs/architecture.md](docs/architecture.md) | Estrutura feature-first, renderização, formulários       |
| [docs/testing.md](docs/testing.md)           | O que merece um teste, a regra de mock do EmailJS        |
| [docs/ci.md](docs/ci.md)                     | Cada job do CI, gate vs. relatório, reproduzir com `act` |
| [docs/dependencies.md](docs/dependencies.md) | Pacotes com versão exata, `pnpm.overrides`, Renovate     |
| [docs/performance.md](docs/performance.md)   | O orçamento de bundle e o Lighthouse CI                  |
| [docs/security.md](docs/security.md)         | Escopo de ameaças e como reportar uma vulnerabilidade    |

## Como contribuir

Contribuições fazem da comunidade open-source um lugar incrível pra
aprender e criar. Qualquer contribuição é bem-vinda.

1. Faça um fork do projeto.
2. Crie sua branch de funcionalidade: `git checkout -b feature/MinhaFuncionalidade`.
3. Rode o gate local antes de commitar: `pnpm run verify`.
4. Commite usando [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m 'feat(contact): add MinhaFuncionalidade'`.
5. Envie a branch: `git push origin feature/MinhaFuncionalidade`.
6. Abra um pull request.

## Segurança

Encontrou uma vulnerabilidade? Por favor não abra uma issue pública. Veja
[docs/security.md](docs/security.md) para como relatar de forma privada.

## Changelog

Releases são versionados automaticamente: o
[release-please](https://github.com/googleapis/release-please) mantém um
PR permanente com o `CHANGELOG.md` e o bump de versão do `package.json`,
cortando uma release taggeada no GitHub quando ele é mergeado.

## Licença

Distribuído sob a **Licença MIT**. Veja o arquivo [LICENSE](LICENSE) para
detalhes.

## Autor

Desenvolvido por **Dário Matias**:

- Portfólio: [https://dariomatias-dev.com](https://dariomatias-dev.com)
- GitHub: [https://github.com/dariomatias-dev](https://github.com/dariomatias-dev)
- Email: [matiasdario75@gmail.com](mailto:matiasdario75@gmail.com)
- Instagram: [https://instagram.com/dariomatias_dev](https://instagram.com/dariomatias_dev)
- LinkedIn: [https://linkedin.com/in/dariomatias-dev](https://linkedin.com/in/dariomatias-dev)
