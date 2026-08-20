# Auditoría de contenido, E‑E‑A‑T y SXO frente a AnswerThePublic

**Sitio analizado:** https://involution.es/  
**Fecha:** 17 de agosto de 2026  
**Fuente de ideas:** export de AnswerThePublic facilitado por el usuario  
**Alcance:** contenido publicado, cobertura temática, intención de búsqueda, arquitectura propuesta y preparación para citas por IA. No es una auditoría técnica completa ni incluye datos de Search Console.

## Resumen ejecutivo

Involution tiene una **home comercial sólida y relativamente profunda**, pero casi toda la visibilidad orgánica potencial depende de una sola URL. El sitemap publicado contiene únicamente la home y dos páginas legales. Esto deja sin una respuesta indexable específica la mayoría de las búsquedas informativas, comparativas, de precio y de validación de proveedor que aparecen en el export.

### Puntuaciones

| Dimensión | Puntuación | Lectura |
|---|---:|---|
| Calidad de contenido | **61/100** | Copy claro, casos de uso concretos y buena estructura; faltan evidencia, autoría, fuentes y páginas especializadas. |
| E‑E‑A‑T | **42/100** | Hay experiencia operativa aparente y explicación técnica, pero la identidad legal incompleta y la falta de prueba externa limitan la confianza. |
| Preparación para citas por IA | **55/100** | FAQ, jerarquía y cifras extraíbles ayudan; la falta de fuentes, metodología y autor experto reduce la citabilidad. |
| Alineación SXO del universo de consultas | **50/100** | La home funciona para intención comercial amplia, pero no es el tipo de página adecuado para todas las consultas del export. |

> La puntuación SXO es independiente de una puntuación de salud técnica. Mide si las páginas y formatos disponibles satisfacen la intención del conjunto de consultas.

### Hallazgos principales

1. El export anuncia “50 Content Ideas”, pero contiene **42 filas de ideas/consultas utilizables y 41 consultas únicas**. `transformación digital pymes` aparece dos veces. El resto del archivo es interfaz, llamadas a prueba gratuita y mensajes de datos bloqueados.
2. AnswerThePublic **no muestra volumen** en el archivo. Las etiquetas Alto/Medio/Bajo son “Oportunidad”, no volumen. Este informe no inventa ni sustituye esos datos.
3. De las 41 consultas únicas, la home ofrece cobertura **directa para 16 (39%)**, **parcial para 18 (44%)** y **nula para 7 (17%)**. “Parcial” significa que menciona el concepto, pero no satisface por completo el formato o el modificador de la consulta.
4. La oportunidad de mayor valor está en transformar cuatro bloques ya presentes —pedidos, finanzas, leads y soporte— en páginas de servicio de al menos 800 palabras de cobertura útil, cada una con proceso, integraciones, límites, prueba y CTA propios.
5. El mayor riesgo E‑E‑A‑T es de confianza: las páginas de aviso legal y privacidad publicadas muestran **“PENDIENTE”** en titular/responsable, NIF y domicilio. Esto debe corregirse antes de escalar contenido comercial.
6. Las cifras `−74% coste/pedido`, `+140% conversión`, `−82% DSO` y `−68% coste` se presentan en la web como **ROI proyectado/estimado**, no como resultados de clientes. No deben reutilizarse como “casos de éxito” sin metodología, supuestos y evidencia verificable.
7. La home tiene 1.400–1.477 palabras visibles según el parser, por encima del suelo orientativo de 500 palabras para una home. El problema no es longitud: es **distribución de intención y demostración de autoridad**.

## Inventario actual y evidencia

### URLs indexables publicadas

| URL | Tipo | Función actual | Valor para el universo ATP |
|---|---|---|---|
| `/` | Home híbrida de servicio + contenido | Presenta propuesta, casos de uso, proceso, capacidades, FAQ y contacto | Concentra prácticamente toda la cobertura temática. |
| `/aviso-legal/` | Legal | Condiciones y titularidad | Señal de confianza negativa mientras mantenga campos “PENDIENTE”. |
| `/privacidad/` | Legal | Tratamiento de datos | Señal de confianza negativa mientras mantenga campos “PENDIENTE”. |

El sitemap no incluye blog, recursos, páginas de servicio, casos de éxito, precios ni autores. La navegación interna de la home enlaza sobre todo a anclas de la misma página, por lo que no existe todavía una red de clústeres temáticos.

