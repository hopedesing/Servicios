import { CONFIG } from '../config.js';
import { QUOTE_OPTIONS, BUDGET_OPTIONS, CONTACT_OPTIONS, GIFT_LIST_OPTIONS } from '../data/services.js';
import { esc, waLink, $, $$ } from './utils.js';

/* ------------------------------------------------------------------ */
/*  Render de opciones                                                  */
/* ------------------------------------------------------------------ */
export function renderFormOptions(form) {
  $('#f-service', form).insertAdjacentHTML(
    'beforeend',
    QUOTE_OPTIONS.map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join('')
  );
  $('#f-budget-group', form).innerHTML = BUDGET_OPTIONS.map(
    (b, i) => `<label class="pill"><input type="radio" name="budget" value="${esc(b)}" ${i === 0 ? 'required' : ''}><span>${esc(b)}</span></label>`
  ).join('');
  $('#f-contact-group', form).innerHTML = CONTACT_OPTIONS.map(
    (c, i) => `<label class="pill"><input type="radio" name="contact_pref" value="${esc(c)}" ${i === 0 ? 'checked' : ''}><span>${esc(c)}</span></label>`
  ).join('');
  // La fecha mínima es hoy (hora local).
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  $('#f-date', form).min = today;

  // La casilla "lista de regalos" solo aparece para invitaciones de evento.
  const gifts = $('#f-gifts-wrap', form);
  const sync = () => {
    const show = GIFT_LIST_OPTIONS.includes($('#f-service', form).value);
    gifts.hidden = !show;
    if (!show) $('#f-gifts', form).checked = false;
  };
  $('#f-service', form).addEventListener('change', sync);
  form.addEventListener('reset', () => setTimeout(sync));
  sync();
}

/** Preselecciona un servicio (desde los botones "Cotizar"). */
export function preselectService(value, { gifts = false } = {}) {
  const sel = $('#f-service');
  if (!sel || !QUOTE_OPTIONS.some((o) => o.value === value)) return;
  sel.value = value;
  sel.dispatchEvent(new Event('change', { bubbles: true }));
  if (gifts) $('#f-gifts').checked = true;
  clearError(sel);
}

/* ------------------------------------------------------------------ */
/*  Validación                                                          */
/* ------------------------------------------------------------------ */
const RULES = {
  name: (v) => (v.trim().length < 3 ? 'Escribe tu nombre completo.' : ''),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Escribe un correo válido, por ejemplo nombre@correo.com.' : ''),
  whatsapp: (v) => {
    const digits = v.replace(/\D/g, '');
    return digits.length < 10 || digits.length > 15 ? 'Escribe tu número de WhatsApp con al menos 10 dígitos.' : '';
  },
  service: (v) => (!v ? 'Elige el tipo de proyecto que necesitas.' : ''),
  description: (v) => (v.trim().length < 15 ? 'Cuéntanos un poco más (mínimo 15 caracteres).' : ''),
  date: (v, el) => (v && el.min && v < el.min ? 'La fecha no puede ser anterior a hoy.' : ''),
  budget: (_, __, form) => (!form.querySelector('input[name="budget"]:checked') ? 'Elige un presupuesto aproximado (puedes marcar "No estoy seguro").' : ''),
  consent: (_, el) => (!el.checked ? 'Necesitamos tu autorización para responderte.' : ''),
};

function fieldWrap(el) {
  return el.closest('.field') || el.closest('fieldset') || el.parentElement;
}
function setError(el, msg) {
  const wrap = fieldWrap(el);
  wrap.classList.add('has-error');
  const err = wrap.querySelector('.field__error');
  if (err) err.textContent = msg;
  (wrap.matches('fieldset') ? $$('input', wrap) : [el]).forEach((i) => i.setAttribute('aria-invalid', 'true'));
}
function clearError(el) {
  const wrap = fieldWrap(el);
  wrap.classList.remove('has-error');
  const err = wrap.querySelector('.field__error');
  if (err) err.textContent = '';
  (wrap.matches('fieldset') ? $$('input', wrap) : [el]).forEach((i) => i.removeAttribute('aria-invalid'));
}

function validateField(form, name) {
  const el = name === 'budget' ? form.querySelector('input[name="budget"]') : form.elements[name];
  if (!el || !RULES[name]) return true;
  const msg = RULES[name](el.value ?? '', el, form);
  msg ? setError(el, msg) : clearError(el);
  return !msg;
}

