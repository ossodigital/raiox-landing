# Qualidade, segurança e operações

## 1. Estratégia de testes

### Pirâmide

| Camada | Escopo | Frequência | Gate |
|---|---|---|---|
| Estático | TypeScript strict, lint, format, secrets, dependências | todo commit | bloqueante |
| Unitário | domínio, validação, estados, cálculo e autorização pura | todo PR | bloqueante |
| Banco | migrations, constraints, funções e RLS com pgTAP | todo PR | bloqueante |
| Contrato | OpenAPI, schemas, backward compatibility, webhooks | todo PR | bloqueante |
| Integração | API + Supabase local + Storage + queue fake | todo PR | bloqueante |
| E2E | jornadas principais por papel | PR/preview e release | bloqueante no release |
| Segurança | SAST, SCA, DAST e tenant escape | PR/nightly | crítica bloqueia |
| IA | golden set, groundedness, PII, injection, custo | por prompt/modelo | bloqueia promoção |
| Performance | carga API, RLS, upload, PDF e filas | semanal/release | gate por SLO |
| DR | restauração e runbook | trimestral | evidência obrigatória |

### Casos unitários mínimos

- Máquina de estados aceita somente transições permitidas.
- Permissões negam por padrão e respeitam menor privilégio.
- Score limita faixa, arredondamento e versão metodológica.
- Relatório exige achados aprovados e justificativas.
- Idempotência retorna o resultado original para payload igual e conflito para payload diferente.
- Redação remove classes de PII configuradas.
- Entitlement impede uso além do plano sem alterar dados existentes.

### Integração e RLS

- Usuário A do tenant A não lê, cria, altera nem exclui recurso do tenant B.
- ID conhecido de outro tenant continua invisível.
- Membership revogada perde acesso após refresh/revogação de sessão.
- `service_role` está ausente de bundles e logs.
- Storage rejeita path cross-tenant e URL expirada.
- FK composta impede relacionamento cruzado entre tenants.
- Webhook duplicado não duplica cobrança, uso ou notificação.

### E2E obrigatório

1. Owner cria tenant, convida auditor e revisa papel.
2. Commercial cria/qualifica lead e converte em account.
3. Auditor cria auditoria, coleta evidência e envia para revisão.
4. Reviewer rejeita, auditor corrige e reviewer aprova.
5. Relatório é publicado, exportado e acessado pelo cliente.
6. Revogação de share bloqueia acesso imediatamente.
7. Falha de IA usa fallback manual sem perder auditoria.
8. Pagamento via webhook altera entitlement uma única vez.
9. Solicitação LGPD executa busca e exclusão simulada.
10. Tentativa cross-tenant falha em UI, API, banco e Storage.

### Metas iniciais de cobertura

- Domínio e autorização: ≥ 90% de branches.
- API e módulos: ≥ 80% de branches.
- UI: foco em jornadas e acessibilidade, não métrica isolada.
- 100% das políticas RLS com teste positivo e negativo.
- 100% das transições e endpoints críticos cobertos.

## 2. Observabilidade

### Padrão de evento

Campos mínimos: `timestamp`, `severity`, `service`, `environment`, `release`, `request_id`, `trace_id`, `tenant_id_hash`, `actor_id_hash`, `route_template`, `status_code`, `duration_ms`, `error_code`.

Proibido: access token, refresh token, secret, conteúdo integral de evidência, prompt bruto, saída bruta de IA, documento, e-mail/telefone em claro e URL assinada.

### Golden signals e métricas de negócio

| Categoria | Métricas |
|---|---|
| Tráfego | requests, usuários ativos, jobs, uploads |
| Erros | taxa 4xx/5xx, job failure, webhook failure, export failure |
| Latência | p50/p95/p99 por rota e job |
| Saturação | conexões DB, queue depth, worker concurrency, storage |
| Segurança | login falho, MFA, acesso negado, tenant escape detectado |
| IA | tokens, custo, timeout, schema reject, aprovação/rejeição humana |
| Produto | lead→auditoria, tempo de coleta, ciclo da auditoria, relatório entregue |

### SLO proposto para V2

- Disponibilidade mensal do app/API: 99,5%.
- Leitura API p95: ≤ 600 ms; escrita síncrona p95: ≤ 1 s, excluindo terceiros.
- Job comum: 95% inicia em até 2 min.
- Export PDF: 95% concluído em até 5 min.
- Webhook válido: 99% processado em até 5 min.
- Erro de isolamento cross-tenant: tolerância zero.

### Alertas

- P1: suspeita de vazamento, tenant escape, secret exposto, perda/corrupção de dados.
- P2: disponibilidade abaixo do SLO, fila parada, cobrança inconsistente, autenticação indisponível.
- P3: aumento de erro/latência, custo de IA anômalo, export atrasado.
- P4: degradação sem impacto imediato.

Cada alerta possui owner, janela, runbook, canal e regra de escalonamento. Alertas sem ação definida não entram em produção.

## 3. Segurança

### Autenticação

