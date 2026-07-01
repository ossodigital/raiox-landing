# Controle da operação — RAIOX V1

## Objetivo

Controlar a venda e a entrega manual do RAIOX V1 de forma simples, rastreável e reproduzível, sem Supabase, IA ou OSSO ENGINE.

Cada cliente deve possuir um responsável, um status atual, uma próxima ação e uma data de acompanhamento.

## Registro mínimo por cliente

- Nome do contato.
- Empresa.
- Telefone e canal de origem.
- Data de entrada.
- Principal gargalo informado.
- Status operacional.
- Valor e situação do pagamento.
- Data de coleta completa.
- Prazo prometido.
- Responsável interno.
- Próxima ação e data.
- Link da pasta restrita do projeto.
- Data de entrega.
- Situação da proposta de implantação.

## 1. Fluxo de venda

1. Lead entra pela landing ou indicação.
2. Atendimento humano responde pelo WhatsApp.
3. Equipe realiza qualificação breve.
4. Confirma aderência ao Diagnóstico RAIOX.
5. Apresenta escopo, prazo e preço de R$ 197.
6. Trata objeções sem prometer resultados.
7. Confirma aceite e avança para pagamento.

### Critério de qualificação

O lead deve possuir uma operação comercial real, canais digitais ativos, um problema identificável e disponibilidade para fornecer contexto e evidências mínimas.

## 2. Fluxo de atendimento

1. Responder em horário comercial.
2. Registrar nome, empresa, origem e necessidade.
3. Fazer uma pergunta por vez.
4. Resumir o problema entendido antes de apresentar a oferta.
5. Registrar objeções e próximo passo.
6. Realizar follow-up em 24, 48 e 72 horas quando necessário.
7. Encerrar o acompanhamento sem insistência após o último follow-up.

Usar como referência `docs/comercial/SCRIPT_WHATSAPP_RAIOX.md`.

## 3. Fluxo de pagamento manual

1. Confirmar o aceite do escopo e do preço.
2. Enviar os dados do meio de pagamento manual aprovado.
3. Informar que o prazo começa após pagamento e coleta completa.
4. Aguardar confirmação efetiva do recebimento.
5. Registrar data, valor, forma e comprovante.
6. Emitir recibo ou documento fiscal quando aplicável.
7. Alterar o status para `PAGO — COLETA PENDENTE`.

Não iniciar a auditoria com pagamento apenas prometido ou comprovante não confirmado.

## 4. Fluxo de coleta de dados

1. Enviar `docs/operacional/CHECKLIST_CLIENTE_RAIOX.md`.
2. Criar pasta restrita do cliente.
3. Receber links, contexto, métricas e amostras necessárias.
4. Solicitar ocultação de dados pessoais desnecessários.
5. Conferir acessos e legibilidade dos materiais.
6. Listar pendências de uma só vez.
7. Registrar a data em que a coleta ficou completa.
8. Confirmar por mensagem o início do prazo de entrega.

## 5. Fluxo de auditoria manual

1. Organizar evidências por canal e dimensão.
2. Separar fatos observados de hipóteses.
3. Avaliar as dez dimensões padrão.
4. Atribuir scores com justificativa.
5. Identificar gargalos e impactos prováveis.
6. Priorizar ações em P0, P1 e P2.
7. Montar o plano para 30, 60 e 90 dias.
8. Revisar coerência entre evidência, score e recomendação.

Seguir `docs/operacional/ENTREGA_RAIOX_V1.md`.

## 6. Fluxo de entrega do relatório

1. Duplicar a configuração do relatório com segurança.
2. Preencher somente o objeto `CONFIG` de `scripts/report.js`.
3. Validar empresa, data, score, áreas, prioridades e ações.
4. Abrir `report.html` e revisar a renderização.
5. Testar impressão e gerar o PDF.
6. Executar checklist de qualidade.
7. Enviar PDF e resumo das três prioridades.
8. Realizar reunião ou áudio de entrega.
9. Registrar data e confirmação de recebimento.

## 7. Fluxo de proposta de implantação

1. Confirmar qual prioridade o cliente deseja executar primeiro.
2. Selecionar ações P0 aderentes aos serviços da OSSO DIGITAL.
3. Criar proposta separada com escopo, prazo, investimento e responsabilidades.
4. Registrar eventual abatimento dos R$ 197 na proposta.
5. Enviar a proposta e combinar data de decisão.
6. Fazer follow-up consultivo.
7. Registrar ganho, perda, adiamento ou ausência de resposta.

O diagnóstico não autoriza o início automático da implantação.

## Status possíveis do cliente

| Status | Significado | Próxima ação esperada |
|---|---|---|
| `NOVO LEAD` | Contato recebido, ainda sem resposta | Responder e identificar contexto |
| `EM QUALIFICAÇÃO` | Perguntas iniciais em andamento | Confirmar aderência |
| `QUALIFICADO` | Lead adequado ao RAIOX | Apresentar oferta |
| `NÃO QUALIFICADO` | Sem aderência, dados ou momento | Registrar motivo e encerrar |
| `OFERTA APRESENTADA` | Escopo e preço informados | Tratar dúvidas e pedir decisão |
| `AGUARDANDO PAGAMENTO` | Cliente aceitou | Confirmar pagamento |
| `PAGO — COLETA PENDENTE` | Pagamento confirmado | Enviar e acompanhar checklist |
| `DADOS INCOMPLETOS` | Coleta possui pendências | Solicitar itens faltantes |
| `EM AUDITORIA` | Coleta completa e análise iniciada | Concluir análise no prazo |
| `EM REVISÃO` | Relatório preenchido | Executar controle de qualidade |
| `ENTREGUE` | PDF e leitura enviados | Confirmar recebimento |
| `IMPLANTAÇÃO OFERTADA` | Proposta adicional enviada | Acompanhar decisão |
| `IMPLANTAÇÃO GANHA` | Proposta aprovada | Abrir projeto separado |
| `IMPLANTAÇÃO PERDIDA` | Proposta recusada | Registrar motivo |
| `PAUSADO` | Cliente pediu tempo | Definir data de retomada |
| `ENCERRADO` | Jornada finalizada | Arquivar e aplicar retenção |

## Regras de transição

- Todo status deve possuir data e responsável.
- Nenhum cliente pode ficar sem próxima ação quando o processo estiver ativo.
- `EM AUDITORIA` exige pagamento confirmado e coleta completa.
- `ENTREGUE` exige PDF revisado e envio registrado.
- Implantação deve ser controlada em projeto próprio após aceite formal.

## Checklist de fechamento

- [ ] Pagamento registrado.
- [ ] Coleta completa registrada.
- [ ] Evidências organizadas.
- [ ] Scores justificados.
- [ ] Relatório revisado.
- [ ] PDF final salvo e nomeado.
- [ ] Cliente confirmou recebimento.
- [ ] Três prioridades apresentadas.
- [ ] Proposta de implantação enviada ou descartada conscientemente.
- [ ] Status final atualizado.
- [ ] Próxima ação removida ou agendada.
- [ ] Feedback registrado.
- [ ] Retenção ou exclusão dos dados definida.
- [ ] Pasta do projeto organizada e com acesso restrito.
