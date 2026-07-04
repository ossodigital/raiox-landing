# Product Map — OSSO DIGITAL

## 1. Legenda de status

| Status | Significado |
|---|---|
| `OPERACIONAL` | runtime/fluxo atual evidenciado |
| `ARQUITETURA APROVADA` | documentação normativa existe; runtime ainda não |
| `PLACEHOLDER` | diretório existe sem implementação útil |
| `LEGADO EM QUARENTENA` | material importado exige auditoria antes de reuso |
| `EXTERNO A CONFIRMAR` | contexto citado, mas sem evidência suficiente neste workspace |

## 2. Mapa consolidado

| Produto/marca | Status verificável em 02/07/2026 | Função | Prioridade |
|---|---|---|---:|
| RAIOX | OPERACIONAL V1 | oferta comercial de diagnóstico | P0 — preservar/vender |
| RAIOX Platform | ARQUITETURA APROVADA | SaaS do ciclo de auditoria | P1 — próximo produto |
| OSSO Audit | PLACEHOLDER + arquitetura | bounded context de auditoria | P1 — nasce dentro da Platform |
| OSSO Engine | PLACEHOLDER local; evolução citada fora deste repo | automação/agentes | P2 — integrar após Platform |
| OSSO Post System | PLACEHOLDER local + legado em quarentena | conteúdo/publicação | P3 — multi-nicho futuro |
| OSSO DIGITAL Landing | PLACEHOLDER local | presença institucional corporativa | P2 — charter e conteúdo |
| Tattoo Até os Ossos | EXTERNO A CONFIRMAR | vertical/marca de domínio | P0 operacional a confirmar |
| Sétima Arte | EXTERNO A CONFIRMAR | vertical/marca de domínio | P3 a confirmar |

Status descreve evidência disponível, não julgamento sobre valor do produto.

## 3. RAIOX

- **Objetivo:** vender e entregar um diagnóstico executivo de gargalos de vendas, atendimento e conversão.
- **Público:** pequenas/médias operações que precisam localizar prioridades comerciais.
- **Status:** V1 publicado, atendimento e entrega humanos; Landing congelada em `b7984a2`.
- **Função no ecossistema:** oferta de entrada e validação comercial do domínio de auditoria.
- **Integrações futuras:** encaminhar aquisição para RAIOX Platform por URL/UTM; receber relatório aprovado sem depender do runtime da landing.
- **Prioridade:** P0, preservar disponibilidade e operação comercial.
- **Roadmap:** manter V1; migrar workflow para Platform apenas por gate e sem retirar fallback humano.

## 4. RAIOX Platform

- **Objetivo:** digitalizar o ciclo multiempresa de aquisição, coleta, auditoria, revisão, relatório e acompanhamento.
- **Público:** OSSO DIGITAL, auditores, clientes auditados e futuramente parceiros.
- **Status:** Master Plan e ADRs aprovados; sem runtime, banco ou deploy.
- **Função:** application/system of engagement do produto RAIOX.
- **Integrações futuras:** OSSO Audit interno; Engine via API/eventos; billing, mensageria e dashboard central.
- **Prioridade:** P1 após gates jurídicos, metodológicos, técnicos e de fornecedor.
- **Roadmap:** skeleton → workflow humano → IA assistiva → multinicho → API/partners.

## 5. OSSO Audit

- **Objetivo:** representar metodologia, evidências, achados, score, recomendações, revisão e proveniência.
- **Público:** inicialmente módulos da RAIOX Platform e equipe de auditoria; API externa somente futura.
- **Status:** diretório `02_PRODUCTS/OSSO_AUDIT` vazio; bounded context documentado na arquitetura RAIOX.
- **Função:** capacidade de domínio, não marca, landing nem plataforma completa.
- **Integrações futuras:** recebe evidências autorizadas; publica fatos de auditoria; fornece snapshots aprovados ao Reporting.
- **Prioridade:** P1 dentro da Platform; não criar produto duplicado.
- **Roadmap:** metodologia versionada → workflow humano → assistência IA → catálogo multi-nicho.

## 6. OSSO Engine

