# Producto de Involution · Borrador v0

## En una frase

Involution diseña asistentes de voz con IA en tiempo real para negocios. Un cliente puede hablar con el asistente desde una web, una app o una llamada telefónica. El asistente entiende la petición, aplica la lógica del negocio y responde por voz, con un siguiente paso definido para cada caso.

La atención telefónica y los flujos de contact center son casos de uso importantes, pero el producto no depende de la telefonía como único canal.

## Primer problema a resolver

Un único asistente recibe consultas, responde dentro del alcance aprobado y recoge el contexto necesario para que el equipo pueda continuar. La primera versión debe resolver una conversación frecuente de principio a fin, con una experiencia sencilla para el cliente.

## Alcance funcional propuesto

1. Permitir que el cliente hable desde la web, una app o por teléfono, según el canal elegido.
2. Transmitir su voz al asistente en tiempo real.
3. Reconocer el motivo y consultar documentación o fuentes aprobadas por el negocio.
4. Responder por voz y recoger los datos necesarios para el caso de uso elegido.
5. Dejar una solicitud clara al equipo o derivar la conversación cuando esté fuera de alcance.
6. Usar herramientas MCP o integraciones a medida para consultar sistemas y completar acciones concretas cuando la conexión y los permisos estén acordados.

El primer despliegue debe centrarse en **un tipo de conversación y un canal concretos**. La agenda, el CRM, el software del negocio y cualquier acción automática sobre ellos se especifican por integración; no se presuponen. En web y app, la voz puede conectarse mediante SDK; en telefonía, mediante la integración SIP correspondiente.

## Límites del mensaje comercial

- Hablar de **asistentes de voz en tiempo real** para web, app y teléfono, sin reducir el producto a llamadas.
- Presentar un solo asistente adaptable, sin dividir la oferta por sectores.
- Explicar el producto como un flujo de atención con respuesta, recogida de contexto y continuidad del caso.
- No prometer disponibilidad permanente, porcentajes de resolución, ahorro, plazos de implantación ni citas confirmadas sin evidencia o integración validada.

## Decisiones pendientes

- Canal prioritario del primer despliegue: web, app o teléfono.
- Si se usa telefonía, alcance de llamadas: solo entrantes o también salientes.
- Idiomas y variantes de voz prioritarios.
- Forma de derivación: transferencia en directo, aviso al equipo, resumen posterior o combinación.
- Integraciones del canal elegido y, si corresponde, sistema de telefonía del negocio.
- Tratamiento de grabaciones, datos personales y consentimiento.
- Modelo comercial, soporte y métricas de calidad que se mostrarán al cliente.
