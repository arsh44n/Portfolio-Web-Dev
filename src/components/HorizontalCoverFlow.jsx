import React, { useState, useEffect, useRef, useCallback } from 'react';
import CardArtwork from './CardArtwork';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HorizontalCoverFlow({
  projects,
  currentIndex,
  onSelectIndex,
}) {
  const containerRef = useRef(null);

  // Continuous floating position of the scroll track
  const [scrollPos, setScrollPos] = useState(currentIndex);
  const scrollPosRef = useRef(currentIndex);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const targetPosRef = useRef(currentIndex);
  const animFrameRef = useRef(null);

  // Sync when parent currentIndex changes
  useEffect(() => {
    targetPosRef.current = currentIndex;
  }, [currentIndex]);

  // 60/120fps continuous physics loop (Momentum, Friction & Spring Snap)
  useEffect(() => {
    const tick = () => {
      const maxIdx = Math.max(0, projects.length - 1);

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.0005) {
          // Free momentum glide with damping
          scrollPosRef.current += velocityRef.current;
          velocityRef.current *= 0.90; // Smooth inertial friction

          // Clamp bounds with elastic bounce
          if (scrollPosRef.current < 0) {
            scrollPosRef.current += (0 - scrollPosRef.current) * 0.2;
            velocityRef.current *= 0.5;
          } else if (scrollPosRef.current > maxIdx) {
            scrollPosRef.current += (maxIdx - scrollPosRef.current) * 0.2;
            velocityRef.current *= 0.5;
          }
        } else {
          // Snap gracefully to nearest integer card
          const target = Math.max(0, Math.min(maxIdx, Math.round(scrollPosRef.current)));
          targetPosRef.current = target;
          const diff = target - scrollPosRef.current;
          if (Math.abs(diff) > 0.001) {
            scrollPosRef.current += diff * 0.14; // Smooth spring snap
          } else {
            scrollPosRef.current = target;
          }
        }

        // Notify parent when nearest active card changes
        const currentNearest = Math.max(0, Math.min(maxIdx, Math.round(scrollPosRef.current)));
        if (currentNearest !== currentIndex && Math.abs(scrollPosRef.current - currentNearest) < 0.25) {
          onSelectIndex(currentNearest);
        }

        setScrollPos(scrollPosRef.current);
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [projects.length, currentIndex, onSelectIndex]);

  // Wheel scrubbing with continuous inertia
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 4) return;
    velocityRef.current += (delta / 120) * 0.045;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Pointer drag start
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startXRef.current = clientX;
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  // Pointer drag move
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - lastXRef.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);

    // Map screen pixel drag to card step progress
    const stepDelta = -(deltaX / 180);
    scrollPosRef.current += stepDelta;
    velocityRef.current = stepDelta * (16 / dt) * 0.6;

    lastXRef.current = clientX;
    lastTimeRef.current = now;
    setScrollPos(scrollPosRef.current);
  };

  // Pointer drag end
  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  // Click card to smooth glide into focus
  const handleCardClick = (idx) => {
    targetPosRef.current = idx;
    velocityRef.current = (idx - scrollPosRef.current) * 0.15;
    onSelectIndex(idx);
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
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        touchAction: 'pan-y',
      }}
    >
      {/* Left / Right Chevron Controls */}
      <button
        onClick={() => currentIndex > 0 && handleCardClick(currentIndex - 1)}
        disabled={currentIndex === 0}
        className={`absolute left-1 top-1/2 -translate-y-1/2 z-50 p-1.5 rounded-full bg-white/95 text-black shadow-md border border-black/15 transition-all cursor-pointer ${
          currentIndex === 0 ? 'opacity-25 cursor-not-allowed' : 'hover:bg-white active:scale-95'
        }`}
        title="Previous Project"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => currentIndex < projects.length - 1 && handleCardClick(currentIndex + 1)}
        disabled={currentIndex === projects.length - 1}
        className={`absolute right-1 top-1/2 -translate-y-1/2 z-50 p-1.5 rounded-full bg-white/95 text-black shadow-md border border-black/15 transition-all cursor-pointer ${
          currentIndex === projects.length - 1 ? 'opacity-25 cursor-not-allowed' : 'hover:bg-white active:scale-95'
        }`}
        title="Next Project"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {/* 3D Horizontal Cover Flow Track */}
      <div className="relative w-[180px] h-[220px] flex items-center justify-center">
        {projects.map((project, idx) => {
          // Continuous distance from center highlight
          const d = idx - scrollPos;

          // Limit rendering depth to ±3 cards
          if (Math.abs(d) > 3.2) return null;

          const isCenter = Math.abs(d) < 0.4;
          const absD = Math.abs(d);
          const sign = Math.sign(d);

          // Horizontal spacing
          const extraGap = absD > 0.4 ? 12 : 0;
          const translateX = sign * (absD * 128 + extraGap);

          // 3D perspective calculation: rotateY for horizontal Cover Flow!
          const scale = Math.max(0.70, 1.05 - absD * 0.15);
          const rotateY = -sign * Math.min(26, absD * 16);
          const translateZ = -absD * 60;
          const opacity = Math.max(0.3, 1 - absD * 0.32);
          const zIndex = Math.round(50 - absD * 10);

          return (
            <div
              key={project.id}
              onClick={() => handleCardClick(idx)}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity,
                transformOrigin: 'center center',
              }}
              className={`rounded-[18px] cursor-pointer transition-shadow ${
                isCenter
                  ? 'shadow-[0_16px_36px_-8px_rgba(0,0,0,0.35)] ring-2 ring-[#EB5038] ring-offset-2 ring-offset-[#EAEAEA]'
                  : 'shadow-md hover:opacity-90'
              }`}
            >
              {/* Outer Card Shell */}
              <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-white border border-black/10">
                <CardArtwork project={project} />

                {/* Subtle depth shade for non-active cards so center pops */}
                {!isCenter && (
                  <div
                    style={{ opacity: Math.min(0.4, absD * 0.25) }}
                    className="absolute inset-0 bg-black rounded-[18px] z-15 pointer-events-none transition-opacity duration-200"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}