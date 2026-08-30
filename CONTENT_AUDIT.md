# Auditoría de contenido

Fuentes de verdad: los dos PDF y los dos ZIP de la raíz. El manifiesto verificable está en `src/data/sourceManifest.json`.

## Política pedagógica

- Los proyectos completos `.sb3` son referencias internas de auditoría. No se publican, no se enlazan y no se ofrecen al alumno.
- La Actividad 1 del tomo 1 conserva su objetivo y secuencias, pero sustituye impresión, tijeras, recorte y pegado por interacción digital autorizada.
- “Fruta Ninja IA” se presenta como **Actividad adicional incluida en los recursos**. El ZIP no contiene instrucciones escritas; por ello no se inventa un tutorial.
- El contenido complementario de plataforma debe mostrarse separado del texto original.

## Estado verificable

El tomo 1 tiene 109 transcripciones/capturas internas de 109 páginas y el tomo 2 tiene 87 de 87. Las páginas compuestas únicamente como imagen están marcadas como `imageOnly`. Las imágenes incrustadas se extrajeron sin reconstrucción y conservan internamente su página de procedencia.

`npm test` valida hashes SHA-256 de las cuatro fuentes, actividades, numeración, cobertura por página, recursos públicos, capturas y recortes, limpieza de metadatos, protección de `.sb3` e integridad de `project.json` dentro de cada proyecto fuente.

La transcripción original se presenta en paneles diferenciados del contenido complementario histórico de la plataforma. Véanse `SOURCE_COVERAGE.md` y `SB3_DIFFERENCES.md`.

## Privacidad de la sesión académica

Nombre, grupo, progreso, respuestas, cuestionarios, calificaciones, notas y confirmaciones temporales se guardan con un prefijo exclusivo en `sessionStorage`. Sobreviven a una recarga normal de la misma pestaña y normalmente desaparecen al cerrar la pestaña o la sesión del navegador. El botón **Borrar mis datos de esta sesión** permite limpiar inmediatamente el estado local sin borrar entregas ya recibidas por servicios externos.

## Muro del Progreso

Las 12 prácticas principales declaran las etapas Problema, Idea, Diseño, Prototipo, Error y Rediseño. El muro funciona como un indicador compacto y como acompañamiento distribuido en el recorrido real: Problema e Idea junto al inicio; Diseño antes de construir; Prototipo envolviendo simulación y guía técnica; Error y Rediseño antes de las preguntas y evidencias finales. No existe una actividad paralela ni una tarjeta extensa que sustituya la práctica.

Cada paso técnico conserva su contenido y queda asociado explícitamente a una etapa. Prototipo se completa sólo cuando todos sus pasos obligatorios están terminados; las demás etapas reaccionan a la evidencia escrita correspondiente. Las respuestas se guardan sólo en `sessionStorage` y no se agregan al envío de Apps Script. Fruta Ninja IA utiliza una plantilla vacía de reto libre, sin instrucciones ni bloques resueltos inventados.

## Entregas confirmadas y comprobantes

La interfaz sólo registra una entrega como confirmada cuando Apps Script responde `status: success`, devuelve el mismo `submissionId`, una cantidad de evidencias y los enlaces reales de Drive. Las respuestas opacas o ilegibles quedan pendientes; los errores y los identificadores distintos fallan. Sólo una confirmación verificable activa confeti, fecha de entrega y generación del comprobante PDF.

El comprobante se genera con jsPDF en memoria, se descarga una sola vez automáticamente y puede volver a descargarse mientras el modal permanezca disponible. Después se carga a la carpeta de Drive mediante una segunda operación confirmable. Imágenes y PDF usan nombres seguros con alumno, grupo y fecha. La limpieza de sesión elimina las referencias locales, pero no elimina entregas, imágenes, PDF o sincronizaciones que ya estén almacenadas remotamente.

## Persistencia remota opcional

`firebase.ts` puede sincronizar el objeto `StudentProgress` en la colección `student_progress` de Firestore: identificador anónimo, nombre, grupo, pasos y prácticas completadas, cuestionarios, notas de experimentos, insignias y comprobantes de entregas confirmadas. No sincroniza respuestas del Muro, preguntas abiertas, imágenes Base64 ni el archivo PDF. “Terminar y borrar sesión” borra el estado académico del dispositivo, no los registros remotos ya confirmados.
