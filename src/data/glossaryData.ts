import { GlossaryItem } from '../types';

export const GLOSSARY_DATA: GlossaryItem[] = [
  {
    term: 'Inteligencia Artificial (IA)',
    category: 'IA y Visión',
    definition: 'Campo de la informática que desarrolla programas y algoritmos capaces de realizar tareas que simulan la inteligencia humana, como aprender de ejemplos, reconocer rostros, comprender la voz y tomar decisiones.',
    example: 'YouTube sugiere videos según tus gustos; PictoBlox detecta las facciones de tu rostro para controlar un videojuego con tu nariz.',
    icon: 'Sparkles'
  },
  {
    term: 'Machine Learning (Aprendizaje Automático)',
    category: 'IA y Visión',
    definition: 'Rama fundamental de la Inteligencia Artificial donde las computadoras aprenden a identificar patrones a partir de datos y ejemplos previos, en lugar de ser programadas con instrucciones fijas paso a paso.',
    example: 'Al capturar 30 fotos de tu rostro frente a la cámara web en PictoBlox, el modelo aprende a reconocerte y diferenciarte de otras personas.',
    icon: 'Cpu'
  },
  {
    term: 'Redes Neuronales (Neural Networks)',
    category: 'IA y Visión',
    definition: 'Modelos computacionales inspirados en las conexiones del cerebro humano, formados por capas de nodos (neuronas artificiales) que procesan información visual, auditiva o numérica para resolver problemas complejos.',
    example: 'Las redes neuronales convolucionales analizan los píxeles de la cámara en PictoBlox para encontrar dónde están los ojos, nariz y boca en milisegundos.',
    icon: 'Network'
  },
  {
    term: 'PictoBlox',
    category: 'PictoBlox y Scratch',
    definition: 'Plataforma educativa y entorno de desarrollo visual basado en bloques gráficos que permite a niños y jóvenes crear proyectos interactivos de programación, robótica e Inteligencia Artificial de forma lúdica y accesible.',
    example: 'En PictoBlox conectas bloques de colores como piezas de rompecabezas para programar videojuegos con reconocimiento facial y hogares inteligentes.',
    icon: 'Blocks'
  },
  {
    term: 'Scratch',
    category: 'PictoBlox y Scratch',
    definition: 'Lenguaje de programación visual desarrollado por el MIT Media Lab que introdujo el paradigma de programar arrastrando y uniendo bloques lógicos de colores, sentando las bases globales de la enseñanza de código a niños.',
    example: 'PictoBlox está construido sobre la tecnología y filosofía de Scratch, añadiendo extensiones avanzadas de IA, visión artificial y robótica.',
    icon: 'Code2'
  },
  {
    term: 'Bloques de Programación',
    category: 'PictoBlox y Scratch',
    definition: 'Piezas visuales de código clasificadas por colores y formas según su función (Eventos, Movimiento, Control, Sensores, etc.) que se acoplan entre sí como rompecabezas para construir la lógica del programa.',
    example: 'Un bloque amarillo "al hacer clic en bandera verde" inicia el juego, mientras un bloque naranja "por siempre" ejecuta el código continuamente.',
    icon: 'Puzzle'
  },
  {
    term: 'Sprites (Objetos o Personajes)',
    category: 'PictoBlox y Scratch',
    definition: 'Elementos visuales, personajes u objetos gráficos que habitan en el escenario del proyecto. Cada sprite tiene sus propios disfraces, sonidos y bloques de código independientes.',
    example: 'El oso Niko, el ratón Mouse 1, el pájaro volador o la nave espacial en los módulos interactivos.',
    icon: 'Smile'
  },
  {
    term: 'Escenarios y Fondos (Backdrops)',
    category: 'PictoBlox y Scratch',
    definition: 'El lienzo o escenario principal donde transcurre la acción del juego o simulación. Puede contener múltiples fondos intercambiables y ejecutar su propio código para controlar eventos globales.',
    example: 'El fondo del laboratorio cibernético, la sala interactiva o la secuencia de 14 fotogramas para la animación de la compuerta de seguridad.',
    icon: 'Image'
  },
  {
    term: 'Extensiones (Extensions)',
    category: 'PictoBlox y Scratch',
    definition: 'Módulos complementarios que se añaden a PictoBlox para desbloquear nuevos bloques especializados en tecnologías avanzadas como Reconocimiento Facial, Texto a Voz, Reconocimiento de Voz, Arduino y Machine Learning.',
    example: 'La extensión "Face Detection" agrega los bloques verdes con íconos de cámara para rastrear el rostro en tiempo real.',
    icon: 'PlusCircle'
  },
  {
    term: 'Reconocimiento Facial (Face Recognition)',
    category: 'IA y Visión',
    definition: 'Tecnología biométrica de IA que compara los rasgos característicos de un rostro detectado contra una base de datos o clases previamente entrenadas para identificar y verificar QUIÉN es la persona.',
    example: 'El sistema de seguridad biométrico que verifica si la persona frente al sensor óptico está registrada en la Clase 1 para desbloquear el acceso.',
    icon: 'UserCheck'
  },
  {
    term: 'Reconocimiento de Voz (Speech Recognition)',
    category: 'Sensores y Audio',
    definition: 'Capacidad de un sistema computacional para capturar las ondas sonoras emitidas por la voz humana a través del micrófono y transcribirlas en palabras de texto para interpretar comandos y órdenes.',
    example: 'El usuario dice "encender la luz" y PictoBlox interpreta la frase para enviar un mensaje y cambiar el disfraz de la lámpara a encendido.',
    icon: 'AudioWaveform'
  },
  {
    term: 'Detección de Rostros (Face Detection)',
    category: 'IA y Visión',
    definition: 'Algoritmo de visión artificial que identifica SI existe una presencia humana en una imagen o transmisión de video y calcula su posición exacta (coordenadas X, Y) y dimensiones.',
    example: 'PictoBlox dibuja un cuadro delimitador alrededor de cualquier cara que aparezca en el recuadro de la cámara web.',
    icon: 'ScanFace'
  },
  {
    term: 'Puntos Clave del Rostro (Landmarks)',
    category: 'IA y Visión',
    definition: 'Coordenadas anatómicas precisas que el modelo de IA localiza sobre la cara, como la punta de la nariz, el centro de los ojos, las comisuras de los labios y el mentón.',
    example: 'El bloque "position de nose en x" permite que el ratón o el ave sigan el movimiento exacto de tu nariz en la pantalla.',
    icon: 'Crosshair'
  },
  {
    term: 'Entrenamiento (Training / Aprendizaje)',
    category: 'IA y Visión',
    definition: 'El proceso mediante el cual se alimenta a un modelo de IA con datos de muestra (como fotos o grabaciones) para que ajuste sus parámetros y aprenda a clasificar nueva información.',
    example: 'Capturar 30 muestras de un rostro frente al sensor para calibrar y almacenar la red neuronal en la Clase 1.',
    icon: 'Brain'
  },
  {
    term: 'Clase (Class / Etiqueta)',
    category: 'IA y Visión',
    definition: 'Categoría o etiqueta única asignada a un conjunto específico de datos durante el entrenamiento de un modelo clasificador de Machine Learning.',
    example: 'Clase 1 = "Operador Autorizado", Clase 2 = "Administrador", Clase 3 = "Invitado".',
    icon: 'Tag'
  },
  {
    term: 'Texto a Voz (Text to Speech)',
    category: 'Sensores y Audio',
    definition: 'Tecnología de síntesis de voz artificial que lee en voz alta cualquier texto escrito utilizando voces naturales en diferentes idiomas y entonaciones.',
    example: 'Niko dice con voz de tenor: "Bienvenido a tu hogar inteligente, ¿en qué puedo ayudarte hoy?".',
    icon: 'Volume2'
  },
  {
    term: 'Visión por Computadora (Computer Vision)',
    category: 'IA y Visión',
    definition: 'Disciplina de la inteligencia artificial que enseña a las computadoras a "ver", procesar y comprender el contenido de imágenes digitales y videos del mundo real.',
    example: 'Analizar cada fotograma de la cámara para reconocer gestos, objetos, personas y colores en milisegundos.',
    icon: 'Eye'
  },
  {
    term: 'Patrón (Pattern)',
    category: 'IA y Visión',
    definition: 'Una secuencia, forma o regularidad ordenada que se repite de manera predecible en un conjunto de datos o elementos visuales.',
    example: 'Completar una serie lógica de figuras geométricas o ritmos de colores en la Práctica 1.',
    icon: 'Grid'
  },
  {
    term: 'Clon (Clone)',
    category: 'Programación',
    definition: 'Copia temporal creada en tiempo de ejecución de un sprite, que hereda sus disfraces y puede ejecutar scripts independientes con el evento "al comenzar como clon".',
    example: 'Generar múltiples naves enemigas o disparar rayos láser continuos sin tener que crear docenas de sprites manualmente.',
    icon: 'Copy'
  },
  {
    term: 'Variable',
    category: 'Programación',
    definition: 'Contenedor en la memoria del programa con un nombre identificativo que almacena un dato numérico o de texto cuyo valor puede consultarse y modificarse en cualquier momento.',
    example: 'La variable "score" para llevar la cuenta de los puntos o "speed" para regular la dificultad del juego.',
    icon: 'Database'
  },
  {
    term: 'Bucle Por Siempre (Forever Loop)',
    category: 'Programación',
    definition: 'Estructura de control fundamental que repite indefinidamente todos los bloques colocados en su interior hasta que el usuario presione el botón rojo de detener.',
    example: 'Mantener la cámara analizando imágenes y actualizando la posición de los personajes continuamente.',
    icon: 'Repeat'
  },
  {
    term: 'Condicional (Si / Si no)',
    category: 'Programación',
    definition: 'Estructura de decisión que evalúa una condición lógica booleana; si es verdadera ejecuta un bloque de acciones, y si es falsa ejecuta la alternativa (si no).',
    example: 'Si ¿está emparejada la cara con la clase 1? entonces abrir puerta, si no decir "Acceso Denegado".',
    icon: 'GitPullRequest'
  },
  {
    term: 'Mensajes y Eventos (Broadcast)',
    category: 'Programación',
    definition: 'Mecanismo de comunicación asíncrono que permite a un sprite o al escenario avisar a todos los demás componentes del proyecto que ha ocurrido un suceso.',
    example: 'Al presionar espacio, enviar el mensaje "iniciar juego" para que todos los personajes comiencen a moverse.',
    icon: 'Send'
  },
  {
    term: 'Algoritmo',
    category: 'Programación',
    definition: 'Conjunto ordenado, finito y paso a paso de instrucciones lógicas que resuelven un problema o realizan una tarea específica.',
    example: 'La receta secuencial de pasos para encender la cámara, capturar el rostro, medir coordenadas y mover el cursor.',
    icon: 'Binary'
  }
];

export const getGlossaryTerm = (termQuery: string): GlossaryItem | undefined => {
  const clean = termQuery.toLowerCase().trim();
  return GLOSSARY_DATA.find(item => {
    const mainTerm = item.term.toLowerCase();
    return mainTerm === clean ||
      mainTerm.startsWith(clean) ||
      clean.includes(mainTerm) ||
      (mainTerm.includes('(') && mainTerm.split('(')[0].trim() === clean);
  });
};
