# HOPE · Sitio web comercial

**Dale forma a lo que imaginas.** Landing de una sola página con catálogo de servicios, ejemplos web, portafolio, formulario de cotización con envío real por correo y WhatsApp en todo el sitio.

Hecho en **HTML + CSS + JavaScript modular** (sin compilación): se publica tal cual y es fácil de mantener.

---

## Estructura

```
index.html               Estructura y SEO (title, description, Open Graph, H1/H2/H3)
css/
  tokens.css             Paleta, tipografías, espacios (identidad HOPE)
  base.css               Estilos base y animación de aparición
  components.css         Botones, navbar, formulario, modal, WhatsApp flotante
  sections.css           Hero, servicios, mockups, pasos, portafolio, cotizar, footer
js/
  config.js              ⚙️ WhatsApp, Instagram, correo y proveedor del formulario
  data/services.js       📦 Catálogo de servicios y opciones del formulario
  data/content.js        Líneas (Creative/Web/Data), pasos, ejemplos y portafolio
  components/            Logo, tarjetas, mockups de teléfono
  lib/quote-form.js      Validación y envío del formulario
  main.js                Arranque
api/
  cotizacion.js          Función serverless (Vercel) → envía el correo con Resend
  _quote.js              Validación, anti-spam y plantilla del correo
assets/brand/            Logo vectorizado (negro, blanco, magenta), ícono, favicon, imagen OG
server.mjs               Servidor local para probar todo (incluido el formulario)
.env.example             Variables de entorno necesarias
```

## Cambios rápidos

| Quiero…                         | Archivo |
|---------------------------------|---------|
| Cambiar número o mensaje de WhatsApp | `js/config.js` → `WHATSAPP_NUMBER`, `WHATSAPP_DEFAULT_MESSAGE` |
| Mostrar Instagram / correo en el footer | `js/config.js` → `INSTAGRAM_URL`, `CONTACT_EMAIL` (vacío = no se muestra) |
| Agregar o editar un servicio, precio o mensaje de WhatsApp por servicio | `js/data/services.js` |
| Poner la imagen real de un proyecto del portafolio | Guarda la imagen en `assets/portfolio/` y escribe la ruta en `image` dentro de `js/data/content.js` |

## Probar en local

```bash
npm run dev        # http://localhost:5173
```

Sin `RESEND_API_KEY` el formulario funciona en **modo prueba**: no envía nada y muestra en la terminal el correo que llegaría.

## Publicar (recomendado: Vercel, gratis)

1. Sube esta carpeta a un repositorio de GitHub (el `.env` está ignorado).
2. En [vercel.com](https://vercel.com) → *Add New Project* → importa el repositorio (sin configuración de build).
3. En *Settings → Environment Variables* crea:
   - `RESEND_API_KEY` — tu clave de [resend.com](https://resend.com/api-keys)
   - `QUOTE_TO_EMAIL` — el correo de HOPE que recibe las solicitudes
   - `QUOTE_FROM_EMAIL` — remitente verificado, ej. `HOPE Web <cotizaciones@tudominio.com>`
     (mientras verificas un dominio en Resend puedes usar `HOPE Web <onboarding@resend.dev>`, que solo entrega al correo de tu cuenta Resend)
   - opcional `ALLOWED_ORIGINS` — tu dominio, ej. `https://hope.com.co`
4. *Redeploy*. Envía una solicitud de prueba desde la web.

El correo llega con el asunto **"Nueva solicitud de cotización — HOPE"** y muestra nombre, correo, WhatsApp, servicio, negocio/evento, fecha, presupuesto, preferencia de contacto y descripción, con botones para responder por WhatsApp o correo.

### Alternativa: GitHub Pages (100% estático)

GitHub Pages no ejecuta funciones de servidor. En ese caso:

1. Crea una cuenta en [web3forms.com](https://web3forms.com) con el correo de HOPE y copia tu *access key* (es pública por diseño: solo envía al correo que registraste).
2. En `js/config.js`: `FORM_PROVIDER: 'web3forms'` y `WEB3FORMS_ACCESS_KEY: 'tu-access-key'`.

## Seguridad

- Ninguna clave privada está en el frontend: Resend se usa solo desde `api/` con variables de entorno.
- Validación en el navegador **y** en el servidor, campo trampa anti-spam y límite de envíos por IP.
- Todo el texto del usuario se escapa antes de ponerlo en el correo.

## Después de publicar

- Reemplaza en `index.html` las rutas de `og:image` por la URL completa de tu dominio (ej. `https://tudominio.com/assets/brand/og-image.png`) para que la vista previa al compartir funcione en WhatsApp y redes.
- Cuando tengas imágenes reales, actualiza el portafolio en `js/data/content.js`.

---
Desarrollado por Hope · Julieth Rivera