- Supabase Auth com e-mail magic link ou passwordless na primeira fase; decisão final em ADR.
- MFA obrigatório para platform admins, tenant owners e ações de alto risco.
- Sessões curtas para administração; rotação e revogação de refresh tokens conforme capacidade adotada.
- Proteção contra enumeração de conta, brute force e abuso de recovery.
- SSO empresarial somente V4, após necessidade comercial validada.

### Autorização

- RBAC por membership + ABAC por tenant, atribuição, estado e entitlement.
- RLS em banco e Storage como enforcement final.
- Deny by default.
- Funções privilegiadas pequenas, revisadas e sem SQL dinâmico desnecessário.
- Platform access separado do membership comum.
- Revisão trimestral de acessos e imediata em offboarding.

### Matriz de papéis

| Papel | Escopo | Privilégio-chave |
|---|---|---|
| `tenant_owner` | tenant | contrato, billing, admins |
| `tenant_admin` | tenant | membros e operação |
| `auditor` | auditorias atribuídas | coleta e drafts |
| `reviewer` | auditorias atribuídas | aprovação/rejeição |
| `commercial` | CRM | leads, contas e status |
| `client_viewer` | conta própria | coleta e relatório publicado |
| `platform_support` | temporário | suporte justificado |
| `platform_admin` | plataforma | governança, não conteúdo por padrão |
| `security_auditor` | plataforma | trilhas e incidentes |

### Proteção de dados

- TLS em trânsito e criptografia gerenciada em repouso.
- Secrets em secret manager/Vault, nunca no repo ou banco público.
- Campos altamente sensíveis com criptografia de aplicação quando o threat model exigir.
- Upload: MIME real, tamanho, extensão, hash, antivírus e quarentena.
- CSP, HSTS, cookies `Secure`, `HttpOnly`, `SameSite`, proteção CSRF quando aplicável.
- CORS por allowlist exata; sem `*` em endpoints autenticados.
- Dependências pinadas, SBOM e atualização automatizada revisada.
- Backups criptografados e restauração testada.

### Segurança da cadeia de IA

- Provider sem retenção/treino por padrão, contratualmente verificado.
- Prompt injection tratada como dado hostil, não instrução.
- Ferramentas e acesso de rede desligados por padrão.
- Outputs validados contra schema e políticas de conteúdo.
- Avaliação e aprovação antes de trocar prompt/modelo.
- Limite de custo e circuit breaker.

## 4. LGPD e governança

### Papéis a formalizar

- Controlador por fluxo de dados.
- Operadores e suboperadores.
- Canal do encarregado ou responsável por privacidade.
- Dono de cada conjunto de dados e política de retenção.

### Artefatos obrigatórios antes do beta

- Registro das operações de tratamento.
- Mapa de dados e fornecedores.
- Bases legais por finalidade.
- Aviso de privacidade da plataforma, termos e DPA.
- RIPD para tratamento de maior risco, especialmente evidências e IA.
- Processo de direitos do titular e incidente.
- Política de retenção/exclusão e legal hold.
- Avaliação de transferência internacional e contratos com fornecedores.
- Consentimento separado para marketing; não misturar com execução contratual.

### Privacy by design

- Coleta mínima e campos opcionais por padrão.
- Separação entre dado comercial, evidência, billing e telemetria.
- Pseudonimização em logs e analytics.
- Ambientes não produtivos sem cópia de dados reais, salvo processo aprovado e anonimizado.
- Exportação e exclusão com verificação de identidade e dupla checagem.

## 5. Trilha de auditoria

Registrar: login e MFA relevantes, convite/revogação, alteração de papel, acesso/baixar evidência, mudança de estado, score, aprovação/rejeição, publicação, share, billing, suporte privilegiado, alteração de metodologia/prompt e solicitação LGPD.

Todo evento inclui ator, tenant, ação, recurso, antes/depois minimizado, motivo, request/trace, timestamp e origem. Eventos são append-only, com acesso restrito e export controlado.

## 6. CI/CD e ambientes

```text
local → preview por PR → staging → production
```

- Projetos Supabase separados por ambiente; nunca schemas misturados por flag.
- Migrations forward-only e revisão dupla para RLS/destrutivas.
- Preview usa dados sintéticos.
- Deploy com build reproduzível, SBOM, scans e assinatura quando disponível.
- Feature flags para capacidades reversíveis; migrations exigem plano de rollback/roll-forward.
- Produção requer aprovação de owner e evidências dos gates.

## 7. Runbooks mínimos

- Incidente de segurança e LGPD.
- Vazamento/rotação de secret.
- Supabase indisponível.
- Fila parada/dead-letter.
- Webhook de billing inconsistente.
- Provider de IA indisponível ou resposta insegura.
- Export PDF falhando.
- Restauração de banco/Storage.
- Exclusão de tenant e atendimento ao titular.
- Custo anômalo de IA ou infraestrutura.

## 8. Critérios de aceite de readiness

- Threat model e privacy review aprovados.
- Zero finding crítico/alto aberto no release.
- RLS e tenant isolation testados automaticamente.
- Logs não contêm secrets ou PII conhecida.
- SLOs, dashboards, alertas e runbooks exercitados.
- Backup restaurado em teste.
- DPA/termos/políticas revisados.
- On-call e responsáveis nomeados.
- Plano de rollback testado.