### Fortalezas de la home

- H1 claro: “Automatización impulsada por IA para cada decisión”.
- Explica una metodología de cuatro fases y una escalera de adopción: diagnóstico, blueprint, piloto, retainer y departamento digital.
- Cubre cuatro procesos comerciales relevantes: pedidos/proveedores, cualificación de leads, conciliación/impagos y atención al cliente.
- Tiene FAQ visible y `FAQPage`, además de `Organization` y `WebSite` en JSON‑LD.
- Incluye email, teléfono y WhatsApp, HTTPS, canonical, meta description y políticas.
- Usa cifras, una tabla/gráfico y plazos concretos, elementos potencialmente extraíbles por sistemas de IA.
- La densidad léxica es natural: no se observa keyword stuffing.

### Debilidades de la home

- `<title>` y metadatos sociales en inglés: `Involution | AI-Powered Automation`; no aprovechan el lenguaje real de las consultas españolas.
- No contiene señales explícitas suficientes de **España** o **pymes**, modificadores presentes en numerosas sugerencias.
- No hay equipo, autores, credenciales, certificaciones, partnership verificable, medios, clientes identificados ni testimonios.
- No hay citas externas ni fuentes para afirmaciones como “convierte hasta 10 veces menos” o para los ROI proyectados.
- La FAQ compara agentes y RPA en un párrafo, insuficiente para una intención comparativa que suele requerir criterios, tabla, pros, contras y recomendación por caso.
- La oferta menciona cuota por agente y volumen, pero no ofrece rangos, componentes del precio, ejemplo de presupuesto ni calculadora.
- No existe una definición breve y citable de “agente de IA”, ni glosario de límites, riesgos y casos en los que no conviene usar agentes.
- No hay fecha visible de actualización. El sitemap marca `lastmod` 2026‑07‑26 y el servidor `Last-Modified` 2026‑07‑29, pero esas señales no sustituyen una fecha editorial visible.

## Métricas de contenido y legibilidad

| Métrica | Resultado | Interpretación |
|---|---:|---|
| Palabras visibles | 1.400 en el parser SEO; 1.477 en extracción completa | Supera el suelo orientativo de una home; no hace falta inflarla. |
| Frases | 79 | Muestra suficiente para una lectura orientativa. |
| Palabras por frase | 18,7 | Dentro del rango general de 15–20. |
| Fernández‑Huerta estimado | 55,7/100 | Lectura normal a algo difícil; adecuada para un decisor B2B, mejorable en bloques técnicos. |
| Szigriszt‑Pazos estimado | 51,0/100 | Lectura normal; conviene simplificar frases abstractas y anglicismos. |

Las métricas españolas son estimaciones basadas en segmentación silábica automática. Sirven como indicador de accesibilidad, no como factor directo de ranking.

## E‑E‑A‑T

| Factor | Peso | Puntuación | Evidencia y brecha |
|---|---:|---:|---|
| Experiencia | 20% | **12/20** | Hay metodología, procesos operativos y ejemplos específicos. Sin embargo, son escenarios/proyecciones; no hay capturas, datos antes/después, nombres de clientes ni documentación de un proyecto real. |
| Expertise | 25% | **13/25** | Se usan correctamente GCP, APIs, ERP/CRM, guardarraíles, human‑in‑the‑loop y trazabilidad. Falta un equipo identificable, biografías, credenciales, revisión técnica y fuentes. |
| Autoridad | 25% | **5/25** | No se muestran menciones, publicaciones, enlaces de terceros, asociaciones, certificaciones o reconocimiento del sector. “Google Cloud” se presenta como infraestructura, no como partnership acreditado. |
| Confianza | 30% | **12/30** | HTTPS, contacto, FAQ y políticas ayudan. Los campos legales pendientes, la falta de identidad empresarial completa y las afirmaciones sin fuentes son brechas graves. |
| **Total** | **100%** | **42/100** | E‑E‑A‑T débil/moderado; la prioridad es prueba y transparencia antes que volumen editorial. |

### Riesgos de calidad asociados a contenido asistido por IA

La página no parece contenido masivo ni presenta repetición entre múltiples URLs porque solo existe una página comercial. Sí aparecen marcadores que deben controlarse al crear el nuevo clúster:

