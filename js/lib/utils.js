import { CONFIG } from '../config.js';

/** Escapa texto para insertarlo en HTML de forma segura. */
export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** 250000 → "$250.000" */
export const cop = (n) => '$' + Number(n).toLocaleString('es-CO', { maximumFractionDigits: 0 }).replace(/,/g, '.');

/** Enlace de WhatsApp con mensaje. Si no hay número configurado, devuelve null. */
export function waLink(message = CONFIG.WHATSAPP_DEFAULT_MESSAGE) {
  const num = String(CONFIG.WHATSAPP_NUMBER || '').replace(/\D/g, '');
  if (!num) return null;
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

/** Atributos href/target para un enlace de WhatsApp (o un ancla de respaldo al formulario). */
export function waAttrs(message) {
  const href = waLink(message);
  return href
    ? `href="${esc(href)}" target="_blank" rel="noopener"`
    : `href="#cotizar" data-wa-missing`;
}

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
