# Entrega operacional — RAIOX V1

## Objetivo

Executar uma auditoria manual, consistente e rastreável, entregando ao cliente um relatório claro sem Supabase, OSSO ENGINE ou automação de score.

## Prazo padrão

Até cinco dias úteis após a confirmação de pagamento e o recebimento completo dos dados combinados.

## 1. Abrir o projeto

- [ ] Confirmar pagamento e escopo.
- [ ] Criar pasta restrita com nome da empresa e data.
- [ ] Registrar responsável, contato, prazo e canais analisados.
- [ ] Enviar checklist de coleta.
- [ ] Orientar o cliente a ocultar dados pessoais desnecessários.

Padrão sugerido de pasta:

```text
CLIENTE_RAIOX_AAAA-MM-DD/
├── 01_BRIEFING/
├── 02_EVIDENCIAS/
├── 03_ANALISE/
├── 04_RELATORIO/
└── 05_ENTREGA/
```

## 2. Coletar os dados

Solicitar apenas o necessário:

- Links do site, redes sociais e Google Business.
- Descrição da oferta, público e processo comercial.
- Origem e volume aproximado dos leads.
- Amostra representativa de conversas, com dados sensíveis ocultados.
- Tempos de resposta e rotina de follow-up.
- Etapas do funil, CRM ou planilha utilizada.
- Métricas disponíveis de tráfego, atendimento e conversão.
- Principais dúvidas e objeções relatadas pela equipe.

Não iniciar o prazo enquanto faltarem dados essenciais. Registrar formalmente a data de coleta completa.

## 3. Organizar as evidências

- [ ] Numerar cada evidência.
- [ ] Registrar origem, data e contexto.
- [ ] Separar fato observado de hipótese.
- [ ] Evitar copiar dados pessoais para o relatório.
- [ ] Guardar somente o necessário pelo período operacional definido.

## 4. Executar a análise manual

Avaliar cada dimensão de 0 a 100 usando o mesmo critério:

- **0–39 — Crítico:** ausência, falha recorrente ou alto risco de perda.
- **40–64 — Atenção:** estrutura parcial, inconsistente ou pouco mensurada.
- **65–84 — Bom:** processo funcional com oportunidades claras de melhoria.
- **85–100 — Excelente:** processo consistente, documentado e acompanhado.

Dimensões padrão:

1. Google Business.
2. WhatsApp.
3. Site.
4. SEO.
5. Redes sociais.
6. Atendimento.
7. Conversão.
8. Funil.
9. Conteúdo.
10. Processos.

Para cada dimensão, registrar:

- evidência;
- problema encontrado;
- impacto comercial provável;
- recomendação;
- score e justificativa.

## 5. Priorizar

Classificar ações por impacto e esforço:

- **P0:** corrigir agora, impacto alto.
- **P1:** corrigir em seguida.
- **P2:** melhoria planejada.

Organizar o plano em três horizontes: até 30 dias, 31–60 dias e 61–90 dias.

## 6. Preencher o relatório

1. Criar uma cópia segura da configuração atual.
2. Editar somente o objeto `CONFIG` em `scripts/report.js`.
3. Atualizar empresa, data, responsável, ID, score, resumo, áreas, prioridades e ações.
4. Não alterar HTML, CSS ou identidade visual para cada cliente.
5. Abrir `report.html` localmente e conferir toda a renderização.
6. Validar score, status, textos, acentos, quebra de página e CTAs.
7. Imprimir ou salvar em PDF pelo botão do relatório.

Padrão sugerido de ID: `RX-AAAA-NNN`.

## 7. Fazer controle de qualidade

- [ ] Nome da empresa correto em todos os pontos.
- [ ] Data e responsável corretos.
- [ ] Score coerente com as evidências.
- [ ] Nenhuma promessa de resultado.
- [ ] Nenhum dado pessoal exposto sem necessidade.
- [ ] Recomendações específicas e executáveis.
- [ ] PDF legível em desktop e celular.
- [ ] Links de contato corretos.
- [ ] Arquivo final nomeado e versionado.

Nome sugerido: `RAIOX_EMPRESA_AAAA-MM-DD_V1.pdf`.

## 8. Enviar ao cliente

Mensagem sugerida:

> Olá, [nome]. Seu RAIOX está concluído. O relatório mostra o score geral, os gargalos prioritários e o plano recomendado para os próximos 90 dias. Estou enviando o PDF e podemos fazer a leitura de entrega no horário combinado.

Enviar:

- PDF final.
- Resumo com três prioridades.
- Data ou link da reunião de entrega.
- Orientação sobre dúvidas e próximos passos.

## 9. Apresentar a proposta de implantação

Após a entrega:

1. Confirmar o principal gargalo percebido pelo cliente.
2. Escolher quais ações P0 podem ser implementadas pela OSSO DIGITAL.
3. Montar proposta separada, com escopo, prazo e investimento.
4. Informar o possível abatimento de R$ 197 quando aplicável.
5. Não iniciar implantação sem aceite formal.

## 10. Encerrar e registrar

- [ ] Registrar data de entrega.
- [ ] Registrar feedback do cliente.
- [ ] Atualizar status comercial.
- [ ] Definir retenção ou exclusão dos materiais recebidos.
- [ ] Agendar follow-up da implantação.
