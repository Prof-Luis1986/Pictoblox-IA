import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import ts from 'typescript';

const root = process.cwd();
const manifest = JSON.parse(readFileSync(`${root}/src/data/sourceManifest.json`, 'utf8'));
const main = manifest.activities.filter(activity => activity.id !== 't1-extra-act7');
const dataSource = readFileSync(`${root}/src/data/progressWallData.ts`, 'utf8');
const componentSource = readFileSync(`${root}/src/components/ProgressWall.tsx`, 'utf8');
const modalSource = readFileSync(`${root}/src/components/SubmitPracticeModal.tsx`, 'utf8');
const sessionSource = readFileSync(`${root}/src/services/sessionStorage.ts`, 'utf8');
const allSource = readFileSync(`${root}/src/data/allPractices.ts`, 'utf8');
const practicePageSource = readFileSync(`${root}/src/pages/PracticePage.tsx`, 'utf8');

const compiled = ts.transpileModule(dataSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
  .replace("import { ProgressWallStage } from '../types';", '');
const data = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const expectedOrder = ['problem', 'idea', 'design', 'prototype', 'error', 'redesign'];

assert.equal(main.length, 12, 'Expected the 12 main practices');
for (const activity of main) {
  const stages = data.PROGRESS_WALL_BY_PRACTICE[activity.id];
  assert.ok(stages, `${activity.id} has no explicit Progress Wall declaration`);
  assert.deepEqual(stages.map(stage => stage.id), expectedOrder, `${activity.id} stage order differs`);
  stages.forEach(stage => assert.ok(stage.guidingQuestion.trim(), `${activity.id}/${stage.id} has no guiding question`));
  const assigned = stages.flatMap(stage => stage.relatedStepNumbers);
  assert.deepEqual([...assigned].sort((a, b) => a - b), Array.from({ length: activity.stepCount }, (_, index) => index + 1), `${activity.id} has missing, duplicate, or foreign technical steps`);
}

const fruit = data.FRUTA_NINJA_PROGRESS_WALL;
assert.deepEqual(fruit.map(stage => stage.id), expectedOrder, 'Fruta Ninja blank template order differs');
assert.ok(fruit.every(stage => stage.instructions.length === 0 && stage.relatedStepNumbers.length === 0), 'Fruta Ninja received invented instructions or solved steps');
assert.ok(allSource.includes("p.id === 't1-extra-act7' ? FRUTA_NINJA_PROGRESS_WALL"), 'Fruta Ninja is not explicitly routed to its blank template');
assert.ok(componentSource.includes('data-progress-wall-indicator'), 'Visual stage indicator is missing');
assert.ok(!practicePageSource.includes('<ProgressWall practice='), 'The old independent Progress Wall card is still mounted');
const positions = {
  indicator: practicePageSource.indexOf('<ProgressWallIndicator'),
  problem: practicePageSource.indexOf('stageId="problem"'),
  idea: practicePageSource.indexOf('stageId="idea"'),
  resources: practicePageSource.indexOf('practice.resources &&'),
  design: practicePageSource.indexOf('stageId="design"'),
  prototype: practicePageSource.indexOf('stageId="prototype"'),
  simulation: practicePageSource.indexOf('<InteractiveBlockSimulation'),
  steps: practicePageSource.indexOf('<StepViewer'),
  error: practicePageSource.indexOf('stageId="error"'),
  redesign: practicePageSource.indexOf('stageId="redesign"'),
  questions: practicePageSource.indexOf('<OpenQuestionsSection')
};
assert.ok(Object.values(positions).every(position => position >= 0), 'One or more integrated practice regions are missing');
assert.ok(positions.indicator < positions.problem && positions.problem < positions.idea && positions.idea < positions.resources, 'Problem/Idea are not integrated before construction resources');
assert.ok(positions.resources < positions.design && positions.design < positions.prototype, 'Design is not immediately before the prototype route');
assert.ok(positions.prototype < positions.simulation && positions.simulation < positions.steps && positions.steps < positions.error, 'Prototype does not structurally contain simulation and technical guide');
assert.ok(positions.error < positions.redesign && positions.redesign < positions.questions, 'Error/Redesign are not before the original open questions');
assert.ok(componentSource.includes("stage.relatedStepNumbers.every(number => completedSteps.includes(number))"), 'Prototype completion is not tied to every assigned technical step');
assert.ok(!componentSource.includes('Marcar etapa como terminada'), 'A stage can still be completed with the old manual button');
expectedOrder.forEach(id => assert.ok(dataSource.includes(`id: '${id}'`), `Indicator/data omits ${id}`));
assert.ok(sessionSource.includes('progress_wall:'), 'Progress Wall is not session-scoped');
assert.ok(!componentSource.includes('localStorage') && !sessionSource.includes('localStorage'), 'Progress Wall uses localStorage');
assert.ok(modalSource.includes('Resumen privado de tu Muro del Progreso'), 'Private pre-submission summary is missing');
assert.ok(!readFileSync(`${root}/src/types/index.ts`, 'utf8').includes('progressWallResponses'), 'Progress Wall responses were added to the teacher payload');
assert.ok(existsSync(`${root}/internal/reference-projects`), 'Internal project protection directory is missing');

console.log('Progress Wall audit passed: 12 practices, six ordered stages, complete step coverage, private session storage, and blank Fruta Ninja template.');
