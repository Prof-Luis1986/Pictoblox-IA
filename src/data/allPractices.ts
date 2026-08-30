import { Practice } from '../types';
import { PRACTICES_TOMO_1 } from './practicesDataTomo1';
import { PRACTICES_TOMO_2 } from './practicesDataTomo2';
import { ADDITIONAL_RESOURCE_PRACTICES } from './additionalResourcePractices';
import { getBlockGuideImage } from './blockGuideImages';
import { FRUTA_NINJA_PROGRESS_WALL, PROGRESS_WALL_BY_PRACTICE } from './progressWallData';

// Helper to normalize practice fields
const normalizePractice = (p: Practice): Practice => {
  const practiceNumber = p.practiceNumber || (p.tomo === 2 ? `Actividad ${p.number}` : `Práctica ${p.number}`);
  const badgeAwarded = p.badgeAwarded || (p.tomo === 1 ? `Especialista en ${p.shortTitle || p.title}` : `Protocolo IA - Lab ${p.number}`);
  const estimatedDurationMinutes = p.estimatedDurationMinutes || (p.steps.length * 5 + 15);
  const learningObjectives = p.learningObjectives || (p.learningObjective ? [p.learningObjective] : ['Aprender conceptos de IA y bloques en PictoBlox']);
  const pictobloxExtensions = p.pictobloxExtensions || p.extensions || [];
  const quizQuestions = p.quizQuestions || p.quiz || [];

  return {
    ...p,
    practiceNumber,
    badgeAwarded,
    estimatedDurationMinutes,
    learningObjectives,
    pictobloxExtensions,
    quizQuestions,
    resources: p.resources,
    progressWallStages: p.id === 't1-extra-act7' ? FRUTA_NINJA_PROGRESS_WALL : PROGRESS_WALL_BY_PRACTICE[p.id],
    // Los proyectos completos se conservan como respaldo interno del curso,
    // pero no se ofrecen al alumno: la práctica consiste en construirlos.
    sb3Project: undefined,
    steps: p.steps.map(step => ({
      ...step,
      blockImage: getBlockGuideImage(p.id, step.stepNumber) || step.blockImage
    }))
  };
};

export const ALL_PRACTICES: Practice[] = [
  ...PRACTICES_TOMO_1.map(normalizePractice),
  ...ADDITIONAL_RESOURCE_PRACTICES.map(normalizePractice),
  ...PRACTICES_TOMO_2.map(normalizePractice)
];

export const getPracticeById = (id: string): Practice | undefined => {
  return ALL_PRACTICES.find(p => p.id === id);
};

export const getPracticesByCourse = (courseId: string): Practice[] => {
  return ALL_PRACTICES.filter(p => p.courseId === courseId);
};

export const getAdjacentPractices = (currentId: string) => {
  const current = getPracticeById(currentId);
  if (!current) return { prev: undefined, next: undefined };

  const coursePractices = getPracticesByCourse(current.courseId);
  const currentIndex = coursePractices.findIndex(p => p.id === currentId);

  const prev = currentIndex > 0 ? coursePractices[currentIndex - 1] : undefined;
  const next = currentIndex < coursePractices.length - 1 ? coursePractices[currentIndex + 1] : undefined;

  return { prev, next };
};
