# Plan de refactorización — Landing Involution

## Contexto

`index.html` renderiza una landing de marketing **estática** (contenido fijo, sin datos de usuario, sin backend) pero lo hace a través de un runtime cliente pesado y frágil. El objetivo de este plan es mejorar la **calidad de código, el rendimiento y la mantenibilidad** sin cambiar el diseño ni el contenido visible. No hay tests ni lógica de negocio que preservar: es HTML/CSS con interactividad mínima.

Este documento describe el estado actual, los problemas encontrados (con evidencia) y una refactorización por fases con una arquitectura objetivo recomendada.

---

## Diagnóstico del estado actual

### 🔴 Crítico

1. **La landing estática depende de 3 descargas CDN + transpilación en el navegador.**
   `support.js` (runtime propietario "DC", 1581 líneas, generado y marcado _"do not edit"_) carga en tiempo de ejecución desde unpkg:
   - `react@18.3.1` UMD (`support.js:1492`)
   - `react-dom@18.3.1` UMD (`support.js:1494`)
   - `@babel/standalone@7.26.4` (~3 MB) para **transpilar en el navegador** el `class Component extends DCLogic` del `<script type="text/x-dc">` (`support.js:1005`)

   Consecuencias: todo el contenido dentro de `<x-dc>` está oculto (`hideRawTemplate()`) hasta que React + Babel cargan y arrancan. Si unpkg va lento o cae, **la web no pinta nada** (punto único de fallo). El coste de JS y el LCP son enormes para una página que podría ser HTML puro.

2. **El contenido data-driven no está en el HTML estático.**
   Secciones como nav, capacidades, FAQs, casos y footer se generan en cliente desde arrays JS dentro de `renderVals()`. Un crawler o un usuario sin JS ve marcadores `{{ }}` sin resolver. SEO y resiliencia degradados.

### 🟠 Alto

3. **Estilado 100% inline.** 193 atributos `style="..."` y 14 `style-hover` repartidos por todo el marcado. No hay hoja de estilos ni tokens de diseño: valores mágicos repetidos (`#0a0a0a`, `#16a34a`, `#525252`, `'Geist Mono'`, radios, sombras) decenas de veces. Cambiar un color de marca obliga a editar muchos puntos.

4. **Duplicación.** El SVG de WhatsApp está copiado literalmente 4 veces. Los patrones de tarjeta (capacidades, casos, pasos) repiten estructura y estilos. Los "chips" mono, los badges y los encabezados de sección repiten el mismo bloque.

5. **Contenido mezclado con lógica.** Toda la copy (titulares, descripciones, FAQs) vive dentro de un método `renderVals()` en JS. Editar textos exige tocar código de presentación.

### 🟡 Medio

6. **Código muerto.** Arrays computados en `renderVals()` con **0 referencias** en la plantilla: `core`, `heroTools`, `logos`, `testimonials`, `faqs` (se usa `faqData`, no `faqs`). Además `sectors` se renderiza pero su sección está en `display:none`. Variables de render sin uso (`videoOpacity`, `accentRing`, `heroBadge*`).

7. **Todo en un único archivo de 48 KB.** Estructura, estilos, contenido y comportamiento conviven en `index.html`. Difícil de navegar y revisar.

8. **Accesibilidad y semántica.** "Div soup" con mucho estilo inline; jerarquía de encabezados irregular; estados de foco dependientes de `hover`; algunos elementos decorativos sin `aria-hidden`.

9. **Tooling inexistente.** `npm run check` solo comprueba que existan 3 ficheros. No hay linter, formateador ni validación de HTML. El README dice `localhost:3000` pero `serve` no usa ese puerto por defecto.

---

## Arquitectura objetivo (recomendada)

**Eliminar por completo el runtime DC/React/Babel y servir HTML + CSS estáticos**, generados con un SSG ligero. La interactividad real de la página es mínima y se cubre con ~30 líneas de JS vanilla:

- Acordeón de FAQs → ya usa `<details>/<summary>` nativo, no necesita JS.
- Autoplay de vídeos por visibilidad → `IntersectionObserver` (ya escrito).
- Glow que sigue el ratón en el hero → un listener `mousemove`.

### Opciones de stack

