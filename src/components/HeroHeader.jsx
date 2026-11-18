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
        <div className="hidden sm:flex flex-col">
          <span className="font-extended text-[10px] sm:text-xs font-black tracking-tight text-[#111111] leading-none">
            WELCOME
          </span>
          <span className="font-extended text-[10px] sm:text-xs font-black tracking-tight text-[#111111] leading-none mt-0.5">
            TO MY
          </span>
        </div>
        <div className="sm:hidden font-mono text-xs text-black/30">+</div>

        {/* Center: Coral-Red Vertical Pillar + Kinetic PORTFOLIO */}
        <div className="relative flex items-center justify-center">
          {/* Coral pillar */}
          <div
            className="absolute w-12 sm:w-20 md:w-28 lg:w-32 h-11 sm:h-16 md:h-20 lg:h-24 bg-[#EB5038] z-0 shadow-xs pointer-events-none"
            style={{ top: '-0.3rem' }}
          />

          {/* Layered kinetic typography */}
          <div className="relative z-10 flex items-center justify-center py-1">
            {/* Wireframe Outline Layer 1 */}
            <div
              style={{
                transform: `translate(${-4 + mousePos.x * 0.25}px, ${-3 + mousePos.y * 0.25}px)`,
              }}
              className="absolute pointer-events-none select-none font-extended text-lg sm:text-3xl md:text-5xl lg:text-7xl font-black tracking-tight text-outline opacity-85 leading-none transition-transform duration-100 ease-out"
            >
              PORTFOLIO
            </div>

            {/* Front Solid Black Lettering */}
            <h1 className="relative font-extended text-lg sm:text-3xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#111111] leading-none text-center">
              PORTFOLIO
            </h1>
          </div>
        </div>

        {/* Top-Right: "ME" Dossier Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emblem Eye + "ME" Trigger */}
          <button
            onClick={onOpenAbout}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DFDFDF] hover:bg-[#D5D5D5] transition-colors border border-black/10 cursor-pointer"
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

      {/* Metadata Row: Designer Name + Micro-Crosshair + Role */}
      <div className="w-full flex items-center justify-between pt-1 pb-1 text-[#111111] font-tech text-[8px] sm:text-[10px] tracking-widest uppercase font-semibold border-b border-black/10">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-[#111111]/35 font-mono">+</span>
          <span
            onClick={onOpenAbout}
            className="hover:text-[#EB5038] transition-colors cursor-pointer"
          >
            {designer.name}
          </span>
        </div>

        <div className="hidden md:flex items-center text-[#111111]/35 font-mono text-[10px]">
          <span>+</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 max-w-[60%] sm:max-w-none">
          <span className="text-right truncate">
            <span className="sm:hidden">FOUNDER</span>
            <span className="hidden sm:inline">{designer.role}</span>
          </span>
          <span className="text-[#111111]/35 font-mono">+</span>
        </div>
      </div>
    </header>
  );
}
