# RAIOX Landing

Landing oficial do RAIOX, produto da OSSO DIGITAL para diagnosticar gargalos de vendas e atendimento e organizar prioridades comerciais.

## Foundation Closure

As Missões 001–003 do RAIOX Platform / OSSO Audit / OSSO DIGITAL Architecture foram revisadas e encerradas documentalmente na versão `0.3.1-foundation-closure`.

- [Relatório de fechamento](docs/platform/FOUNDATION_CLOSURE_REPORT.md)
- [CHECKPOINT_004_FOUNDATION_CLOSURE](checkpoints/CHECKPOINT_004_FOUNDATION_CLOSURE.md)
- Status: **aprovado para commit documental**.
- Runtime/deploy: **não alterado e não autorizado**.
- Próxima missão recomendada: **MISSÃO 005 — CREATE RAIOX PLATFORM REPOSITORY**.

Nota de sequência: referências históricas ao “Platform Skeleton” como Missão 003 foram supersedidas. A Missão 003 executada foi a arquitetura corporativa; o skeleton passa a ser recomendado como Missão 005.

## Arquitetura corporativa OSSO DIGITAL

Este repositório passa a registrar a baseline documental da arquitetura corporativa oficial da OSSO DIGITAL. Ela é referência para RAIOX, RAIOX Platform, OSSO Audit, OSSO Engine, OSSO Post System, OSSO DIGITAL Landing, Tattoo Até os Ossos, Sétima Arte e projetos futuros.

- [Arquitetura corporativa](docs/osso-digital-architecture/OSSO_DIGITAL_ARCHITECTURE.md)
- [Mapa de produtos](docs/osso-digital-architecture/PRODUCT_MAP.md)
- [Padrões de engenharia](docs/osso-digital-architecture/ENGINEERING_STANDARDS.md)
- [Padrões SaaS](docs/osso-digital-architecture/SAAS_STANDARDS.md)
- [Padrões de documentação](docs/osso-digital-architecture/DOCUMENTATION_STANDARDS.md)
- [Padrões para agentes IA](docs/osso-digital-architecture/AI_AGENT_STANDARDS.md)
- [Estratégia de repositórios](docs/osso-digital-architecture/REPOSITORY_STRATEGY.md)
- [Roadmap do ecossistema](docs/osso-digital-architecture/ECOSYSTEM_ROADMAP.md)
- [Checkpoint da Missão 003](checkpoints/CHECKPOINT_OSSO_DIGITAL_ARCHITECTURE.md)

Essa baseline é exclusivamente documental. Não altera ownership, runtime ou deploy dos produtos automaticamente.

## Missão 001 — Foundation

O repositório também abriga, **somente como documentação**, o MASTER PLAN do futuro **RAIOX PLATFORM (OSSO AUDIT)**. A plataforma será criada em repositório próprio e tratará esta Landing V1 como dependência externa congelada.

- Baseline congelada do V1: `b7984a2`.
- Status da Landing: **RAIOX V1 — READY TO SELL**.
- Status da plataforma: **Baseline arquitetural aprovada — documentação somente**.
- Versão documental: `0.2.0-architecture`.
- Implementação de negócio da plataforma: **não iniciada**.
- Documento principal: [`docs/platform/MASTER_PLAN_RAIOX_PLATFORM.md`](docs/platform/MASTER_PLAN_RAIOX_PLATFORM.md).
- Decisões consolidadas: [`docs/platform/ARCHITECTURE_DECISIONS.md`](docs/platform/ARCHITECTURE_DECISIONS.md).
- Índice de ADRs: [`docs/platform/ADR_INDEX.md`](docs/platform/ADR_INDEX.md).
- Relatório para aprovação: [`docs/platform/EXECUTIVE_REPORT_FOUNDATION.md`](docs/platform/EXECUTIVE_REPORT_FOUNDATION.md).
- Checkpoint: [`checkpoints/CHECKPOINT_001_FOUNDATION.md`](checkpoints/CHECKPOINT_001_FOUNDATION.md).
- Checkpoint arquitetural: [`checkpoints/CHECKPOINT_002_ARCHITECTURE_APPROVED.md`](checkpoints/CHECKPOINT_002_ARCHITECTURE_APPROVED.md).

### Fronteira entre os ativos

| Ativo | Repositório | Papel | Regra |
|---|---|---|---|
| RAIOX Landing V1 | `ossodigital/raiox-landing` | aquisição, demo e contato humano | congelado e independente |
| RAIOX PLATFORM / OSSO AUDIT | futuro `ossodigital/raiox-platform` | SaaS multiempresa de auditoria | novo produto, sem copiar o runtime V1 |

