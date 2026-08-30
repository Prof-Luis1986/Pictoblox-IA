import { Practice, PracticeStep } from '../types';

const step = (stepNumber: number, title: string, instructions: string[]): PracticeStep => ({ stepNumber, title, instructions });

export const getCorrectedSteps = (practice: Practice): PracticeStep[] => {
  const s = practice.steps;

  if (practice.id === 't1-act4') {
    return [
      s[0], s[1], s[2], s[3],
      {
        ...s[4],
        stepNumber: 5,
        title: 'Paso 5: Programa el movimiento de Mouse 1'
      },
      {
        ...s[5],
        stepNumber: 6,
        title: 'Paso 6: Crea las variables score y speed'
      },
      step(
        7,
        'Paso 7: Programa el gato original',
        s[6].instructions.slice(0, 9).filter(Boolean)
      ),
      {
        ...step(
          8,
          'Paso 8: Programa los clones de Cat 2',
          s[6].instructions.slice(10).filter(Boolean)
        ),
        blockExplanation: s[6].blockExplanation
      },
      step(9, 'Paso 9: Guarda el proyecto', [s[7].instructions[0]]),
      step(10, 'Paso 10: Prueba el juego', s[7].instructions.slice(1))
    ];
  }

  if (practice.id === 't1-act5') {
    return [
      step(1, 'Paso 1: Abrir PictoBlox', ['Abre PictoBlox y selecciona la opción Bloques.']),
      step(2, 'Paso 2: Cargar los personajes u objetos', ['Elimina a Toby.', 'Carga el sprite bird.', 'Carga el sprite pipes.']),
      step(3, 'Paso 3: Cargar los fondos', ['Carga los fondos Blue Sky 2 y game_over.']),
      step(4, 'Paso 4: Agregar las extensiones', ['Agrega la extensión Detección de Caras (Face Detection).']),
      step(5, 'Paso 5: Programación', [...s[1].instructions, ...s[2].instructions, ...s[3].instructions, ...s[4].instructions]),
      step(6, 'Paso 6: Guardar el proyecto', [s[5].instructions[0]]),
      step(7, 'Paso 7: Ejecutar y probar el juego', s[5].instructions.slice(1))
    ];
  }

  if (practice.id === 't1-act6') {
    return [
      step(1, 'Paso 1: Abrir PictoBlox', ['Abre PictoBlox en modo Bloques y elimina el personaje por defecto.']),
      step(2, 'Paso 2: Cargar los personajes u objetos', ['Carga Player, Bullet, Enemy1, Enemy2, Enemy3 y End Screen.']),
      step(3, 'Paso 3: Cargar los fondos', ['Carga el fondo Backdrop espacial en el escenario.']),
      step(4, 'Paso 4: Agregar las extensiones', ['Añade Detección de Caras (Face Detection).']),
      step(5, 'Paso 5: Crear variables', s[1].instructions),
      step(6, 'Paso 6: Programación', [...s[2].instructions, ...s[3].instructions, ...s[4].instructions, ...s[5].instructions]),
      step(7, 'Paso 7: ¡A jugar y probar tu proyecto!', s[6].instructions)
    ];
  }

  if (practice.id === 't2-act7') {
    return [
      step(1, 'Paso 1: Prepara el escenario', ['Carga el escenario.', 'Agrega el personaje Niko.']),
      step(2, 'Paso 2: Activa el poder de escuchar', ['Ve a Extensiones.', 'Selecciona Speech Recognition.']),
      step(3, 'Paso 3: Iniciar sesión o registrarse en PictoBlox', ['Haz clic en Sign In. Si todavía no tienes una cuenta, continúa con el paso 4.']),
      step(4, 'Paso 4: Crear una nueva cuenta', ['Haz clic en Unirse.', 'Selecciona Estudiante.', 'Responde la pregunta de edad con ayuda de un adulto.']),
      step(5, 'Paso 5: Completar los datos', ['Ingresa tu correo electrónico.', 'Crea un nombre de usuario y una contraseña.', 'Acepta los términos con ayuda de un adulto.', 'Haz clic en Crear mi cuenta.']),
      step(6, 'Paso 6: Activar la cuenta', ['Revisa el correo electrónico.', 'Abre el mensaje de PictoBlox.', 'Haz clic en Activar cuenta.']),
      step(7, 'Paso 7: Completar datos personales', ['Completa la fecha de nacimiento, género y país con ayuda de un adulto.', 'Haz clic en Enviar.']),
      step(8, 'Paso 8: Iniciar sesión en una cuenta existente', ['Si ya tienes una cuenta, inicia sesión con tu usuario y contraseña.', 'No compartas tu contraseña con otras personas.']),
      step(9, 'Paso 9: Conecta el reconocimiento de voz', ['Cuando aparezca el aviso para conectar el navegador, haz clic en Okay.']),
      step(10, 'Paso 10: Prueba la conexión en el navegador', ['En la pestaña que se abre, pulsa Test Speech Recognition.', 'Permite el micrófono mientras visitas el sitio.', 'Habla y comprueba que tus palabras aparezcan en Result.', 'Regresa a PictoBlox.']),
      step(11, 'Paso 11: Agrega voz al proyecto', ['Vuelve a Extensiones.', 'Añade Texto a Voz.']),
      step(12, 'Paso 12: Guarda tu proyecto', ['Haz clic en Archivo y selecciona Guardar como.', 'Usa el nombre Reconocimiento_de_voz.']),
      step(13, 'Paso 13: Mensaje de inicio', ['Agrega al hacer clic en la bandera verde.', 'Añade un bloque decir y otro de Texto a Voz.', 'Escribe: Habla ahora, modo loro activado.']),
      step(14, 'Paso 14: Activar el reconocimiento de voz', ['Selecciona Español (Latinoamérica).', 'Agrega Iniciar escucha.', 'Agrega esperar 3 segundos.']),
      step(15, 'Paso 15: Repetir lo que dices', ['Muestra el resultado del reconocimiento con decir.', 'Haz que Texto a Voz repita el resultado.', 'Agrega Clear Speech Recognition Result.']),
      step(16, 'Paso 16: Prueba final', ['Verifica que la pestaña de la API continúe activa.', 'Pulsa la bandera verde.', 'Di una frase y comprueba que aparece y se escucha.']),
      step(17, 'Paso 17: Guarda tu práctica', ['Haz clic en guardar para usar este proyecto en la siguiente práctica.'])
    ];
  }

  return s;
};
