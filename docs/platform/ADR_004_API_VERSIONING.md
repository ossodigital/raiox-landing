# ADR-004 — Versionamento e governança da API

**Status:** Accepted  
**Data:** 02/07/2026  
**Owners:** Tech + Product  
**Decisão Foundation relacionada:** D-005

## Contexto

Web app, portal, workers, integrações e futuros parceiros precisam de contrato estável que não exponha o schema Supabase como interface de produto. Mudanças de banco e módulos devem ocorrer sem quebrar consumidores.

## Decisão

Adotar REST contract-first com:

- versão maior no path: `/v1`;
- OpenAPI 3.1 como fonte executável a partir da Missão 003;
- JSON UTF-8 e `snake_case`;
- envelopes de sucesso/erro definidos no contrato da Foundation;
- cursor pagination, allowlists de filtro/ordenação;
- `Idempotency-Key` em efeitos críticos;
- `If-Match` ou `version` para concorrência otimista;
- `X-Request-Id` para correlação;
- política de depreciação e janela de sunset;
- schemas compartilhados entre API, SDK e testes de contrato.

Mudanças aditivas compatíveis permanecem em `/v1`. Remoção, mudança semântica ou alteração incompatível cria versão maior.

## Compatibilidade

| Mudança | `/v1` | Requisito |
|---|---:|---|
| endpoint novo | sim | autorização e docs |
| campo opcional novo | sim | cliente tolerante |
| enum novo | condicional | fallback obrigatório |
| campo obrigatório novo | não | `/v2` ou migração compatível |
| renomear/remover campo | não | depreciação + `/v2` |
| mudar significado/status | não | nova versão |

## Alternativas consideradas

### Expor Data REST do Supabase como contrato público

Rejeitada como interface principal: acopla consumidores ao schema, dificulta workflows e amplia superfície. Pode ser usado internamente e sob RLS quando apropriado.

### GraphQL como contrato primário

Adiada: flexível, porém adiciona governança/custo sem necessidade validada. Novo ADR poderá introduzi-lo como complemento.

### Versionamento por header

Rejeitado inicialmente: menos visível em logs, caches e suporte. Path explícito é mais operacional.

## Consequências

- OpenAPI e contract tests tornam-se gates de release.
- Mapeamento entre domínio e DTO é obrigatório.
- Haverá custo de manter versões durante sunset.
- Banco pode evoluir sem expor detalhes aos clientes.

## Guardrails

- Nenhum endpoint aceita `tenant_id` como prova de autorização.
- Erros não revelam recurso de outro tenant.
- Dados sensíveis não aparecem por padrão; expansões são allowlist.
- Webhooks validam assinatura, timestamp, replay e idempotência.
- Rate limits por classe, tenant e identidade.
- Admin API separada por autorização, não por obscuridade.

## Critérios de aceite futuro

- 100% das rotas implementadas aparecem no OpenAPI.
- CI detecta breaking change não versionada.
- SDK/testes são gerados ou validados pelo mesmo schema.
- Respostas têm request ID e erros estáveis.
- Testes provam idempotência, paginação e concorrência.

