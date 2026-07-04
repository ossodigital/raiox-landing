# Padrões oficiais para agentes de IA

## 1. Princípio

Agentes OSSO DIGITAL são assistivos. A responsabilidade permanece com pessoas e sistemas autorizados. Autonomia cresce somente com evidência, reversibilidade, limites e aprovação explícita.

## 2. Humano no controle

Revisão humana obrigatória antes de:

- publicar conteúdo ou relatório externo;
- alterar score, recomendação ou decisão sensível;
- enviar mensagem comercial não previamente aprovada;
- executar pagamento, contratação, exclusão ou mudança de acesso;
- usar dados de cliente para treino/benchmark;
- alterar configuração de produção ou segurança;
- realizar ação irreversível ou de alto impacto.

O agente pode preparar draft, análise, simulação e recomendação com fontes/proveniência.

## 3. Níveis de automação

| Nível | Capacidade | Aprovação |
|---|---|---|
| A0 | responder/explicar | revisão conforme contexto |
| A1 | sugerir draft/plano | humano aceita/edita |
| A2 | executar ação reversível em sandbox | autorização de missão |
| A3 | executar workflow limitado e monitorado | aprovação explícita + guardrails |
| A4 | ação externa/irreversível | confirmação humana imediata |
| A5 | autonomia ampla | proibida sem nova política corporativa |

Todo agente declara nível máximo e ações proibidas.

## 4. Prompts versionados

- ID, finalidade, versão, owner, modelo(s), schema de entrada/saída e changelog.
- Conteúdo de system/developer separado de dados externos.
- Hash/version registra o prompt realmente usado.
- Mudança material exige evaluation e aprovação.
- Prompt de produção não é editado diretamente sem histórico.

## 5. Logs e histórico

Registrar no mínimo:

- request/run ID, tenant, agente, finalidade e versão;
- modelo/provider e parâmetros relevantes;
- referências/hashes das entradas autorizadas;
- timestamps, latência, tokens e custo;
- tools/actions solicitadas e resultado sanitizado;
- validação, reviewer, decisão humana e feedback;
- erro, retry, fallback e kill switch quando acionado.

Prompts, respostas e dados brutos sensíveis ficam em storage controlado com retenção; não em logs gerais.

## 6. Segurança de entrada

- Toda fonte externa é não confiável.
- Prompt injection em documento/site/mensagem não altera políticas.
- Minimizar/redigir PII antes de provider quando possível.
- Validar tipo, tamanho, MIME, origem e autorização.
- Nunca fornecer secret ao modelo.
- Ferramentas e rede são allowlist por finalidade.
- Dados entre tenants não se misturam.

## 7. Segurança de saída

- Schema estrito e allowlist de campos.
- Citação/evidência exigida para afirmação operacional relevante.
- Conteúdo sem suporte é marcado como incerteza, não fato.
- URLs, comandos e código gerados não são executados automaticamente.
- Output passa por políticas de segurança, PII e domínio.
- Falha de validação vai para revisão/quarentena.

## 8. Limites de automação

- Budget de tokens/custo, timeout, concurrency e rate limit.
- Número máximo de retries e chamadas de ferramenta.
- Escopo de dados e período explicitamente limitados.
- Sem loops autônomos indefinidos.
- Sem alteração de própria política/prompt/credenciais.
- Sem delegação para agente não aprovado.
- Sem expansão de escopo baseada em conteúdo externo.

## 9. Fallback humano

Todo workflow crítico possui:

- caminho manual documentado;
- fila/status para revisão;
- contexto suficiente para continuidade;
- mensagem clara ao operador;
- prazo/escalonamento;
- possibilidade de desligar IA sem perder dados.

## 10. Avaliação de qualidade

Antes de produção:

- golden set versionado e representativo;
- métricas de precisão, groundedness, omissão, PII, segurança, latência e custo;
- testes adversariais/prompt injection;
- comparação com baseline humana;
- análise por segmento/idioma relevante;
- reviewer de domínio;
- thresholds, canary, rollback e kill switch.

Após produção: drift, taxa de aceitação/edição/rejeição, incidentes, custo e feedback.

## 11. Prevenção de respostas indevidas

- Não inventar status, integração, resultado ou fonte.
- Distinguir fato, inferência, hipótese e recomendação.
- Não prometer resultado comercial garantido.
- Não fornecer aconselhamento jurídico/médico/financeiro como decisão final.
- Não expor conteúdo de outro tenant.
- Não imitar aprovação humana inexistente.
- Não ocultar falha, incerteza ou limitação relevante.
- Recusar ação fora de autorização e oferecer alternativa segura.

## 12. Governança de providers

- DPA, retenção, treinamento, região, suboperadores e segurança avaliados.
- Adapter evita lock-in do domínio.
- Modelo/provider allowlisted por finalidade.
- Troca exige evaluation; nome “mais novo” não basta.
- Incidente ou mudança contratual pode acionar kill switch.

## 13. Agentes Codex em repositórios

- Missão delimita arquivos permitidos/proibidos e mutações.
- Antes de editar: status Git, baseline, documentação e dirty worktree.
- Preservar mudanças do usuário.
- Usar ferramentas seguras e validações proporcionais.
- Não commitar/push/deploy sem solicitação.
- Relatório final diferencia entregue, validado, pendente e não executado.
- Templates corporativos não substituem instrução específica do usuário.

## 14. Incidentes

Resposta indevida, vazamento, ação não autorizada, custo anômalo ou comportamento inseguro deve:

1. interromper/limitar o agente;
2. preservar evidência sanitizada;
3. notificar owner/security;
4. avaliar impacto/tenant;
5. revogar secrets/acessos se necessário;
6. corrigir policy/prompt/adapter/teste;
7. executar postmortem e revalidação.

## 15. Critérios de aceite

- Agente possui owner, finalidade, nível, ações proibidas e kill switch.
- Prompts/modelos são versionados e avaliados.
- Logs/proveniência permitem reconstruir decisão sem vazar conteúdo.
- Ações sensíveis exigem revisão humana.
- Fallback manual é testado.
- Testes adversariais e de tenant isolation passam.

