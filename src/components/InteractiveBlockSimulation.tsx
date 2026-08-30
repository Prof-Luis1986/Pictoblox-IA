import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Video, Mic, Volume2, Sparkles, Check, AlertCircle, ShieldCheck, ShieldAlert, Award, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveBlockSimulationProps {
  type: 'pattern' | 'face_detect' | 'mouse_cat' | 'flappy' | 'space_battle' | 'face_train_door' | 'voice_light';
  onCompleted?: () => void;
}

export const InteractiveBlockSimulation: React.FC<InteractiveBlockSimulationProps> = ({
  type,
  onCompleted
}) => {
  return (
    <div className="my-6 rounded-3xl cyber-card overflow-hidden text-slate-200">
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 font-mono">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              // SIMULADOR DE ENTORNO VIRTUAL
            </h4>
            <p className="text-xs text-slate-400 font-sans">
              Laboratorio de ejecución directa en el navegador para testear la lógica del algoritmo
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {type === 'pattern' && <PatternSimulator onCompleted={onCompleted} />}
        {type === 'face_detect' && <FaceDetectSimulator onCompleted={onCompleted} />}
        {type === 'mouse_cat' && <MouseCatSimulator onCompleted={onCompleted} />}
        {type === 'flappy' && <FlappySimulator onCompleted={onCompleted} />}
        {type === 'space_battle' && <SpaceBattleSimulator onCompleted={onCompleted} />}
        {type === 'face_train_door' && <FaceTrainDoorSimulator onCompleted={onCompleted} />}
        {type === 'voice_light' && <VoiceLightSimulator onCompleted={onCompleted} />}
      </div>
    </div>
  );
};

/* 1. Pattern Simulator - 100% Digital Drag & Drop and Click-to-Place */
type PatternShape = 'square' | 'triangle' | 'circle' | 'star';

interface PieceInfo {
  id: PatternShape;
  label: string;
  symbol: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  shapeStyle: string;
}

const PIECES: PieceInfo[] = [
  {
    id: 'triangle',
    label: 'Triángulo Azul',
    symbol: '▲',
    bgClass: 'bg-cyan-600',
    borderClass: 'border-cyan-400',
    textClass: 'text-white',
    shapeStyle: 'clip-triangle'
  },
  {
    id: 'circle',
    label: 'Círculo Amarillo',
    symbol: '●',
    bgClass: 'bg-amber-400',
    borderClass: 'border-amber-300',
    textClass: 'text-slate-950 font-black',
    shapeStyle: 'rounded-full'
  },
  {
    id: 'square',
    label: 'Cuadrado Rojo',
    symbol: '■',
    bgClass: 'bg-red-600',
    borderClass: 'border-red-400',
    textClass: 'text-white',
    shapeStyle: 'rounded-xl'
  },
  {
    id: 'star',
    label: 'Estrella Verde',
    symbol: '★',
    bgClass: 'bg-emerald-600',
    borderClass: 'border-emerald-400',
    textClass: 'text-white',
    shapeStyle: 'rounded-xl'
  }
];

interface PatternRow {
  sequence: PatternShape[];
  slotIndex: number;
  answer: PatternShape;
}

const shuffled = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
};

const createPatternRows = (): PatternRow[] => {
  const shapes = shuffled(PIECES.map(piece => piece.id));
  const slotPositions = shuffled([0, 1, 2, 3, 4]);

  return shapes.map((firstShape, rowIndex) => {
    const secondShape = shapes[(rowIndex + 1) % shapes.length];
    const startsWithFirst = Math.random() >= 0.5;
    const sequence = Array.from({ length: 5 }, (_, position) => {
      const useFirst = position % 2 === 0 ? startsWithFirst : !startsWithFirst;
      return useFirst ? firstShape : secondShape;
    });
    const slotIndex = slotPositions[rowIndex];
    return { sequence, slotIndex, answer: sequence[slotIndex] };
  });
};

