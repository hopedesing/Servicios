/**
 * ============================================================
 *  CATÁLOGO DE SERVICIOS HOPE  ← aquí se editan los PRECIOS
 * ============================================================
 * Para cambiar un precio, modifica `priceFrom` (número, sin puntos).
 *   priceFrom: 250000   → se muestra "Desde $250.000"
 *   priceFrom: null     → se muestra "Precio a la medida"
 * El campo `whatsapp` es el mensaje que se envía desde cada servicio.
 */
export const SERVICES = [
  /* ---------------- WEB ---------------- */
  {
    id: 'event',
    name: 'HOPE Event',
    line: 'web',
    icon: 'event',
    priceFrom: 250000,
    summary: 'Invitaciones web interactivas: todo lo que tus invitados necesitan en un solo enlace.',
    forWhat: ['Matrimonios', 'Baby showers', 'Cumpleaños', 'Grados', 'Bautizos', 'Aniversarios'],
    base: ['Diseño personalizado', 'Confirmación de asistencia', '2 rondas de ajustes', 'Enlace activo hasta 1 mes después del evento'],
    delivery: '3 a 5 días hábiles',
    includes: ['Fecha y hora', 'Ubicación y mapa', 'Cuenta regresiva', 'Galería', 'Botón de WhatsApp', 'Código de vestuario', 'Música'],
    extra: {
      title: 'Lista de regalos (opcional)',
      text: 'Tus invitados ven qué regalos siguen disponibles y apartan el suyo. Se suma a la cotización.',
    },
    cta: 'Cotizar mi evento',
    formOption: 'event',
    whatsapp: 'Hola, buen día. Me interesa una invitación web para un evento. ¿Me podrían compartir qué incluye el servicio, los tiempos de entrega y una cotización?',
  },
  {
    id: 'business',
    name: 'HOPE Business',
    line: 'web',
    icon: 'business',
    priceFrom: 500000,
    summary: 'Páginas web para negocios y emprendimientos que quieren verse profesionales y recibir más clientes.',
    base: ['Hasta 5 secciones', 'Adaptada a celular', 'Botón de WhatsApp y redes', '2 rondas de ajustes'],
    delivery: '8 a 12 días hábiles',
    includes: ['Inicio', 'Nosotros', 'Servicios', 'Productos o catálogo', 'Galería', 'Ubicación y horarios', 'Formulario de contacto'],
    extra: {
      title: 'App de gestión (opcional)',
      text: 'Agenda de citas, ventas, clientes e informe del mes en una app que se instala en el celular.',
    },
    cta: 'Quiero mi página web',
    formOption: 'business',
    whatsapp: 'Hola, buen día. Me interesa una página web para mi negocio. ¿Me podrían compartir qué incluye el servicio, los tiempos de entrega y una cotización?',
  },

  /* ---------------- CREATIVE ---------------- */
  {
    id: 'content',
    name: 'HOPE Content',
    line: 'creative',
    icon: 'content',
    priceFrom: 299000,
    priceSuffix: '/ mes',
    summary: 'Contenido para redes sociales con concepto, constancia y una voz que se reconoce.',
    base: ['8 piezas gráficas al mes', '2 reels al mes', 'Copies para cada publicación', 'Calendario mensual'],
    delivery: 'Calendario listo la primera semana de cada mes',
    includes: ['Conceptos creativos', 'Historias', 'Carruseles', 'Adaptación a cada red'],
    cta: 'Quiero contenido',
    formOption: 'content',
    whatsapp: 'Hola, buen día. Me interesa el servicio de contenido mensual para redes sociales. ¿Me podrían compartir qué incluye el plan y una cotización?',
  },
  {
    id: 'commercial',
    name: 'HOPE Commercial',
    line: 'creative',
    icon: 'commercial',
    priceFrom: 350000,
    summary: 'Videos promocionales para negocios, productos y campañas que cuentan algo en pocos segundos.',
    base: ['Video de hasta 30 segundos', 'Concepto y guion', 'Edición con música y textos', 'Formatos vertical y horizontal'],
    delivery: '5 a 8 días hábiles desde que recibimos el material',
    includes: ['Estructura narrativa', 'Voz en off', 'Subtítulos', 'Versiones cortas para historias'],
    cta: 'Quiero un comercial',
    formOption: 'commercial',
    whatsapp: 'Hola, buen día. Me interesa un video comercial para mi negocio. ¿Me podrían compartir qué incluye el servicio, los tiempos de entrega y una cotización?',
  },

  /* ---------------- DATA ---------------- */
  {
    id: 'dashboard',
    name: 'HOPE Dashboard',
    line: 'data',
    icon: 'dashboard',
    priceFrom: 350000,
    summary: 'Convertimos tu información de Excel o Google Sheets en un dashboard claro para decidir.',
    base: ['1 fuente de datos (Excel o Sheets)', 'Hasta 6 indicadores', 'Filtros y gráficos', '1 sesión de capacitación'],
    delivery: '5 a 10 días hábiles',
    includes: ['Power BI o Looker Studio', 'Limpieza y organización de datos', 'Análisis de resultados', 'Actualización automática'],
    cta: 'Quiero mi dashboard',
    formOption: 'dashboard',
    whatsapp: 'Hola, buen día. Me interesa un dashboard para organizar y analizar la información de mi negocio. ¿Me podrían compartir qué incluye el servicio y una cotización?',
  },
  {
    id: 'tools',
    name: 'HOPE Tools',
    line: 'data',
    icon: 'tools',
    priceFrom: null,
    summary: 'Herramientas web a la medida conectadas a Google Sheets, para dejar de hacerlo todo a mano.',
    forWhat: ['Inscripciones', 'Votaciones', 'Agendas de citas', 'Encuestas', 'Seguimiento de solicitudes'],
    base: ['Formulario o app web propia', 'Datos guardados en Google Sheets', 'Panel para ver los resultados', 'Capacitación de uso'],
    delivery: 'Según el alcance del proyecto',
    includes: ['Notificaciones por correo', 'Acceso con contraseña', 'Reportes descargables', 'Conteos en tiempo real'],
    cta: 'Cotizar mi herramienta',
    formOption: 'tools',
    whatsapp: 'Hola, buen día. Me interesa una herramienta web a la medida (inscripciones, votaciones o agenda). ¿Podríamos conversar sobre el alcance y una cotización?',
  },
];

/** Opciones del campo "¿Qué necesitas?" del formulario. */
export const QUOTE_OPTIONS = [
  { value: 'event', label: 'Invitación web para evento' },
  { value: 'business', label: 'Página web para negocio' },
  { value: 'content', label: 'Contenido para redes' },
  { value: 'commercial', label: 'Video comercial' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'tools', label: 'Herramienta a la medida (inscripciones, votaciones, agenda)' },
  { value: 'other', label: 'Otro' },
];

/** Servicios del formulario que muestran la casilla "lista de regalos". */
export const GIFT_LIST_OPTIONS = ['event'];

export const BUDGET_OPTIONS = [
  'Menos de $300.000',
  '$300.000 – $500.000',
  '$500.000 – $800.000',
  '$800.000 – $1.500.000',
  'Más de $1.500.000',
  'No estoy seguro',
];

export const CONTACT_OPTIONS = ['WhatsApp', 'Correo', 'Cualquiera'];
