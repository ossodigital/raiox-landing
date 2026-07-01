(() => {
  'use strict';

  /**
   * Fonte única de dados do relatório.
   * Edite este objeto para personalizar um novo diagnóstico.
   */
  const CONFIG = {
    report: {
      company: 'Empresa Exemplo Ltda.',
      date: '2026-07-01',
      consultant: 'Equipe OSSO DIGITAL',
      status: 'Diagnóstico concluído',
      id: 'RX-2026-001'
    },
    contact: {
      whatsappNumber: '5511989886009',
      message: 'Olá, vim pela landing RAIOX e quero entender meus gargalos de vendas e atendimento.'
    },
    score: {
      value: 58,
      summary: 'A estrutura possui ativos importantes, mas ainda opera de forma fragmentada. Os maiores ganhos estão na jornada entre descoberta, atendimento e conversão.'
    },
    executiveSummary: {
      text: 'A empresa já construiu presença em canais relevantes, porém perde força na passagem entre visibilidade e oportunidade comercial. A ausência de padronização no atendimento, páginas pouco orientadas à conversão e baixa integração do funil reduzem o retorno dos esforços digitais.',
      bottlenecks: [
        'WhatsApp sem fluxo comercial padronizado',
        'Site com proposta de valor pouco objetiva',
        'Funil sem etapas e indicadores definidos'
      ],
      quickWins: [
        'Revisar perfil e chamadas do Google Business',
        'Criar respostas rápidas e roteiro de qualificação',
        'Adicionar CTA único nas páginas estratégicas'
      ],
      commercialPriority: 'Organizar a entrada e o tratamento dos leads antes de ampliar o investimento em aquisição.'
    },
    areas: [
      {
        key: 'google-business',
        name: 'Google Business',
        icon: 'G',
        score: 72,
        problem: 'Perfil ativo, mas com categorias, serviços e publicações incompletos.',
        impact: 'Menor destaque nas buscas locais e menos sinais de confiança.',
        recommendation: 'Completar atributos, serviços e rotina de avaliações e posts.'
      },
      {
        key: 'whatsapp',
        name: 'WhatsApp',
        icon: 'W',
        score: 38,
        problem: 'Atendimento sem triagem, padrão de resposta ou cadência de follow-up.',
        impact: 'Leads esfriam e oportunidades deixam de avançar por falta de processo.',
        recommendation: 'Implantar roteiro, etiquetas, respostas rápidas e cadência comercial.'
      },
      {
        key: 'site',
        name: 'Site',
        icon: 'S',
        score: 54,
        problem: 'Proposta de valor genérica e caminhos de conversão pouco evidentes.',
        impact: 'O visitante não entende rapidamente por que deve escolher a empresa.',
        recommendation: 'Reestruturar mensagem, hierarquia e CTAs das páginas prioritárias.'
      },
      {
        key: 'seo',
        name: 'SEO',
        icon: '⌕',
        score: 46,
        problem: 'Páginas sem estratégia consistente de intenção, títulos e conteúdo.',
        impact: 'Baixa descoberta orgânica por pessoas com potencial de compra.',
        recommendation: 'Mapear termos comerciais e otimizar estrutura técnica e editorial.'
      },
      {
        key: 'social',
        name: 'Redes sociais',
        icon: '#',
        score: 67,
        problem: 'Frequência razoável, porém conteúdo pouco conectado à jornada de compra.',
        impact: 'Engajamento não se transforma em autoridade nem demanda qualificada.',
        recommendation: 'Organizar pilares de conteúdo por consciência, prova e conversão.'
      },
      {
        key: 'service',
        name: 'Atendimento',
        icon: 'A',
        score: 42,
        problem: 'Tempo e qualidade de resposta variam entre pessoas e canais.',
        impact: 'Experiência inconsistente reduz confiança e previsibilidade comercial.',
        recommendation: 'Definir SLA, roteiro de diagnóstico e critérios de passagem.'
      },
      {
        key: 'conversion',
        name: 'Conversão',
        icon: '↗',
        score: 49,
        problem: 'Poucos pontos de conversão e ausência de testes ou mensuração contínua.',
        impact: 'Tráfego existente produz menos oportunidades do que poderia.',
        recommendation: 'Criar ofertas de entrada, CTAs contextuais e eventos de conversão.'
      },
      {
        key: 'funnel',
        name: 'Funil',
        icon: '▽',
        score: 35,
        problem: 'Etapas, critérios e responsáveis não estão formalmente definidos.',
        impact: 'A gestão não identifica onde os leads travam ou são perdidos.',
        recommendation: 'Desenhar etapas, critérios de avanço e indicadores essenciais.'
      },
      {
        key: 'content',
        name: 'Conteúdo',
        icon: 'C',
        score: 64,
        problem: 'Boa base institucional, mas pouca resposta a dúvidas e objeções reais.',
        impact: 'A marca educa pouco o mercado e depende mais da explicação comercial.',
        recommendation: 'Criar conteúdo orientado a dores, decisões e provas de resultado.'
      },
      {
        key: 'processes',
        name: 'Processos',
        icon: 'P',
        score: 51,
        problem: 'Rotinas importantes dependem de memória e execução individual.',
        impact: 'A operação perde consistência, velocidade e capacidade de escala.',
        recommendation: 'Documentar fluxos críticos e instituir rituais de acompanhamento.'
      }
    ],
    priorityMatrix: {
      now: {
        title: 'Corrigir agora',
        subtitle: 'Impacto alto • até 30 dias',
        items: ['Fluxo comercial do WhatsApp', 'Etapas e critérios do funil', 'Proposta de valor e CTAs do site']
      },
      next: {
        title: 'Corrigir em seguida',
        subtitle: 'Consolidação • 31 a 60 dias',
        items: ['SLA e padrão de atendimento', 'Fundamentos técnicos de SEO', 'Mensuração das conversões']
      },
      later: {
        title: 'Melhorar depois',
        subtitle: 'Evolução • 61 a 90 dias',
        items: ['Estratégia editorial integrada', 'Autoridade nas redes sociais', 'Rotina de otimização do Google Business']
      }
    },
    strategicNote: 'A sequência recomendada prioriza a capacidade de receber e converter oportunidades. Só depois de estabilizar esse caminho faz sentido acelerar aquisição e conteúdo.',
    actionPlan: [
      { action: 'Estruturar roteiro de triagem no WhatsApp', impact: 'Alto', effort: 'Baixo', priority: 'P0', done: false },
      { action: 'Definir etapas e critérios do funil comercial', impact: 'Alto', effort: 'Médio', priority: 'P0', done: false },
      { action: 'Reescrever proposta de valor e CTAs principais', impact: 'Alto', effort: 'Médio', priority: 'P0', done: false },
      { action: 'Configurar eventos essenciais de conversão', impact: 'Alto', effort: 'Médio', priority: 'P1', done: false },
      { action: 'Documentar SLA e padrão de atendimento', impact: 'Médio', effort: 'Baixo', priority: 'P1', done: false },
      { action: 'Otimizar páginas comerciais para busca', impact: 'Médio', effort: 'Médio', priority: 'P1', done: false },
      { action: 'Criar calendário editorial por jornada', impact: 'Médio', effort: 'Alto', priority: 'P2', done: false },
      { action: 'Implantar rotina de avaliação mensal', impact: 'Médio', effort: 'Baixo', priority: 'P2', done: false }
    ]
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const STATUS = [
    { min: 85, key: 'excellent', label: 'Excelente' },
    { min: 65, key: 'good', label: 'Bom' },
    { min: 40, key: 'attention', label: 'Atenção' },
    { min: 0, key: 'critical', label: 'Crítico' }
  ];

  function getStatus(score) {
    const normalized = Math.max(0, Math.min(100, Number(score) || 0));
    return STATUS.find((item) => normalized >= item.min);
  }

  function setText(selector, value) {
    $$(selector).forEach((element) => { element.textContent = value; });
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function renderReportIdentity() {
    const { report } = CONFIG;
    const parsedDate = new Date(`${report.date}T12:00:00`);
    const formattedDate = Number.isNaN(parsedDate.getTime())
      ? report.date
      : new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(parsedDate);

    setText('[data-company]', report.company);
    setText('[data-date]', formattedDate);
    setText('[data-consultant]', report.consultant);
    setText('[data-report-status]', report.status);
    setText('[data-report-id]', `REPORT ID ${report.id}`);
    setText('[data-year]', new Date().getFullYear());
    document.title = `${report.company} | RAIOX da Estrutura Digital™`;
  }

  function renderScore() {
    const score = Math.max(0, Math.min(100, Number(CONFIG.score.value) || 0));
    const status = getStatus(score);
    const gauge = $('[data-score-gauge]');
    const counts = CONFIG.areas.reduce((result, area) => {
      const areaStatus = getStatus(area.score).key;
      if (area.score >= 70) result.positive += 1;
      if (areaStatus === 'attention') result.attention += 1;
      if (areaStatus === 'critical') result.critical += 1;
      return result;
    }, { positive: 0, attention: 0, critical: 0 });

    setText('[data-general-score]', score);
    setText('[data-score-status]', status.label);
    setText('[data-score-status-pill]', status.label);
    setText('[data-score-summary]', CONFIG.score.summary);
    setText('[data-positive-count]', counts.positive);
    setText('[data-attention-count]', counts.attention);
    setText('[data-critical-count]', counts.critical);

    if (gauge) {
      gauge.style.setProperty('--score', score);
      gauge.dataset.status = status.key;
      gauge.setAttribute('aria-label', `Score geral: ${score} de 100. Status: ${status.label}.`);
    }
    const pill = $('[data-score-status-pill]');
    if (pill) pill.dataset.status = status.key;
    $$('[data-level]').forEach((level) => level.classList.toggle('active', level.dataset.level === status.key));
  }

  function appendList(selector, items) {
    const list = $(selector);
    if (!list) return;
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      const li = createElement('li');
      li.append(createElement('span', '', '→'), document.createTextNode(item));
      fragment.append(li);
    });
    list.replaceChildren(fragment);
  }

  function renderExecutiveSummary() {
    const summary = CONFIG.executiveSummary;
    setText('[data-executive-text]', summary.text);
    setText('[data-commercial-priority]', summary.commercialPriority);
    appendList('[data-bottlenecks]', summary.bottlenecks);
    appendList('[data-quick-wins]', summary.quickWins);
  }

  function createAreaCard(area, index) {
    const status = getStatus(area.score);
    const article = createElement('article', 'area-card panel');
    article.dataset.status = status.key;

    const header = createElement('div', 'area-head');
    const identity = createElement('div', 'area-identity');
    const icon = createElement('span', 'area-icon', area.icon);
    icon.setAttribute('aria-hidden', 'true');
    const nameGroup = createElement('div');
    nameGroup.append(createElement('small', '', String(index + 1).padStart(2, '0')), createElement('h3', '', area.name));
    identity.append(icon, nameGroup);

    const score = createElement('div', 'area-score');
    score.setAttribute('aria-label', `${area.score} de 100, status ${status.label}`);
    score.append(createElement('strong', '', area.score), createElement('span', '', '/100'));
    header.append(identity, score);

    const progress = createElement('div', 'area-progress');
    const progressBar = createElement('i');
    progressBar.style.setProperty('--value', `${Math.max(0, Math.min(100, area.score))}%`);
    progress.append(progressBar);

    const statusRow = createElement('div', 'area-status');
    statusRow.append(createElement('span', `status-chip ${status.key}`, status.label), createElement('small', '', 'MATURIDADE DA ÁREA'));

    const details = createElement('dl', 'area-details');
    [
      ['Problema encontrado', area.problem],
      ['Impacto', area.impact],
      ['Recomendação', area.recommendation]
    ].forEach(([label, value]) => {
      const row = createElement('div');
      row.append(createElement('dt', '', label), createElement('dd', '', value));
      details.append(row);
    });

    article.append(header, progress, statusRow, details);
    return article;
  }

  function renderAreas() {
    const container = $('[data-areas]');
    if (!container) return;
    const fragment = document.createDocumentFragment();
    CONFIG.areas.forEach((area, index) => fragment.append(createAreaCard(area, index)));
    container.replaceChildren(fragment);
  }

  function renderPriorityMatrix() {
    const container = $('[data-priority-matrix]');
    if (!container) return;
    const styles = { now: ['Agora', 'now'], next: ['Em seguida', 'next'], later: ['Depois', 'later'] };
    const fragment = document.createDocumentFragment();

    Object.entries(CONFIG.priorityMatrix).forEach(([key, column], columnIndex) => {
      const article = createElement('article', `priority-column panel ${styles[key][1]}`);
      const header = createElement('div', 'priority-head');
      const number = createElement('span', '', String(columnIndex + 1).padStart(2, '0'));
      const copy = createElement('div');
      copy.append(createElement('small', '', styles[key][0]), createElement('h3', '', column.title));
      header.append(number, copy);
      article.append(header, createElement('p', 'priority-subtitle', column.subtitle));

      const list = createElement('ol');
      column.items.forEach((item, itemIndex) => {
        const li = createElement('li');
        li.append(createElement('span', '', String(itemIndex + 1)), createElement('p', '', item));
        list.append(li);
      });
      article.append(list);
      fragment.append(article);
    });

    container.replaceChildren(fragment);
    setText('[data-strategic-note]', CONFIG.strategicNote);
  }

  function createTag(value, type = '') {
    return createElement('span', `table-tag ${type || value.toLowerCase()}`, value);
  }

  function renderActionPlan() {
    const table = $('[data-action-plan]');
    const mobile = $('[data-action-mobile]');
    if (!table || !mobile) return;
    const rows = document.createDocumentFragment();
    const cards = document.createDocumentFragment();

    CONFIG.actionPlan.forEach((item, index) => {
      const row = createElement('tr');
      const actionCell = createElement('td');
      actionCell.append(createElement('span', 'action-number', String(index + 1).padStart(2, '0')), createElement('b', '', item.action));
      const impactCell = createElement('td'); impactCell.append(createTag(item.impact));
      const effortCell = createElement('td'); effortCell.append(createTag(item.effort));
      const priorityCell = createElement('td'); priorityCell.append(createTag(item.priority, item.priority.toLowerCase()));
      const statusCell = createElement('td');
      const check = createElement('span', `visual-check${item.done ? ' checked' : ''}`);
      check.setAttribute('role', 'img');
      check.setAttribute('aria-label', item.done ? 'Ação concluída' : 'Ação pendente');
      statusCell.append(check);
      row.append(actionCell, impactCell, effortCell, priorityCell, statusCell);
      rows.append(row);

      const card = createElement('article', 'action-mobile-card panel');
      const cardHead = createElement('div');
      cardHead.append(createElement('span', 'action-number', String(index + 1).padStart(2, '0')), createElement('h3', '', item.action), check.cloneNode(true));
      const tags = createElement('div', 'mobile-tags');
      [['Impacto', item.impact], ['Esforço', item.effort], ['Prioridade', item.priority]].forEach(([label, value]) => {
        const group = createElement('div');
        group.append(createElement('small', '', label), createTag(value, value.toLowerCase()));
        tags.append(group);
      });
      card.append(cardHead, tags);
      cards.append(card);
    });

    table.replaceChildren(rows);
    mobile.replaceChildren(cards);
  }

  function setupActions() {
    $$('[data-print]').forEach((button) => button.addEventListener('click', () => window.print()));
    const phone = CONFIG.contact.whatsappNumber.replace(/\D/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(CONFIG.contact.message)}`;
    $$('[data-whatsapp]').forEach((link) => { link.href = url; });
  }

  function init() {
    renderReportIdentity();
    renderScore();
    renderExecutiveSummary();
    renderAreas();
    renderPriorityMatrix();
    renderActionPlan();
    setupActions();
  }

  init();
})();
