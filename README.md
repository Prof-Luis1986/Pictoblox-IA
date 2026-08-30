# PictoBlox IA Educativa — Plataforma Interactiva de Inteligencia Artificial para Niños y Jóvenes

Plataforma educativa web diseñada para acompañar y enriquecer el aprendizaje práctico de Inteligencia Artificial y programación por bloques utilizando el entorno **PictoBlox**.

Basado en la metodología didáctica del **Ing. Edison Sasig (Roboticoss)** contenida en los textos:
- *Inteligencia Artificial Educativa - Aprende IA Jugando (Segunda edición - 2026)*
- *Inteligencia Artificial Educativa - IA para Casas Inteligentes (Primera edición - 2026)*

---

## Características Principales

1. **Estructura Pedagógica Integral:**
   - **2 Rutas de Aprendizaje (Tomos 1 y 2):** Cubre desde los conceptos fundamentales de detección de patrones y visión artificial, hasta reconocimiento facial biométrico y domótica controlada por voz.
   - **12 Prácticas Completas:** Cada una con objetivos claros, materiales, extensiones de PictoBlox, guía paso a paso, diagrama de bloques y zona de experimentación.

2. **Visor de Bloques Interactivo y Desglose Pedagógico:**
   - Visualización de bloques con los colores auténticos de PictoBlox y Scratch (Eventos, Control, Sensores, Operadores, Variables, Detección Facial, Voz, etc.).
   - Modo de pantalla completa con controles de zoom (+/-), desplazamiento (pan) y rotación.
   - Desglose explicativo de cada bloque: **Evento**, **Acción**, **Condición**, **Datos de IA** y **Resultado Esperado**.

3. **Laboratorios de Simulación en Vivo:**
   - Simuladores interactivos directamente en el navegador:
     - **Patrones lógicos:** Deducción de secuencias geométricas.
     - **Detector de Rostro:** Simulación de cámara, cuadro delimitador y síntesis de voz con Niko.
     - **Gato y Ratón:** Mini-juego jugable con esquiva de clones.
     - **Flappy Bird IA:** Navegación aérea entre tuberías.
     - **Batalla Espacial:** Disparo de láseres y puntuación contra enemigos.
     - **Puerta Inteligente y Entrenamiento Facial:** Registro de Clase 1 y animación de apertura de 14 fotogramas.
     - **Lámpara Inteligente por Voz:** Control de iluminación por Web Speech API y comandos domóticos.

4. **Zona de Experimentación y Comprobación:**
   - Cuestionarios interactivos con retroalimentación instantánea, explicaciones y cálculo de puntaje.
   - Registro de hallazgos experimentales (cambios de iluminación, camuflaje, velocidades).

5. **Persistencia Híbrida y Privacidad:**
   - Guardado automático e inmediato en el navegador del estudiante (`localStorage`).
   - Sincronización en la nube con Firebase Firestore sin requerir correos electrónicos ni contraseñas.
   - Respeto total de la privacidad infantil: las imágenes y la voz se procesan localmente.

6. **Guía para Instructores y Padres:**
   - Orientaciones docentes, listas de verificación previa y preguntas detonadoras de reflexión para el aula o el hogar.

---

## Tecnologías Utilizadas

- **Frontend:** React 19 + TypeScript + Vite
- **Estilos & Diseño:** Tailwind CSS
- **Iconografía:** Lucide React
- **Efectos y Celebraciones:** Canvas Confetti
- **Persistencia en la Nube:** Firebase Firestore & Anonymous Auth
- **Audio & Reconocimiento:** Web Speech API (SpeechSynthesis & SpeechRecognition)

---

## Ejecución del Proyecto

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

---

## Créditos y Reconocimientos

- **Autor de los textos pedagógicos:** Ing. Edison Sasig (Roboticoss)
- **Plataforma Educativa STEAM:** Desarrollada para la formación tecnológica de niños y jóvenes.
