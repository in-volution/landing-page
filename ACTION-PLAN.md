# Plan de acción SEO — Involution

**Objetivo:** convertir una web de una sola landing comercial en una arquitectura capaz de captar, demostrar y convertir la demanda de las 41 consultas únicas visibles en el export de AnswerThePublic.

## P0 — resolver antes de escalar contenido

| Acción                                                                      | Responsable sugerido  | Esfuerzo | Éxito medible                                        |
| --------------------------------------------------------------------------- | --------------------- | -------: | ---------------------------------------------------- |
| Completar titular/responsable, NIF y domicilio en aviso legal y privacidad  | Legal/Founder         |     Bajo | Cero `PENDIENTE` publicados                          |
| Auditar KPIs y ROI actuales; documentar fórmula o marcarlos como escenarios | Operaciones/Marketing |    Medio | 100% de claims con fuente, método o disclaimer       |
| Preparar identidad de equipo, credenciales y perfiles verificables          | Founder/Marketing     |    Medio | Página `/equipo/` publicable                         |
| Verificar Search Console, enviar sitemap e inspeccionar la home             | SEO/Dev               |     Bajo | Propiedad verificada y estado de indexación conocido |

## P1 — días 1–30

### On-page y UX

- Title: `Agentes de IA y automatización empresarial | Involution`.
- H1: `Automatización empresarial con agentes autónomos de IA`.
- Acortar meta description y alinear Open Graph/Twitter.
- Añadir `<main>` y corregir contrastes que fallan 4,5:1.
- Implementar menú móvil con targets táctiles ≥48 px.
- Hacer visibles “Qué automatizamos” y casos, o retirarlos de la home al publicar las landings.

### Técnica

- Redirigir 301 `/index.html` → `/`.
- Automatizar `sitemap.xml` y `lastmod` reales.
- Llevar LCP móvil de 2,79 s a ≤2,2 s de laboratorio.
- Priorizar CSS/fuentes, poster antes que vídeo y carga diferida de demos.
- Versionar assets antes de aplicar caché larga.

### Primera ola de páginas

1. `/automatizacion-ia-pymes/`
2. `/automatizacion-financiera/`
3. `/automatizacion-gestion-pedidos/`
4. `/automatizacion-ventas-b2b/`
5. `/automatizacion-atencion-cliente/`
6. `/agentes-ia-vs-rpa/`
7. `/precios/`
8. `/calculadora-roi-automatizacion/`

Cada servicio debe incluir flujo actual, decisiones del agente, integraciones, excepciones, control humano, trazabilidad, plazo, métrica con fórmula, prueba y CTA.

## P2 — días 31–60

- Publicar `/agentes-ia-empresas/` como guía pilar.
- Publicar `/automatizacion-google-cloud/` con arquitectura y seguridad reales.
- Publicar `/equipo/` y `/casos-de-exito/` cuando exista prueba verificable.
- Añadir breadcrumbs y schema `Service`, `WebPage`, `Article` y `Person` donde correspondan.
- Consolidar Organization/WebSite/WebPage/Service mediante `@graph` y `@id`.
- Añadir transcripción, poster, compresión y `VideoObject` válido a vídeos informativos.
- Decidir política explícita para crawlers de búsqueda frente a entrenamiento; `llms.txt` es opcional.

## P3 — días 61–90

- Publicar `/procesos-automatizables-pyme/` como diagnóstico/checklist.
- Crear guía de selección de proveedor solo con criterios y evidencia propios.
- Aplicar cabeceras HSTS/CSP/nosniff/Referrer-Policy mediante CDN/edge configurable.
- Evaluar IndexNow al existir cadencia de publicación.
- Hacer outreach con casos, datos y herramientas; evitar volumen de artículos genéricos.

## Orden editorial recomendado

| Semana | Publicación                      | Intención principal   |
| ------ | -------------------------------- | --------------------- |
| 1–2    | Home revisada + equipo/confianza | Marca y conversión    |
| 2–3    | Automatización IA para pymes     | Diagnóstico/comercial |
| 3–4    | Finanzas y conciliación          | Comercial BOFU        |
| 4–5    | Pedidos y proveedores            | Comercial BOFU        |
| 5–6    | Leads y ventas B2B               | Comercial BOFU        |
| 6–7    | Atención al cliente              | Comercial BOFU        |
| 7–8    | Agentes IA vs RPA                | Comparativa MOFU      |
| 8–9    | Precios + calculadora ROI        | Transaccional BOFU    |
| 9–10   | Qué son los agentes IA           | Informacional TOFU    |
| 10–12  | Google Cloud + primer caso real  | Técnica/autoridad     |

## Enlazado mínimo

- Home → cada servicio, pymes, RPA, precios y casos.
- Servicio → RPA, precios/ROI, caso relacionado y contacto.
- Hub pymes → diagnóstico y cuatro servicios.
- Guía de agentes → RPA y servicios.
- Caso → servicio, metodología y CTA.
- Breadcrumbs y navegación móvil para todas las páginas prioritarias.

## Cuadro de mando

Revisar mensualmente:

- Indexación válida por URL y clúster.
- Impresiones/clics/CTR no-brand.
- Leads orgánicos y tasa de cualificación por landing.
- Consultas por página y canibalización.
- Uso del diagnóstico/calculadora.
- LCP, INP y CLS de campo.
- Backlinks/menciones a evidencia propia.
- Citas en buscadores con IA por consulta y URL.

## Condiciones de calidad

- No crear 41 páginas: consolidar variantes por intención.
- No publicar cifras sin fuente, fórmula o etiqueta de escenario.
- No fabricar opiniones, reseñas o casos.
- No añadir “España” si el contenido no ofrece contexto local real.
- No usar schema para contenido invisible o inexistente.
- No medir éxito por número de artículos: medir cobertura, leads y autoridad.
