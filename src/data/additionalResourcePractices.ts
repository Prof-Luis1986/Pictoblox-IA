import { Practice } from '../types';

/** Procede exclusivamente del ZIP; no existe una guia escrita que transcribir. */
export const ADDITIONAL_RESOURCE_PRACTICES: Practice[] = [{
  id: 't1-extra-act7',
  tomo: 1,
  courseId: 'aprende-ia-jugando',
  number: 7,
  practiceNumber: 'Actividad adicional incluida en los recursos',
  numberNote: 'Actividad adicional incluida en los recursos del curso.',
  title: 'Actividad 7: Fruta Ninja IA',
  shortTitle: 'Fruta Ninja IA',
  description: 'Actividad adicional incluida en los recursos. El ZIP no incluye instrucciones escritas paso a paso; esta ficha muestra unicamente los recursos comprobables permitidos para el alumno.',
  requiredMaterials: [],
  resources: [
    { id: 'fruta-fondo', name: 'Fondo Tablilla de corte.svg', fileName: 'Fondo Tablilla de corte.svg', fileType: 'image', fileUrl: '/resources/images/fruta-ninja/Fondo%20Tablilla%20de%20corte.svg', description: 'Fondo incluido en el archivo fuente.', howToUse: 'Cargar como fondo.' },
    { id: 'fruta-sprite', name: 'Frutas.sprite3', fileName: 'Frutas.sprite3', fileType: 'sprite3', fileUrl: '/resources/sprites/Frutas.sprite3', description: 'Sprite incluido en el archivo fuente.', howToUse: 'Cargar como objeto.' },
    { id: 'fruta-katana', name: 'Katana.png', fileName: 'Katana.png', fileType: 'image', fileUrl: '/resources/images/fruta-ninja/Katana.png', description: 'Imagen incluida en el archivo fuente.', howToUse: 'Cargar como objeto o disfraz.' },
    { id: 'fruta-fin', name: 'game_over.png', fileName: 'game_over.png', fileType: 'image', fileUrl: '/resources/images/fruta-ninja/game_over.png', description: 'Pantalla final incluida en el archivo fuente.', howToUse: 'Cargar como fondo o disfraz.' }
  ],
  steps: []
}];
