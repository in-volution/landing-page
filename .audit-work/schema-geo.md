# Auditoría SEO on-page, Schema, GEO e imágenes — Involution

**URL auditada:** https://involution.es/  
**Fecha de comprobación:** 2026-08-17  
**Alcance:** homepage en producción y copia local; `robots.txt`, `sitemap.xml`, `llms.txt`, páginas legales y recursos multimedia enlazados desde la home. No incluye datos de Search Console ni una prueba de campo de Core Web Vitals.

## Resumen ejecutivo

**Resultado del bloque: 69/100.** La base técnica de la home es sólida: responde `200`, está renderizada en HTML estático, tiene canonical correcta, un solo H1, jerarquía H1→H2→H3 limpia, metadatos sociales completos y tres bloques JSON-LD con sintaxis válida. Los dos `<img>` tienen `alt`, ancho y alto, y usan SVG. Todos los crawlers de IA pueden acceder por la regla global de `robots.txt`.

La limitación principal es editorial y de autoridad. La web solo ofrece tres URLs indexables (home y dos páginas legales), no enlaza ninguna fuente primaria, no muestra autores, equipo, credenciales, clientes o casos verificables y expone marcadores `PENDIENTE` en la identidad legal. Además, unos 411 términos de contenido comercial —incluidos “Qué automatizamos” y cuatro casos de uso— están en el HTML pero ocultos con `display:none`. Para consultas long-tail y respuestas generativas, una única landing sin páginas temáticas ofrece poca superficie de citación.

| Área | Puntuación | Diagnóstico |
|---|---:|---|
| SEO on-page | 66/100 | Buena estructura; title débil, meta larga, contenido clave oculto y arquitectura de una sola página |
| Schema | 76/100 | 3/3 bloques parsean; `FAQPage` no es elegible para rich result comercial y faltan entidades de página/servicio/vídeo |
| GEO / AI-readiness | 61/100 | SSR y crawling correctos; baja citabilidad, autoridad y evidencia; falta `llms.txt` |
| Imágenes y vídeo | 84/100 | Imágenes HTML muy bien resueltas; vídeo sin schema/transcripción y un MP4 de 2,28 MB |

## Evidencia de producción frente a copia local

- La home devolvió `HTTP/2 200`, `content-type: text/html; charset=utf-8`, servida por GitHub Pages/Fastly.
- El HTML de producción (47.807 bytes) y `index.html` local tienen el mismo SHA-256: `47cf4fc103b221f3ee3013ea8604a6548bf70827361719c6810b08bbaa187c66`.
- `robots.txt` y `sitemap.xml` también coinciden byte a byte entre producción y local.
- `https://involution.es/llms.txt` devuelve `404` y sirve la página 404 con `noindex, follow`.
- `npx html-validate index.html` termina sin errores.
- La home contiene el contenido principal en el HTML inicial; `main.js` solo añade animación/interacción. No depende de JavaScript para que buscadores o crawlers de IA lean el texto.

## 1. SEO on-page

### Metadatos e indexabilidad

| Elemento | Estado | Evidencia | Acción |
|---|---|---|---|
| Status/indexación | Pasa | `200`; `meta robots="index, follow"` | Mantener |
| Canonical | Pasa | `https://involution.es/` absoluta y autorreferente | Mantener |
| Idioma | Pasa | `<html lang="es">` | Mantener |
| Title | Mejorable | `Involution \| AI-Powered Automation`, 34 caracteres; corto, en inglés y sin la consulta española principal | Reescribir a 50–60 caracteres |
| Meta description | Mejorable | 165 caracteres; ligeramente por encima del rango orientativo y puede truncarse | Reducir a ~145–155 caracteres |
| Meta keywords | Sin beneficio | Existe `meta name="keywords"`; Google no la utiliza como señal | Retirar opcionalmente para reducir ruido |
| Open Graph | Pasa | `og:type`, URL, locale, site name, title, description e imagen 1200×630 | Mantener; alinear título con el nuevo title |
| Twitter Card | Pasa | `summary_large_image`, title, description e imagen | Mantener; alinear copy |
| Sitemap | Pasa con limitación | 3 URLs: home, aviso legal y privacidad | Ampliar al publicar servicios, casos y recursos |

**Title propuesto (56 caracteres):** `Agentes de IA y Automatización Empresarial | Involution`

**Meta description propuesta (147 caracteres):** `Diseñamos y operamos equipos de agentes autónomos de IA que automatizan procesos empresariales de extremo a extremo, integrados con tus sistemas.`