- Frases genéricas o absolutas como “a coste mínimo”, “sin romperse” o “precisión” sin condiciones ni evidencia.
- Estructura repetible por plantilla que podría producir páginas de servicio casi idénticas si se escala sin experiencias y datos únicos.
- Falta de autoría y de revisión humana experta visible.
- Riesgo de convertir proyecciones en supuestos “resultados reales”. Cada cifra debe indicar fuente, periodo, muestra, fórmula y si es simulación o resultado observado.
- Ausencia de una perspectiva propia documentada: criterios de selección del proceso, arquitectura, guardarraíles, errores encontrados y aprendizajes de implementación.

## Preparación para citas por IA

**Puntuación: 55/100**

| Señal | Estado | Acción |
|---|---|---|
| Respuestas breves y extraíbles | Parcial | Abrir cada página con una respuesta de 40–70 palabras a la consulta principal. |
| Jerarquía H1–H2–H3 | Buena en home | Replicar con headings descriptivos, no creativos, en las nuevas páginas. |
| Datos originales | Débil | Publicar metodología, supuestos, ejemplos y datos agregados propios. |
| Atribución y fuentes | Ausente | Citar documentación oficial y fuentes primarias; diferenciar datos propios de benchmarks externos. |
| Autor y entidad | Débil | Añadir página de equipo, `Person`, revisores y credenciales; completar `Organization`. |
| Fechas | Parcial/no visible | Mostrar `datePublished` y `dateModified` en recursos y cambios materiales. |
| Tablas/listas | Parcial | Usar matrices en RPA vs agentes, tablas de precio, checklist de diagnóstico y pasos de implementación. |
| Schema | Parcial | Mantener `Organization`; añadir `Service`, `Article`/`BlogPosting`, `Person`, `BreadcrumbList` y `WebApplication` cuando corresponda. |

## Clústeres, intención y funnel

| Clúster | Consultas únicas | Intención dominante | Funnel | Formato que mejor satisface |
|---|---:|---|---|---|
| Diagnóstico y transformación pyme | 5 | Informacional/comercial | TOFU → MOFU | Hub para pymes + checklist/herramienta diagnóstica. |
| Infraestructura Google Cloud | 4 | Técnica/comercial | MOFU | Página de servicio técnica con arquitectura, seguridad e integración. |
| Atención al cliente | 4 | Comercial | MOFU → BOFU | Página de servicio con flujos, límites, handoff y KPIs. |
| Agentes vs RPA | 4 | Comparativa | MOFU | Página de comparación con matriz, costes, mantenimiento y “cuándo elegir cada uno”. |
| Finanzas, conciliación e impagos | 4 | Comercial | MOFU → BOFU | Página de servicio con controles, trazabilidad y ejemplo de DSO. |
| Leads y ventas B2B | 4 | Comercial | MOFU → BOFU | Página de servicio; separar cualificación inbound de prospección outbound. |
| Pedidos y proveedores | 4 | Comercial | MOFU → BOFU | Página de servicio con e‑commerce/ERP y gestión de excepciones. |
| Validación de marca/proveedor | 4 | Navegacional/comercial | BOFU | Casos de éxito/testimonios y guía imparcial de selección. |
| Precio y ROI | 4 | Comercial/transaccional | BOFU | Página de precios + calculadora de ROI con supuestos editables. |
| Educación sobre agentes | 4 | Informacional | TOFU | Guía pilar/definición enlazada a servicios y comparación. |

## Cobertura exhaustiva y mapa keyword → URL

**Leyenda de cobertura:** Directa = la home da una respuesta sustancial; Parcial = menciona el tema pero no satisface toda la intención; Nula = no hay una respuesta significativa.  
**Prioridad:** P0 = confianza/base imprescindible; P1 = impacto comercial alto y contenido próximo a lo ya demostrado; P2 = expansión/autoridad; P3 = publicar solo cuando exista evidencia suficiente.