### Documentação da plataforma

- [Arquitetura e árvore definitiva](docs/platform/MASTER_PLAN_RAIOX_PLATFORM.md)
- [Auditoria e componentes reutilizáveis do V1](docs/platform/V1_BASELINE_AUDIT.md)
- [Modelagem Supabase multiempresa](docs/platform/DATA_MODEL.md)
- [Contratos REST versionados](docs/platform/API_CONTRACTS_V1.md)
- [Módulos e fluxos](docs/platform/FLOWS_AND_MODULES.md)
- [Testes, observabilidade, segurança e LGPD](docs/platform/QUALITY_SECURITY_OPERATIONS.md)
- [Backlog, comercial, monetização e V2–V5](docs/platform/BACKLOG_COMMERCIAL_ROADMAP.md)
- [Decisões arquiteturais consolidadas](docs/platform/ARCHITECTURE_DECISIONS.md)
- [ADRs 001–008](docs/platform/ADR_INDEX.md)

Repositório oficial: [ossodigital/raiox-landing](https://github.com/ossodigital/raiox-landing)

## Status

**RAIOX V1 — READY TO SELL**

Versão: `RAIOX v1.0.0` — **Ready to Sell**.

Domínio oficial: [https://raiox.ossodigital.com.br/](https://raiox.ossodigital.com.br/)

## Objetivo comercial

Apresentar o Diagnóstico RAIOX, converter visitantes em conversas qualificadas e entregar uma auditoria manual com score, gargalos, prioridades e plano de ação. Na V1, venda, atendimento e entrega são humanos.

## Ativo comercial único

O RAIOX V1 é um único ativo comercial composto pela landing principal, pelo relatório demonstrativo premium, pelas páginas legais, pela página de obrigado, pela página 404 e pela documentação comercial e operacional.

O arquivo `report.html` não é um produto separado: ele integra o mesmo RAIOX V1 como demonstração pública da qualidade e da estrutura da entrega final.

O relatório demonstrativo é acessível diretamente pela landing, tanto nos CTAs da hero quanto em uma seção dedicada da jornada comercial.

## Páginas disponíveis

- [Landing comercial](https://raiox.ossodigital.com.br/)
- [Relatório demonstrativo](https://raiox.ossodigital.com.br/report.html)
- [Política de Privacidade](https://raiox.ossodigital.com.br/legal/privacy.html)
- [Termos de Uso](https://raiox.ossodigital.com.br/legal/terms.html)
- [Página de obrigado](https://raiox.ossodigital.com.br/pages/obrigado.html)
- [Página 404](https://raiox.ossodigital.com.br/404.html)

## Status operacional

- Publicação e deploy automático pela Vercel.
- Domínio oficial configurado.
- WhatsApp humano `5511989886009` configurado nos CTAs.
- Relatório demonstrativo premium mantido em `report.html`.
- Oferta manual sugerida em R$ 197.
- Processo comercial e operacional documentado.
- Sem Supabase e sem OSSO ENGINE nesta versão.

## Stack

- HTML5
- CSS3
- JavaScript sem framework
- GitHub
- Vercel

## Estrutura principal

```text
raiox-landing/
├── index.html
├── report.html
├── 404.html
├── legal/
│   ├── privacy.html
│   └── terms.html
├── pages/
│   └── obrigado.html
├── assets/
├── styles/
├── scripts/
├── docs/
│   ├── comercial/
│   └── operacional/
├── sitemap.xml
├── robots.txt
└── vercel.json
```

## Fluxo comercial V1

1. O visitante acessa a landing.
2. Conhece a oferta e o relatório demonstrativo.
3. Inicia uma conversa pelo WhatsApp.
4. A equipe qualifica e apresenta o Diagnóstico RAIOX de R$ 197.
5. Após pagamento e coleta, a auditoria é executada manualmente.
6. O cliente recebe PDF, prioridades e proposta opcional de implantação.
7. Quando previsto na proposta, o valor do diagnóstico é abatido da implantação.

## Próximos passos da plataforma

- Encerrar gates operacionais, jurídicos, metodológicos e de fornecedores.
- Criar o repositório independente `raiox-platform`.
- Implementar o esqueleto técnico, tenancy, Auth, RLS e testes de isolamento.
- Entregar o workflow humano completo na V2 antes de introduzir IA na V3.
- Preservar a landing e o atendimento V1 durante toda a transição.

A Missão 003 — Platform Skeleton ainda não foi iniciada.

Consulte [ROADMAP.md](ROADMAP.md) e [RELEASE_NOTES.md](RELEASE_NOTES.md).
