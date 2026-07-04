# CHECKPOINT_002_ARCHITECTURE_APPROVED

**Status:** aprovado como baseline arquitetural  
**Data:** 02/07/2026  
**Versão documental:** `0.2.0-architecture`  
**Baseline da Landing V1:** `b7984a2`

## Escopo aprovado

- ADR-001: Landing e Platform em repositórios independentes.
- ADR-002: multi-tenancy compartilhada com `tenant_id` e RLS.
- ADR-003: baseline de segurança Supabase em camadas.
- ADR-004: REST contract-first versionado em `/v1`.
- ADR-005: monólito modular em monorepo, sem microservices prematuros.
- ADR-006: eventos de domínio com transactional outbox e at-least-once.
- ADR-007: Supabase Queues como fila inicial e consumers idempotentes.
- ADR-008: IA assíncrona, assistiva, rastreável e human-in-the-loop.

## Evidências

- [`ARCHITECTURE_DECISIONS.md`](../docs/platform/ARCHITECTURE_DECISIONS.md)
- [`ADR_INDEX.md`](../docs/platform/ADR_INDEX.md)
- ADRs 001–008 com status `Accepted`, alternativas, consequências, guardrails e critérios de aceite.
- Master Plan e contratos alinhados à sequência Missão 001 → Missão 002 → futura Missão 003.
- Documentação de release atualizada.

## Restrições mantidas

- Nenhuma lógica de negócio foi escrita.
- Nenhuma migration, API, função, worker ou integração foi criada.
- Nenhum deploy foi realizado.
- Nenhum arquivo do runtime congelado da Landing V1 foi alterado.
- Aprovação arquitetural não equivale a aprovação jurídica, comercial ou de produção.

## Gates ainda abertos

- metodologia e pesos de score;
- região, plano, backup e DPA do Supabase;
- fornecedores de IA, pagamento, mensageria e observabilidade;
- matriz final de retenção e documentos LGPD;
- versões exatas do stack e estratégia de ambientes;
- orçamento, equipe e critérios de sucesso do beta.

## Próximo checkpoint recomendado

`CHECKPOINT_003_PLATFORM_SKELETON_READY`

A Missão 003 não foi iniciada por este checkpoint.

