/** Original visual references extracted from the supplied 2026 books.
 * Page numbers are intentionally explicit so every web step can be audited
 * against the printed activity instead of using invented placeholder art.
 */
const PAGE_BY_STEP: Record<string, number[]> = {
  't1-act1': [6, 6, 6, 7],
  't1-act2': [23, 24, 25, 26, 27, 27, 28, 29, 30],
  't1-act3': [35, 36, 37, 38, 38, 39, 41, 42, 43, 44, 45, 45],
  't1-act4': [51, 52, 53, 54, 0, 0, 0, 0, 67, 68],
  't1-act5': [75, 76, 77, 78, 87, 88, 88],
  't1-act6': [94, 95, 96, 97, 97, 107, 108],
  't2-act1': [19, 20, 21, 22, 23, 23, 24, 25, 26],
  't2-act2': [32, 33, 34, 35, 35, 36, 38, 39, 40, 41, 42, 42],
  't2-act5': [50, 51, 52, 54, 55, 55],
  't2-act6': [58, 59, 60, 62, 63, 63],
  't2-act7': [69, 69, 70, 70, 71, 72, 72, 73, 73, 74, 75, 75, 76, 76, 77, 77, 78],
  't2-act8': [80, 80, 81, 81, 82, 84, 85, 85, 86]
};

export const getPdfVisualForStep = (practiceId: string, stepNumber: number): string | undefined => {
  const page = PAGE_BY_STEP[practiceId]?.[stepNumber - 1];
  if (!page) return undefined;
  const tome = practiceId.startsWith('t1-') ? 'tomo1' : 'tomo2';
  return `/resources/pdf-captures/${tome}/page-${String(page).padStart(3, '0')}.webp`;
};
