# Diferencias entre los PDF y los proyectos `.sb3`

Regla aplicada: el PDF es la instrucción principal. Los proyectos completos son referencias internas y no forman parte del paquete del alumno. El inventario reproducible está en `internal/sb3-audit-manifest.json`.

| Actividad | Proyecto interno | Evidencia técnica | Diferencia o alcance |
|---|---|---:|---|
| Tomo 1, actividad 1 | No existe | - | La actividad fuente es una hoja de patrones; la plataforma aplica la adaptación digital autorizada. |
| Tomo 1, actividad 2 | `Hola_mundo.sb3` | 7 bloques | El PDF llama al personaje **Niko**; el `project.json` nombra el sprite **Teslin**. La interfaz conserva Niko porque el PDF es principal. |
| Tomo 1, actividad 3 | `Deteccion_de_rostros.sb3` | 21 bloques | El PDF llama al personaje **Niko**; el `project.json` nombra el sprite **Teslin**. La interfaz conserva Niko. |
| Tomo 1, actividad 4 | `Cat_and_mouse_ia.sb3` | 42 bloques | El proyecto confirma `Mouse1`, `Cat 2` y las variables `score` y `speed`. |
| Tomo 1, actividad 5 | `Flappy_bird_IA.sb3` | 39 bloques | El proyecto confirma `bird`, `pipes` y `score`. |
| Tomo 1, actividad 6 | `Batalla Espacial con IA.sb3` | 166 bloques | El proyecto usa `score_float` y los mensajes `Game Over` y `You Win`; esos nombres no se normalizan. |
| Recurso adicional 7 | `Fruit Ninja IA.sb3` | 91 bloques | El ZIP no contiene instrucciones escritas. No se deriva un tutorial del proyecto. |
| Tomo 2, actividad 1 | `Hola_mundo.sb3` | 7 bloques | El proyecto confirma el sprite `Niko`. |
| Tomo 2, actividad 2 | `Deteccion_de_rostros.sb3` | 21 bloques | El proyecto confirma el sprite `Niko`. |
| Tomo 2, actividad 5 | `Reconocimiento_facial.sb3` | 45 bloques | Se usa solo para comprobar la estructura interna; el PDF sigue siendo la guía visible. |
| Tomo 2, actividad 6 | `Puerta_inteligente.sb3` | 50 bloques | Se usa solo para comprobar la estructura interna; la secuencia visible procede del PDF. |
| Tomo 2, actividad 7 | `Reconocimiento_de_voz.sb3` | 15 bloques | Se usa solo para comprobar la estructura interna; la secuencia visible procede del PDF. |
| Tomo 2, actividad 8 | `Casa_inteligente.sb3` | 30 bloques | El proyecto confirma los mensajes `apagar` y `encender` y un sprite llamado literalmente `ligth_off`. |

Las imágenes comprobables necesarias se extrajeron sin reconstrucción. Su trazabilidad permanece exclusivamente en `internal/source-data/pdfEmbeddedVisuals.json`; la interfaz del alumno sólo muestra los apoyos visuales asignados a cada paso y permite ampliarlos.