### Encabezados y contenido

- Hay exactamente **1 H1**, **10 H2** y **20 H3** en el DOM, sin saltos de nivel. Dos H2 y cuatro H3 pertenecen a secciones ocultas.
- H1 actual: `Automatización impulsada por IA para cada decisión` (52 caracteres). Expresa el beneficio, pero “cada decisión” es ambiguo y no nombra explícitamente `automatización empresarial` ni `agentes autónomos`.
- La fuente contiene unas **1.508 palabras**; aproximadamente **411** están dentro de las secciones `#procesos` y `#casos`, ocultas mediante `.is-hidden { display: none; }`. El contenido visible ronda 1.100 palabras.
- La home usa listas, una tabla comparativa, FAQs y una jerarquía clara. Es buena para lectura humana y extracción básica.
- No hay enlaces editoriales a fuentes externas. El único enlace web externo funcional es WhatsApp; no existe una cita que respalde cifras o afirmaciones.
- Los enlaces internos son principalmente fragmentos de la misma URL. Solo se enlazan dos páginas crawlables adicionales: aviso legal y privacidad.

**Recomendación de H1:** `Automatización empresarial con agentes autónomos de IA`.

No conviene mantener contenido pensado para captar intención comercial bajo `display:none`. Si todavía no debe mostrarse, es preferible no basar la estrategia SEO en él; si sí forma parte de la oferta, publicarlo como secciones visibles o como URLs dedicadas:

- `/automatizacion-empresarial/`
- `/agentes-ia/`
- `/automatizacion-finanzas/`
- `/automatizacion-ventas-b2b/`
- `/automatizacion-atencion-cliente/`
- `/casos-de-exito/`

### E-E-A-T y confianza

**Señales presentes:** marca coherente, email y teléfono visibles, HTTPS, páginas de aviso legal y privacidad, descripción clara del servicio y explicaciones de controles humanos/guardarraíles.

**Carencias de alta prioridad:**

- `aviso-legal/` y `privacidad/` publican `PENDIENTE: nombre y apellidos`, `PENDIENTE: NIF` y `PENDIENTE: domicilio`. Es una señal de confianza negativa y un riesgo más amplio que SEO.
- No existe página “Equipo” o “Sobre nosotros”, autor/persona responsable, biografía, credenciales técnicas o enlaces a perfiles profesionales.
- No hay clientes, testimonios, casos reales, metodología verificable ni fechas de publicación/actualización.
- Varias cifras fuertes carecen de fuente o metodología visible: `10 veces menos`, `−74%`, `~180K €`, `>8x`, `+140%`, `−82% DSO`, `−68% coste`, `x5 capacidad`. Aunque los casos están ocultos, los crawlers los reciben. Deben atribuirse, marcarse inequívocamente como simulación o sustituirse por resultados documentados.
- La afirmación del gráfico sí indica que son “cifras ilustrativas” y expone supuestos; es un buen patrón que debería aplicarse al resto.

## 2. Detección y validación de Schema.org

### Detección

- **JSON-LD:** 3 bloques (`Organization`, `WebSite`, `FAQPage`).
- **Microdata:** no detectada.
- **RDFa:** no detectada. Los atributos `property` encontrados pertenecen a Open Graph, no a RDFa.
- No se detecta ningún tipo deprecado como `HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary` o `LearningVideo`.

### Validación por bloque

| Bloque | Sintaxis | Checklist Schema.org | Elegibilidad Google | Hallazgos |
|---|---|---|---|---|
| `Organization` | Pasa | `@context` HTTPS, tipo válido, nombre/URL, logo y email válidos; URLs absolutas; sin placeholders | Compatible con datos de organización | Faltan `@id`, `contactPoint`, teléfono y `sameAs` verificables; no declarar dirección hasta completar la identidad real |
| `WebSite` | Pasa | Contexto, tipo, nombre y URL correctos | Compatible con señal de nombre del sitio | Añadir `@id`, `publisher`, `inLanguage` y `alternateName` solo si la marca usa uno realmente |
| `FAQPage` | Pasa | Las 7 preguntas tienen `Question.name` y `Answer.text`; texto visible coincide sustancialmente | **No elegible para FAQ rich result** por ser una web comercial | Prioridad informativa, no crítica. Se puede conservar para semántica/GEO, sin prometer beneficio de rich result |

