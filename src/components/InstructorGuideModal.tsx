import React, { useEffect } from 'react';
import { X, GraduationCap, CheckSquare, MessageCircle, Terminal } from 'lucide-react';
import { InstructorGuide } from '../types';

interface InstructorGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  practiceTitle: string;
  guide: InstructorGuide;
}

export const InstructorGuideModal: React.FC<InstructorGuideModalProps> = ({
  isOpen,
  onClose,
  practiceTitle,
  guide
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="instructor-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in text-slate-200"
      onClick={onClose}
    >
      <div
        id="instructor-modal-card"
        className="relative w-full max-w-2xl bg-slate-950 border border-emerald-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 font-mono">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                // GUÍA TÉCNICA DEL INSTRUCTOR
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Orientaciones pedagógicas para: <span className="text-emerald-400 font-mono font-bold">{practiceTitle}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-2xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          <p>{guide.summary}</p>
        </div>

        {/* Checklist */}
        <div className="space-y-3 font-mono">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-emerald-400" /> // LISTA DE VERIFICACIÓN EN SALA:
          </h4>
          <ul className="space-y-2 font-sans">
            {guide.checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Discussion questions */}
        {guide.discussionQuestions && guide.discussionQuestions.length > 0 && (
          <div className="space-y-3 pt-2 font-mono">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-amber-400" /> // PREGUNTAS DE DIÁLOGO Y REFLEXIÓN:
            </h4>
            <div className="space-y-2 font-sans">
              {guide.discussionQuestions.map((q, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 font-medium">
                  {q}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end font-mono">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold rounded-2xl transition shadow-[0_0_15px_rgba(16,185,129,0.25)]"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
};