### 1. Diagnóstico y transformación digital de pymes

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| qué procesos de una pyme en España tienen más margen de automatización | Medio | Informacional‑diagnóstica · TOFU/MOFU | **Parcial:** lista procesos y KPIs, pero no explica criterios de priorización por pyme. | `/procesos-automatizables-pyme/` · guía + checklist/herramienta | **P1** |
| transformación digital pymes *(aparece 2 veces)* | Medio | Informacional/comercial · TOFU | **Nula:** la propuesta es adyacente, pero no hay roadmap de transformación para pymes. | `/automatizacion-ia-pymes/` · hub híbrido | **P1** |
| Implementar IA en pyme española | Sin etiqueta propia; cabecera de tema | Informacional/comercial · MOFU | **Nula:** faltan pyme, España, requisitos, riesgos y plan. | `/automatizacion-ia-pymes/` · hub híbrido | **P1** |
| IA para pymes España | Medio | Comercial · MOFU | **Nula:** no hay segmentación por tamaño ni contexto español. | `/automatizacion-ia-pymes/` · hub híbrido | **P1** |
| primeros pasos automatización IA empresa | Medio | Informacional · TOFU/MOFU | **Directa:** “Cómo empezar” ofrece diagnóstico, blueprint y piloto; necesita una URL rastreable propia. | `/automatizacion-ia-pymes/#primeros-pasos` · sección del hub | **P1** |

### 2. Google Cloud e infraestructura

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| Google Cloud para automatización empresarial | Sin etiqueta propia; cabecera de tema | Técnica/comercial · MOFU | **Parcial:** GCP se menciona varias veces, sin explicar arquitectura ni beneficios. | `/automatizacion-google-cloud/` · servicio técnico | **P2** |
| despliegue agentes IA nube | Alto | Técnica/comercial · MOFU | **Parcial:** se afirma despliegue en GCP, sin diagrama, aislamiento, regiones o operación. | `/automatizacion-google-cloud/#despliegue` · sección técnica | **P2** |
| google cloud IA empresas | Medio | Técnica/comercial · MOFU | **Parcial:** entidad presente, respuesta superficial. | `/automatizacion-google-cloud/` · servicio técnico | **P2** |
| GCP automatización procesos | Bajo | Técnica/comercial · MOFU | **Parcial:** menciona credenciales restringidas, APIs y conectores; falta desarrollo. | `/automatizacion-google-cloud/#integraciones-seguridad` · sección técnica | **P2** |

### 3. Atención al cliente

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| Atención al cliente con IA 24/7 | Sin etiqueta propia; cabecera de tema | Comercial · MOFU/BOFU | **Directa:** caso de uso 24/7, resolución en sistemas y escalado humano. | `/automatizacion-atencion-cliente/` · servicio | **P1** |
| automatizar soporte clientes | Medio | Comercial · MOFU | **Directa:** describe consulta de pedido, reembolso, respuesta y handoff. | `/automatizacion-atencion-cliente/` · servicio | **P1** |
| chatbot IA atención cliente | Bajo | Comparativa/comercial · MOFU | **Parcial:** la web dice “no es un bot”, pero no explica chatbot vs agente. | `/automatizacion-atencion-cliente/#chatbot-vs-agente` · sección comparativa | **P1** |
| IA servicio al cliente España | Bajo | Comercial/local‑nacional · MOFU | **Parcial:** cubre el servicio, no el modificador España ni privacidad/idioma/contexto local. | `/automatizacion-atencion-cliente/#espana` · sección de adecuación | **P2** |

### 4. Agentes de IA frente a RPA

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| Agentes IA vs automatización RPA | Sin etiqueta propia; cabecera de tema | Comparativa · MOFU | **Parcial:** FAQ de un párrafo, sin matriz ni criterios. | `/agentes-ia-vs-rpa/` · comparación | **P1** |
| agentes IA vs RPA | Medio | Comparativa · MOFU | **Parcial:** respuesta breve; no satisface evaluación completa. | `/agentes-ia-vs-rpa/` · comparación | **P1** |
| diferencia RPA inteligencia artificial | Bajo | Informacional/comparativa · TOFU/MOFU | **Parcial:** diferencia reglas rígidas de razonamiento contextual, sin matices. | `/agentes-ia-vs-rpa/#diferencias` · tabla comparativa | **P1** |
| automatización inteligente procesos | Bajo | Comercial/informacional · MOFU | **Directa:** es la propuesta central, aunque falta una URL temática. | `/agentes-ia-vs-rpa/#automatizacion-inteligente` · sección | **P1** |

