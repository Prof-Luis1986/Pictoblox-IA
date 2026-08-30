# MAPA DE RECURSOS Y ARCHIVOS DEL PROYECTO (RESOURCE_MAP.md)

Este documento detalla la estructura de archivos, recursos multimedia y proyectos descargables asociados a cada práctica de la plataforma.

---

## 1. Proyectos de PictoBlox (.sb3)

Todos los proyectos base y completos se encuentran disponibles para su descarga en `/public/resources/sb3/`:

| Práctica / Actividad | Archivo .sb3 | Ruta de Descarga | Función en PictoBlox |
|---|---|---|---|
| Tomo 1 - Práctica 1 | `t1-act1.sb3` | `/resources/sb3/t1-act1.sb3` | Plantilla de patrones lógicos y figuras geométricas. |
| Tomo 1 - Práctica 2 | `t1-act2.sb3` | `/resources/sb3/t1-act2.sb3` | Proyecto base "Hola Mundo" con síntesis de voz. |
| Tomo 1 - Práctica 3 | `t1-act3.sb3` | `/resources/sb3/t1-act3.sb3` | Detección de rostros y cuadro delimitador con cámara web. |
| Tomo 1 - Práctica 4 | `t1-act4.sb3` | `/resources/sb3/t1-act4.sb3` | Videojuego interactivo "El Gato y el Ratón" controlado con la nariz. |
| Tomo 1 - Práctica 5 | `t1-act5.sb3` | `/resources/sb3/t1-act5.sb3` | Videojuego "Flappy Bird IA" con tuberías dinámicas por clones. |
| Tomo 1 - Práctica 6 | `t1-act6.sb3` | `/resources/sb3/t1-act6.sb3` | Videojuego "Batalla Espacial" con proyectiles y enemigos. |
| Tomo 2 - Actividad 1 | `t2-act1.sb3` | `/resources/sb3/t2-act1.sb3` | Entorno base de la Casa Inteligente y bienvenida. |
| Tomo 2 - Actividad 2 | `t2-act2.sb3` | `/resources/sb3/t2-act2.sb3` | Detección de presencia y bienvenida domótica. |
| Tomo 2 - Actividad 5 | `t2-act5.sb3` | `/resources/sb3/t2-act5.sb3` | Reconocimiento Facial: Entrenamiento de Clase 1 y timbre. |
| Tomo 2 - Actividad 6 | `t2-act6.sb3` | `/resources/sb3/t2-act6.sb3` | Puerta Inteligente con animación cinematográfica de 14 fondos. |
| Tomo 2 - Actividad 7 | `t2-act7.sb3` | `/resources/sb3/t2-act7.sb3` | Reconocimiento de Voz "Modo Loro". |
| Tomo 2 - Actividad 8 | `t2-act8.sb3` | `/resources/sb3/t2-act8.sb3` | Control de lámpara inteligente por comandos de voz hablada. |

---

## 2. Recursos Gráficos y Sprites

- **Personajes (Sprites):**
  - `Niko` (Guía del estudiante / avatar asistente).
  - `Toby` (Compañero animado).
  - `Mouse 1` (Ratón protagonista en la práctica 4).
  - `Cat 2` (Gato perseguidor con clones en la práctica 4).
  - `Flappy Bird` (Pájaro en la práctica 5).
  - `Spaceship` & `Enemies` (Naves y proyectiles en la práctica 6).
  - `Lámpara Inteligente` (Disfraces `light_on` y `light_off`).
- **Fondos (Backdrops):**
  - `Smart House Entrance` (Fachada exterior con timbre).
  - `Living Room` (Sala con lámpara inteligente).
  - `Secuencia de 14 fondos de Puerta Inteligente` (Apertura progresiva).
  - `Espacio Exterior con Estrellas` (Batalla espacial).

---

## 3. Extensiones PictoBlox Requeridas

1. **Face Detection:** Extensión de visión artificial para análisis en tiempo real de video, obtención de bounding box, detección de puntos faciales (landmarks como nariz y ojos), y emparejamiento con clases entrenadas.
2. **Text to Speech (Texto a Voz):** Extensión de síntesis de voz multilingüe con selección de idioma y timbre vocal (alto, tenor, gigante, etc.).
3. **Speech Recognition (Reconocimiento de Voz):** Extensión de transcripción de voz a texto en tiempo real con soporte de idioma español.
