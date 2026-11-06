import { icon, WHATSAPP_SVG } from '../lib/icons.js';
import { esc, cop, waAttrs } from '../lib/utils.js';

/** Botón que lleva al formulario y preselecciona un servicio. */
const quoteBtn = (label, option, cls = 'btn btn--dark') =>
  `<a class="${cls}" href="#cotizar" data-quote="${esc(option)}">${esc(label)} ${icon('arrow', 'icon icon--arrow')}</a>`;

/* ---------- ¿Qué hacemos? ---------- */
export function lineCard(l, i, count) {
  return `<a class="line-card line-card--${l.id} reveal" style="--d:${i * 90}ms" href="#linea-${esc(l.id)}">
    <span class="chip">${icon(l.icon)}${esc(l.label)}</span>
    <h3 class="line-card__title">${esc(l.title)}</h3>
    <p class="line-card__text">${esc(l.text)}</p>
    <span class="link-cta">Ver ${count} servicios ${icon('arrow', 'icon icon--arrow')}</span>
  </a>`;
}

/* ---------- Catálogo ---------- */
const priceTag = (s) =>
  s.priceFrom == null
    ? `<p class="price"><strong>Precio a la medida</strong></p>`
    : `<p class="price"><span>Desde</span> <strong>${cop(s.priceFrom)}</strong>${s.priceSuffix ? ` <span>${esc(s.priceSuffix)}</span>` : ''}</p>`;

export function serviceCard(s, i) {
  const forWhat = s.forWhat ? `<p class="svc__for">${s.forWhat.map(esc).join(' · ')}</p>` : '';
  const extra = s.extra
    ? `<div class="svc__extra">${icon(s.id === 'event' ? 'gift' : 'clock')}<div><strong>${esc(s.extra.title)}</strong><span>${esc(s.extra.text)}</span></div></div>`
    : '';
  return `<article class="svc reveal" style="--d:${(i % 2) * 90}ms" id="svc-${esc(s.id)}">
    <header class="svc__head">
      <span class="svc__icon">${icon(s.icon)}</span>
      <div class="svc__title">
        <h4 class="svc__name">${esc(s.name)}</h4>
        ${priceTag(s)}
      </div>
    </header>
    <p class="svc__desc">${esc(s.summary)}</p>
    ${forWhat}
    <div class="svc__base">
      <p class="svc__label">${s.priceFrom == null ? 'Incluye' : 'El precio base incluye'}</p>
      <ul>${s.base.map((x) => `<li>${icon('check')}${esc(x)}</li>`).join('')}</ul>
    </div>
    <p class="svc__delivery">${icon('clock')}<span><b>Entrega:</b> ${esc(s.delivery)}</span></p>
    <details class="svc__more">
      <summary>También puede incluir</summary>
      <ul>${s.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </details>
    ${extra}
    <footer class="svc__actions">
      ${quoteBtn(s.cta, s.formOption, 'btn btn--dark btn--sm')}
      <a class="btn-icon" ${waAttrs(s.whatsapp)} aria-label="Preguntar por ${esc(s.name)} en WhatsApp" title="Preguntar por WhatsApp">${WHATSAPP_SVG}</a>
    </footer>
  </article>`;
}

/** Grupo del catálogo por línea (Web / Creative / Data). */
export function catalogGroup(line, services) {
  return `<section class="cat" id="linea-${esc(line.id)}" aria-labelledby="cat-${esc(line.id)}">
    <header class="cat__head reveal">
      <span class="chip">${icon(line.icon)}${esc(line.label)}</span>
      <h3 id="cat-${esc(line.id)}">${esc(line.title)}</h3>
    </header>
    <div class="cat__grid">${services.map(serviceCard).join('')}</div>
  </section>`;
}

/* ---------- Preguntas frecuentes ---------- */
export function faqItem(f) {
  return `<details class="faq__item">
    <summary>${esc(f.q)}</summary>
    <p>${esc(f.a)}</p>
  </details>`;
}

/* ---------- Cómo funciona ---------- */
export function stepItem(s, i) {
  return `<li class="step reveal" style="--d:${i * 90}ms">
    <span class="step__n">${esc(s.n)}</span>
    <h3 class="step__title">${esc(s.title)}</h3>
    <p>${esc(s.text)}</p>
  </li>`;
}

/* ---------- Portafolio ---------- */
export function portfolioCard(p, i, mockFn) {
  let media;
  if (p.video) {
    const piece = p.piece ? `<img class="pf__piece" src="${esc(p.piece)}" alt="${esc(p.pieceAlt || '')}" loading="lazy" width="500" height="1200">` : '';
    media = `<div class="pf__video">
      <video src="${esc(p.video)}" poster="${esc(p.image)}" autoplay muted loop playsinline preload="metadata" aria-label="${esc(p.alt)}"></video>
      ${piece}</div>`;
  } else if (p.image && p.frame === 'browser') {
    media = `<div class="pf__browser"><div class="pf__browser-bar"><i></i><i></i><i></i></div>
      <img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy" width="1280" height="800"></div>`;
  } else if (p.image) {
    media = `<div class="pf__phone"><img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy" width="390" height="844"></div>`;
  } else {
    media = `<div class="pf__placeholder" role="img" aria-label="${esc(p.alt)} — imagen pendiente">
         ${mockFn(p.mock)}
         <span class="pf__badge">Imagen del proyecto próximamente</span>
       </div>`;
  }
  const link = p.url
    ? `<a class="link-cta" href="${esc(p.url)}" target="_blank" rel="noopener">Ver proyecto ${icon('arrow', 'icon icon--arrow')}</a>`
    : '';
  return `<article class="pf reveal" style="--d:${(i % 2) * 90}ms">
    <div class="pf__media">${media}</div>
    <div class="pf__body">
      <span class="pf__cat">${esc(p.category)}</span>
      <h3 class="pf__name">${esc(p.name)}</h3>
      <p>${esc(p.description)}</p>
      ${link}
    </div>
  </article>`;
}

/** Miniaturas abstractas (no capturas reales) para el portafolio pendiente. */
export function miniMock(kind) {
  const bars = (n) => Array.from({ length: n }, (_, i) => `<i style="--h:${30 + ((i * 37) % 60)}%"></i>`).join('');
  switch (kind) {
    case 'dashboard':
      return `<div class="mm mm--dash"><div class="mm__kpis"><b></b><b></b><b></b></div><div class="mm__bars">${bars(9)}</div></div>`;
    case 'content':
      return `<div class="mm mm--grid">${'<b></b>'.repeat(9)}</div>`;
    case 'business':
      return `<div class="mm mm--site"><div class="mm__nav"></div><div class="mm__hero"></div><div class="mm__row"><b></b><b></b><b></b></div></div>`;
    default:
      return `<div class="mm mm--event"><div class="mm__circle"></div><div class="mm__line"></div><div class="mm__line mm__line--s"></div><div class="mm__gifts"><b></b><b></b><b></b></div></div>`;
  }
}
