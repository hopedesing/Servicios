import { LOGO_VIEWBOX, LOGO_INK, LOGO_WAVE } from '../brand-paths.js';

/**
 * Logotipo HOPE en línea (SVG). Los colores se controlan con CSS:
 *   .logo { color: <color de h/o/e>; --wave: <color de la onda p>; }
 */
export function logo({ cls = '', label = 'HOPE' } = {}) {
  return `<svg class="logo ${cls}" viewBox="${LOGO_VIEWBOX}" role="img" aria-label="${label}">
    <path class="logo-ink" fill="currentColor" fill-rule="evenodd" d="${LOGO_INK}"/>
    <path class="logo-wave" fill="var(--wave, #D92BEF)" fill-rule="evenodd" d="${LOGO_WAVE}"/>
  </svg>`;
}
