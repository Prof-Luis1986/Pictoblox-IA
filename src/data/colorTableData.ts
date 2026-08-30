import { BlockItem } from '../types';

export const COLOR_TABLE_DATA: BlockItem[] = [
  {
    category: 'Movimiento',
    color: 'Azul',
    hexCode: '#2563eb',
    function: 'Permite mover, rotar y ubicar personajes u objetos en coordenadas (X, Y) del escenario.',
    examples: ['mover 10 pasos', 'ir a x: 0 y: 0', 'apuntar en dirección 90', 'fijar estilo de rotación']
  },
  {
    category: 'Apariencia',
    color: 'Morado',
    hexCode: '#9333ea',
    function: 'Controla cómo se ve un objeto: cambiar disfraces, cambiar fondos, mostrar/esconder y diálogos de texto.',
    examples: ['decir [Hola] por 2 segundos', 'cambiar disfraz a [disfraz2]', 'fijar tamaño al 70%', 'siguiente fondo']
  },
  {
    category: 'Sonido',
    color: 'Rosa / Fucsia',
    hexCode: '#d946ef',
    function: 'Reproduce sonidos, música, efectos especiales de explosión o aplausos grabados.',
    examples: ['tocar sonido [exploded]', 'iniciar sonido [cheer]', 'detener todos los sonidos']
  },
  {
    category: 'Eventos',
    color: 'Amarillo',
    hexCode: '#eab308',
    function: 'Inicia los programas cuando ocurre una acción: presionar la bandera verde, pulsar una tecla o recibir mensajes.',
    examples: ['al hacer clic en 🚩', 'al presionar tecla [espacio]', 'enviar [abrir_puerta]', 'al recibir [encender]']
  },
  {
    category: 'Control',
    color: 'Naranja',
    hexCode: '#ea580c',
    function: 'Controla el flujo lógico: bucles infinitos (por siempre), pausas (esperar), condiciones (si... entonces) y clones.',
    examples: ['por siempre', 'si <condición> entonces', 'esperar 1 segundos', 'crear clon de [Cat 2]']
  },
  {
    category: 'Sensores',
    color: 'Celeste',
    hexCode: '#0284c7',
    function: 'Detecta interacción con el entorno: colisiones entre objetos, posición del cursor o distancias.',
    examples: ['¿tocando [puntero del ratón]?', '¿tocando el color?', 'distancia a [Mouse 1]']
  },
  {
    category: 'Operadores',
    color: 'Verde',
    hexCode: '#16a34a',
    function: 'Realiza cálculos matemáticos, comparaciones lógicas (<, >, =), uniones de texto y genera números aleatorios.',
    examples: ['(número aleatorio entre 1 y 10)', '<(score) > 100>', '[encender] está en [speech_result]']
  },
  {
    category: 'Variables',
    color: 'Naranja Oscuro',
    hexCode: '#c2410c',
    function: 'Guarda y actualiza datos numéricos o de texto que cambian durante la partida (puntajes, vidas, velocidades).',
    examples: ['dar a [score] el valor 0', 'sumar a [score] 1', 'fijar [speed] a -15']
  },
  {
    category: 'Face Detection (IA)',
    color: 'Verde Oscuro',
    hexCode: '#047857',
    function: 'Módulo de Inteligencia Artificial para visión por computadora: detecta rostros, expresiones y coordenadas de la nariz.',
    examples: ['analizar imagen desde cámara', 'x position of nose de cara 1', 'emparejar cara con clase 1']
  },
  {
    category: 'Speech Recognition (IA)',
    color: 'Índigo',
    hexCode: '#4f46e5',
    function: 'Módulo de Inteligencia Artificial para escuchar por el micrófono y convertir la voz humana hablada en texto.',
    examples: ['set speech recognition language to Spanish', 'start listening', 'speech recognition result']
  },
  {
    category: 'Texto a Voz',
    color: 'Turquesa / Teal',
    hexCode: '#0d9488',
    function: 'Sintetizador que permite a la computadora hablar con voz artificial en múltiples idiomas.',
    examples: ['fijar idioma a Spanish', 'asignar voz a alto', 'decir [Hola, soy tu asistente]']
  }
];

export const BLOCK_COLORS_TABLE = COLOR_TABLE_DATA;
