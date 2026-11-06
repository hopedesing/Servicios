/**
 * HOPE · Configuración pública del sitio
 * ------------------------------------------------------------
 * Todo lo que está aquí es visible en el navegador, así que
 * NUNCA pongas aquí claves privadas (API keys de Resend, etc.).
 * Las claves van en variables de entorno del servidor (.env / Vercel).
 */
export const CONFIG = {
  BRAND: 'HOPE',
  TAGLINE: 'Dale forma a lo que imaginas.',

  // Número de WhatsApp en formato internacional, solo dígitos (57 = Colombia).
  WHATSAPP_NUMBER: '573134434880',
  WHATSAPP_DEFAULT_MESSAGE: 'Hola HOPE 👋 Vi su página y quiero cotizar un proyecto.',

  // Redes y contacto. Si un valor queda vacío, ese enlace no se muestra.
  INSTAGRAM_URL: '',           // ej: 'https://instagram.com/tu_usuario'
  CONTACT_EMAIL: '',           // ej: 'hola@tudominio.com'

  // Envío del formulario de cotización.
  //  'api'        → función serverless propia (/api/cotizacion) con Resend. Recomendado.
  //  'web3forms'  → servicio Web3Forms (para hosting 100% estático, ej. GitHub Pages).
  FORM_PROVIDER: 'api',
  FORM_ENDPOINT: '/api/cotizacion',
  // Solo si usas Web3Forms: su "access key" es pública por diseño (solo enruta
  // al correo que registraste); no es una clave secreta.
  WEB3FORMS_ACCESS_KEY: '',
};
