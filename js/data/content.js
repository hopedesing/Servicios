/**
 * Contenido editable de las secciones.
 */

/** Las tres líneas de HOPE — sección "¿Qué hacemos?" y encabezados del catálogo. */
export const LINES = [
  {
    id: 'web',
    label: 'Web',
    icon: 'web',
    title: 'Experiencias digitales que conectan.',
    text: 'Invitaciones web para tus eventos y páginas para tu negocio.',
  },
  {
    id: 'creative',
    label: 'Creative',
    icon: 'creative',
    title: 'Contenido que comunica.',
    text: 'Contenido mensual para redes y videos comerciales.',
  },
  {
    id: 'data',
    label: 'Data',
    icon: 'data',
    title: 'Datos que ayudan a decidir.',
    text: 'Dashboards y herramientas a la medida conectadas a tus datos.',
  },
];

/** Sección "Cómo funciona" */
export const STEPS = [
  { n: '01', title: 'Cuéntanos tu idea', text: 'Eliges el servicio y nos cuentas qué necesitas.' },
  { n: '02', title: 'Analizamos tu proyecto', text: 'Revisamos la información y definimos el alcance.' },
  { n: '03', title: 'Te enviamos la propuesta', text: 'Recibes la cotización con lo que incluye, el tiempo de entrega y la forma de pago.' },
  { n: '04', title: 'Creamos contigo', text: 'Con el anticipo empezamos. Revisas avances, pides tus ajustes y recibes tu solución.' },
];

/** Preguntas frecuentes (debajo de "Cómo funciona"). */
export const FAQ = [
  {
    q: '¿Cuánto tarda mi proyecto?',
    a: 'Cada servicio indica su tiempo de entrega. Una invitación web suele estar lista en 3 a 5 días hábiles y una página para negocio en 8 a 12. Si tu evento es pronto, cuéntanos la fecha y te decimos si alcanzamos.',
  },
  {
    q: '¿Cómo se paga?',
    a: '50 % de anticipo para empezar y 50 % al entregar. El contenido mensual se paga al inicio de cada mes.',
  },
  {
    q: '¿Cuántos cambios puedo pedir?',
    a: 'Los servicios incluyen 2 rondas de ajustes sobre la propuesta. Si necesitas más, te lo cotizamos antes de hacerlo.',
  },
  {
    q: '¿Quién paga el dominio de mi página?',
    a: 'El dominio (por ejemplo tunegocio.com) se paga aparte, una vez al año, y queda a tu nombre. Te ayudamos a comprarlo y configurarlo.',
  },
  {
    q: '¿Cuánto tiempo queda activa mi invitación?',
    a: 'Hasta un mes después del evento, para que tus invitados vean fotos y detalles. Si la quieres por más tiempo, se puede extender.',
  },
];

/** Ejemplos de la sección especial de eventos (mockups de teléfono). */
export const SHOWCASE = [
  { id: 'wedding', label: 'Matrimonio', features: ['Fecha', 'Cuenta regresiva', 'Ubicación', 'Confirmación'] },
  { id: 'babyshower', label: 'Baby Shower', features: ['Fecha', 'Mapa', 'Confirmación', 'Lista de regalos'], gifts: true },
  { id: 'graduation', label: 'Grado', features: ['Fecha', 'Ceremonia', 'Galería', 'Confirmación'] },
];

/**
 * Portafolio. Solo proyectos reales.
 *  image  captura del proyecto en assets/portfolio/ (vacío = ilustración "próximamente")
 *  frame  'phone' (captura vertical de celular) o 'browser' (captura horizontal de computador)
 *  url    (opcional) enlace al proyecto publicado → muestra "Ver proyecto"
 */
export const PORTFOLIO = [
  { name: 'Baby Shower', category: 'Web · Evento', description: 'Invitación web con lista de regalos en tiempo real: cada invitado aparta su regalo y nadie lo repite. Incluye confirmación de asistencia, mapa y música.', image: 'assets/portfolio/babyshower.jpg', frame: 'phone', url: '', alt: 'Pantalla principal de la invitación web del baby shower', mock: 'babyshower' },
  { name: 'Bethel Hair Style', category: 'Web · App de gestión', description: 'App para barbería: ventas, agenda de citas, clientes e informe mensual, conectada a Google Sheets y Calendar. Se instala en el celular.', image: 'assets/portfolio/bethel.jpg', frame: 'phone', url: '', alt: 'Panel de la app de gestión de Bethel Hair Style', mock: 'dashboard' },
  { name: 'Paletas Lokas Zipa', category: 'Creative · Comercial', description: 'Video comercial y pieza gráfica para una heladería en Zipaquirá.', image: 'assets/portfolio/paletas-lokas-poster.jpg', video: 'assets/portfolio/paletas-lokas.mp4', piece: 'assets/portfolio/paletas-lokas-pieza.jpg', pieceAlt: 'Pieza gráfica de Paletas Lokas Zipa', url: '', alt: 'Video comercial de Paletas Lokas Zipa', mock: 'content' },
];