### 5. Conciliación, impagos y DSO

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| Conciliación financiera automatizada | Sin etiqueta propia; cabecera de tema | Comercial · MOFU/BOFU | **Directa:** caso dedicado con facturas, pagos y trazabilidad. | `/automatizacion-financiera/` · servicio | **P1** |
| automatizar conciliación bancaria | Medio | Comercial · MOFU | **Directa:** intención cubierta conceptualmente; falta detalle de fuentes bancarias, matching y excepciones. | `/automatizacion-financiera/#conciliacion-bancaria` · sección | **P1** |
| gestión impagos automatizada | Medio | Comercial · MOFU/BOFU | **Directa:** explica reclamación, escalado y recobro. | `/automatizacion-financiera/#impagos` · sección | **P1** |
| reducir DSO facturación | Medio | Comercial · BOFU | **Directa:** muestra `−82% DSO`, pero debe documentar la fórmula y etiquetar la cifra como proyección. | `/automatizacion-financiera/#dso` · sección + caso cuantificado | **P1** |

### 6. Cualificación de leads y ventas B2B

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| IA para cualificación de leads B2B | Sin etiqueta propia; cabecera de tema | Comercial · MOFU/BOFU | **Directa:** caso dedicado y propuesta de cualificación. | `/automatizacion-ventas-b2b/` · servicio | **P1** |
| automatizar prospección comercial | Medio | Comercial · MOFU | **Parcial:** la home cubre respuesta/cualificación inbound, no prospección outbound. | `/automatizacion-ventas-b2b/#prospeccion` solo si el servicio existe · sección | **P2** |
| cualificación leads automatizada | Medio | Comercial · MOFU/BOFU | **Directa:** responde en minutos, cualifica y prepara propuesta. | `/automatizacion-ventas-b2b/#cualificacion` · sección | **P1** |
| IA ventas B2B España | Bajo | Comercial/nacional · MOFU | **Parcial:** ventas B2B presente; faltan España, compliance, idioma y ejemplos locales. | `/automatizacion-ventas-b2b/#espana` · sección | **P2** |

### 7. Pedidos, e‑commerce y proveedores

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| Automatizar gestión de pedidos | Sin etiqueta propia; cabecera de tema | Comercial · MOFU/BOFU | **Directa:** es uno de los cuatro casos centrales. | `/automatizacion-gestion-pedidos/` · servicio | **P1** |
| automatización pedidos ecommerce | Medio | Comercial · MOFU | **Parcial:** pedidos sí; e‑commerce y plataformas concretas no. | `/automatizacion-gestion-pedidos/#ecommerce` · sección/integraciones | **P1** |
| reducir costes logísticos | Medio | Comercial · MOFU/BOFU | **Parcial:** `−74% coste/pedido` y ahorro estimado, sin modelo logístico ni metodología. | `/automatizacion-gestion-pedidos/#costes-logisticos` · caso cuantificado | **P1** |
| gestión incidencias proveedores | Bajo | Comercial · MOFU | **Directa:** describe detección, reclamación y reajuste. | `/automatizacion-gestion-pedidos/#proveedores` · sección | **P1** |

### 8. Marca, opiniones y selección de proveedor

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| Involution automatización IA opiniones | Sin etiqueta propia; cabecera de tema | Navegacional/validación · BOFU | **Nula:** no hay testimonios o reseñas verificables. | `/casos-de-exito/` · casos + testimonios verificables | **P0** |
| automatización IA llave en mano España | Medio | Comercial · BOFU | **Parcial:** arquitectura, desarrollo, integración y operación sí; falta “España” y una página de servicio explícita. | `/` como keyword comercial secundaria; reforzar prueba y contexto | **P1** |
| mejor empresa automatización IA España | Medio | Comparativa/validación · BOFU | **Nula:** no se debe autoproclamar “mejor” sin evidencia. | `/como-elegir-empresa-automatizacion-ia/` · guía imparcial de selección | **P3** |
| involution agentes IA | Medio | Navegacional/comercial · BOFU | **Directa:** marca y solución son el foco de la home. | `/` · home | **P1** |

