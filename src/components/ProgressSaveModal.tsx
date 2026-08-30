import React, { useState } from 'react';
import {
  X,
  Save,
  HardDrive,
  CheckCircle2,
  Copy,
  Download,
  Upload,
  RefreshCw,
  Award,
  AlertCircle,
  Terminal
} from 'lucide-react';
import { StudentProgress } from '../types';
import { saveStudentProgress } from '../services/firebase';

interface ProgressSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: StudentProgress;
  onProgressUpdated: (newProgress: StudentProgress) => void;
}

export const ProgressSaveModal: React.FC<ProgressSaveModalProps> = ({
  isOpen,
  onClose,
  progress,
  onProgressUpdated
}) => {
  const [studentName, setStudentName] = useState(progress.studentName || 'Estudiante');
  const [studentId, setStudentId] = useState(progress.studentId);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedCode, setCopiedCode] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'save' | 'transfer'>('save');

  if (!isOpen) return null;

  const completedCount = Object.keys(progress.completedPractices).length;
  const badgesCount = progress.badgesEarned.length;

  const handleManualSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    const updated: StudentProgress = {
      ...progress,
      studentName: studentName.trim() || 'Estudiante',
      studentId: studentId.trim() || progress.studentId,
      lastActiveDate: new Date().toISOString()
    };

    const saved = await saveStudentProgress(updated);
    updated.syncedToFirebase = saved;
    onProgressUpdated(updated);

    setIsSaving(false);
    setSaveStatus(saved ? 'success' : 'error');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handleExportCode = () => {
    try {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(progress))));
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleImportCode = async () => {
    setImportError(null);
    setImportSuccess(false);

    if (!importCode.trim()) {
      setImportError('Por favor pega el código de progreso para restaurar.');
      return;
    }

    try {
      const decodedStr = decodeURIComponent(escape(atob(importCode.trim())));
      const parsed = JSON.parse(decodedStr) as StudentProgress;

      if (!parsed.completedPractices || typeof parsed.completedPractices !== 'object') {
        throw new Error('Formato de progreso inválido.');
      }

      await saveStudentProgress(parsed);
      onProgressUpdated(parsed);
      setImportSuccess(true);
      setImportCode('');
      setTimeout(() => {
        setImportSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      setImportError('Código de progreso no reconocido. Verifica haber copiado el texto completo.');
    }
  };

  return (
    <div
      id="progress-save-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in text-slate-200"
      onClick={onClose}
    >
      <div
        id="progress-save-modal-container"
        className="relative w-full max-w-lg bg-slate-950 border border-emerald-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden p-6 sm:p-7 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-mono">
                // CONTROL DE PERSISTENCIA
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Sesión local y respaldo privado en Firestore
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-2xl transition"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-2xl bg-slate-900 border border-slate-800 p-1 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('save')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'save'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            // GUARDAR PROGRESO
          </button>
          <button
            onClick={() => setActiveTab('transfer')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'transfer'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            // COPIA DE SEGURIDAD
          </button>
        </div>

        {activeTab === 'save' ? (
          <div className="space-y-5">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block">// PRÁCTICAS LISTAS</span>
                <span className="text-xl font-black text-emerald-400">{completedCount}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-xs text-amber-300 block">// INSIGNIAS</span>
                <span className="text-xl font-black text-amber-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" /> {badgesCount}
                </span>
              </div>
            </div>

            {/* Student ID info */}
            <div className="space-y-3 font-mono">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  // NOMBRE DEL OPERADOR
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="Tu nombre o apodo..."
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  // IDENTIFICADOR DE USUARIO (ID)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={studentId}
                    readOnly
                    className="flex-1 px-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-mono text-emerald-400 select-all"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(studentId);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-xs font-bold text-slate-300 transition"
                    title="Copiar ID"
                  >
                    {copiedCode ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block font-sans">
                  El respaldo remoto está ligado a la sesión anónima de esta pestaña.
                </span>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                id="btn-confirm-save-progress"
                onClick={handleManualSave}
                disabled={isSaving}
                className="w-full py-3 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-mono text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transition"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>GUARDANDO Y SINCRONIZANDO...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>GUARDAR PROGRESO AHORA</span>
                  </>
                )}
              </button>
            </div>

            {saveStatus === 'success' && (
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>¡PROGRESO GUARDADO Y SINCRONIZADO!</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 font-mono">
            {/* Export */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">// EXPORTAR AVANCE</span>
                <button
                  onClick={handleExportCode}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? '¡COPIADO!' : 'COPIAR CÓDIGO'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Genera un código portátil con todos tus pasos completados e insignias para llevarlo a otra computadora.
              </p>
            </div>

            {/* Import */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                // RESTAURAR CÓDIGO DE PROGRESO
              </label>
              <textarea
                value={importCode}
                onChange={e => setImportCode(e.target.value)}
                placeholder="Pega aquí el código de respaldo..."
                rows={3}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition"
              />

              {importError && (
                <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {importSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>¡Progreso restaurado correctamente!</span>
                </div>
              )}

              <button
                onClick={handleImportCode}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition"
              >
                CARGAR Y RESTAURAR
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>ALMACENAMIENTO LOCAL ACTIVO</span>
          </div>
          <span>RESPALDO REMOTO PRIVADO ACTIVO</span>
        </div>
      </div>
    </div>
  );
};
