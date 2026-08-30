import { Practice } from '../types';

export const PRACTICES_TOMO_1: Practice[] = [
  {
    id: 't1-act1',
    tomo: 1,
    courseId: 'aprende-ia-jugando',
    number: 1,
    title: 'Actividad de Laboratorio 1: Detectando patrones como la IA',
    shortTitle: '1. Detectando patrones como la IA',
    iconName: 'Grid',
    description: 'En esta actividad descubrirás cómo identificar patrones. Los patrones aparecen cuando algo se repite siguiendo una regla. Aprender a reconocer patrones te ayudará a entender cómo funciona la Inteligencia Artificial. Observa y completa.',
    learningObjective: 'Comprender qué es un patrón lógico y cómo los algoritmos de Inteligencia Artificial aprenden a partir del análisis y repetición de datos.',
    previousConcepts: [
      'Concepto de Inteligencia Artificial',
      'Cómo aprende una máquina a partir de datos',
      'Identificación de secuencias y reglas repetitivas'
    ],
    requiredMaterials: [
      'Tablero interactivo digital en pantalla',
      'Navegador web'
    ],
    extensions: [],
    resources: [
      {
        id: 'res-pdf-patrones',
        name: 'Hoja de patrones',
        fileName: 'Test_de_patrones.pdf',
        fileType: 'pdf',
        fileUrl: '/resources/pdfs/Test_de_patrones.pdf',
        description: 'Hoja imprimible para observar y completar las secuencias de la actividad.',
        howToUse: 'Abrir o imprimir para realizar la actividad.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Observar la secuencia',
        instructions: [
          'Observa con atención las 4 secuencias que aparecen en el tablero interactivo de laboratorio.',
          'Identifica qué figuras geométricas y colores se van alternando en cada fila.',
          'Descubre la regla lógica o matemática que sigue cada serie.'
        ],
        tip: 'Fíjate no solo en la figura sino en el color y la alternancia de posiciones.'
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Explorar las piezas geométricas',
        instructions: [
          'Ubica las 4 piezas disponibles en la bandeja inferior: Triángulo Azul (▲), Círculo Amarillo (●), Cuadrado Rojo (■) y Estrella Verde (★).',
          'Puedes arrastrar cada figura directamente a las casillas vacías o seleccionarla haciendo clic/toque para colocarla.'
        ],
        tip: 'En esta versión digital no necesitas tijeras ni pegamento: todo se resuelve arrastrando o pulsando en pantalla.'
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Identificar los patrones',
        instructions: [
          'Analiza cada espacio vacío marcado con "?" en las filas del tablero.',
          'Relaciona la regla descubierta con la figura geométrica que encaja a la perfección.',
          'Decide qué pieza corresponde a cada posición faltante.'
        ],
        tip: 'Lee en voz alta la fila: por ejemplo, "Cuadrado Rojo, Triángulo Azul, Cuadrado Rojo, Triángulo Azul... ¿cuál sigue?"'
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Completar la secuencia y verificar',
        instructions: [
          'Coloca las 4 piezas en los lugares correctos del tablero.',
          'Verifica que la secuencia completa tenga sentido siguiendo la regla identificada.',
          'Ajusta si es necesario hasta que todos los patrones sean 100% correctos y la IA valide tu respuesta.'
        ],
        tip: 'Cuando aciertes las 4 filas, ¡habrás entrenado tu mente como un algoritmo de Inteligencia Artificial!'
      }
    ],
    reflection: '¿Cómo aprende la Inteligencia Artificial a partir de los patrones que dejamos al navegar o jugar?',
    conclusion: [
      'En esta actividad descubriste cómo funcionan los patrones, que son la base fundamental de la Inteligencia Artificial.',
      'Durante la actividad pudiste: Observar secuencias, reconocer patrones, analizar piezas, relacionar elementos y tomar decisiones lógicas.',
      'Ahora sabes que la Inteligencia Artificial aprende de esta forma: identificando patrones en los datos para tomar decisiones.'
    ],
    quiz: [
      {
        id: 'q1-1',
        question: '¿Qué es un patrón en Inteligencia Artificial?',
        options: [
          'Un dibujo que no tiene ninguna regla',
          'Algo que se repite siguiendo una regla lógica o matemática',
          'Un virus que apaga la computadora',
          'Un botón de PictoBlox'
        ],
        correctOptionIndex: 1,
        explanation: 'Un patrón es una estructura o secuencia que se repite siguiendo una regla, permitiendo a la IA predecir lo que sigue.'
      },
      {
        id: 'q1-2',
        question: '¿Cómo aprende la Inteligencia Artificial a tomar decisiones?',
        options: [
          'Tiene un cerebro biológico humano',
          'A través de magia',
          'Analizando datos y detectando patrones en la información',
          'Adivinando al azar'
        ],
        correctOptionIndex: 2,
        explanation: 'Las computadoras no tienen emociones ni conciencia; aprenden analizando datos e identificando patrones recurrentes.'
      }
    ],
    interactiveSimulatorType: 'pattern'
  },
  {
    id: 't1-act2',
    tomo: 1,
    courseId: 'aprende-ia-jugando',
    number: 2,
    title: 'Actividad de Laboratorio 2: Primeros Pasos en PictoBlox',
    shortTitle: '2. Primeros pasos en PictoBlox',
    iconName: 'Terminal',
    description: 'En esta actividad iniciaremos nuestra primera experiencia práctica dentro del laboratorio digital de PictoBlox. Cuando Niko muestre su saludo en pantalla y escuchemos su voz, sabremos que el laboratorio está listo para crear proyectos.',
    learningObjective: 'Familiarizarse con el entorno PictoBlox, cargar fondos, sprites, agregar la extensión Texto a Voz y construir el primer programa funcional "Hola Mundo".',
    previousConcepts: [
      'Interfaz de PictoBlox: Escenario, Sprites, Fondos, Bloques',
      'Eventos y Bandera Verde',
      'Sintetización de voz por computadora'
    ],
    requiredMaterials: [
      'Computadora / Tablet / Laptop con PictoBlox instalado o acceso a pictoblox.ai'
    ],
    extensions: ['Texto a Voz (Text to Speech)'],
    sb3Project: {
      id: 'res-sb3-holamundo',
      name: 'Proyecto Hola Mundo (Hola_mundo.sb3)',
      fileName: 'Hola_mundo.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Hola_mundo.sb3',
      description: 'Archivo de proyecto oficial de PictoBlox con la programación completa del saludo de Niko y síntesis de voz.',
      howToUse: 'Descargar y abrir en PictoBlox desde Menú Archivo -> Abrir.'
    },
    resources: [
      {
        id: 'res-img-lab',
        name: 'Escenario del Laboratorio',
        fileName: 'Laboratorio.png',
        fileType: 'image',
        fileUrl: '/resources/images/Laboratorio.png',
        description: 'Fondo de alta tecnología con mesa de experimentos y pizarra para ambientar el escenario.',
        howToUse: 'Cargar en la sección Fondos del escenario.'
      },
      {
        id: 'res-img-niko',
        name: 'Personaje Niko',
        fileName: 'Niko.png',
        fileType: 'image',
        fileUrl: '/resources/images/Niko.png',
        description: 'Sprite del científico e inventor Niko para colocar como protagonista del programa.',
        howToUse: 'Cargar como nuevo Objeto (Sprite).'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Abre PictoBlox',
        instructions: [
          'En el buscador de Windows o menú de aplicaciones, escribe PictoBlox.',
          'Abre el programa.',
          'Cuando se cargue la pantalla principal, selecciona la opción "Bloques" (Block Coding).'
        ],
        tip: 'Si no puedes instalar software en tu equipo, puedes ingresar directamente a https://pictoblox.ai en tu navegador.'
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Cambia el fondo del laboratorio',
        instructions: [
          'Ve a la esquina inferior derecha del escenario y haz clic en "Fondos".',
          'Selecciona la opción "Cargar fondo" (Upload Backdrop).',
          'Selecciona la imagen Laboratorio.png proporcionada.',
          'Cuando se abra la ventana de edición de disfraces, no hagas ningún cambio y regresa directamente a la pestaña "Bloques".'
        ]
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Cambia el personaje',
        instructions: [
          'Elimina el personaje que viene por defecto (Toby) haciendo clic en el icono de la papelera.',
          'Haz clic en el botón de agregar personaje y selecciona "Subir objeto" (Upload Sprite).',
          'Carga la imagen Niko.png desde tus archivos.',
          'Una vez cargado, mueve al personaje hasta que quede bien ubicado en el piso del laboratorio.',
          'En las propiedades del Sprite, dale un tamaño del 70%.'
        ],
        tip: 'Ajustar el tamaño a 70% permite que Niko se vea proporcionado con los muebles del laboratorio.'
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Inicia el programa',
        instructions: [
          'Asegúrate de tener seleccionado al personaje Niko en la lista de objetos.',
          'Ve a la categoría de bloques "Eventos" (color amarillo).',
          'Arrastra el bloque "al hacer clic en [bandera verde]" al área central de programación.'
        ],
        blockExplanation: {
          event: 'Al hacer clic en la bandera verde en la parte superior del escenario.',
          action: 'Inicia la ejecución secuencial de todos los bloques conectados debajo.',
          spriteTarget: 'Niko',
          successResult: 'El programa despierta y se prepara para ejecutar las instrucciones.'
        }
      },
      {
        stepNumber: 5,
        title: 'Paso 5: Muestra el saludo en pantalla',
        instructions: [
          'Ve a la categoría de bloques "Apariencia" (color morado).',
          'Busca el bloque "decir [Hola!]".',
          'Escribe dentro del espacio de texto: "Hola, soy Niko".',
          'Conecta este bloque directamente debajo del bloque de la bandera verde.'
        ],
        blockExplanation: {
          event: 'Continuación del bloque bandera verde.',
          action: 'Muestra una burbuja de cómic sobre la cabeza de Niko con el mensaje.',
          spriteTarget: 'Niko',
          successResult: 'Aparece una burbuja de diálogo visual sobre Niko con el texto "Hola, soy Niko".'
        }
      },
      {
        stepNumber: 6,
        title: 'Paso 6: ¡Prueba tu programa!',
        instructions: [
          'Haz clic en la bandera verde ubicada sobre el escenario.',
          'Verás que aparece la burbuja de texto sobre Niko diciendo: "Hola, soy Niko".',
          'Esto sirve para comprobar que el sprite y el texto están correctamente configurados.'
        ]
      },
      {
        stepNumber: 7,
        title: 'Paso 7: Haz que Niko hable con voz real',
        instructions: [
          'Haz clic en el botón "Añadir extensión" (icono morado en la esquina inferior izquierda).',
          'Selecciona la extensión "Texto a voz" (Text to Speech).',
          'Verás que aparecen nuevos bloques de color verde azulado en la barra lateral.',
          'Arrastra el bloque "fijar idioma a [Spanish (Latin American)]".',
          'Arrastra el bloque "asignar voz a [tenor]" (o chillido).',
          'Arrastra el bloque "decir [Hola, soy Niko]".',
          'Conecta estos bloques en la secuencia mostrada debajo de la bandera verde.'
        ],
        blockExplanation: {
          event: 'Ejecución tras presionar la bandera.',
          action: 'Configura el idioma a español latinoamericano, elige el tono de voz y sintetiza el audio con los parlantes.',
          spriteTarget: 'Niko',
          successResult: 'Niko habla con voz clara por los altavoces de la computadora diciendo "Hola, soy Niko".'
        }
      },
      {
        stepNumber: 8,
        title: 'Paso 8: ¡Prueba tu programa completo!',
        instructions: [
          'Presiona la bandera verde.',
          'Comprueba que se cumplan dos cosas al mismo tiempo: 1) Ver el texto en pantalla en la burbuja, 2) Escuchar a Niko hablar con voz clara.',
          '¡Felicidades! Has creado tu primer programa "Hola Mundo" con síntesis de voz.'
        ]
      },
      {
        stepNumber: 9,
        title: 'Paso 9: Guarda tu programa',
        instructions: [
          'Haz clic en el menú superior "Archivo" -> "Guardar como".',
          'Elige tu carpeta de trabajo.',
          'Guarda el archivo con el nombre: "Hola_mundo.sb3".'
        ]
      }
    ],
    conclusion: [
      'En esta actividad realizaste tu primer programa, conocido en la informática como "Hola Mundo".',
      'Aprendiste a preparar el escenario del laboratorio, agregar personajes (sprites), utilizar eventos de inicio y dar voz a tus creaciones con la extensión Texto a Voz.',
      'Tu laboratorio digital está listo para los siguientes desafíos de Inteligencia Artificial.'
    ],
    quiz: [
      {
        id: 'q2-1',
        question: '¿Qué bloque se utiliza para iniciar la ejecución de un programa cuando pulsamos la bandera verde?',
        options: [
          'cambiar fondo a [Laboratorio]',
          'al hacer clic en bandera verde',
          'detener todos',
          'fijar tamaño al 100%'
        ],
        correctOptionIndex: 1,
        explanation: 'El bloque "al hacer clic en bandera verde" pertenece a la categoría Eventos y es el disparador principal en PictoBlox.'
      },
      {
        id: 'q2-2',
        question: '¿Qué extensión de PictoBlox permite que los personajes pronuncien palabras en audio?',
        options: [
          'Detección de Objetos',
          'Texto a Voz (Text to Speech)',
          'Música',
          'Puntero del Ratón'
        ],
        correctOptionIndex: 1,
        explanation: 'Texto a Voz convierte oraciones escritas en voz humana sintetizada a través de los parlantes.'
      }
    ],
    instructorGuide: {
      summary: 'Primera práctica con el software PictoBlox. El objetivo es perder el miedo a la interfaz, cargar recursos multimedia externos y experimentar con la síntesis de voz.',
      checklist: [
        'Verificar que los parlantes o audífonos del equipo tengan volumen adecuado.',
        'Asegurarse de que el estudiante guarde el archivo Hola_mundo.sb3 en una carpeta identificable.',
        'Motivar al alumno a probar diferentes tipos de voces (tenor, alto, chillido, gigante).'
      ],
      discussionQuestions: [
        '¿Por qué crees que es importante que un robot o asistente pueda hablar con voz en lugar de solo mostrar texto?',
        '¿En qué dispositivos de tu casa has escuchado voces sintetizadas?'
      ]
    }
  },
  {
    id: 't1-act3',
    tomo: 1,
    courseId: 'aprende-ia-jugando',
    number: 3,
    title: 'Actividad de Laboratorio 3: Mi primer rostro detectado',
    shortTitle: '3. Mi primer rostro detectado',
    iconName: 'ScanFace',
    description: 'En esta actividad activarás la cámara y comprobarás cómo la máquina (computadora) detecta tu rostro en tiempo real mediante Inteligencia Artificial, dibujando un cuadro delimitador y reaccionando según si estás o no frente a la pantalla.',
    learningObjective: 'Aprender a utilizar la extensión Face Detection en PictoBlox, procesar imágenes en tiempo real desde la cámara, medir el número de rostros y construir condicionales (si / si no).',
    previousConcepts: [
      'Diferencia entre Detección de Rostro y Reconocimiento Facial',
      'Coordenadas en pantalla y cajas delimitadoras (Bounding Boxes)',
      'Bucle por siempre y Condicionales con Operadores de comparación (>)'
    ],
    requiredMaterials: [
      'Computadora con cámara web funcional (integrada o USB)',
      'PictoBlox con permisos de cámara habilitados'
    ],
    extensions: ['Detección de Rostros (Face Detection)', 'Texto a Voz (Text to Speech)'],
    privacyNotice: 'La cámara solo procesa las imágenes localmente en la memoria del programa para detectar puntos faciales. No se comparten fotos personales en internet.',
    sb3Project: {
      id: 'res-sb3-det-rostros',
      name: 'Proyecto Detección de Rostros (Deteccion_de_rostros.sb3)',
      fileName: 'Deteccion_de_rostros.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Deteccion_de_rostros.sb3',
      description: 'Proyecto completo de PictoBlox con detección en tiempo real de rostros y respuesta de Niko.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-img-lab-t1-3',
        name: 'Escenario Laboratorio',
        fileName: 'Laboratorio.png',
        fileType: 'image',
        fileUrl: '/resources/images/Laboratorio.png',
        description: 'Fondo del laboratorio.',
        howToUse: 'Cargar como fondo.'
      },
      {
        id: 'res-img-niko-t1-3',
        name: 'Personaje Niko',
        fileName: 'Niko.png',
        fileType: 'image',
        fileUrl: '/resources/images/Niko.png',
        description: 'Personaje científico Niko.',
        howToUse: 'Cargar como sprite.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Prepara tu laboratorio de trabajo',
        instructions: [
          'Abre PictoBlox en modo Bloques.',
          'Carga el escenario del Laboratorio y agrega al personaje Niko (tamaño 70%).',
          'Haz clic en "Añadir extensiones" en la esquina inferior izquierda.',
          'Añade dos extensiones: 1) "Detección de Rostros (Face Detection)" y 2) "Texto a Voz (Text to Speech)".',
          'Verifica que ambas extensiones aparezcan activas en tu paleta de bloques.'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Guarda tu proyecto correctamente',
        instructions: [
          'Haz clic en "Archivo" -> "Guardar como".',
          'Guarda el archivo con el nombre: "Deteccion_de_rostros.sb3".',
          'Si aparece una ventana solicitando consentimiento para guardar datos de rostro ("Save WITH Face Details"), selecciona "Save WITH Face Details" o "Sí".'
        ]
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Niko te da la bienvenida',
        instructions: [
          'Conecta debajo de "al hacer clic en [bandera verde]" los bloques de bienvenida:',
          '1. fijar idioma a [Spanish (Latin American)]',
          '2. asignar voz a [tenor]',
          '3. decir [Hola, soy Niko]',
          '4. decir [Hola, soy Niko] (bloque de Texto a Voz)',
          '5. decir [Quédate frente a la cámara y veamos si puedo verte]',
          '6. decir [Quédate frente a la cámara y veamos si puedo verte] (Texto a Voz)'
        ],
        tip: 'Usar el bloque morado (Apariencia) junto con el verde azulado (Texto a voz) hace que Niko hable y muestre texto al unísono.'
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Activa la cámara',
        instructions: [
          'Ve a la extensión Face Detection (color verde oscuro).',
          'Agrega el bloque: "cambiar on de video en stage con [30] % transparency".',
          'Esto encenderá la cámara en el fondo del escenario permitiendo ver a Niko encima de tu video con una ligera transparencia.'
        ],
        blockExplanation: {
          event: 'Tras el saludo inicial.',
          action: 'Enciende la webcam y mezcla la imagen del video con el fondo del laboratorio al 30% de transparencia.',
          spriteTarget: 'Escenario / Niko',
          successResult: 'La cámara se enciende y te ves en el fondo del laboratorio.'
        }
      },
      {
        stepNumber: 5,
        title: 'Paso 5: Probamos la cámara',
        instructions: [
          'Pon el laboratorio en modo Pantalla Completa (botón con 4 flechas en la esquina superior derecha).',
          'Presiona la bandera verde.',
          'Comprueba que Niko te saluda, la pantalla se vuelve transparente y te ves en el fondo.',
          'Sal de pantalla completa para continuar programando.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Paso 6: Dibujamos la caja del rostro',
        instructions: [
          'Agrega el bloque: "show cuadro delimitador" (Face Detection).',
          'Agrega el bloque de control: "por siempre".',
          'Dentro del bloque "por siempre", coloca: "analizar imagen desde [camera]".'
        ],
        blockExplanation: {
          event: 'Bucle continuo e infinito.',
          action: 'La IA analiza cada fotograma de la cámara y dibuja una caja roja/verde alrededor de cualquier rostro humano detectado.',
          aiData: 'Bounding Box (coordenadas x, y, width, height)',
          spriteTarget: 'Cámara / Motor IA',
          successResult: 'Aparece un recuadro que sigue tu rostro en tiempo real mientras te mueves.'
        }
      },
      {
        stepNumber: 7,
        title: 'Paso 7: Tomamos una decisión lógica',
        instructions: [
          'Ve a la sección Control (color naranja).',
          'Busca el bloque condicional "si [ ] entonces / si no".',
          'Arrástralo y encájalo dentro del bloque "por siempre", justo debajo de "analizar imagen desde camera".'
        ]
      },
      {
        stepNumber: 8,
        title: 'Paso 8: ¿Hay un rostro o no?',
        instructions: [
          'Ve a la sección Operadores (color verde claro) y busca el bloque de comparación mayor que "[ ] > [ ]".',
          'Colócalo en el hueco hexagonal del bloque "si".',
          'En el lado izquierdo, coloca el bloque de Face Detection: "obtener # de caras".',
          'En el lado derecho, escribe el número "0".',
          'Condición final: si (obtener # de caras > 0) entonces...'
        ],
        blockExplanation: {
          event: 'Evaluación en cada fotograma del bucle.',
          condition: '¿El número de caras detectadas por la IA es mayor que 0?',
          action: 'Si es VERDADERO (hay alguien), ejecuta la rama "si". Si es FALSO (no hay nadie), ejecuta la rama "si no".',
          aiData: 'Conteo de rostros en la imagen',
          successResult: 'El programa distingue con certeza si hay una persona frente al computador o no.'
        }
      },
      {
        stepNumber: 9,
        title: 'Paso 9: Programar la reacción cuando SÍ hay un rostro',
        instructions: [
          'Dentro del espacio "si", agrega:',
          '1. decir [Detecté un rostro frente a la cámara. ¡Hola, humano curioso!]',
          '2. decir [Detecté un rostro frente a la cámara. ¡Hola, humano curioso!] (bloque Texto a Voz).'
        ]
      },
      {
        stepNumber: 10,
        title: 'Paso 10: Programar la reacción cuando NO hay un rostro',
        instructions: [
          'Dentro del espacio "si no", agrega:',
          '1. decir [No veo ningún rostro. ¿Te escondiste o sigo esperando?]',
          '2. decir [No veo ningún rostro. ¿Te escondiste o sigo esperando!] (bloque Texto a Voz).'
        ],
        creativeTip: '¡Puedes cambiar el mensaje por un chiste o frase divertida como "¿A dónde te fuiste?" o "¡Me quedé solito!".'
      },
      {
        stepNumber: 11,
        title: 'Paso 11: ¡Prueba tu creación en pantalla completa!',
        instructions: [
          'Activa la pantalla completa.',
          'Presiona la bandera verde.',
          'Ponte frente a la cámara: Niko te saludará reconociendo tu presencia.',
          '¡Ahora agáchate o tápate para esconderte de la cámara!: Observa cómo Niko cambia su diálogo al no encontrar ningún rostro.'
        ]
      },
      {
        stepNumber: 12,
        title: 'Paso 12: Guarda los cambios',
        instructions: [
          'Haz clic en el icono de guardar 💾.',
          'Asegúrate de confirmar "Guardar datos del rostro".'
        ]
      }
    ],
    experiments: [
      {
        id: 'exp3-1',
        title: 'Experimento 1: Tápate un ojo',
        instruction: 'Colócate frente a la cámara y cúbrete un ojo con la mano. ¿La IA sigue detectando tu rostro?',
        type: 'hybrid',
        options: ['Sí, lo detecta', 'No, se perdió la detección'],
        questionPrompt: '¿Qué ocurrió con la caja delimitadora?'
      },
      {
        id: 'exp3-2',
        title: 'Experimento 2: Aléjate de la cámara',
        instruction: 'Da unos pasos hacia atrás alejándote lentamente del lente de la cámara.',
        type: 'hybrid',
        options: ['Sí, sigue detectando', 'No, a cierta distancia deja de detectar'],
        questionPrompt: '¿Qué cambió en el tamaño de la caja delimitadora?'
      },
      {
        id: 'exp3-3',
        title: 'Experimento 3: Muévete rápidamente',
        instruction: 'Mueve la cabeza rápidamente de un lado a otro frente al lente.',
        type: 'hybrid',
        options: ['La caja sigue el rostro sin problemas', 'La detección parpadea o se pierde por instantes'],
        questionPrompt: '¿Por qué crees que ocurre esto con la velocidad?'
      },
      {
        id: 'exp3-4',
        title: 'Experimento 4: Varias personas',
        instruction: 'Pídele a un amigo o compañero que se coloque a tu lado frente a la cámara.',
        type: 'hybrid',
        options: ['Detecta a uno solo', 'Detecta varios rostros con cajas separadas'],
        questionPrompt: '¿Qué valor devuelve el bloque "obtener # de caras" cuando hay 2 personas?'
      }
    ],
    conclusion: [
      'En esta actividad aprendiste cómo una computadora puede "ver" un rostro utilizando Inteligencia Artificial y visión por computadora.',
      'Descubriste cómo funciona el proceso en tiempo real: captura de video, análisis de patrones faciales y toma de decisiones lógicas con condicionales si/si no.',
      'Ya sabes detectar rostros; en las siguientes prácticas usaremos puntos clave como la nariz para controlar videojuegos completos.'
    ],
    quiz: [
      {
        id: 'q3-1',
        question: '¿Qué información proporciona el bloque "obtener # de caras" de la extensión Face Detection?',
        options: [
          'El nombre de la persona',
          'La cantidad de rostros humanos que la cámara está viendo en ese momento',
          'La edad exacta del usuario',
          'El color de los ojos'
        ],
        correctOptionIndex: 1,
        explanation: 'El bloque devuelve un número entero (0, 1, 2...) con el recuento de rostros visibles en el encuadre.'
      },
      {
        id: 'q3-2',
        question: '¿Por qué colocamos "analizar imagen desde camera" dentro de un bloque "por siempre"?',
        options: [
          'Para que la computadora se apague sola',
          'Para que la IA revise la cámara continuamente en cada instante y no una sola vez',
          'Porque si no, los bloques se borran',
          'Para cambiar el color del escenario'
        ],
        correctOptionIndex: 1,
        explanation: 'El bucle por siempre permite que el análisis sea continuo en tiempo real, adaptándose a los movimientos del usuario.'
      }
    ],
    instructorGuide: {
      summary: 'Práctica fundamental que conecta hardware (cámara web) con el modelo de visión artificial y la lógica condicional.',
      checklist: [
        'Comprobar que la iluminación del aula sea adecuada (evitar contraluces fuertes detrás de los alumnos).',
        'Verificar que la ventana de permisos de la cámara haya sido autorizada en el navegador o sistema operativo.',
        'Estimular la curiosidad preguntando por qué la IA no confunde una mano con una cara.'
      ],
      discussionQuestions: [
        '¿Por qué factores como poca luz o cubrirse media cara dificultan el trabajo de la IA?',
        '¿En qué aplicaciones reales has visto cámaras que detectan caras (filtros de Instagram/TikTok, cámaras de seguridad)?'
      ]
    },
    interactiveSimulatorType: 'face_detect'
  },
  {
    id: 't1-act4',
    tomo: 1,
    courseId: 'aprende-ia-jugando',
    number: 4,
    title: 'Actividad de Laboratorio 4: Gato y Ratón IA',
    shortTitle: '4. Gato y Ratón IA',
    iconName: 'Gamepad2',
    description: 'En esta actividad controlarás un ratón usando tu nariz gracias a la Inteligencia Artificial. El objetivo será esquivar a los gatos mientras aparecen y se mueven por la pantalla para acumular el mayor puntaje.',
    learningObjective: 'Aprender a extraer coordenadas de puntos clave faciales (posición Y de la nariz), clonar sprites enemigos, manejar colisiones y crear un videojuego interactivo con control corporal.',
    previousConcepts: [
      'Puntos clave del rostro: nariz (nose), ojos y boca',
      'Creación y comportamiento de Clones',
      'Manejo de variables de puntaje (score) y velocidad (speed)',
      'Detección de colisiones (¿tocando Cat 2?) y cambio de fondos'
    ],
    requiredMaterials: [
      'Computadora con cámara web',
      'PictoBlox instalado'
    ],
    extensions: ['Detección de Rostros (Face Detection)'],
    sb3Project: {
      id: 'res-sb3-gato-raton',
      name: 'Proyecto Gato y Ratón IA (Gato_y_Raton_IA.sb3)',
      fileName: 'Gato_y_Raton_IA.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Gato_y_Raton_IA.sb3',
      description: 'Proyecto completo de PictoBlox con el videojuego Gato y Ratón IA funcionando con control de nariz.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-img-mouse',
        name: 'Personaje Mouse 1 (Ratón)',
        fileName: 'Mouse 1.svg',
        fileType: 'image',
        fileUrl: '/resources/images/mouse1.svg',
        description: 'Sprite del ratón protagonista que esquiva a los gatos.',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-cat',
        name: 'Objeto Cat 2 (Gato)',
        fileName: 'Cat 2.svg',
        fileType: 'image',
        fileUrl: '/resources/images/cat2.svg',
        description: 'Sprite del gato enemigo que se clona y avanza hacia la izquierda.',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-wall',
        name: 'Fondo Wall 1',
        fileName: 'Wall 1.png',
        fileType: 'image',
        fileUrl: '/resources/images/wall1.png',
        description: 'Fondo de pared de ladrillos para el juego.',
        howToUse: 'Cargar como fondo principal.'
      },
      {
        id: 'res-img-gameover',
        name: 'Fondo Game Over',
        fileName: 'game_over.png',
        fileType: 'image',
        fileUrl: '/resources/images/game_over.png',
        description: 'Pantalla retro de fin de juego.',
        howToUse: 'Cargar como fondo secundario.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Abrir PictoBlox',
        instructions: [
          'Abre PictoBlox y selecciona la opción "Bloques".'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Cargar los personajes u objetos',
        instructions: [
          'Elimina el personaje por defecto Toby.',
          'Carga el sprite "Mouse 1" (el ratón).',
          'Carga el sprite "Cat 2" (el gato).'
        ]
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Cargar los fondos',
        instructions: [
          'En el escenario, carga el fondo principal: "Wall 1".',
          'Carga también el fondo de finalización: "game_over".'
        ]
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Agregar las extensiones',
        instructions: [
          'Haz clic en "Añadir extensiones" y agrega "Detección de Caras (Face Detection)".'
        ]
      },
      {
        stepNumber: 5,
        title: 'Paso 5: Programación del personaje Mouse 1 (Ratón)',
        instructions: [
          'Selecciona al sprite "Mouse 1".',
          'Arma el bloque inicial:',
          '1. al hacer clic en [bandera verde]',
          '2. cambiar fondo a [Wall 1]',
          '3. fijar tamaño al [50] %',
          '4. ir a x: [-200] y: [0]',
          '5. cambiar on de video en stage con [60] % transparency',
          '6. hide cuadro delimitador',
          '7. por siempre:',
          '   - analizar imagen desde camera',
          '   - ir a x: [-200] y: (obtener y position de nose de cara 1)',
          '   - si ¿tocando Cat 2? entonces:',
          '       - esconder',
          '       - cambiar fondo a [game_over]',
          '       - detener todos'
        ],
        blockExplanation: {
          event: 'Bucle de juego continuo con Face Detection.',
          action: 'Fija la coordenada X en -200 (lado izquierdo) y vincula la coordenada Y directamente a la altura de tu nariz.',
          condition: 'Si el ratón colisiona con el gato (¿tocando Cat 2?).',
          aiData: 'Coordenada Y del punto clave "nose" de la cara 1.',
          spriteTarget: 'Mouse 1',
          successResult: 'El ratón sube y baja fluidamente en la pantalla siguiendo el movimiento de tu nariz.',
          failureResult: 'Si choca con un gato, el juego finaliza mostrando Game Over.'
        }
      },
      {
        stepNumber: 6,
        title: 'Paso 6: Crear las variables score y speed en Cat 2',
        instructions: [
          'Haz clic sobre el personaje "Cat 2".',
          'Ve a la categoría "Variables" y presiona "Crear una variable".',
          'Crea una variable llamada "score" (para todos los objetos).',
          'Crea otra variable llamada "speed" (para todos los objetos).'
        ]
      },
      {
        stepNumber: 7,
        title: 'Paso 7: Programación de Cat 2 (Generador y Clones)',
        instructions: [
          'Programa el inicio del gato original:',
          '1. al hacer clic en [bandera verde]',
          '2. dar a [score] el valor [0]',
          '3. apuntar en dirección [-90]',
          '4. fijar tamaño al [80] %',
          '5. repetir [3]:',
          '   - crear clon de mí mismo',
          '   - esperar [0.2] segundos',
          '6. esconder',
          '',
          'Programa el comportamiento de cada clon:',
          '1. al comenzar como clon',
          '2. ir a x: [180] y: (número aleatorio entre -170 y 170)',
          '3. dar a [speed] el valor [-15]',
          '4. mostrar',
          '5. por siempre:',
          '   - apuntar en dirección [-90]',
          '   - sumar a x (speed)',
          '   - si (posición en x < -220) entonces:',
          '       - sumar a [score] [1]',
          '       - ir a x: [180] y: (número aleatorio entre -170 y 170)'
        ],
        blockExplanation: {
          event: 'Comportamiento del clon del gato.',
          action: 'Aparece a la derecha en una altura aleatoria y avanza hacia la izquierda a velocidad -15.',
          condition: 'Si llega al extremo izquierdo (x < -220) sin tocar al ratón.',
          successResult: 'El jugador gana 1 punto de score y el gato se teletransporta a la derecha para un nuevo ataque continuo.'
        }
      },
      {
        stepNumber: 8,
        title: 'Paso 8: Guardar, Ejecutar y Probar el Juego',
        instructions: [
          'Guarda el proyecto con el nombre: "Gato y Ratón IA".',
          'Maximiza la pantalla a tamaño completo y haz clic en la bandera verde.',
          'Coloca tu rostro frente a la cámara y mueve tu nariz hacia arriba y hacia abajo para esquivar a los 3 gatos.',
          'Observa cómo el puntaje sube cada vez que logras que un gato cruce la pantalla.'
        ]
      }
    ],
    experiments: [
      {
        id: 'exp4-1',
        title: 'Experimento 1: Cambia la velocidad de los gatos',
        instruction: 'Modifica la variable speed a valores como -10, -20 o -25 en el código del clon.',
        type: 'hybrid',
        options: ['Más fácil con -10', 'Mucho más difícil con -25', 'Igual'],
        questionPrompt: '¿Qué ocurrió con la dificultad del juego?'
      },
      {
        id: 'exp4-2',
        title: 'Experimento 2: Cambia la cantidad de gatos',
        instruction: 'Cambia el bloque "repetir 3" por "repetir 5" o "repetir 6".',
        type: 'hybrid',
        options: ['Aparecen más gatos en fila', 'El juego se vuelve caótico y desafiante'],
        questionPrompt: '¿Qué notaste al tener más clones simultáneos?'
      },
      {
        id: 'exp4-3',
        title: 'Experimento 3: Cambia la posición de aparición',
        instruction: 'Modifica el bloque "número aleatorio entre -170 y 170" a "entre -50 y 50".',
        type: 'hybrid',
        options: ['Los gatos aparecen más juntos en el centro', 'Los gatos aparecen más separados'],
        questionPrompt: '¿Cómo cambió la estrategia para esquivarlos?'
      },
      {
        id: 'exp4-4',
        title: 'Experimento 4: Prueba con diferentes niveles de luz',
        instruction: 'Juega en un lugar bien iluminado y luego con la luz apagada.',
        type: 'hybrid',
        options: ['Funciona mejor con buena luz', 'Funciona mejor con poca luz', 'Funciona igual'],
        questionPrompt: '¿La IA siguió detectando tu nariz con precisión en la penumbra?'
      }
    ],
    conclusion: [
      'Lograste construir un videojuego interactivo completo controlado por visión artificial sin tocar el teclado ni el ratón.',
      'Comprendiste cómo transformar las coordenadas de un punto facial (nose Y) en la posición física de un objeto en pantalla.',
      'Dominaste el uso de clones, velocidades negativas en el eje X y detección de colisiones.'
    ],
    quiz: [
      {
        id: 'q4-1',
        question: '¿Qué punto clave del rostro usamos para mover al ratón en el eje Y?',
        options: [
          'La oreja izquierda',
          'La nariz (nose)',
          'El zapato',
          'La barbilla (chin)'
        ],
        correctOptionIndex: 1,
        explanation: 'Usamos "obtener y position de nose de cara 1" porque la nariz es el punto central más estable del rostro.'
      },
      {
        id: 'q4-2',
        question: '¿Por qué sumamos un valor negativo como -15 al eje X del gato?',
        options: [
          'Para que el gato suba hacia el techo',
          'Para que el gato avance de derecha a izquierda en la pantalla',
          'Para hacer que el gato sea invisible',
          'Para pausar el juego'
        ],
        correctOptionIndex: 1,
        explanation: 'En las coordenadas cartesianas de PictoBlox, los números negativos en X mueven los objetos hacia la izquierda.'
      }
    ],
    instructorGuide: {
      summary: 'Esta actividad es uno de los proyectos favoritos de los estudiantes. Demuestra de manera lúdica el control gestual por visión artificial.',
      checklist: [
        'Asegurar que la cámara esté a la altura de los ojos del estudiante para un movimiento vertical cómodo.',
        'Verificar que el bloque "hide cuadro delimitador" esté activo para que el cuadro verde no tape el juego.',
        'Explicar el concepto de coordenadas X (horizontal) e Y (vertical).'
      ],
      discussionQuestions: [
        '¿Cómo crees que funcionan las consolas como Xbox Kinect o Nintendo Switch para detectar movimientos del cuerpo?',
        '¿Qué otros juegos clásicos se podrían adaptar con control por nariz u ojos?'
      ]
    },
    interactiveSimulatorType: 'mouse_cat'
  },
  {
    id: 't1-act5',
    tomo: 1,
    courseId: 'aprende-ia-jugando',
    number: 5,
    title: 'Actividad de Laboratorio 5: Flappy Bird IA',
    shortTitle: '5. Flappy Bird IA',
    iconName: 'Bird',
    description: 'En esta actividad controlarás un pájaro usando tu nariz en dos dimensiones (eje X e Y) gracias a la Inteligencia Artificial. Deberás esquivar tuberías continuas y mantenerlo volando sin chocar para romper tu récord.',
    learningObjective: 'Programar el movimiento en 2D (ejes X e Y simultáneos) guiados por la nariz, generar obstáculos continuos con temporizador de clones y gestionar la destrucción controlada de clones al salir de la pantalla.',
    previousConcepts: [
      'Coordenadas 2D (X e Y simultáneas)',
      'Bucle "repetir hasta que" para movimiento de obstáculos',
      'Comando "eliminar este clon" para optimizar memoria',
      'Condición de colisión con pipes'
    ],
    requiredMaterials: [
      'Computadora con cámara web',
      'PictoBlox instalado'
    ],
    extensions: ['Detección de Rostros (Face Detection)'],
    sb3Project: {
      id: 'res-sb3-flappy',
      name: 'Proyecto Flappy Bird IA (Flappy_Bird_IA.sb3)',
      fileName: 'Flappy_Bird_IA.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Flappy_Bird_IA.sb3',
      description: 'Proyecto completo de PictoBlox con el videojuego Flappy Bird IA con control facial.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-img-bird',
        name: 'Personaje bird (Ave)',
        fileName: 'bird.svg',
        fileType: 'image',
        fileUrl: '/resources/images/bird.svg',
        description: 'Sprite del simpático pájaro amarillo protagonista.',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-pipes',
        name: 'Objeto pipes (Tuberías)',
        fileName: 'pipes.svg',
        fileType: 'image',
        fileUrl: '/resources/images/pipes.svg',
        description: 'Obstáculo de tuberías superior e inferior con espacio central para pasar.',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-sky',
        name: 'Fondo Blue Sky 2',
        fileName: 'Blue Sky 2.svg',
        fileType: 'image',
        fileUrl: '/resources/images/bluesky2.svg',
        description: 'Fondo de cielo azul con nubes.',
        howToUse: 'Cargar como fondo principal.'
      },
      {
        id: 'res-img-gameover-flappy',
        name: 'Fondo Game Over',
        fileName: 'game_over.png',
        fileType: 'image',
        fileUrl: '/resources/images/flappy_game_over.png',
        description: 'Pantalla de fin de juego.',
        howToUse: 'Cargar como fondo secundario.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Abrir PictoBlox y preparar el escenario',
        instructions: [
          'Abre PictoBlox en modo Bloques.',
          'Elimina a Toby.',
          'Carga el sprite "bird" y el sprite "pipes".',
          'Carga los fondos "Blue Sky 2" y "game_over".',
          'Agrega la extensión "Detección de Caras (Face Detection)".'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Programación del personaje bird (Ave)',
        instructions: [
          'Selecciona al sprite "bird".',
          'Arma el siguiente código:',
          '1. al hacer clic en [bandera verde]',
          '2. cambiar on de video en stage con [60] % transparency',
          '3. hide cuadro delimitador',
          '4. cambiar fondo a [Blue Sky 2]',
          '5. mostrar',
          '6. por siempre:',
          '   - analizar imagen desde camera',
          '   - ir a x: (obtener x position de nose de cara 1) y: (obtener y position de nose de cara 1)',
          '   - si ¿tocando pipes? entonces:',
          '       - esconder',
          '       - cambiar fondo a [game_over]',
          '       - detener todos'
        ],
        blockExplanation: {
          event: 'Control de vuelo en tiempo real.',
          action: 'Vincula tanto la posición horizontal (X) como la vertical (Y) del ave a la nariz del jugador.',
          condition: 'Si el ave toca las tuberías (¿tocando pipes?).',
          aiData: 'Coordenadas X e Y de "nose".',
          spriteTarget: 'bird',
          successResult: 'El ave vuela con libertad por toda la pantalla siguiendo con precisión la cabeza del usuario.',
          failureResult: 'Al chocar con la tubería, el ave desaparece y se congela el juego en Game Over.'
        }
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Crear la variable score en el objeto pipes',
        instructions: [
          'Selecciona el objeto "pipes".',
          'En la categoría Variables, crea la variable "score" para todos los objetos.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Programación del generador de tuberías',
        instructions: [
          'En el objeto "pipes", arma el script del objeto principal:',
          '1. al hacer clic en [bandera verde]',
          '2. dar a [score] el valor [0]',
          '3. ir a x: [259] y: [0]',
          '4. esconder',
          '5. por siempre:',
          '   - esperar [4] segundos',
          '   - crear clon de mí mismo'
        ]
      },
      {
        stepNumber: 5,
        title: 'Paso 5: Programación del comportamiento del clon de tubería',
        instructions: [
          'Al lado del código anterior en "pipes", arma el script del clon:',
          '1. al comenzar como clon',
          '2. mostrar',
          '3. dar a y el valor (número aleatorio entre -80 y 80)',
          '4. repetir hasta que (posición en x < -250):',
          '   - sumar a x [-5]',
          '5. sumar a [score] [10]',
          '6. eliminar este clon'
        ],
        blockExplanation: {
          event: 'Ciclo de vida de cada tubería.',
          action: 'Aparece a la derecha con altura aleatoria, avanza hacia la izquierda restando 5 a X en cada ciclo.',
          condition: 'Repite el avance hasta cruzar toda la pantalla (x < -250).',
          successResult: 'Al pasar exitosamente sin colisión, suma 10 puntos a score y se autoelimina para no saturar la memoria.'
        }
      },
      {
        stepNumber: 6,
        title: 'Paso 6: Guardar y Probar el Juego',
        instructions: [
          'Guarda tu proyecto con el nombre: "Flappy_Bird_IA.sb3".',
          'Pon la pantalla completa y presiona la bandera verde.',
          'Mueve tu cabeza en todas direcciones para guiar al pájaro a través del hueco de las tuberías.'
        ]
      }
    ],
    experiments: [
      {
        id: 'exp5-1',
        title: 'Experimento 1: Cambia la velocidad de las tuberías',
        instruction: 'Modifica el bloque "sumar a x -5" por "-10" o "-2".',
        type: 'hybrid',
        options: ['Con -10 van muy rápidas y es más difícil', 'Con -2 es muy lento y fácil'],
        questionPrompt: '¿Qué velocidad sentiste más cómoda para jugar?'
      },
      {
        id: 'exp5-2',
        title: 'Experimento 2: Cambia el tiempo de aparición',
        instruction: 'Cambia "esperar 4 segundos" por "esperar 2 segundos".',
        type: 'hybrid',
        options: ['Las tuberías aparecen más juntas', 'Aparecen más separadas'],
        questionPrompt: '¿Te dio tiempo de reaccionar entre una tubería y la siguiente?'
      },
      {
        id: 'exp5-3',
        title: 'Experimento 3: Prueba con varios fondos',
        instruction: 'Prueba jugar con un fondo liso y luego con una habitación desordenada detrás.',
        type: 'hybrid',
        options: ['En fondo liso la detección es más precisa', 'No hubo diferencia'],
        questionPrompt: '¿Qué factores visuales ayudaron a la cámara a no perder tu nariz?'
      }
    ],
    conclusion: [
      'Has construido una versión con IA del famoso juego Flappy Bird.',
      'Aprendiste a mapear dos dimensiones espaciales completas (X e Y) desde la visión computacional hacia el motor de juego.',
      'Comprendiste la estructura "repetir hasta que" y la importancia de destruir clones finalizados con "eliminar este clon".'
    ],
    quiz: [
      {
        id: 'q5-1',
        question: '¿Por qué es indispensable usar el bloque "eliminar este clon" al final del recorrido de la tubería?',
        options: [
          'Para que el pájaro pueda cantar',
          'Para liberar memoria y evitar que se acumulen clones invisibles que ralenticen el juego',
          'Para cambiar el color del cielo',
          'Porque si no, el puntaje se vuelve cero'
        ],
        correctOptionIndex: 1,
        explanation: 'Si no se eliminan los clones que salen de la pantalla, el programa acumularía cientos de objetos ocultos consumiendo memoria del computador.'
      },
      {
        id: 'q5-2',
        question: '¿Qué ventaja tiene controlar tanto X como Y con la nariz en este juego?',
        options: [
          'Permite esquivar hacia arriba, abajo, adelante y atrás de manera completamente natural',
          'Hace que el juego sea más lento',
          'Ninguna',
          'Permite apagar la cámara'
        ],
        correctOptionIndex: 0,
        explanation: 'Al mapear X e Y, el jugador tiene libertad bidimensional completa para navegar a través de los obstáculos.'
      }
    ],
    instructorGuide: {
      summary: 'Evolución natural del juego anterior, pasando de control 1D a control 2D bidimensional y bucles de control condicionados.',
      checklist: [
        'Verificar que el rango aleatorio en Y (-80 a 80) mantenga el hueco de la tubería dentro de la pantalla visible.',
        'Animar a los estudiantes a calibrar la distancia a la cámara (unos 50 a 70 cm del monitor es ideal).'
      ],
      discussionQuestions: [
        '¿Cómo ayuda la visión artificial a personas con discapacidades motrices para controlar computadoras sin usar las manos?'
      ]
    },
    interactiveSimulatorType: 'flappy'
  },
  {
    id: 't1-act6',
    tomo: 1,
    courseId: 'aprende-ia-jugando',
    number: 6,
    title: 'Actividad de Laboratorio 6: Batalla Espacial con IA',
    shortTitle: '6. Batalla Espacial con IA',
    iconName: 'Rocket',
    description: 'En esta actividad controlarás una nave espacial usando tu rostro con Inteligencia Artificial. Deberás disparar proyectiles automáticos, derribar naves enemigas con diferentes velocidades y puntuaciones, y evitar que te destruyan para alcanzar la victoria.',
    learningObjective: 'Integrar múltiples sprites concurrentes (Nave, Proyectiles, 3 tipos de Enemigos, Pantalla Final), sistema de mensajes broadcast (You Win, Game Over), efectos de sonido y condiciones de victoria/derrota.',
    previousConcepts: [
      'Mensajes entre sprites (enviar [Game Over] / al recibir [You Win])',
      'Efectos de sonido sincronizados (.mp3)',
      'Cambios de disfraz (Player -> Exploded)',
      'Jerarquía de enemigos con diferentes puntos y velocidades'
    ],
    requiredMaterials: [
      'Computadora con cámara web y parlantes/auriculares',
      'PictoBlox instalado'
    ],
    extensions: ['Detección de Caras (Face Detection)'],
    sb3Project: {
      id: 'res-sb3-espacial',
      name: 'Proyecto Batalla Espacial con IA (Batalla_Espacial_IA.sb3)',
      fileName: 'Batalla_Espacial_IA.sb3',
      fileType: 'sb3',
      fileUrl: '/resources/sb3/Batalla_Espacial_IA.sb3',
      description: 'Proyecto completo de PictoBlox con el videojuego de naves espaciales, proyectiles y 3 tipos de enemigos.',
      howToUse: 'Descargar y abrir en PictoBlox.'
    },
    resources: [
      {
        id: 'res-img-player',
        name: 'Personaje Player (Nave)',
        fileName: 'Player.sprite3',
        fileType: 'sprite3',
        fileUrl: '/resources/sprites/Player.sprite3',
        description: 'Sprite de la nave espacial defensora guiada por el rostro.',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-bullet',
        name: 'Objeto Bullet (Proyectil)',
        fileName: 'Bullet.sprite3',
        fileType: 'sprite3',
        fileUrl: '/resources/sprites/Bullet.sprite3',
        description: 'Sprite del proyectil láser.',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-enemy1',
        name: 'Objeto Enemy1 (Nave Enemiga 1)',
        fileName: 'Enermy1.sprite3',
        fileType: 'sprite3',
        fileUrl: '/resources/sprites/Enermy1.sprite3',
        description: 'Nave enemiga rápida (velocidad -12, otorga 10 puntos).',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-enemy2',
        name: 'Objeto Enemy2 (Nave Enemiga 2)',
        fileName: 'Enermy2.sprite3',
        fileType: 'sprite3',
        fileUrl: '/resources/sprites/Enermy2.sprite3',
        description: 'Nave enemiga media (velocidad -8, otorga 5 puntos).',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-enemy3',
        name: 'Objeto Enemy3 (Nave Enemiga 3)',
        fileName: 'Enermy3.sprite3',
        fileType: 'sprite3',
        fileUrl: '/resources/sprites/Enermy3.sprite3',
        description: 'Nave enemiga lenta (velocidad -6, otorga 1 punto).',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-endscreen',
        name: 'Objeto End Screen',
        fileName: 'End Screen.sprite3',
        fileType: 'sprite3',
        fileUrl: '/resources/sprites/End_Screen.sprite3',
        description: 'Sprite con disfraces "you-win" y "gameover".',
        howToUse: 'Cargar como sprite.'
      },
      {
        id: 'res-img-backdrop',
        name: 'Fondo Backdrop Espacial',
        fileName: 'Backdrop.png',
        fileType: 'image',
        fileUrl: '/resources/images/space_backdrop.png',
        description: 'Fondo del cosmos estrellado.',
        howToUse: 'Cargar como fondo.'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Paso 1: Abrir PictoBlox y cargar recursos',
        instructions: [
          'Abre PictoBlox en modo Bloques y elimina el personaje por defecto.',
          'Carga los 6 sprites: 1) Player, 2) Bullet, 3) Enemy1, 4) Enemy2, 5) Enemy3, 6) End Screen.',
          'Carga el fondo "Backdrop" espacial en el escenario.',
          'Añade la extensión "Detección de Caras (Face Detection)".'
        ]
      },
      {
        stepNumber: 2,
        title: 'Paso 2: Crear la variable score',
        instructions: [
          'En la categoría Variables, crea la variable "score" para todos los objetos.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Paso 3: Programación del objeto Player (Tu Nave)',
        instructions: [
          'Selecciona al sprite "Player" y programa su código completo:',
          '1. al hacer clic en [bandera verde]',
          '2. ir a x: [0] y: [-100]',
          '3. apuntar en dirección [180]',
          '4. cambiar disfraz a [Player]',
          '5. cambiar on de video en stage con [30] % transparency',
          '6. hide cuadro delimitador',
          '7. por siempre:',
          '   - analizar imagen desde camera',
          '   - si (obtener # de caras > 0) entonces:',
          '       - ir a x: (obtener x position de cara 1) y: (obtener y position de cara 1)',
          '   - si (¿tocando Enemy1? o ¿tocando Enemy2? o ¿tocando Enemy3?) entonces:',
          '       - cambiar disfraz a [Exploded]',
          '       - tocar sonido [exploded.mp3] hasta que termine',
          '       - enviar [Game Over]',
          '   - si (score > 99) entonces:',
          '       - enviar [You Win]'
        ],
        blockExplanation: {
          event: 'Control de la nave defensora.',
          action: 'Sigue la cara del jugador en X e Y; monitorea colisiones con las 3 naves enemigas y verifica la meta de 100 puntos.',
          condition: 'Derrota si toca enemigos; Victoria si score > 99.',
          aiData: 'Posición facial central en tiempo real.',
          spriteTarget: 'Player',
          successResult: 'La nave se mueve al compás de tu rostro y transmite mensajes de victoria o derrota.'
        }
      },
      {
        stepNumber: 4,
        title: 'Paso 4: Programación del objeto Bullet (Disparos Automáticos)',
        instructions: [
          'Selecciona al sprite "Bullet":',
          'Generador continuo:',
          '1. al hacer clic en [bandera verde]',
          '2. esconder',
          '3. por siempre: esperar [0.5] segundos -> crear clon de mí mismo -> iniciar sonido [Shooting.mp3]',
          '',
          'Comportamiento del proyectil:',
          '1. al comenzar como clon',
          '2. ir a x: (posición en x de Player) y: (posición en y de Player)',
          '3. mostrar',
          '4. por siempre:',
          '   - sumar a x [20]',
          '   - si (¿tocando borde? o ¿tocando Enemy1? o ¿tocando Enemy2? o ¿tocando Enemy3?) entonces:',
          '       - esperar [0.05] segundos',
          '       - eliminar este clon'
        ],
        blockExplanation: {
          event: 'Disparo de proyectiles clonados.',
          action: 'Nace exactamente en la posición de la nave Player y avanza velozmente (+20 en X) hacia la derecha.',
          condition: 'Se destruye tras impactar un enemigo o salir por el borde.',
          spriteTarget: 'Bullet',
          successResult: 'Ráfagas de disparos láser continuos con sonido Shooting.mp3.'
        }
      },
      {
        stepNumber: 5,
        title: 'Paso 5: Programación de Enemy1, Enemy2 y Enemy3',
        instructions: [
          'Para Enemy1 (Nave Rápida - 10 puntos):',
          '- Generador: al presionar bandera verde -> esconder -> por siempre { esperar (aleatorio 1 y 3s) -> crear clon }',
          '- Clon: al comenzar como clon -> apuntar en dirección 180 -> ir a x: [250] y: (aleatorio -120 y 120) -> cambiar disfraz a [Enermy1] -> mostrar -> por siempre { sumar a x [-12] -> si (posición en x < -220) { eliminar este clon } -> si ¿tocando Bullet? { sumar a score [10] -> cambiar disfraz a [exploded] -> tocar sonido [Exploded.mp3] hasta que termine -> eliminar este clon } }',
          '',
          'Para Enemy2 (Nave Media - 5 puntos):',
          '- Misma lógica, cambiar: esperar (aleatorio 1 y 5s), sumar a x [-8], sumar a score [5], disfraz Enermy2.',
          '',
          'Para Enemy3 (Nave Tanque - 1 punto):',
          '- Misma lógica, cambiar: esperar (aleatorio 1 y 7s), sumar a x [-6], sumar a score [1], disfraz Enermy3.'
        ]
      },
      {
        stepNumber: 6,
        title: 'Paso 6: Programación del objeto End Screen',
        instructions: [
          'Selecciona al sprite "End Screen" y programa sus 3 respuestas a eventos:',
          '1. al hacer clic en [bandera verde] -> dar a [score] el valor [0] -> esconder',
          '2. al recibir [Game Over] -> cambiar disfraz a [gameover] -> mostrar -> detener [todos]',
          '3. al recibir [You Win] -> cambiar disfraz a [you-win] -> mostrar -> detener [todos]'
        ],
        blockExplanation: {
          event: 'Recepción de mensajes broadcast.',
          action: 'Muestra la pantalla final correspondiente y detiene el motor del juego.',
          spriteTarget: 'End Screen',
          successResult: 'Finalización limpia con anuncio visual de victoria o derrota.'
        }
      },
      {
        stepNumber: 7,
        title: 'Paso 7: ¡A jugar y probar tu proyecto!',
        instructions: [
          'Haz clic en la bandera verde en pantalla completa.',
          'Calibra el movimiento de tu cabeza: verifica que tu nave esquive a los enemigos mientras tus lásers los destruyen.',
          'Comprueba que al superar 99 puntos (score >= 100) aparezca la pantalla You Win.'
        ]
      }
    ],
    conclusion: [
      '¡Felicitaciones! Has completado el curso "Aprende IA Jugando" construyendo un videojuego completo y avanzado con arquitectura de múltiples sprites concurrentes.',
      'Dominaste el control en tiempo real con Inteligencia Artificial, el manejo de eventos globales por mensajes, variables complejas y sonidos interactivos.'
    ],
    quiz: [
      {
        id: 'q6-1',
        question: '¿Cómo se comunican los sprites de los enemigos con la pantalla final cuando chocan con el jugador?',
        options: [
          'A través del envío de mensajes broadcast como "Game Over"',
          'Usando una llamada telefónica',
          'Escribiendo un correo',
          'No se comunican'
        ],
        correctOptionIndex: 0,
        explanation: 'En PictoBlox/Scratch, los mensajes ("enviar [Game Over]") permiten coordinar eventos entre múltiples sprites de forma instantánea.'
      },
      {
        id: 'q6-2',
        question: '¿Qué condición se requiere para ganar la partida y activar la pantalla You Win?',
        options: [
          'Esperar 10 minutos',
          'Superar 99 puntos en la variable score (score > 99)',
          'Tocar a todos los enemigos',
          'Cerrar la cámara'
        ],
        correctOptionIndex: 1,
        explanation: 'El script del Player evalúa continuamente "si score > 99 entonces enviar [You Win]".'
      }
    ],
    instructorGuide: {
      summary: 'Proyecto cúspide del Tomo 1. Integra todos los conceptos aprendidos: visión computacional, bucles, clones, proyectiles, variables y mensajes entre objetos.',
      checklist: [
        'Verificar que los disfraces de explosión y sonidos de proyectiles funcionen adecuadamente.',
        'Observar la coordinación motriz del estudiante al apuntar con la cabeza y esquivar obstáculos.'
      ],
      discussionQuestions: [
        '¿Cómo crees que los simuladores de vuelo militar o espaciales utilizan la visión por computadora para rastrear el campo visual del piloto?'
      ]
    },
    interactiveSimulatorType: 'space_battle'
  }
];
