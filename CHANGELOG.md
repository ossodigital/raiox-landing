# Changelog

Todas as mudanças relevantes do RAIOX Landing são registradas neste arquivo.

## [0.3.1-foundation-closure] - 2026-07-02

### Foundation Closure / Pre-Commit Review

- Missões 001–003 revisadas e formalmente encerradas no escopo documental.
- `FOUNDATION_CLOSURE_REPORT.md` criado com entregas, decisões, riscos e pendências.
- `CHECKPOINT_004_FOUNDATION_CLOSURE` registrado.
- Links Markdown e documentos referenciados validados.
- 17 diagramas Mermaid aprovados por validação estrutural; compilação real ficou pendente por ausência de Mermaid CLI.
- Frozen set da Landing V1 confirmado idêntico ao baseline `b7984a2`.
- Ausência de alterações em runtime, assets, package, Vercel e deploy confirmada.
- Commit documental recomendado: `docs: close RAIOX Platform foundation planning cycle`.
- Próxima etapa renumerada para Missão 005 — Create RAIOX Platform Repository.

## [osso-digital-architecture-1.0.0] - 2026-07-02

### OSSO DIGITAL — Arquitetura Corporativa

- Arquitetura oficial do ecossistema OSSO DIGITAL documentada.
- Papéis e fronteiras de oito produtos/marcas consolidados.
- Padrões corporativos de engenharia, SaaS, documentação e agentes IA criados.
- Estratégia oficial de repositórios, packages, landings congeladas e integrações definida.
- Templates reutilizáveis de ADR, checkpoint e missão Codex adicionados.
- Roadmap corporativo V1–V6 publicado.
- `CHECKPOINT_OSSO_DIGITAL_ARCHITECTURE` registrado.
- Decisões RAIOX das Missões 001 e 002 preservadas.
- Nenhum runtime, deploy ou arquivo congelado da Landing V1 alterado.

## [0.2.0-architecture] - 2026-07-02

### RAIOX PLATFORM — Architecture Decisions

- Baseline arquitetural consolidada em oito ADRs aceitos.
- Separação definitiva entre Landing V1 e repositório da Platform registrada.
- Multi-tenancy compartilhada com `tenant_id`, RLS e constraints cross-tenant aprovada.
- Baseline de segurança Supabase e separação de ambientes formalizadas.
- REST `/v1` contract-first e política de compatibilidade aprovados.
- Monólito modular escolhido no lugar de microservices prematuros.
- Eventos com transactional outbox e entrega at-least-once definidos.
- Supabase Queues escolhido como fila inicial com consumers idempotentes.
- Pipeline de IA assistiva, assíncrona e human-in-the-loop aprovado.
- `CHECKPOINT_002_ARCHITECTURE_APPROVED` criado.
- Nenhuma implementação, deploy ou alteração na Landing V1 realizada.

## [0.1.0-foundation] - 2026-07-01

### RAIOX PLATFORM — planejamento

- Repositório V1 auditado e runtime congelado no baseline `b7984a2`.
- MASTER PLAN do RAIOX PLATFORM (OSSO AUDIT) criado sem implementação de negócio.
- Arquitetura, árvore, módulos, dependências e fluxos documentados.
- Modelagem Supabase multiempresa com `tenant_id` e RLS especificada.
- Contratos REST `/v1`, erros, idempotência e versionamento definidos.
- Estratégias de IA assistiva, testes, observabilidade, segurança e LGPD registradas.
- Backlog, critérios de aceite, comercial, monetização e cronograma V2–V5 consolidados.
- `CHECKPOINT_001_FOUNDATION` criado para aprovação executiva.
- Nenhum arquivo do runtime congelado da Landing V1 foi alterado.

## [1.0.0] - 2026-07-01

### Ready to Sell

- Release final RAIOX V1 Ready to Sell concluído e validado em produção.
- Domínio oficial configurado na Vercel.
- Landing comercial e relatório demonstrativo premium mantidos.
- Estrutura institucional criada em `legal/` e `pages/`.
- Página de obrigado com CTA humano adicionada.
- Navegação institucional, canonicals e metadados atualizados.
- Sitemap e robots atualizados para a estrutura final.
- Oferta do Diagnóstico RAIOX definida com preço sugerido de R$ 197.
- Documentos comerciais e operacionais adicionados.
- Processo manual mantido sem Supabase e sem OSSO ENGINE.
- Relatório demo integrado à jornada comercial da landing com CTA na hero, seção dedicada e acesso pela página de obrigado.

### Histórico consolidado

- Deploy estático corrigido.
- `index.html` e `report.html` publicados na raiz.
- WhatsApp humano provisório configurado.
- CTAs comerciais padronizados.
- Responsividade, acessibilidade e SEO técnico revisados.