### 9. Coste, precio y ROI

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| Coste de automatizar operaciones | Sin etiqueta propia; cabecera de tema | Comercial · BOFU | **Parcial:** se explica la cuota, no el coste ni sus componentes. | `/precios/` · página comercial de precios | **P1** |
| cuánto cuesta implementar IA en una empresa | Medio | Comercial · BOFU | **Nula:** falta rango, ejemplo y variables de coste. | `/precios/#implementacion` · tabla + ejemplo | **P1** |
| precio automatización IA pymes | Medio | Comercial · BOFU | **Nula:** no hay referencia de precio ni paquete para pyme. | `/precios/#pymes` · escenarios/rangos transparentes | **P1** |
| ROI automatización procesos | Medio | Comercial/informacional · MOFU/BOFU | **Parcial:** existen proyecciones, pero no fórmula editable o evidencia real. | `/calculadora-roi-automatizacion/` · herramienta interactiva | **P1** |

### 10. Educación sobre agentes y automatización

| Keyword o idea del export | Señal ATP | Intención/funnel | Cobertura actual | URL propuesta · tipo | Prioridad |
|---|---|---|---|---|---:|
| Qué son los agentes de IA | Sin etiqueta propia; cabecera de tema | Informacional · TOFU | **Parcial:** se describe lo que hacen, no hay definición completa, arquitectura, límites o ejemplos. | `/agentes-ia-empresas/` · guía pilar | **P2** |
| agentes de IA empresas | Medio | Informacional/comercial · TOFU/MOFU | **Directa:** es el tema central, aunque sin página educativa dedicada. | `/agentes-ia-empresas/` · guía pilar | **P2** |
| automatización con IA | Bajo | Informacional/comercial · TOFU/MOFU | **Directa:** propuesta central de la home. | `/agentes-ia-empresas/#automatizacion-con-ia` · sección | **P2** |
| inteligencia artificial operaciones | Bajo | Informacional/comercial · MOFU | **Directa:** la home vincula IA con operaciones y cuatro procesos. | `/agentes-ia-empresas/#operaciones` · sección | **P2** |

## Arquitectura recomendada

```text
/
├── automatizacion-ia-pymes/
│   └── procesos-automatizables-pyme/
├── servicios/
│   ├── automatizacion-atencion-cliente/
│   ├── automatizacion-financiera/
│   ├── automatizacion-ventas-b2b/
│   ├── automatizacion-gestion-pedidos/
│   └── automatizacion-google-cloud/
├── recursos/
│   ├── agentes-ia-empresas/
│   ├── agentes-ia-vs-rpa/
│   ├── como-elegir-empresa-automatizacion-ia/
│   └── calculadora-roi-automatizacion/
├── precios/
└── casos-de-exito/
```

No es imprescindible usar `/servicios/` o `/recursos/` en la URL; lo importante es mantener la relación semántica y los enlaces. La estructura evita intentar posicionar una entrada de blog para búsquedas claramente comerciales.

### Regla de intención y tipo de página

- **Servicio:** automatizar soporte, conciliación, leads, pedidos y despliegue GCP. Debe incluir proceso, integraciones, controles, prueba, FAQ y CTA.
- **Comparación:** agentes vs RPA. Debe ser equilibrada y reconocer casos donde RPA es mejor.
- **Pilar informativo:** qué son agentes, IA en operaciones y adopción en pymes. Debe informar antes de vender.
- **Página comercial:** precio, rangos, alcance y condiciones.
- **Herramienta:** ROI y diagnóstico de procesos; utilidad visible sin bloquear todo detrás de un formulario.
- **Prueba:** casos de éxito y opiniones solo con clientes, permisos y datos verificables.

## Historias de usuario derivadas de las consultas

Estas historias se derivan de señales del export, no de una muestra SERP en vivo:

1. **Como director de una pyme española**, quiero saber qué proceso automatizar primero porque necesito un quick win, pero me bloquea no poder estimar dificultad, riesgo e impacto.  
   *Señales: “qué procesos de una pyme…”, “primeros pasos…”, “IA para pymes España”.*
2. **Como responsable de operaciones**, quiero comparar el ahorro de pedidos, soporte, finanzas y ventas porque debo priorizar presupuesto, pero me bloquean cifras sin metodología.  
   *Señales: “reducir costes logísticos”, “reducir DSO”, “ROI automatización procesos”.*
3. **Como evaluador técnico**, quiero entender el despliegue en GCP y la diferencia frente a RPA porque debo garantizar integración y control, pero me falta arquitectura verificable.  
   *Señales: “despliegue agentes IA nube”, “GCP automatización procesos”, “agentes IA vs RPA”.*
