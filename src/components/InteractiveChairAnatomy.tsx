import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, ShieldCheck, Clock, PlusCircle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { CHAIR_HOTSPOTS } from '../data/initialData';
import { ChairPartHotspot } from '../types';

interface InteractiveChairAnatomyProps {
  selectedParts: string[];
  onTogglePart: (partName: string) => void;
  onJumpToQuote: () => void;
}

export const InteractiveChairAnatomy: React.FC<InteractiveChairAnatomyProps> = ({
  selectedParts,
  onTogglePart,
  onJumpToQuote,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<ChairPartHotspot>(CHAIR_HOTSPOTS[0]);
  const [chairBatchQty, setChairBatchQty] = useState<number>(50);

  const isSelected = selectedParts.includes(activeHotspot.name);

  return (
    <div className="bg-gradient-to-br from-[#0F2233] via-[#13293D] to-[#0B1926] rounded-3xl p-6 lg:p-10 text-white border border-emerald-500/20 shadow-2xl relative overflow-hidden">
      {/* Decorative glowing orbs matching PDF header */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Chair Diagnostic Lab
          </span>
          <h3 className="text-2xl lg:text-3xl font-extrabold font-display tracking-tight">
            Click Any Chair Component to Inspect & Price Batch Repairs
          </h3>
        </div>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
          <div className="text-xs text-slate-300">
            <div>Batch Estimator Qty:</div>
            <div className="font-bold text-emerald-400 text-sm">{chairBatchQty} Corporate Chairs</div>
          </div>
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={chairBatchQty}
            onChange={(e) => setChairBatchQty(Number(e.target.value))}
            className="w-28 accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Annotated Ergonomic Chair Vector + Hotspots */}
        <div className="lg:col-span-6 relative bg-slate-900/70 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[420px]">
          <div className="absolute top-4 left-4 text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>6 Serviceable Assembly Zones</span>
          </div>

          {/* High-Detail Ergonomic Office Chair SVG */}
          <div className="relative w-72 h-80 select-none">
            <svg viewBox="0 0 240 300" className="w-full h-full drop-shadow-[0_18px_28px_rgba(15,157,118,0.22)]">
              <defs>
                <linearGradient id="meshGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1e3a5f" />
                  <stop offset="100%" stopColor="#0f2233" />
                </linearGradient>
                <linearGradient id="seatGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f9d76" />
                  <stop offset="100%" stopColor="#075e46" />
                </linearGradient>
                <linearGradient id="chromeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
              </defs>

              {/* Headrest */}
              <rect x="85" y="16" width="70" height="24" rx="10" fill="url(#meshGrad)" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="112" y="40" width="16" height="10" fill="#475569" />

              {/* Backrest Frame & Breathable Mesh */}
              <path
                d="M74 50 Q120 44 166 50 L160 142 Q120 148 80 142 Z"
                fill="url(#meshGrad)"
                stroke={activeHotspot.id === 'backrest-mesh' ? '#f59e0b' : '#10b981'}
                strokeWidth={activeHotspot.id === 'backrest-mesh' ? '3' : '1.8'}
              />
              {/* Lumbar support band */}
              <rect x="79" y="106" width="82" height="16" rx="6" fill="#0f9d76" fillOpacity="0.45" stroke="#34d399" strokeWidth="1.2" />

              {/* Left & Right 3D Armrests */}
              <path d="M52 122 L80 122 L76 130 L50 130 Z" fill="#f59e0b" />
              <path d="M62 130 L62 162 L78 162" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
              <path d="M160 122 L188 122 L190 130 L164 130 Z" fill="#f59e0b" />
              <path d="M178 130 L178 162 L162 162" fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />

              {/* Molded Seat Cushion */}
              <rect
                x="68"
                y="144"
                width="104"
                height="24"
                rx="11"
                fill="url(#seatGrad)"
                stroke={activeHotspot.id === 'seat-cushion' ? '#f59e0b' : '#6ee7b7'}
                strokeWidth="2"
              />

              {/* Synchronized Tilt Mechanism Box */}
              <rect
                x="96"
                y="168"
                width="48"
                height="18"
                rx="4"
                fill="#1e293b"
                stroke={activeHotspot.id === 'mechanism' ? '#f59e0b' : '#94a3b8'}
                strokeWidth="2"
              />
              {/* Tension lever */}
              <line x1="144" y1="176" x2="168" y2="182" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />

              {/* Hydraulic Gas Lift Cylinder */}
              <rect
                x="113"
                y="186"
                width="14"
                height="58"
                rx="3"
                fill="url(#chromeGrad)"
                stroke={activeHotspot.id === 'gas-lift' ? '#f59e0b' : '#cbd5e1'}
                strokeWidth="2"
              />

              {/* 5-Star Base Legs */}
              <path
                d="M120 240 L56 262 M120 240 L84 268 M120 240 L120 270 M120 240 L156 268 M120 240 L184 262"
                stroke="url(#chromeGrad)"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Twin-Wheel PU Casters */}
              <circle cx="56" cy="272" r="8" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
              <circle cx="84" cy="278" r="8" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
              <circle cx="120" cy="280" r="8" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
              <circle cx="156" cy="278" r="8" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
              <circle cx="184" cy="272" r="8" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
            </svg>

            {/* Interactive Pulsing Hotspot Buttons */}
            {CHAIR_HOTSPOTS.map((spot, index) => {
              const active = activeHotspot.id === spot.id;
              const partPicked = selectedParts.includes(spot.name);
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    active
                      ? 'bg-amber-500 text-slate-950 scale-125 ring-4 ring-amber-400/40 shadow-glow-amber z-20'
                      : partPicked
                      ? 'bg-emerald-500 text-white ring-2 ring-white/50 z-10'
                      : 'bg-slate-800/90 text-emerald-300 border border-emerald-400/50 hover:scale-110 z-10'
                  }`}
                  title={spot.name}
                >
                  {partPicked ? '✓' : index + 1}
                </button>
              );
            })}
          </div>

          {/* Quick Part Pill Bar */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {CHAIR_HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeHotspot.id === spot.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {spot.shortLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Component Spec Card & Batch Cost Calculator */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-6 lg:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  {activeHotspot.newChairComparison}
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {activeHotspot.repairTimeMins} mins on-site per chair
                </span>
              </div>

              <h4 className="text-xl lg:text-2xl font-bold text-white mb-3">
                {activeHotspot.name}
              </h4>

              <div className="space-y-3 mb-6">
                <div className="bg-rose-500/10 border-l-4 border-rose-400 p-3 rounded-r-xl">
                  <div className="text-xs uppercase tracking-wider text-rose-300 font-bold mb-0.5">
                    Common Corporate Issue
                  </div>
                  <p className="text-sm text-slate-200">{activeHotspot.commonSymptom}</p>
                </div>

                <div className="bg-emerald-500/10 border-l-4 border-emerald-400 p-3 rounded-r-xl">
                  <div className="text-xs uppercase tracking-wider text-emerald-300 font-bold mb-0.5">
                    Our Industrial Grade Replacement
                  </div>
                  <p className="text-sm text-slate-200">{activeHotspot.solutionSpec}</p>
                </div>
              </div>

              {/* Pricing & Batch ROI Strip */}
              <div className="grid grid-cols-3 gap-3 bg-slate-900/80 border border-white/10 rounded-xl p-4 mb-6">
                <div>
                  <div className="text-xs text-slate-400">Unit Rate</div>
                  <div className="text-xl font-extrabold text-emerald-400">
                    ₹{activeHotspot.repairPrice}
                    <span className="text-xs font-normal text-slate-400">/chair</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Batch ({chairBatchQty} Chairs)</div>
                  <div className="text-xl font-extrabold text-white">
                    ₹{(activeHotspot.repairPrice * chairBatchQty).toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Replacement Warranty</div>
                  <div className="text-lg font-bold text-amber-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    {activeHotspot.warrantyMonths} Months
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onTogglePart(activeHotspot.name)}
                  className={`flex-1 py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-glow-emerald'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-glow-amber'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Added to Your Quote List ({selectedParts.length})
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" /> Select Part for Bulk Quote
                    </>
                  )}
                </button>

                <button
                  onClick={onJumpToQuote}
                  className="py-3.5 px-5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 transition-all"
                >
                  <span>Proceed to Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
