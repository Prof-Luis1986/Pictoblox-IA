import { ProgressWallStage } from '../types';

type WallDefinition = {
  challenge: string;
  result: string;
  designSteps: number[];
  prototypeSteps: number[];
};

const makeStages = ({ challenge, result, designSteps, prototypeSteps }: WallDefinition): ProgressWallStage[] => [
  {
    id: 'problem', title: 'PROBLEMA', guidingQuestion: '¿Qué queremos resolver?', relatedStepNumbers: [],
    instructions: [`Reto: ${challenge}`, `Resultado esperado: ${result}`, 'Identifica las condiciones que debe cumplir tu solución.'],
    responseFields: [{ id: 'problem', prompt: 'Explica con tus palabras qué problema resolverás.', multiline: true }]
  },
  {
    id: 'idea', title: 'IDEA', guidingQuestion: '¿Qué posibles soluciones imaginas?', relatedStepNumbers: [],
    instructions: ['Piensa en los personajes, fondos, sensores o extensiones que podrías utilizar.', 'Elige las acciones principales y toma una decisión inicial.'],
    responseFields: [{ id: 'possible_ideas', prompt: '¿Qué posibles soluciones se te ocurren?', multiline: true }, { id: 'selected_idea', prompt: 'Escribe brevemente la idea que elegiste.', multiline: true }]
  },
  {
    id: 'design', title: 'DISEÑO', guidingQuestion: '¿Cuál será tu plan antes de programar?', relatedStepNumbers: designSteps,
    instructions: ['Ordena las acciones con palabras sencillas.', 'Identifica objetos, eventos, condiciones, ciclos, variables o mensajes que necesite este proyecto.', 'Revisa las capturas de bloques asociadas sin descargar un proyecto terminado.'],
    responseFields: [{ id: 'design', prompt: 'Describe tu secuencia, esquema o algoritmo.', multiline: true }]
  },
  {
    id: 'prototype', title: 'PROTOTIPO', guidingQuestion: '¿Cómo construirás y probarás la primera versión?', relatedStepNumbers: prototypeSteps,
    instructions: ['Construye la primera versión en PictoBlox siguiendo los pasos relacionados.', 'Prueba cada parte y marca los pasos que termines.', 'Usa únicamente los recursos permitidos en la práctica.'],
    responseFields: [{ id: 'prototype', prompt: '¿Qué lograste construir y probar?', multiline: true }]
  },
  {
    id: 'error', title: 'ERROR', guidingQuestion: '¿Qué aprendiste de lo que no funcionó?', relatedStepNumbers: [],
    instructions: ['Compara lo que esperabas con lo que ocurrió realmente.', 'Ubica el paso y revisa el bloque, valor, objeto o recurso relacionado.', 'Encontrar errores es una parte normal del aprendizaje.'],
    responseFields: [
      { id: 'unexpected', prompt: '¿Qué no funcionó como esperabas?', multiline: true },
      { id: 'step', prompt: '¿En qué paso ocurrió? Si todo funcionó, escribe cómo hiciste la prueba.', multiline: true },
      { id: 'expected', prompt: '¿Qué esperabas que ocurriera?', multiline: true },
      { id: 'actual', prompt: '¿Qué ocurrió realmente?', multiline: true },
      { id: 'cause', prompt: '¿Qué crees que causó el problema?', multiline: true }
    ]
  },
  {
    id: 'redesign', title: 'REDISEÑO', guidingQuestion: '¿Cómo lo mejoramos?', relatedStepNumbers: [],
    instructions: ['Si encontraste un error, registra la corrección y realiza una nueva prueba.', 'Si todo funcionó, explica cómo lo comprobaste y anota una conclusión o mejora opcional.'],
    responseFields: [
      { id: 'change', prompt: '¿Qué cambiaste para mejorar tu proyecto?', multiline: true },
      { id: 'worked', prompt: '¿Funcionó mejor después del cambio? Explica qué ocurrió.', multiline: true },
      { id: 'next_improvement', prompt: '¿Qué otra mejora te gustaría agregar?', multiline: true }
    ]
  }
];

