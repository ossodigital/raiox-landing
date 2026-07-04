# ADR-001 — Separação entre Landing e Platform

**Status:** Accepted  
**Data:** 02/07/2026  
**Owners:** Product + Tech  
**Decisão Foundation relacionada:** D-001 e D-002

## Contexto

`ossodigital/raiox-landing` contém um ativo estático publicado, comercial e operacionalmente estável. A futura plataforma terá autenticação, dados sensíveis, banco, API, workers e ciclos de release distintos. Colocar ambos no mesmo runtime criaria acoplamento de segurança e deploy sem benefício proporcional.

## Decisão

Criar o RAIOX PLATFORM em repositório independente proposto como `ossodigital/raiox-platform`.

- Landing: `raiox.ossodigital.com.br`, repositório e projeto Vercel atuais.
- Web app proposta: `app.audit.ossodigital.com.br`.
- API proposta: `api.audit.ossodigital.com.br/v1`.
- Releases, permissões, secrets, CI/CD, incidentes e rollback independentes.
- A integração ocorre por HTTPS, URLs públicas, UTM e contratos explícitos.
- Nenhum arquivo HTML/CSS/JS do V1 será copiado como fundação da plataforma.

## Alternativas consideradas

### Manter tudo no repositório da landing

Rejeitada: mistura um site público de baixo risco com aplicação autenticada e aumenta blast radius, permissões e complexidade de deploy.

### Monorepo corporativo contendo Landing e Platform

Adiada: pode ser reconsiderada quando houver plataforma de engenharia comum. Hoje introduziria governança sem necessidade operacional.

### Git submodule da landing na plataforma

Rejeitada: cria dependência de build e release; a plataforma precisa apenas do contrato público.

## Consequências

### Positivas

- Isolamento de secrets, permissões e incidentes.
- Deploy/rollback independentes.
- Landing permanece rápida, barata e estável.
- Histórico e ownership claros.

### Custos

- Dois repositórios e pipelines.
- Tokens de design e links exigem governança para evitar divergência.
- Mudanças coordenadas demandam contratos e release notes em ambos.

## Guardrails

- Frozen set do V1 verificado contra `b7984a2`.
- Integração não pode compartilhar cookie, secret ou acesso ao banco.
- Assets de marca serão versionados como pacote próprio somente após revisão.
- Mudança na Landing exige issue/release no repositório da Landing.
- Falha da Platform não pode derrubar nem bloquear a Landing.

## Critérios de verificação futura

- CODEOWNERS, secrets e projetos de deploy separados.
- Links entre produtos funcionam sem dependência de build.
- Preview/rollback de um ativo não altera o outro.
- Scans confirmam ausência de código V1 copiado sem decisão explícita.

