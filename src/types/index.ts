// TypeScript interfaces for PictoBlox IA Educativa

export type BlockCategory =
  | 'motion'
  | 'looks'
  | 'sound'
  | 'events'
  | 'control'
  | 'sensing'
  | 'operators'
  | 'variables'
  | 'myblocks'
  | 'face_detection'
  | 'speech_recognition'
  | 'text_to_speech';

export interface BlockItem {
  category: string;
  color: string;
  hexCode: string;
  function: string;
  examples: string[];
  name?: string;
  description?: string;
  example?: string;
  colorClass?: string;
  icon?: string;
}

export interface PracticeResource {
  id: string;
  name: string;
  fileName: string;
  fileType: 'sb3' | 'sprite3' | 'image' | 'sound' | 'sequence' | 'pdf';
  fileUrl: string;
  description: string;
  howToUse: string; // e.g. "Cargar como fondo", "Cargar como sprite", "Abrir desde PictoBlox"
  sizeLabel?: string;
}

export interface PracticeStep {
  stepNumber: number;
  title: string;
  instructions: string[];
  blockImage?: string;
  blockCodeSnippets?: string[];
  targetSprite?: string;
  blockExplanation?: {
    event: string;
    action: string;
    condition?: string;
    aiData?: string;
    spriteTarget?: string;
    successResult: string;
    failureResult?: string;
  };
  tip?: string;
  warning?: string;
  creativeTip?: string;
  uiScreenshot?: string;
}

export type ProgressWallStageId = 'problem' | 'idea' | 'design' | 'prototype' | 'error' | 'redesign';

export interface ProgressWallResponseField {
  id: string;
  prompt: string;
  multiline?: boolean;
}

export interface ProgressWallStage {
  id: ProgressWallStageId;
  title: string;
  guidingQuestion: string;
  instructions: string[];
  relatedStepNumbers: number[];
  responseFields?: ProgressWallResponseField[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface ExperimentItem {
  id: string;
  title: string;
  instruction: string;
  type?: 'radio' | 'text' | 'checkbox' | 'hybrid';
  options?: string[];
  questionPrompt?: string;
  reflectionQuestion?: string;
}

export interface InstructorGuide {
  summary: string;
  checklist: string[];
  discussionQuestions?: string[];
  videoHelpUrl?: string;
}

export interface Practice {
  id: string; // e.g. "t1-act1", "t1-act2", "t2-act5"
  tomo: 1 | 2;
  courseId: 'aprende-ia-jugando' | 'ia-casas-inteligentes';
  number: number;
  practiceNumber?: string; // e.g. "Práctica 1", "Actividad de Laboratorio 5"
  numberNote?: string;
  title: string;
  shortTitle?: string;
  challengeTitle?: string;
  iconName?: string;
  description: string;
  learningObjectives?: string[];
  learningObjective?: string;
  previousConcepts?: string[];
  requiredMaterials: string[];
  pictobloxExtensions?: string[];
  extensions?: string[];
  privacyNotice?: string;
  estimatedDurationMinutes?: number;
  badgeAwarded?: string;
  sb3ResourcePath?: string;
  sb3Project?: PracticeResource;
  resources?: PracticeResource[];
  steps: PracticeStep[];
  progressWallStages?: ProgressWallStage[];
  experiments?: ExperimentItem[];
  reflection?: string;
  conclusion?: string[];
  quizQuestions?: QuizQuestion[];
  quiz?: QuizQuestion[];
  instructorGuide?: InstructorGuide;
  interactiveSimulatorType?: 'pattern' | 'face_detect' | 'mouse_cat' | 'flappy' | 'space_battle' | 'face_train_door' | 'voice_light';
}

export interface CourseSection {
  id: string;
  sectionNumber: number;
  title: string;
  summary: string;
  concepts: {
    title: string;
    content: string[];
    illustration?: string;
    keyPoints?: string[];
  }[];
  practices: string[]; // practice IDs
}

export interface Course {
  id: 'aprende-ia-jugando' | 'ia-casas-inteligentes';
  tomo: 1 | 2;
  title: string;
  subtitle: string;
  edition: string;
  author: string;
  description: string;
  summaryPoints: string[];
  coverGradient: string;
  accentColor: string;
  sections: CourseSection[];
  practiceIds: string[];
}

export interface GlossaryItem {
  term: string;
  category?: 'IA y Visión' | 'PictoBlox y Scratch' | 'Sensores y Audio' | 'Programación' | string;
  definition: string;
  example?: string;
  icon?: string;
}

export interface QuizAnswerSubmission {
  questionId: string;
  questionText: string;
  selectedOptionIndex: number;
  selectedOptionText: string;
  answered: boolean;
  isCorrect: boolean | null;
}

export interface ExperimentSubmission {
  experimentId: string;
  title: string;
  instruction: string;
  selectedOption?: string;
  questionPrompt?: string;
  notesOrAnswer?: string;
}

export interface StepSubmission {
  stepNumber: number;
  title: string;
  completed: boolean;
}

export interface EvidenceAttachment {
  fileName: string;
  mimeType: 'image/png' | 'image/jpeg' | 'image/webp';
  base64Data: string;
}

export interface PracticeSubmissionPayload {
  submissionId: string;
  studentName: string;
  studentGroup: string;
  studentDate: string;
  studentEmail?: string;
  studentNotes?: string;
  practiceId: string;
  practiceTitle: string;
  practiceNumber: string;
  courseId: string;
  courseTitle: string;
  timestamp: string;
  formattedDate: string;
  steps: StepSubmission[];
  progressWall: {
    availableStages: Array<{ id: ProgressWallStageId; title: string }>;
    respondedStageIds: ProgressWallStageId[];
    responses: Record<string, string>;
  };
  openQuestions: {
    availableQuestions: Array<{ id: string; question: string }>;
    answers: Record<string, string>;
  };
  evidenceAttachments?: EvidenceAttachment[];
  simulatorCompleted?: boolean;
  quizAnswers?: QuizAnswerSubmission[];
  experiments?: ExperimentSubmission[];
  reflectionPrompt?: string;
  reflectionAnswer?: string;
  status: 'COMPLETADO' | 'EN_PROGRESO';
}

export type SubmissionState = 'preparing' | 'sending' | 'confirmed' | 'pending' | 'failed';

export interface ConfirmedEvidence {
  id: string;
  name: string;
  url: string;
}

export interface SubmissionResult {
  state: Exclude<SubmissionState, 'preparing' | 'sending'>;
  message: string;
  submissionId?: string;
  evidenceCount?: number;
  evidenceLinks?: ConfirmedEvidence[];
}

export interface StudentPracticeRecord {
  completed: boolean;
  quizScore?: number;
  quizAnswers?: Record<string, number>;
  stepsCompleted: number[];
  experimentNotes?: Record<string, string>;
  lastUpdated: string;
  lastSubmittedAt?: string;
  submissionPayload?: PracticeSubmissionPayload;
}

export interface StudentProgress {
  studentId: string;
  studentName?: string;
  studentGroup?: string;
  lastActiveDate?: string;
  completedPractices: Record<string, StudentPracticeRecord>;
  badgesEarned: string[];
  syncedToFirebase?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAtPercent?: number;
}
