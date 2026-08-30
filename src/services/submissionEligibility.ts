import { ProgressWallStageId } from '../types';

export const REQUIRED_MAIN_WALL_STAGES: ProgressWallStageId[] = ['problem', 'idea', 'design', 'prototype', 'error', 'redesign'];
const STAGE_LABELS: Record<ProgressWallStageId, string> = { problem: 'PROBLEMA', idea: 'IDEA', design: 'DISEÑO', prototype: 'PROTOTIPO', error: 'ERROR', redesign: 'REDISEÑO' };

export const getSubmissionMissingRequirements = (input: { isFreeChallenge: boolean; totalSteps: number; completedSteps: number[]; completedWallStages: ProgressWallStageId[]; openQuestionsComplete: boolean }): string[] => [
  ...(input.completedSteps.length < input.totalSteps ? [`${input.totalSteps - input.completedSteps.length} paso(s) técnico(s)`] : []),
  ...(!input.isFreeChallenge ? REQUIRED_MAIN_WALL_STAGES.filter(stage => !input.completedWallStages.includes(stage)).map(stage => `Etapa ${STAGE_LABELS[stage]}`) : []),
  ...(!input.openQuestionsComplete ? ['Preguntas abiertas'] : [])
];
