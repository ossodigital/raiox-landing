(() => {
  'use strict';

  const CONFIG = {
    // Informe somente números, com DDI e DDD, para direcionar a conversa.
    // Exemplo: '5511999999999'. Vazio abre o seletor de contatos do WhatsApp.
    whatsappNumber: '',
    brand: 'RAIOX'
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  function setupHeader() {
    const header = $('[data-header]');
    const toggle = $('[data-menu-toggle]');
    const menu = $('[data-menu]');
    if (!header || !toggle || !menu) return;

    const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 16);
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
      menu.classList.toggle('open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    $$('a', menu).forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('scroll', setHeaderState, { passive: true });
    setHeaderState();
  }

  function setupAccordion() {
    $$('[data-accordion] button').forEach((button) => {
      button.addEventListener('click', () => {
        const accordion = button.closest('[data-accordion]');
        const answer = document.getElementById(button.getAttribute('aria-controls'));
        const willOpen = button.getAttribute('aria-expanded') !== 'true';

        $$('button', accordion).forEach((item) => {
          item.setAttribute('aria-expanded', 'false');
          const panel = document.getElementById(item.getAttribute('aria-controls'));
          if (panel) panel.hidden = true;
        });

        button.setAttribute('aria-expanded', String(willOpen));
        if (answer) answer.hidden = !willOpen;
      });
    });
  }

  function setupReveal() {
    const elements = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
  }

  function setupWhatsApp() {
    $$('.whatsapp-link').forEach((link) => {
      const intent = link.dataset.plan || 'conhecer o RAIOX';
      const message = `Olá! Vim pelo site do ${CONFIG.brand} e quero ${intent}.`;
      const recipient = CONFIG.whatsappNumber.trim();
      link.href = `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
    });
  }

  function setupCurrentYear() {
    const year = $('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  }

  setupHeader();
  setupAccordion();
  setupReveal();
  setupWhatsApp();
  setupCurrentYear();
})();