const PatternSimulator: React.FC<{ onCompleted?: () => void }> = ({ onCompleted }) => {
  const [patternRows, setPatternRows] = useState<PatternRow[]>(createPatternRows);
  const [answers, setAnswers] = useState<Array<PatternShape | null>>(() => Array(4).fill(null));
  const [selectedPiece, setSelectedPiece] = useState<PatternShape | null>(null);
  const [draggedPiece, setDraggedPiece] = useState<PatternShape | null>(null);

  const isSolved = patternRows.every((row, index) => answers[index] === row.answer);

  useEffect(() => {
    if (isSolved && onCompleted) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      onCompleted();
    }
  }, [isSolved]);

  const reset = () => {
    setPatternRows(createPatternRows());
    setAnswers(Array(4).fill(null));
    setSelectedPiece(null);
    setDraggedPiece(null);
  };

  const setRowAnswer = (rowIndex: number): React.Dispatch<React.SetStateAction<PatternShape | null>> => value => {
    setAnswers(current => {
      const updated = [...current];
      updated[rowIndex] = typeof value === 'function' ? value(current[rowIndex]) : value;
      return updated;
    });
  };

  const handlePlaceInSlot = (slotSetter: React.Dispatch<React.SetStateAction<PatternShape | null>>, currentValue: PatternShape | null) => {
    if (selectedPiece) {
      slotSetter(selectedPiece);
    } else if (currentValue) {
      slotSetter(null);
    }
  };

  const handleDropInSlot = (e: React.DragEvent, slotSetter: React.Dispatch<React.SetStateAction<PatternShape | null>>) => {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData('text/plain') as PatternShape;
    if (pieceId) {
      slotSetter(pieceId);
    } else if (draggedPiece) {
      slotSetter(draggedPiece);
    }
    setDraggedPiece(null);
  };

  const renderShapeCell = (type: PatternShape, index?: number) => {
    const piece = PIECES.find(p => p.id === type)!;
    return (
      <div
        key={index}
        className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl shadow-md select-none transition-transform ${piece.bgClass} ${piece.textClass} ${piece.shapeStyle}`}
      >
        {piece.symbol}
      </div>
    );
  };

  const renderSlotCell = (
    value: PatternShape | null,
    isCorrect: boolean,
    slotSetter: React.Dispatch<React.SetStateAction<PatternShape | null>>,
    rowLabel: string,
    cellKey?: React.Key
  ) => {
    const placedPiece = value ? PIECES.find(p => p.id === value) : null;

    return (
      <div
        key={cellKey}
        onDragOver={e => e.preventDefault()}
        onDrop={e => handleDropInSlot(e, slotSetter)}
        onClick={() => handlePlaceInSlot(slotSetter, value)}
        className={`w-12 h-12 sm:w-14 sm:h-14 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 relative group select-none ${
          placedPiece
            ? isCorrect
              ? `${placedPiece.bgClass} ${placedPiece.textClass} border-emerald-400 ring-2 ring-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.4)]`
              : `${placedPiece.bgClass} ${placedPiece.textClass} border-amber-400 ring-2 ring-amber-500/30`
            : selectedPiece
            ? 'border-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 animate-pulse text-emerald-300 text-sm font-mono'
            : 'border-slate-700 hover:border-slate-500 bg-slate-900/80 text-slate-500'
        }`}
        title={placedPiece ? `Hacer clic para retirar (${placedPiece.label})` : `Colocar pieza seleccionada o arrastrar aquí en ${rowLabel}`}
      >
        {placedPiece ? (
          <span className="text-xl sm:text-2xl">{placedPiece.symbol}</span>
        ) : (
          <span className="text-sm sm:text-base font-bold font-mono">?</span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Introduction banner */}
      <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h5 className="text-sm font-bold text-white font-sans flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Tablero Digital de Patrones Geométricos</span>
          </h5>
          <p className="text-xs text-slate-400 font-sans">
            Arrastra las figuras o haz clic en una pieza y luego en la casilla con el signo <strong className="text-emerald-400">?</strong>
          </p>
        </div>

        <button
          onClick={reset}
          className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" /> REINICIAR TABLERO
        </button>
      </div>

      {/* Main randomized 4x5 Pattern Grid */}
      <div className="bg-slate-950 p-5 sm:p-7 rounded-3xl border border-slate-800/90 shadow-inner space-y-4">
        {patternRows.map((row, rowIndex) => {
          const isCorrect = answers[rowIndex] === row.answer;
          return (
            <div key={`${row.sequence.join('-')}-${row.slotIndex}-${rowIndex}`} className="flex items-center justify-between gap-2 sm:gap-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-850 flex-wrap sm:flex-nowrap">
              <span className="text-xs font-bold text-slate-400 w-16 sm:w-20 shrink-0">// FILA {rowIndex + 1}:</span>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {row.sequence.map((shape, position) => position === row.slotIndex
                  ? renderSlotCell(answers[rowIndex], isCorrect, setRowAnswer(rowIndex), `Fila ${rowIndex + 1}`, position)
                  : renderShapeCell(shape, position))}
              </div>
              <div className="text-right shrink-0 w-24">
                {isCorrect ? (
                  <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 text-[11px] font-bold border border-emerald-500/40">✓ CORRECTO</span>
                ) : answers[rowIndex] ? (
                  <span className="px-2 py-1 rounded bg-amber-950 text-amber-400 text-[11px] font-bold border border-amber-500/40">REVISAR</span>
                ) : (
                  <span className="text-[11px] text-slate-600">VACÍO</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Piece Palette - Cutout pieces for Dragging / Selecting */}
      <div className="p-5 sm:p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            // BANDEJA DE PIEZAS (ARRASTRA O HAZ CLIC PARA SELECCIONAR):
          </span>
          {selectedPiece && (
            <button
              onClick={() => setSelectedPiece(null)}
              className="text-xs text-amber-400 hover:underline font-mono"
            >
              [Deseleccionar]
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {PIECES.map(piece => {
            const isSelected = selectedPiece === piece.id;

            return (
              <div
                key={piece.id}
                draggable
                onDragStart={e => {
                  e.dataTransfer.setData('text/plain', piece.id);
                  setDraggedPiece(piece.id);
                }}
                onClick={() => setSelectedPiece(isSelected ? null : piece.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition-all ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-950/60 ring-2 ring-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105'
                    : 'border-slate-700 hover:border-emerald-500/60 bg-slate-900 hover:bg-slate-850'
                }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center text-2xl shadow ${piece.bgClass} ${piece.textClass} ${piece.shapeStyle}`}>
                  {piece.symbol}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-300 text-center font-sans">
                  {piece.label}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {isSelected ? '✓ SELECCIONADA' : 'Arrastrar / Tocar'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success banner */}
      {isSolved && (
        <div className="p-5 rounded-3xl bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs sm:text-sm space-y-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-fade-in font-sans">
          <div className="flex items-center gap-2.5 font-bold text-emerald-300 text-base font-mono">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>¡EXCELENTE! TODOS LOS PATRONES HAN SIDO DETECTADOS</span>
          </div>
          <p className="leading-relaxed text-slate-300">
            Has completado las 4 secuencias de patrones lógicos. Así es exactamente como los modelos de Inteligencia Artificial observan datos repetitivos para predecir y tomar decisiones automáticas.
          </p>
        </div>
      )}
    </div>
  );
};

