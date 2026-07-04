# ADR-005 — Fronteiras do monólito modular

**Status:** Accepted  
**Data:** 02/07/2026  
**Owners:** Tech  
**Decisão Foundation relacionada:** arquitetura lógica e árvore-alvo

## Contexto

O produto precisa de separação clara entre tenancy, CRM, auditoria, evidência, IA, relatório e billing. Entretanto, V2 ainda não possui escala, equipe ou requisitos de disponibilidade que justifiquem microservices independentes.

## Decisão

Adotar monorepo com monólito modular e três unidades de execução:

- `apps/web`: interface e BFF estritamente de apresentação quando necessário;
- `apps/api`: API `/v1` e módulos do domínio;
- `apps/worker`: consumidores assíncronos e adapters externos.

Módulos normativos:

`identity`, `tenancy`, `crm`, `methodology`, `audit-workflow`, `evidence`, `findings-scoring`, `action-planning`, `reporting`, `billing`, `notifications`, `governance`, `audit-trail` e `platform-admin`.

Cada módulo possui contratos públicos, domínio, aplicação e adapters. Tabelas têm ownership declarado. Um módulo não consulta/escreve tabela de outro diretamente; usa porta de aplicação, read model aprovado ou evento.

## Regra de dependência

```mermaid
flowchart LR
  UI[Web] --> APP[Application ports]
  HTTP[REST adapters] --> APP
  JOB[Worker adapters] --> APP
  APP --> DOM[Domain]
  INFRA[Supabase / providers] --> PORTS[Domain ports]
  DOM -. não depende .->|X| INFRA
```

Shared packages podem conter contratos, observabilidade, config, validação, UI e test-kit. Não podem virar um “shared business” sem owner.

## Ownership inicial

| Módulo | Entidades principais | Pode depender de |
|---|---|---|
| tenancy | tenants, memberships, invitations | identity |
| crm | leads, accounts, contacts, activities | tenancy |
| methodology | segments, methodologies, dimensions | tenancy para catálogo privado |
| audit-workflow | audits, status history | crm, methodology, tenancy |
| evidence | sources, evidence, access logs | audit-workflow, governance |
| findings-scoring | findings, scores, recommendations | evidence, methodology, audit-workflow |
| reporting | report versions, exports, shares | findings-scoring, action-planning |
| billing | plans, subscriptions, usage, entitlements | tenancy |
| governance | consent, DSR, retention | tenancy e portas dos módulos |
| audit-trail | eventos imutáveis | todos publicam; poucos leem |

## Alternativas consideradas

### Microservices desde V2

Rejeitada: aumenta deploys, observabilidade, consistência distribuída e custo cognitivo antes de haver necessidade.

### Aplicação em camadas sem módulos de domínio

Rejeitada: tende a acoplar features por tabelas e serviços genéricos.

### Frontend acessando livremente todas as tabelas Supabase

Rejeitada: RLS não substitui boundaries, workflows e contratos de produto.

## Consequências

- Transações locais permanecem simples.
- Boundaries podem ser testados e extraídos no futuro.
- Disciplina arquitetural é necessária para impedir “big ball of mud”.
- API/worker compartilham domínio sem duplicar regras.

## Critério para extrair serviço

Extração exige novo ADR e pelo menos um: necessidade de escala isolada comprovada, domínio/equipe autônoma, requisito de disponibilidade distinto, boundary estável ou restrição regulatória. Preferência técnica isolada não basta.

## Critérios de aceite futuro

- Lint/dependency rules impedem imports proibidos.
- Ownership de tabela e evento está documentado.
- Testes de arquitetura falham em dependência circular.
- Domínio roda em testes sem Supabase/framework.
- Cada módulo expõe apenas contratos necessários.

