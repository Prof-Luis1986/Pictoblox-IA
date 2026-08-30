export type TeacherGradeComponentId = 'steps' | 'wall' | 'openQuestions' | 'quiz' | 'experimentsReflection';

export interface TeacherGradeComponent {
  id: TeacherGradeComponentId;
  label: string;
  completed: number;
  available: number;
  weight: number;
  points: number;
}

export interface TeacherGradeResult {
  percentage: number;
  grade: 6 | 7 | 8 | 9 | 10;
  components: TeacherGradeComponent[];
}

const COMPONENTS: Array<{ id: TeacherGradeComponentId; label: string; baseWeight: number }> = [
  { id: 'steps', label: 'Pasos técnicos', baseWeight: 50 },
  { id: 'wall', label: 'Muro del Progreso', baseWeight: 25 },
  { id: 'openQuestions', label: 'Preguntas abiertas', baseWeight: 10 },
  { id: 'quiz', label: 'Cuestionario', baseWeight: 10 },
  { id: 'experimentsReflection', label: 'Experimentos y reflexión', baseWeight: 5 }
];

export const percentageToPrivateGrade = (percentage: number): 6 | 7 | 8 | 9 | 10 => {
  if (percentage <= 30) return 6;
  if (percentage <= 60) return 7;
  if (percentage <= 80) return 8;
  if (percentage < 100) return 9;
  return 10;
};

export const calculateTeacherGrade = (counts: Record<TeacherGradeComponentId, { completed: number; available: number }>): TeacherGradeResult => {
  const availableComponents = COMPONENTS.filter(component => counts[component.id].available > 0);
  const availableBaseWeight = availableComponents.reduce((sum, component) => sum + component.baseWeight, 0);
  const components = availableComponents.map(component => {
    const count = counts[component.id];
    const weight = component.baseWeight / availableBaseWeight * 100;
    const ratio = Math.min(Math.max(count.completed, 0), count.available) / count.available;
    return { id: component.id, label: component.label, completed: count.completed, available: count.available, weight, points: weight * ratio };
  });
  const percentage = Math.round(components.reduce((sum, component) => sum + component.points, 0));
  return { percentage, grade: percentageToPrivateGrade(percentage), components };
};
