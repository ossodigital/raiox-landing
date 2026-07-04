# Padrões SaaS oficiais — OSSO DIGITAL

## 1. Princípio

Todo SaaS OSSO DIGITAL nasce multiempresa, seguro por padrão, auditável e comercialmente controlável. Exceção single-tenant exige ADR e plano de evolução.

## 2. Multiempresa

- Toda tabela de negócio DEVE possuir `tenant_id NOT NULL`, FK e índice.
- Relações cross-table DEVEM impedir cruzamento de tenant por constraints compostas ou validação equivalente.
- Tabelas globais são exceções explícitas, sem dado de negócio por tenant.
- Tenant context selecionado pelo cliente nunca é prova de autorização.
- Jobs, eventos, Storage paths, logs e usage carregam contexto de tenant.
- Tenant IDs são locais ao produto; identidade corporativa global futura exige ADR.

## 3. RLS e isolamento

- RLS obrigatória em Postgres/Storage expostos.
- Políticas separadas para SELECT/INSERT/UPDATE/DELETE.
- Deny by default.
- `service_role` só em backend controlado, com superfície mínima e trilha.
- Testes cross-tenant positivos/negativos bloqueiam release.
- URLs de Storage privadas, assinadas e curtas.
- Export em massa e suporte privilegiado exigem MFA e justificativa.

## 4. Autenticação

- Provedor aprovado com sessões revogáveis e auditáveis.
- Métodos escolhidos por risco/persona: magic link/OTP/password/OIDC/SSO.
- MFA obrigatório para owners/admins e ações de alto risco.
- Recovery não pode enumerar conta.
- Cookies seguros quando web; tokens nunca em logs.
- Offboarding revoga membership, sessões e credenciais relacionadas.

## 5. Autorização

Combinar:

- RBAC: `tenant_owner`, `tenant_admin`, papéis de domínio, `viewer`.
- ABAC: tenant, atribuição, estado, ownership, entitlement, assurance level.
- Políticas de banco/Storage como enforcement final.

Papéis da plataforma (`platform_support`, `platform_admin`, `security_auditor`) são separados dos papéis do tenant. Impersonação silenciosa é proibida.

## 6. Papéis mínimos

| Papel | Escopo | Capacidade |
|---|---|---|
| tenant_owner | tenant | contrato, billing, admins e exclusão |
| tenant_admin | tenant | membros/configuração operacional |
| domain_operator | recursos atribuídos | executar workflow do produto |
| reviewer/approver | recursos atribuídos | aprovar decisão sensível |
| viewer/client | próprios/liberados | leitura limitada |
| platform_support | sessão temporária | suporte justificado |
| platform_admin | plataforma | configuração corporativa, sem conteúdo por padrão |

Produto especializa `domain_operator`, mas preserva semântica de menor privilégio.

## 7. Billing

- Provider PCI hospeda dados de cartão.
- Webhook assinado e idempotente é fonte de confirmação, não redirect do navegador.
- Ledger de uso é append-only e reconciliável.
- Valores em centavos + moeda; timezone e impostos explícitos.
- Refund, chargeback, inadimplência e cancelamento têm estados/runbooks.
- Billing não apaga dados imediatamente; aplica política de grace/retention aprovada.

## 8. Planos, trial e assinatura

### Planos

- Catálogo versionado: code, nome, moeda, intervalo, limites, features e vigência.
- Preço antigo permanece reproduzível para assinatura existente.
- Limites não ficam espalhados no frontend; resolvidos por entitlement.

### Trial

- Trial tem início/fim, elegibilidade, limites e conversão explícitos.
- Sem cobrança automática sem consentimento e informação clara.
- Antiabuso proporcional, sem coletar excesso.
- Encerramento preserva export/acesso conforme política comunicada.

### Assinatura

- Estados mínimos: `trialing`, `active`, `past_due`, `paused`, `canceled`, `expired`.
- Alteração de plano é idempotente e auditada.
- Proration e data efetiva são responsabilidades do provider/contrato documentado.

## 9. Entitlements e limites

- `entitlements` é a decisão efetiva; plano é fonte comercial.
- Limites possíveis: seats, tenants subordinados, objetos, Storage, jobs, IA, exports, integrações e retenção.
- Enforcement no backend e, quando aplicável, banco/queue.
- UI antecipa limite, mas não é controle.
- Excesso gera erro estável e upgrade path; nunca corrupção.
- Métrica de uso deve ser reconciliável com source event.

## 10. Feature flags

- Owner, objetivo, ambientes, público, data de expiração e fallback obrigatórios.
- Avaliação server-side para segurança/entitlement.
- Flag não substitui autorização.
- Kill switches separados para IA, provider, integração e feature de risco.
- Flags antigas são removidas após rollout; inventário revisado mensalmente.

## 11. LGPD

Cada SaaS deve possuir:

- mapa de dados e finalidades;
- controlador/operadores/suboperadores;
- base legal por tratamento;
- privacy notice, termos e DPA quando aplicável;
- registro de consentimento quando essa for a base;
- processo de direitos do titular;
- retenção, exclusão, legal hold e backup lifecycle;
- avaliação de transferência internacional;
- incidente e comunicação;
- RIPD para risco elevado, IA ou dado sensível quando indicado.

Marketing e execução contratual não compartilham consentimento implicitamente.

## 12. Trilhas de auditoria

Registrar autenticação relevante, convite/revogação, papel, acesso sensível, mudança de estado, aprovação, publicação, export, billing, suporte, configuração, API key, prompt/modelo e privacidade.

Evento mínimo: actor, tenant, action, resource, before/after minimizado, reason, timestamp, request/trace e origem. Trilha é append-only e com retenção própria.

## 13. Isolamento de dados

- Banco, Storage, cache, search, analytics, queue e export respeitam tenant.
- Não usar bucket público para conteúdo de cliente.
- Cache key inclui tenant e autorização relevante.
- Dados de tenant não entram em treinamento/benchmark sem opt-in e governança.
- Ambiente não produtivo usa dados sintéticos/anônimos.
- Exclusão propaga por systems map e é verificável.

## 14. Segurança operacional

- Rate limit por tenant/identidade/IP hash conforme risco.
- Quotas impedem noisy neighbor.
- SLO e orçamento de erro por plano somente quando contratualmente suportado.
- Backup/restore e disaster recovery medidos.
- Suporte privilegiado usa sessão temporária, MFA, motivo e log.
- Secrets e API keys têm escopo, expiração/rotação e último uso.

## 15. Critérios de aceite SaaS

- Zero acesso cross-tenant em testes de banco, API, Storage, cache e jobs.
- Billing/webhook idempotente e reconciliável.
- Entitlements aplicados server-side.
- Trial/cancelamento/export comunicados claramente.
- DSR e exclusão demonstrados em staging.
- Audit trail cobre operações críticas.
- Feature flags têm owner e expiração.
- Restore e incident response exercitados.