| Opción                                           | Qué implica                                                                    | Recomendación                                                                                                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. Astro**                                     | Componentes `.astro`, tokens en CSS, salida 100% estática, cero JS por defecto | ✅ **Recomendada.** Da componentización (elimina duplicación), separa contenido en frontmatter/colecciones y produce HTML estático óptimo. Encaja con Vercel. |
| **B. HTML + CSS a mano + include ligero (11ty)** | Plantillas Nunjucks/partials, datos en `.json`/`.yaml`                         | Buena si se quiere mínima dependencia de build.                                                                                                               |
| **C. HTML/CSS plano, sin build**                 | Un `index.html` semántico + `styles.css` + `main.js`, contenido inline         | Válido como paso intermedio; pierde la separación contenido/plantilla pero ya elimina el problema crítico.                                                    |

El resto del plan asume **Opción A (Astro)** como destino, con la **Fase 1** diseñada para desbloquear valor aunque se decida quedarse en C.

---

## Plan por fases

### Fase 0 — Seguridad y limpieza previa (rápido)

- Eliminar código muerto de `renderVals()`: `core`, `heroTools`, `logos`, `testimonials`, `faqs` y variables de render sin uso.
- Decidir sobre `sectors`/sección de casos (hoy `display:none`): borrarla o reactivarla. No dejar código oculto indefinidamente.
- Corregir el README (puerto real, quitar referencias a despliegue por GitHub Actions ya eliminado).

### Fase 1 — Quitar la dependencia crítica del runtime cliente (máxima prioridad)

Objetivo: que la página pinte sin descargar React/ReactDOM/Babel de unpkg.

- Sustituir el renderizado DC por HTML estático real. En Astro (Opción A) esto es la migración de plantilla; en Opción C, "aplanar" los `<sc-for>` a HTML resolviendo los arrays una vez.
- Reescribir la interactividad como JS vanilla en un `main.js` propio (glow del hero + `IntersectionObserver` de vídeos ya existen; portarlos tal cual).
- Retirar `support.js` y el `<script type="text/x-dc">`.
- **Resultado:** LCP drásticamente menor, sin SPOF de unpkg, contenido completo en el HTML (SEO/no-JS).

### Fase 2 — Sistema de estilos

- Extraer todo el CSS inline a hoja(s) de estilo.
- Definir **tokens de diseño** con custom properties: colores (`--color-ink:#0a0a0a`, `--color-accent:#16a34a`, `--color-wa:#25D366`, grises…), tipografías, radios, sombras, espaciados, breakpoints.
- Crear clases reutilizables para patrones repetidos: `.section`, `.section-eyebrow` (los `/ TÍTULO` mono), `.card`, `.chip`, `.btn` / `.btn-wa` / `.btn-secondary`.
- Reemplazar los 14 `style-hover` por `:hover` en CSS.

### Fase 3 — Componentización y separación de contenido

- Extraer componentes reutilizables: `Nav`, `Hero`, `SectionHeader`, `Card`, `FaqItem`, `Footer`, `WhatsAppIcon` (elimina las 4 copias del SVG), `WhatsAppButton`, `FloatingWhatsApp`.
- Mover la copy y los datos (navLinks, features, ladder, faqData, footerCols, casos) a ficheros de contenido (frontmatter, colecciones Astro o `.json`), separados de la presentación.
- Centralizar el enlace de WhatsApp y el teléfono en una sola constante de configuración (`site.config`), en vez de repetir `wa.me/34639904072` y `+34639904072`.

### Fase 4 — Calidad, accesibilidad y tooling

- Accesibilidad: revisar jerarquía de encabezados, `aria-hidden` en decorativos, estados `:focus-visible` visibles, contraste, `prefers-reduced-motion` para las animaciones.
- Tooling: Prettier + ESLint (o Biome), `html-validate` o `astro check`, y opcionalmente Lighthouse CI. Sustituir el `check` trivial por validación real.
- Documentar en el README el nuevo flujo de build/preview.

### Fase 5 — SEO técnico

Nota: el mayor factor de SEO del sitio (contenido rastreable + Core Web Vitals) depende de la **Fase 1**. Esta fase añade el SEO técnico _encima_ de una base ya estática.

Estado actual (ya presente): `<html lang="es">`, `meta description`/`keywords`/`robots`, Open Graph (7) + Twitter Card (4) + imagen OG 1200×630, JSON-LD `Organization` + `FAQPage`, y todas las `<img>` con `alt`.

Pendiente:

- `<link rel="canonical">` con el dominio definitivo y `og:locale=es_ES`.
- `robots.txt` + `sitemap.xml` (automáticos si se migra a Astro).
- Jerarquía de encabezados: un único `<h1>` y `<h2>/<h3>` coherentes.
- Ampliar JSON-LD: `WebSite` y `Service`/`Offer` para los casos de uso.
- Unificar dominio en todas las URLs absolutas (OG, canonical, JSON-LD) — hoy conviven `involution.ai` (OG) y `involution.es` (email).
- Medir con Lighthouse SEO + Rich Results Test antes/después.

