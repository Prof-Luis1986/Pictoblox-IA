import React, { useState, useMemo } from 'react';
import { GLOSSARY_DATA } from '../data/glossaryData';
import { GlossaryItem } from '../types';
import {
  HelpCircle,
  Search,
  Sparkles,
  BookOpen,
  Layers,
  ArrowLeft,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Cpu,
  Brain,
  Share2,
  Terminal,
  Activity
} from 'lucide-react';

export const GlossaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [speakingTerm, setSpeakingTerm] = useState<string | null>(null);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    GLOSSARY_DATA.forEach(g => {
      if (g.category) set.add(g.category);
    });
    return Array.from(set);
  }, []);

  const filteredGlossary = useMemo(() => {
    return GLOSSARY_DATA.filter(item => {
      const matchSearch =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.example && item.example.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSpeak = (item: GlossaryItem) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingTerm === item.term) {
      window.speechSynthesis.cancel();
      setSpeakingTerm(null);
      return;
    }

    window.speechSynthesis.cancel();
    const text = `${item.term}. ${item.definition} ${item.example ? `Por ejemplo: ${item.example}` : ''}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingTerm(null);
    utterance.onerror = () => setSpeakingTerm(null);

    setSpeakingTerm(item.term);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (item: GlossaryItem) => {
    const textToCopy = `*${item.term}*\n${item.definition}\n${item.example ? `Ejemplo: ${item.example}` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTerm(item.term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="space-y-8 py-8 animate-fade-in text-slate-200">
      {/* Back button */}
      <div>
        <a
          href="#/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> // VOLVER AL PANEL PRINCIPAL
        </a>
      </div>

      {/* Header Banner Cyber Bento Card */}
      <div className="p-8 sm:p-10 rounded-3xl cyber-card space-y-4 relative overflow-hidden">
        <div className="flex items-center flex-wrap gap-2 font-mono">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>TERMINAL DE CONCEPTOS // MATRIX v2.6</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-medium">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{GLOSSARY_DATA.length} TÉRMINOS CON SÍNTESIS DE VOZ Y EJEMPLOS</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
          Glosario Técnico de Inteligencia Artificial & PictoBlox
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-sans">
          Base de conocimiento interactiva con definiciones concisas de Inteligencia Artificial, Aprendizaje Automático, Redes Neuronales Artificiales, Visión por Computadora, Reconocimiento de Voz y Bloques de Programación.
        </p>

        {/* Search & filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 max-w-2xl font-mono">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar término (ej. Redes Neuronales, Sprites)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:bg-slate-950 transition"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl text-xs font-semibold text-emerald-300 focus:outline-none focus:border-emerald-400 transition cursor-pointer"
          >
            <option value="all">TODAS LAS CATEGORÍAS ({GLOSSARY_DATA.length})</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Quick tags */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs font-mono">
          <span className="text-slate-400">// TÉRMINOS CLAVE:</span>
          {['Inteligencia Artificial', 'Machine Learning', 'Redes Neuronales', 'PictoBlox', 'Scratch', 'Reconocimiento Facial', 'Reconocimiento de Voz'].map(t => (
            <button
              key={t}
              onClick={() => setSearchTerm(t)}
              className="px-2.5 py-1 rounded-xl bg-slate-950 hover:bg-emerald-950/60 hover:text-emerald-300 text-slate-300 transition text-[11px] border border-slate-800 hover:border-emerald-500/40 font-medium"
            >
              {t}
            </button>
          ))}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-2.5 py-1 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-[11px] font-bold"
            >
              // LIMPIAR FILTRO
            </button>
          )}
        </div>
      </div>

      {/* Glossary Cyber Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGlossary.length > 0 ? (
          filteredGlossary.map((item, idx) => {
            const isSpeaking = speakingTerm === item.term;
            const isCopied = copiedTerm === item.term;

            return (
              <div
                key={idx}
                id={`glossary-card-${idx}`}
                className="p-6 rounded-3xl bg-slate-950/85 border border-slate-800/90 hover:border-emerald-500/50 shadow-xs hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] space-y-4 transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Card Header with category & audio actions */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-900 pb-3 font-mono">
                    <span className="px-3 py-1 bg-slate-900 group-hover:bg-emerald-950/70 group-hover:text-emerald-300 text-slate-400 rounded-full text-[11px] font-bold transition border border-slate-800 group-hover:border-emerald-500/30">
                      {item.category || 'IA Educativa'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(item)}
                        className={`p-2 rounded-xl border transition ${
                          isSpeaking
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse'
                            : 'bg-slate-900 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border-slate-800'
                        }`}
                        title="Escuchar locución en voz alta"
                        aria-label={`Escuchar locución de ${item.term}`}
                      >
                        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleCopy(item)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition"
                        title="Copiar definición"
                        aria-label={`Copiar definición de ${item.term}`}
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Title & Definition */}
                  <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition font-sans">
                    {item.term}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {item.definition}
                  </p>
                </div>

                {/* Practical Example Box */}
                {item.example && (
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 group-hover:bg-emerald-950/30 border border-slate-800/90 group-hover:border-emerald-500/30 text-xs text-slate-300 transition font-sans">
                    <span className="font-bold text-amber-400 font-mono block mb-0.5">
                      // EJEMPLO EN PICTOBLOX:
                    </span>
                    <span>{item.example}</span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center space-y-3 bg-slate-950 rounded-3xl border border-slate-800 p-8 font-mono">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-white">
              // NO SE ENCONTRARON CONCEPTOS
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
              No hay conceptos que coincidan con "{searchTerm}". Intenta buscar "IA", "Machine Learning" o "Bloques".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold shadow-sm"
            >
              VER TODOS LOS CONCEPTOS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
