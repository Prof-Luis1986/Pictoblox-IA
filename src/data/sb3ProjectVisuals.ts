/**
 * Secuencias verificadas directamente en project.json dentro de los proyectos
 * SB3 entregados con el curso. Se muestran al alumno, pero el proyecto completo
 * no se expone como descarga.
 */
const PROJECT_BLOCKS_BY_STEP: Record<string, string[]> = {
  't1-act4:5': [
    'al hacer clic en bandera verde',
    'cambiar fondo a [Wall 1]',
    'fijar tamaño a (50) %',
    'ir a x: (-200) y: (0)',
    'encender video en el escenario con transparencia (60)',
    'ocultar cuadro delimitador',
    'por siempre',
    '  analizar imagen desde la cámara',
    '  ir a x: (-200) y: (posición y de la nariz de la cara 1)',
    '  si <tocando [Cat 2]> entonces',
    '    cambiar fondo a [game_over]',
    '    detener [todos]',
    '  fin'
  ],
  't1-act4:7': [
    'al hacer clic en bandera verde',
    'fijar [score] a (0)',
    'apuntar en dirección (-90)',
    'fijar tamaño a (80) %',
    'repetir (3)',
    '  crear clon de [mí mismo]',
    '  esperar (0.2) segundos',
    'fin',
    'esconder'
  ],
  't1-act4:8': [
    'al comenzar como clon',
    'ir a x: (180) y: (número aleatorio entre (-170) y (170))',
    'fijar [speed] a (-15)',
    'mostrar',
    'por siempre',
    '  apuntar en dirección (-90)',
    '  cambiar x por (speed)',
    '  si <posición en x < (-220)> entonces',
    '    cambiar [score] por (1)',
    '    ir a x: (180) y: (número aleatorio entre (-170) y (170))',
    '  fin',
    'fin'
  ],
  't1-act2:8': [
    'al hacer clic en bandera verde',
    'decir (Hola, soy Niko)',
    'fijar idioma a [Español (Latinoamérica)]',
    'asignar voz a [tenor]',
    'decir con voz (Hola, soy Niko)'
  ],
  't2-act1:8': [
    'al hacer clic en bandera verde',
    'decir (Hola, soy Niko)',
    'fijar idioma a [Español (Latinoamérica)]',
    'asignar voz a [tenor]',
    'decir con voz (Hola, soy Niko)'
  ],
  't1-act3:10': [
    'al hacer clic en bandera verde',
    'fijar idioma a [Español (Latinoamérica)]',
    'asignar voz a [tenor]',
    'decir (Hola, soy Niko)',
    'decir con voz (Hola, soy Niko)',
    'decir (Quédate frente a la cámara y veamos si puedo verte)',
    'decir con voz (Quédate frente a la cámara y veamos si puedo verte)',
    'encender video en el escenario con transparencia (0)',
    'mostrar cuadro delimitador del rostro',
    'por siempre',
    '  analizar imagen para detectar rostros',
    '  si <número de rostros > (0)> entonces',
    '    decir (¡Puedo verte!)',
    '  si no',
    '    decir (No encuentro un rostro)',
    '  fin'
  ],
  't2-act2:10': [
    'al hacer clic en bandera verde',
    'decir (Hola, soy Niko)',
    'decir con voz (Hola, soy Niko)',
    'encender video en el escenario con transparencia (0)',
    'mostrar cuadro delimitador del rostro',
    'por siempre',
    '  analizar imagen para detectar rostros',
    '  si <número de rostros > (0)> entonces',
    '    decir (¡Puedo verte!)',
    '  si no',
    '    decir (No encuentro un rostro)',
    '  fin'
  ],
  't2-act5:4': [
    'al presionar tecla [espacio]',
    'decir (Sistema de seguridad activado)',
    'decir con voz (Sistema de seguridad activado)',
    'decir (Verificando identidad)',
    'encender video en el escenario con transparencia (0)',
    'mostrar cuadro delimitador del rostro',
    'decir (Escaneando rostro)',
    'esperar (3) segundos',
    'emparejar cara desde el video',
    'si <rostro reconocido> entonces',
    '  cambiar fondo a [Acceso permitido]',
    '  decir (Bienvenido)',
    'si no',
    '  cambiar fondo a [Acceso denegado]',
    '  decir (Acceso denegado)',
    'fin',
    'apagar video en el escenario'
  ],
  't2-act6:4': [
    'al presionar tecla [espacio]',
    'cambiar fondo a [Puerta cerrada]',
    'decir (Sistema de seguridad activado)',
    'decir (Verificando identidad)',
    'encender video en el escenario con transparencia (0)',
    'mostrar cuadro delimitador del rostro',
    'esperar (3) segundos',
    'emparejar cara desde el video',
    'si <rostro reconocido> entonces',
    '  cambiar fondo a [Puerta abierta]',
    '  decir (Acceso permitido)',
    'si no',
    '  cambiar fondo a [Acceso denegado]',
    '  decir (Acceso denegado)',
    'fin',
    'apagar video en el escenario'
  ],
  't2-act7:15': [
    'al hacer clic en bandera verde',
    'decir (Habla ahora, modo loro activado)',
    'fijar idioma a [Español (Latinoamérica)]',
    'asignar voz a [tenor]',
    'decir con voz (Habla ahora, modo loro activado)',
    'fijar idioma de reconocimiento a [Español (Latinoamérica)]',
    'iniciar escucha',
    'esperar (3) segundos',
    'decir (resultado del reconocimiento de voz)',
    'decir con voz (resultado del reconocimiento de voz)',
    'limpiar resultado del reconocimiento de voz'
  ],
  't2-act8:7': [
    'al hacer clic en bandera verde',
    'decir (Modo casa inteligente activado)',
    'decir con voz (Modo casa inteligente activado)',
    'fijar idioma de reconocimiento a [Español (Latinoamérica)]',
    'iniciar escucha',
    'por siempre',
    '  si <resultado del reconocimiento contiene [encender]> entonces',
    '    enviar [encender]',
    '  fin',
    '  si <resultado del reconocimiento contiene [apagar]> entonces',
    '    enviar [apagar]',
    '  fin',
    'al recibir [encender]',
    'cambiar disfraz a [luz encendida]',
    'al recibir [apagar]',
    'cambiar disfraz a [luz apagada]'
  ]
};

const PROJECT_CAPTURE_BY_STEP: Record<string, string> = {
  't1-act4:5': '/resources/pictoblox-block-captures/mouse1-gato-raton.png',
  't1-act2:8': '/resources/pictoblox-block-captures/hola-mundo.png',
  't2-act1:8': '/resources/pictoblox-block-captures/hola-mundo.png',
  't1-act3:10': '/resources/pictoblox-block-captures/deteccion-rostros.png',
  't2-act2:10': '/resources/pictoblox-block-captures/deteccion-rostros.png',
  't2-act5:4': '/resources/pictoblox-block-captures/reconocimiento-facial.png',
  't2-act6:4': '/resources/pictoblox-block-captures/puerta-inteligente.png',
  't2-act7:15': '/resources/pictoblox-block-captures/reconocimiento-voz.png',
  't2-act8:7': '/resources/pictoblox-block-captures/casa-inteligente.png'
};

export const getSb3BlocksForStep = (practiceId: string, stepNumber: number): string[] | undefined =>
  PROJECT_BLOCKS_BY_STEP[`${practiceId}:${stepNumber}`];

export const getSb3CaptureForStep = (practiceId: string, stepNumber: number): string | undefined =>
  PROJECT_CAPTURE_BY_STEP[`${practiceId}:${stepNumber}`];