/* 2. Face Detection Simulator */
const FaceDetectSimulator: React.FC<{ onCompleted?: () => void }> = ({ onCompleted }) => {
  const [faceDetected, setFaceDetected] = useState(true);
  const [boxPosition] = useState({ x: 50, y: 40 });
  const [nikoMessage, setNikoMessage] = useState('Detecté un rostro frente a la cámara. ¡Hola, operador!');
  const [speaking, setSpeaking] = useState(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const togglePresence = (present: boolean) => {
    setFaceDetected(present);
    if (present) {
      const msg = 'Detecté un rostro frente a la cámara. ¡Hola, operador!';
      setNikoMessage(msg);
      speakText(msg);
      if (onCompleted) onCompleted();
    } else {
      const msg = 'No veo ningún rostro. ¿Te escondiste o sigo esperando?';
      setNikoMessage(msg);
      speakText(msg);
    }
  };

  return (
    <div className="space-y-4 font-mono">
      <div className="relative w-full h-72 sm:h-80 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-slate-950 opacity-90" />
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-slate-900/90 rounded-full border border-slate-700 text-xs text-slate-300">
          <Video className="w-3.5 h-3.5 text-emerald-400" />
          <span>CÁMARA VIRTUAL // TRANSPARENCIA 30%</span>
        </div>

        {/* Video feed illustration */}
        {faceDetected ? (
          <div
            style={{ left: `${boxPosition.x}%`, top: `${boxPosition.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-40 border-2 border-emerald-400 rounded-xl bg-emerald-500/10 flex flex-col items-center justify-between p-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300"
          >
            <span className="text-[10px] bg-emerald-600 text-slate-950 font-bold px-1.5 py-0.5 rounded self-start">
              Face #1 (x:{boxPosition.x * 2 - 100}, y:{100 - boxPosition.y * 2})
            </span>
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow" title="Nose Landmark" />
            <span className="text-[9px] text-emerald-300">100% CONFIDENCE</span>
          </div>
        ) : (
          <div className="text-slate-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" /> Ningún rostro detectado en el encuadre (caras = 0)
          </div>
        )}

        {/* Avatar with speech bubble */}
        <div className="absolute bottom-3 left-4 flex items-end gap-3">
          <div className="w-16 h-20 bg-slate-900 border-2 border-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl">
            🤖
          </div>
          <div className="bg-slate-900/95 border border-slate-700 text-slate-200 text-xs p-3 rounded-2xl max-w-xs shadow-xl relative font-sans">
            <p className="font-medium">{nikoMessage}</p>
            {speaking && <span className="text-[10px] text-emerald-400 font-mono block mt-1">🔊 Sintetizando audio...</span>}
          </div>
        </div>
      </div>

      {/* Simulator Interactive Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => togglePresence(true)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              faceDetected ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            👤 APARECER EN CÁMARA
          </button>
          <button
            onClick={() => togglePresence(false)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
              !faceDetected ? 'bg-rose-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            🙈 ESCONDERSE
          </button>
        </div>

        <button
          onClick={() => speakText(nikoMessage)}
          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5"
        >
          <Volume2 className="w-3.5 h-3.5" /> ESCUCHAR SÍNTESIS
        </button>
      </div>
    </div>
  );
};

/* 3. Mouse & Cat Simulator */
const MouseCatSimulator: React.FC<{ onCompleted?: () => void }> = ({ onCompleted }) => {
  const [mouseY, setMouseY] = useState(150);
  const [cats, setCats] = useState([
    { id: 1, x: 450, y: 80, speed: -4 },
    { id: 2, x: 600, y: 160, speed: -5 },
    { id: 3, x: 750, y: 220, speed: -4.5 }
  ]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const animRef = useRef<number | null>(null);

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setCats([
      { id: 1, x: 450, y: 80, speed: -4 },
      { id: 2, x: 600, y: 160, speed: -5 },
      { id: 3, x: 750, y: 220, speed: -4.5 }
    ]);
  };

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const loop = () => {
      setCats(prev =>
        prev.map(cat => {
          let nextX = cat.x + cat.speed;
          let nextY = cat.y;

          if (nextX < 20) {
            setScore(s => s + 1);
            nextX = 480;
            nextY = Math.floor(Math.random() * 200) + 50;
          }

          const dist = Math.hypot(nextX - 60, nextY - mouseY);
          if (dist < 32) {
            setIsGameOver(true);
            setIsPlaying(false);
          }

          return { ...cat, x: nextX, y: nextY };
        })
      );

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, isGameOver, mouseY]);

  useEffect(() => {
    if (score >= 5 && onCompleted) onCompleted();
  }, [score]);

  return (
    <div className="space-y-3 font-mono">
      <div
        className="relative w-full h-72 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 select-none cursor-ns-resize"
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const y = e.clientY - rect.top;
          setMouseY(Math.max(30, Math.min(250, y)));
        }}
        onTouchMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const y = e.touches[0].clientY - rect.top;
          setMouseY(Math.max(30, Math.min(250, y)));
        }}
      >
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg shadow">
            SCORE: {score}
          </span>
          <span className="px-2.5 py-1 bg-slate-900 text-slate-400 text-xs rounded-lg border border-slate-800">
            SPEED: -15
          </span>
        </div>

        {/* Ratón */}
        <div
          style={{ top: `${mouseY}px`, left: '60px' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 border-2 border-emerald-400 rounded-full flex items-center justify-center text-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-transform"
        >
          🐭
        </div>

        {/* Gatos */}
        {isPlaying &&
          cats.map(cat => (
            <div
              key={cat.id}
              style={{ top: `${cat.y}px`, left: `${cat.x}px` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-amber-950 border-2 border-amber-400 rounded-full flex items-center justify-center text-xl shadow-lg"
            >
              🐱
            </div>
          ))}

        {/* Game Over */}
        {isGameOver && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-2">
            <h3 className="text-2xl font-black text-rose-400 tracking-wider font-mono">GAME OVER</h3>
            <p className="text-xs text-slate-300 font-sans">¡Un obstáculo te interceptó! Score: {score}</p>
            <button
              onClick={startGame}
              className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold shadow"
            >
              REINTENTAR SIMULACIÓN
            </button>
          </div>
        )}

        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white space-y-3">
            <p className="text-xs text-slate-300 text-center max-w-xs font-sans">
              Mueve el cursor arriba y abajo para controlar la posición simulando el seguimiento de nariz en PictoBlox.
            </p>
            <button
              onClick={startGame}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow flex items-center gap-2"
            >
              <Play className="w-4 h-4" /> INICIAR JUEGO
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Control: Mueve el cursor para esquivar los obstáculos.</span>
        <span>Meta: 5 puntos</span>
      </div>
    </div>
  );
};

/* 4. Flappy Bird Simulator */
const FlappySimulator: React.FC<{ onCompleted?: () => void }> = ({ onCompleted }) => {
  const [birdPos, setBirdPos] = useState({ x: 80, y: 140 });
  const [pipes, setPipes] = useState([{ id: 1, x: 450, gapY: 130 }]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const frameRef = useRef<number | null>(null);

  const start = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setBirdPos({ x: 80, y: 140 });
    setPipes([{ id: 1, x: 450, gapY: 130 }]);
  };

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const run = () => {
      setPipes(prev =>
        prev.map(p => {
          let nx = p.x - 3.5;
          let ny = p.gapY;
          if (nx < 10) {
            setScore(s => s + 10);
            nx = 480;
            ny = Math.floor(Math.random() * 120) + 80;
          }

          if (Math.abs(nx - birdPos.x) < 25) {
            if (birdPos.y < ny - 45 || birdPos.y > ny + 45) {
              setIsGameOver(true);
              setIsPlaying(false);
            }
          }
          return { ...p, x: nx, gapY: ny };
        })
      );

      frameRef.current = requestAnimationFrame(run);
    };

    frameRef.current = requestAnimationFrame(run);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, isGameOver, birdPos]);

  useEffect(() => {
    if (score >= 30 && onCompleted) onCompleted();
  }, [score]);

  return (
    <div className="space-y-3 font-mono">
      <div
        className="relative w-full h-72 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 select-none cursor-move"
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = Math.max(30, Math.min(220, e.clientX - rect.left));
          const y = Math.max(20, Math.min(260, e.clientY - rect.top));
          setBirdPos({ x, y });
        }}
      >
        <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg shadow">
          SCORE: {score}
        </div>

        {/* Bird */}
        <div
          style={{ left: `${birdPos.x}px`, top: `${birdPos.y}px` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-400 border-2 border-amber-300 rounded-full flex items-center justify-center text-lg shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        >
          🐥
        </div>

        {/* Pipes */}
        {isPlaying &&
          pipes.map(p => (
            <React.Fragment key={p.id}>
              <div
                style={{ left: `${p.x}px`, top: 0, height: `${p.gapY - 45}px` }}
                className="absolute w-12 bg-emerald-700 border-2 border-emerald-500 rounded-b-xl shadow"
              />
              <div
                style={{ left: `${p.x}px`, top: `${p.gapY + 45}px`, bottom: 0 }}
                className="absolute w-12 bg-emerald-700 border-2 border-emerald-500 rounded-t-xl shadow"
              />
            </React.Fragment>
          ))}

        {isGameOver && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-2">
            <h3 className="text-2xl font-black text-amber-400 font-mono">GAME OVER</h3>
            <p className="text-xs text-slate-300 font-sans">Score: {score}</p>
            <button onClick={start} className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold shadow">
              JUGAR DE NUEVO
            </button>
          </div>
        )}

        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white space-y-3">
            <p className="text-xs text-slate-200 text-center max-w-xs font-sans">
              Mueve tu cursor en 2D (X e Y) guiando al personaje a través de los obstáculos cibernéticos.
            </p>
            <button onClick={start} className="px-5 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold shadow flex items-center gap-2">
              <Play className="w-4 h-4" /> COMENZAR FLAPPY IA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* 5. Space Battle Simulator */
const SpaceBattleSimulator: React.FC<{ onCompleted?: () => void }> = ({ onCompleted }) => {
  const [playerY, setPlayerY] = useState(140);
  const [bullets, setBullets] = useState<{ id: number; x: number; y: number }[]>([]);
  const [enemies, setEnemies] = useState<{ id: number; x: number; y: number; type: 1 | 2 | 3; pts: number }[]>([
    { id: 1, x: 400, y: 70, type: 1, pts: 10 },
    { id: 2, x: 480, y: 150, type: 2, pts: 5 },
    { id: 3, x: 550, y: 220, type: 3, pts: 1 }
  ]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameover' | 'youwin'>('idle');
  const loopRef = useRef<number | null>(null);

  const start = () => {
    setScore(0);
    setBullets([]);
    setEnemies([
      { id: 1, x: 420, y: 60, type: 1, pts: 10 },
      { id: 2, x: 490, y: 140, type: 2, pts: 5 },
      { id: 3, x: 560, y: 220, type: 3, pts: 1 }
    ]);
    setGameStatus('playing');
  };

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const interval = setInterval(() => {
      setBullets(prev => [...prev, { id: Date.now() + Math.random(), x: 90, y: playerY }]);
    }, 450);

    return () => clearInterval(interval);
  }, [gameStatus, playerY]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const update = () => {
      setBullets(prev =>
        prev
          .map(b => ({ ...b, x: b.x + 8 }))
          .filter(b => b.x < 480)
      );

      setEnemies(prev =>
        prev.map(en => {
          let speed = en.type === 1 ? -4 : en.type === 2 ? -3 : -2;
          let nx = en.x + speed;
          let ny = en.y;

          if (nx < 20) {
            nx = 480;
            ny = Math.floor(Math.random() * 200) + 40;
          }

          if (Math.hypot(nx - 70, ny - playerY) < 30) {
            setGameStatus('gameover');
          }

          return { ...en, x: nx, y: ny };
        })
      );

      setBullets(bList => {
        let remainingBullets = [...bList];
        setEnemies(eList => {
          return eList.map(en => {
            const hitIndex = remainingBullets.findIndex(b => Math.hypot(b.x - en.x, b.y - en.y) < 26);
            if (hitIndex !== -1) {
              remainingBullets.splice(hitIndex, 1);
              setScore(s => {
                const nextScore = s + en.pts * 5;
                if (nextScore >= 100) {
                  setGameStatus('youwin');
                  if (onCompleted) onCompleted();
                }
                return nextScore;
              });
              return { ...en, x: 480, y: Math.floor(Math.random() * 200) + 40 };
            }
            return en;
          });
        });
        return remainingBullets;
      });

      loopRef.current = requestAnimationFrame(update);
    };

    loopRef.current = requestAnimationFrame(update);
    return () => {
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
    };
  }, [gameStatus, playerY]);

  return (
    <div className="space-y-3 font-mono">
      <div
        className="relative w-full h-72 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 select-none cursor-ns-resize"
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPlayerY(Math.max(30, Math.min(250, e.clientY - rect.top)));
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

        <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg shadow">
          SCORE: {score} / 100
        </div>

        {/* Player */}
        <div
          style={{ top: `${playerY}px`, left: '70px' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl filter drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
        >
          🚀
        </div>

        {/* Bullets */}
        {bullets.map(b => (
          <div
            key={b.id}
            style={{ top: `${b.y}px`, left: `${b.x}px` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#22d3ee]"
          />
        ))}

        {/* Enemies */}
        {gameStatus === 'playing' &&
          enemies.map(en => (
            <div
              key={en.id}
              style={{ top: `${en.y}px`, left: `${en.x}px` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl"
            >
              {en.type === 1 ? '👾' : en.type === 2 ? '🛸' : '☄️'}
            </div>
          ))}

        {gameStatus === 'youwin' && (
          <div className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center text-white space-y-2">
            <h3 className="text-3xl font-black text-emerald-400 font-mono tracking-widest animate-pulse">YOU WIN!</h3>
            <p className="text-xs text-slate-300 font-sans">¡Alcanzaste 100 puntos y completaste la misión!</p>
            <button onClick={start} className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-bold shadow">
              JUGAR DE NUEVO
            </button>
          </div>
        )}

        {gameStatus === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center text-white space-y-2">
            <h3 className="text-3xl font-black text-rose-400 font-mono tracking-widest">GAME OVER</h3>
            <p className="text-xs text-slate-300 font-sans">Colisión detectada.</p>
            <button onClick={start} className="px-4 py-2 bg-rose-600 rounded-xl text-xs font-bold shadow">
              REINTENTAR
            </button>
          </div>
        )}

        {gameStatus === 'idle' && (
          <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center text-white space-y-3">
            <p className="text-xs text-slate-300 text-center max-w-xs font-sans">
              Mueve el cursor verticalmente para guiar la nave en la cuadrícula cibernética.
            </p>
            <button onClick={start} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow flex items-center gap-2">
              <Play className="w-4 h-4" /> DESPEGAR SIMULACIÓN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* 6. Smart Door & Facial Training Simulator */
const FaceTrainDoorSimulator: React.FC<{ onCompleted?: () => void }> = ({ onCompleted }) => {
  const [userName, setUserName] = useState('Alex');
  const [isTrained, setIsTrained] = useState(false);
  const [doorFrame, setDoorFrame] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Presiona la tecla T para entrenar tu rostro en la clase 1.');
  const [securityState, setSecurityState] = useState<'locked' | 'unlocked' | 'denied'>('locked');

  const trainFace = () => {
    setStatusMessage(`Escaneando rasgos faciales de ${userName}... Guardando Clase 1.`);
    setTimeout(() => {
      setIsTrained(true);
      setStatusMessage(`¡Rostro de ${userName} registrado con éxito en Clase 1! Presiona ESPACIO para probar el acceso.`);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }, 1500);
  };

  const testAccess = (isAuthorized: boolean) => {
    if (!isTrained && isAuthorized) {
      setStatusMessage('Primero debes registrar tu rostro presionando la Tecla T.');
      return;
    }

    setIsAnimating(true);
    setStatusMessage('Sistema de seguridad biométrico activado. Verificando...');

    setTimeout(() => {
      if (isAuthorized && isTrained) {
        setSecurityState('unlocked');
        setStatusMessage(`¡Acceso concedido! Bienvenida/o ${userName}. Abriendo puerta inteligente...`);
        let f = 1;
        const interval = setInterval(() => {
          f++;
          setDoorFrame(f);
          if (f >= 14) {
            clearInterval(interval);
            setIsAnimating(false);
            if (onCompleted) onCompleted();
          }
        }, 100);
      } else {
        setSecurityState('denied');
        setDoorFrame(1);
        setStatusMessage('Acceso denegado. Rostro no coincide con Clase 1.');
        setIsAnimating(false);
      }
    }, 1200);
  };

  return (
    <div className="space-y-4 font-mono">
      <div className="relative w-full h-80 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
        {/* Door */}
        <div className="relative w-48 h-64 bg-slate-900 border-4 border-slate-800 rounded-t-2xl overflow-hidden shadow-2xl flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-slate-950 flex flex-col items-center justify-center text-emerald-300 p-2 text-center">
            <span className="text-2xl">⚡</span>
            <span className="text-[10px] font-bold">// ACCESO AUTORIZADO</span>
          </div>

          <div
            style={{
              transform: `perspective(600px) rotateY(-${(doorFrame - 1) * 7}deg)`,
              transformOrigin: 'left center',
              transition: isAnimating ? 'transform 0.1s linear' : 'transform 0.3s ease'
            }}
            className="absolute inset-0 bg-slate-900 border-r-4 border-emerald-500/40 flex flex-col items-center justify-center shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full border-2 border-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
            <div className="w-28 h-20 border border-slate-800 rounded-xl mb-4 bg-slate-950/60" />
            <div className="w-28 h-20 border border-slate-800 rounded-xl bg-slate-950/60" />
          </div>
        </div>

        {/* Security badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs shadow-lg">
          {securityState === 'unlocked' ? (
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-4 h-4" /> [CONCEDIDO]
            </span>
          ) : securityState === 'denied' ? (
            <span className="text-rose-400 flex items-center gap-1 font-bold">
              <ShieldAlert className="w-4 h-4" /> [DENEGADO]
            </span>
          ) : (
            <span className="text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> [STANDBY]
            </span>
          )}
          <span className="text-[10px] text-slate-500">FRAME: {doorFrame}/14</span>
        </div>

        <div className="absolute bottom-3 left-4 right-4 bg-slate-900/95 border border-slate-800 p-2.5 rounded-xl text-xs text-slate-300 flex items-center justify-between font-sans">
          <span>{statusMessage}</span>
          <span className="text-emerald-400 text-[10px] font-mono">
            {isTrained ? `Clase 1: "${userName}"` : '// Sin entrenar'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
          <label className="text-[11px] font-bold text-slate-400 block">// NOMBRE CLASE 1:</label>
          <input
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="w-full px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-400"
          />
          <button
            onClick={trainFace}
            className="w-full px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5"
          >
            <span className="font-mono bg-emerald-600 text-white px-1 rounded text-[10px]">T</span> ENTRENAR ROSTRO
          </button>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <span className="text-[11px] font-bold text-emerald-400 block">// PROBAR AUTORIZADO:</span>
          <button
            onClick={() => testAccess(true)}
            disabled={isAnimating}
            className="w-full px-3 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5"
          >
            <span className="font-mono bg-emerald-600 text-white px-1 rounded text-[10px]">ESPACIO</span> PROBAR TIMBRE
          </button>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <span className="text-[11px] font-bold text-rose-400 block">// PROBAR NO RECONOCIDO:</span>
          <button
            onClick={() => testAccess(false)}
            disabled={isAnimating}
            className="w-full px-3 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-1.5"
          >
            SIMULAR INTRUSO
          </button>
        </div>
      </div>
    </div>
  );
};

/* 7. Voice & Lamp Simulator */
const VoiceLightSimulator: React.FC<{ onCompleted?: () => void }> = ({ onCompleted }) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechResult, setSpeechResult] = useState('');
  const [nikoResponse, setNikoResponse] = useState('Modo domótica activado. Di "Encender luz" o "Apagar luz".');

  const executeVoiceCommand = (phrase: string) => {
    setSpeechResult(phrase);
    const clean = phrase.toLowerCase();

    if (clean.includes('encender') || clean.includes('prender') || clean.includes('luz')) {
      setIsLightOn(true);
      const resp = 'Luz encendida.';
      setNikoResponse(resp);
      speakText(resp);
      if (onCompleted) onCompleted();
    } else if (clean.includes('apagar') || clean.includes('apaga')) {
      setIsLightOn(false);
      const resp = 'Luz apagada.';
      setNikoResponse(resp);
      speakText(resp);
    } else {
      setNikoResponse(`Escuché "${phrase}", pero no reconocí la orden domótica.`);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  const startMic = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = false;
      recognition.onstart = () => setListening(true);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        executeVoiceCommand(text);
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);
      recognition.start();
    } else {
      alert('Tu navegador no soporta SpeechRecognition API nativa. Puedes usar los comandos rápidos de abajo.');
    }
  };

  return (
    <div className="space-y-4 font-mono">
      <div
        className={`relative w-full h-72 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-around p-6 transition-colors duration-500 ${
          isLightOn ? 'bg-amber-950/30' : 'bg-slate-950'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <div
              className={`w-28 h-20 rounded-t-3xl transition-all duration-300 ${
                isLightOn
                  ? 'bg-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.9)] ring-4 ring-amber-300/60'
                  : 'bg-slate-800 opacity-60'
              }`}
            />
            <div className="w-3 h-28 bg-slate-700 mx-auto" />
            <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto" />
          </div>
          <span className="text-xs font-bold mt-2 text-slate-300">
            Disfraz: {isLightOn ? 'light_on' : 'light_off'}
          </span>
        </div>

        <div className="flex flex-col items-center text-center space-y-2 font-sans">
          <div className="w-20 h-24 bg-slate-900 border-2 border-emerald-400 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
            🤖
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 max-w-xs shadow">
            <span className="font-bold text-emerald-400 block mb-1 font-mono">// RESPUESTA DEL SISTEMA:</span>
            {nikoResponse}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={startMic}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow transition ${
              listening ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            }`}
          >
            <Mic className="w-4 h-4" /> {listening ? 'ESCUCHANDO...' : 'HABLAR POR MICRÓFONO'}
          </button>

          {speechResult && (
            <span className="text-xs text-slate-300 font-mono px-2.5 py-1 bg-slate-900 rounded-xl border border-slate-800">
              "{speechResult}"
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">// COMANDOS:</span>
          <button
            onClick={() => executeVoiceCommand('Encender luz')}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 shadow"
          >
            "Encender luz"
          </button>
          <button
            onClick={() => executeVoiceCommand('Apagar luz')}
            className="px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300"
          >
            "Apagar luz"
          </button>
        </div>
      </div>
    </div>
  );
};
