export interface OpenQuestionItem {
  id: string;
  question: string;
}

export const OPEN_QUESTIONS_BY_PRACTICE: Record<string, OpenQuestionItem[]> = {
  't1-act1': [
    { id: 't1a1-q1', question: '¿Qué aprendiste?' }
  ],
  't1-act2': [
    { id: 't1a2-q1', question: '¿Qué aprendiste?' }
  ],
  't1-act3': [
    { id: 't1a3-q1', question: '¿La IA detecta tu rostro?' },
    { id: 't1a3-q2', question: '¿Qué ocurrió cuando te alejaste o cubriste parte de tu rostro?' },
    { id: 't1a3-q3', question: '¿Qué necesita la Inteligencia Artificial para reconocer tu rostro correctamente?' },
    { id: 't1a3-q4', question: '¿Qué ocurrió cuando había varias personas al mismo tiempo?' }
  ],
  't1-act4': [
    { id: 't1a4-q1', question: '¿Qué ocurrió con la dificultad del juego?' },
    { id: 't1a4-q2', question: '¿Qué diferencia sentiste al jugar?' },
    { id: 't1a4-q3', question: '¿Qué crees que influyó en el resultado?' },
    { id: 't1a4-q4', question: '¿Quién controla el juego?' }
  ],
  't1-act5': [
    { id: 't1a5-q1', question: '¿Qué ocurrió con la dificultad del juego?' },
    { id: 't1a5-q2', question: '¿El recorrido del juego cambió?' },
    { id: 't1a5-q3', question: '¿Qué diferencia sentiste al jugar?' },
    { id: 't1a5-q4', question: '¿Qué crees que influyó en el resultado?' }
  ],
  't1-act6': [
    { id: 't1a6-q1', question: 'Mueve tu cabeza hacia los lados y de arriba a abajo. ¿La nave espacial sigue tu rostro con precisión?' }
  ],
  't2-act1': [
    { id: 't2a1-q1', question: '¿Qué aprendiste?' },
    { id: 't2a1-q2', question: '¿Crees que una computadora también puede darse cuenta de que hay un rostro frente a una cámara?' }
  ],
  't2-act2': [
    { id: 't2a2-q1', question: '¿La IA detecta tu rostro?' },
    { id: 't2a2-q2', question: '¿Qué cambió cuando modificaste la luz o la distancia?' },
    { id: 't2a2-q3', question: '¿Qué necesita la Inteligencia Artificial para reconocer tu rostro correctamente?' },
    { id: 't2a2-q4', question: '¿Detecta uno o varios rostros?' }
  ],
  't2-act5': [
    { id: 't2a5-q1', question: '¿El sistema reconoció correctamente el rostro entrenado?' },
    { id: 't2a5-q2', question: '¿Qué ocurrió cuando otra persona se colocó frente a la cámara?' },
    { id: 't2a5-q3', question: '¿Qué pasó cuando se cubrió parte del rostro?' },
    { id: 't2a5-q4', question: '¿Cómo son los datos cuando hay poca luz?' }
  ],
  't2-act6': [
    { id: 't2a6-q1', question: '¿Qué ocurrió cuando el sistema reconoció correctamente el rostro?' },
    { id: 't2a6-q2', question: '¿Qué sucedió cuando una persona diferente intentó ingresar?' }
  ],
  't2-act8': [
    { id: 't2a8-q1', question: '¿Qué está haciendo tu algoritmo?' },
    { id: 't2a8-q2', question: '¿Qué palabras clave deberías poner para que Niko entienda que quieres apagar la luz?' },
    { id: 't2a8-q3', question: '¿Qué nuevo mensaje deberías crear y enviar para que la lámpara se apague?' },
    { id: 't2a8-q4', question: '¿Cómo encenderías tú una lámpara?' }
  ]
};
