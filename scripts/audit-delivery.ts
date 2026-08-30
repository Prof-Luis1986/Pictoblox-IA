import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { classifySubmissionServerPayload, classifyUnreadableResponse } from '../src/services/submissionConfirmation';
import { getSubmissionMissingRequirements, hasIncompleteOptionalResponses } from '../src/services/submissionEligibility';
import { isProgressStageComplete } from '../src/components/ProgressWall';
import { ProgressWallStage } from '../src/types';

assert.equal(classifySubmissionServerPayload('sub-1', { status: 'error', message: 'Drive falló' }).state, 'failed');
assert.equal(classifyUnreadableResponse('opaque')?.state, 'pending');
assert.equal(classifySubmissionServerPayload('sub-1', { status: 'success', submissionId: 'otro', evidenceCount: 0, evidenceLinks: [] }).state, 'failed');
assert.equal(classifySubmissionServerPayload('sub-1', { status: 'success', submissionId: 'sub-1', evidenceCount: 0, evidenceLinks: [], message: 'ok' }).state, 'confirmed');

const optionalResponsesDoNotBlock = getSubmissionMissingRequirements({ isFreeChallenge: false, totalSteps: 2, completedSteps: [1, 2], completedWallStages: [], openQuestionsComplete: false });
assert.deepEqual(optionalResponsesDoNotBlock, []);
const missingSteps = getSubmissionMissingRequirements({ isFreeChallenge: false, totalSteps: 2, completedSteps: [1], completedWallStages: [], openQuestionsComplete: false });
assert.deepEqual(missingSteps, ['1 paso(s) técnico(s)']);
const freeChallenge = getSubmissionMissingRequirements({ isFreeChallenge: true, totalSteps: 0, completedSteps: [], completedWallStages: [], openQuestionsComplete: false });
assert.deepEqual(freeChallenge, []);
const completeOptional = { wallCompleted: 6, wallTotal: 6, openAnswered: 2, openTotal: 2, quizAnswered: 3, quizTotal: 3, experimentAnswered: 1, experimentTotal: 1, hasReflectionPrompt: true, reflectionAnswer: 'Aprendí a probar.' };
assert.equal(hasIncompleteOptionalResponses(completeOptional), false, 'Complete optional responses must not show a warning');
assert.equal(hasIncompleteOptionalResponses({ ...completeOptional, quizAnswered: 2 }), true, 'Incomplete optional responses must show a warning without blocking eligibility');

const errorStage = { id: 'error', title: 'ERROR', guidingQuestion: 'x', instructions: [], relatedStepNumbers: [], responseFields: [] } as ProgressWallStage;
assert.equal(isProgressStageComplete(errorStage, { 'error:outcome': 'worked', 'error:test_method': 'bandera', 'error:expected': 'saludo', 'error:actual': 'saludo', 'error:evidence': 'captura' }, []), true);
const redesignStage = { ...errorStage, id: 'redesign', title: 'REDISEÑO' } as ProgressWallStage;
assert.equal(isProgressStageComplete(redesignStage, { 'redesign:redesign_choice': 'none', 'redesign:conclusion': 'funcionó', 'redesign:future_improvement': 'otro fondo' }, []), true);

const modal = readFileSync('src/components/SubmitPracticeModal.tsx', 'utf8');
const service = readFileSync('src/services/appscript.ts', 'utf8');
const server = readFileSync('google-apps-script/Code.gs', 'utf8');
assert.ok(!service.includes("mode: 'no-cors'"), 'no-cors false-positive path remains');
assert.ok(modal.includes("res.state === 'confirmed' && res.submissionId === payload.submissionId"), 'UI success is not gated by verified confirmation');
assert.ok(!modal.includes('if (res.success)'), 'Legacy boolean success path remains');
assert.ok(!modal.includes('Configuración avanzada') && !modal.includes('appScriptUrlInput'), 'Student can still edit the Apps Script endpoint');
assert.ok(!service.includes('localStorage') && !service.includes('setAppScriptUrl'), 'Apps Script endpoint persists in localStorage');
assert.ok(service.includes('VITE_APPSCRIPT_WEBAPP_URL') && service.includes('DEFAULT_APPSCRIPT_URL'), 'Endpoint is not restricted to environment/default values');
assert.ok(!server.includes('data.recipients') && server.includes("to: RECIPIENTS.join(',')"), 'Standalone Apps Script accepts client recipients');
assert.ok(modal.indexOf('onSubmissionSuccess(localReceipt)') > modal.indexOf("res.state === 'confirmed'"), 'Confirmed progress can be recorded before verification');
assert.ok(modal.includes('Regresar y completar respuestas') && modal.includes('Continuar y enviar'), 'Optional response warning actions are missing');
assert.ok(modal.includes('isCorrect = answered ?') && modal.includes('answered,'), 'Unanswered quiz items are still classified as incorrect');
assert.ok(!service.includes('uploadTeacherReport') && !modal.includes('generateTeacherReport'), 'Client still constructs or uploads the teacher report');
const reportSuccessResponse = "{ status: 'success', message: 'Práctica recibida correctamente.', submissionId: submissionId, evidenceCount: 0 }";
assert.ok(server.includes(reportSuccessResponse), 'Teacher report response is not minimal');
assert.ok(!reportSuccessResponse.includes('url') && !reportSuccessResponse.includes('grade') && !reportSuccessResponse.includes('percentage'), 'Teacher report response leaks private information');
assert.ok(server.includes("MailApp.sendEmail({ to: RECIPIENTS.join(',')"), 'Teacher report recipients are not restricted to RECIPIENTS');
console.log('Delivery audit passed: false positives rejected, IDs verified, only technical steps gate submission, optional responses warn without blocking, and free challenges can submit.');