/* ------------------------------------------------------------------ */
/*  Envío                                                               */
/* ------------------------------------------------------------------ */
function collect(form) {
  const fd = new FormData(form);
  const serviceValue = fd.get('service');
  const option = QUOTE_OPTIONS.find((o) => o.value === serviceValue);
  return {
    name: (fd.get('name') || '').trim(),
    email: (fd.get('email') || '').trim(),
    whatsapp: (fd.get('whatsapp') || '').trim(),
    service: option ? option.label : '',
    project_name: (fd.get('project_name') || '').trim(),
    description: (fd.get('description') || '').trim(),
    date: fd.get('date') || '',
    budget: fd.get('budget') || '',
    contact_pref: fd.get('contact_pref') || '',
    gift_list: fd.get('gift_list') === 'on',
    consent: fd.get('consent') === 'on',
    company: fd.get('company') || '', // honeypot anti-spam
  };
}

async function sendToApi(data) {
  const res = await fetch(CONFIG.FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.ok) throw new Error(json.error || `Error ${res.status}`);
  return json;
}

async function sendToWeb3Forms(data) {
  if (!CONFIG.WEB3FORMS_ACCESS_KEY) throw new Error('Falta configurar WEB3FORMS_ACCESS_KEY.');
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: CONFIG.WEB3FORMS_ACCESS_KEY,
      subject: 'Nueva solicitud de cotización — HOPE',
      from_name: 'Web HOPE',
      replyto: data.email,
      botcheck: data.company,
      Nombre: data.name,
      Correo: data.email,
      WhatsApp: data.whatsapp,
      'Servicio solicitado': data.service,
      'Nombre del negocio/evento': data.project_name || '—',
      'Fecha requerida': data.date || 'Sin fecha definida',
      Presupuesto: data.budget,
      'Prefiere contacto por': data.contact_pref,
      'Lista de regalos': data.gift_list ? 'Sí' : 'No',
      'Descripción del proyecto': data.description,
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.success) throw new Error(json.message || `Error ${res.status}`);
  return json;
}

/* ------------------------------------------------------------------ */
/*  Inicialización                                                      */
/* ------------------------------------------------------------------ */
export function initQuoteForm({ onSuccess }) {
  const form = $('#quote-form');
  if (!form) return;
  renderFormOptions(form);

  const status = $('#form-status', form);
  const btn = $('button[type="submit"]', form);
  const touched = new Set();

  // Validación en vivo después de que el campo fue tocado.
  form.addEventListener('focusout', (e) => {
    const n = e.target.name;
    if (!n || !RULES[n] || n === 'budget') return;
    if (e.target.value || touched.has(n)) { touched.add(n); validateField(form, n); }
  });
  form.addEventListener('input', (e) => {
    const n = e.target.name;
    if (touched.has(n) || fieldWrap(e.target).classList.contains('has-error')) validateField(form, n);
  });
  form.addEventListener('change', (e) => {
    const n = e.target.name;
    if (['budget', 'consent', 'service', 'date'].includes(n)) validateField(form, n);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';

    const names = Object.keys(RULES);
    const results = names.map((n) => validateField(form, n));
    if (results.includes(false)) {
      names.forEach((n) => touched.add(n));
      const first = form.querySelector('[aria-invalid="true"]');
      first?.focus({ preventScroll: true });
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const count = results.filter((r) => !r).length;
      status.classList.add('is-error');
      status.textContent = count === 1 ? 'Revisa el campo marcado para continuar.' : `Revisa los ${count} campos marcados para continuar.`;
      return;
    }

    const data = collect(form);
    btn.disabled = true;
    btn.classList.add('is-loading');
    btn.setAttribute('aria-busy', 'true');
    try {
      if (CONFIG.FORM_PROVIDER === 'preview') await new Promise((r) => setTimeout(r, 700)); // solo vista previa: no envía
      else if (CONFIG.FORM_PROVIDER === 'web3forms') await sendToWeb3Forms(data);
      else await sendToApi(data);
      form.reset();
      touched.clear();
      onSuccess?.(data);
    } catch (err) {
      console.error('[HOPE] Error enviando cotización:', err);
      const wa = waLink(`Hola HOPE 👋 Soy ${data.name}. Quería cotizar: ${data.service}. ${data.description}`);
      status.classList.add('is-error');
      status.innerHTML = `No pudimos enviar tu solicitud en este momento. Intenta de nuevo en unos minutos${wa ? ` o <a href="${esc(wa)}" target="_blank" rel="noopener">escríbenos por WhatsApp</a> con tu idea` : ''}.`;
    } finally {
      btn.disabled = false;
      btn.classList.remove('is-loading');
      btn.removeAttribute('aria-busy');
    }
  });
}