4. **Como dueño de un proceso funcional**, quiero ver mi flujo exacto automatizado porque busco reducir carga operativa, pero una home generalista no resuelve mis excepciones e integraciones.  
   *Señales: conciliación, impagos, cualificación de leads, soporte y pedidos.*
5. **Como comprador listo para decidir**, quiero validar precio, reputación y resultados porque contrataré un partner, pero no encuentro rangos, clientes ni opiniones verificables.  
   *Señales: “precio…”, “opiniones”, “mejor empresa…”, “llave en mano España”.*

## Persona scoring de la home

| Persona | Relevancia | Claridad | Confianza | Acción | Total | Diagnóstico |
|---|---:|---:|---:|---:|---:|---|
| Director de pyme | 16/25 | 15/25 | 8/25 | 17/25 | **56/100** | Necesita segmentación pyme, diagnóstico y contexto España. |
| Responsable de operaciones | 19/25 | 18/25 | 10/25 | 18/25 | **65/100** | Casos relevantes; faltan evidencia y cálculo propio. |
| Evaluador técnico | 17/25 | 15/25 | 9/25 | 15/25 | **56/100** | Reconoce GCP y controles, pero no puede evaluar arquitectura o seguridad. |
| Dueño de proceso funcional | 18/25 | 19/25 | 10/25 | 17/25 | **64/100** | Encuentra su caso rápido, sin profundidad de integración/excepciones. |
| Comprador de validación | 11/25 | 9/25 | 4/25 | 12/25 | **36/100** | Mismatch crítico: no hay precio, identidad completa, opiniones o casos verificables. |

La dimensión sistémicamente más débil es **Confianza**. Añadir más CTAs no resolverá esa brecha; primero hay que aportar identidad, prueba, fuentes y transparencia comercial.

## Brief mínimo por página prioritaria

### `/automatizacion-ia-pymes/` — P1

- **Primary:** transformación digital pymes / IA para pymes España.
- **Respuesta inicial:** qué automatizar, cómo priorizar y qué resultados medir.
- **Secciones:** diagnóstico de madurez; matriz impacto/esfuerzo/riesgo; roadmap 30‑60‑90 días; datos y sistemas necesarios; seguridad/RGPD; coste; primeros pasos; FAQ.
- **Prueba obligatoria:** ejemplos de pymes españolas anonimizados solo si son reales; de lo contrario, escenarios claramente rotulados.
- **CTA:** “Solicitar diagnóstico de 30 minutos” y descarga de checklist para TOFU.

### Cuatro páginas de proceso — P1

Cada servicio debe evitar una plantilla superficial y aportar contenido propio:

1. Flujo actual y puntos de fallo.
2. Qué decisiones toma el agente y cuáles conserva una persona.
3. Sistemas e integraciones concretas.
4. Excepciones, guardarraíles y trazabilidad.
5. Tiempo de despliegue y esfuerzo del cliente.
6. Métricas de éxito con fórmula.
7. Caso real o escenario identificado como simulado.
8. FAQ de compra y CTA.

Suelo orientativo: **800+ palabras útiles por página de servicio**, sin convertirlo en objetivo rígido.

### `/agentes-ia-vs-rpa/` — P1

- Matriz: tipo de input, variabilidad, razonamiento, mantenimiento, auditabilidad, latencia, coste y riesgo.
- Árbol de decisión: RPA, workflow clásico, agente de IA o combinación.
- Ejemplos donde **no** conviene usar agentes.
- Tabla comparativa visible, pros/contras equilibrados y conclusión por caso de uso.
- Enlaces a GCP, páginas de proceso y calculadora de ROI.

### `/precios/` y `/calculadora-roi-automatizacion/` — P1

- Desglosar diagnóstico, blueprint, piloto, cuota recurrente, infraestructura, integraciones y consumo.
- Si no se publican importes, ofrecer rangos por escenario y explicar por qué varían.
- Calculadora con entradas editables: volumen, minutos por tarea, coste/hora, error/retrabajo, paralelismo, coste mensual y periodo.
- Mostrar fórmula, supuestos, sensibilidad y aviso de que el resultado es estimación.
- Enlazar a un ejemplo de presupuesto, pero no depender de un PDF oculto para responder la consulta.

### `/casos-de-exito/` — P0

