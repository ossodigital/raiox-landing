# Relatório executivo — Missão 001 Foundation

> Registro histórico da Foundation. O gate arquitetural foi atendido em 02/07/2026 pelo `CHECKPOINT_002_ARCHITECTURE_APPROVED`. Pendências jurídicas, comerciais, metodológicas e de fornecedor continuam abertas e não autorizam produção.

## Status

**Foundation documental concluída; implementação não autorizada.**

A Landing RAIOX V1 foi auditada e classificada como dependência externa congelada no commit `b7984a2`. Nenhum arquivo do runtime V1 deve ser alterado pela futura plataforma. O alvo recomendado é um novo repositório SaaS multiempresa denominado `raiox-platform`, com produto técnico **OSSO AUDIT**.

## Recomendação principal

Avançar para a Missão 002 somente após aprovar oito decisões: repositório/domínio, papéis de acesso, metodologia de score, região/plano Supabase, fornecedores, retenção, responsabilidade LGPD e hipótese de monetização.

## O que foi definido

- Arquitetura modular, multiempresa e orientada a API.
- Separação formal entre Landing V1 e plataforma.
- Árvore completa do futuro repositório.
- Modelagem Supabase com `tenant_id`, RLS, evidências, IA, relatório, billing e governança.
- REST `/v1`, envelopes, erros, idempotência, paginação e endpoints.
- Fluxos de cliente, auditor, reviewer, admin, IA, relatório, pagamento e LGPD.
- Estratégia de testes, observabilidade, segurança, CI/CD e runbooks.
- Backlog, critérios de aceite e cronograma V2–V5.
- Estratégia comercial e hipóteses de monetização.
- Inventário do que pode e do que não pode ser reaproveitado do V1.

## Riscos priorizados

| Risco | Prob. | Impacto | Tratamento recomendado | Gate |
|---|---:|---:|---|---|
| Vazamento cross-tenant | média | crítico | RLS, FK composta, testes negativos e pentest | V2 P0 |
| Metodologia/score sem validação | alta | alto | comitê metodológico, versão e justificativa | pré-implementação |
| Evidências com dados pessoais/sensíveis | alta | crítico | minimização, criptografia, retenção, RIPD e DPA | V2 P0 |
| IA alucinar ou obedecer prompt injection | alta | alto | evidência citada, schema, redaction e revisão humana | V3 P0 |
| Custo de IA inviabilizar margem | média | alto | budgets, cache permitido, medição e limites por tenant | V3 |
| Dependência excessiva de Supabase/provider | média | médio/alto | adapters, export, backup testado e contratos | V2 |
| Billing inconsistente | média | alto | webhook assinado, idempotência e reconciliação | V3 |
| Escopo V2 crescer para V5 | alta | alto | gates, não objetivos e backlog rígido | contínuo |
| Alteração acidental da Landing V1 | baixa | alto | frozen set, hashes, repo separado e CODEOWNERS | imediato |
| Documentação legal insuficiente | alta | alto | revisão jurídica antes de beta | pré-beta |
| Operação depender de uma pessoa | média | alto | papéis, SOP, filas, SLA e runbooks | V2 |
| Benchmark reidentificável | média | alto | limiar de amostra, agregação e opt-out | V4 |

## Dependências críticas

1. Patrocínio e product owner com poder de escopo.
2. Auditor responsável por formalizar metodologia e golden cases.
3. Responsável de segurança/privacidade e assessoria jurídica.
4. Contas e contratos de Supabase, Vercel/hosting, IA, pagamentos e telemetria.
5. Equipe mínima sugerida: tech lead/backend, full-stack, product/design, QA compartilhado e auditor de domínio.
6. Design partners para beta com dados controlados e consentimento adequado.

## Decisões para aprovação

| ID | Decisão | Recomendação | Aprovador |
|---|---|---|---|
| D-001 | Repositório | novo `ossodigital/raiox-platform` | direção + tech |
| D-002 | Domínio | `app.audit.ossodigital.com.br` e `api.audit.ossodigital.com.br` | marca + tech |
| D-003 | Tenancy | banco compartilhado, schema compartilhado, `tenant_id` + RLS | security + tech |
| D-004 | Auth | Supabase Auth, MFA para alto risco | security |
| D-005 | API | REST `/v1` como contrato oficial | tech |
| D-006 | Relatório | snapshots imutáveis e export assíncrono | produto + auditoria |
| D-007 | IA | assistiva, sem publicação autônoma | produto + jurídico |
| D-008 | V2 | workflow humano completo antes de IA | direção + produto |
| D-009 | Monetização | V1 R$197 preservada; SaaS validado por design partners | comercial |
| D-010 | Retenção | matriz por classe e contrato, antes de beta | jurídico + segurança |

## Recomendações de execução

1. Aprovar este plano e registrar ADRs D-001 a D-010.
2. Criar novo repositório sem copiar o runtime da landing.
3. Implementar primeiro tenancy, RLS e testes de isolamento.
4. Formalizar metodologia antes de modelar cálculo de score.
5. Entregar V2 totalmente humana e auditável.
6. Só então introduzir IA com dataset, avaliação, budgets e kill switch.
7. Conduzir beta fechado com 3–5 design partners e dados minimizados.
8. Revisar preço depois de medir tempo humano, custo de IA, suporte e conversão.

## Indicadores de aprovação da Foundation

- [ ] D-001 a D-010 têm aprovador e registro.
- [ ] Frozen set do V1 aceito.
- [ ] Papéis de produto, metodologia, segurança e privacidade nomeados.
- [ ] Modelo multiempresa e matriz de acesso aprovados.
- [ ] V2 cabe em equipe, orçamento e prazo reais.
- [ ] Fornecedores podem cumprir privacidade, residência e retenção necessárias.
- [ ] Critérios de sucesso do beta foram quantificados.

## Próximo checkpoint recomendado

**CHECKPOINT_002_ARCHITECTURE_APPROVED**

Somente depois dele pode ser planejada a **Missão 003 — Platform Skeleton**, limitada a repositório, CI, ambientes, Auth, tenancy, migrations-base, RLS e testes de isolamento; ainda sem lógica de score ou IA.
