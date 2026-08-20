# Auditoría técnica SEO — involution.es

**Fecha de comprobación:** 17 de agosto de 2026  
**Alcance:** `https://involution.es/`, variantes HTTP/www, `robots.txt`, `sitemap.xml`, las dos URLs legales, respuesta 404, HTML/CSS/JS y recursos críticos.  
**Puntuación técnica:** **82/100** (buena base técnica, con riesgos importantes en seguridad, arquitectura y LCP móvil).

La versión en producción coincide byte a byte con la copia local para `index.html`, `robots.txt` y `sitemap.xml` (SHA-256 idéntico). No se encontró caché SEO previa reutilizable; la evidencia se recogió de nuevo.

## Resumen por categoría

| Categoría | Estado | Puntuación | Evidencia principal |
|---|---:|---:|---|
| Crawlability | **PASS** | 95 | `robots.txt` 200 y válido; sitemap 200/XML válido; URLs importantes a 1 clic |
| Indexabilidad | **WARN** | 80 | Canonicals y directivas correctos; arquitectura orgánica limitada a 3 URLs y `/index.html` accesible |
| Seguridad | **FAIL** | 55 | HTTPS y certificado correctos, pero faltan HSTS, CSP y demás cabeceras defensivas |
| Estructura de URL/redirecciones | **PASS** | 88 | URLs limpias y variantes consolidadas en un salto; duplicado técnico `/index.html` |
| Móvil | **WARN** | 85 | Viewport y CSS responsive correctos; navegación temática desaparece y hay targets probablemente menores de 48 px |
| Core Web Vitals/rendimiento | **WARN** | 78 | LCP móvil de laboratorio mediano 2,79 s; CLS 0; sin dato de campo de INP |
| Datos estructurados | **PASS** | 90 | JSON-LD parseable: `Organization`, `WebSite` y `FAQPage` con 7 preguntas |
| Renderizado JavaScript | **PASS** | 97 | Contenido, enlaces, canonical, robots y schema presentes en el HTML inicial |
| IndexNow | **WARN** | 20 | No se detectó evidencia de clave, envío o automatización IndexNow |

La puntuación global pondera crawlability e indexabilidad (18% cada una), CWV (15%), seguridad (12%), URL y móvil (10% cada una), JavaScript (8%), datos estructurados (7%) e IndexNow (2%).

## Evidencia técnica

### 1. Crawlability — PASS

- `https://involution.es/robots.txt` responde **200**, `text/plain`, con:

  ```txt
  User-agent: *
  Allow: /

  Sitemap: https://involution.es/sitemap.xml
  ```

- La regla permite Googlebot y también, por herencia del comodín, GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bytespider y CCBot. Es favorable a visibilidad/citación por IA, aunque la empresa debería decidir de forma expresa si también quiere permitir crawlers de entrenamiento.
- `https://involution.es/sitemap.xml` responde **200**, `application/xml`, pasa validación XML y declara 3 URLs. Las 3 responden 200, son indexables y tienen canonical autorreferente:
  - `/`
  - `/aviso-legal/`
  - `/privacidad/`
- No hay bloqueos accidentales `noindex` en esas URLs. La página de error lleva `noindex, follow`, y las rutas inexistentes devuelven un **404 real**, no un soft 404.
- Las dos páginas secundarias están enlazadas desde la home: profundidad de rastreo 1. No se observaron enlaces internos rotos en este conjunto.
- Los `lastmod` del sitemap no parecen estar automatizados: la home declara `2026-07-26`, mientras el documento servido informa `Last-Modified: Wed, 29 Jul 2026`. Google solo aprovecha `lastmod` cuando es fiable.
- `llms.txt` devuelve 404. No es un requisito para Google ni sustituye `robots.txt`; solo sería una mejora experimental de descubrimiento para sistemas de IA.

**Recomendación:** generar el sitemap en cada despliegue a partir de las URLs canónicas y de fechas reales de modificación. Cuando se creen contenidos, dividirlo por tipo solo si el volumen lo justifica y mantener exclusivamente URLs 200, canónicas e indexables.

### 2. Indexabilidad y arquitectura — WARN

