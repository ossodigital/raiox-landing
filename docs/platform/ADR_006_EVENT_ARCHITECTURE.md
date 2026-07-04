# ADR-006 — Arquitetura de eventos e transactional outbox

**Status:** Accepted  
**Data:** 02/07/2026  
**Owners:** Tech + Operations  
**Decisão Foundation relacionada:** eventos de domínio e trilha

## Contexto

Auditoria, relatório, notificações, IA e billing têm efeitos assíncronos. Publicar mensagem depois de salvar no banco cria dual write: uma falha entre as duas operações perde o evento. Eventos também precisam sobreviver a retry e duplicidade.

## Decisão

Adotar eventos de domínio com transactional outbox no mesmo Postgres:

1. A transação grava estado de negócio e registro de outbox atomicamente.
2. Dispatcher publica mensagens da outbox na fila.
3. Entrega é **at-least-once**.
4. Consumidores são idempotentes e registram processamento por `event_id`.
5. Falhas transitórias usam retry com backoff; falhas permanentes vão para dead-letter.
6. `audit_events` registra trilha de negócio, mas não substitui a outbox.
7. Estado atual permanece em tabelas relacionais; não será usado event sourcing.

## Envelope de evento

```json
{
  "event_id": "uuid",
  "event_type": "report.approved",
  "schema_version": 1,
  "tenant_id": "uuid",
  "aggregate_type": "report",
  "aggregate_id": "uuid",
  "occurred_at": "2026-07-02T12:00:00Z",
  "actor": { "type": "user", "id": "uuid" },
  "correlation_id": "uuid",
  "causation_id": "uuid_or_null",
  "payload": { "report_version_id": "uuid" }
}
```

Payload contém referências e dados mínimos, não evidência, token, prompt ou PII integral.

## Taxonomia

- Presente perfeito para fatos: `audit.created`, `evidence.ready`, `report.approved`.
- Nome estável de domínio, sem nome de tabela/provider.
- Schema versionado por tipo.
- Eventos internos não são API pública sem decisão explícita.

## Alternativas consideradas

### Chamadas síncronas para todos os efeitos

Rejeitada: aumenta latência, acoplamento e falha em cascata.

### Publicar diretamente após commit

Rejeitada: janela de perda entre commit e publish.

### Event sourcing

Rejeitada: complexidade de reconstrução, evolução e operação não justificada. Audit trail e versões imutáveis atendem rastreabilidade atual.

### CDC como fonte inicial

Adiada: pode ser útil em escala, mas outbox explícita comunica intenção e minimiza payload.

## Consequências

- Consistência externa é eventual.
- UI precisa representar estados `queued/processing/failed`.
- Duplicidade é comportamento esperado, não exceção.
- Outbox exige monitoramento, limpeza e replay seguro.

## Guardrails

- `event_id` único e imutável.
- Publisher não remove registro antes de confirmação.
- Consumidor marca idempotência na mesma transação do efeito local quando possível.
- Replay exige autorização, filtro, dry-run e audit event.
- Eventos sensíveis usam referência e acesso posterior autorizado.
- Alterar schema exige compatibilidade ou nova versão.

## Critérios de aceite futuro

- Teste simula crash entre commit e dispatch sem perder evento.
- Mensagem duplicada não duplica efeito.
- Métricas cobrem lag, retry, dead-letter e idade máxima.
- Replay é rastreável e limitado por tenant/evento.
- Contract tests validam envelopes e versões.

