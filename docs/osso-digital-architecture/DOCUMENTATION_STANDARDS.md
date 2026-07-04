# Padrões obrigatórios de documentação

## 1. Princípio

Documentação é parte do entregável e precisa refletir o estado real. Arquivo vazio é placeholder, não evidência de conformidade.

## 2. Estrutura mínima de todo projeto

```text
project/
├── README.md
├── CHANGELOG.md
├── ROADMAP.md
├── VERSION.md
├── RELEASE_NOTES.md
├── CHECKPOINTS.md
├── docs/
└── checkpoints/
```

Também obrigatório quando aplicável:

- `SECURITY.md` para runtime, dados, auth ou integrações.
- `CONTRIBUTING.md` para múltiplos contribuidores.
- `docs/adr/` ou ADRs equivalentes para decisões relevantes.
- `docs/api/` e OpenAPI para APIs.
- `docs/runbooks/` para operação/alertas.
- `docs/data/` para schema, classificação e retenção.

## 3. Conteúdo mínimo por arquivo

### README.md

Objetivo, status real, público, arquitetura resumida, setup, comandos, ambientes, links, owner, limitações e próximos passos. Deve distinguir “implementado”, “planejado” e “descontinuado”.

### CHANGELOG.md

Histórico aditivo por versão/data, separando Added/Changed/Fixed/Security/Deprecated/Removed quando útil. Não reescrever releases passadas para parecer que algo já existia.

### ROADMAP.md

Fases, outcomes, itens concluídos/planejados, dependências e gates. Roadmap não é promessa de prazo sem owner e capacidade.

### VERSION.md

Produto, versão, status, data, release, commit/tag e compatibilidade. Para documentação, indicar explicitamente que não há runtime.

### RELEASE_NOTES.md

Entregas, impactos, migrations, compatibilidade, validações, limitações, rollback e próximos gates.

### CHECKPOINTS.md

Índice cronológico com status, links e próximo checkpoint. Checkpoint detalhado vive em `checkpoints/`.

## 4. Documentação por módulo concluído

Todo módulo concluído gera ou atualiza:

- README do módulo: responsabilidade, API/ports, dados, eventos e exemplos.
- CHECKPOINT: escopo, arquivos, validações, decisões, riscos e pendências.
- CHANGELOG: mudança visível/técnica relevante.
- ROADMAP: item concluído e próximo gate.
- VERSION: quando houver release/versionamento do módulo/produto.
- Critérios de aceite: funcionais, negativos, segurança e operação.
- Riscos conhecidos e limitações.
- Runbook se o módulo cria alerta/job/provider.
- ADR se cria/alterar fronteira, tecnologia, dado ou contrato.

## 5. ADRs

ADR é obrigatório para:

- repositório/monorepo/microservice;
- banco, tenancy e isolamento;
- provider crítico;
- API/evento público e versionamento;
- autenticação/autorização;
- estratégia de queue/cache/search;
- IA/modelo/prompt pipeline;
- breaking change;
- exceção a padrão corporativo.

Usar [ADR_TEMPLATE.md](./ADR_TEMPLATE.md). ADR aceito não é apagado; novo ADR o supersede.

## 6. Checkpoints

Checkpoint registra estado verificável, não intenção. Deve apontar arquivos, comandos/validações, riscos e próximo gate. “Concluído” exige todos os critérios atendidos.

Usar [CHECKPOINT_TEMPLATE.md](./CHECKPOINT_TEMPLATE.md).

## 7. Missões Codex

Toda missão deve definir contexto, objetivo, escopo, fora de escopo, arquivos permitidos/proibidos, entregáveis, validações, documentação, regra de commit e próximo passo.

Usar [MISSION_TEMPLATE.md](./MISSION_TEMPLATE.md).

## 8. Status padronizados

| Status | Uso |
|---|---|
| `DRAFT` | em elaboração, não aprovado |
| `PROPOSED` | pronto para decisão |
| `APPROVED` | aprovado no escopo declarado |
| `IN_PROGRESS` | implementação autorizada em andamento |
| `RELEASE_CANDIDATE` | candidato validado, não final |
| `READY_TO_SELL` | comercialmente operável |
| `DEPRECATED` | uso novo desencorajado |
| `ARCHIVED` | somente histórico |
| `BLOCKED` | impedimento explícito e owner |

Evitar “pronto” sem qualificador: pronto para quê?

## 9. Links, nomes e datas

- Links relativos para arquivos do repositório; URLs canônicas para serviços externos.
- Nome de arquivo estável em `UPPER_SNAKE_CASE.md` para documentos corporativos/checkpoints ou padrão local coerente.
- Datas ISO `YYYY-MM-DD` internamente; interface pode localizar.
- IDs de ADR/checkpoint nunca são reutilizados.
- Português claro; termos técnicos em inglês quando forem contratos de código, com glossário.

## 10. Diagramas

- Mermaid preferencial para diagramas versionáveis.
- Todo diagrama deve ser legível também por texto/tabela adjacente.
- Diagrama não pode contradizer o contrato escrito.
- Setas futuras devem ser marcadas como propostas.

## 11. Segurança documental

Proibido documentar secrets reais, tokens, senhas, dados pessoais, URLs assinadas, payloads reais de clientes ou procedimentos que ampliem acesso sem necessidade. Exemplos usam valores sintéticos.

## 12. Revisão e freshness

- README/Changelog/Checkpoint: por release/missão.
- Roadmap: mensal ou por gate.
- Runbooks: trimestral e após incidente.
- Arquitetura corporativa: semestral ou mudança material.
- Policies legais: conforme owner jurídico e mudança de tratamento.

Documento obsoleto deve ser marcado/superseded, não silenciosamente abandonado.

## 13. Validação obrigatória

- Arquivos requeridos existem e têm conteúdo.
- Links locais resolvem.
- Code fences/diagramas estão balanceados.
- Status e versão são consistentes entre arquivos.
- Runtime e docs não divergem sobre capacidade existente.
- Sem secrets/PII.
- `git diff --check` sem erros.
- Frozen sets permanecem intactos quando a missão exigir.

## 14. Critérios de aceite

- Um novo integrante entende objetivo, status, setup, arquitetura, riscos e owner sem conhecimento oral exclusivo.
- Uma release pode ser auditada por changelog, version, release notes e checkpoint.
- Uma decisão pode ser rastreada até ADR.
- Uma exceção tem owner e revisão.

