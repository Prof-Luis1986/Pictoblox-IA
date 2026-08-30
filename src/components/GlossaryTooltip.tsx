import React, { useState, useRef, useEffect } from 'react';
import { getGlossaryTerm } from '../data/glossaryData';
import { Sparkles, HelpCircle, Volume2, ArrowRight, X, BookOpen, Terminal } from 'lucide-react';
import { GlossaryItem } from '../types';

interface GlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({
  term,
  children,
  showIcon = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const item: GlossaryItem | undefined = getGlossaryTerm(term) || {
    term: term,
    definition: `Concepto pedagógico clave en la plataforma de Inteligencia Artificial y PictoBlox.`,
    category: 'Concepto STEAM'
  };

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Read definition aloud using browser SpeechSynthesis
  const speakDefinition = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${item.term}. ${item.definition} ${item.example ? `Por ejemplo: ${item.example}` : ''}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <span className="relative inline-flex items-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 underline decoration-emerald-500/50 decoration-dashed underline-offset-4 hover:decoration-emerald-400 transition-colors cursor-help px-0.5 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 ${className}`}
        aria-label={`Ver definición de ${item.term}`}
        aria-expanded={isOpen}
      >
        {children || term}
        {showIcon && <HelpCircle className="w-3.5 h-3.5 text-emerald-400 opacity-80 shrink-0" />}
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-84 z-50 p-4 bg-slate-950 border border-emerald-500/40 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.8)] animate-fade-in text-left text-slate-200 space-y-3 font-sans"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-slate-850 pb-2.5 font-mono">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                // {item.category || 'GLOSARIO IA'}
              </span>
              <h4 className="text-xs sm:text-sm font-black text-white font-sans">
                {item.term}
              </h4>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={speakDefinition}
                className={`p-1.5 rounded-lg border transition ${
                  isSpeaking
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse'
                    : 'bg-slate-900 text-slate-300 hover:text-emerald-400 hover:bg-slate-850 border-slate-800'
                }`}
                title="Escuchar definición en voz alta"
                aria-label="Escuchar definición en voz alta"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
                aria-label="Cerrar tooltip"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Definition */}
          <p className="text-xs text-slate-300 leading-relaxed">
            {item.definition}
          </p>

          {/* Example if present */}
          {item.example && (
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
              <span className="font-bold text-amber-400 font-mono block mb-0.5">// EJEMPLO: </span>
              <span>{item.example}</span>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono">
            <a
              href="#/glosario"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 text-emerald-400 font-bold hover:underline"
            >
              <BookOpen className="w-3 h-3" /> VER EN GLOSARIO
            </a>
            <span className="text-slate-500 text-[10px]">// MATRIX v2.6</span>
          </div>

          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-slate-950" />
        </div>
      )}
    </span>
  );
};
