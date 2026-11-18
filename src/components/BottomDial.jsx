import React from 'react';
import { motion } from 'framer-motion';

export default function BottomDial({ onOpenAbout, filter, setFilter, totalProjects }) {
  return (
    <>
      {/* Floating Filter Selector Pinned to Bottom-Left (Clean Swiss Editorial Placement) */}
      <div className="fixed bottom-4 left-6 z-40 hidden sm:flex items-center gap-1 p-1 bg-[#E2E2E2]/90 backdrop-blur-md rounded-full border border-black/10 shadow-sm pointer-events-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full font-tech text-[8px] font-bold tracking-widest uppercase transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'text-[#111111]/70 hover:text-black'
          }`}
        >
          ALL ({totalProjects})
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`px-3 py-1 rounded-full font-tech text-[8px] font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1 ${
            filter === 'published'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'text-[#111111]/70 hover:text-black'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          GITHUB
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-3 py-1 rounded-full font-tech text-[8px] font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1 ${
            filter === 'upcoming'
              ? 'bg-[#EB5038] text-white shadow-sm'
              : 'text-[#111111]/70 hover:text-black'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#EB5038]" />
          LAB
        </button>
      </div>

      {/* ===================================================================
          MATTE LIGHT-GRAY SEMI-CIRCULAR ANCHOR HUB / DIAL (Bottom-Center)
          =================================================================== */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-auto">
        <div className="relative w-80 sm:w-96 md:w-[440px] h-28 sm:h-32 flex flex-col items-center justify-end overflow-hidden">
          {/* Subtle SVG Compass Arc & Degree Markings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="w-full h-full text-black/15"
              viewBox="0 0 440 220"
              fill="none"
            >
              {/* Outer dotted compass rim */}
              <path
                d="M 20 220 A 200 200 0 0 1 420 220"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              {/* Middle inner solid arc */}
              <path
                d="M 60 220 A 160 160 0 0 1 380 220"
                stroke="currentColor"
                strokeWidth="1"
              />
              {/* Degree tick marks */}
              {[-60, -45, -30, -15, 0, 15, 30, 45, 60].map((deg) => {
                const rad = ((deg - 90) * Math.PI) / 180;
                const x1 = 220 + 185 * Math.cos(rad);
                const y1 = 220 + 185 * Math.sin(rad);
                const x2 = 220 + 205 * Math.cos(rad);
                const y2 = 220 + 205 * Math.sin(rad);
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          </div>

          {/* Curved Text along the arc: PORTFOLIO · PORTFOLIO · PORTFOLIO */}
          <div className="absolute top-2 sm:top-3 w-full flex justify-center pointer-events-none">
            <span className="font-tech text-[8px] sm:text-[9px] tracking-[0.35em] text-[#111111]/40 uppercase font-medium">
              PORTFOLIO · SELECTED WORKS · ARCHIVE
            </span>
          </div>

          {/* The Semi-Circular Anchor Dial Button */}
          <button
            onClick={onOpenAbout}
            className="relative z-10 w-48 sm:w-56 h-22 sm:h-26 bg-[#DFDFDF] hover:bg-[#D3D3D3] transition-all duration-200 rounded-t-full border-t border-x border-white/70 shadow-[0_-6px_20px_rgba(0,0,0,0.06)] flex flex-col items-center pt-3 sm:pt-4 cursor-pointer group"
            title="Click to view About & Contact (or Press 'A')"
          >
            {/* Small Upward Black Triangle (▲) */}
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[7px] border-b-[#111111] group-hover:border-b-[#EB5038] transition-colors mb-1.5" />

            {/* "ME" Bold Typography */}
            <span className="font-extended text-sm sm:text-base font-black tracking-widest text-[#111111] group-hover:text-[#EB5038] transition-colors">
              ME
            </span>

            {/* Technical Micro-label */}
            <span className="font-tech text-[7px] tracking-[0.25em] text-[#111111]/50 uppercase mt-0.5">
              ABOUT // CONTACT
            </span>

            {/* Dial bottom glow line */}
            <div className="absolute bottom-0 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#EB5038]/30 to-transparent" />
          </button>
        </div>
      </div>
    </>
  );
}
