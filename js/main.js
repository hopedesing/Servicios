import { CONFIG } from './config.js';
import { SERVICES } from './data/services.js';
import { LINES, STEPS, SHOWCASE, PORTFOLIO, FAQ } from './data/content.js';
import { logo } from './components/logo.js';
import { lineCard, catalogGroup, faqItem, stepItem, portfolioCard, miniMock } from './components/sections.js';
import { showcaseItem, startCountdown } from './components/phones.js';
import { initQuoteForm, preselectService } from './lib/quote-form.js';
import { icon, WHATSAPP_SVG } from './lib/icons.js';
import { esc, waLink, $, $$ } from './lib/utils.js';

/* ---------- Render de contenido desde los datos ---------- */
function render() {
  $$('[data-logo]').forEach((el) => (el.innerHTML = logo({ cls: el.dataset.logo })));
  const byLine = (id) => SERVICES.filter((s) => s.line === id);
  $('#lines-grid').innerHTML = LINES.map((l, i) => lineCard(l, i, byLine(l.id).length)).join('');
  $('#services-grid').innerHTML = LINES.filter((l) => byLine(l.id).length).map((l) => catalogGroup(l, byLine(l.id))).join('');
  $('#faq-list').innerHTML = FAQ.map(faqItem).join('');
  $('#showcase-grid').innerHTML = SHOWCASE.map(showcaseItem).join('');
  $('#steps-list').innerHTML = STEPS.map(stepItem).join('');
  $('#portfolio-grid').innerHTML = PORTFOLIO.map((p, i) => portfolioCard(p, i, miniMock)).join('');
  $('#year').textContent = new Date().getFullYear();
  $$('[data-wa-icon]').forEach((el) => (el.outerHTML = WHATSAPP_SVG));

  // Enlaces de WhatsApp genéricos
  const wa = waLink();
  $$('[data-wa]').forEach((a) => {
    if (wa) { a.href = waLink(a.dataset.waMsg || undefined); a.target = '_blank'; a.rel = 'noopener'; }
    else a.hidden = true;
  });

  // Redes del footer (solo si están configuradas)
  const social = [];
  if (CONFIG.INSTAGRAM_URL) social.push(`<a href="${esc(CONFIG.INSTAGRAM_URL)}" target="_blank" rel="noopener">${icon('instagram')}Instagram</a>`);
  if (wa) social.push(`<a href="${esc(wa)}" target="_blank" rel="noopener">${WHATSAPP_SVG}WhatsApp</a>`);
  if (CONFIG.CONTACT_EMAIL) social.push(`<a href="mailto:${esc(CONFIG.CONTACT_EMAIL)}">${icon('mail')}Correo</a>`);
  $('#footer-social').innerHTML = social.join('');
}

/* ---------- Navegación ---------- */
function initNav() {
  const header = $('.site-header');
  const toggle = $('.nav-toggle');
  const menu = $('#site-menu');

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 900px)').addEventListener('change', () => setOpen(false));

  // Sección activa en el menú
  const links = $$('#site-menu a[href^="#"]');
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting && map.has(en.target.id)) {
        links.forEach((l) => l.removeAttribute('aria-current'));
        map.get(en.target.id).setAttribute('aria-current', 'true');
      }
    }),
    { rootMargin: '-45% 0px -50% 0px' }
  );
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

/* ---------- Botones "Cotizar" con servicio preseleccionado ---------- */
function initQuoteLinks() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-quote]');
    if (!a) return;
    preselectService(a.dataset.quote, { gifts: a.hasAttribute('data-gifts') });
    // el ancla #cotizar hace el scroll; después enfocamos el primer campo
    setTimeout(() => $('#f-name')?.focus({ preventScroll: true }), 650);
  });
}

/* ---------- Aparición al hacer scroll ---------- */
function initReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Modal de confirmación ---------- */
function initModal() {
  const dlg = $('#success-modal');
  const close = () => dlg.open && dlg.close();
  $$('[data-close-modal]', dlg).forEach((b) => b.addEventListener('click', close));
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  $('[data-home]', dlg).addEventListener('click', () => {
    close();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return (data) => {
    const wa = $('[data-modal-wa]', dlg);
    const href = waLink(`Hola HOPE 👋 Soy ${data.name}. Acabo de enviar una solicitud de cotización (${data.service}) desde su página.`);
    if (href) { wa.href = href; wa.hidden = false; } else wa.hidden = true;
    dlg.showModal();
  };
}

/* ---------- Inicio ---------- */
render();
initNav();
initQuoteLinks();
initReveal();
startCountdown();
initQuoteForm({ onSuccess: initModal() });
