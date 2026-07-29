# 🚀 Involution · AI-Powered Automation

Sitio web y plataforma interactiva de **Involution** — Automatización impulsada por agentes autónomos de IA para optimizar procesos empresariales complejos.

---

## 🛠️ Tecnologías y Estructura

- **HTML/CSS/JS estático**: sin build ni dependencias en cliente. El contenido está en el HTML (bueno para SEO y para funcionar sin JS).
- **CSS con tokens de diseño**: `styles.css` con custom properties y clases reutilizables.
- **JS vanilla**: `main.js` para el glow del hero, autoplay de vídeos por visibilidad y tracking de CTAs.
- **Optimización de Assets**: vídeos comprimidos en MP4 e imágenes optimizadas.
- **Despliegue**: **GitHub Pages** mediante GitHub Actions (`.github/workflows/deploy.yml`), sitio estático.

---

## 📂 Estructura del Proyecto

```text
.
├── assets/
│   ├── brand/despliegue/     # Sistema de marca: logos, iconos, favicon, OG, manifest
│   └── *.mp4 / *.jpg         # Vídeos de la landing y sus pósters
├── .github/workflows/
│   └── deploy.yml            # Build y despliegue en GitHub Pages
├── aviso-legal/index.html    # Aviso legal → /aviso-legal/
├── privacidad/index.html     # Política de privacidad → /privacidad/
├── index.html                # Landing page principal (HTML estático)
├── 404.html                  # Página de error de GitHub Pages
├── logo-lab.html             # Laboratorio de marca/logo (sólo local, no se publica)
├── logo-lab.css              # Estilos del laboratorio de logos
├── logo-lab.js               # Lógica del laboratorio de logos
├── styles.css                # Tokens de diseño, tipografía Geist y componentes B2B
├── main.js                   # Interactividad (JS vanilla), autoplay por viewport y tracking
├── robots.txt                # SEO
├── sitemap.xml               # SEO
├── CNAME                     # Dominio propio de GitHub Pages (involution.es)
├── package.json              # Scripts del proyecto y dependencias
└── README.md                 # Documentación del repositorio
```

> Las páginas legales viven en carpetas con `index.html` porque GitHub Pages no
> recorta la extensión `.html` como hacía `cleanUrls` en Vercel. Así `/aviso-legal`
> sigue funcionando: Pages responde con un 301 hacia `/aviso-legal/`.

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

## 🚀 Despliegue en GitHub Pages

Cada push a `main` dispara `.github/workflows/deploy.yml`, que ejecuta `npm run check`,
arma el directorio `_site` con lo que se publica y lo despliega. También se puede lanzar
a mano desde la pestaña **Actions** (`workflow_dispatch`).

El workflow copia **sólo** la landing: `my-video/`, `docs/`, `node_modules/` y los
ficheros `logo-lab.*` se quedan fuera.

### Configuración del repositorio

En **Settings → Pages**, el origen (_Source_) debe ser **GitHub Actions**, no
«Deploy from a branch».

### Dominio propio

El fichero `CNAME` fija `involution.es`. En el DNS del dominio hacen falta los
registros apex de GitHub:

```text
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
AAAA  @    2606:50c0:8000::153
AAAA  @    2606:50c0:8001::153
AAAA  @    2606:50c0:8002::153
AAAA  @    2606:50c0:8003::153
```

Cuando el certificado de Let's Encrypt esté emitido, activa **Enforce HTTPS**.

### Limitaciones respecto a Vercel

- **No hay cabeceras propias.** El `Cache-Control: immutable` que definía
  `vercel.json` para `/assets/*` no tiene equivalente: Pages sirve todo con una
  caché de ~10 minutos.
- **No hay analítica.** Se retiró Vercel Web Analytics y no se sustituyó.

---

## 📄 Licencia

MIT © Involution. Todos los derechos reservados.