- Home: 200, `index, follow`, canonical `https://involution.es/`, un H1, aproximadamente 1.500 palabras en HTML y contenido sustancial.
- Aviso legal y privacidad: 200, `index, follow`, canonical autorreferente y un H1 cada una.
- Las variantes con parámetros, por ejemplo `/?utm_source=test`, conservan el canonical limpio a `/`, lo que ayuda a consolidar señales.
- `https://involution.es/index.html` responde **200** y contiene canonical a `/`. Google puede consolidarlo, pero mantener dos URLs 200 para el mismo documento crea rastreo y señales duplicadas evitables.
- La limitación principal es estructural: el índice solo contiene la home y dos documentos legales. Las secciones comerciales son anclas (`#multiagente`, `#caracteristicas`, `#como`, etc.), no URLs capaces de posicionar de forma independiente. Por tanto, las ideas de AnswerThePublic no tienen todavía destinos indexables específicos ni una arquitectura de hubs y clusters.
- No se necesita `hreflang` mientras todo el sitio tenga un único idioma/mercado (`lang="es"`). Si se publican versiones regionales, deberá implementarse un grafo hreflang recíproco y validarlo aparte.

**Recomendación de arquitectura:** crear hubs indexables como `/agentes-ia/`, `/automatizacion-empresarial/`, `/casos-de-uso/` y `/recursos/`, con landings hijas alineadas con intención y demanda real. Enlazarlas desde navegación, home, breadcrumbs y artículos relacionados; ninguna página prioritaria debería quedar a más de 3 clics. Evitar convertir las 50 sugerencias en páginas finas o casi duplicadas: agrupar preguntas por intención y SERP antes de publicar.

**Recomendación de consolidación:** devolver 301 de `/index.html` a `/` desde la capa edge/CDN. Mantener una sola convención de slash final, ya aplicada en las páginas de directorio.

### 3. HTTPS, certificado y cabeceras — FAIL

**Correcto:** todas las variantes examinadas consolidan en un solo salto, sin cadenas:

| Origen | Resultado |
|---|---|
| `http://involution.es/` | 301 → `https://involution.es/` |
| `http://www.involution.es/` | 301 → `https://involution.es/` |
| `https://www.involution.es/` | 301 → `https://involution.es/` |
| `https://involution.es/` | 200 |

El certificado de Let's Encrypt cubre `involution.es` y `www.involution.es`; en la fecha de auditoría es válido del 29 de julio al 27 de octubre de 2026.

**Problema alto:** la respuesta de la home no incluye ninguna de estas cabeceras:

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `X-Frame-Options` o, preferiblemente, `frame-ancestors` en CSP
- `Permissions-Policy`

El servidor observado es GitHub Pages (`Server: GitHub.com`). GitHub Pages no ofrece control granular de cabeceras por repositorio, por lo que la solución práctica es colocar un CDN/edge configurable delante del dominio o migrar el hosting.

**Implementación recomendada:**

1. Activar primero `Content-Security-Policy-Report-Only` y verificar vídeos, Google Fonts y los tres bloques JSON-LD. Una base orientativa es `default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests`. Los bloques JSON-LD deben probarse con CSP y, si el navegador los bloquea, autorizarse mediante hash; no abrir todo `script-src` con `unsafe-inline` sin necesidad.
2. Añadir `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` y una `Permissions-Policy` mínima.
3. Tras confirmar que todos los subdominios funcionan exclusivamente por HTTPS, activar `Strict-Transport-Security: max-age=31536000; includeSubDomains`. Solicitar `preload` solo después de validar el impacto operativo y cumplir sus requisitos.

### 4. URL y estados — PASS con mejoras

- URLs cortas, legibles, en minúsculas y sin parámetros para el contenido principal.
- Las variantes sin slash de `/aviso-legal` y `/privacidad` hacen un 301 directo a la versión con slash.
- No se detectaron cadenas de dos o más saltos.
- La caché pública es de solo `max-age=600` también para assets versionables. Lighthouse estimó aproximadamente **1.250 KiB** de ahorro potencial en visitas repetidas mediante una vida de caché eficiente.

**Recomendación:** servir CSS, JS, SVG, posters y vídeos con nombres versionados/hash y `Cache-Control: public, max-age=31536000, immutable`; conservar caché corta/revalidación para HTML. Esto requiere una capa de hosting o CDN con control de cabeceras.

### 5. Móvil — WARN

- Viewport correcto: `width=device-width, initial-scale=1`.
- Lighthouse pasa el chequeo de viewport; el CSS usa breakpoints a 1.200, 999, 768 y 720 px, colapsa grids a una columna y evita desbordamiento visual. Las imágenes de marca incluyen dimensiones explícitas, reduciendo riesgo de CLS.
- Por debajo de 1.000 px desaparecen todos los enlaces de navegación (`display:none`) y no existe menú móvil alternativo. El CTA de contacto sigue disponible, pero se pierde descubrimiento de secciones y, sobre todo, de futuras páginas de contenido.
- El botón de contacto de la cabecera tiene un alto calculado cercano a 34–36 px y el logo móvil 40 px; son probablemente inferiores al objetivo recomendado de 48 × 48 px para targets táctiles. Esto es una inferencia de CSS, no una medición de dispositivo real.

