# Política de Segurança

## Escopo

Este repositório é um site estático de marketing (SSG, sem contas de
usuário, sem backend, sem banco de dados). Os formulários (`/contact`,
`/download`) enviam direto pro EmailJS a partir do navegador; não há
servidor próprio tratando esse dado. Não há login e nenhum dado de
usuário armazenado. Preocupações realistas aqui são coisas como: uma
dependência com uma vulnerabilidade conhecida, um contorno da Content
Security Policy, um vetor de cross-site scripting, ou um problema de
supply-chain de build/CI — não tomada de conta ou vazamento de dado, já
que nem contas nem dado de usuário armazenado existem.

## Versões suportadas

Existe uma única versão implantada: o que estiver na branch `main` e no
ar em produção. Não há matriz de versões nem branch LTS pra
acompanhar.

## Relatando uma vulnerabilidade

Por favor não abra uma issue pública pra um relato de segurança. Em vez
disso:

1. Prefira o relato privado de vulnerabilidade do GitHub: aba
   **Security** → **Report a vulnerability**. Se essa opção não
   aparecer neste repositório, ainda não foi ativada. Use o fallback de
   e-mail abaixo.
2. Fallback: envie um e-mail pra
   [matiasdario75@gmail.com](mailto:matiasdario75@gmail.com) com
   "SECURITY" no assunto.

Inclua, na medida do possível:

- O que é a vulnerabilidade e seu impacto potencial.
- Passos pra reproduzir (uma URL, um payload, uma requisição).
- O commit ou versão implantada que você testou.

## Expectativas de resposta

Este é um projeto pessoal mantido por uma pessoa só, não uma empresa
com um time de segurança: não há um SLA de tempo de resposta
garantido. Relatos são levados a sério e reconhecidos assim que for
razoavelmente possível, geralmente em alguns dias.

## Divulgação

Por favor dê um tempo razoável pra corrigir um problema confirmado
antes de qualquer divulgação pública. Crédito é dado com prazer na
mensagem de commit da correção ou nas notas de release, se você
quiser.