- **Objetivo:** orquestrar automações, agentes e integrações operacionais autorizadas.
- **Público:** operações internas e produtos OSSO que necessitem automação controlada.
- **Status:** placeholder vazio neste workspace; contexto anterior indica evolução separada, sem runtime auditado nesta missão.
- **Função:** execution/orchestration engine; não é system of record da auditoria.
- **Integrações futuras:** consumir comandos/eventos aprovados da Platform; acionar Post System e providers com idempotência.
- **Prioridade:** P2, depois que contratos da Platform estiverem estáveis.
- **Roadmap:** charter/inventário → adapters seguros → integração por eventos → automações multinicho governadas.

## 7. OSSO Post System

- **Objetivo:** planejar, aprovar, publicar e medir conteúdo por marca/nicho.
- **Público:** operação editorial OSSO e marcas atendidas.
- **Status:** placeholder vazio atual; existe material em `90_IMPORTADOS_PARA_REVISAR`, classificado como legado não confiável.
- **Função:** sistema editorial; não substitui Engine, CRM ou auditoria.
- **Integrações futuras:** receber briefings aprovados; usar Engine para execução; enviar métricas agregadas ao dashboard.
- **Prioridade:** P3 após Platform/Engine.
- **Roadmap:** auditoria do legado → charter → workflow editorial humano → multi-nicho → automações assistidas.

## 8. OSSO DIGITAL Landing

- **Objetivo:** apresentar a empresa, portfólio, provas e rotas de contato.
- **Público:** prospects, parceiros e clientes.
- **Status:** scaffolding vazio identificado em `03_LANDING/LANDING_`; nenhum runtime corporativo validado nesta missão.
- **Função:** canal institucional, separado das landings de produto.
- **Integrações futuras:** links/UTMs para ofertas; analytics consentido; nenhum dado sensível.
- **Prioridade:** P2, após charter de marca/domínio.
- **Roadmap:** conteúdo e IA de informação → implementação estática → SEO/provas → catálogo de produtos.

## 9. Tattoo Até os Ossos

- **Objetivo:** vertical/marca do domínio tattoo; charter comercial detalhado precisa ser confirmado pelo owner.
- **Público:** audiência e profissionais do ecossistema tattoo, a confirmar.
- **Status:** citado como projeto em evolução, sem runtime identificado no workspace auditado.
- **Função:** vertical que pode consumir conteúdo, automação e auditoria sem possuir o core compartilhado.
- **Integrações futuras:** Post System e Engine por contratos; RAIOX como cliente/tenant quando aplicável.
- **Prioridade:** P0 operacional a confirmar com owner.
- **Roadmap:** inventário real → product charter → mapa de dados → contratos de integração.

## 10. Sétima Arte

- **Objetivo:** vertical/marca ligada a conteúdo/cultura audiovisual; escopo formal precisa ser confirmado.
- **Público:** a confirmar pelo Product Owner.
- **Status:** citado como projeto em evolução, sem artefatos identificados neste workspace.
- **Função:** futuro caso de uso multi-nicho, sem direito de definir arquitetura compartilhada por cópia.
- **Integrações futuras:** Post System/Engine após charter, consentimento e contrato.
- **Prioridade:** P3 até validação de estratégia e owner.
- **Roadmap:** discovery → charter → MVP isolado → integração somente se houver fit.

## 11. Distinções obrigatórias

- **RAIOX** é oferta e marca comercial.
- **RAIOX Platform** é a aplicação SaaS que opera a jornada.
- **OSSO Audit** é o domínio de auditoria dentro da Platform, não uma segunda plataforma concorrente.
- **OSSO Engine** executa automações; não decide nem armazena a verdade da auditoria.
- **OSSO Post System** opera conteúdo/publicação; não é o Engine.

## 12. Pendências de portfolio governance

- Confirmar Product Owner, repositório, domínio e status de OSSO Engine.
- Auditar legado do Post System antes de qualquer reuso.
- Criar charters formais para OSSO DIGITAL Landing, Tattoo Até os Ossos e Sétima Arte.
- Decidir se “OSSO Audit” permanece apenas bounded context ou terá SKU/API externa na V6.

