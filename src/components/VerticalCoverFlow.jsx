import React, { useState, useEffect, useRef, useCallback } from 'react';
import CardArtwork from './CardArtwork';
import { ChevronUp, ChevronDown, CheckCircle2, Github, Sparkles } from 'lucide-react';

export default function VerticalCoverFlow({
  projects,
  currentIndex,
  onSelectIndex,
}) {
  const containerRef = useRef(null);

  // Drag interaction physics
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);

  // Wheel debounce to prevent rapid skipping
  const wheelLockRef = useRef(false);

  // Handle wheel scrolling
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (wheelLockRef.current) return;

    const delta = e.deltaY;
    if (Math.abs(delta) < 20) return;

    wheelLockRef.current = true;
    setTimeout(() => {
      wheelLockRef.current = false;
    }, 240); // 240ms debounce for silky smooth discrete stepping

    if (delta > 0) {
      // Scroll down -> next card
      if (currentIndex < projects.length - 1) {
        onSelectIndex(currentIndex + 1);
      }
    } else {
      // Scroll up -> prev card
      if (currentIndex > 0) {
        onSelectIndex(currentIndex - 1);
      }
    }
  }, [currentIndex, projects.length, onSelectIndex]);

  // Attach wheel listener with passive: false so preventDefault works
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Pointer Down (Drag Start)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    accumulatedDeltaRef.current = 0;
  };

  // Pointer Move (Drag)
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaY = clientY - dragStartYRef.current;
    accumulatedDeltaRef.current = deltaY;

    // Threshold drag to trigger step
    if (Math.abs(deltaY) > 60) {
      if (deltaY < 0 && currentIndex < projects.length - 1) {
        onSelectIndex(currentIndex + 1);
        isDraggingRef.current = false;
      } else if (deltaY > 0 && currentIndex > 0) {
        onSelectIndex(currentIndex - 1);
        isDraggingRef.current = false;
      }
    }
  };

  // Pointer Up
  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full h-full flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing pointer-events-auto"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        touchAction: 'none',
      }}
    >
      {/* Up / Down Navigation Controls */}
      <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        <button
          onClick={() => currentIndex > 0 && onSelectIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full bg-white/95 text-black shadow-md border border-black/15 transition-all cursor-pointer ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:-translate-y-0.5'
          }`}
          title="Previous Project (▲)"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => currentIndex < projects.length - 1 && onSelectIndex(currentIndex + 1)}
          disabled={currentIndex === projects.length - 1}
          className={`p-2 rounded-full bg-white/95 text-black shadow-md border border-black/15 transition-all cursor-pointer ${
            currentIndex === projects.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:translate-y-0.5'
          }`}
          title="Next Project (▼)"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Top Telemetry Stamp */}
      <div className="absolute top-2 right-4 z-40 pointer-events-none font-tech text-[8px] sm:text-[9px] tracking-widest uppercase text-black/45 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EB5038] animate-ping" />
        <span>COVER FLOW // 3D STACK</span>
      </div>

      {/* 3D Vertical Cover Flow Stack */}
      <div className="relative w-64 sm:w-72 md:w-80 h-[520px] max-h-full flex items-center justify-center">
        {projects.map((project, idx) => {
          // Distance from center highlight: 0 is center, negative is above, positive is below
          const d = idx - currentIndex;

          // Limit rendering depth to ±3 cards for performance and crisp visual stack
          if (Math.abs(d) > 3) return null;

          const isCenter = d === 0;

          // Vertical 3D perspective calculation:
          // Center is biggest & flat; cards above/below tilt and scale down into depth
          const translateY = d * 148;
          const scale = isCenter ? 1.05 : Math.max(0.68, 1 - Math.abs(d) * 0.16);
          const rotateX = isCenter ? 0 : d < 0 ? Math.min(30, Math.abs(d) * 18) : -Math.min(30, Math.abs(d) * 18);
          const translateZ = -Math.abs(d) * 75;
          const opacity = isCenter ? 1 : Math.max(0.3, 1 - Math.abs(d) * 0.35);
          const zIndex = 50 - Math.abs(d) * 10;

          return (
            <div
              key={project.id}
              onClick={() => onSelectIndex(idx)}
              style={{
                position: 'absolute',
                width: '100%',
                height: '340px',
                transform: `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity,
                transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                transformOrigin: 'center center',
              }}
              className={`rounded-[20px] cursor-pointer transition-all duration-300 ${
                isCenter
                  ? 'shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)] ring-2 ring-[#EB5038] ring-offset-2 ring-offset-[#EAEAEA]'
                  : 'shadow-md hover:opacity-95'
              }`}
            >
              {/* Outer Card Shell */}
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-white border border-black/10">
                {/* Artwork */}
                <CardArtwork project={project} />

                {/* Subtle depth shade for non-active cards so center pops */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-black/25 rounded-[20px] z-15 pointer-events-none transition-opacity duration-300" />
                )}

                {/* Status Indicator Badge */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                  {project.status === 'published' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/85 backdrop-blur-md text-[8px] font-tech text-white uppercase tracking-wider">
                      <Github className="w-2.5 h-2.5 text-emerald-400" />
                      <span>GITHUB</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EB5038]/90 backdrop-blur-md text-[8px] font-tech text-white uppercase tracking-wider">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                      <span>IN LAB</span>
                    </span>
                  )}

                  {/* Active Highlight Badge */}
                  {isCenter && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EB5038] text-[8px] font-tech text-white font-bold uppercase tracking-wider shadow-sm animate-pulse">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>ACTIVE FOCUS</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
