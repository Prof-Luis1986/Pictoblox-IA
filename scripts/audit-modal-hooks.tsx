import assert from 'node:assert/strict';
import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { SubmitPracticeModal } from '../src/components/SubmitPracticeModal';
import { Course, Practice, StudentProgress } from '../src/types';

class MemoryStorage {
  data = new Map<string, string>();
  get length() { return this.data.size; }
  key(index: number) { return [...this.data.keys()][index] ?? null; }
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { this.data.set(key, String(value)); }
  removeItem(key: string) { this.data.delete(key); }
}

Object.assign(globalThis, { window: { sessionStorage: new MemoryStorage(), addEventListener() {}, removeEventListener() {}, setTimeout }, IS_REACT_ACT_ENVIRONMENT: true });

const practice = { id: 't1-act1', tomo: 1, courseId: 'aprende-ia-jugando', number: 1, practiceNumber: 'Práctica 1', title: 'Prueba', description: '', requiredMaterials: [], steps: [], progressWallStages: [] } as Practice;
const course = { id: 'aprende-ia-jugando', tomo: 1, title: 'Curso', subtitle: '', edition: '', author: '', description: '', summaryPoints: [], coverGradient: '', accentColor: '', sections: [], practiceIds: [] } as Course;
const progress = { studentId: 'test', completedPractices: {}, badgesEarned: [] } as StudentProgress;
const props = { onClose() {}, practice, course, progress, wallResponses: {}, openQuestionAnswers: {}, missingRequirements: [], onSubmissionSuccess() {} };

let renderer: TestRenderer.ReactTestRenderer;
await act(async () => { renderer = TestRenderer.create(<SubmitPracticeModal {...props} isOpen={false} />); });
assert.equal(renderer!.toJSON(), null);
await act(async () => { renderer!.update(<SubmitPracticeModal {...props} isOpen />); });
assert.notEqual(renderer!.toJSON(), null);
await act(async () => { renderer!.update(<SubmitPracticeModal {...props} isOpen={false} />); });
await act(async () => { renderer!.update(<SubmitPracticeModal {...props} isOpen />); });
assert.notEqual(renderer!.toJSON(), null);
await act(async () => { renderer!.unmount(); });
console.log('Modal Hooks audit passed: closed, opened, closed, and reopened without changing Hook order.');
