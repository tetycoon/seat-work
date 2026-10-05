import React, { useState } from 'react';
import { SlidersHorizontal, CheckCircle2, AlertTriangle, Camera, ShieldCheck } from 'lucide-react';
import { BeforeAfterCase } from '../types';

interface BeforeAfterSliderProps {
  project: BeforeAfterCase;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ project }) => {
  const [sliderPos, setSliderPos] = useState<number>(52);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Top Interactive Visual Split Comparison */}
      <div className="relative h-72 sm:h-80 w-full select-none overflow-hidden bg-slate-900">
        {/* AFTER LAYER (Full width underneath) */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 flex items-center justify-center p-6">
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> AFTER: RESTORED & SANITIZED
          </div>

          {/* Illustrated Restored Chair Batch View */}
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 180 200" className="w-40 h-44 drop-shadow-[0_12px_20px_rgba(16,185,129,0.35)]">
              {/* Restored pristine chair */}
              <rect x="52" y="20" width="76" height="75" rx="12" fill="#10b981" stroke="#a7f3d0" strokeWidth="2.5" />
              <rect x="60" y="65" width="60" height="14" rx="5" fill="#059669" />
              <rect x="44" y="100" width="92" height="20" rx="8" fill="#047857" stroke="#6ee7b7" strokeWidth="2" />
              {/* Armrests straight */}
              <path d="M34 82 L50 82 L50 110" fill="none" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
              <path d="M146 82 L130 82 L130 110" fill="none" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
              {/* Brand new chrome gas lift */}
              <rect x="84" y="120" width="12" height="42" fill="#f8fafc" stroke="#34d399" strokeWidth="1.5" />
              {/* 5-star base & intact casters */}
              <path d="M90 162 L44 178 M90 162 L90 182 M90 162 L136 178" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
              <circle cx="44" cy="185" r="6" fill="#10b981" />
              <circle cx="90" cy="189" r="6" fill="#10b981" />
              <circle cx="136" cy="185" r="6" fill="#10b981" />
            </svg>
            <div className="hidden sm:block max-w-xs text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
                <Camera className="w-3.5 h-3.5" /> Batch QA Photo Proof Verified
              </div>
              <div className="text-white font-bold text-base">
                100% Height Lock, Steam Extracted & Barcode Tagged
              </div>
              <div className="text-emerald-200 text-xs">
                {project.savedVsNew}
              </div>
            </div>
          </div>
        </div>

        {/* BEFORE LAYER (Clipped by sliderPos) */}
        <div
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          className="absolute inset-0 bg-gradient-to-br from-slate-800 via-stone-900 to-rose-950 flex items-center justify-center p-6"
        >
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold shadow flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> BEFORE: DAMAGED & STAINED
          </div>

          <div className="flex items-center gap-6">
            <svg viewBox="0 0 180 200" className="w-40 h-44">
              {/* Tilted / worn out chair with stains & broken wheel */}
              <g transform="rotate(-5 90 110)">
                <rect x="52" y="34" width="76" height="75" rx="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 3" />
                {/* Coffee/sweat stains */}
                <circle cx="78" cy="64" r="11" fill="#78350f" fillOpacity="0.65" />
                <circle cx="102" cy="82" r="8" fill="#78350f" fillOpacity="0.55" />
                {/* Sagging seat */}
                <path d="M44 114 Q90 126 136 114 L132 128 Q90 136 48 128 Z" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Broken drooping left armrest */}
                <path d="M30 98 L48 106 L48 122" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                <path d="M146 92 L130 92 L130 118" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              </g>
              {/* Sunken hydraulic lift */}
              <rect x="84" y="136" width="12" height="24" fill="#64748b" stroke="#ef4444" strokeWidth="2" />
              <path d="M90 160 L44 178 M90 160 L90 182 M90 160 L136 178" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
              {/* Missing/broken left wheel */}
              <circle cx="44" cy="185" r="5" fill="#ef4444" />
              <circle cx="90" cy="189" r="6" fill="#475569" />
              <circle cx="136" cy="185" r="6" fill="#475569" />
            </svg>
            <div className="hidden sm:block max-w-xs text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold">
                Pre-Inspection Condition
              </div>
              <div className="text-slate-200 font-bold text-base">
                Sinking Gas Lifts, Stained Cushion Foam & Jammed Casters
              </div>
              <div className="text-amber-300 text-xs">
                Drag slider to inspect restoration quality →
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider Line & Handle */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] pointer-events-none"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center border-2 border-emerald-500">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        {/* Invisible Range Input for Smooth Dragging */}
        <input
          type="range"
          min={5}
          max={95}
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          aria-label="Compare Before and After Chair Refurbishment"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />

        {/* Bottom instruction bar */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-slate-950/75 text-white text-xs backdrop-blur-sm border border-white/15 pointer-events-none">
          Slide left/right to compare Before vs After ({sliderPos}%)
        </div>
      </div>

      {/* Project Details Body */}
      <div className="p-6 lg:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
            {project.serviceBadge} • {project.chairCount} Chairs
          </span>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {project.savedVsNew}
          </span>
        </div>

        <h4 className="text-xl font-extrabold text-slate-900 mb-1">{project.title}</h4>
        <p className="text-xs text-slate-500 mb-5">
          {project.clientSector} • Turnaround: <strong className="text-slate-700">{project.duration}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-rose-50/70 border border-rose-200/70 rounded-2xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Before Assessment
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {project.beforeSummary.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> After Batch Completion
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {project.afterSummary.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <blockquote className="bg-slate-50 border-l-4 border-emerald-500 px-4 py-3 rounded-r-xl text-xs italic text-slate-700">
          "{project.quoteText}"
          <footer className="mt-1 font-bold not-italic text-slate-900">— {project.clientRole}</footer>
        </blockquote>
      </div>
    </div>
  );
};
