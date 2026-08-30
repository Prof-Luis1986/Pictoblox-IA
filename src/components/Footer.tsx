import React from 'react';
import { Terminal, ShieldCheck, ExternalLink, BookOpen, Layers, Cpu, Palette, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenColorTable: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenColorTable }) => {
  return (
    <footer id="app-footer" className="w-full bg-slate-950 text-slate-400 text-xs mt-16 border-t border-emerald-500/20 relative overflow-hidden">
      {/* Matrix top glowing line accent */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Cyber Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-sm font-black text-white font-mono tracking-wider">
                PICTOBLOX<span className="text-emerald-400 glow-emerald-text">::IA</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Entorno interactivo para el aprendizaje práctico de Inteligencia Artificial, Visión Computacional, Reconocimiento de Voz y Redes Neuronales mediante programación en bloques.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/50 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>TERMINAL STATUS: READY</span>
            </div>
          </div>

          {/* Col 2: Modules Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              // MÓDULOS DE APRENDIZAJE
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <a href="#/curso/aprende-ia-jugando" className="hover:text-emerald-300 text-slate-300 transition flex items-center gap-1.5">
                  <span className="text-emerald-500 font-mono">01.</span>
                  <span>Visión Artificial y Videojuegos</span>
                </a>
              </li>
              <li>
                <a href="#/curso/ia-casas-inteligentes" className="hover:text-cyan-300 text-slate-300 transition flex items-center gap-1.5">
                  <span className="text-cyan-500 font-mono">02.</span>
                  <span>Domótica y Redes Neuronales</span>
                </a>
              </li>
              <li>
                <a href="#/glosario" className="hover:text-teal-300 text-slate-300 transition flex items-center gap-1.5">
                  <span className="text-teal-500 font-mono">03.</span>
                  <span>Glosario Técnico de IA</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Cyber Tools */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              // HERRAMIENTAS Y ENLACES
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button onClick={onOpenColorTable} className="hover:text-amber-400 text-slate-300 text-left transition flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tabla de Colores de Bloques</span>
                </button>
              </li>
              <li>
                <a
                  href="https://thestempedia.com/product/pictoblox/download-pictoblox/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-slate-300 flex items-center gap-1.5 transition"
                >
                  <span>Descargar PictoBlox IDE</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pictoblox.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-slate-300 flex items-center gap-1.5 transition"
                >
                  <span>PictoBlox Web Editor</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Privacy & Client Security */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> // SEGURIDAD Y PRIVACIDAD
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              El procesamiento de cámara y micrófono se ejecuta de forma 100% local en el navegador del usuario para los experimentos y simulaciones interactivas.
            </p>
          </div>
        </div>

        {/* Copyright & Terminal Status */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>© 2026 PICTOBLOX IA // PLATAFORMA EDUCATIVA STEAM</p>
          <p className="flex items-center gap-1.5 text-emerald-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>ARQUITECTURA CIBERNÉTICA DE ENSEÑANZA</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
