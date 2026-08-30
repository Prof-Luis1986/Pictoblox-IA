import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'aprende-ia-jugando',
    tomo: 1,
    title: 'Aprende IA Jugando',
    subtitle: 'Módulo 1: Detección de Patrones y Control por Visión',
    edition: 'Segunda edición - 2026',
    author: '',
    description: 'Descubre qué es la Inteligencia Artificial, cómo aprenden las computadoras mediante patrones y crea videojuegos interactivos controlados en tiempo real por visión artificial (cámara, rostro y nariz) en PictoBlox.',
    summaryPoints: [
      'Algoritmos y detección de patrones lógicos en tiempo real',
      'Entorno de desarrollo PictoBlox y arquitectura de bloques',
      'Síntesis de voz digital y primeros protocolos ("Hola Mundo")',
      'Detección de puntos faciales (landmarks) y coordenadas espaciales',
      'Videojuegos interactivos: Gato y Ratón, Flappy Bird y Batalla Espacial'
    ],
    coverGradient: 'from-emerald-950 via-slate-950 to-cyan-950',
    accentColor: 'emerald',
    sections: [
      {
        id: 't1-sec1',
        sectionNumber: 1,
        title: 'Sección 1: Descubriendo la Inteligencia Artificial',
        summary: 'Acompaña a Niko en su descubrimiento de la IA, los algoritmos de recomendación, la detección de movimiento y cómo las máquinas aprenden mediante patrones.',
        concepts: [
          {
            title: '¡Vamos a Empezar! La historia de Niko',
            content: [
              '¡Hola, soy Niko! 👋 Me gusta la ciencia y la tecnología. Siempre estoy descubriendo cómo funcionan las cosas. Hoy vamos a comenzar un nuevo viaje...',
              'Un día estaba usando mi celular y empecé a ver videos en YouTube. Veía uno... luego otro... y después aparecían videos que también me gustaban. Era como si el celular supiera lo que quería ver.',
              '¿Cómo saben qué me gusta ver? El algoritmo de YouTube empezaba a notar lo que yo veía, analizaba mis gustos y comenzaba a repetirme contenido similar. En realidad, estaba detectando ciertos patrones en lo que yo hacía.',
              'También lo he visto en videojuegos interactivos como Kinect de Xbox: este dispositivo detecta los movimientos del cuerpo (manos, saltos, desplazamientos) en tiempo real.'
            ],
            keyPoints: [
              '1. Analizar información (datos y gustos)',
              '2. Detectar patrones en lo que hacemos',
              '3. Responder y tomar decisiones automáticamente'
            ]
          },
          {
            title: '¿Qué es realmente la Inteligencia Artificial?',
            content: [
              'La Inteligencia Artificial (IA) es una tecnología que permite que las máquinas (como computadoras, celulares o robots) puedan realizar algunas tareas que normalmente haría una persona.',
              '• Imagen: detectar puntos clave del cuerpo y rostros en videojuegos interactivos.',
              '• Audio: reconocer comandos de voz para controlar acciones o luces.',
              '• Texto: comprender mensajes y responder preguntas.',
              '¡Importante! La IA NO es un cerebro humano. Las máquinas no tienen emociones ni pensamientos. ¿Cómo lo hacen? Aprenden a partir de datos e información: mientras más datos observan, mejor reconocen patrones para tomar decisiones.'
            ],
            keyPoints: [
              'Los patrones son la base de la Inteligencia Artificial',
              'La IA aprende observando datos y reglas repetitivas',
              'Crearás videojuegos interactivos controlados por tu propia cámara'
            ]
          }
        ],
        practices: ['t1-act1']
      },
      {
        id: 't1-sec2',
        sectionNumber: 2,
        title: 'Fase 2: Arquitectura del Entorno PictoBlox',
        summary: 'Explora la estación de programación visual: escenario de renderizado, sprites autónomos, buses de eventos y extensiones de IA.',
        concepts: [
          {
            title: 'Lógica y Estructura de Bloques',
            content: [
              'PictoBlox es un entorno de desarrollo para computación visual y robótica que integra algoritmos de Machine Learning y visión por computadora.',
              'Cada categoría de bloque representa una capa del sistema: Movimiento (coordenadas espaciales), Eventos (triggers reactivos), Control (bucles y condicionales) y Sensores (percepción del entorno).'
            ]
          }
        ],
        practices: ['t1-act2']
      },
      {
        id: 't1-sec3',
        sectionNumber: 3,
        title: 'Fase 3: Visión por Computadora y Control Cinético',
        summary: 'Procesa flujos de video para detectar rostros, aislar coordenadas X/Y de facciones clave y transformar el cuerpo en un controlador físico para videojuegos.',
        concepts: [
          {
            title: 'Detección Facial y Puntos Clave (Landmarks)',
            content: [
              'La visión artificial segmenta fotogramas de video identificando estructuras geométricas faciales: ojos, nariz y contornos.',
              'Al calcular las coordenadas espaciales (X, Y) de la nariz o centro facial, podemos vincular la posición del jugador al movimiento de personajes y naves en el espacio 2D.'
            ]
          }
        ],
        practices: ['t1-act3', 't1-act4', 't1-act5', 't1-act6', 't1-extra-act7']
      }
    ],
    practiceIds: ['t1-act1', 't1-act2', 't1-act3', 't1-act4', 't1-act5', 't1-act6', 't1-extra-act7']
  },
  {
    id: 'ia-casas-inteligentes',
    tomo: 2,
    title: 'IA para Casas Inteligentes',
    subtitle: 'Módulo 2: Reconocimiento Facial Biométrico y Control por Voz',
    edition: 'Primera edición - 2026',
    author: '',
    description: 'Implementa sistemas ciber-físicos de automatización y seguridad inteligente. Entrena modelos de Machine Learning para control de acceso biométrico y programa asistentes de reconocimiento de voz.',
    summaryPoints: [
      'Arquitectura de sistemas domóticos y sensores automatizados',
      'Entrenamiento de modelos de Machine Learning con clases de rostros',
      'Protocolos de autenticación biométrica y cerraduras automáticas',
      'Procesamiento de Lenguaje Natural y reconocimiento de voz ("Modo Loro")',
      'Sistemas de control domótico por comandos vocales y disparadores lógicos'
    ],
    coverGradient: 'from-cyan-950 via-slate-950 to-emerald-950',
    accentColor: 'cyan',
    sections: [
      {
        id: 't2-sec1',
        sectionNumber: 1,
        title: 'Fase 1: Sistemas Ciber-Físicos y Automatización Domótica',
        summary: 'Explora cómo los dispositivos conectados integran cámaras y micrófonos para monitorear estados y disparar acciones automáticas.',
        concepts: [
          {
            title: 'Ecosistemas Inteligentes',
            content: [
              'Los sistemas domóticos modernos combinan sensores de presencia, cámaras con redes neuronales y actuadores para gestionar accesos, iluminación y confort de manera autónoma.'
            ]
          }
        ],
        practices: ['t2-act1', 't2-act2']
      },
      {
        id: 't2-sec4',
        sectionNumber: 4,
        title: 'Fase 4: Biometría Facial y Seguridad Neuronal',
        summary: 'Entrena redes neuronales clasificadoras para identificar identidades específicas y autorizar accesos a compuertas de seguridad.',
        concepts: [
          {
            title: 'Clasificación y Emparejamiento Facial',
            content: [
              'A diferencia de la simple detección, el reconocimiento biométrico compara las características de la imagen capturada contra un conjunto de clases entrenadas previamente.',
              'El algoritmo calcula un porcentaje de certeza y emite una señal de coincidencia cuando la confianza supera el umbral de seguridad configurado.'
            ]
          }
        ],
        practices: ['t2-act5', 't2-act6']
      },
      {
        id: 't2-sec5',
        sectionNumber: 5,
        title: 'Fase 5: Procesamiento de Voz y Control por Comandos',
        summary: 'Transforma frecuencias de audio en cadenas de texto legibles por el procesador y ejecuta protocolos domóticos por voz.',
        concepts: [
          {
            title: 'Reconocimiento de Voz y Análisis Semántico',
            content: [
              'El módulo Speech Recognition convierte ondas de sonido en texto mediante modelos acústicos y de lenguaje.',
              'Mediante operadores de subcadenas ("¿[texto] está en [resultado]?"), el programa filtra comandos clave como "encender" o "apagar" para actuar sobre los dispositivos.'
            ]
          }
        ],
        practices: ['t2-act7', 't2-act8']
      }
    ],
    practiceIds: ['t2-act1', 't2-act2', 't2-act5', 't2-act6', 't2-act7', 't2-act8']
  }
];
