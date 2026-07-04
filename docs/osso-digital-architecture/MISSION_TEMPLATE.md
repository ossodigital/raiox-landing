# MISSÃO [NNN] — [NOME]

## Contexto

- Projeto/repositório: [nome/path].
- Estado atual e baseline: [commit/versão/status].
- Problema/oportunidade: [descrição].
- Decisões/ADRs aplicáveis: [links].
- Dependências: [sistemas/pessoas/fornecedores].

## Objetivo

[Um resultado concreto, verificável e limitado.]

## Escopo

1. [item autorizado]
2. [item autorizado]

## Fora de escopo

- [feature/integração/migração explicitamente proibida]
- [ação externa não autorizada]

## Entregáveis

| Entregável | Caminho/resultado | Critério |
|---|---|---|
| [nome] | `[path]` | [condição verificável] |

## Arquivos permitidos

- `[path/glob específico]`

## Arquivos proibidos

- `[path/glob]`
- Secrets, dados reais, backups e frozen sets.

## Regras de segurança e dados

- Tenant/LGPD/classificação aplicável:
- Ações que exigem confirmação humana:
- Secrets/providers permitidos:
- Restrições de rede/deploy:

## Critérios de aceite

- [ ] [resultado funcional/documental]
- [ ] [caso negativo]
- [ ] [segurança/isolamento]
- [ ] [documentação]
- [ ] Nenhuma mudança fora do escopo.

## Validações obrigatórias

- [comando/check estrutural]
- [teste unitário/integração/E2E quando aplicável]
- [links/JSON/XML/schema]
- `git diff --check`
- Verificação do frozen set/baseline.

## Documentação obrigatória

- README do módulo/projeto.
- CHANGELOG/ROADMAP/VERSION/RELEASE_NOTES quando aplicável.
- CHECKPOINT detalhado.
- ADR para decisão relevante.
- Riscos, limitações e pendências.

## Regra de commit

- Commit/push: [autorizado ou proibido].
- Mensagem: `[type(scope): description]`.
- Branch/PR: [regra].
- Deploy: [autorizado ou proibido; ambiente].

## Relatório final esperado

- arquivos alterados;
- validações executadas;
- decisões e ADRs;
- riscos/pendências reais;
- confirmação de runtime/deploy;
- próximo checkpoint.

## Próximo passo

[Somente recomendação; não autoriza execução automática.]