**Recomendación:** implementar un menú móvil accesible que conserve enlaces prioritarios, asegurar targets de al menos 48 × 48 px con separación suficiente y probar a 320/360/390/768 px con zoom de texto. No usar `overflow-x:hidden` como única protección: puede ocultar contenido que realmente desborda.

### 6. Core Web Vitals y rendimiento — WARN

Se ejecutó Lighthouse 13.0.1 el 17 de agosto de 2026 con Chrome headless. Hubo tres ejecuciones móviles y una de escritorio:

| Métrica de laboratorio | Móvil (3 ejecuciones) | Escritorio | Referencia CWV |
|---|---:|---:|---:|
| Performance | 88, 88, 89 | 99 | Diagnóstico Lighthouse, no CWV de campo |
| LCP | 2,77–2,84 s; mediana **2,79 s** | 0,78 s | Bueno <2,5 s; necesita mejora 2,5–4 s |
| CLS | **0** en las 3 | 0,002 | Bueno <0,1 |
| Total Blocking Time | 0 ms | 0 ms | Solo diagnóstico de laboratorio; no equivale a INP |
| Speed Index | 4,66–4,90 s | 1,08 s | Diagnóstico de laboratorio |
| Transferencia inicial | 1,55–1,61 MiB | 1,63 MiB | Principalmente vídeo |

**Conclusión CWV:** el LCP móvil de laboratorio cae en “necesita mejora”; CLS muestra riesgo bajo. No se obtuvo percentil 75 de CrUX/PageSpeed ni un valor de campo de **INP**, por lo que no puede afirmarse formalmente que la URL apruebe o suspenda Core Web Vitals. El TBT de 0 ms y solo ~0,5 s de trabajo total de main thread en móvil sugieren bajo riesgo de interactividad, pero no sustituyen INP.

Hallazgos concretos:

- Lighthouse identificó como LCP móvil el logo de la cabecera. En una ejecución, 2,12 s correspondieron a retraso de renderizado del elemento.
- Google Fonts y `styles.css` bloquean el primer render; Lighthouse calculó hasta **1,95 s** de ahorro teórico en móvil al reducir el bloqueo.
- La página inicia con aproximadamente 1,6 MiB transferidos. Los ficheros fuente pesan 306 KiB (`hero-bg.mp4`), 1,04 MiB (`involution-logo-loop.mp4`) y 2,18 MiB (`sistema-multiagente.mp4`); el navegador usa peticiones parciales para el tercer vídeo, pero el coste potencial total de medios supera 3,5 MiB.
- El vídeo del hero usa `preload="auto"`, compite por red desde el inicio y puede perjudicar conexiones móviles. Los vídeos demo usan `preload="metadata"`, pero el de 1,04 MiB llegó a descargarse casi completo durante las ejecuciones.
- HTML/CSS/JS sí se comprimen con gzip. `styles.css` transfiere ~10 KiB; minificarlo solo ahorraría ~3 KiB, por lo que no es la prioridad principal.

**Orden de optimización recomendado:**

1. Servir un bloque pequeño de CSS crítico para nav/hero en el `<head>` y cargar el resto sin bloquear; autohospedar/subconjuntar Geist en WOFF2 para eliminar la dependencia crítica de `fonts.googleapis.com`.
2. Precargar el SVG del logo y añadir `fetchpriority="high"` a su `<img>`, comprobando después el waterfall. Evitar precargar recursos que no sean LCP real.
3. En móvil, mostrar primero `hero-poster.jpg` y cambiar el vídeo de fondo a `preload="metadata"` o `none`; iniciar la descarga/reproducción después del primer render y respetar `prefers-reduced-motion`/`Save-Data`.
4. Para demos fuera del primer viewport, retirar `src` inicialmente y asignarlo con `IntersectionObserver`; exportar MP4 con metadatos al principio (`faststart`) y ofrecer WebM/AV1 cuando la compatibilidad y calidad lo permitan.
5. Repetir PSI/CrUX tras 28 días de tráfico suficiente y monitorizar el percentil 75 de LCP, INP y CLS por origen y por URL.

### 7. Datos estructurados — PASS

