# ADR-002 — Modelo multi-tenant compartilhado

**Status:** Accepted  
**Data:** 02/07/2026  
**Owners:** Tech + Security  
**Decisão Foundation relacionada:** D-003

## Contexto

O OSSO AUDIT atenderá múltiplas empresas contratantes, cada uma com usuários, clientes auditados, evidências, relatórios e billing próprios. Isolamento é requisito de segurança, privacidade e confiança. A escala inicial não justifica banco dedicado por tenant.

## Decisão

Adotar banco Postgres compartilhado e schema de negócio compartilhado com:

- `tenant_id uuid NOT NULL` em toda tabela de negócio;
- FK para `tenants.id` e índice iniciado por `tenant_id`;
- membership explícita em `tenant_memberships`;
- Row Level Security em tabelas e Storage expostos;
- validação de tenant também na API;
- FK/constraints compostas que impeçam referências cross-tenant;
- testes positivos e negativos de isolamento em CI.

Tabelas verdadeiramente globais — como `profiles`, catálogo público controlado e papéis da plataforma — são exceções documentadas, ficam sem dados de negócio e possuem políticas próprias.

## Resolução de contexto

`X-Tenant-Id` ou rota seleciona o contexto desejado, mas não concede acesso. A membership ativa do usuário é consultada e a RLS decide novamente. Tenant IDs não serão confiados a `user_metadata` editável pelo usuário.

## Alternativas consideradas

### Banco por tenant

Rejeitada para V2: forte isolamento, porém custo, migrations, observabilidade e suporte desproporcionais. Pode virar tier enterprise futuro mediante ADR.

### Schema por tenant

Rejeitada: prolifera schemas e dificulta migrations, pooling e analytics governado.

### Isolamento apenas na aplicação

Rejeitada: um erro de query poderia vazar dados. Defense in depth exige RLS.

### Tenant IDs somente no JWT

Rejeitada como fonte única: memberships mudam e tokens podem ficar obsoletos.

## Consequências

### Positivas

- Operação e migrations centralizadas.
- Custos iniciais menores.
- RLS oferece barreira de banco consistente.
- Analytics agregado pode ser construído com governança.

### Riscos/custos

- Toda query e índice precisam considerar tenant.
- Política RLS incorreta pode causar vazamento ou indisponibilidade.
- “Noisy neighbor” exige quotas e monitoramento.
- Suporte privilegiado precisa de fluxo específico e auditável.

## Guardrails

- Deny by default.
- `service_role` apenas em funções/workers controlados.
- Nenhuma consulta privilegiada baseada somente em parâmetro do cliente.
- Platform support não recebe bypass permanente.
- Exportações e jobs carregam `tenant_id`, correlation e idempotency key.
- Logs usam tenant pseudonimizado quando exportados para terceiros.

## Critérios de aceite futuro

- 100% das tabelas de negócio possuem tenant/FK/índice/política.
- SELECT/INSERT/UPDATE/DELETE cross-tenant falham em testes.
- Storage cross-tenant falha mesmo conhecendo o path.
- Revogação de membership remove acesso conforme política de sessão.
- Teste de carga mede impacto das políticas e índices.

