import { ProgressWallStageId } from '../types';

export const getSubmissionMissingRequirements = (input: {
  isFreeChallenge: boolean;
  totalSteps: number;
  completedSteps: number[];
  steps?: Array<{ stepNumber: number; title: string }>;
  completedWallStages: ProgressWallStageId[];
  openQuestionsComplete: boolean;
}): string[] => {
  const pendingSteps = input.steps?.filter(step => !input.completedSteps.includes(step.stepNumber));
  if (pendingSteps?.length) {
    return pendingSteps.map(step => `Paso ${step.stepNumber}: ${step.title.replace(/^Paso\s+\d+\s*:\s*/i, '')}`);
  }
  return input.completedSteps.length < input.totalSteps
    ? [`${input.totalSteps - input.completedSteps.length} paso(s) técnico(s)`]
    : [];
};

export const hasIncompleteOptionalResponses = (input: {
  wallCompleted: number;
  wallTotal: number;
  openAnswered: number;
  openTotal: number;
  quizAnswered: number;
  quizTotal: number;
  experimentAnswered: number;
  experimentTotal: number;
  hasReflectionPrompt: boolean;
  reflectionAnswer: string;
}): boolean => (
  input.wallCompleted < input.wallTotal
  || input.openAnswered < input.openTotal
  || input.quizAnswered < input.quizTotal
  || input.experimentAnswered < input.experimentTotal
  || (input.hasReflectionPrompt && !input.reflectionAnswer.trim())
);
