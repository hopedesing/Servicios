/**
 * Función serverless (Vercel): POST /api/cotizacion
 * Recibe el formulario y envía el correo con Resend.
 * La API key vive en variables de entorno, nunca en el frontend.
 */
import { handleQuote } from './_quote.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método no permitido' });
  }
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ ok: false, error: 'JSON inválido' }); }
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  try {
    const { status, body: out } = await handleQuote({ body, ip, origin: req.headers.origin || '' });
    return res.status(status).json(out);
  } catch (err) {
    console.error('[HOPE] Error inesperado', err);
    return res.status(500).json({ ok: false, error: 'Error interno' });
  }
}
