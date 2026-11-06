/**
 * Lógica del envío de cotizaciones (compartida por la función serverless
 * y el servidor local de desarrollo). Se ejecuta SOLO en el servidor.
 *
 * Variables de entorno:
 *   RESEND_API_KEY     Clave privada de Resend (obligatoria en producción)
 *   QUOTE_TO_EMAIL     Correo de HOPE que recibe las solicitudes
 *   QUOTE_FROM_EMAIL   Remitente verificado en Resend, ej: "HOPE Web <cotizaciones@tudominio.com>"
 *   ALLOWED_ORIGINS    (opcional) dominios permitidos separados por coma
 *   QUOTE_DRY_RUN      (opcional) "1" para no enviar y solo registrar en consola (pruebas)
 */

const LIMITS = { name: 120, email: 160, whatsapp: 25, service: 80, project_name: 120, description: 2000, date: 10, budget: 40, contact_pref: 20 };

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function clean(body) {
  const out = {};
  for (const [k, max] of Object.entries(LIMITS)) out[k] = String(body?.[k] ?? '').trim().slice(0, max);
  out.consent = body?.consent === true;
  out.gift_list = body?.gift_list === true;
  out.company = String(body?.company ?? '');
  return out;
}

export function validate(d) {
  const errors = {};
  if (d.name.length < 3) errors.name = 'Nombre requerido';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.email = 'Correo inválido';
  const digits = d.whatsapp.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) errors.whatsapp = 'WhatsApp inválido';
  if (!d.service) errors.service = 'Servicio requerido';
  if (d.description.length < 15) errors.description = 'Descripción muy corta';
  if (!d.budget) errors.budget = 'Presupuesto requerido';
  if (d.date && !/^\d{4}-\d{2}-\d{2}$/.test(d.date)) errors.date = 'Fecha inválida';
  if (!d.consent) errors.consent = 'Autorización requerida';
  return errors;
}

function formatDate(iso) {
  if (!iso) return 'Sin fecha definida';
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${d} de ${months[m - 1]} de ${y}`;
}

export function buildEmail(d) {
  const waDigits = d.whatsapp.replace(/\D/g, '');
  const waIntl = waDigits.length === 10 ? '57' + waDigits : waDigits;
  const rows = [
    ['Nombre', esc(d.name)],
    ['Correo', `<a href="mailto:${esc(d.email)}">${esc(d.email)}</a>`],
    ['WhatsApp', `<a href="https://wa.me/${waIntl}">${esc(d.whatsapp)}</a>`],
    ['Servicio solicitado', esc(d.service)],
    ['Nombre del negocio/evento', esc(d.project_name || '—')],
    ['Fecha', esc(formatDate(d.date))],
    ['Presupuesto', esc(d.budget)],
    ['Prefiere contacto por', esc(d.contact_pref || 'Cualquiera')],
    ...(d.gift_list ? [['Lista de regalos', 'Sí, la quiere incluir']] : []),
  ];
  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#F4EAFE;font-family:Arial,Helvetica,sans-serif;color:#0b0b0c">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden">
      <tr><td style="background:#000000;padding:22px 28px;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:-.5px">
        hope<span style="color:#D92BEF">.</span> <span style="font-weight:normal;font-size:14px;color:#cfcfd4">· Nueva solicitud de cotización</span></td></tr>
      <tr><td style="padding:24px 28px 8px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">
          ${rows.map(([k, v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#75757c;width:42%;vertical-align:top">${k}</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top">${v}</td></tr>`).join('')}
        </table>
      </td></tr>
      <tr><td style="padding:12px 28px 28px">
        <p style="margin:0 0 8px;color:#75757c;font-size:14px">Descripción del proyecto</p>
        <div style="background:#F5F5F5;border-left:4px solid #D92BEF;border-radius:10px;padding:14px 16px;font-size:15px;line-height:1.55;white-space:pre-wrap">${esc(d.description)}</div>
        <p style="margin:22px 0 0">
          <a href="https://wa.me/${waIntl}" style="display:inline-block;background:#000;color:#fff;text-decoration:none;padding:11px 18px;border-radius:999px;font-weight:bold;font-size:14px">Responder por WhatsApp</a>
          <a href="mailto:${esc(d.email)}" style="display:inline-block;margin-left:8px;border:1.5px solid #000;color:#000;text-decoration:none;padding:10px 18px;border-radius:999px;font-weight:bold;font-size:14px">Responder por correo</a>
        </p>
      </td></tr>
    </table>
    <p style="font-size:12px;color:#75757c;margin-top:14px">Enviado desde el formulario de la web de HOPE. El cliente autorizó el tratamiento de sus datos.</p>
  </td></tr></table></body></html>`;

  const text = [
    'Nueva solicitud de cotización — HOPE',
    '',
    ...[
      ['Nombre', d.name], ['Correo', d.email], ['WhatsApp', d.whatsapp], ['Servicio solicitado', d.service],
      ['Nombre del negocio/evento', d.project_name || '—'], ['Fecha', formatDate(d.date)], ['Presupuesto', d.budget],
      ['Prefiere contacto por', d.contact_pref || 'Cualquiera'], ...(d.gift_list ? [['Lista de regalos', 'Sí']] : []),
    ].map(([k, v]) => `${k}: ${v}`),
    '',
    'Descripción del proyecto:',
    d.description,
  ].join('\n');

  return { subject: 'Nueva solicitud de cotización — HOPE', html, text };
}

/* Límite simple por IP (por instancia). */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

/**
 * Procesa una solicitud. Devuelve { status, body }.
 */
export async function handleQuote({ body, ip = 'unknown', origin = '', env = process.env }) {
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (allowed.length && origin && !allowed.includes(origin)) return { status: 403, body: { ok: false, error: 'Origen no permitido' } };

  const d = clean(body);
  // Honeypot: un bot llenó el campo oculto → respondemos OK sin enviar.
  if (d.company) return { status: 200, body: { ok: true } };
  if (rateLimited(ip)) return { status: 429, body: { ok: false, error: 'Demasiadas solicitudes. Intenta más tarde.' } };

  const errors = validate(d);
  if (Object.keys(errors).length) return { status: 422, body: { ok: false, error: 'Datos incompletos', fields: errors } };

  const email = buildEmail(d);

  if (env.QUOTE_DRY_RUN === '1') {
    console.log('\n[HOPE · DRY RUN] Correo que se enviaría a', env.QUOTE_TO_EMAIL || '(QUOTE_TO_EMAIL sin definir)');
    console.log(email.text, '\n');
    return { status: 200, body: { ok: true, dryRun: true } };
  }

  const { RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } = env;
  if (!RESEND_API_KEY || !QUOTE_TO_EMAIL || !QUOTE_FROM_EMAIL) {
    console.error('[HOPE] Faltan variables de entorno: RESEND_API_KEY, QUOTE_TO_EMAIL o QUOTE_FROM_EMAIL');
    return { status: 500, body: { ok: false, error: 'El servicio de envío no está configurado.' } };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: QUOTE_FROM_EMAIL,
      to: QUOTE_TO_EMAIL.split(',').map((s) => s.trim()),
      reply_to: d.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });
  if (!res.ok) {
    console.error('[HOPE] Resend respondió', res.status, await res.text().catch(() => ''));
    return { status: 502, body: { ok: false, error: 'No se pudo enviar el correo.' } };
  }
  return { status: 200, body: { ok: true } };
}
