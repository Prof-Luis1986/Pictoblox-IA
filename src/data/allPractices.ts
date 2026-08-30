import { Practice } from '../types';
import { PRACTICES_TOMO_1 } from './practicesDataTomo1';
import { PRACTICES_TOMO_2 } from './practicesDataTomo2';
import { getPdfVisualForStep } from './pdfVisualReferences';
import { getCorrectedSteps } from './practiceStepCorrections';
import { getSb3BlocksForStep, getSb3CaptureForStep } from './sb3ProjectVisuals';

const BLOCK_WORDS = /^(al hacer clic|al presionar|al recibir|al comenzar|cambiar |fijar |asignar |decir |ir a |apuntar |mover |mostrar|esconder|hide |show |por siempre|repetir|si |si no|esperar |crear clon|eliminar este clon|detener |analizar |obtener |dar a |sumar a |enviar |iniciar sonido|tocar sonido|start listening|clear speech)/i;


/**
 * The books describe the program inside the numbered instructions.  Keep that
 * source text as the single source of truth, but turn code-shaped lines into a
 * connected visual stack.  This also prevents a programming step from showing
 * an empty "blocks ready" panel when no screenshot was attached.
 */
const inferBlockSnippets = (instructions: string[]): string[] => {
  const snippets: string[] = [];

  const add = (value: string, indent = 0) => {
    const clean = value
      .replace(/^\s*(?:\d+[.)]|[-•])\s*/, '')
      .replace(/^['“”]|['“”]$/g, '')
      .replace(/[.:]$/, '')
      .trim();
    if (clean && BLOCK_WORDS.test(clean) && !snippets.includes(`${'  '.repeat(indent)}${clean}`)) {
      snippets.push(`${'  '.repeat(indent)}${clean}`);
    }
  };

  instructions.forEach(instruction => {
    const originalIndent = Math.max(0, Math.floor((instruction.match(/^\s*/)?.[0].length || 0) / 2));
    const normalized = instruction.replace(/^[\s]+/, '');

    // Detailed book transcriptions normally put one block after each numbered
    // item or arrow. Preserve their indentation so C/loop blocks read as stacks.
    normalized.split(/\s+->\s+|\s+→\s+/).forEach((part, partIndex) => {
      const fragments = part.split(/\s*\{\s*|\s*\}\s*/).filter(Boolean);
      fragments.forEach((fragment, fragmentIndex) =>
        add(fragment, originalIndent + partIndex + fragmentIndex)
      );
    });

    // Also collect quoted PictoBlox block names embedded in prose.
    for (const match of normalized.matchAll(/["“]([^"”]+)["”]/g)) add(match[1], originalIndent);
  });

  return snippets;
};

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
    // Los proyectos completos se conservan como respaldo interno del curso,
    // pero no se ofrecen al alumno: la práctica consiste en construirlos.
    sb3Project: undefined,
    steps: getCorrectedSteps(p).map(step => {
      const sb3Blocks = getSb3BlocksForStep(p.id, step.stepNumber);
      if (sb3Blocks) {
        return {
          ...step,
          blockImage: getSb3CaptureForStep(p.id, step.stepNumber),
          blockCodeSnippets: sb3Blocks
        };
      }
      if (step.blockImage || (step.blockCodeSnippets && step.blockCodeSnippets.length)) return step;
      const inferred = inferBlockSnippets(step.instructions);
      const pdfVisual = getPdfVisualForStep(p.id, step.stepNumber);
      return {
        ...step,
        blockImage: pdfVisual,
        blockCodeSnippets: inferred.length ? inferred : undefined
      };
    })
  };
};

export const ALL_PRACTICES: Practice[] = [
  ...PRACTICES_TOMO_1.map(normalizePractice),
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
