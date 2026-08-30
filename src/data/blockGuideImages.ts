const BLOCK_GUIDES: Record<string, string> = {
  't1-act2:4': '/resources/block-guides/t1-act2/paso-04-evento.png',
  't1-act3:4': '/resources/block-guides/t1-act3/paso-04-video.png',
  't1-act3:6': '/resources/block-guides/t1-act3/paso-06-analizar.png',
  't1-act4:5': '/resources/block-guides/t1-act4/paso-05-mouse.png',
  't1-act4:7': '/resources/block-guides/t1-act4/paso-07-clones.png',
  't1-act5:2': '/resources/block-guides/t1-act5/paso-02-bird.png',
  't1-act5:4': '/resources/block-guides/t1-act5/paso-04-tuberias.png',
  't1-act6:6': '/resources/block-guides/t1-act6/paso-06-player.png',
  't2-act1:4': '/resources/block-guides/t2-act1/paso-04-evento.png',
  't2-act2:4': '/resources/block-guides/t2-act2/paso-04-video.png',
  't2-act2:6': '/resources/block-guides/t2-act2/paso-06-analizar.png',
  't2-act5:3': '/resources/block-guides/t2-act5/paso-03-entrenamiento.png',
  't2-act5:4': '/resources/block-guides/t2-act5/paso-04-reconocimiento.png',
  't2-act6:4': '/resources/block-guides/t2-act6/paso-04-puerta.png',
  't2-act7:8': '/resources/block-guides/t2-act7/paso-08-modo-loro.png',
  't2-act8:5': '/resources/block-guides/t2-act8/paso-05-algoritmo.png',
  't2-act8:6': '/resources/block-guides/t2-act8/paso-06-encender.png',
  't2-act8:7': '/resources/block-guides/t2-act8/paso-07-apagar.png'
};

export const getBlockGuideImage = (practiceId: string, stepNumber: number): string | undefined =>
  BLOCK_GUIDES[`${practiceId}:${stepNumber}`];

export const BLOCK_GUIDE_ENTRIES = Object.entries(BLOCK_GUIDES);