- Nombre/sector/tamaño del cliente con autorización, o anonimización explicada.
- Situación inicial, alcance, plazo, integraciones, intervención humana y límites.
- Métrica antes/después, periodo, muestra y fórmula.
- Testimonio atribuible y contacto/entidad verificable cuando sea posible.
- Diferenciar prueba piloto, proyección y resultado en producción.

## Enlazado interno recomendado

- La home enlaza a cada página de servicio desde el chip/caso correspondiente, no solo mediante anclas.
- Cada servicio enlaza a `agentes-ia-vs-rpa`, `precios`, `calculadora-roi-automatizacion` y a un caso de éxito relevante.
- El hub de pymes enlaza al diagnóstico y a los cuatro servicios por necesidad, no por keyword exacta.
- La guía de agentes enlaza a la comparación y a cada caso de uso; las páginas comerciales devuelven enlaces hacia la guía cuando el usuario aún está aprendiendo.
- Usar anchors descriptivos (“automatización de conciliación bancaria”), evitando repetir de forma forzada la misma frase exacta.

## Plan priorizado

### P0 — antes de escalar contenido

1. Completar titular/responsable, NIF y domicilio en aviso legal y privacidad.
2. Publicar identidad del equipo, credenciales y vías de contacto consistentes; completar `Organization` con datos verificables.
3. Auditar todas las cifras actuales. Añadir fuente/metodología o reescribirlas como escenarios; no llamarlas “casos de uso con resultados” si son proyecciones.
4. Reunir prueba real para una página de casos de éxito/opiniones. Si todavía no existe, no fabricar testimonios.

### P1 — primera ola editorial/comercial

1. Crear `/automatizacion-ia-pymes/` y el diagnóstico de procesos.
2. Publicar las cuatro páginas de proceso: finanzas, pedidos, leads y soporte.
3. Publicar `/agentes-ia-vs-rpa/`.
4. Publicar `/precios/` y la calculadora de ROI.
5. Reorientar `<title>` de la home a español y convertir bloques actuales en enlaces hacia las nuevas URLs.

### P2 — profundidad y autoridad

1. Crear la guía pilar `/agentes-ia-empresas/`.
2. Crear `/automatizacion-google-cloud/` con arquitectura real, seguridad y fuentes primarias.
3. Añadir contexto español solo donde sea demostrable: RGPD, residencia/regiones de datos, fiscalidad o integraciones; evitar “España” como mero modificador.
4. Desarrollar prospección B2B y e‑commerce únicamente si forman parte real de la oferta.

### P3 — selección de proveedor

Publicar la guía “cómo elegir empresa de automatización IA” cuando Involution pueda respaldar cada criterio con evidencia propia. No usar “mejor empresa” como afirmación autorreferencial sin comparativa y prueba independientes.

## KPIs de validación

- URLs válidas indexadas y clics por clúster en Search Console.
- Consultas no‑brand por página e intención; evitar que la home siga capturando todo.
- Impresiones y CTR de modificadores `pymes`, `España`, `precio`, `RPA`, `GCP` y cada proceso.
- Leads orgánicos por landing y CTA, no solo sesiones.
- Uso y finalización de diagnóstico/calculadora.
- Citas o menciones en AI Overviews, AI Mode, ChatGPT, Perplexity y Bing Copilot, registradas por consulta y URL.
- Backlinks/menciones hacia casos, datos o herramientas; son mejores señales de autoridad que publicar volumen genérico.
- Ratio de páginas con autor/revisor, fecha visible, fuentes primarias y `dateModified` honesto.

## Limitaciones

- El export no proporciona volúmenes, dificultad, CPC ni SERP; solo etiquetas de oportunidad para 30 keywords secundarias y las dos ideas iniciales. Las 10 cabeceras de tema no tienen etiqueta propia.
- No se usaron datos bloqueados de AnswerThePublic ni se extrapolaron volúmenes.
- La clasificación de intención se basa en la semántica de las consultas y en la página publicada. Debe validarse con una muestra SERP real antes de cerrar títulos, formato y prioridad definitiva.
- No se dispuso de Search Console, Analytics, CRM, datos de conversión, backlinks o testimonios internos.
- La auditoría de contenido se realizó sobre la versión pública servida el 17‑08‑2026. El sitemap publicado incluía tres URLs.
