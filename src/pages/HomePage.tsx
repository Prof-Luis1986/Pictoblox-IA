import React from 'react';
import {
  Terminal,
  Play,
  Award,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  BookOpen,
  Layers,
  Cpu,
  ShieldCheck,
  Flame,
  Palette,
  Crosshair,
  Radio,
  Eye,
  Activity
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { ALL_PRACTICES } from '../data/allPractices';
import { StudentProgress } from '../types';
import { GlossaryTooltip } from '../components/GlossaryTooltip';

interface HomePageProps {
  progress: StudentProgress;
  onOpenColorTable: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ progress, onOpenColorTable }) => {
  const completedPracticeIds = Object.keys(progress.completedPractices);
  const totalPractices = ALL_PRACTICES.length;
  const overallProgressPercent = Math.round((completedPracticeIds.length / totalPractices) * 100);

  // Key requested terms for showcase
  const featuredTerms = [
    'Inteligencia Artificial',
    'Machine Learning',
    'Redes Neuronales',
    'PictoBlox',
    'Scratch',
    'Bloques de Programación',
    'Sprites',
    'Escenarios',
    'Extensiones',
    'Reconocimiento Facial',
    'Reconocimiento de Voz'
  ];

  return (
    <div className="space-y-10 py-8 animate-fade-in text-slate-200">
      {/* TOP MATRIX BENTO HERO GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bento Tile 1: Main Platform Headline (Span 8) */}
        <div className="lg:col-span-8 p-8 sm:p-10 rounded-3xl cyber-card shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle Cyber scanline background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SISTEMA DE ENTRENAMIENTO STEAM // MATRIX v2.6</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Aprende <span className="text-emerald-400 glow-emerald-text font-mono">Inteligencia Artificial</span> con Programación en Bloques
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explora algoritmos de <GlossaryTooltip term="Inteligencia Artificial" />, modelos de <GlossaryTooltip term="Machine Learning" />, <GlossaryTooltip term="Redes Neuronales" /> y <GlossaryTooltip term="Reconocimiento Facial" /> mediante prácticas interactivas paso a paso en <GlossaryTooltip term="PictoBlox" /> y <GlossaryTooltip term="Scratch" />.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#/curso/aprende-ia-jugando"
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold font-mono rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 transition"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>// MÓDULO 01: VISIÓN & JUEGOS</span>
              </a>

              <a
                href="#/curso/ia-casas-inteligentes"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 text-xs sm:text-sm font-bold font-mono rounded-2xl border border-cyan-500/30 hover:border-cyan-400 flex items-center gap-2 transition shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>// MÓDULO 02: DOMÓTICA & VOZ</span>
              </a>

              <a
                href="#/glosario"
                className="px-4 py-3 bg-slate-900/80 hover:bg-slate-800 text-teal-300 text-xs sm:text-sm font-bold font-mono rounded-2xl border border-teal-500/30 flex items-center gap-1.5 transition"
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>GLOSARIO IA</span>
              </a>
            </div>
          </div>

          {/* Quick Cyber Metrics Bar */}
          <div className="pt-8 mt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono relative z-10">
            <div>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">12</span>
              <p className="text-slate-400 text-[11px]">Prácticas Guiadas</p>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-cyan-400">02</span>
              <p className="text-slate-400 text-[11px]">Módulos de IA</p>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-teal-400">20+</span>
              <p className="text-slate-400 text-[11px]">Conceptos Técnicos</p>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-amber-400">100%</span>
              <p className="text-slate-400 text-[11px]">Procesamiento Local</p>
            </div>
          </div>
        </div>

        {/* Bento Tile 2: Cyber Student Terminal Console (Span 4) */}
        <div className="lg:col-span-4 p-7 sm:p-8 rounded-3xl bg-slate-950 border border-emerald-500/30 shadow-[0_0_30px_rgba(0,0,0,0.7)] flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" /> // PROGRESO DEL SISTEMA
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 text-emerald-300 text-[11px] font-mono border border-emerald-500/30">
                {overallProgressPercent}%
              </span>
            </div>

            <div>
              <div className="text-3xl font-black text-white font-mono">
                {completedPracticeIds.length} <span className="text-slate-500 text-base font-normal">/ {totalPractices} módulos</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                {completedPracticeIds.length === 0
                  ? 'Inicializa la Práctica 1 para desbloquear tu primera insignia.'
                  : `¡Excelente rendimiento! Has completado ${completedPracticeIds.length} prácticas.`}
              </p>
            </div>

            {/* Matrix Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-emerald-500/30">
                <div
                  style={{ width: `${overallProgressPercent}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
              </div>
            </div>

            {/* Badges Earned Summary */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> INSIGNIAS GANADAS
                </span>
                <span className="font-bold text-amber-400">{progress.badgesEarned.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {progress.badgesEarned.length > 0 ? (
                  progress.badgesEarned.slice(0, 3).map((badge, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      🏆 {badge}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-500 font-mono italic">// Completa retos para desbloquear logros.</span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-slate-800/80 space-y-2">
            <button
              onClick={onOpenColorTable}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 rounded-xl text-xs font-mono flex items-center justify-between transition"
            >
              <span className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-amber-400" /> TABLA DE COLORES DE BLOQUES
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      </section>

      {/* TWO MAIN MODULES / COURSES BENTO SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-2">
              <span className="text-emerald-400">//</span> MÓDULOS DE APRENDIZAJE Y ENTRENAMIENTO
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Rutas interactivas de Inteligencia Artificial para el desarrollo de software y algoritmos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COURSES_DATA.map(course => {
            const isModule1 = course.id === 'aprende-ia-jugando';
            const coursePractices = ALL_PRACTICES.filter(p => p.courseId === course.id);
            const completedInCourse = coursePractices.filter(p => completedPracticeIds.includes(p.id)).length;
            const progressPercent = Math.round((completedInCourse / coursePractices.length) * 100);

            return (
              <div
                key={course.id}
                id={`course-card-${course.id}`}
                className={`p-8 rounded-3xl cyber-card flex flex-col justify-between space-y-6 group transition ${
                  isModule1 ? 'hover:border-emerald-500/50' : 'hover:border-cyan-500/50'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-3 py-1 text-xs font-bold font-mono rounded-full ${
                      isModule1
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                        : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/40'
                    }`}>
                      {course.edition} • {coursePractices.length} Prácticas
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      STATUS: ONLINE
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-400 transition font-sans">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {course.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {course.description}
                  </p>

                  {/* Key points */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono block">
                      // COMPETENCIAS DEL MÓDULO:
                    </span>
                    {course.summaryPoints.slice(0, 4).map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className={isModule1 ? 'text-emerald-400 font-bold' : 'text-cyan-400 font-bold'}>›</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bar and CTA */}
                <div className="space-y-4 pt-4 border-t border-slate-800/80">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Progreso del módulo:</span>
                      <span className="text-emerald-400 font-bold">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        style={{ width: `${progressPercent}%` }}
                        className={`h-full transition-all duration-500 ${
                          isModule1 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                        }`}
                      />
                    </div>
                  </div>

                  <a
                    href={`#/curso/${course.id}`}
                    className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-bold font-mono flex items-center justify-center gap-2 shadow-sm transition ${
                      isModule1
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                    }`}
                  >
                    <span>INGRESAR AL MÓDULO</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE GLOSSARY MATRIX BENTO SECTION */}
      <section className="p-8 sm:p-10 rounded-3xl cyber-card space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-500/30 text-teal-400 text-xs font-mono">
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>TERMINAL DE CONCEPTOS // TOOLTIPS ACTIVOS</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Glosario Técnico de Inteligencia Artificial & PictoBlox
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Pasa el cursor o haz clic en cualquier término para ver su definición técnica, ejemplos y escuchar la síntesis de voz.
            </p>
          </div>

          <a
            href="#/glosario"
            className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold font-mono rounded-2xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(20,184,166,0.25)] transition shrink-0"
          >
            <span>VER GLOSARIO COMPLETO</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Featured terms cloud */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {featuredTerms.map(term => (
            <div
              key={term}
              className="p-2.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition"
            >
              <GlossaryTooltip term={term} showIcon={true} />
            </div>
          ))}
        </div>
      </section>

      {/* ALL 12 PRACTICES CYBER DIRECTORY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-2">
              <span className="text-emerald-400">//</span> CATÁLOGO DE PRÁCTICAS Y LABORATORIOS
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Selecciona cualquiera de los 12 módulos de código interactivo para ejecutar en PictoBlox
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_PRACTICES.map(practice => {
            const isCompleted = completedPracticeIds.includes(practice.id);
            const isModule1 = practice.courseId === 'aprende-ia-jugando';

            return (
              <a
                key={practice.id}
                id={`practice-card-${practice.id}`}
                href={`#/practica/${practice.id}`}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-emerald-500/40 shadow-xs hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col justify-between space-y-3 group transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      isModule1
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {practice.practiceNumber}
                    </span>
                    {isCompleted ? (
                      <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> [COMPLETADO]
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono">
                        {practice.estimatedDurationMinutes} min
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition line-clamp-1">
                    {practice.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {practice.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] font-mono">
                  <span className="text-slate-500">
                    {practice.steps.length} PASOS // {isModule1 ? 'MÓDULO 01' : 'MÓDULO 02'}
                  </span>
                  <span className="text-emerald-400 font-bold group-hover:translate-x-0.5 transition flex items-center gap-1">
                    ABRIR <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* STUDENT BADGES MATRIX SHOWCASE */}
      {progress.badgesEarned.length > 0 && (
        <section className="p-6 sm:p-8 rounded-3xl cyber-card space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white font-mono">
                // MATRIZ DE INSIGNIAS Y LOGROS DESBLOQUEADOS
              </h2>
              <p className="text-xs text-slate-400">
                Has desbloqueado {progress.badgesEarned.length} certificaciones de laboratorio
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {progress.badgesEarned.map((badge, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold flex items-center gap-2 shadow-xs"
              >
                <span>🏆</span>
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
