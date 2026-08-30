import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, BookOpen, Layers, Sparkles, ArrowRight, HelpCircle, Terminal } from 'lucide-react';
import { ALL_PRACTICES } from '../data/allPractices';
import { GLOSSARY_DATA } from '../data/glossaryData';
import { COLOR_TABLE_DATA } from '../data/colorTableData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPractice: (practiceId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPractice
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { practices: [], glossary: [], colors: [] };

    const matchingPractices = ALL_PRACTICES.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.pictobloxExtensions.some(ext => ext.toLowerCase().includes(q)) ||
      p.steps.some(s => s.title.toLowerCase().includes(q) || s.instructions.some(i => i.toLowerCase().includes(q)))
    );

    const matchingGlossary = GLOSSARY_DATA.filter(g =>
      g.term.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q)
    );

    const matchingColors = COLOR_TABLE_DATA.filter(c =>
      c.category.toLowerCase().includes(q) ||
      c.color.toLowerCase().includes(q) ||
      c.function.toLowerCase().includes(q)
    );

    return {
      practices: matchingPractices,
      glossary: matchingGlossary,
      colors: matchingColors
    };
  }, [query]);

  if (!isOpen) return null;

  const totalResults = searchResults.practices.length + searchResults.glossary.length + searchResults.colors.length;

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in text-slate-200"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="relative w-full max-w-2xl bg-slate-950 border border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950 font-mono">
          <Terminal className="w-5 h-5 text-emerald-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar prácticas, bloques, extensiones, términos de IA..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-[10px] font-mono">ESC</span>
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1 font-mono">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-slate-400 text-xs space-y-2 font-mono">
              <p>// ESCRIBE UNA PALABRA CLAVE O SELECCIONA UN TÉRMINO FRECUENTE:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['Face Detection', 'Reconocimiento de Voz', 'Redes Neuronales', 'Machine Learning', 'Flappy Bird', 'Kinect'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-xs transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs font-mono">
              // NO SE ENCONTRARON REGISTROS PARA "{query}".
            </div>
          ) : (
            <div className="space-y-4">
              {/* Practices Results */}
              {searchResults.practices.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <BookOpen className="w-3.5 h-3.5" /> // PRÁCTICAS ({searchResults.practices.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.practices.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPractice(p.id);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between group transition font-sans"
                      >
                        <div>
                          <div className="flex items-center gap-2 font-mono">
                            <span className="text-[11px] text-emerald-400 font-bold">
                              {p.practiceNumber}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300">
                              {p.title}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 font-sans">
                            {p.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary Results */}
              {searchResults.glossary.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <HelpCircle className="w-3.5 h-3.5" /> // GLOSARIO ({searchResults.glossary.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.glossary.map((g, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 font-sans">
                        <span className="text-xs font-bold text-cyan-300 font-mono">{g.term}</span>
                        <p className="text-xs text-slate-300">{g.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Results */}
              {searchResults.colors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Layers className="w-3.5 h-3.5" /> // CATEGORÍAS DE BLOQUES ({searchResults.colors.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.colors.map((c, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 font-sans">
                        <div style={{ backgroundColor: c.hexCode }} className="w-4 h-4 rounded-full shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-white font-mono">{c.category} ({c.color})</span>
                          <p className="text-xs text-slate-400">{c.function}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
