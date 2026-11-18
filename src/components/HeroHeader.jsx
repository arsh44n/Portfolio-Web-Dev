import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroHeader({ designer, onPrev, onNext, onOpenAbout }) {
  // Track mouse coordinates for kinetic parallax on the outlined typographic layers
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
    <header className="relative w-full pt-5 md:pt-7 px-8 md:px-14 pointer-events-auto select-none z-20">
      {/* =====================================================================
          TOP BAR: "WELCOME TO MY" (Left) + Minimalist Geometric Emblem (Right)
          ===================================================================== */}
      <div className="w-full flex items-start justify-between">
        {/* Top-Left Stacked Label */}
        <div className="flex flex-col">
          <span className="font-extended text-xs sm:text-sm md:text-[15px] font-black tracking-tight text-[#111111] leading-none">
            WELCOME
          </span>
          <span className="font-extended text-xs sm:text-sm md:text-[15px] font-black tracking-tight text-[#111111] leading-none mt-1">
            TO MY
          </span>
        </div>

        {/* Top-Right Minimalist Geometric Emblem (Eye inside reticle) */}
        <button
          onClick={onOpenAbout}
          className="group relative p-1.5 focus:outline-none cursor-pointer"
          title="About the Designer (Press A)"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
            <svg
              className="w-full h-full text-[#111111] transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 36 36"
              fill="none"
            >
              {/* Outer reticle circle */}
              <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.8" />
              {/* Eye contour */}
              <path
                d="M8.5 18 C11.5 11.5 24.5 11.5 27.5 18 C24.5 24.5 11.5 24.5 8.5 18 Z"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
              {/* Center pupil */}
              <circle cx="18" cy="18" r="3.2" fill="currentColor" />
              {/* Micro crosshairs */}
              <line x1="18" y1="0.5" x2="18" y2="4.5" stroke="currentColor" strokeWidth="1.6" />
              <line x1="18" y1="31.5" x2="18" y2="35.5" stroke="currentColor" strokeWidth="1.6" />
              <line x1="0.5" y1="18" x2="4.5" y2="18" stroke="currentColor" strokeWidth="1.6" />
              <line x1="31.5" y1="18" x2="35.5" y2="18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
        </button>
      </div>

      {/* =====================================================================
          TOP MICRO-GRID CROSSHAIRS (+) ROW
          ===================================================================== */}
      <div className="relative w-full h-5 my-1 hidden sm:flex items-center justify-between text-[#111111]/35 font-mono text-xs select-none">
        <span className="pl-1">+</span>
        <span className="pl-[30%]+">+</span>
        <span className="pr-[30%]+">+</span>
        <span className="pr-1">+</span>
      </div>

      {/* =====================================================================
          CENTER HERO TITLE: Bold Coral-Red Vertical Pillar + Kinetic PORTFOLIO
          ===================================================================== */}
      <div className="relative w-full flex flex-col items-center justify-center my-1 sm:my-2">
        {/* Coral-Red Vertical Pillar (#EB5038) */}
        <div
          className="absolute w-24 sm:w-28 md:w-36 lg:w-44 h-48 sm:h-56 md:h-64 bg-[#EB5038] z-0 shadow-sm pointer-events-none transition-all duration-700"
          style={{ top: '-1.8rem' }}
        />

        {/* Kinetic Layered Typography: "PORTFOLIO" */}
        <div className="relative z-10 w-full flex items-center justify-center overflow-visible py-2">
          {/* Wireframe Outline Duplicate Layer 1 (Shifted Top-Left) */}
          <div
            style={{
              transform: `translate(${-14 + mousePos.x * 0.5}px, ${-12 + mousePos.y * 0.5}px)`,
            }}
            className="absolute pointer-events-none select-none font-extended text-5xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[138px] font-black tracking-tight text-outline opacity-85 leading-none transition-transform duration-150 ease-out"
          >
            PORTFOLIO
          </div>

          {/* Wireframe Outline Duplicate Layer 2 (Shifted Bottom-Right) */}
          <div
            style={{
              transform: `translate(${12 - mousePos.x * 0.4}px, ${10 - mousePos.y * 0.4}px)`,
            }}
            className="absolute pointer-events-none select-none font-extended text-5xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[138px] font-black tracking-tight text-outline-thin opacity-55 leading-none transition-transform duration-150 ease-out"
          >
            PORTFOLIO
          </div>

          {/* Front Solid Deep Charcoal/Black Lettering */}
          <h1 className="relative font-extended text-5xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[138px] font-black tracking-tight text-[#111111] leading-none text-center drop-shadow-sm">
            PORTFOLIO
          </h1>
        </div>
      </div>

      {/* =====================================================================
          METADATA ROW: Name (Left) + Technical Crosshairs + Role (Right)
          ===================================================================== */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-between pt-1 sm:pt-2 pb-1 text-[#111111] font-tech text-[10px] sm:text-xs tracking-widest uppercase font-semibold">
        {/* Left: Designer Name */}
        <div className="flex items-center gap-3">
          <span className="text-[#111111]/35 font-mono">+</span>
          <span
            className="hover:text-[#EB5038] transition-colors cursor-pointer"
            onClick={onOpenAbout}
          >
            {designer.name}
          </span>
        </div>

        {/* Center: Subtle Crosshairs */}
        <div className="hidden md:flex items-center gap-12 text-[#111111]/35 font-mono text-[11px]">
          <span>+</span>
          <span>+</span>
        </div>

        {/* Right: Role */}
        <div className="flex items-center gap-3">
          <span className="text-right">
            {designer.role}
          </span>
          <span className="text-[#111111]/35 font-mono">+</span>
        </div>
      </div>

      {/* =====================================================================
          FAR-LEFT & FAR-RIGHT DIRECTIONAL ARROWS (◀ ▶)
          ===================================================================== */}
      {/* Pinned Left Arrow */}
      <button
        onClick={onPrev}
        className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1.5 p-3 text-[#111111] hover:text-[#EB5038] hover:-translate-x-1 transition-all cursor-pointer group"
        title="Previous Project (Left Arrow Key)"
      >
        <span className="text-xl md:text-2xl font-black">◀</span>
        <span className="font-tech text-[8px] tracking-widest text-[#111111]/45 group-hover:text-[#EB5038]">
          PREV
        </span>
      </button>

      {/* Pinned Right Arrow */}
      <button
        onClick={onNext}
        className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-1.5 p-3 text-[#111111] hover:text-[#EB5038] hover:translate-x-1 transition-all cursor-pointer group"
        title="Next Project (Right Arrow Key)"
      >
        <span className="text-xl md:text-2xl font-black">▶</span>
        <span className="font-tech text-[8px] tracking-widest text-[#111111]/45 group-hover:text-[#EB5038]">
          NEXT
        </span>
      </button>
    </header>
  );
}
