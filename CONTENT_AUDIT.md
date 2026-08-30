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
