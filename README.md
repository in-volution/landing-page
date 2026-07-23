# 🚀 Involut · Fuerza Laboral Agéntica

Sitio web y plataforma interactiva de **Involut** — Automatización impulsada por agentes autónomos de IA para optimizar procesos empresariales complejos.

---

## 🛠️ Tecnologías y Estructura

- **HTML5 & CSS3**: Estilo responsivo con animaciones avanzadas (blur, glassmorphism, micro-interacciones).
- **Runtime personalizado**: `support.js` para renderizado dinámico de componentes y estado en cliente.
- **Optimización de Assets**: Videos comprimidos en MP4 e imagenciería optimizada.
- **Despliegue**: Configurado para **Vercel** (`vercel.json`).

---

## 📂 Estructura del Proyecto

```text
.
├── assets/
│   ├── hero-bg.mp4           # Video de fondo del hero
│   ├── involut-logo-color.png # Logotipo principal a color
│   └── involut-logo-white.png # Logotipo variante blanco
├── index.html                # Plantilla HTML principal con runtime de Involut
├── support.js                # Runtime JS cliente
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

3. Abrir en el navegador: `http://localhost:3000`

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
5. Haz clic en **Deploy**.

---

## 📄 Licencia

MIT © Involut. Todos los derechos reservados.
