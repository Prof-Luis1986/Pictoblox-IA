import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2, Move, Terminal } from 'lucide-react';

interface BlockImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageSrc?: string;
  altText: string;
  caption?: string;
  blockCodeNodes?: React.ReactNode;
}

export const BlockImageViewerModal: React.FC<BlockImageViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  imageSrc,
  altText,
  caption,
  blockCodeNodes
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      resetZoom();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div
      id="block-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in text-slate-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="block-modal-title"
      onClick={onClose}
    >
      <div
        id="block-modal-container"
        className="relative flex flex-col w-full max-w-5xl h-[85vh] bg-slate-950 border border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-850 bg-slate-900 font-mono">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-500/40">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 id="block-modal-title" className="text-sm sm:text-base font-black text-white">
                // {title}
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Visor interactivo en alta resolución • Arrastra para desplazarte o ajusta el zoom
              </p>
            </div>
          </div>

          <button
            id="btn-close-modal"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 rounded-2xl transition"
            aria-label="Cerrar visor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport with Pan and Zoom */}
        <div
          ref={containerRef}
          className="relative flex-1 overflow-hidden bg-slate-950 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Matrix grid background */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
            className="flex flex-col items-center justify-center p-6"
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={altText}
                className="max-h-[60vh] max-w-[80vw] object-contain rounded-2xl shadow-2xl border border-emerald-500/30"
                draggable={false}
              />
            ) : blockCodeNodes ? (
              <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl">
                {blockCodeNodes}
              </div>
            ) : null}
          </div>

          {/* Floating Controls Toolbar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 bg-slate-900/90 border border-emerald-500/30 rounded-full shadow-2xl backdrop-blur font-mono">
            <button
              id="btn-zoom-in"
              onClick={zoomIn}
              className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-full transition"
              title="Acercar (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-emerald-400 px-2 min-w-[3.5rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              id="btn-zoom-out"
              onClick={zoomOut}
              className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-full transition"
              title="Alejar (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-slate-700 mx-1" />
            <button
              id="btn-reset-zoom"
              onClick={resetZoom}
              className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-full transition"
              title="Restablecer zoom (0)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Caption */}
        {caption && (
          <div className="px-6 py-3 border-t border-slate-850 bg-slate-900 text-xs text-slate-400 flex items-center justify-between font-sans">
            <span className="font-medium text-slate-300">{caption}</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1 text-[11px]">
              <Move className="w-3 h-3 text-emerald-400" /> ARRASTRAR PARA NAVEGAR
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
