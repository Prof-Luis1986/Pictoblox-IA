import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Maximize2, Sparkles, HelpCircle, CheckCircle, Info } from 'lucide-react';
import { BlockImageViewerModal } from './BlockImageViewerModal';
import scratchblocks from 'scratchblocks/browser.es.js';
import spanishScratchblocks from 'scratchblocks/locales/es.json';

scratchblocks.loadLanguages({ es: spanishScratchblocks });

interface BlockDiagramProps {
  stepNumber: number;
  title: string;
  imageSrc?: string;
  snippets?: string[];
  blockExplanation?: {
    event: string;
    action: string;
    condition?: string;
    aiData?: string;
    spriteTarget?: string;
    successResult: string;
    failureResult?: string;
  };
  tip?: string;
}

export const BlockDiagram: React.FC<BlockDiagramProps> = ({
  stepNumber,
  title,
  imageSrc,
  snippets = [],
  blockExplanation,
  tip
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const scratchBlocksRef = useRef<HTMLPreElement>(null);

  // If there are no blocks, images, or block explanation, don't render anything
  const hasBlocks = (imageSrc && imageSrc.trim() !== '') || snippets.length > 0 || !!blockExplanation;
  if (!hasBlocks) {
    return null;
  }

  const scratchSource = useMemo(() => snippets.map(line => {
    const text = line.trim().replace(/^al hacer clic en bandera verde$/i, 'al hacer clic en @greenFlag');
    if (/^(al hacer clic|al presionar|al recibir|al comenzar)/i.test(text)) return text;
    if (/^(ir a x|apuntar|mover|sumar a x)/i.test(text)) return text;
    if (/^(decir con voz|fijar idioma|asignar voz|encender video|apagar video|mostrar cuadro|analizar imagen|emparejar cara|iniciar escucha|limpiar resultado)/i.test(text)) return `${text} :: extension`;
    if (/^(decir|cambiar disfraz|cambiar fondo|fijar tamaño|mostrar|esconder|siguiente fondo)/i.test(text)) return text;
    if (/^(por siempre|repetir|si |si no|esperar|crear clon|eliminar este clon|detener|fin$)/i.test(text)) return text;
    if (/^enviar /i.test(text)) return `${text} :: events`;
    if (/(score|speed)|^(dar a|sumar a)/i.test(text)) return `${text} :: variables`;
    if (/(aleatorio|>|<|está en|¿tocando)/i.test(text)) return `${text} :: operators`;
    return `${text} :: extension`;
  }).join('\n'), [snippets]);

  useEffect(() => {
    const element = scratchBlocksRef.current;
    if (!element || !scratchSource) return;
    element.textContent = scratchSource;
    scratchblocks.renderMatching(`#${element.id}`, {
      style: 'scratch3',
      languages: ['es', 'en'],
      scale: 0.9
    });
  }, [scratchSource, stepNumber]);

  const renderedBlocks = (
    <div className="flex flex-col items-start py-3 text-sm drop-shadow-[0_5px_5px_rgba(0,0,0,.35)]">
      {snippets.length > 0 ? (
        <pre
          id={`scratchblocks-step-${stepNumber}`}
          ref={scratchBlocksRef}
          className="block-sequence-source whitespace-pre-wrap"
          aria-label={`Secuencia de bloques del paso ${stepNumber}`}
        />
      ) : (
        <div className="p-4 text-center text-slate-500 text-sm italic font-mono">
          Esta acción no agrega bloques nuevos. Sigue las instrucciones de interfaz de este paso.
        </div>
      )}
    </div>
  );

  return (
    <div id={`block-diagram-step-${stepNumber}`} className="my-4 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-850 font-mono">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-mono">
            {stepNumber}
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-200">
            {imageSrc ? 'GUÍA VISUAL DEL PASO' : 'ASÍ DEBE QUEDAR EN PICTOBLOX'}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {blockExplanation && (
            <button
              id={`btn-explain-step-${stepNumber}`}
              onClick={() => setShowExplanation(!showExplanation)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition ${
                showExplanation
                  ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40'
                  : 'bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800'
              }`}
              title="Ver explicación técnica de cada bloque"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">¿Qué hace este bloque?</span>
            </button>
          )}

          <button
            id={`btn-expand-step-${stepNumber}`}
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.25)] transition"
            title="Ampliar bloques a pantalla completa con zoom"
            aria-label="Ampliar bloques"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>AMPLIAR</span>
          </button>
        </div>
      </div>

      {/* Block preview area */}
      <div className="p-5 sm:p-7 bg-[radial-gradient(circle_at_1px_1px,#334155_1px,transparent_0)] bg-[size:20px_20px] text-slate-100 overflow-x-auto rounded-b-xl m-2 border border-slate-800">
        {imageSrc ? (
          <div className="flex flex-col items-center">
            <img
              src={imageSrc}
              alt={`Bloques de PictoBlox para ${title}`}
              className="w-full max-w-4xl object-contain rounded-lg border border-slate-700 shadow-sm bg-white"
            />
            <p className="mt-3 text-center text-xs text-slate-400 font-sans">
              Pulsa <strong className="text-slate-200">AMPLIAR</strong> para observar los bloques y controles con mayor detalle.
            </p>
          </div>
        ) : (
          <div className="py-2">
            <p className="mb-4 text-xs font-mono font-bold uppercase tracking-wide text-cyan-300">Secuencia de bloques conectados</p>
            {renderedBlocks}
          </div>
        )}
      </div>

      {/* Accordion / Block explanation section */}
      {showExplanation && blockExplanation && (
        <div className="px-5 py-4 bg-slate-900/90 border-t border-slate-800 text-xs sm:text-sm text-slate-300 space-y-3 animate-fade-in font-sans">
          <div className="font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-4 h-4 text-emerald-400" /> // ANÁLISIS DEL FLUJO DE DATOS:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-amber-400 block text-xs">🔔 EVENTO DISPARADOR:</span>
              <span className="text-slate-300 text-xs font-sans">{blockExplanation.event}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-cyan-400 block text-xs">⚡ ACCIÓN EJECUTADA:</span>
              <span className="text-slate-300 text-xs font-sans">{blockExplanation.action}</span>
            </div>

            {blockExplanation.condition && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400 block text-xs">❓ CONDICIÓN LÓGICA:</span>
                <span className="text-slate-300 text-xs font-sans">{blockExplanation.condition}</span>
              </div>
            )}

            {blockExplanation.aiData && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-teal-400 block text-xs">🧠 DATOS DE LA IA:</span>
                <span className="text-slate-300 text-xs font-sans">{blockExplanation.aiData}</span>
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-400 text-xs font-mono">// RESULTADO ESPERADO: </span>
              <span className="text-emerald-200 text-xs">{blockExplanation.successResult}</span>
              {blockExplanation.failureResult && (
                <div className="mt-1 text-slate-400 text-xs">
                  <span className="font-medium text-slate-300 font-mono">En caso contrario: </span>
                  {blockExplanation.failureResult}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Optional Tip Footer */}
      {tip && (
        <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-850 text-xs text-slate-400 flex items-center gap-2 font-mono">
          <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>// TIP: {tip}</span>
        </div>
      )}

      {/* High Resolution Pan/Zoom Modal */}
      <BlockImageViewerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Bloques Paso ${stepNumber}: ${title}`}
        imageSrc={imageSrc}
        altText={`Bloques de PictoBlox para ${title}`}
        caption="Usa los controles o arrastra para desplazarte por los bloques lógicos."
        blockCodeNodes={renderedBlocks}
      />
    </div>
  );
};
