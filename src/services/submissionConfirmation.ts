import { SubmissionResult } from '../types';

export const classifySubmissionServerPayload = (expectedSubmissionId: string, server: any): SubmissionResult => {
  if (!server || server.status !== 'success') return { state: 'failed', message: server?.message || 'El servidor no confirmó la entrega.' };
  if (server.submissionId !== expectedSubmissionId) return { state: 'failed', message: 'La confirmación recibida no corresponde a esta entrega.' };
  if (!Number.isInteger(server.evidenceCount)) return { state: 'pending', message: 'Entrega enviada, pendiente de confirmación' };
  return { state: 'confirmed', message: server.message || 'Entrega confirmada.', submissionId: server.submissionId, evidenceCount: server.evidenceCount };
};

export const classifyUnreadableResponse = (responseType: string): SubmissionResult | null => responseType === 'opaque'
  ? { state: 'pending', message: 'Entrega enviada, pendiente de confirmación' }
  : null;
