# ADR-007 — Sistema inicial de filas

**Status:** Accepted  
**Data:** 02/07/2026  
**Owners:** Tech + Operations  
**Decisão Foundation relacionada:** processamento assíncrono

## Contexto

IA, PDF, notificações, webhooks e retenção não devem prolongar requests HTTP. O sistema precisa de durabilidade, retry, visibilidade e isolamento por workload sem operar infraestrutura de mensageria separada prematuramente.

## Decisão

Adotar Supabase Queues (`pgmq`) como fila inicial, alimentada pela outbox definida no ADR-006.

Filas lógicas iniciais:

| Fila | Workload | Prioridade |
|---|---|---:|
| `audit-ai` | classificação e sugestões assistivas | normal |
| `report-export` | geração de PDF/artefatos | alta |
| `notifications` | e-mail/mensageria | normal |
| `webhook-delivery` | integrações de saída | normal |
| `privacy-retention` | exclusão/retenção | alta/controlada |
| `reconciliation` | billing e consistência | alta |

Workers usam pull/visibility timeout, ack após sucesso e retry com backoff + jitter. Após limite por classe, mensagem vai para dead-letter/quarentena com alerta.

## Semântica

- Garantia assumida pela aplicação: at-least-once.
- Ordem global: não garantida.
- Ordem por agregado: preservada quando necessária via versão/lock lógico.
- Exactly-once de negócio: obtido por idempotência, não por promessa da fila.
- Timeout, tentativas e concorrência são configurados por tipo de job.

## Alternativas consideradas

### Processar tudo em Edge Function síncrona

Rejeitada: cold start, timeout, latência e falhas do provider afetariam usuário.

### Serviço dedicado (SQS, Cloud Tasks, Kafka)

Adiado: adiciona fornecedor e operação. Será reconsiderado por volume, SLA, região ou limitação comprovada.

### Cron consultando tabelas de negócio

Rejeitada como fila geral: polling acopla processamento ao schema e tem semântica inferior. Cron continua válido para disparos periódicos pequenos.

## Consequências

- Menor quantidade de infraestrutura na V2/V3.
- Banco e fila compartilham dependência operacional.
- Jobs longos exigem worker adequado, não Edge Function curta.
- Migração futura requer adapter de queue e envelopes estáveis.

## Guardrails

- Payload mínimo e sem secrets.
- Limite de custo/concurrency por tenant e job type.
- Heartbeat ou visibility extension em job longo.
- Circuit breaker para provider degradado.
- Dead-letter nunca é reprocessada em massa sem dry-run.
- Jobs de privacidade/billing têm prioridade e controles adicionais.
- Retenção/arquivo da fila definidos por custo e auditoria.

## Sinais operacionais

- depth e age da mensagem mais antiga;
- taxa de processamento/sucesso/retry;
- duração p50/p95/p99;
- dead-letter por tipo/tenant hash;
- custo por job, especialmente IA/PDF;
- worker saturation e provider errors.

## Critérios de aceite futuro

- Retry e visibility timeout testados com falha realista.
- Duplicação não gera efeito duplo.
- Dead-letter dispara alerta com runbook.
- Backpressure impede um tenant de consumir toda capacidade.
- Adapter permite trocar a tecnologia sem alterar domínio.

## Referência oficial

- [Supabase Queues](https://supabase.com/docs/guides/queues)

