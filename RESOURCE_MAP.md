# Mapa de recursos

`src/data/sourceManifest.json` es el mapa canónico de procedencia por actividad, página y ruta de archivo fuente.

## Recursos públicos

Solo se publican materiales que el alumno necesita para construir: imágenes, fondos, sprites, secuencias y la hoja de patrones. Cada `fileUrl` se comprueba automáticamente para evitar rutas vacías o inexistentes.

Los recursos de “Fruta Ninja IA” visibles son `Fondo Tablilla de corte.svg`, `Frutas.sprite3`, `Katana.png` y `game_over.png`.

## Proyectos internos

Los `.sb3` originales permanecen dentro de los ZIP fuente o en `internal/reference-projects/` como respaldo recuperable. Sirven únicamente para auditar opcodes, entradas, menús, variables, mensajes y sprites, y para producir referencias visuales. Nunca deben copiarse a `public/`, incluirse en `dist/`, aparecer en el modelo público ni ofrecerse como descarga.

Los archivos AppleDouble `._*` retirados de `public/` están en `internal/quarantine-macos/`; no cuentan como recursos educativos.

## Referencias visuales

Las 196 páginas completas están protegidas en `internal/source-page-captures/` y no se publican. La interfaz recibe únicamente los apoyos visuales recortados que necesita cada actividad; su trazabilidad técnica permanece en `internal/source-data/pdfEmbeddedVisuals.json`.
