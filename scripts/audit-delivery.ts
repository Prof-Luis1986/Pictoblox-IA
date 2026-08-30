import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { classifySubmissionServerPayload, classifyUnreadableResponse } from '../src/services/submissionConfirmation';
import { getSubmissionMissingRequirements, REQUIRED_MAIN_WALL_STAGES } from '../src/services/submissionEligibility';
import { isProgressStageComplete } from '../src/components/ProgressWall';
import { ProgressWallStage } from '../src/types';

assert.equal(classifySubmissionServerPayload('sub-1', { status: 'error', message: 'Drive falló' }).state, 'failed');
assert.equal(classifyUnreadableResponse('opaque')?.state, 'pending');
assert.equal(classifySubmissionServerPayload('sub-1', { status: 'success', submissionId: 'otro', evidenceCount: 0, evidenceLinks: [] }).state, 'failed');
assert.equal(classifySubmissionServerPayload('sub-1', { status: 'success', submissionId: 'sub-1', evidenceCount: 0, evidenceLinks: [], message: 'ok' }).state, 'confirmed');

const missing = getSubmissionMissingRequirements({ isFreeChallenge: false, totalSteps: 2, completedSteps: [1, 2], completedWallStages: REQUIRED_MAIN_WALL_STAGES.filter(stage => stage !== 'redesign'), openQuestionsComplete: true });
assert.deepEqual(missing, ['Etapa REDISEÑO']);

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
assert.ok(!server.includes('data.recipients') && server.includes("const recipients = RECIPIENTS.join(',')"), 'Standalone Apps Script accepts client recipients');
assert.ok(!service.includes('data.recipients &&') && service.includes('var emailList = RECIPIENTS.join'), 'Generated Apps Script accepts client recipients');
assert.ok(modal.indexOf('onSubmissionSuccess(localReceipt)') > modal.indexOf("res.state === 'confirmed'"), 'Confirmed progress can be recorded before verification');
console.log('Delivery audit passed: false positives rejected, IDs verified, mandatory stages enforced, and no-error/no-change paths accepted.');
