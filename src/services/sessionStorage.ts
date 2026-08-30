import { ProgressWallStageId, StudentProgress } from '../types';

export interface ProgressWallSessionState {
  currentStageId: ProgressWallStageId;
  completedStageIds: ProgressWallStageId[];
  responses: Record<string, string>;
}

export const ACADEMIC_SESSION_PREFIX = 'mentes_ia_session:';
const PROGRESS_KEY = `${ACADEMIC_SESSION_PREFIX}progress`;
const STUDENT_NAME_KEY = `${ACADEMIC_SESSION_PREFIX}student_name`;
const STUDENT_GROUP_KEY = `${ACADEMIC_SESSION_PREFIX}student_group`;

const storageAvailable = (): boolean => {
  try {
    const key = `${ACADEMIC_SESSION_PREFIX}availability_check`;
    window.sessionStorage.setItem(key, '1');
    window.sessionStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export const createEmptyStudentProgress = (): StudentProgress => ({
  studentId: `student_${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`,
  studentName: 'Estudiante',
  studentGroup: '',
  completedPractices: {},
  badgesEarned: [],
  syncedToFirebase: false
});

export const readSessionValue = <T>(key: string, fallback: T): T => {
  if (!storageAvailable()) return fallback;
  try {
    const raw = window.sessionStorage.getItem(`${ACADEMIC_SESSION_PREFIX}${key}`);
    return raw === null ? fallback : JSON.parse(raw) as T;
  } catch {
    try { window.sessionStorage.removeItem(`${ACADEMIC_SESSION_PREFIX}${key}`); } catch { /* unavailable */ }
    return fallback;
  }
};

export const writeSessionValue = (key: string, value: unknown): boolean => {
  if (!storageAvailable()) return false;
  try {
    window.sessionStorage.setItem(`${ACADEMIC_SESSION_PREFIX}${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const removeSessionValue = (key: string): void => {
  try { window.sessionStorage.removeItem(`${ACADEMIC_SESSION_PREFIX}${key}`); } catch { /* unavailable */ }
};

export const emptyProgressWallState = (): ProgressWallSessionState => ({
  currentStageId: 'problem', completedStageIds: [], responses: {}
});

export const loadProgressWallState = (practiceId: string): ProgressWallSessionState =>
  readSessionValue(`progress_wall:${practiceId}`, emptyProgressWallState());

export const saveProgressWallState = (practiceId: string, state: ProgressWallSessionState): boolean =>
  writeSessionValue(`progress_wall:${practiceId}`, state);

export const loadSessionProgress = (): StudentProgress => {
  if (!storageAvailable()) return createEmptyStudentProgress();
  try {
    const raw = window.sessionStorage.getItem(PROGRESS_KEY);
    if (!raw) return createEmptyStudentProgress();
    const parsed = JSON.parse(raw) as StudentProgress;
    if (!parsed.studentId || typeof parsed.completedPractices !== 'object' || !Array.isArray(parsed.badgesEarned)) throw new Error('Invalid progress');
    return parsed;
  } catch {
    try { window.sessionStorage.removeItem(PROGRESS_KEY); } catch { /* unavailable */ }
    return createEmptyStudentProgress();
  }
};

export const saveSessionProgress = (progress: StudentProgress): boolean => {
  if (!storageAvailable()) return false;
  try {
    window.sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
};

export const getSessionStudentName = (): string => readSessionValue('student_name', '');
export const getSessionStudentGroup = (): string => readSessionValue('student_group', '');
export const saveSessionIdentity = (name: string, group: string): void => {
  writeSessionValue('student_name', name);
  writeSessionValue('student_group', group);
};

/** Removes local academic state only. Confirmed external deliveries are untouched. */
export const clearAcademicSession = (): void => {
  if (!storageAvailable()) return;
  try {
    const keys = Array.from({ length: window.sessionStorage.length }, (_, index) => window.sessionStorage.key(index)).filter(Boolean) as string[];
    keys.filter(key => key.startsWith(ACADEMIC_SESSION_PREFIX)).forEach(key => window.sessionStorage.removeItem(key));
    window.sessionStorage.removeItem(STUDENT_NAME_KEY);
    window.sessionStorage.removeItem(STUDENT_GROUP_KEY);
  } catch { /* unavailable */ }
};

export const isAcademicSessionStorageAvailable = storageAvailable;
