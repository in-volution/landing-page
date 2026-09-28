# Plan de integración del frontend de Involution

## Objetivo y criterio de diseño

Usar `involution-landing-page` como sitio principal y sumar los recursos visuales e interacciones útiles de `Involution_web-main/web`. El resultado seguirá siendo un sitio estático publicable en GitHub Pages. La oferta comercial de la landing actual abarca voz, vídeo y análisis de imagen. La portada adopta la tipografía y la paleta del frontend nuevo, mientras conserva el logotipo **Despliegue** y los metadatos de marca existentes.

Tras decidir usar la apariencia de la página nueva como base, la pieza visual distintiva es su núcleo de partículas 3D. Sustituye al vídeo de fondo y al aura React. Se conservan la identidad Despliegue, el alcance comercial de la landing actual y sus contactos.

## Qué se integra

| Zona                  | Acción propuesta                                                                                                                                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navegación y hero     | Usar la estructura y el núcleo 3D de la página nueva, con mensaje de voz, vídeo y análisis visual. El CTA abre WhatsApp.                                                                                                                     |
| Capacidades           | Aprovechar la presentación y microinteracciones de las tarjetas nuevas, pero usar el contenido actual de canales, análisis visual e integraciones. Eliminar bloques que repitan la misma idea.                                               |
| Cómo funciona         | Adaptar la visualización de arquitectura al flujo real de la landing: canal elegido → interpretación de voz o imagen → reglas acordadas → respuesta, solicitud o derivación. No fijar proveedores ni integraciones como requisito universal. |
| Ejemplos              | Si se incorporan tarjetas de conversación, organizarlas por necesidad y canal, no por sector. Identificarlas como ejemplos ilustrativos y evitar resultados que parezcan operaciones realmente completadas.                                  |
| Proceso, FAQ y cierre | Conservar los cuatro pasos, respuestas, CTA y footer actuales. Añadir movimiento solo donde ayude a entender el proceso.                                                                                                                     |

## Qué queda fuera en esta fase

- La pantalla de conversación con Lía y los botones «Solicitar demo» / «Iniciar conversación».
- `web/src/demo/`, `web/src/live/`, `web/src/audio/`, los AudioWorklets y toda llamada a `/live`.
- `server/`, Gemini Live, credenciales, acceso a Google Calendar y creación de reuniones.
- Las afirmaciones del frontend nuevo como «<1 s», «24/7», «90+ idiomas», citas creadas y una pila tecnológica fija, salvo que se validen por separado antes de publicarse.

## Arquitectura de implementación

1. Mantener los metadatos SEO, las páginas legales y el contenido comercial del repositorio actual. `styles.css` queda para las páginas legales.
2. Compilar `experience/` como módulo visual estático a `assets/experience/` y retirar la antigua isla React `voice-widget/`.
3. Adaptar el núcleo 3D, las interacciones y el sistema visual del nuevo frontend. El punto de entrada se reescribe sin demo en vivo ni Lenis.
4. Usar el CSS visual de la página nueva en la portada, con el logotipo Despliegue. Las páginas legales mantienen su CSS anterior.
5. Usar scroll nativo y GSAP/ScrollTrigger para las animaciones de la portada. No se incluye Lenis.
6. Usar el canvas original como fondo ambiental, reducir calidad en móviles y omitirlo si WebGL no está disponible o se prefiere menos movimiento.
7. Actualizar `package.json` y `.github/workflows/deploy.yml` para publicar solo archivos estáticos.

## Orden de trabajo

1. **Base visual:** guardar capturas de escritorio y móvil; listar secciones, enlaces y metadatos que deben permanecer. Fijar el texto final de cada bloque antes de copiar animaciones.
2. **Hero:** portar el núcleo 3D, adaptarlo a la marca y medir su efecto en carga y legibilidad. Retirar vídeo y aura cuando el reemplazo esté aprobado visualmente.
3. **Secciones:** integrar capacidades y arquitectura; decidir con la página montada si los ejemplos aportan información que aún falta. Ajustar navegación y anclas.
4. **Limpieza:** retirar módulos y dependencias de voz en vivo no usados, CSS duplicado y activos sobrantes. Actualizar documentación y despliegue.
5. **Verificación:** ejecutar `npm run check`, revisar la compilación y probar escritorio y móvil, teclado, lectura sin animaciones, WebGL desactivado y enlaces de contacto. Comprobar en la pestaña de red que no aparecen conexiones a `/live` ni solicitudes de micrófono.

## Criterios de aceptación

- La página comunica voz, vídeo y análisis visual con una sola identidad visual y sin secciones repetidas.
- Todos los CTA disponibles funcionan en GitHub Pages y describen su acción real: contacto por WhatsApp, teléfono o correo.
- La página sigue siendo legible y utilizable sin JavaScript, sin WebGL y con movimiento reducido.
- No se publica código de servidor, claves, lógica de reserva ni una demo de voz aparentemente funcional.
- Se conservan canonical, datos estructurados, sitemap, páginas legales y enlaces internos válidos.
