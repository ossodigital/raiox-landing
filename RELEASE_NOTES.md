# RAIOX v1.0.0 — Release Candidate

Data: 1º de julho de 2026

Status: **Release Candidate**

## Funcionalidades entregues

- Landing comercial responsiva do RAIOX.
- Apresentação da proposta, benefícios, processo e planos.
- Dez CTAs principais conectados ao atendimento humano via WhatsApp.
- Modelo visual e imprimível do relatório RAIOX.
- Página 404 personalizada.
- Termos de Uso e Política de Privacidade provisórios.
- SEO técnico com canonical, Open Graph, Twitter Cards, sitemap e robots.txt.
- Deploy automático conectado ao GitHub.

## Arquitetura

Aplicação estática sem etapa de build. As páginas HTML ficam na raiz; estilos, scripts e assets são servidos diretamente por diretórios próprios. O JavaScript adiciona comportamento progressivo à landing e renderiza os dados demonstrativos do relatório.

```text
HTML estático
├── CSS responsivo
├── JavaScript sem framework
├── assets SVG
└── deploy automático na Vercel
```

Não há backend, autenticação, banco de dados ou processamento pelo OSSO ENGINE nesta versão.

## Stack

- HTML5 semântico
- CSS3
- JavaScript sem framework
- GitHub
- Vercel

## Deploy

- Repositório: `ossodigital/raiox-landing`
- Branch de produção: `main`
- Plataforma: Vercel
- Processo: deploy automático após push na branch principal
- Configuração: site estático com URLs limpas e sem barra final

## Domínio

Domínio canônico: [raiox.ossodigital.com.br](https://raiox.ossodigital.com.br/)

Rotas públicas principais:

- `/` — landing
- `/report` — relatório demonstrativo, marcado como `noindex`
- `/terms` — Termos de Uso
- `/privacy` — Política de Privacidade

## Limitações da V1

- Atendimento, qualificação e oferta são manuais.
- WhatsApp utiliza número humano provisório.
- Não há formulário nem captura estruturada de leads.
- Não há Supabase ou banco de dados.
- Não há dashboard operacional.
- Auditoria, score e relatório não são gerados automaticamente.
- Não há integração com o OSSO ENGINE.
- Não há analytics ou pixels de marketing configurados.
- A imagem Open Graph atual é SVG e pode ter suporte limitado em algumas redes.
- Os documentos legais ainda precisam receber dados cadastrais e revisão jurídica antes da versão comercial definitiva.

## Roadmap V2

- Formulário de entrada.
- Supabase.
- Captura e organização de leads.
- Dashboard simples.
- Definição de analytics e consentimento, se adotados.
- Canal formal de privacidade e dados cadastrais completos.

As evoluções de IA, score automático, PDF e operação multinicho permanecem planejadas para a V3.
