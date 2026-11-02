# Involution · Consultoría tecnológica y automatización

Web de [Involution](https://involution.es): consultoría tecnológica para empresas. Auditamos procesos y sistemas, y los mejoramos con automatización, integraciones, IA aplicada, datos y desarrollo a medida. Como línea especializada, automatizamos la atención al cliente de las empresas con asistentes de voz con IA para teléfono, web y app, y analizamos los datos de las conversaciones para entender la demanda y mejorar los procesos.

Este repositorio contiene la web pública: la portada de consultoría (servicios, método, ejemplos, proceso, preguntas frecuentes y contacto) y la página de asistentes de voz en `/asistentes-de-voz/`. Los ejemplos y conversaciones mostrados son ilustrativos. El alcance de la oferta está documentado en [PRODUCTO.md](PRODUCTO.md).

## Tecnología

HTML y CSS estáticos, con TypeScript, Three.js y GSAP para el núcleo de partículas 3D y las animaciones. Vite compila la experiencia visual y GitHub Pages aloja la web.

La web no incorpora backend ni un asistente de voz conectado. El contenido permanece accesible sin JavaScript; la visualización 3D se omite cuando WebGL no está disponible o el usuario prefiere reducir el movimiento.

## Desarrollo local

Requiere Node.js **24.8.0 o superior** y npm.

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`. El comando compila la experiencia y sirve los archivos estáticos. Tras modificar TypeScript o CSS en `experience/`, ejecuta `npm run build:experience` y recarga el navegador; el servidor no recompila esos cambios automáticamente.

## Comandos

| Comando                    | Función                                                 |
| -------------------------- | ------------------------------------------------------- |
| `npm run dev`              | Compila la experiencia y arranca el servidor local.     |
| `npm start`                | Ejecuta el mismo flujo que `dev`.                       |
| `npm run build:experience` | Genera el JavaScript y CSS en `assets/experience/`.     |
| `npm run check`            | Comprueba archivos, HTML, tipos, compilación y formato. |
| `npm run format`           | Aplica Prettier al proyecto.                            |

## Estructura

| Ruta                                      | Contenido                                                |
| ----------------------------------------- | -------------------------------------------------------- |
| `index.html`                              | Portada de consultoría, metadatos y datos estructurados. |
| `asistentes-de-voz/index.html`            | Página de asistentes de voz con IA.                      |
| `experience/main.ts`                      | Inicialización de la experiencia visual.                 |
| `experience/core.ts`                      | Núcleo de partículas y renderizado con Three.js.         |
| `experience/interactions.ts`              | Animaciones e interacciones con GSAP.                    |
| `experience/style.css`                    | Estilos de la landing.                                   |
| `experience/vite.config.ts`               | Configuración de compilación.                            |
| `assets/experience/`                      | Archivos generados; no se versionan.                     |
| `assets/brand/despliegue/`                | Identidad visual, logotipos, iconos e imagen social.     |
| `styles.css`                              | Estilos compartidos de las páginas legales y de error.   |
| `aviso-legal/`, `privacidad/`, `404.html` | Páginas complementarias.                                 |
| `robots.txt`, `sitemap.xml`               | Configuración de rastreo y mapa del sitio.               |
| `CNAME`                                   | Dominio personalizado de GitHub Pages.                   |
| `.github/workflows/deploy.yml`            | Validación, compilación y publicación.                   |

## Publicación

Cada push a `main` ejecuta `npm ci` y `npm run check` en GitHub Actions. Si las comprobaciones pasan, el workflow prepara `_site/` con las páginas y recursos públicos y lo despliega en **[involution.es](https://involution.es)** mediante GitHub Pages. También permite ejecución manual desde Actions.

## Edición de contenido

Modifica `index.html` (consultoría) o `asistentes-de-voz/index.html` (voz) para actualizar textos, enlaces y ejemplos. Cada sección indica con `data-core` la posición del núcleo 3D (`hero`, `ambient`, `hidden` o `final`). Mantén el mensaje alineado con `PRODUCTO.md` y revisa los metadatos, datos estructurados y recursos sociales cuando cambie la información del negocio.

Antes de subir cambios, ejecuta `npm run check` y revisa la landing y las páginas complementarias en móvil y escritorio.
