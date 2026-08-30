import React, { useEffect } from 'react';
import { X, Palette, Sparkles, BookOpen, Terminal } from 'lucide-react';
import { COLOR_TABLE_DATA } from '../data/colorTableData';

interface ColorTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColorTableModal: React.FC<ColorTableModalProps> = ({ isOpen, onClose }) => {
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
      id="color-table-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in text-slate-200"
      onClick={onClose}
    >
      <div
        id="color-table-modal-container"
        className="relative w-full max-w-4xl bg-slate-950 border border-emerald-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 font-mono">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                // MATRIZ DE COLORES Y CATEGORÍAS
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Tabla de referencia rápida de colores, sintaxis y funciones de bloques en PictoBlox
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

        {/* Informative Intro */}
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          <p>
            En PictoBlox y Scratch, cada tonalidad cromática define una categoría algorítmica específica. Reconocer las paletas de color te permite localizar e interconectar bloques lógicos de forma veloz para tus proyectos de Inteligencia Artificial.
          </p>
        </div>

        {/* Color Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 font-sans">
          {COLOR_TABLE_DATA.map((cat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5 transition hover:border-emerald-500/40"
            >
              {/* Color swatch */}
              <div
                style={{ backgroundColor: cat.hexCode }}
                className="w-10 h-10 rounded-xl shrink-0 shadow-md flex items-center justify-center text-white font-bold text-lg border border-white/20"
              >
                🧩
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{cat.category}</h4>
                  <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800">
                    {cat.color}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{cat.function}</p>
                <div className="text-[11px] text-emerald-400/90 font-mono pt-1">
                  Ej: {cat.examples.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end font-mono">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.25)] transition"
          >
            CERRAR TABLA
          </button>
        </div>
      </div>
    </div>
  );
};