- El HTML inicial contiene tres bloques JSON-LD sintácticamente parseables: `Organization`, `WebSite` y `FAQPage`.
- `FAQPage` incluye 7 preguntas y respuestas presentes también como contenido visible.
- No dependen de JavaScript, lo que evita retrasos de procesamiento.
- No se ejecutó Rich Results Test ni una validación externa de elegibilidad; una sintaxis parseable no garantiza un resultado enriquecido.

**Recomendación:** completar `Organization` con teléfono y perfiles oficiales (`sameAs`) cuando existan, manteniendo los datos coherentes con la página. Para las nuevas URLs, usar `BreadcrumbList` y schemas específicos solo cuando describan contenido visible; no replicar el mismo FAQ en masa.

### 8. Renderizado JavaScript — PASS

- Es una web estática/SSR de facto: H1, texto comercial, enlaces, title, description, robots, canonical y JSON-LD aparecen en el HTML recibido sin ejecutar JavaScript.
- `main.js` es vanilla, se carga con `defer` y se limita a animaciones, reproducción de vídeos e interactividad del gráfico. Si falla, el contenido esencial sigue disponible.
- Las rutas inexistentes responden 404 antes de cualquier render; no hay una SPA que devuelva 200 para todo.
- Los elementos con animación de entrada pueden arrancar visualmente con opacidad reducida, pero permanecen en el DOM. Se contempla `prefers-reduced-motion`.

No se necesita prerenderizado adicional. En futuras plantillas, conservar title, canonical, robots, schema, headings y contenido principal en el HTML inicial; no inyectarlos solo con JavaScript.

### 9. IndexNow — WARN

No se halló una clave pública reconocible, endpoint propio ni automatización de envío IndexNow. Dado que Google no usa IndexNow y hoy solo hay tres URLs, su impacto es bajo; ganará valor al publicar con frecuencia.

**Implementación sugerida:** en el workflow de despliegue, publicar la clave en la raíz y enviar por POST solo URLs nuevas, actualizadas o eliminadas a `https://api.indexnow.org/indexnow`, con `host`, `key`, `keyLocation` y `urlList`. Registrar respuestas y no reenviar todo el sitemap en cada build.

## Priorización

### Críticas

No se detectaron bloqueos críticos: HTTPS, robots, status 200, canonicals y HTML indexable funcionan.

### Altas — ejecutar en 1–2 semanas

1. **Añadir una capa edge con cabeceras de seguridad.** Impacto: reduce exposición a downgrade, clickjacking, MIME sniffing e inyecciones. Validar CSP en modo Report-Only antes de exigirla.
2. **Crear una arquitectura de URLs indexables para servicios, casos de uso y contenidos.** Impacto: desbloquea la cobertura de las sugerencias AnswerThePublic; ahora todas compiten por una sola URL comercial.
3. **Llevar LCP móvil por debajo de 2,5 s.** Priorizar CSS/fuentes críticos y la estrategia de carga de vídeo; objetivo operativo recomendado: ≤2,2 s en laboratorio para disponer de margen en campo.

### Medias — ejecutar en 30 días

1. Redirigir `/index.html` a `/` y automatizar `lastmod`/sitemap.
2. Implementar menú móvil y targets táctiles ≥48 px antes de ampliar la arquitectura.
3. Versionar assets y servirlos con caché anual `immutable`.
4. Mejorar `Organization` y añadir breadcrumbs/schema específico a las futuras landings.

### Bajas — backlog

1. Implementar IndexNow cuando exista cadencia de publicación.
2. Definir política expresa para crawlers de IA; mantener `ChatGPT-User` accesible si se busca citación.
3. Evaluar `llms.txt` como capa experimental, sin tratarlo como sustituto de sitemap, robots o enlazado interno.
4. Retirar `meta keywords`: los buscadores principales no lo necesitan y no aporta señales técnicas.

## Limitaciones y nivel de confianza

- **Confianza alta** en status, redirecciones, headers, canonicals, robots, sitemap, HTML inicial, recursos y Lighthouse: se consultó directamente producción y se contrastó con el repositorio.
- Lighthouse es laboratorio y varía según red, CPU y ubicación. Las tres ejecuciones móviles reducen variabilidad, pero no sustituyen datos reales.
- La API pública de PageSpeed respondió **429 `RESOURCE_EXHAUSTED`** y no había credenciales de CrUX/GSC. Por eso no se informa INP de campo, percentil 75, cobertura del índice ni estado real en Google Search Console.
- La auditoría cubrió el conjunto público descubierto (3 URLs indexables) y rutas técnicas; no se usaron logs de servidor ni un crawl histórico.
- No se validaron los datos estructurados en las herramientas externas de Google ni Schema.org, y no se comprobó HSTS preload.