---

## Ficheros afectados

- **Eliminar:** `support.js`, el bloque `<script type="text/x-dc">` y `<x-dc>` de `index.html`.
- **Reescribir:** `index.html` → plantilla/componentes estáticos.
- **Nuevos:** `src/` (componentes + contenido), `styles/` con tokens, `main.js` (interactividad), config de linters.
- **Conservar:** `assets/`, `vercel.json`, `.vercelignore`.

## Verificación

- Comparar capturas antes/después (desktop 1400px y móvil 390px) para confirmar paridad visual pixel-a-pixel.
- Lighthouse antes/después: esperado gran salto en Performance (fin de React+Babel en cliente) y Best Practices.
- Ver el HTML servido con JS desactivado: todo el contenido debe estar presente.
- Validar HTML y pasar el linter sin errores.
- Probar los CTAs (WhatsApp con mensaje precargado, `tel:+34…`) y el autoplay de vídeos por scroll.

## Orden sugerido de ejecución

Fase 0 → **Fase 1** (desbloquea el 80% del valor, incluido el SEO real) → Fase 2 → Fase 3 → Fase 4 → Fase 5.
Las fases 0 y 1 ya justifican el trabajo por sí solas; 2–4 elevan la mantenibilidad a medio plazo; la 5 remata el SEO técnico sobre la base estática.

---

## Estado de ejecución (24-07-2026)

Stack elegido: **Opción C — HTML/CSS/JS plano, sin build**. Dominio: **involution.es**.

| Fase                        | Estado       | Notas                                                                                                            |
| --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| 0 — Limpieza                | ✅ Hecha     | Código muerto eliminado; casos de uso conservados pero ocultos (decisión de negocio); README corregido.          |
| 1 — Fuera el runtime        | ✅ Hecha     | `support.js` eliminado; sin React/ReactDOM/Babel; `main.js` vanilla; contenido en HTML estático.                 |
| 2 — Sistema de estilos      | ✅ Hecha     | `styles.css` con tokens; inline 193 → 0; `style-hover` → `:hover`; SVG WhatsApp 4 copias → 1 sprite.             |
| 3 — Componentización        | ⚠️ No aplica | Sin build no hay componentes. La reutilización se logró vía clases CSS + sprite SVG. Requeriría migrar a Astro.  |
| 4 — Calidad, a11y y tooling | ✅ Hecha     | Prettier + html-validate + `npm run check`; `:focus-visible`, `prefers-reduced-motion`, `<figure>/<figcaption>`. |
| 5 — SEO técnico             | ✅ Hecha     | canonical, `og:locale`, `robots.txt`, `sitemap.xml`, JSON-LD `WebSite`, dominio unificado, un solo `<h1>`.       |

### Resultados medidos (Chrome DevTools Protocol, escritorio 1400px)

| Métrica                          | Antes  | Después | Cambio             |
| -------------------------------- | ------ | ------- | ------------------ |
| JavaScript descargado            | 103 KB | 2 KB    | **−98%**           |
| Peticiones a CDN externo (unpkg) | 2      | 0       | **SPOF eliminado** |
| Imágenes                         | 522 KB | 107 KB  | **−80%**           |
| Estilos inline en el marcado     | 193    | 0       | **−100%**          |

Extra detectado durante la ejecución: el `poster` del vídeo del hero era un PNG de 432 KB (el recurso
más pesado de la página); sustituido por un JPG de 18 KB generado del primer fotograma del propio vídeo.

### Verificación realizada

- Paridad visual escritorio (1400px) y móvil (390px con emulación real): sin regresiones; `scrollW=390`, 0 desbordes.
- `npm run check` en verde: ficheros + `html-validate` (0 errores) + `prettier --check`.
- Contenido presente en el HTML servido sin ejecutar JS (rastreable por buscadores).
- 3 bloques JSON-LD válidos (`Organization`, `WebSite`, `FAQPage`).

### Pendiente / futuro

- Migrar a Astro si se añaden más páginas (habilitaría la Fase 3 real).
- Comprimir `involution-logo-nav.png` (84 KB) e `involution-icon.png` (49 KB).
- `Service`/`Offer` en JSON-LD cuando se publiquen los casos de uso hoy ocultos.
