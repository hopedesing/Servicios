/** Iconos de línea (24×24, trazo = currentColor). */
const P = {
  creative: '<path d="M4 20c3.5 0 5-1.6 5-4a3 3 0 0 0-3-3c-1.7 0-3 1.3-3 3v4h1z"/><path d="M9.5 13.5 19 4a1.4 1.4 0 0 1 2 2l-9.5 9.5"/>',
  web: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18"/><circle cx="6.5" cy="6.5" r=".6" fill="currentColor"/><circle cx="9" cy="6.5" r=".6" fill="currentColor"/>',
  data: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  event: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="M12 18.2s-3-1.8-3-3.6a1.5 1.5 0 0 1 3-.6 1.5 1.5 0 0 1 3 .6c0 1.8-3 3.6-3 3.6z"/>',
  business: '<path d="M4 10v10h16V10"/><path d="M3 10 5 4h14l2 6c0 1.4-1.2 2.4-2.6 2.4S16 11.4 16 10c0 1.4-1.2 2.4-2.6 2.4h-2.8C9.2 12.4 8 11.4 8 10c0 1.4-1.2 2.4-2.6 2.4S3 11.4 3 10z"/><path d="M10 20v-4h4v4"/>',
  content: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><path d="m15.5 14.5 4 2.5-4 2.5z"/>',
  commercial: '<rect x="2.5" y="6" width="14" height="12" rx="3"/><path d="m16.5 10.5 5-3v9l-5-3"/>',
  dashboard: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/><path d="M12.5 17.5l2.5-3 2 1.6 2-2.6"/>',
  tools: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 9h4M7 13h10M7 17h6"/><circle cx="16" cy="9" r="1.6"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
  gift: '<rect x="3.5" y="9" width="17" height="11.5" rx="2"/><path d="M2.5 9h19M12 9v11.5M12 9S10.5 4 8 4.6C6 5 6.6 9 12 9zm0 0s1.5-5 4-4.4c2 .4 1.4 4.4-4 4.4z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

export function icon(name, cls = 'icon') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name] || ''}</svg>`;
}

/** Logo oficial de WhatsApp (relleno). */
export const WHATSAPP_SVG = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"/></svg>`;
