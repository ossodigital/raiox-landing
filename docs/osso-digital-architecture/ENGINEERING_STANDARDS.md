# Padrões oficiais de engenharia — OSSO DIGITAL

## 1. Aplicação

Normativo para todo runtime novo. Projetos existentes adotam progressivamente por roadmap/checkpoint, sem refatoração destrutiva automática.

Palavras: **DEVE** obrigatório; **NÃO DEVE** proibido; **PODE** opcional documentado.

## 2. Monorepo e modularização

- Produtos distintos DEVEM usar repositórios distintos conforme [Repository Strategy](./REPOSITORY_STRATEGY.md).
- Um produto com web/API/worker PODE usar monorepo.
- Domínio NÃO DEVE depender de framework, banco ou provider.
- Módulos DEVEM ter owner, contrato público e tabelas/eventos sob ownership.
- Dependências circulares são proibidas.
- “Shared” não pode acumular lógica de negócio sem fronteira.

## 3. Nomenclatura

| Elemento | Padrão | Exemplo |
|---|---|---|
| repositório | `kebab-case` | `raiox-platform` |
| app/package | `kebab-case` | `audit-workflow` |
| TypeScript arquivo | `kebab-case.ts` | `audit-service.ts` |
| tipos/classes | `PascalCase` | `AuditStatus` |
| função/variável | `camelCase` | `createAudit` |
| constante | `UPPER_SNAKE_CASE` | `MAX_RETRIES` |
| tabela/coluna SQL | `snake_case` plural/técnico consistente | `audit_events` |
| evento | `domain.fact` | `report.published` |
| env var | `UPPER_SNAKE_CASE` | `SUPABASE_URL` |
| branch | `type/short-kebab` | `feat/audit-workflow` |

Nomes de domínio permanecem em inglês no código e português na interface quando o produto for pt-BR. Glossário resolve ambiguidades.

## 4. Git, branches e commits

