import { PracticeSubmissionPayload, SubmissionResult } from '../types';
import { classifySubmissionServerPayload, classifyUnreadableResponse } from './submissionConfirmation';

export const DESTINATION_EMAILS = ['lmartinez@isb.edu.mx', 'dolidos2022@gmail.com'];
export const EVIDENCE_DRIVE_FOLDER_ID = '18RU-WTqq8D67cuAdCVFC4ahQbQ7CSAkL';
export const DEFAULT_APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0GBLsHlOUUZQltKg8vIfE3nU9JZChx1SDhdFzDjGZ_NYS8Mpw-OinaODREaI5PKXsDg/exec';

export const getAppScriptUrl = (): string => {
  const configured = ((import.meta as any).env?.VITE_APPSCRIPT_WEBAPP_URL || '') as string;
  return configured.trim() || DEFAULT_APPSCRIPT_URL;
};

export const submitPracticeToAppScript = async (payload: PracticeSubmissionPayload): Promise<SubmissionResult> => {
  const endpoint = getAppScriptUrl();
  if (!endpoint.startsWith('https://script.google.com/')) return { state: 'failed', message: 'El servicio de entregas no está configurado. Avisa a tu profesor.' };
  try {
    const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
    const unreadable = classifyUnreadableResponse(response.type);
    if (unreadable) return unreadable;
    if (!response.ok) return { state: 'failed', message: `El servidor respondió con el estado ${response.status}.` };
    let server: unknown;
    try { server = await response.json(); } catch { return { state: 'pending', message: 'Entrega enviada, pendiente de confirmación' }; }
    return classifySubmissionServerPayload(payload.submissionId, server);
  } catch (error) {
    console.error('No se pudo contactar el receptor de Apps Script:', error);
    return { state: 'failed', message: 'No se pudo enviar la práctica. Revisa tu conexión e inténtalo nuevamente.' };
  }
};
