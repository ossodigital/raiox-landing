# RAIOX REPORT V1

Relatório executivo visual do produto **RAIOX da Estrutura Digital™**, criado pela OSSO DIGITAL. O ativo transforma os dados de uma auditoria em uma apresentação clara de score geral, gargalos, prioridades e plano de ação, preparando a conversa comercial de implementação.

## Arquivos

- `src/report.html`: estrutura semântica e metadados do relatório.
- `styles/report.css`: design responsivo, acessibilidade e regras de impressão.
- `scripts/report.js`: dados mockados, renderização e ações da interface.

O relatório é independente da landing principal e não utiliza framework, API ou backend.

## Como abrir

Abra `src/report.html` diretamente em um navegador moderno. Todos os caminhos utilizados são relativos, portanto o relatório funciona localmente sem servidor.

Para uma visualização mais próxima do ambiente publicado, também é possível servir a raiz do projeto com qualquer servidor HTTP estático e acessar `/src/report.html`.

## Como editar os dados mockados

Abra `scripts/report.js` e altere somente o objeto `CONFIG`, localizado no início do arquivo.

Principais grupos:

- `report`: empresa auditada, data, responsável, status e identificador.
- `contact`: número do WhatsApp e mensagem do CTA.
- `score`: nota geral e texto de interpretação.
- `executiveSummary`: resumo, gargalos, oportunidades e prioridade comercial.
- `areas`: dez áreas analisadas, com score, problema, impacto e recomendação.
- `priorityMatrix`: itens separados em agora, em seguida e depois.
- `actionPlan`: ações com impacto, esforço, prioridade e estado do checklist.
- `strategicNote`: nota exibida abaixo da matriz de prioridade.

O número de WhatsApp deve conter apenas dígitos, incluindo DDI e DDD. Exemplo: `5511999999999`. Se o campo ficar vazio, o WhatsApp abrirá o seletor de contatos com a mensagem preparada.

Os status das áreas são calculados automaticamente pelo score:

| Faixa | Status |
| --- | --- |
| 0–39 | Crítico |
| 40–64 | Atenção |
| 65–84 | Bom |
| 85–100 | Excelente |

## Como imprimir ou salvar em PDF

1. Abra `src/report.html` no navegador.
2. Clique em **Imprimir relatório** no topo ou em **Imprimir ou salvar em PDF** no rodapé.
3. Na janela do navegador, escolha **Salvar como PDF**.
4. Use papel A4, escala 100% e margens padrão ou mínimas.
5. Ative **Gráficos de plano de fundo** para preservar o visual escuro e os destaques em verde.

O CSS possui regras específicas para impressão, remove ferramentas de tela, evita que cards sejam partidos e organiza seções em páginas. Navegadores podem variar ligeiramente na paginação.

## Acessibilidade

- HTML semântico com títulos em ordem lógica.
- Link para pular conteúdo.
- Contraste preparado para AA.
- Tabelas com cabeçalhos e legenda acessível.
- Status não dependem apenas de cor.
- Controles possuem nomes acessíveis e foco visível.
- Conteúdo dinâmico é inserido como texto, sem HTML vindo de fonte externa.

## Próximos passos para PDF automático

Uma versão futura poderá gerar PDFs no servidor ou em uma rotina controlada com navegador headless. Caminho recomendado:

1. Separar os dados do `CONFIG` em um JSON validado.
2. Criar um template versionado para o relatório.
3. Renderizar o HTML em Playwright ou Puppeteer.
4. Gerar o PDF com tamanho A4, fundos habilitados e fontes incorporadas.
5. Armazenar o arquivo com controle de acesso e expiração.
6. Adicionar testes de regressão visual e validação dos dados antes da geração.

Essa evolução exige backend ou automação dedicada e não faz parte da V1.
