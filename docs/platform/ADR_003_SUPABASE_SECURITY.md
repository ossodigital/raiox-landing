# ADR-003 — Baseline de segurança Supabase

**Status:** Accepted  
**Data:** 02/07/2026  
**Owners:** Security + Tech  
**Decisão Foundation relacionada:** D-004 e D-010

## Contexto

Supabase concentra identidade, Postgres, Storage, funções e filas. Essa integração reduz complexidade, mas amplia o impacto de chaves privilegiadas, políticas incorretas e mistura de ambientes. Segurança não pode depender apenas da interface ou do gateway.

## Decisão

Adotar Supabase como plataforma de dados inicial com defense in depth:

1. Supabase Auth para identidade e sessões.
2. RLS obrigatória em tabelas expostas e políticas por operação.
3. Storage privado com políticas equivalentes ao banco.
4. MFA/AAL2 para owners, admins e ações de alto risco.
5. Projetos Supabase separados para local/preview controlado, staging e produção.
6. Publishable/anon key pode existir no cliente; secret/service-role key nunca.
7. Edge Functions/worker validam identidade, tenant, role, estado e entitlement.
8. Secrets ficam em secret manager/Project Secrets/Vault conforme finalidade.
9. Auth audit logs e trilha de negócio são complementares.
10. Backup, restore, região e DPA são gates antes de staging/produção.

## Classificação de chaves

| Chave/credencial | Cliente | Servidor | Regra |
|---|---:|---:|---|
| publishable/anon | permitida | permitida | sempre limitada por RLS |
| user access token | sessão | validação | curta duração e escopo do usuário |
| refresh token | cookie seguro | auth | nunca em logs/localStorage se SSR policy escolher cookie |
| secret/service role | proibida | restrita | bypass RLS; menor superfície possível |
| provider secret | proibida | worker/função | por ambiente e rotacionável |

## Alternativas consideradas

### Backend próprio sem acesso direto Supabase pelo cliente

Não rejeitada; será usada em operações privilegiadas. Para CRUD seguro, o acesso mediado por SDK + RLS pode ser permitido quando reduzir complexidade sem expor regras críticas.

### Confiar apenas em RLS

Rejeitada: API e domínio também validam autorização para erros claros, regras de estado, rate limit e auditoria.

### Um único projeto para todos os ambientes

Rejeitada: aumenta risco de dado real em teste, colisão de migrations e erro operacional.

## Consequências

- Políticas viram código crítico, revisado e testado.
- A equipe precisa dominar Auth claims, RLS e Storage policies.
- Operações com service role exigem revisão adicional e trilha.
- Plano/região Supabase permanece decisão operacional separada.

## Guardrails

- Nenhuma tabela exposta sem RLS habilitada antes do primeiro dado.
- Dados de autorização não ficam em metadata editável pelo usuário.
- CORS allowlist, rate limits e headers de segurança por ambiente.
- Migrations forward-only; mudanças de RLS requerem dupla revisão.
- Logs sanitizados e secret scanning em CI.
- URLs assinadas têm curta duração e não são persistidas em logs.
- Ações privilegiadas exigem request ID, ator, motivo e audit event.

## Critérios de aceite futuro

- Scans não encontram secrets em repo, bundle ou logs.
- Testes RLS/Storage cobrem cada papel e operação.
- MFA é exigido nas ações catalogadas.
- Restore é exercitado e medido.
- Offboarding e rotação de chaves possuem runbook.
- Auth audit logs e audit events podem ser correlacionados por request/actor.

## Referências oficiais

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Auth Audit Logs](https://supabase.com/docs/guides/auth/audit-logs)
- [Vault](https://supabase.com/docs/guides/database/vault)

