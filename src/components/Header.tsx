import React, { useState } from 'react';
import {
  Bot,
  BookOpen,
  Sparkles,
  Search,
  Palette,
  Award,
  Menu,
  X,
  Save,
  Home,
  CheckCircle2
  ,Trash2
} from 'lucide-react';
import { StudentProgress } from '../types';

interface HeaderProps {
  progress: StudentProgress;
  onOpenSearch: () => void;
  onOpenColorTable: () => void;
  onOpenProgressModal?: () => void;
  currentPath: string;
  onClearSession: () => void;
  hasConfirmedSubmission: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  onOpenSearch,
  onOpenColorTable,
  onOpenProgressModal,
  currentPath,
  onClearSession,
  hasConfirmedSubmission
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const completedCount = Object.keys(progress.completedPractices).length;
  const badgesCount = progress.badgesEarned.length;

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-emerald-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Friendly Title */}
        <div className="flex items-center gap-3">
          <a href="#/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-white font-sans">
                  Mentes <span className="text-emerald-400">IA</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Primaria 🚀
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Aprende jugando
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Friendly Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-semibold">
          <a
            href="#/"
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
              currentPath === '#/' || currentPath === ''
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>Inicio</span>
          </a>

          <a
            href="#/curso/aprende-ia-jugando"
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
              currentPath.includes('aprende-ia-jugando')
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            <span>👀 Curso 1: Visión IA</span>
          </a>

          <a
            href="#/curso/ia-casas-inteligentes"
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
              currentPath.includes('ia-casas-inteligentes')
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            <span>🏠 Curso 2: Casas Inteligentes</span>
          </a>

          <a
            href="#/glosario"
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
              currentPath.includes('glosario')
                ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Diccionario IA</span>
          </a>

          <button
            onClick={onOpenColorTable}
            className="px-3 py-2 rounded-xl text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 border border-amber-500/30 transition flex items-center gap-1.5"
            title="Ver los colores y tipos de bloques de PictoBlox"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Colores de Bloques</span>
          </button>
        </nav>

        {/* Right Student Stats & Actions */}
        <div className="flex items-center gap-2">
          {/* Badges and Progress Pill */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl p-1 sm:p-1.5 text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1 px-2 py-1 bg-emerald-950/70 border border-emerald-500/30 rounded-xl text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedCount} listas</span>
            </span>

            <span className="flex items-center gap-1 px-2 py-1 bg-amber-950/70 border border-amber-500/30 rounded-xl text-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{badgesCount} medallas</span>
            </span>
          </div>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            title="Buscar prácticas o temas"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Save Progress */}
          {onOpenProgressModal && (
            <button
              onClick={onOpenProgressModal}
              className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 transition"
              title="Guardar mi progreso"
            >
              <Save className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClearSession}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-500/35 text-rose-200 transition"
            title="Borrar nombre, grupo, respuestas y progreso de esta sesión"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden xl:inline">{hasConfirmedSubmission ? 'Finalizar sesión' : 'Borrar mis datos de esta sesión'}</span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onClearSession(); }}
            className="w-full flex items-center gap-2 p-3 rounded-xl hover:bg-rose-950 text-rose-300 text-left"
          >
            <Trash2 className="w-4 h-4" />
            <span>{hasConfirmedSubmission ? 'Finalizar sesión' : 'Borrar mis datos de esta sesión'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2 text-sm font-semibold">
          <a
            href="#/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-3 rounded-xl hover:bg-slate-900 text-slate-200"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>🏠 Inicio</span>
          </a>
          <a
            href="#/curso/aprende-ia-jugando"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-3 rounded-xl hover:bg-slate-900 text-slate-200"
          >
            <span>👀 Curso 1: Visión Artificial y Juegos</span>
          </a>
          <a
            href="#/curso/ia-casas-inteligentes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-3 rounded-xl hover:bg-slate-900 text-slate-200"
          >
            <span>🏠 Curso 2: Casas Inteligentes y Domótica</span>
          </a>
          <a
            href="#/glosario"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-3 rounded-xl hover:bg-slate-900 text-slate-200"
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>📖 Diccionario de Conceptos</span>
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenColorTable();
            }}
            className="w-full flex items-center gap-2 p-3 rounded-xl hover:bg-slate-900 text-amber-300 text-left"
          >
            <Palette className="w-4 h-4 text-amber-400" />
            <span>🎨 Colores y Tipos de Bloques</span>
          </button>
        </div>
      )}
    </header>
  );
};
