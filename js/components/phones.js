import { icon } from '../lib/icons.js';
import { esc } from '../lib/utils.js';

/**
 * Mockups de teléfono para la sección WEB.
 * Son ejemplos ilustrativos (no clientes reales) y así se rotulan en pantalla.
 */

const frame = (inner, label) => `
  <div class="phone" role="img" aria-label="Ejemplo ilustrativo de página para ${esc(label)}">
    <div class="phone__notch"></div>
    <div class="phone__screen">${inner}</div>
  </div>`;

function wedding() {
  return `
    <div class="ph ph--wedding">
      <p class="ph__eyebrow">Nos casamos</p>
      <p class="ph__script">Ana &amp; Tomás</p>
      <p class="ph__date">Sábado · 14 · Marzo</p>
      <div class="ph__countdown" data-countdown>
        <span><b data-cd="d">00</b>días</span><span><b data-cd="h">00</b>horas</span><span><b data-cd="m">00</b>min</span><span><b data-cd="s">00</b>seg</span>
      </div>
      <div class="ph__card">${icon('pin')}<div><strong>Hacienda El Roble</strong><small>Ceremonia 4:00 p. m.</small></div></div>
      <div class="ph__map ph__map--s" aria-hidden="true"><i></i></div>
      <p class="ph__sub">Galería</p>
      <div class="ph__gallery"><i></i><i></i><i></i></div>
      <span class="ph__btn">Confirmar asistencia</span>
    </div>`;
}

function babyshower() {
  const gifts = [
    ['Cuna portátil', true],
    ['Pañalera', false],
    ['Kit de baño', true],
    ['Mantas de algodón', false],
  ];
  return `
    <div class="ph ph--baby">
      <p class="ph__eyebrow">Baby shower</p>
      <p class="ph__title">Bienvenida, Luna</p>
      <div class="ph__meta"><span>${icon('clock')} 12 abr · 3 p. m.</span><span>${icon('pin')} Ver mapa</span></div>
      <div class="ph__map" aria-hidden="true"><i></i></div>
      <p class="ph__sub">${icon('gift')} Lista de regalos</p>
      <ul class="ph__gifts">
        ${gifts.map(([g, taken]) => `<li class="${taken ? 'is-taken' : ''}"><span>${g}</span><em>${taken ? 'Elegido' : 'Disponible'}</em></li>`).join('')}
      </ul>
      <span class="ph__btn">Confirmar asistencia</span>
    </div>`;
}

function graduation() {
  return `
    <div class="ph ph--grad">
      <p class="ph__eyebrow">Ceremonia de grado</p>
      <p class="ph__title ph__title--c">Valentina Ruiz</p>
      <p class="ph__date">Administración de Empresas · Promoción 2026</p>
      <div class="ph__card">${icon('clock')}<div><strong>Viernes 4 de diciembre</strong><small>Ceremonia 10:00 a. m.</small></div></div>
      <div class="ph__card">${icon('pin')}<div><strong>Auditorio principal</strong><small>Celebración después en casa</small></div></div>
      <p class="ph__sub">Galería</p>
      <div class="ph__gallery ph__gallery--tall"><i></i><i></i><i></i></div>
      <span class="ph__btn">Confirmar asistencia</span>
    </div>`;
}

const RENDER = { wedding, babyshower, graduation };

export function showcaseItem(s, i) {
  return `<figure class="show reveal" style="--d:${i * 110}ms">
    ${frame(RENDER[s.id](), s.label)}
    <figcaption>
      <h3>${esc(s.label)}</h3>
      <ul>${s.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      <a class="link-cta" href="#cotizar" data-quote="event"${s.gifts ? ' data-gifts' : ''}>Quiero una así ${icon('arrow', 'icon icon--arrow')}</a>
    </figcaption>
  </figure>`;
}

/** Cuenta regresiva del mockup de matrimonio (siempre ~75 días en el futuro). */
export function startCountdown(root = document) {
  const el = root.querySelector('[data-countdown]');
  if (!el) return;
  const target = Date.now() + 75 * 864e5 + 6 * 36e5 + 23 * 6e4;
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    let t = Math.max(0, target - Date.now()) / 1000;
    const d = Math.floor(t / 86400); t -= d * 86400;
    const h = Math.floor(t / 3600); t -= h * 3600;
    const m = Math.floor(t / 60); const s = Math.floor(t - m * 60);
    el.querySelector('[data-cd="d"]').textContent = pad(d);
    el.querySelector('[data-cd="h"]').textContent = pad(h);
    el.querySelector('[data-cd="m"]').textContent = pad(m);
    el.querySelector('[data-cd="s"]').textContent = pad(s);
  };
  tick();
  setInterval(tick, 1000);
}
