# Involution · Asistentes de voz con IA

Landing estática de Involution. Presenta asistentes de voz para web, app o teléfono. La página usa la dirección visual del frontend de `Involution_web-main`: núcleo de partículas 3D, tarjetas, diagrama animado y ejemplos de conversación. Los ejemplos son ilustrativos; la web no inicia conversaciones con un agente ni reserva reuniones.

## Estructura

- `index.html`: contenido de la landing y metadatos SEO.
- `experience/`: frontend visual en TypeScript, Three.js y GSAP. Vite lo compila a `assets/experience/`.
- `styles.css`: estilos de las páginas legales y de error existentes.
- `assets/brand/despliegue/`: logotipos, iconos y Open Graph de Involution.
- `aviso-legal/`, `privacidad/`, `404.html`: páginas estáticas complementarias.
- `.github/workflows/deploy.yml`: validación y despliegue en GitHub Pages.

Los CTA abren WhatsApp; el footer incluye correo y teléfono. No hay backend, llamadas a `/live`, acceso al micrófono ni claves en el navegador.

## Desarrollo local

```bash
npm ci
npm run dev
```

`npm run dev` compila la experiencia visual y sirve la web en `http://localhost:3000`. Para validar los archivos, HTML, TypeScript, build y formato:

```bash
npm run check
```

El sitio sigue siendo legible sin JavaScript. Si WebGL no está disponible o el usuario prefiere menos movimiento, el contenido permanece visible y la visualización 3D se omite.

## Publicación

Cada push a `main` ejecuta el workflow de GitHub Pages. Este genera los archivos de `assets/experience/`, prepara `_site` y publica únicamente la landing y sus páginas complementarias. `CNAME` mantiene el dominio `involution.es`.
