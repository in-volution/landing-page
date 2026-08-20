# Auditoría SEO de Involution y cruce con AnswerThePublic

**Web:** [https://involution.es/](https://involution.es/)  
**Fecha:** 17 de agosto de 2026  
**Mercado analizado:** España, B2B, pymes y empresas con procesos operativos  
**Fuente de ideas:** [export de AnswerThePublic](/Users/migueltolino/.codex/attachments/d5271617-cf0c-4297-beea-0cb6a7a03386/pasted-text.txt)

## 1. Resumen ejecutivo

### Resultado

**SEO Health Score: 72/100 — base competente, visibilidad orgánica inmadura.**

No hay un bloqueo crítico de rastreo: HTTPS, redirects, `robots.txt`, sitemap, canonicals, status HTTP y HTML inicial funcionan. El freno principal no es técnico, sino estructural: la web tiene una sola URL comercial capaz de captar demanda y dos páginas legales. Las consultas informativas, comparativas, transaccionales y por caso de uso compiten por la home o no tienen un destino indexable.

| Área                              | Peso | Nota | Lectura                                                                               |
| --------------------------------- | ---: | ---: | ------------------------------------------------------------------------------------- |
| SEO técnico                       |  22% |   82 | Base rastreable y estable; mejorar LCP móvil, caché y arquitectura                    |
| Calidad de contenido              |  23% |   61 | Copy comercial sólido; faltan autoridad, fuentes y profundidad por intención          |
| SEO on-page                       |  20% |   66 | Estructura correcta; title en inglés, contenido importante oculto y una sola URL      |
| Schema                            |  10% |   76 | Tres JSON-LD válidos; entidad incompleta y FAQ sin beneficio de rich result comercial |
| Rendimiento                       |  10% |   88 | Muy bueno en escritorio; LCP móvil necesita mejora                                    |
| Preparación para búsquedas con IA |  10% |   61 | HTML legible y FAQ útil; baja citabilidad y evidencia                                 |
| Imágenes y vídeo                  |   5% |   84 | Logos bien implementados; vídeos sin transcripción/schema y uno pesado                |

La puntuación mide salud y preparación, no posiciones. Lighthouse obtuvo 100 en su checklist SEO, pero ese test no evalúa autoridad, demanda, calidad editorial, intención, indexación real ni arquitectura de contenidos.

### Las cinco conclusiones más importantes

1. **Solo hay tres URLs en el sitemap y dos son legales.** La home concentra toda la oferta, los casos, la metodología y las FAQs.
2. **El export no expone 50 ideas utilizables.** Contiene 42 filas de consultas/temas y 41 consultas únicas; `transformación digital pymes` está duplicada. El volumen está bloqueado y no debe inventarse.
3. **Cobertura semántica no equivale a cobertura SEO.** De las 41 consultas únicas, la home responde directamente a 16, parcialmente a 18 y no responde a 7; aun las respuestas directas carecen de URL y formato específicos.
4. **La confianza es el mayor riesgo.** Aviso legal y privacidad muestran campos `PENDIENTE`; no hay equipo, autores, credenciales, clientes o casos verificables. Los KPIs fuertes son proyecciones/estimaciones, no resultados documentados.
5. **La oportunidad es clara.** Los cuatro casos ya descritos —finanzas, pedidos, leads y soporte— pueden convertirse rápidamente en landings comerciales, acompañadas por páginas de precio/ROI, pymes y comparación RPA.

### No se detectaron bloqueos críticos de indexabilidad

- Home, aviso legal y privacidad: HTTP 200, `index, follow` y canonical autorreferente.
- `robots.txt`: 200 y permite crawling.
- Sitemap: 200, XML válido y tres URLs válidas.
- HTTP y `www`: redirigen en un salto a `https://involution.es/`.
- Las rutas inexistentes devuelven 404 real y la plantilla lleva `noindex, follow`.
- Title, contenido, canonical y JSON-LD están presentes en el HTML inicial; JavaScript no es necesario para descubrirlos.

La consulta externa `site:involution.es` y las búsquedas exactas de marca no devolvieron la web en el buscador consultado durante la auditoría. Esto es una señal de visibilidad débil, **no una prueba concluyente de desindexación en Google**. Debe verificarse con Search Console y URL Inspection.

## 2. Alcance y metodología

Se comprobó la versión pública y la copia local. El HTML de producción coincide byte a byte con `index.html`. Se revisaron:

- Home, variantes HTTP/HTTPS y `www`, legales, 404, `robots.txt`, sitemap y `llms.txt`.
- Metadatos, headings, enlaces, indexabilidad, canonicals y contenido renderizado.
- JSON-LD, E-E-A-T, preparación GEO/IA, imágenes y vídeo.
- Cuatro ejecuciones Lighthouse adicionales: tres móviles y una de escritorio.
- Export completo de AnswerThePublic, eliminando texto de interfaz y duplicados.
- Muestra SERP actual para intención RPA, precio, conciliación y procesos de pymes.

Limitaciones: no hubo acceso a Google Search Console, GA4, CRM, backlinks, CrUX de campo ni volúmenes de AnswerThePublic. PageSpeed no devolvió datos CrUX por limitación de cuota. Las prioridades deben recalibrarse cuando existan impresiones, clics, conversiones y dificultad real.

## 3. AnswerThePublic: qué contiene realmente el archivo

| Dato                                              |                          Resultado |
| ------------------------------------------------- | ---------------------------------: |
| Título promocional del export                     |                   50 Content Ideas |
| Filas de consulta/tema visibles y utilizables     |                                 42 |
| Consultas únicas                                  |                                 41 |
| Duplicados                                        | 1 (`transformación digital pymes`) |
| Keywords secundarias con etiqueta Alto/Medio/Bajo |                                 30 |
| Cabeceras de tema sin etiqueta propia             |                                 10 |
| Ideas iniciales destacadas                        |                                  2 |
| Volumen de búsqueda visible                       |                       0; bloqueado |

`Alto`, `Medio` y `Bajo` describen la señal de **Oportunidad** de AnswerThePublic, no volumen ni dificultad. `Nicho` aparece como etiqueta, pero no reemplaza la clasificación real de intención: informacional, comparativa, comercial, transaccional o navegacional.

## 4. Cruce exhaustivo: las 41 consultas únicas

**Cobertura:** Directa = la home ofrece una respuesta sustancial; Parcial = menciona el concepto, pero no resuelve todo el modificador o formato; Nula = no hay respuesta significativa. La cobertura se refiere al contenido, no a capacidad demostrada de posicionamiento.

### A. Diagnóstico y transformación de pymes

| Consulta/idea                                                          | ATP   | Cobertura | Destino recomendado                                   | Prioridad |
| ---------------------------------------------------------------------- | ----- | --------- | ----------------------------------------------------- | --------: |
| qué procesos de una pyme en España tienen más margen de automatización | Medio | Parcial   | `/procesos-automatizables-pyme/` — guía + diagnóstico |        P1 |
| transformación digital pymes                                           | Medio | Nula      | `/automatizacion-ia-pymes/` — hub                     |        P1 |
| Implementar IA en pyme española                                        | Tema  | Nula      | `/automatizacion-ia-pymes/`                           |        P1 |
| IA para pymes España                                                   | Medio | Nula      | `/automatizacion-ia-pymes/`                           |        P1 |
| primeros pasos automatización IA empresa                               | Medio | Directa   | `/automatizacion-ia-pymes/#primeros-pasos`            |        P1 |

### B. Google Cloud e infraestructura

| Consulta/idea                                | ATP   | Cobertura | Destino recomendado                                     | Prioridad |
| -------------------------------------------- | ----- | --------- | ------------------------------------------------------- | --------: |
| Google Cloud para automatización empresarial | Tema  | Parcial   | `/automatizacion-google-cloud/` — servicio técnico      |        P2 |
| despliegue agentes IA nube                   | Alto  | Parcial   | `/automatizacion-google-cloud/#despliegue`              |        P2 |
| google cloud IA empresas                     | Medio | Parcial   | `/automatizacion-google-cloud/`                         |        P2 |
| GCP automatización procesos                  | Bajo  | Parcial   | `/automatizacion-google-cloud/#integraciones-seguridad` |        P2 |

### C. Atención al cliente

| Consulta/idea                   | ATP   | Cobertura | Destino recomendado                                   | Prioridad |
| ------------------------------- | ----- | --------- | ----------------------------------------------------- | --------: |
| Atención al cliente con IA 24/7 | Tema  | Directa   | `/automatizacion-atencion-cliente/` — servicio        |        P1 |
| automatizar soporte clientes    | Medio | Directa   | `/automatizacion-atencion-cliente/`                   |        P1 |
| chatbot IA atención cliente     | Bajo  | Parcial   | `/automatizacion-atencion-cliente/#chatbot-vs-agente` |        P1 |
| IA servicio al cliente España   | Bajo  | Parcial   | `/automatizacion-atencion-cliente/#espana`            |        P2 |

### D. Agentes de IA frente a RPA

| Consulta/idea                          | ATP   | Cobertura | Destino recomendado                              | Prioridad |
| -------------------------------------- | ----- | --------- | ------------------------------------------------ | --------: |
| Agentes IA vs automatización RPA       | Tema  | Parcial   | `/agentes-ia-vs-rpa/` — comparación              |        P1 |
| agentes IA vs RPA                      | Medio | Parcial   | `/agentes-ia-vs-rpa/`                            |        P1 |
| diferencia RPA inteligencia artificial | Bajo  | Parcial   | `/agentes-ia-vs-rpa/#diferencias`                |        P1 |
| automatización inteligente procesos    | Bajo  | Directa   | `/agentes-ia-vs-rpa/#automatizacion-inteligente` |        P1 |

### E. Finanzas, conciliación e impagos

| Consulta/idea                        | ATP   | Cobertura | Destino recomendado                                 | Prioridad |
| ------------------------------------ | ----- | --------- | --------------------------------------------------- | --------: |
| Conciliación financiera automatizada | Tema  | Directa   | `/automatizacion-financiera/` — servicio            |        P1 |
| automatizar conciliación bancaria    | Medio | Directa   | `/automatizacion-financiera/#conciliacion-bancaria` |        P1 |
| gestión impagos automatizada         | Medio | Directa   | `/automatizacion-financiera/#impagos`               |        P1 |
| reducir DSO facturación              | Medio | Directa   | `/automatizacion-financiera/#dso`                   |        P1 |

### F. Cualificación de leads y ventas B2B

| Consulta/idea                      | ATP   | Cobertura | Destino recomendado                                                   | Prioridad |
| ---------------------------------- | ----- | --------- | --------------------------------------------------------------------- | --------: |
| IA para cualificación de leads B2B | Tema  | Directa   | `/automatizacion-ventas-b2b/` — servicio                              |        P1 |
| automatizar prospección comercial  | Medio | Parcial   | `/automatizacion-ventas-b2b/#prospeccion`, solo si existe el servicio |        P2 |
| cualificación leads automatizada   | Medio | Directa   | `/automatizacion-ventas-b2b/#cualificacion`                           |        P1 |
| IA ventas B2B España               | Bajo  | Parcial   | `/automatizacion-ventas-b2b/#espana`                                  |        P2 |

### G. Pedidos, e-commerce y proveedores

| Consulta/idea                    | ATP   | Cobertura | Destino recomendado                                  | Prioridad |
| -------------------------------- | ----- | --------- | ---------------------------------------------------- | --------: |
| Automatizar gestión de pedidos   | Tema  | Directa   | `/automatizacion-gestion-pedidos/` — servicio        |        P1 |
| automatización pedidos ecommerce | Medio | Parcial   | `/automatizacion-gestion-pedidos/#ecommerce`         |        P1 |
| reducir costes logísticos        | Medio | Parcial   | `/automatizacion-gestion-pedidos/#costes-logisticos` |        P1 |
| gestión incidencias proveedores  | Bajo  | Directa   | `/automatizacion-gestion-pedidos/#proveedores`       |        P1 |

### H. Marca, opiniones y selección de proveedor

| Consulta/idea                          | ATP   | Cobertura | Destino recomendado                                        | Prioridad |
| -------------------------------------- | ----- | --------- | ---------------------------------------------------------- | --------: |
| Involution automatización IA opiniones | Tema  | Nula      | `/casos-de-exito/` — prueba y testimonios verificables     |        P0 |
| automatización IA llave en mano España | Medio | Parcial   | Home como secundaria; reforzar prueba y contexto           |        P1 |
| mejor empresa automatización IA España | Medio | Nula      | `/como-elegir-empresa-automatizacion-ia/` — guía imparcial |        P3 |
| involution agentes IA                  | Medio | Directa   | `/`                                                        |        P1 |

### I. Coste, precio y ROI

| Consulta/idea                               | ATP   | Cobertura | Destino recomendado                              | Prioridad |
| ------------------------------------------- | ----- | --------- | ------------------------------------------------ | --------: |
| Coste de automatizar operaciones            | Tema  | Parcial   | `/precios/` — página comercial                   |        P1 |
| cuánto cuesta implementar IA en una empresa | Medio | Nula      | `/precios/#implementacion`                       |        P1 |
| precio automatización IA pymes              | Medio | Nula      | `/precios/#pymes`                                |        P1 |
| ROI automatización procesos                 | Medio | Parcial   | `/calculadora-roi-automatizacion/` — herramienta |        P1 |

### J. Educación sobre agentes y automatización

| Consulta/idea                       | ATP   | Cobertura | Destino recomendado                           | Prioridad |
| ----------------------------------- | ----- | --------- | --------------------------------------------- | --------: |
| Qué son los agentes de IA           | Tema  | Parcial   | `/agentes-ia-empresas/` — guía pilar          |        P2 |
| agentes de IA empresas              | Medio | Directa   | `/agentes-ia-empresas/`                       |        P2 |
| automatización con IA               | Bajo  | Directa   | `/agentes-ia-empresas/#automatizacion-con-ia` |        P2 |
| inteligencia artificial operaciones | Bajo  | Directa   | `/agentes-ia-empresas/#operaciones`           |        P2 |

## 5. Arquitectura recomendada

No se deben crear 41 páginas. Las variantes próximas deben compartir una URL fuerte para evitar thin content y canibalización.

```text
/
├── automatizacion-ia-pymes/
│   └── procesos-automatizables-pyme/
├── servicios/
│   ├── automatizacion-financiera/
│   ├── automatizacion-gestion-pedidos/
│   ├── automatizacion-ventas-b2b/
│   ├── automatizacion-atencion-cliente/
│   └── automatizacion-google-cloud/
├── recursos/
│   ├── agentes-ia-empresas/
│   ├── agentes-ia-vs-rpa/
│   ├── como-elegir-empresa-automatizacion-ia/
│   └── calculadora-roi-automatizacion/
├── precios/
├── casos-de-exito/
└── equipo/
```

### Primera ola recomendada

1. `/automatizacion-ia-pymes/`
2. `/automatizacion-financiera/`
3. `/automatizacion-gestion-pedidos/`
4. `/automatizacion-ventas-b2b/`
5. `/automatizacion-atencion-cliente/`
6. `/agentes-ia-vs-rpa/`
7. `/precios/`
8. `/calculadora-roi-automatizacion/`

La muestra SERP confirma que comparativas RPA y guías de precio son formatos competitivos ya presentes en resultados en español; una FAQ breve en la home no satisface esas intenciones. Cada servicio debe enlazar a precio/ROI, comparación y un caso relevante. La navegación móvil debe conservar esos destinos.

## 6. Auditoría técnica

### Rastreo, indexabilidad y URLs

**Correcto:**

- `robots.txt` y sitemap válidos.
- Canonicals autorreferentes.
- Redirecciones HTTP/`www` en un salto.
- 404 real y noindex.
- HTML estático y rastreable sin JavaScript.
- URLs legales a un clic.

**A mejorar:**

- `/index.html` devuelve 200 y canonical a `/`; redirigir 301 para eliminar el duplicado técnico.
- Los `lastmod` del sitemap no coinciden con la modificación real; automatizarlos.
- Solo hay tres URLs indexables y ninguna arquitectura temática.
- No existe menú móvil; por debajo de 1.000 px desaparecen los enlaces de navegación.
- No hay evidencia de Search Console, Analytics ni IndexNow.

### Rendimiento

| Métrica                |        Móvil, 3 ejecuciones | Escritorio | Estado                   |
| ---------------------- | --------------------------: | ---------: | ------------------------ |
| Lighthouse Performance |                  88, 88, 89 |         99 | Bueno                    |
| LCP                    | 2,77–2,84 s; mediana 2,79 s |     0,78 s | Móvil necesita mejora    |
| CLS                    |                           0 |      0,002 | Bueno                    |
| TBT                    |                        0 ms |       0 ms | Bueno; no equivale a INP |
| Transferencia inicial  |               1,55–1,61 MiB |   1,63 MiB | Mejorable                |

Google recomienda LCP ≤2,5 s, INP <200 ms y CLS <0,1 en el percentil 75. Aquí solo hay datos de laboratorio; no puede afirmarse si se aprueban los Core Web Vitals de campo.

Prioridad de optimización:

1. CSS crítico para nav/hero y resto no bloqueante.
2. Autohospedar/subconjuntar Geist en WOFF2.
3. Precargar y dar `fetchpriority="high"` al logo/LCP solo tras confirmar el waterfall.
4. En móvil, poster primero y vídeo del hero con `preload="metadata"` o `none`.
5. Cargar demos fuera del viewport al acercarse con `IntersectionObserver`.
6. Versionar assets y aplicar caché anual `immutable` mediante hosting/CDN configurable.

### Seguridad técnica

HTTPS y certificado son correctos, pero faltan HSTS, CSP, `nosniff`, `Referrer-Policy`, protección de framing y `Permissions-Policy`. Es principalmente un riesgo de seguridad/confianza, no una palanca directa de ranking. GitHub Pages no da control granular de headers; resolver con una capa edge/CDN o cambio de hosting. Probar CSP en modo Report-Only antes de exigirla.

## 7. On-page, contenido y E-E-A-T

### Fortalezas

- Un H1 y jerarquía H1→H2→H3 ordenada.
- Copy claro, buena metodología, FAQs, tabla/gráfico y cuatro procesos concretos.
- Canonical, meta description, Open Graph y Twitter Card presentes.
- Contacto visible y páginas legales.
- Lenguaje natural sin keyword stuffing.

### Problemas prioritarios

1. **Title en inglés y poco descriptivo:** `Involution | AI-Powered Automation`. Propuesta: `Agentes de IA y automatización empresarial | Involution`.
2. **H1 genérico:** `Automatización impulsada por IA para cada decisión`. Propuesta: `Automatización empresarial con agentes autónomos de IA`.
3. **Meta description de 165 caracteres:** reducir y alinear con la consulta principal.
4. **Contenido comercial oculto:** aproximadamente 411 palabras de “Qué automatizamos” y casos están en el HTML bajo `display:none`. Hacerlas visibles o convertirlas en URLs dedicadas; no confiar en contenido oculto para posicionar.
5. **`meta keywords`:** no aporta; Google declara que no la usa para indexación ni ranking.
6. **Sin `<main>`:** Lighthouse penaliza la accesibilidad. Añadir un landmark principal.
7. **Contraste insuficiente:** varios textos grises sobre blanco/negro fallan 4,5:1; Lighthouse Accessibility 94.

### Confianza y evidencia: P0

- Sustituir `PENDIENTE` en aviso legal y privacidad por titular/responsable, NIF y domicilio reales validados.
- Publicar `/equipo/` con responsables, experiencia, credenciales y perfiles verificables.
- Documentar o reformular `−74%`, `~180K €`, `>8x`, `+140%`, `−82% DSO`, `−68%` y `x5`. Indicar si son escenario, benchmark o resultado real; añadir periodo, muestra, fórmula y supuestos.
- No crear “opiniones” o `Review` schema sin testimonios reales y permiso.
- No presentarse como “mejor empresa” sin comparativa independiente y evidencia.

## 8. Schema, GEO e imágenes

### Schema

Los tres bloques (`Organization`, `WebSite`, `FAQPage`) son JSON válido. Mejoras:

- Conectar `Organization`, `WebSite`, `WebPage` y `Service` mediante `@id` en un `@graph`.
- Añadir teléfono, `contactPoint` y `sameAs` solo con datos verificables.
- En nuevas landings, usar `Service` y `BreadcrumbList`; en recursos con autor, `Article`/`BlogPosting` y `Person`.
- El FAQ puede conservarse para semántica, pero Google limita los rich results FAQ a webs gubernamentales y sanitarias de autoridad; no prometer un resultado enriquecido comercial.
- Añadir `VideoObject` solo cuando haya thumbnail, fecha real, descripción y transcripción.

### GEO y búsquedas con IA

`robots.txt` permite por herencia crawlers de búsqueda e IA. `llms.txt` devuelve 404; publicarlo es opcional y experimental, no sustituye sitemap, robots, enlazado ni contenido.

La principal brecha GEO no es el archivo `llms.txt`, sino la **falta de pasajes citables y verificables**:

- Abrir cada página con una respuesta autocontenida de 40–70 palabras.
- Añadir autor/revisor, fecha visible y fuentes primarias.
- Publicar bloques de definición, tablas comparativas, fórmulas y metodología.
- Respaldar resultados con casos y datos originales.
- Añadir un bloque de 120–160 palabras en la home que defina qué es Involution, para quién trabaja, qué sistemas integra, cómo controla riesgos y qué evidencia puede mostrar.

### Imágenes y vídeo

- Los dos `<img>` tienen `alt`, ancho/alto y SVG: correcto.
- Hay tres vídeos y ninguno tiene transcripción o `VideoObject`.
- `sistema-multiagente.mp4` pesa aproximadamente 2,28 MB y no tiene poster.
- Comprimirlo, ofrecer WebM/AV1 con H.264 de fallback, añadir poster y transcripción.
- Los vídeos demo fuera del pliegue deben diferir su `src` y no competir con el LCP.

## 9. Plan de 90 días

### Días 0–14: confianza, medición y fundamentos

- Completar identidad legal y revisar todos los claims.
- Verificar propiedad en Search Console, enviar sitemap e inspeccionar `/`.
- Configurar medición de leads orgánicos respetando la política de privacidad.
- Reescribir title, meta, H1 y metadatos sociales.
- Hacer visible el contenido comercial o prepararlo como páginas.
- Añadir `<main>`, corregir contrastes y diseñar menú móvil.
- Optimizar LCP móvil y confirmar con tres ejecuciones repetidas.

### Días 15–45: landings de intención comercial

- Publicar cuatro páginas de proceso: finanzas, pedidos, ventas B2B y soporte.
- Publicar el hub para pymes, la comparación RPA y la página de precios.
- Implementar breadcrumbs, `Service`, sitemap automático y enlazado interno.
- Publicar una metodología de cálculo y una primera calculadora ROI accesible sin formulario obligatorio.

### Días 46–90: autoridad y expansión

- Publicar equipo y, si existen, casos reales verificables.
- Crear guía pilar de agentes IA y página técnica GCP.
- Obtener menciones/enlaces mediante datos, herramientas y casos, no artículos genéricos.
- Evaluar guía de selección de proveedor solo cuando exista prueba suficiente.
- Medir consultas, CTR, leads y canibalización; ajustar títulos y enlazado.

## 10. KPIs

- URLs válidas e indexadas por clúster en Search Console.
- Impresiones, clics y CTR no-brand para `pymes`, `precio`, `RPA`, `GCP` y cada proceso.
- Leads orgánicos por landing y tasa de contacto cualificado.
- Uso/completitud del diagnóstico y calculadora ROI.
- Ratio de páginas con autor/revisor, fecha, fuentes y schema válido.
- LCP, INP y CLS de campo al percentil 75 cuando haya datos.
- Backlinks y menciones hacia casos, metodología, datos o herramientas.
- Apariciones/citas por consulta y URL en AI Overviews/AI Mode, ChatGPT, Perplexity y Bing Copilot.

## 11. Fuentes y evidencia

- [Home de Involution](https://involution.es/)
- [robots.txt](https://involution.es/robots.txt)
- [sitemap.xml](https://involution.es/sitemap.xml)
- [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Google: meta tags compatibles](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Google: cambios en FAQ y HowTo](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Google: directrices generales de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Muestra SERP: RPA vs IA](https://delegia.es/blog/ia-vs-rpa-para-decidir-cuando-usar-agentes-y-cuando-bastan-reglas)
- [Muestra SERP: coste de IA para pymes](https://www.upliora.es/blog/cuanto-cuesta-implementar-ia-pyme-espana-por-tipo-proyecto-2026)

### Anexos de trabajo

- [Auditoría técnica detallada](/Users/migueltolino/involution/.audit-work/technical.md)
- [Contenido, SXO y matriz AnswerThePublic](/Users/migueltolino/involution/.audit-work/content-gap.md)
- [Schema, GEO e imágenes](/Users/migueltolino/involution/.audit-work/schema-geo.md)
- [Captura móvil](/Users/migueltolino/involution/screenshots/home-mobile.png)
- [Captura escritorio](/Users/migueltolino/involution/screenshots/home-desktop.png)

## Veredicto

Involution no necesita rehacer su web para ser rastreable; necesita evolucionar de una landing elegante a un sistema editorial y comercial demostrable. La mejor inversión no es publicar 50 artículos. Es crear 8–12 destinos fuertes, alineados con intención, enlazados entre sí y respaldados por identidad, metodología, precios orientativos y casos reales. Esa arquitectura cubre las 41 consultas visibles sin canibalización y convierte la demanda de AnswerThePublic en un recorrido desde diagnóstico hasta contacto.
