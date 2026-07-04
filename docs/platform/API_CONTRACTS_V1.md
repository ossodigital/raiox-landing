# Contratos REST versionados — OSSO AUDIT API

## 1. Convenções

- URL pública proposta: `https://api.audit.ossodigital.com.br/v1`.
- Versão maior no path. Mudanças aditivas não alteram `/v1`; breaking changes criam `/v2`.
- JSON UTF-8; datas ISO 8601 UTC; IDs UUID; nomes de campos em `snake_case`.
- Autenticação: `Authorization: Bearer <access_token>`.
- Tenant: `X-Tenant-Id` é contexto solicitado, nunca prova de acesso. A API valida membership e RLS.
- Correlação: cliente pode enviar `X-Request-Id`; servidor sempre devolve um ID válido.
- Idempotência: `Idempotency-Key` obrigatória em criação de auditoria, cobrança, export e webhook.
- Concorrência: `If-Match`/`version` em alterações críticas; conflito retorna `409`.
- Paginação: cursor opaco, `limit` padrão 25 e máximo 100.
- Ordenação e filtros são allowlists; nenhum fragmento SQL é aceito.
- OpenAPI 3.1 será a fonte executável na Missão 003; este documento é o contrato humano.

## 2. Envelope

### Sucesso singular

```json
{
  "data": { "id": "uuid", "type": "audit", "attributes": {} },
  "meta": { "request_id": "req_uuid", "api_version": "v1" }
}
```

### Lista

```json
{
  "data": [],
  "meta": {
    "request_id": "req_uuid",
    "next_cursor": "opaque_or_null",
    "has_more": false
  }
}
```

### Erro

```json
{
  "error": {
    "code": "AUDIT_INVALID_TRANSITION",
    "message": "A auditoria não pode avançar para o estado solicitado.",
    "details": [{ "field": "status", "reason": "transition_not_allowed" }],
    "request_id": "req_uuid"
  }
}
```

Mensagens não revelam existência de recurso de outro tenant. Nesse caso, a resposta pública é `404`.

## 3. Códigos HTTP

| Código | Uso |
|---|---|
| `200` | leitura/alteração concluída |
| `201` | recurso criado |
| `202` | job assíncrono aceito |
| `204` | ação sem corpo |
| `400` | request malformado |
| `401` | sessão ausente/inválida |
| `403` | identidade válida sem permissão |
| `404` | recurso inexistente ou invisível |
| `409` | conflito, idempotência ou transição |
| `422` | regra/validação semântica |
| `429` | limite excedido, com `Retry-After` |
| `500` | erro interno sanitizado |
| `503` | dependência temporariamente indisponível |

## 4. Recursos e endpoints

### Sessão e contexto

| Método | Endpoint | Papel mínimo | Resultado |
|---|---|---|---|
| GET | `/me` | autenticado | perfil, tenants e roles |
| GET | `/tenants` | autenticado | tenants acessíveis |
| GET | `/tenants/{tenant_id}` | membro | tenant atual |
| PATCH | `/tenants/{tenant_id}` | owner/admin | configurações permitidas |
| GET | `/tenants/{tenant_id}/members` | admin | memberships |
| POST | `/tenants/{tenant_id}/invitations` | admin | convite |
| DELETE | `/tenants/{tenant_id}/members/{membership_id}` | owner/admin | revoga acesso |

### Contas e leads

| Método | Endpoint | Papel mínimo |
|---|---|---|
| GET/POST | `/accounts` | membro / commercial |
| GET/PATCH | `/accounts/{account_id}` | membro autorizado |
| GET/POST | `/accounts/{account_id}/contacts` | commercial |
| GET/POST | `/leads` | commercial |
| POST | `/leads/{lead_id}/qualify` | commercial |
| POST | `/leads/{lead_id}/lose` | commercial |

### Auditorias

| Método | Endpoint | Papel mínimo | Observação |
|---|---|---|---|
| GET/POST | `/audits` | auditor / admin | criação idempotente |
| GET/PATCH | `/audits/{audit_id}` | equipe atribuída | patch com versão |
| POST | `/audits/{audit_id}/transitions` | conforme estado | registra motivo |
| GET/POST | `/audits/{audit_id}/sources` | auditor | metadados de fonte |
| POST | `/audits/{audit_id}/evidence/upload-intents` | auditor | URL assinada curta |
| POST | `/audits/{audit_id}/evidence/{id}/complete` | auditor | confirma hash/tamanho |
| GET | `/audits/{audit_id}/evidence` | equipe autorizada | sem conteúdo bruto por padrão |
| GET/POST | `/audits/{audit_id}/findings` | auditor |
| PATCH | `/audits/{audit_id}/findings/{finding_id}` | auditor/reviewer |
| POST | `/audits/{audit_id}/findings/{finding_id}/review` | reviewer |
| GET/POST | `/audits/{audit_id}/scores` | auditor/reviewer |
| GET/POST | `/audits/{audit_id}/recommendations` | auditor |
| GET/POST | `/audits/{audit_id}/action-plans` | auditor |

### IA assistiva

| Método | Endpoint | Papel mínimo | Resultado |
|---|---|---|---|
| POST | `/audits/{audit_id}/ai-runs` | auditor | `202` + job ID |
| GET | `/audits/{audit_id}/ai-runs/{run_id}` | equipe atribuída | status/custo/metadados |
| POST | `/audits/{audit_id}/ai-runs/{run_id}/cancel` | auditor/admin | cancelamento best effort |
| POST | `/audits/{audit_id}/ai-runs/{run_id}/review` | auditor/reviewer | aprova/rejeita sugestões |

Não existe endpoint de “publicar automaticamente pela IA”.