Los tres JSON se parsearon correctamente con `JSON::PP`. No se ejecutó una inspección manual dentro de Search Console; antes de desplegar cambios, comprobar también con [Rich Results Test](https://search.google.com/test/rich-results) y [Schema.org Validator](https://validator.schema.org/).

### Oportunidades de schema

1. Consolidar `Organization`, `WebSite`, `WebPage` y `Service` en un `@graph` conectado por IDs estables.
2. Mantener `FAQPage` como bloque separado solo si se prioriza descubrimiento semántico/IA; no presentarlo como táctica de rich results de Google.
3. Añadir `VideoObject` a las dos demos informativas cuando existan `uploadDate` real, thumbnail, nombre, descripción y, preferiblemente, transcripción. No inventar la fecha. El vídeo decorativo de fondo no necesita schema.
4. No añadir `Review`/`AggregateRating` sin reseñas reales publicadas y verificables.
5. No añadir `Person` hasta publicar una persona real con perfil/credenciales visibles.

### JSON-LD recomendado

Este bloque puede sustituir los bloques actuales `Organization` y `WebSite`. Todos los valores proceden de contenido público existente y no incluye placeholders. El `FAQPage` actual puede permanecer separado.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://involution.es/#organization",
      "name": "Involution",
      "url": "https://involution.es/",
      "description": "Involution crea equipos de agentes autónomos de IA que asumen la carga operativa de las empresas.",
      "email": "hola@involution.es",
      "telephone": "+34639904072",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://involution.es/#logo",
        "url": "https://involution.es/assets/brand/despliegue/png/involution-logo-horizontal-color.png",
        "contentUrl": "https://involution.es/assets/brand/despliegue/png/involution-logo-horizontal-color.png",
        "width": 920,
        "height": 256,
        "caption": "Involution"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+34639904072",
        "email": "hola@involution.es",
        "availableLanguage": "es",
        "areaServed": "ES"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://involution.es/#website",
      "url": "https://involution.es/",
      "name": "Involution",
      "inLanguage": "es",
      "publisher": {
        "@id": "https://involution.es/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://involution.es/#webpage",
      "url": "https://involution.es/",
      "name": "Automatización empresarial con agentes autónomos de IA",
      "description": "Involution diseña y opera equipos de agentes autónomos de IA integrados con los sistemas de cada empresa.",
      "inLanguage": "es",
      "isPartOf": {
        "@id": "https://involution.es/#website"
      },
      "about": {
        "@id": "https://involution.es/#service"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://involution.es/assets/brand/despliegue/png/involution-og-image.png",
        "width": 1200,
        "height": 630
      }
    },
    {
      "@type": "Service",
      "@id": "https://involution.es/#service",
      "name": "Automatización empresarial con agentes autónomos de IA",
      "serviceType": "Diseño, despliegue, integración y operación de sistemas multiagente",
      "url": "https://involution.es/",
      "description": "Equipos de agentes autónomos de IA que operan procesos empresariales de extremo a extremo e integran ERP, CRM, bases de datos y otras herramientas.",
      "provider": {
        "@id": "https://involution.es/#organization"
      },
      "areaServed": {
        "@type": "Country",
        "name": "España"
      },
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": "Empresas"
      }
    }
  ]
}
</script>
```

## 3. GEO / preparación para buscadores con IA

### Puntuación GEO: 61/100

| Criterio | Puntos | Evidencia |
|---|---:|---|
| Citabilidad | 9/25 | El párrafo más largo tiene ~32 palabras; no hay bloques autocontenidos de 134–167 palabras, fuentes, autor ni datos originales demostrados |
| Lectura estructural | 18/20 | H1→H2→H3 limpia, FAQ, lista, tabla y párrafos cortos; resta por secciones clave ocultas |
| Multimodal | 13/15 | 3 vídeos, gráfico SVG, tabla y pies descriptivos; faltan transcripciones y `VideoObject` |
| Autoridad/marca | 5/20 | Contacto y páginas legales existen, pero contienen placeholders y no hay equipo, credenciales, fuentes, perfiles ni casos verificables |
| Accesibilidad técnica | 16/20 | HTML estático y robots abierto; faltan `llms.txt`, política explícita por crawler y licencia RSL |

### Acceso de crawlers IA

`robots.txt` contiene:

```txt
User-agent: *
Allow: /
```

Por tanto, a fecha de la auditoría están **permitidos** por herencia: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, CCBot, anthropic-ai, Bytespider y cohere-ai. Esto favorece descubrimiento, pero también permite crawlers de entrenamiento. Si la política de Involution distingue búsqueda de entrenamiento, debe expresarlo explícitamente tras una decisión legal/comercial; no bloquear GPTBot/OAI-SearchBot/ChatGPT-User/ClaudeBot/PerplexityBot si el objetivo es visibilidad en respuestas con IA.

No se detectó RSL 1.0 ni otra declaración legible por máquina sobre licencia para IA.

### `llms.txt`

Estado: **ausente (`404`)**. Plantilla inicial lista para publicar:

```txt
# Involution
> Involution diseña, despliega e integra equipos de agentes autónomos de inteligencia artificial para operar procesos empresariales de extremo a extremo.

