import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroHeader({ designer, onOpenAbout, filter, setFilter, totalProjects }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header className="relative w-full pt-2 sm:pt-4 px-4 sm:px-6 md:px-10 pointer-events-auto select-none z-20 shrink-0">
      {/* Top row: Left branding, Center PORTFOLIO, Right Actions */}
      <div className="w-full flex items-center justify-between">
        {/* Top-Left: "WELCOME TO MY" */}
        <div className="flex flex-col">
          <span className="font-extended text-[10px] sm:text-xs font-black tracking-tight text-[#111111] leading-none">
            WELCOME
          </span>
          <span className="font-extended text-[10px] sm:text-xs font-black tracking-tight text-[#111111] leading-none mt-0.5">
            TO MY
          </span>
        </div>

        {/* Center: Coral-Red Vertical Pillar + Kinetic PORTFOLIO */}
        <div className="relative flex items-center justify-center">
          {/* Coral pillar */}
          <div
            className="absolute w-16 sm:w-24 md:w-32 h-14 sm:h-20 md:h-24 bg-[#EB5038] z-0 shadow-xs pointer-events-none"
            style={{ top: '-0.4rem' }}
          />

          {/* Layered kinetic typography */}
          <div className="relative z-10 flex items-center justify-center py-1">
            {/* Wireframe Outline Layer 1 */}
            <div
              style={{
                transform: `translate(${-6 + mousePos.x * 0.3}px, ${-5 + mousePos.y * 0.3}px)`,
              }}
              className="absolute pointer-events-none select-none font-extended text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-outline opacity-85 leading-none transition-transform duration-100 ease-out"
            >
              PORTFOLIO
            </div>

            {/* Front Solid Black Lettering */}
            <h1 className="relative font-extended text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#111111] leading-none text-center">
              PORTFOLIO
            </h1>
          </div>
        </div>

        {/* Top-Right: Filter Pills & "ME" Dossier Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Filter Switcher (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 p-0.5 bg-[#E2E2E2] rounded-full border border-black/10">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-0.5 rounded-full font-tech text-[8px] font-bold tracking-widest uppercase transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#111111]/70 hover:text-black'
              }`}
            >
              ALL ({totalProjects})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-2.5 py-0.5 rounded-full font-tech text-[8px] font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'published'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#111111]/70 hover:text-black'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              GITHUB
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-2.5 py-0.5 rounded-full font-tech text-[8px] font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'upcoming'
                  ? 'bg-[#EB5038] text-white shadow-xs'
                  : 'text-[#111111]/70 hover:text-black'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#EB5038]" />
              LAB
            </button>
          </div>

          {/* Emblem Eye + "ME" Trigger */}
          <button
            onClick={onOpenAbout}
            className="group flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#DFDFDF] hover:bg-[#D5D5D5] transition-colors border border-black/10 cursor-pointer"
            title="Open Creative Dossier / About (Press A)"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111111] group-hover:text-[#EB5038] transition-colors"
              viewBox="0 0 36 36"
              fill="none"
            >
              <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2" />
              <path
                d="M8.5 18 C11.5 11.5 24.5 11.5 27.5 18 C24.5 24.5 11.5 24.5 8.5 18 Z"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
              />
              <circle cx="18" cy="18" r="3.2" fill="currentColor" />
            </svg>
            <span className="font-extended text-[10px] sm:text-[11px] font-black tracking-widest text-[#111111] group-hover:text-[#EB5038]">
              ME
            </span>
          </button>
        </div>
      </div>

      {/* Metadata Row: Designer Name + Micro-Crosshairs + Role */}
      <div className="w-full flex items-center justify-between pt-1.5 pb-1 text-[#111111] font-tech text-[8px] sm:text-[10px] tracking-widest uppercase font-semibold border-b border-black/10">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[#111111]/35 font-mono">+</span>
          <span
            onClick={onOpenAbout}
            className="hover:text-[#EB5038] transition-colors cursor-pointer"
          >
            {designer.name}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[#111111]/35 font-mono text-[10px]">
          <span>+</span>
          <span className="font-tech text-[8px] tracking-[0.25em] text-[#111111]/50">
            DUAL-STAGE INTERACTIVE WORKBENCH
          </span>
          <span>+</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-right">{designer.role}</span>
          <span className="text-[#111111]/35 font-mono">+</span>
        </div>
      </div>
    </header>
  );
}