// Declaración pedagógica explícita: no se deduce a partir del texto de los pasos.
export const PROGRESS_WALL_BY_PRACTICE: Record<string, ProgressWallStage[]> = {
  't1-act1': makeStages({ challenge: 'reconocer patrones como lo haría una IA.', result: 'clasificar ejemplos explicando el patrón observado.', designSteps: [1], prototypeSteps: [2, 3, 4] }),
  't1-act2': makeStages({ challenge: 'crear el primer programa con texto y voz.', result: 'Niko saluda en pantalla y mediante audio.', designSteps: [1, 2], prototypeSteps: [3, 4, 5, 6, 7, 8, 9] }),
  't1-act3': makeStages({ challenge: 'detectar un rostro con la cámara.', result: 'el programa identifica si hay un rostro frente a la cámara.', designSteps: [1, 2], prototypeSteps: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }),
  't1-act4': makeStages({ challenge: 'controlar el juego Gato y Ratón con IA.', result: 'el juego responde al movimiento previsto y reconoce sus reglas.', designSteps: [1, 2], prototypeSteps: [3, 4, 5, 6, 7, 8] }),
  't1-act5': makeStages({ challenge: 'construir una versión de Flappy Bird controlada con IA.', result: 'el personaje responde al control y el juego puede probarse.', designSteps: [1], prototypeSteps: [2, 3, 4, 5, 6] }),
  't1-act6': makeStages({ challenge: 'crear una batalla espacial interactiva con IA.', result: 'la nave, los enemigos y las reglas funcionan juntos.', designSteps: [1, 2], prototypeSteps: [3, 4, 5, 6, 7] }),
  't2-act1': makeStages({ challenge: 'crear el primer programa del laboratorio de casa inteligente.', result: 'el personaje presenta el laboratorio con texto y voz.', designSteps: [1, 2], prototypeSteps: [3, 4, 5, 6, 7, 8, 9] }),
  't2-act2': makeStages({ challenge: 'detectar rostros para una aplicación de casa inteligente.', result: 'la cámara informa correctamente si detecta un rostro.', designSteps: [1, 2], prototypeSteps: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }),
  't2-act5': makeStages({ challenge: 'entrenar a la IA para reconocer a una persona especial.', result: 'el modelo distingue a la persona entrenada durante las pruebas.', designSteps: [1], prototypeSteps: [2, 3, 4, 5, 6] }),
  't2-act6': makeStages({ challenge: 'crear una puerta que responda al reconocimiento facial.', result: 'la puerta toma la acción prevista según el rostro detectado.', designSteps: [1], prototypeSteps: [2, 3, 4, 5, 6] }),
  't2-act7': makeStages({ challenge: 'probar el reconocimiento de voz.', result: 'el programa escucha e identifica las palabras esperadas.', designSteps: [1, 2], prototypeSteps: [3, 4, 5, 6, 7, 8, 9] }),
  't2-act8': makeStages({ challenge: 'controlar luces mediante instrucciones de voz.', result: 'la luz cambia de estado al reconocer la orden correspondiente.', designSteps: [1, 2], prototypeSteps: [3, 4, 5, 6, 7, 8, 9] })
};

export const FRUTA_NINJA_PROGRESS_WALL: ProgressWallStage[] = [
  { id: 'problem', title: 'PROBLEMA', guidingQuestion: '¿Qué reto libre quieres resolver?', instructions: [], relatedStepNumbers: [], responseFields: [{ id: 'problem', prompt: 'Define tu propio reto.', multiline: true }] },
  { id: 'idea', title: 'IDEA', guidingQuestion: '¿Qué solución imaginas?', instructions: [], relatedStepNumbers: [], responseFields: [{ id: 'possible_ideas', prompt: '¿Qué posibles soluciones se te ocurren?', multiline: true }, { id: 'selected_idea', prompt: 'Anota la idea que elegiste.', multiline: true }] },
  { id: 'design', title: 'DISEÑO', guidingQuestion: '¿Cómo organizarás tu solución?', instructions: [], relatedStepNumbers: [], responseFields: [{ id: 'design', prompt: 'Escribe tu propio plan.', multiline: true }] },
  { id: 'prototype', title: 'PROTOTIPO', guidingQuestion: '¿Qué primera versión construirás?', instructions: [], relatedStepNumbers: [], responseFields: [{ id: 'prototype', prompt: 'Describe lo que decidiste construir.', multiline: true }] },
  { id: 'error', title: 'ERROR', guidingQuestion: '¿Qué aprendiste al probar?', instructions: [], relatedStepNumbers: [], responseFields: [{ id: 'unexpected', prompt: '¿Qué no funcionó como esperabas?', multiline: true }, { id: 'step', prompt: '¿En qué paso ocurrió? Si todo funcionó, escribe cómo hiciste la prueba.', multiline: true }, { id: 'expected', prompt: '¿Qué esperabas que ocurriera?', multiline: true }, { id: 'actual', prompt: '¿Qué ocurrió realmente?', multiline: true }, { id: 'cause', prompt: '¿Qué crees que causó el problema?', multiline: true }] },
  { id: 'redesign', title: 'REDISEÑO', guidingQuestion: '¿Cómo lo mejoramos?', instructions: [], relatedStepNumbers: [], responseFields: [{ id: 'change', prompt: '¿Qué cambiaste para mejorar tu proyecto?', multiline: true }, { id: 'worked', prompt: '¿Funcionó mejor después del cambio? Explica qué ocurrió.', multiline: true }, { id: 'next_improvement', prompt: '¿Qué otra mejora te gustaría agregar?', multiline: true }] }
];