## Servicios y metodología
- [Inicio](https://involution.es/): Propuesta de valor, capacidades, seguridad, preguntas frecuentes y contacto.
- [Red multiagente](https://involution.es/#multiagente): Cómo se coordinan agentes especializados para resolver procesos completos.
- [Cómo trabajamos](https://involution.es/#como): Auditoría, despliegue, integración y operación continua.
- [Capacidades](https://involution.es/#caracteristicas): Integraciones, razonamiento agéntico, multimodalidad, guardarraíles y trazabilidad.
- [Cómo empezar](https://involution.es/#empezar): Diagnóstico, blueprint, piloto y escalado operativo.

## Confianza y contacto
- [Aviso legal](https://involution.es/aviso-legal/): Identidad y condiciones de uso.
- [Política de privacidad](https://involution.es/privacidad/): Tratamiento de datos y derechos.
- Contacto: hola@involution.es | +34 639 90 40 72
```

La plantilla mejora orientación, pero no sustituye páginas sustantivas. Debe actualizarse con URLs individuales al publicar servicios, casos, equipo y recursos.

### Citabilidad y reescritura

No existe un pasaje óptimo autocontenido: los párrafos informativos tienen 7–32 palabras y dependen del contexto visual. Tampoco hay un bloque inicial que defina con precisión “qué es Involution”, para quién trabaja, qué integra, qué controla y qué resultado entrega.

Añadir bajo el H1 un bloque de 120–160 palabras con esta estructura:

1. Definición directa: “Involution es…”
2. Audiencia: tipo de empresa/proceso.
3. Qué hace el sistema: detectar, decidir, actuar, registrar y escalar.
4. Integraciones y controles: ERP/CRM/BD, permisos, guardarraíles, humano en el circuito.
5. Evidencia: tiempo de despliegue o resultado, con metodología/caso enlazado.

Convertir H2 genéricos en preguntas cuando respondan a intención real, por ejemplo: `¿Qué procesos puede automatizar un equipo de agentes de IA?`, `¿Cómo se integra Involution con un ERP o CRM?` y `¿Cómo se controla el riesgo de un agente autónomo?`. El formato pregunta-respuesta es útil aunque no se añada nuevo `FAQPage` para Google.

### Lectura por plataforma

| Plataforma | Preparación estimada | Motivo principal |
|---|---:|---|
| Google AI Overviews | 60/100 | Buen HTML/estructura; falta posicionamiento orgánico sobre páginas temáticas, evidencia y fuentes |
| ChatGPT Search | 59/100 | Crawlers permitidos y entidades básicas; baja presencia de autoridad, `sameAs`, equipo y menciones verificables |
| Perplexity | 54/100 | Página legible pero sin fuentes citables, investigación original ni validación externa/comunitaria |
| Bing Copilot | 58/100 | HTML indexable; no se detectan páginas temáticas, autoridad ni una estrategia visible de IndexNow/Bing |

Estas cifras son una evaluación heurística de preparación, no mediciones de menciones reales en cada plataforma.

## 4. Imágenes y vídeo

### Resumen

| Métrica | Resultado |
|---|---:|
| `<img>` en homepage | 2 |
| Sin `alt` | 0 |
| Sin `width`/`height` | 0 |
| Formato raster obsoleto en `<img>` | 0 (ambos logos son SVG) |
| Vídeos | 3 |
| Vídeos sin poster | 1 (`sistema-multiagente.mp4`) |
| Vídeos sin schema/transcripción | 3 |

### Hallazgos

- Los logos de navegación y footer usan SVG, `alt="Involution"`, `width="460"` y `height="128"`. No necesitan `srcset` porque son vectoriales.
- El logo del footer está bajo el pliegue y no lleva `loading="lazy"` ni `decoding="async"`, pero el SVG pesa ~2,8 KB: mejora válida, impacto mínimo.
- `hero-poster.jpg`: 1280×720, 18.150 bytes. Correcto para fondo; el vídeo está posicionado absolutamente dentro de un contenedor estable, por lo que el riesgo CLS es bajo.
- `involution-logo-loop-poster.jpg`: 1920×1080, 33.320 bytes. Buena compresión.
- `involution-og-image.png`: 1200×630, 100.012 bytes. Dimensiones sociales correctas y tamaño razonable; PNG ofrece compatibilidad amplia para previews.
- `hero-bg.mp4`: 1600×900, 313.592 bytes, H.264, 7,04 s. Se carga con `preload="auto"`; razonable por tamaño, pero validar LCP en datos reales.
- `involution-logo-loop.mp4`: 1920×1080, 1.094.162 bytes, H.264/AAC, 10,05 s, con poster y `preload="metadata"`.
- `sistema-multiagente.mp4`: 1920×1080, **2.284.344 bytes**, H.264/AAC, 26,58 s, `preload="metadata"`, pero sin poster. Es el recurso con mayor oportunidad de ahorro.
- Los dos vídeos demo se reproducen solo al entrar en viewport mediante `IntersectionObserver`, una decisión positiva para transferencia y CPU.
- GitHub Pages/Fastly entrega todos los medios con `cache-control: max-age=600`; existe edge cache, pero 10 minutos es un TTL corto para assets versionados o inmutables.
- La demo multiagente tiene figcaption y la animación de marca tiene figcaption visualmente oculto. No hay transcripciones completas ni alternativa textual equivalente a toda la secuencia.

### Optimización priorizada de medios

1. Comprimir `sistema-multiagente.mp4` y ofrecer WebM/VP9 o AV1 como fuente alternativa; objetivo práctico ≤1–1,5 MB sin pérdida visible. Mantener H.264 como fallback.
2. Añadir poster al vídeo multiagente con tamaño visual correcto y descripción útil.
3. Publicar una transcripción breve o explicación paso a paso para cada demo informativa; después añadir `VideoObject` con fecha real.
4. Versionar nombres de assets (`archivo.<hash>.mp4`) y elevar TTL a largo plazo si la plataforma de hosting lo permite.
5. Añadir `loading="lazy" decoding="async"` al logo de footer solo como microoptimización.

## Prioridades de implementación

| Prioridad | Cambio | Impacto esperado |
|---|---|---|
| P0 | Sustituir todos los `PENDIENTE` de aviso legal/privacidad por identidad real validada | Confianza, E-E-A-T y reducción de riesgo legal |
| P1 | Reescribir title, meta description y H1 en español con `agentes de IA` + `automatización empresarial` | Relevancia y CTR para consultas objetivo |
| P1 | Hacer visibles “Qué automatizamos” y casos de uso, o publicarlos como páginas dedicadas | Más contenido elegible y superficie long-tail |
| P1 | Publicar equipo/autor, credenciales, metodología, casos reales, fechas y fuentes primarias | Autoridad y citabilidad en SEO/GEO |
| P1 | Crear páginas por servicio/caso y enlazado interno descriptivo | Arquitectura temática e indexación más allá de la home |
| P1 | Publicar `llms.txt` y decidir política explícita para crawlers de búsqueda vs. entrenamiento | Descubrimiento y control de acceso IA |
| P2 | Consolidar el `@graph` Organization/WebSite/WebPage/Service | Entidades más coherentes para buscadores |
| P2 | Añadir transcript, poster, compresión y `VideoObject` válido a demos | SEO de vídeo, accesibilidad y rendimiento |
| P2 | Respaldar o reformular todas las cifras comerciales fuertes | Evitar claims débiles; mejorar E-E-A-T |
| P3 | Lazy/async para el logo del footer y TTL largo para assets versionados | Mejora menor de transferencia/caché |

## Conclusión

Involution no necesita reconstruir su base SEO: el HTML estático, la indexabilidad, los metadatos sociales, la jerarquía de headings y la implementación JSON-LD existente parten de un nivel competente. El siguiente salto exige pasar de una landing elegante a una entidad demostrable: identidad legal completa, personas y credenciales, páginas temáticas visibles, casos verificables, fuentes y pasajes autocontenidos. Schema y `llms.txt` deben reforzar esa evidencia, no sustituirla.