- Trunk-based development com `main` protegida.
- Branch curta: `feat/`, `fix/`, `docs/`, `chore/`, `refactor/`, `test/`, `security/`.
- Sem commits diretos em `main`, salvo procedimento de emergência registrado.
- PR pequena, objetivo único, checklist e evidência de teste.
- Conventional Commits: `type(scope): descrição`.
- Tipos oficiais: `feat`, `fix`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`, `chore`, `revert`, `security`.
- Breaking change usa `!` e seção `BREAKING CHANGE`.
- Rebase/squash conforme política do repo; histórico final deve ser inteligível.
- Secrets, dumps, `.env` real e dados pessoais nunca entram no Git.

## 5. Versionamento e release

- SemVer para runtimes/packages: `MAJOR.MINOR.PATCH`.
- Pré-release: `-alpha.N`, `-beta.N`, `-rc.N`.
- Releases exclusivamente documentais podem usar sufixo descritivo, como `0.2.0-architecture`.
- Tag imutável e release notes correspondentes.
- `VERSION.md` registra produto, versão, status, data e compatibilidade.
- Changelog segue histórico aditivo; não apagar versões anteriores.

## 6. Documentação

- Aplicar [Documentation Standards](./DOCUMENTATION_STANDARDS.md).
- Decisão arquitetural relevante exige ADR antes ou junto da mudança.
- Módulo concluído exige README, critérios de aceite, checkpoint e riscos.
- API pública exige OpenAPI e depreciação.
- Runbook acompanha toda operação que pode alertar fora do fluxo normal.

## 7. Qualidade estática

- TypeScript strict quando TypeScript for adotado.
- Linter e formatter únicos por repositório; CI verifica sem alterar.
- Configuração compartilhada por package corporativo quando houver dois consumidores reais.
- Warnings novos falham o CI em código crítico.
- Secret scan, dependency scan e license review no pipeline.
- Lockfile é obrigatório e atualizado conscientemente.

## 8. Testes

| Camada | Obrigatório |
|---|---|
| unitário | domínio, validação, state machines e autorização pura |
| banco | constraints, migrations e RLS positivas/negativas |
| contrato | REST/eventos/webhooks e backward compatibility |
| integração | adapters e dependências locais/fakes controlados |
| E2E | jornadas críticas por papel |
| segurança | tenant escape, authz, secrets, uploads e DAST proporcional |
| performance | endpoints/jobs críticos contra SLO |
| recuperação | restore e rollback exercitados |

Cobertura é sinal, não objetivo isolado. Domínio/autorização almejam ≥90% branches; módulos ≥80%; 100% de políticas RLS e transições críticas têm casos positivos e negativos.

## 9. Deploy

- Build uma vez, promover artefato imutável.
- CI e CD separados logicamente; produção exige aprovação e gates.
- Deploy automático só após testes, scans, migration plan e rollback.
- Feature flag para mudanças reversíveis; não usar flag eterna.
- Health checks de liveness/readiness quando aplicável.
- Mudança não observável ou sem rollback não está pronta.

## 10. Ambientes

```text
local → preview/ephemeral → staging → production
```

- Contas/projetos/secrets/dados separados.
- Preview e staging usam dados sintéticos.
- Produção não é ambiente de teste.
- Configuração divergente deve ser explícita e versionada.
- Acesso produtivo é least privilege, MFA e auditado.

## 11. Variáveis de ambiente e secrets

- `.env.example` contém nomes e exemplos não secretos.
- Schema valida env no startup; falha rápida se ausente/inválida.
- Prefixo público explícito (`PUBLIC_`, conforme framework) apenas para dados realmente públicos.
- Secrets em manager do ambiente, rotacionáveis e com owner.
- Proibido logar env completa.
- Chaves por ambiente e finalidade; sem secret universal corporativo.

## 12. Migrations

- Migration é forward-only, ordenada, revisada e reproduzível.
- Proibido editar migration já aplicada em ambiente compartilhado.
- Mudança destrutiva usa expand → migrate/backfill → contract.
- RLS/permissions fazem parte da migration e dos testes.
- Backfill grande é job observável e reiniciável.
- Plano de roll-forward/rollback e impacto de lock são obrigatórios.
- Schema manual via dashboard deve ser capturado imediatamente ou é proibido.

## 13. Seeds e fixtures

- Seeds são determinísticos, idempotentes e sintéticos.
- Separar seed estrutural (catálogos) de demo/teste.
- Nunca copiar produção para desenvolvimento sem processo de anonimização aprovado.
- Fixtures pequenas e legíveis; factories para variações.

## 14. Logs e observabilidade

- Logs estruturados JSON em runtime, com `timestamp`, `level`, `service`, `environment`, `release`, `request_id`, `trace_id`, rota/evento e duração.
- PII, tokens, secrets, URLs assinadas, prompts/outputs brutos são proibidos.
- Métricas cobrem tráfego, erros, latência e saturação.
- Traces atravessam API, evento, queue e worker por correlation/causation ID.
- Cada SLO possui dashboard, alerta acionável e runbook.
- Métricas de produto não substituem telemetria operacional.

## 15. Segurança

- Threat model proporcional antes de auth, upload, IA, billing e integração.
- Deny by default, least privilege, MFA para alto risco.
- Validação server-side e encoding de saída.
- CORS/CSP/CSRF/cookies conforme arquitetura.
- Upload com MIME real, tamanho, hash, scan e quarentena.
- SCA/SAST/secret scan e patches por SLA de severidade.
- Dependência sem manutenção/licença compatível não entra sem aprovação.
- Incidente segue runbook, preservação de evidência e comunicação definida.

## 16. Rollback e continuidade

- Cada release define rollback técnico e impacto de dados.
- Migration incompatível prioriza roll-forward seguro.
- Feature flag/kill switch para provider, IA e integração.
- Backup sem restore testado não conta como controle.
- Pós-rollback exige verificação funcional, consistência e audit event.
- Incidente P1/P2 gera postmortem sem culpa e ações com owner/prazo.

## 17. Definition of Ready

Problema/persona, owner, escopo/fora de escopo, contratos, critérios, riscos, impacto de dados/LGPD, testes, observabilidade, rollout e rollback definidos.

## 18. Definition of Done

Código/artefato revisado; testes/scans verdes; docs/changelog/checkpoint atualizados; telemetria/runbook presentes; segurança/acessibilidade verificadas; deploy ou entrega documental validada; riscos residuais registrados.
