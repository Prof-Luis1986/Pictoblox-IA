import { Practice } from '../types';

export const PRACTICES_TOMO_2: Practice[] = [
  {
    id: 't2-act1',
    tomo: 2,
    courseId: 'ia-casas-inteligentes',
    number: 1,
    title: 'Actividad de Laboratorio 1: Primeros Pasos en PictoBlox (Smart Home)',
    shortTitle: '1. Primeros pasos en PictoBlox',
    iconName: 'Terminal',
    description: 'En esta actividad iniciaremos nuestra primera experiencia práctica dentro del laboratorio digital para comenzar a automatizar nuestra casa inteligente con Inteligencia Artificial.',
    learningObjective: 'Configurar el entorno digital, integrar el personaje Niko y habilitar el canal de comunicación por voz sintetizada.',
    previousConcepts: [
      'Introducción a las Casas Inteligentes y Domótica',
      'Relación entre IA y automatización del hogar',
      'Interfaz de PictoBlox y bloques de Eventos'
    ],
    requiredMaterials: [
      'Computadora / Tablet / Laptop con PictoBlox instalado'
    ],
    extensions: ['Texto a Voz (Text to Speech)'],
    sb3Project: {
      id: 'res-sb3-t2-hola',
      name: 'Proyecto Hola Mundo Smart Home (Hola_mundo.sb3)',
      fileName: 'Hola_mundo.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Hola_mundo.sb3',
      description: 'Proyecto base para el laboratorio de automatización del hogar inteligente.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-t2-lab-bg',
        name: 'Escenario Laboratorio Smart Home',
        fileName: 'Laboratorio.png',
        fileType: 'image',
        fileUrl: '/resources/images/Laboratorio.png',
        description: 'Fondo del laboratorio con tecnología domótica.',
        howToUse: 'Cargar en la sección Fondos.'
      },
      {
        id: 'res-t2-niko',
        name: 'Personaje Niko',
        fileName: 'Niko.png',
        fileType: 'image',
        fileUrl: '/resources/images/Niko.png',
        description: 'Sprite del asistente Niko.',
        howToUse: 'Cargar como nuevo sprite.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Abre PictoBlox',
        instructions: [
          'En el buscador del sistema operativo, escribe PictoBlox.',
          'Abre el programa y selecciona la opción "Bloques".'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Cambia el fondo del laboratorio',
        instructions: [
          'Ve a Fondos -> Cargar fondo.',
          'Selecciona la imagen "Laboratorio.png".',
          'Regresa directamente a la pestaña de Bloques sin realizar modificaciones en el editor de disfraces.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Cambia el personaje',
        instructions: [
          'Elimina el personaje que viene por defecto.',
          'Carga el sprite "Niko.png".',
          'Ubica a Niko en el escenario y dale un tamaño del 70%.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Inicia el programa',
        instructions: [
          'En la sección Eventos, arrastra el bloque "al hacer clic en [bandera verde]".'
        ]
      },
      {
        stepNumber: 5,
        title: 'Paso 5: Muestra el saludo en pantalla',
        instructions: [
          'En la sección Apariencia, agrega el bloque "decir [Hola, soy Niko]".',
          'Conéctalo debajo de la bandera verde.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Paso 6: ¡Prueba tu programa!',
        instructions: [
          'Presiona la bandera verde y comprueba que aparece la burbuja de texto sobre Niko.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Paso 7: Haz que Niko hable',
        instructions: [
          'Ve a Extensiones y agrega "Texto a Voz".',
          'Configura los bloques: fijar idioma a Spanish, asignar voz a tenor o chillido, y decir [Hola, soy Niko].'
        ]
      },
      {
        stepNumber: 8,
        title: 'Paso 8: ¡Prueba tu programa!',
        instructions: [
          'Presiona la bandera verde y verifica que Niko salude visualmente y con su voz.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Paso 9: Guarda tu programa',
        instructions: [
          'Haz clic en Archivo -> Guardar como.',
          'Guarda el archivo con el nombre: "Hola_mundo.sb3".'
        ]
      }
    ],
    conclusion: [
      'Iniciaste la preparación de tu laboratorio virtual domótico.',
      'Comprobaste que los actuadores de salida de información (pantalla y voz) responden fielmente a las instrucciones programadas.'
    ],
    quiz: [
      {
        id: 'q-t2-1-1',
        question: '¿Qué función cumple Niko en el laboratorio de casas inteligentes?',
        options: [
          'Es un enemigo del juego',
          'Es nuestro asistente virtual e interlocutor que nos guiará en la automatización del hogar',
          'Es un bloque de color rojo',
          'Es una cámara de seguridad física'
        ],
        correctOptionIndex: 1,
        explanation: 'Niko actúa como el robot asistente que interactúa con el usuario y ejecuta las rutinas domóticas.'
      }
    ],
    instructorGuide: {
      summary: 'Configuración inicial del laboratorio del Tomo 2 enfocado en la domótica y automatización con IA.',
      checklist: [
        'Acompañar al estudiante en la familiarización del entorno.',
        'Supervisar que el audio se escuche nítido.',
        'Verificar el guardado correcto del archivo.'
      ],
      discussionQuestions: [
        '¿Qué dispositivos inteligentes tienes o te gustaría tener en tu hogar?'
      ]
    }
  },
  {
    id: 't2-act2',
    tomo: 2,
    courseId: 'ia-casas-inteligentes',
    number: 2,
    title: 'Actividad de Laboratorio 2: Mi primer rostro detectado (Seguridad del Hogar)',
    shortTitle: '2. Mi primer rostro detectado',
    iconName: 'ScanFace',
    description: 'En esta actividad activarás la cámara y comprobarás cómo el sistema de seguridad de nuestra casa inteligente detecta la presencia de personas en tiempo real.',
    learningObjective: 'Implementar el sensor de visión por computadora para monitorear la entrada de la casa y verificar la presencia de humanos frente a la cámara.',
    previousConcepts: [
      'Visión por computadora en sistemas de seguridad',
      'Cajas delimitadoras y transparencia de video',
      'Condicionales si/si no basados en # de caras'
    ],
    requiredMaterials: [
      'Computadora con cámara web funcional',
      'PictoBlox con extensión Face Detection'
    ],
    extensions: ['Detección de Rostros (Face Detection)', 'Texto a Voz (Text to Speech)'],
    privacyNotice: 'Los datos de la cámara se analizan únicamente de manera local para detectar presencia.',
    sb3Project: {
      id: 'res-sb3-t2-det',
      name: 'Proyecto Detección de Rostros (Deteccion_de_rostros.sb3)',
      fileName: 'Deteccion_de_rostros.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Deteccion_de_rostros.sb3',
      description: 'Proyecto de detección de rostros con sensor de presencia para la entrada.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-t2-lab-bg2',
        name: 'Escenario Laboratorio',
        fileName: 'Laboratorio.png',
        fileType: 'image',
        fileUrl: '/resources/images/Laboratorio.png',
        description: 'Fondo del laboratorio.',
        howToUse: 'Cargar como fondo.'
      },
      {
        id: 'res-t2-niko-sprite2',
        name: 'Personaje Niko',
        fileName: 'Niko.png',
        fileType: 'image',
        fileUrl: '/resources/images/Niko.png',
        description: 'Personaje Niko.',
        howToUse: 'Cargar como sprite.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Prepara tu laboratorio de trabajo',
        instructions: [
          'Abre PictoBlox y carga el escenario con Niko.',
          'Añade las extensiones "Detección de Rostros" y "Texto a Voz".'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Guarda tu proyecto correctamente',
        instructions: [
          'Guarda como "Deteccion_de_rostros.sb3" y autoriza "Save WITH Face Details".'
        ]
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Niko te da la bienvenida',
        instructions: [
          'Conecta debajo de la bandera verde el saludo con texto y voz anunciando que activará la cámara.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Activa la cámara',
        instructions: [
          'Agrega "cambiar on de video en stage con 30% transparency".'
        ]
      },
      {
        stepNumber: 5,
        title: 'Paso 5: Probamos la cámara',
        instructions: [
          'Prueba en pantalla completa para comprobar que tu video aparece de fondo.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Paso 6: Dibujamos la caja del rostro',
        instructions: [
          'Agrega "show cuadro delimitador" y el bucle "por siempre { analizar imagen desde camera }".'
        ]
      },
      {
        stepNumber: 7,
        title: 'Paso 7: Tomamos una decisión',
        instructions: [
          'Coloca el bloque "si / si no" dentro de "por siempre".'
        ]
      },
      {
        stepNumber: 8,
        title: 'Paso 8: ¿Hay un rostro o no?',
        instructions: [
          'Compara con el operador mayor que: "obtener # de caras > 0".'
        ]
      },
      {
        stepNumber: 9,
        title: 'Paso 9: Cuando SÍ hay un rostro',
        instructions: [
          'Programa a Niko para decir: "Detecté un rostro frente a la cámara. ¡Hola, humano curioso!".'
        ]
      },
      {
        stepNumber: 10,
        title: 'Paso 10: Cuando NO hay un rostro',
        instructions: [
          'Programa a Niko para decir: "No veo ningún rostro. ¿Te escondiste o sigo esperando?".'
        ]
      },
      {
        stepNumber: 11,
        title: 'Paso 11: ¡Prueba tu creación!',
        instructions: [
          'Colócate frente a la cámara y luego escóndete para verificar ambos estados.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Paso 12: Guarda los cambios',
        instructions: [
          'Haz clic en el icono de guardar 💾.'
        ]
      }
    ],
    experiments: [
      {
        id: 't2-exp2-1',
        title: 'Experimento 1: Tápate un ojo',
        instruction: 'Comprueba si la IA sigue detectando tu rostro al cubrirte parcialmente.',
        type: 'hybrid',
        options: ['Sí detecta', 'No detecta'],
        questionPrompt: '¿Cómo afecta la oclusión al sensor?'
      },
      {
        id: 't2-exp2-2',
        title: 'Experimento 2: Aléjate de la cámara',
        instruction: 'Observa qué sucede con la detección a mayor distancia.',
        type: 'hybrid',
        options: ['Sigue detectando', 'Se pierde a gran distancia'],
        questionPrompt: '¿Qué cambió en la resolución facial percibida?'
      }
    ],
    conclusion: [
      'Implementaste con éxito el primer nivel de seguridad domótica: detección de presencia humana mediante visión artificial.',
      'En la siguiente fase pasaremos de la detección genérica al reconocimiento biométrico específico de personas autorizadas.'
    ],
    quiz: [
      {
        id: 'q-t2-2-1',
        question: '¿Cuál es la diferencia entre detectar un rostro y reconocer a una persona?',
        options: [
          'No hay diferencia, son exactamente lo mismo',
          'Detectar solo sabe que hay una cara humana; reconocer identifica quién es esa persona comparándola con una base de datos',
          'Detectar solo funciona de noche',
          'Reconocer no necesita cámara'
        ],
        correctOptionIndex: 1,
        explanation: 'La detección encuentra la presencia y ubicación del rostro, mientras que el reconocimiento valida la identidad específica de la persona.'
      }
    ],
    instructorGuide: {
      summary: 'Consolidación del módulo de detección como antesala al entrenamiento y reconocimiento facial biométrico.',
      checklist: [
        'Asegurarse de que el alumno entienda la diferencia conceptual entre detectar y reconocer.',
        'Verificar el correcto guardado de los datos de calibración del rostro.'
      ],
      discussionQuestions: [
        '¿Por qué una cerradura electrónica no debería abrirse solo con detectar cualquier cara, sino con reconocer a los miembros de la familia?'
      ]
    },
    interactiveSimulatorType: 'face_detect'
  },
  {
    id: 't2-act5',
    tomo: 2,
    courseId: 'ia-casas-inteligentes',
    number: 5,
    numberNote: 'La numeración se conserva de acuerdo con el material original del PDF Tomo 2 (Módulo 4: Reconocimiento Facial).',
    title: 'Actividad de Laboratorio 5: Reconociendo a una persona especial',
    shortTitle: '5. Reconociendo a una persona especial',
    iconName: 'UserCheck',
    description: 'Hasta ahora el sistema solo veía rostros. Ahora dará un gran salto: reconocer a una persona especial. Entrenarás el modelo de IA con tu propio rostro y comprobarás si puede identificar correctamente quién está frente a la cámara.',
    learningObjective: 'Aprender el proceso de entrenamiento de IA (Training), captura de muestras faciales, almacenamiento en clases (Clase 1 a 10) y emparejamiento biométrico en tiempo real.',
    previousConcepts: [
      'Entrenamiento supervisado y extracción de rasgos faciales',
      'Clases de rostros (hasta 10 personas en PictoBlox)',
      'Emparejamiento facial (emparejar cara en camera)',
      'Bloques condicionales basados en ¿está detectada la clase 1?'
    ],
    requiredMaterials: [
      'Computadora con cámara web y buena iluminación frontal',
      'PictoBlox instalado'
    ],
    extensions: ['Detección de Rostros (Face Detection)', 'Texto a Voz (Text to Speech)'],
    privacyNotice: 'El entrenamiento biométrico almacena únicamente vectores matemáticos de rasgos faciales en la memoria local de tu proyecto PictoBlox.',
    sb3Project: {
      id: 'res-sb3-rec-facial',
      name: 'Proyecto Reconocimiento Facial (Reconocimiento_facial.sb3)',
      fileName: 'Reconocimiento_facial.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Reconocimiento_facial.sb3',
      description: 'Proyecto completo de entrenamiento biométrico y prueba con tecla T y tecla ESPACIO.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-t2-niko-lab-rec',
        name: 'Escenario y Personaje',
        fileName: 'Laboratorio_Niko.zip',
        fileType: 'image',
        fileUrl: '/resources/images/Laboratorio.png',
        description: 'Recursos del laboratorio y personaje Niko.',
        howToUse: 'Cargar como fondo y sprite.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Abrir proyecto base y duplicarlo',
        instructions: [
          'Abre tu proyecto anterior de detección de rostros.',
          'Haz clic en "Archivo" -> "Guardar como".',
          'Guarda el proyecto con el nuevo nombre: "Reconocimiento_facial.sb3" para no modificar el archivo original.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: PARTE 1 - Programar el Entrenamiento (Tecla T)',
        instructions: [
          'En el área de programación de Niko, debajo de los bloques anteriores, agrega el evento de entrenamiento:',
          '1. al presionar tecla [t]',
          '2. fijar idioma a [Spanish (Latin American)]',
          '3. asignar voz a [tenor]',
          '4. decir [Por favor mira a la cámara]',
          '5. decir [Por favor mira a la cámara] (Texto a Voz)',
          '6. cambiar on de video en stage con [0] % transparency',
          '7. show cuadro delimitador',
          '8. reiniciar clase (Face Detection)',
          '9. esperar [3] segundos',
          '10. decir [Escaneando rostro.]',
          '11. decir [Escaneando rostro.] (Texto a Voz)',
          '12. añadir clase [1] como [Tu Nombre] desde [camera] (Face Detection)',
          '13. decir [Rostro registrado.]',
          '14. decir [Rostro registrado.] (Texto a Voz)',
          '15. cambiar off de video en stage con [0] % transparency'
        ],
        blockExplanation: {
          event: 'Al presionar la tecla T en el teclado.',
          action: 'Limpia clases antiguas (reiniciar clase), activa la cámara con video nítido al 0% de transparencia, espera 3 segundos para que te acomodes, captura múltiples fotogramas de tu cara y los guarda en la Clase 1 con tu nombre, y luego apaga la cámara.',
          aiData: 'Conjunto de datos de entrenamiento (Dataset Clase 1).',
          spriteTarget: 'Niko / Motor Face Detection',
          successResult: 'Tu rostro queda guardado en la memoria de la IA con tu nombre.'
        },
        tip: 'Asegúrate de cambiar "Jarvis" por tu nombre real (por ejemplo: Edison o tu nombre).'
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Consejos clave antes de entrenar',
        instructions: [
          'Revisa que haya buena iluminación en tu rostro.',
          'Evita que la luz de una lámpara o ventana quede detrás de ti (contraluz).',
          'Mira fijamente de frente al lente de la cámara.',
          'Mantén una expresión neutral y relajada durante los 3 segundos de escaneo.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Paso 4: PARTE 2 - Programar el Reconocimiento Facial (Tecla Espacio)',
        instructions: [
          'Modifica el bloque de prueba para que se active al presionar la tecla [espacio]:',
          '1. al presionar tecla [espacio]',
          '2. fijar idioma a [Spanish (Latin American)]',
          '3. asignar voz a [tenor]',
          '4. decir [Hola, soy Niko]',
          '5. decir [Hola, soy Niko] (Texto a Voz)',
          '6. decir [Quédate frente a la cámara y veamos si puedo verte]',
          '7. decir [Quédate frente a la cámara y veamos si puedo verte] (Texto a Voz)',
          '8. cambiar on de video en stage con [0] % transparency',
          '9. show cuadro delimitador',
          '10. decir [Escaneando Rostro]',
          '11. decir [Escaneando Rostro] (Texto a Voz)',
          '12. esperar [3] segundos',
          '13. emparejar cara en [camera] (Face Detection)',
          '14. si (¿está detectada la clase 1?) entonces:',
          '    - decir [Te reconozco perfectamente, Tu Nombre.]',
          '    - decir [Te reconozco perfectamente, Tu Nombre.] (Texto a Voz)',
          '    si no:',
          '    - decir [Lo siento, no te tengo registrado.]',
          '    - decir [Lo siento, no te tengo registrado.] (Texto a Voz)',
          '15. cambiar off de video en stage con [0] % transparency'
        ],
        blockExplanation: {
          event: 'Al pulsar la tecla ESPACIO en el teclado.',
          action: 'Enciende la cámara, pide quedarse quieto, ejecuta el algoritmo de inferencia (emparejar cara en camera) y evalúa si los rasgos coinciden con la Clase 1.',
          condition: '¿Está detectada la clase 1?',
          aiData: 'Predicción de coincidencia biométrica.',
          successResult: 'Si eres tú, Niko te saluda por tu nombre con alegría. Si es un extraño, Niko avisa que no está registrado.'
        }
      },
      {
        stepNumber: 5,
        title: 'Paso 5: ¡Pon a prueba tu Sistema de Seguridad!',
        instructions: [
          '1. Pon la pantalla completa.',
          '2. Entrenamiento (Tecla T): Presiona la letra T en tu teclado y quédate quieto mirando a la cámara hasta escuchar "Rostro registrado".',
          '3. El Gran Test (Tecla Espacio): Presiona la barra espaciadora. Niko activará la cámara, escaneará tu rostro y dirá: "Te reconozco perfectamente, [Tu Nombre]"!'
        ]
      },
      {
        stepNumber: 6,
        title: 'Paso 6: Guarda tu proyecto',
        instructions: [
          'Guarda tu proyecto asegurándote de guardar los datos de entrenamiento facial ("Save WITH Face Details").'
        ]
      }
    ],
    experiments: [
      {
        id: 't2-exp5-1',
        title: 'Experimento 1: El Camuflaje',
        instruction: 'Tápate la mitad de la cara con una mano o un cuaderno y presiona la tecla ESPACIO.',
        type: 'hybrid',
        options: ['Te reconoció a pesar del camuflaje', 'Dijo que no te tiene registrado'],
        questionPrompt: '¿Qué rasgos clave quedaron ocultos para la IA?'
      },
      {
        id: 't2-exp5-2',
        title: 'Experimento 2: El Intruso',
        instruction: 'Pídele a un amigo, papá o mamá que se siente frente a la cámara y presione ESPACIO.',
        type: 'hybrid',
        options: ['Dijo: "Lo siento, no te tengo registrado"', 'Confundió a la persona'],
        questionPrompt: '¿Por qué la IA no lo reconoció como Clase 1?'
      },
      {
        id: 't2-exp5-3',
        title: 'Experimento 3: Luz y Sombra',
        instruction: 'Apaga la luz de la habitación o ponte a contraluz y presiona ESPACIO.',
        type: 'hybrid',
        options: ['Los datos con poca luz dificultan la comparación', 'Funcionó con normalidad'],
        questionPrompt: '¿Cómo afecta la luz al cálculo matemático de la cara?'
      }
    ],
    conclusion: [
      'Descubriste el poder del aprendizaje automático (Machine Learning) aplicado a la biometría facial.',
      'Comprendiste las dos fases de un sistema inteligente: 1) Fase de Entrenamiento (captura de datos en clases) y 2) Fase de Inferencia o Reconocimiento (comparación con datos guardados).',
      'Tu sistema de IA ahora tiene memoria y puede distinguir a miembros autorizados de desconocidos.'
    ],
    quiz: [
      {
        id: 'q-t2-5-1',
        question: '¿Qué bloque de PictoBlox se utiliza para capturar y guardar las fotos del rostro en una clase?',
        options: [
          'reiniciar clase',
          'añadir clase [1] como [Nombre] desde [camera]',
          'cambiar fondo a [Wall 1]',
          'detener todos'
        ],
        correctOptionIndex: 1,
        explanation: 'El bloque "añadir clase..." captura automáticamente muestras fotográficas del rostro y las entrena en la clase seleccionada.'
      },
      {
        id: 'q-t2-5-2',
        question: '¿Qué hace el bloque "emparejar cara en camera"?',
        options: [
          'Apaga el monitor',
          'Compara la cara actual frente a la cámara con todas las clases registradas en la base de datos',
          'Toma una captura de pantalla',
          'Cambia el idioma del computador'
        ],
        correctOptionIndex: 1,
        explanation: '"Emparejar cara" realiza el cálculo de similitud para determinar a qué clase registrada pertenece la persona.'
      }
    ],
    instructorGuide: {
      summary: 'Esta práctica introduce el concepto de Machine Learning supervisado con clases y entrenamiento.',
      checklist: [
        'Verificar que el nombre personalizado en el bloque de clase coincida con el nombre del diálogo.',
        'Enseñar a los estudiantes a presionar T primero para entrenar y luego ESPACIO para probar.',
        'Fomentar la reflexión ética sobre la privacidad biométrica y el consentimiento.'
      ],
      discussionQuestions: [
        '¿Dónde se usa el reconocimiento facial en la vida real (aeropuertos, desbloqueo de celulares, seguridad)?',
        '¿Qué precauciones de seguridad debemos tener con nuestras fotos y datos personales?'
      ]
    },
    interactiveSimulatorType: 'face_train_door'
  },
  {
    id: 't2-act6',
    tomo: 2,
    courseId: 'ia-casas-inteligentes',
    number: 6,
    numberNote: 'La numeración se conserva de acuerdo con el material original del PDF Tomo 2.',
    title: 'Actividad de Laboratorio 6: Puerta Inteligente con Reconocimiento Facial',
    shortTitle: '6. Puerta Inteligente con Reconocimiento Facial',
    iconName: 'DoorClosed',
    description: 'En esta actividad utilizaremos el reconocimiento facial que entrenamos anteriormente para automatizar una puerta inteligente. Cuando el sistema de IA reconozca un rostro autorizado, la puerta se abrirá automáticamente mediante una secuencia animada de 14 fondos.',
    learningObjective: 'Integrar la animación de apertura de 14 fotogramas usando bucles "repetir [13]" y el bloque "siguiente fondo", condicionando el acceso mecánico a la validación biométrica de la IA.',
    previousConcepts: [
      'Secuencia de disfraces y fondos para animación continua',
      'Bucle repetir con pausas temporizadas (esperar 0.1 segundos)',
      'Condicionales de autorización de seguridad (Acceso concedido vs Acceso denegado)'
    ],
    requiredMaterials: [
      'Computadora con cámara web',
      'Carpeta de recursos "Puerta Inteligente" con las 14 imágenes de la puerta (door_1 a door_14)'
    ],
    extensions: ['Detección de Rostros (Face Detection)', 'Texto a Voz (Text to Speech)'],
    sb3Project: {
      id: 'res-sb3-puerta',
      name: 'Proyecto Puerta Inteligente (Puerta_inteligente.sb3)',
      fileName: 'Puerta_inteligente.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Puerta_inteligente.sb3',
      description: 'Proyecto completo de la cerradura biométrica con animación fluida de 14 imágenes.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-door-seq',
        name: 'Secuencia de 14 Fondos de la Puerta (door_1 a door_14)',
        fileName: 'Secuencia_Puerta_14_Imagenes.zip',
        fileType: 'sequence',
        fileUrl: '/resources/images/puerta/door_1.png',
        description: 'Colección de 14 imágenes ordenadas cronológicamente para simular la apertura de la puerta batiente.',
        howToUse: 'Cargar todas las 14 imágenes en la sección Fondos del Escenario.'
      },
      {
        id: 'res-door-1',
        name: 'Puerta Cerrada (door_1)',
        fileName: 'door_1.png',
        fileType: 'image',
        fileUrl: '/resources/images/puerta/door_1.png',
        description: 'Fondo de la puerta en posición cerrada.',
        howToUse: 'Fondo inicial por defecto.'
      },
      {
        id: 'res-door-14',
        name: 'Puerta Totalmente Abierta (door_14)',
        fileName: 'door_14.png',
        fileType: 'image',
        fileUrl: '/resources/images/puerta/door_14.png',
        description: 'Fondo de la puerta abierta mostrando el interior de la casa.',
        howToUse: 'Fondo final de la animación de acceso concedido.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Abrir y guardar el proyecto base',
        instructions: [
          'Abre el archivo "Reconocimiento_facial.sb3" que creaste en la práctica anterior.',
          'Haz clic en "Archivo" -> "Guardar como".',
          'Cambia el nombre del proyecto a "Puerta_inteligente.sb3". Así trabajas sobre una copia sin perder el proyecto anterior.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Cambiar y preparar los fondos de la puerta',
        instructions: [
          'Ve a la sección de Fondos en el escenario.',
          'Entra en la carpeta "Puerta Inteligente" -> subcarpeta "Puerta".',
          'Carga todas las 14 imágenes de la puerta (en total son 14 imágenes: door_1 a door_14).',
          'Una vez cargadas, elimina los fondos antiguos del laboratorio que ya no se van a usar.',
          'Asegúrate de que queden ordenadas del 1 al 14.'
        ],
        tip: 'Estas 14 imágenes reproducidas en orden simulan el movimiento realista de la puerta abriéndose hacia adentro.'
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Regresar a programación en bloques',
        instructions: [
          'Presiona la pestaña "Bloques" para regresar al entorno de programación.',
          'Selecciona al personaje Niko para comenzar a editar la programación del sistema de acceso inteligente.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Modificar la programación para controlar el acceso',
        instructions: [
          'En el evento "al presionar tecla [espacio]", ajusta el código para que quede así:',
          '1. al presionar tecla [espacio]',
          '2. cambiar fondo a [door_1]',
          '3. fijar idioma a [Spanish (Latin American)]',
          '4. asignar voz a [tenor]',
          '5. decir [Sistema de seguridad activado]',
          '6. decir [Sistema de seguridad activado] (Texto a Voz)',
          '7. decir [Verificando identidad]',
          '8. decir [Verificando identidad] (Texto a Voz)',
          '9. cambiar on de video en stage con [0] % transparency',
          '10. show cuadro delimitador',
          '11. decir [Escaneando Rostro]',
          '12. decir [Escaneando Rostro] (Texto a Voz)',
          '13. esperar [3] segundos',
          '14. emparejar cara en [camera]',
          '15. cambiar off de video en stage con [0] % transparency',
          '16. si (¿está detectada la clase 1?) entonces:',
          '    - decir [Acceso concedido. Bienvenida/o Tu Nombre.]',
          '    - decir [Acceso concedido. Bienvenida/o Tu Nombre.] (Texto a Voz)',
          '    - repetir [13]:',
          '        - siguiente fondo',
          '        - esperar [0.1] segundos',
          '    si no:',
          '    - decir [Acceso denegado. La puerta permanecerá bloqueada.]',
          '    - decir [Acceso denegado. La puerta permanecerá bloqueada.] (Texto a Voz)'
        ],
        blockExplanation: {
          event: 'Timbre inteligente (tecla espacio).',
          action: 'Inicia con la puerta cerrada (door_1), escanea el rostro, apaga la cámara y evalúa la clase.',
          condition: '¿Está detectada la clase 1?',
          successResult: 'Acceso Concedido: Niko saluda cordialmente y ejecuta el bucle de 13 repeticiones de "siguiente fondo" cada 0.1s para abrir la puerta de par en par.',
          failureResult: 'Acceso Denegado: La puerta permanece cerrada en door_1 y Niko avisa que el acceso está bloqueado.'
        }
      },
      {
        stepNumber: 5,
        title: 'Paso 5: Probar el sistema',
        instructions: [
          'Activa el modo pantalla completa.',
          'Presiona la tecla ESPACIO (simula presionar el timbre de la casa).',
          'Colócate frente a la cámara:',
          '- Si te reconoce como la persona registrada -> ¡Acceso concedido! La puerta se abre suavemente.',
          '- Si pones a un extraño o te cubres la cara -> ¡Acceso denegado! La puerta queda cerrada con cerrojo.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Paso 6: Guardar el programa',
        instructions: [
          'Haz clic en el icono de Guardar y confirma "Guardar datos de rostro: Sí".'
        ]
      }
    ],
    conclusion: [
      'Has construido un sistema domótico de seguridad real y funcional con Inteligencia Artificial.',
      'Comprendiste cómo vincular la inferencia de un modelo de Machine Learning con actuadores visuales (animación de fondos).',
      'Aprendiste por qué se repite 13 veces el bloque "siguiente fondo" (de la imagen 1 a la 14) con un intervalo de 0.1 segundos para lograr una tasa de refresco suave.'
    ],
    quiz: [
      {
        id: 'q-t2-6-1',
        question: 'Si la secuencia tiene 14 imágenes y comenzamos en la imagen 1 (door_1), ¿por qué repetimos "siguiente fondo" exactamente 13 veces?',
        options: [
          'Porque 13 es un número de la suerte',
          'Porque para avanzar desde la imagen 1 hasta la 14 se necesitan dar exactamente 13 pasos hacia adelante',
          'Porque la computadora no sabe contar hasta 14',
          'Para que la puerta se cierre al final'
        ],
        correctOptionIndex: 1,
        explanation: 'Estando ya en la imagen 1, dar 13 veces "siguiente fondo" (1 + 13 = 14) deja la puerta exactamente en la imagen 14 (totalmente abierta).'
      },
      {
        id: 'q-t2-6-2',
        question: '¿Qué sucede si una persona no registrada intenta ingresar a la casa inteligente?',
        options: [
          'La computadora explota',
          'Niko dice "Acceso denegado", la puerta permanece cerrada en door_1 y el sistema se bloquea',
          'La puerta se abre de todos modos',
          'Se borra el programa'
        ],
        correctOptionIndex: 1,
        explanation: 'La rama "si no" del condicional protege la casa manteniendo el fondo en door_1 y negando la entrada.'
      }
    ],
    instructorGuide: {
      summary: 'Proyecto que fusiona la biometría entrenada con la cinemática de animación por cuadros (frames).',
      checklist: [
        'Verificar que las 14 imágenes de la puerta estén cargadas en orden estricto (door_1 a door_14).',
        'Comprobar que el bucle repetir sea de 13 y no de 14 (si fuera 14 volvería a door_1).',
        'Probar el caso positivo (dueño de casa) y caso negativo (intruso).'
      ],
      discussionQuestions: [
        '¿Por qué las cerraduras inteligentes de alta seguridad combinan reconocimiento facial con sensores de huella o contraseñas temporales?'
      ]
    },
    interactiveSimulatorType: 'face_train_door'
  },
  {
    id: 't2-act7',
    tomo: 2,
    courseId: 'ia-casas-inteligentes',
    number: 7,
    numberNote: 'La numeración se conserva de acuerdo con el material original del PDF Tomo 2 (Sección 5: Reconocimiento de Voz).',
    title: 'Actividad de Laboratorio 7: Probando el reconocimiento de voz',
    shortTitle: '7. Probando el reconocimiento de voz',
    iconName: 'Mic',
    description: 'En esta práctica utilizarás la extensión Speech Recognition para que el sistema de IA escuche lo que dices a través del micrófono y reconozca tus palabras convirtiéndolas en texto en tiempo real.',
    learningObjective: 'Comprender el funcionamiento del procesamiento de lenguaje hablado (Speech-to-Text), habilitar la API de reconocimiento de voz de PictoBlox y programar el script interactivo "Modo Loro".',
    previousConcepts: [
      'Cómo viaja el sonido por ondas y es capturado por micrófonos',
      'Procesamiento de audio y conversión a cadenas de texto',
      'Extensión Speech Recognition y limpieza de variables de resultado'
    ],
    requiredMaterials: [
      'Computadora con micrófono funcional (integrado o auricular)',
      'Navegador web para autenticación en la API de Speech Recognition de PictoBlox'
    ],
    extensions: ['Reconocimiento de Voz (Speech Recognition)', 'Texto a Voz (Text to Speech)'],
    sb3Project: {
      id: 'res-sb3-rec-voz',
      name: 'Proyecto Reconocimiento de Voz (Reconocimiento_de_voz.sb3)',
      fileName: 'Reconocimiento_de_voz.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Reconocimiento_de_voz.sb3',
      description: 'Proyecto base con la rutina de escucha por micrófono y repetición en Modo Loro.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-t2-lab-bg-v',
        name: 'Fondo Laboratorio',
        fileName: 'Laboratorio.png',
        fileType: 'image',
        fileUrl: '/resources/images/Laboratorio.png',
        description: 'Fondo del laboratorio.',
        howToUse: 'Cargar como fondo.'
      },
      {
        id: 'res-t2-niko-v',
        name: 'Personaje Niko',
        fileName: 'Niko.png',
        fileType: 'image',
        fileUrl: '/resources/images/Niko.png',
        description: 'Sprite de Niko.',
        howToUse: 'Cargar como sprite.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Prepara el escenario',
        instructions: [
          'Abre PictoBlox y carga el fondo del Laboratorio.',
          'Agrega al personaje Niko.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Activa el poder de escuchar',
        instructions: [
          'Ve a Extensiones en la esquina inferior izquierda.',
          'Selecciona la extensión "Speech Recognition" (Reconocimiento de voz).'
        ]
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Iniciar sesión o registrarse en PictoBlox',
        instructions: [
          'Para usar esta extensión, PictoBlox requiere una cuenta activa.',
          'Haz clic en "Sign In" en la barra superior.',
          'Si no tienes cuenta: haz clic en "Unirse" -> selecciona "Estudiante" -> completa tu correo, usuario y contraseña -> activa tu cuenta desde tu correo electrónico.',
          'Si ya tienes cuenta: ingresa tu usuario y contraseña directamente.'
        ],
        tip: 'Tener la sesión iniciada permite que la extensión se conecte con los servidores de reconocimiento de lenguaje natural en tiempo real.'
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Conecta el reconocimiento de voz en el navegador',
        instructions: [
          'Al cargar la extensión Speech Recognition, aparecerá una ventana emergente que indica conectar el navegador.',
          'Haz clic en "Okay".',
          'Se abrirá una nueva pestaña en tu navegador web con la API de PictoBlox Speech Recognition.',
          'Haz clic en "Test Speech Recognition".',
          'Cuando el navegador te pida permiso para usar el micrófono, selecciona "Permitir".',
          'Habla al micrófono ("Hola", "Probando") y verifica que en el campo "Result" aparezcan tus palabras escritas.',
          'Regresa a PictoBlox dejando esa pestaña abierta.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Paso 5: Agrega la extensión Texto a Voz y guarda',
        instructions: [
          'En PictoBlox, vuelve a Extensiones y añade "Texto a Voz" para que el programa también pueda responder hablando.',
          'Haz clic en Archivo -> Guardar como -> "Reconocimiento_de_voz.sb3".'
        ]
      },
      {
        stepNumber: 6,
        title: 'Paso 6: Programar el Mensaje de Inicio',
        instructions: [
          'Selecciona a Niko y coloca debajo de la bandera verde:',
          '1. al hacer clic en [bandera verde]',
          '2. decir [Habla ahora, modo loro activado]',
          '3. fijar idioma a [Spanish (Latin American)]',
          '4. asignar voz a [tenor]',
          '5. decir [Habla ahora, modo loro activado] (Texto a Voz)'
        ]
      },
      {
        stepNumber: 7,
        title: 'Paso 7: Activar el reconocimiento de voz',
        instructions: [
          'Conecta debajo:',
          '6. set language to [Spanish (Latin American)] (Speech Recognition)',
          '7. start listening (Speech Recognition)',
          '8. esperar [3] segundos (Control)'
        ],
        blockExplanation: {
          event: 'Activación del micrófono.',
          action: 'Configura el motor de reconocimiento en español, abre el canal de audio durante 3 segundos para que el usuario hable.',
          aiData: 'Transcripción del audio en la variable interna "speech recognition result".',
          spriteTarget: 'Niko / Extensión Speech Recognition',
          successResult: 'El sistema escucha y procesa las palabras dichas por el usuario.'
        }
      },
      {
        stepNumber: 8,
        title: 'Paso 8: Repetir lo que dices (Modo Loro)',
        instructions: [
          'Conecta a continuación:',
          '9. decir (speech recognition result) (Apariencia)',
          '10. decir (speech recognition result) (Texto a Voz)',
          '11. clear speech recognition result (Speech Recognition)'
        ],
        blockExplanation: {
          event: 'Respuesta del sistema.',
          action: 'Muestra en la burbuja y sintetiza con la voz de Niko exactamente las palabras que la IA capturó de tu micrófono, y luego limpia la memoria para la próxima frase.',
          spriteTarget: 'Niko',
          successResult: 'Niko repite tus palabras exactamente como un loro inteligente.'
        }
      },
      {
        stepNumber: 9,
        title: 'Paso 9: Prueba final y guardado',
        instructions: [
          'Haz clic en la bandera verde.',
          'Cuando Niko diga "Habla ahora, modo loro activado", di con voz clara: "Hola mundo", "PictoBlox es divertido" o "Probando 1, 2, 3".',
          '¡Observa cómo Niko muestra tu frase y la repite con su propia voz!',
          'Guarda tu proyecto para utilizarlo como base en la siguiente práctica.'
        ]
      }
    ],
    conclusion: [
      'Comprendiste cómo los sistemas inteligentes procesan el audio humano y lo transforman en texto comprensible.',
      'Lograste conectar con éxito la API web de reconocimiento de voz y programar el programa "Modo Loro".',
      'Estás listo para usar estas palabras como comandos de control domótico en la siguiente práctica.'
    ],
    quiz: [
      {
        id: 'q-t2-7-1',
        question: '¿En qué variable o bloque especial se almacena el texto de lo que hablaste al micrófono?',
        options: [
          'score',
          'speech recognition result',
          'número de caras',
          'mouse x'
        ],
        correctOptionIndex: 1,
        explanation: '"speech recognition result" contiene el texto transcrito de la última frase escuchada por el micrófono.'
      },
      {
        id: 'q-t2-7-2',
        question: '¿Para qué sirve el bloque "clear speech recognition result"?',
        options: [
          'Para cerrar el programa',
          'Para borrar el texto escuchado anteriormente y dejar la memoria lista para la siguiente orden',
          'Para subir el volumen',
          'Para apagar la computadora'
        ],
        correctOptionIndex: 1,
        explanation: 'Borra el resultado previo para evitar que el programa repita la misma orden antigua por error.'
      }
    ],
    instructorGuide: {
      summary: 'Esta actividad introduce el reconocimiento de voz por IA y la configuración de permisos del micrófono en el navegador.',
      checklist: [
        'Asegurarse de que el navegador tenga permiso de micrófono activado.',
        'Verificar que los estudiantes hablen con claridad a unos 20-30 cm del micrófono.',
        'Supervisar que el idioma esté configurado en "Spanish (Latin American)".'
      ],
      discussionQuestions: [
        '¿Cómo reconocen los asistentes como Siri, Google Assistant o Alexa las palabras de personas con diferentes tonos de voz o acentos?'
      ]
    },
    interactiveSimulatorType: 'voice_light'
  },
  {
    id: 't2-act8',
    tomo: 2,
    courseId: 'ia-casas-inteligentes',
    number: 8,
    numberNote: 'La numeración se conserva de acuerdo con el material original del PDF Tomo 2.',
    title: 'Actividad de Laboratorio 8: Luces que obedecen tu voz',
    shortTitle: '8. Luces que obedecen tu voz',
    iconName: 'Lightbulb',
    description: 'En esta práctica continuaremos automatizando nuestra casa inteligente utilizando reconocimiento de voz. Ahora el sistema de IA escuchará los comandos hablados para controlar las luces del hogar, permitiendo encenderlas o apagarlas mediante órdenes de voz.',
    learningObjective: 'Programar un sistema domótico comandado por voz mediante el operador de búsqueda de subcadenas ("encender luz" está en speech recognition result), mensajes broadcast y cambio de disfraces en la lámpara.',
    previousConcepts: [
      'Búsqueda de palabras clave en texto usando el operador "¿[texto] está en [cadena]?"',
      'Envío y recepción de mensajes domóticos ("encender" y "apagar")',
      'Disfraces de lámpara apagada (light_off) y encendida (light_on)'
    ],
    requiredMaterials: [
      'Computadora con micrófono',
      'Imágenes de la lámpara (light_off.png y light_on.png / ligth_on.png)',
      'PictoBlox instalado'
    ],
    extensions: ['Reconocimiento de Voz (Speech Recognition)', 'Texto a Voz (Text to Speech)'],
    sb3Project: {
      id: 'res-sb3-casa-inteligente',
      name: 'Proyecto Casa Inteligente (Casa_inteligente.sb3)',
      fileName: 'Casa_inteligente.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Casa_inteligente.sb3',
      description: 'Proyecto completo de control domótico por voz con lámpara interactiva y respuesta de Niko.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-lamp-off',
        name: 'Lámpara Apagada (light_off)',
        fileName: 'light_off.png',
        fileType: 'image',
        fileUrl: '/resources/images/light_off.png',
        description: 'Disfraz de la lámpara de pie con bombilla apagada.',
        howToUse: 'Cargar como disfraz 1 del objeto lámpara.'
      },
      {
        id: 'res-lamp-on',
        name: 'Lámpara Encendida (light_on / ligth_on)',
        fileName: 'light_on.png',
        fileType: 'image',
        fileUrl: '/resources/images/light_on.png',
        description: 'Disfraz de la lámpara iluminada con resplandor amarillo brillante.',
        howToUse: 'Cargar como disfraz 2 del objeto lámpara.'
      },
      {
        id: 'res-t2-lab-smart',
        name: 'Fondo Laboratorio Smart Home',
        fileName: 'Laboratorio.png',
        fileType: 'image',
        fileUrl: '/resources/images/Laboratorio.png',
        description: 'Fondo del laboratorio inteligente.',
        howToUse: 'Cargar como fondo.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Crea una copia del proyecto',
        instructions: [
          'Abre el programa de la práctica anterior ("Reconocimiento_de_voz.sb3").',
          'Ve a Archivo -> Guardar como.',
          'Guarda el proyecto con el nuevo nombre: "Casa_inteligente.sb3".'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Agrega la lámpara y sus disfraces',
        instructions: [
          'Haz clic en el botón de agregar personaje y sube el objeto de la lámpara apagada ("light_off.png").',
          'Selecciona el objeto de la lámpara y ve a la pestaña "Disfraces".',
          'Sube el segundo disfraz: lámpara encendida ("light_on.png" / "ligth_on").',
          'Acomoda la lámpara en el escenario al lado de Niko y ajusta su tamaño.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Ajusta los diálogos en Niko',
        instructions: [
          'Selecciona a Niko.',
          'Cambia el mensaje inicial por: "Modo casa inteligente activado."',
          'Este mensaje se mostrará en la burbuja de texto y se escuchará con voz sintetizada.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Eliminar código innecesario',
        instructions: [
          'Elimina la parte antigua del "Modo Loro" que simplemente repetía la frase para liberar espacio para la lógica domótica.'
        ]
      },
      {
        stepNumber: 5,
        title: 'Paso 5: El Cerebro de tu Smart Home (Programar a Niko)',
        instructions: [
          'Arma la lógica en Niko para interpretar las órdenes:',
          '1. al hacer clic en [bandera verde]',
          '2. decir [Modo casa inteligente activado]',
          '3. fijar idioma a [Spanish (Latin American)]',
          '4. asignar voz a [tenor]',
          '5. decir [Modo casa inteligente activado] (Texto a Voz)',
          '6. set language to [Spanish (Latin American)]',
          '7. start listening',
          '8. por siempre:',
          '   - esperar [3] segundos',
          '   - si (¿"encender luz" está en speech recognition result?) entonces:',
          '       - enviar [encender]',
          '       - decir [Luz encendida]',
          '       - decir [Luz encendida] (Texto a Voz)',
          '   - si (¿"apagar luz" está en speech recognition result?) entonces:',
          '       - enviar [apagar]',
          '       - decir [Luz apagada]',
          '       - decir [Luz apagada] (Texto a Voz)',
          '   - clear speech recognition result'
        ],
        blockExplanation: {
          event: 'Bucle domótico continuo de escucha.',
          action: 'Espera que el usuario hable y busca mediante operadores de texto si la frase contiene las palabras clave "encender luz" o "apagar luz".',
          condition: '¿"encender luz" o "apagar luz" está en speech recognition result?',
          successResult: 'Envía el mensaje correspondiente ("encender" o "apagar") a todos los dispositivos y confirma verbalmente la acción ejecutada.'
        },
        tip: 'Para crear el mensaje "encender" o "apagar", haz clic en la flechita del bloque "enviar mensaje", selecciona "Nuevo mensaje" y escribe la palabra exacta.'
      },
      {
        stepNumber: 6,
        title: 'Paso 6: Programar la lámpara para encenderse',
        instructions: [
          'Selecciona al sprite de la lámpara.',
          'Ve a la categoría Eventos y agrega: "al recibir [encender]".',
          'En Apariencia, agrega: "cambiar disfraz a [ligth_on]" (o light_on).'
        ]
      },
      {
        stepNumber: 7,
        title: 'Paso 7: Programar la lámpara para apagarse',
        instructions: [
          'En el objeto de la lámpara, agrega otro evento: "al recibir [apagar]".',
          'En Apariencia, agrega: "cambiar disfraz a [light_off]".'
        ],
        blockExplanation: {
          event: 'Al recibir los mensajes "encender" o "apagar".',
          action: 'La lámpara cambia inmediatamente de disfraz para mostrar la bombilla resplandeciente o apagada.',
          spriteTarget: 'Lámpara',
          successResult: 'La iluminación del escenario responde en tiempo real a tus órdenes de voz.'
        }
      },
      {
        stepNumber: 8,
        title: 'Paso 8: Pruebas de Campo',
        instructions: [
          'Presiona la bandera verde en pantalla completa.',
          'Prueba básica: Di fuerte y claro "Encender luz" -> observa cómo la lámpara se ilumina y Niko responde "Luz encendida".',
          'Di "Apagar luz" -> la lámpara se apaga y Niko dice "Luz apagada".'
        ],
        creativeTip: '¡Sé creativo! Puedes cambiar las palabras clave por frases como "Modo noche", "¡Que se haga la luz!", o agregar ventiladores y televisores.'
      },
      {
        stepNumber: 9,
        title: 'Paso 9: Guarda tu proyecto',
        instructions: [
          'Haz clic en el icono de guardar 💾 para conservar tu proyecto "Casa_inteligente.sb3".'
        ]
      }
    ],
    experiments: [
      {
        id: 't2-exp8-1',
        title: 'Experimento 1: Variaciones en las órdenes de voz',
        instruction: 'Prueba decir oraciones más largas que contengan las palabras clave, por ejemplo: "Niko por favor podrías encender luz del cuarto".',
        type: 'hybrid',
        options: ['Funciona porque detecta que "encender luz" está contenida dentro de la frase', 'No funciona'],
        questionPrompt: '¿Por qué el operador "¿está en?" es tan poderoso para entender lenguaje natural?'
      },
      {
        id: 't2-exp8-2',
        title: 'Experimento 2: Comandos personalizados',
        instruction: 'Cambia en el código la palabra clave "encender luz" por "¡Lumos!" o "Que se haga la luz".',
        type: 'hybrid',
        options: ['La lámpara respondió a mi frase mágica', 'Hubo que pronunciar muy despacio'],
        questionPrompt: '¿Qué comando personalizado inventaste tú?'
      }
    ],
    conclusion: [
      '¡Felicitaciones! Has completado el curso "IA para Casas Inteligentes" construyendo un sistema de domótica completo controlado por voz.',
      'Aprendiste cómo los asistentes inteligentes como Alexa, Siri o Google Home procesan el lenguaje natural buscando palabras clave (intenciones) y las transforman en acciones del mundo real sobre luces y electrodomésticos.'
    ],
    quiz: [
      {
        id: 'q-t2-8-1',
        question: '¿Qué operador permite saber si una palabra clave está contenida dentro de lo que habló el usuario?',
        options: [
          'sumar 2 + 3',
          '¿[palabra] está en [speech recognition result]?',
          'número aleatorio',
          'unir [manzana] [plátano]'
        ],
        correctOptionIndex: 1,
        explanation: 'El operador "¿está en?" busca si la subcadena deseada forma parte del texto transcrito por el micrófono.'
      },
      {
        id: 'q-t2-8-2',
        question: '¿Cómo le avisa Niko a la lámpara que debe cambiar su disfraz?',
        options: [
          'Enviando un mensaje broadcast ("enviar [encender]" / "enviar [apagar]")',
          'Moviéndose encima de ella',
          'Apagando la computadora',
          'Cambiando el fondo del escenario'
        ],
        correctOptionIndex: 0,
        explanation: 'Los mensajes broadcast permiten comunicar la lógica del cerebro (Niko) con los actuadores físicos (Lámpara).'
      }
    ],
    instructorGuide: {
      summary: 'Proyecto final del Tomo 2. Demuestra de manera tangible cómo la Inteligencia Artificial hace realidad las casas del futuro mediante interfaces conversacionales.',
      checklist: [
        'Comprobar que los disfraces de la lámpara tengan los nombres exactos (light_off y ligth_on).',
        'Verificar que los mensajes broadcast estén escritos en minúsculas consistentes (encender / apagar).',
        'Fomentar la ampliación del proyecto agregando otros objetos del hogar (ventilador, radio, cafetera).'
      ],
      discussionQuestions: [
        '¿Cómo imaginas que será tu casa dentro de 20 años con la Inteligencia Artificial?'
      ]
    },
    interactiveSimulatorType: 'voice_light'
  }
];