### Relatórios

| Método | Endpoint | Papel mínimo | Resultado |
|---|---|---|---|
| GET/POST | `/audits/{audit_id}/reports` | auditor | cria draft/snapshot |
| GET | `/reports/{report_id}` | autorizado | versão específica |
| POST | `/reports/{report_id}/approve` | reviewer | aprovação imutável |
| POST | `/reports/{report_id}/publish` | reviewer/admin | disponibiliza versão |
| POST | `/reports/{report_id}/exports` | autorizado | `202` para PDF |
| GET | `/report-exports/{export_id}` | autorizado | status/URL assinada |
| POST | `/reports/{report_id}/shares` | admin/auditor | token externo expirável |
| DELETE | `/report-shares/{share_id}` | admin/auditor | revogação |

### Cobrança e administração

| Método | Endpoint | Papel mínimo |
|---|---|---|
| GET | `/plans` | público/autenticado conforme catálogo |
| GET | `/billing/subscription` | tenant owner |
| POST | `/billing/checkout-sessions` | tenant owner |
| POST | `/billing/portal-sessions` | tenant owner |
| GET | `/billing/usage` | tenant owner/admin |
| GET | `/admin/tenants` | platform admin |
| POST | `/admin/support-sessions` | platform support + MFA |
| GET | `/admin/audit-events` | security/admin |

### Webhooks e sistema

| Método | Endpoint | Segurança |
|---|---|---|
| POST | `/webhooks/billing/{provider}` | assinatura do provedor + replay protection |
| POST | `/webhooks/messaging/{provider}` | assinatura + allowlist quando possível |
| GET | `/health/live` | sem dependências profundas |
| GET | `/health/ready` | dependências essenciais |

## 5. Exemplos normativos

### Criar auditoria

```http
POST /v1/audits
Authorization: Bearer <token>
X-Tenant-Id: 6b1...
Idempotency-Key: 8f7...
Content-Type: application/json
```

```json
{
  "account_id": "uuid",
  "methodology_id": "uuid",
  "assigned_auditor_id": "uuid",
  "due_at": "2026-07-10T18:00:00Z"
}
```

Resposta `201`:

```json
{
  "data": {
    "id": "uuid",
    "type": "audit",
    "attributes": {
      "status": "draft",
      "version": 1,
      "due_at": "2026-07-10T18:00:00Z"
    }
  },
  "meta": { "request_id": "req_uuid", "api_version": "v1" }
}
```

### Transição de estado

```json
{
  "to_status": "ready_for_analysis",
  "reason": "Coleta obrigatória concluída.",
  "expected_version": 4
}
```

### Solicitar assistência de IA

```json
{
  "purpose": "finding_suggestions",
  "dimension_ids": ["uuid"],
  "evidence_ids": ["uuid"],
  "prompt_version_id": "uuid",
  "human_instructions": "Priorize falhas de atendimento comprovadas."
}
```

Resposta `202`:

```json
{
  "data": {
    "id": "job_uuid",
    "type": "ai_run",
    "attributes": { "status": "queued" }
  },
  "meta": { "request_id": "req_uuid", "api_version": "v1" }
}
```

## 6. Catálogo inicial de erros

| Código | HTTP | Significado |
|---|---:|---|
| `AUTH_SESSION_REQUIRED` | 401 | token ausente/inválido |
| `AUTH_MFA_REQUIRED` | 403 | ação exige AAL2 |
| `TENANT_ACCESS_DENIED` | 404 | tenant/recurso invisível |
| `ROLE_NOT_ALLOWED` | 403 | papel insuficiente |
| `VALIDATION_FAILED` | 422 | schema inválido |
| `IDEMPOTENCY_CONFLICT` | 409 | mesma chave, payload diferente |
| `VERSION_CONFLICT` | 409 | edição concorrente |
| `AUDIT_INVALID_TRANSITION` | 409 | estado incompatível |
| `EVIDENCE_NOT_READY` | 422 | upload/scan incompleto |
| `AI_REVIEW_REQUIRED` | 422 | saída ainda não aprovada |
| `REPORT_NOT_APPROVED` | 422 | publicação bloqueada |
| `ENTITLEMENT_EXCEEDED` | 403 | limite do plano excedido |
| `RATE_LIMITED` | 429 | limite temporário |

## 7. Rate limits iniciais propostos

| Classe | Limite inicial | Chave |
|---|---:|---|
| leitura autenticada | 300/min | usuário + tenant |
| escrita autenticada | 60/min | usuário + tenant |
| upload intent | 20/min | usuário + tenant |
| IA | 10/h | tenant + entitlement |
| export PDF | 20/h | tenant |
| login/recovery | política do Auth + proteção adicional | IP hash + identidade |
| webhook | burst 300/min | provedor |

Limites finais dependem de teste de carga e plano comercial.

## 8. Compatibilidade e depreciação

- Campo novo é opcional até ciclo seguinte.
- Enum novo exige clientes tolerantes a valor desconhecido.
- Endpoint deprecado recebe headers `Deprecation` e `Sunset` com janela mínima proposta de 90 dias.
- OpenAPI, SDK e changelog são publicados juntos.
- Contract tests impedem breaking change não versionada.

## 9. Critérios de aceite dos contratos

- OpenAPI valida 100% dos endpoints implementados.
- Requests/responses passam por schema compartilhado.
- Toda escrita crítica suporta idempotência ou controle otimista.
- Toda resposta contém `request_id`.
- Testes provam que recurso cross-tenant responde sem vazamento.
- Webhooks validam assinatura, timestamp, replay e duplicidade.
- API nunca entrega URL permanente de evidência privada.
