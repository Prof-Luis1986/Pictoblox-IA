import { ProgressWallStageId } from '../types';

export const getSubmissionMissingRequirements = (input: {
  isFreeChallenge: boolean;
  totalSteps: number;
  completedSteps: number[];
  completedWallStages: ProgressWallStageId[];
  openQuestionsComplete: boolean;
}): string[] => (
  input.completedSteps.length < input.totalSteps
    ? [`${input.totalSteps - input.completedSteps.length} paso(s) técnico(s)`]
    : []
);

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
