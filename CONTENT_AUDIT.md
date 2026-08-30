# AUDITORÍA DE CONTENIDO Y EXTRACCIÓN PEDAGÓGICA (CONTENT_AUDIT.md)

**Plataforma Educativa:** PictoBlox IA Educativa  
**Autor de los textos originales:** Ing. Edison Sasig (Roboticoss)  
**Año de edición:** 2026  
**Fecha de auditoría:** 2026-08-23  

---

## 1. Resumen Ejecutivo de la Auditoría

Se realizó una extracción exhaustiva, textual y pedagógica de los materiales educativos suministrados:
1. **Documento 1:** *Inteligencia Artificial Educativa - Aprende IA Jugando (Segunda edición - 2026)* — 6 Prácticas.
2. **Documento 2:** *Inteligencia Artificial Educativa - IA para Casas Inteligentes (Primera edición - 2026)* — 6 Actividades de Laboratorio (Actividades 1, 2, 5, 6, 7 y 8; respetando estrictamente la numeración original del autor).
3. **Paquete de Recursos:** *Actividades de Laboratorio 2(1).zip* — Archivos de proyectos `.sb3`, sprites, disfraces, audios y secuencias de fondos.

---

## 2. Auditoría Detallada por Tomo y Práctica

### TOMO 1: Aprende IA Jugando (2da Edición 2026)

| ID | Título del Libro | Extensión PictoBlox | Bloques Principales Extraídos | Simulador Interactivo |
|---|---|---|---|---|
| `t1-act1` | **Práctica 1: ¡Descubre el patrón!** | Bloques lógicos nativos | Comparación de secuencias, patrones geométricos, deducción algorítmica. | Laboratorio interactivo de 4 secuencias de patrones. |
| `t1-act2` | **Práctica 2: ¡Hola, Mundo de la IA!** | Text to Speech (Texto a Voz) | `fijar idioma a Spanish`, `asignar voz a alto`, `decir [Hola Mundo]`, `cambiar fondo`, `al presionar bandera verde`. | Sintetizador de voz web en vivo con avatar de Niko. |
| `t1-act3` | **Práctica 3: Detector de Rostro con IA** | Face Detection + Text to Speech | `turn on video on stage with 30% transparency`, `analizar imagen desde camera`, `¿se detecta cara?`, `bounding box`. | Detección de presencia, simulación de cámara, reconocimiento de landmarks. |
| `t1-act4` | **Práctica 4: El Gato y el Ratón con IA** | Face Detection | `x position of nose de cara 1`, `y position of nose de cara 1`, `crear clon de Cat 2`, variables `score` y `speed`. | Mini-juego jugable con control de nariz / cursor esquivando 3 gatos. |
| `t1-act5` | **Práctica 5: Flappy Bird con IA** | Face Detection | Navegación 2D con la nariz, generación de tuberías con clones, límites de pantalla `y > 180`, detección de colisión. | Flappy Bird jugable en 2D con puntuación por tubería superada. |
| `t1-act6` | **Práctica 6: Batalla Espacial con IA** | Face Detection | Control vertical de la nave defensora, disparo de proyectiles Láser, 3 tipos de naves enemigas con puntajes (1, 5 y 10 pts), condición de victoria `score > 100`. | Juego de nave espacial con puntuación, disparos continuos y victoria. |

---

### TOMO 2: IA para Casas Inteligentes (1ra Edición 2026)

| ID | Numeración Original del Libro | Extensión PictoBlox | Bloques Principales Extraídos | Simulador Interactivo |
|---|---|---|---|---|
| `t2-act1` | **Actividad 1: Primeros Pasos con PictoBlox** | Entorno base | Interfaz, sprites de casa inteligente, escenarios, bandera verde, parada, disfraces. | Explorador de interfaz y conceptos domóticos. |
| `t2-act2` | **Actividad 2: Detección de Presencia en la Entrada** | Face Detection + Text to Speech | `turn on video on stage with 0% transparency`, `analizar imagen desde camera`, `decir [Bienvenido a casa]` al detectar presencia. | Simulador de cámara con cuadro delimitador y saludo de bienvenida. |
| `t2-act5` | **Actividad 5: Reconocimiento Facial: ¡Tu Rostro es la Llave!** | Face Detection (Entrenamiento) | `añadir clase 1 a rostro`, `emparejar cara`, tecla `T` para entrenar, tecla `Espacio` para validar acceso. | Módulo interactivo de entrenamiento facial y validación biométrica. |
| `t2-act6` | **Actividad 6: Puerta Inteligente con Reconocimiento Facial** | Face Detection + Animación de Puerta | Secuencia de 14 fondos para apertura fluida de puerta (`siguiente fondo` x 13 veces), mensaje `abrir_puerta`, denegación de intrusos. | Animación 3D/perspectiva de puerta inteligente con 14 fotogramas. |
| `t2-act7` | **Actividad 7: Reconocimiento de Voz: Modo Loro** | Speech Recognition + Text to Speech | `set speech recognition language to Spanish`, `start listening for 5 seconds`, `speech recognition result`, `decir [speech recognition result]`. | Reconocimiento por Web Speech API con repetición de voz. |
| `t2-act8` | **Actividad 8: Luces que Obedecen tu Voz** | Speech Recognition + Text to Speech | Operador de texto `¿[encender] está en [speech recognition result]?`, mensajes broadcast `encender_luz` y `apagar_luz`, cambio de disfraces de lámpara (`light_on`, `light_off`). | Control domótico por voz real o botones de comandos rápidos. |

---

## 3. Elementos Pedagógicos Verificados en Cada Práctica

- **Objetivos de aprendizaje:** 100% alineados con las metas didácticas del libro.
- **Materiales requeridos:** Especificación de hardware (computadora, cámara web, micrófono, conexión a internet).
- **Extensiones requeridas:** Indicación clara de módulos de PictoBlox necesarios.
- **Pasos de programación secuenciales:** Divididos en sub-instrucciones con visualización de bloques y modo guiado / todos los pasos.
- **Desglose pedagógico del bloque ("¿Qué hace este bloque?"):** Evento, Acción, Condición, Datos de IA, y Resultado esperado.
- **Zona de Experimentación:** Preguntas y variantes (ej. taparse un ojo, velocidad speed, camuflaje, intruso) con guardado local y en la nube.
- **Mini Cuestionario de Comprobación:** Preguntas de opción múltiple con retroalimentación inmediata, explicación y puntaje.
- **Guía Docente / Padres:** Recomendaciones didácticas, lista de verificación previa y preguntas para el diálogo.
- **Descargas:** Archivos `.sb3` listos para abrir en PictoBlox.
