import React, { useState, useEffect, useRef, useCallback } from 'react';
import CardArtwork from './CardArtwork';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function VerticalCoverFlow({
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
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const targetPosRef = useRef(currentIndex);
  const animFrameRef = useRef(null);

  // Sync when parent currentIndex changes externally (e.g. keyboard shortcuts)
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

          // Clamp bounds with bounce resistance
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

  // Wheel scrubbing with buttery continuous inertia
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY;
    if (Math.abs(delta) < 4) return;

    // Add continuous impulse to velocity
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
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    lastYRef.current = clientY;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  // Pointer drag move
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaY = clientY - lastYRef.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);

    // Map screen pixel drag to card step progress
    const stepDelta = -(deltaY / 240);
    scrollPosRef.current += stepDelta;
    velocityRef.current = stepDelta * (16 / dt) * 0.6;

    lastYRef.current = clientY;
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
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        touchAction: 'none',
      }}
    >
      {/* Up / Down Navigation Controls */}
      <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        <button
          onClick={() => currentIndex > 0 && handleCardClick(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full bg-white/95 text-black shadow-md border border-black/15 transition-all cursor-pointer ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:-translate-y-0.5'
          }`}
          title="Previous Project"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => currentIndex < projects.length - 1 && handleCardClick(currentIndex + 1)}
          disabled={currentIndex === projects.length - 1}
          className={`p-2 rounded-full bg-white/95 text-black shadow-md border border-black/15 transition-all cursor-pointer ${
            currentIndex === projects.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:translate-y-0.5'
          }`}
          title="Next Project"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* 3D Vertical Cover Flow Track with Physical Momentum */}
      <div className="relative w-64 sm:w-72 md:w-80 h-[520px] max-h-full flex items-center justify-center">
        {projects.map((project, idx) => {
          // Continuous distance from center highlight
          const d = idx - scrollPos;

          // Limit rendering depth to ±3 cards for performance and crisp visual stack
          if (Math.abs(d) > 3.2) return null;

          const isCenter = Math.abs(d) < 0.4;
          const absD = Math.abs(d);
          const sign = Math.sign(d);

          // Non-linear vertical spacing so active card has bigger breathing room
          const extraGap = absD > 0.4 ? 18 : 0;
          const translateY = sign * (absD * 152 + extraGap);

          // 3D perspective calculation
          const scale = Math.max(0.68, 1.08 - absD * 0.16);
          const rotateX = -sign * Math.min(28, absD * 18);
          const translateZ = -absD * 75;
          const opacity = Math.max(0.25, 1 - absD * 0.32);
          const zIndex = Math.round(50 - absD * 10);

          return (
            <div
              key={project.id}
              onClick={() => handleCardClick(idx)}
              style={{
                position: 'absolute',
                width: '100%',
                height: '330px',
                transform: `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity,
                transformOrigin: 'center center',
              }}
              className={`rounded-[20px] cursor-pointer transition-shadow ${
                isCenter
                  ? 'shadow-[0_24px_50px_-10px_rgba(0,0,0,0.32)] ring-2 ring-[#EB5038] ring-offset-2 ring-offset-[#EAEAEA]'
                  : 'shadow-md hover:opacity-90'
              }`}
            >
              {/* Outer Card Shell */}
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-white border border-black/10">
                {/* Artwork */}
                <CardArtwork project={project} />

                {/* Subtle depth shade for non-active cards so center pops */}
                {!isCenter && (
                  <div
                    style={{ opacity: Math.min(0.4, absD * 0.25) }}
                    className="absolute inset-0 bg-black rounded-[20px] z-15 pointer-events-none transition-opacity duration-200"
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