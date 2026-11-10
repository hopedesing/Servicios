/**
 * HOPE · Configuración pública del sitio
 * ------------------------------------------------------------
 * Todo lo que está aquí es visible en el navegador, así que
 * NUNCA pongas aquí claves privadas (API keys de Resend, etc.).
 */
export const CONFIG = {
  BRAND: 'HOPE',
  TAGLINE: 'Dale forma a lo que imaginas.',

  // Número de WhatsApp en formato internacional, solo dígitos (57 = Colombia).
  WHATSAPP_NUMBER: '573134434880',
  WHATSAPP_DEFAULT_MESSAGE: 'Hola, buen día. Conocí HOPE a través de su página web y me gustaría recibir información sobre sus servicios y una cotización para mi proyecto.',

  // Redes y contacto. Si un valor queda vacío, ese enlace no se muestra.
  INSTAGRAM_URL: '',           // ej: 'https://instagram.com/tu_usuario'
  CONTACT_EMAIL: '',           // ej: 'hola@tudominio.com'

  // Envío del formulario de cotización.
  //  'sheets'     → Google Sheets + aviso a hope.creatividad@gmail.com (Apps Script). ← EN USO (GitHub Pages)
  //  'api'        → función serverless propia (/api/cotizacion) con Resend (solo si publicas en Vercel).
  //  'web3forms'  → servicio Web3Forms.
  FORM_PROVIDER: 'sheets',
  // Pega aquí la URL de tu Apps Script publicado (termina en /exec).
  APPS_SCRIPT_URL: '',
  FORM_ENDPOINT: '/api/cotizacion',
  WEB3FORMS_ACCESS_KEY: '',
};
