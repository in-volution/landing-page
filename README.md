# 🚀 Involution · AI-Powered Automation

Sitio web y plataforma interactiva de **Involution** — Automatización impulsada por agentes autónomos de IA para optimizar procesos empresariales complejos.

---

## 🛠️ Tecnologías y Estructura

- **HTML/CSS/JS estático**: sin build ni dependencias en cliente. El contenido está en el HTML (bueno para SEO y para funcionar sin JS).
- **CSS con tokens de diseño**: `styles.css` con custom properties y clases reutilizables.
- **JS vanilla**: `main.js` para el glow del hero, autoplay de vídeos por visibilidad y tracking de CTAs.
- **Optimización de Assets**: vídeos comprimidos en MP4 e imágenes optimizadas.
- **Despliegue**: **Vercel** (`vercel.json`), sitio estático.

---

## 📂 Estructura del Proyecto

```text
.
├── assets/                   # Vídeos, logos e imágenes (OG, favicon, apple-touch)
├── docs/
│   └── plan-refactorizacion.md
├── index.html                # Página (HTML estático, contenido incluido)
├── styles.css                # Tokens de diseño + componentes
├── main.js                   # Interactividad (JS vanilla)
├── robots.txt                # SEO
├── sitemap.xml               # SEO
├── vercel.json               # Configuración de despliegue en Vercel
├── package.json              # Scripts del proyecto y dependencias
└── README.md                 # Documentación del repositorio
```

---

## 💻 Desarrollo Local

Para ejecutar el proyecto localmente:

1. **Instalar dependencias**:

   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:

   ```bash
   npm run dev
   ```

3. Abrir en el navegador la URL que indique `serve` (por defecto `http://localhost:3000`).

> Nota: ábrelo siempre con un servidor local, no con `file://`, para que el vídeo con autoplay y las rutas relativas funcionen.

---

## 🚀 Despliegue en Vercel

### Opción 1: Vercel CLI (Línea de comandos)

```bash
npx vercel
```

Para desplegar a producción:

```bash
npx vercel --prod
```

### Opción 2: Integración con GitHub / GitLab / Bitbucket

1. Sube este repositorio a tu plataforma de Git favorita.
2. Ve a [Vercel Dashboard](https://vercel.com/new).
3. Importa el repositorio.
4. Vercel detectará automáticamente la configuración estática (`index.html`).
5. Haz clic en **Deploy**. A partir de ahí, cada push a `main` se despliega solo.

> El despliegue por GitHub Actions se retiró; se usa la integración Git nativa de Vercel.

---

## 📄 Licencia

MIT © Involution. Todos los derechos reservados.
