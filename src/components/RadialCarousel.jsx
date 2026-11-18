import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import CardArtwork from './CardArtwork';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export default function RadialCarousel({
  projects,
  onSelectProject,
  carouselAngle,
  setCarouselAngle,
}) {
  const containerRef = useRef(null);

  // Viewport dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  // Track hover state to pause auto-glide
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Drag interaction physics
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const autoGlideSpeedRef = useRef(0.035); // Slow, fluid turntable glide

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive geometry parameters
  const isMobile = dimensions.width < 640;
  const isTablet = dimensions.width >= 640 && dimensions.width < 1024;

  const cardWidth = isMobile ? 195 : isTablet ? 240 : 275;
  const cardHeight = isMobile ? 260 : isTablet ? 320 : 365;

  // Arc Radius and Center:
  // Positioned so the peak card top rests elegantly around 48%-50% of viewport height
  const radius = isMobile
    ? Math.max(360, dimensions.height * 0.52)
    : Math.max(520, dimensions.height * 0.65);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height + radius * 0.52;

  // Angular step between cards
  const stepDeg = isMobile ? 25 : 22.5;

  // Duplicate items array to create an infinite, seamless turntable loop
  const totalSlots = Math.ceil(360 / stepDeg);
  const displayedCards = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    const repeated = [];
    while (repeated.length < totalSlots) {
      for (const p of projects) {
        repeated.push(p);
        if (repeated.length >= totalSlots) break;
      }
    }
    return repeated;
  }, [projects, totalSlots]);

  // Main 60fps Animation Loop (Continuous Auto-Glide & Inertia)
  useEffect(() => {
    let animId;

    const tick = () => {
      if (!isDraggingRef.current) {
        // Natural left-to-right drift when not hovering a card
        if (hoveredIndex === null) {
          setCarouselAngle((prev) => prev + autoGlideSpeedRef.current);
        }

        // Apply friction / momentum damping
        if (Math.abs(velocityRef.current) > 0.001) {
          setCarouselAngle((prev) => prev + velocityRef.current);
          velocityRef.current *= 0.93; // Elastic inertia damping
        } else {
          velocityRef.current = 0;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [hoveredIndex, setCarouselAngle]);

  // Pointer Down (Drag Start)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    lastXRef.current = dragStartXRef.current;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  // Pointer Move (Dragging)
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - lastXRef.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);

    // Map screen pixel drag to angular scrub
    const angleDelta = (deltaX / dimensions.width) * 55;
    setCarouselAngle((prev) => prev + angleDelta);

    // Release momentum velocity
    velocityRef.current = (angleDelta / dt) * 16;

    lastXRef.current = clientX;
    lastTimeRef.current = now;
  };

  // Pointer Up (Release)
  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  // Mouse Wheel Scrubbing with Inertia
  const handleWheel = useCallback((e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const scrub = (delta / 120) * 1.6;
    velocityRef.current += scrub;
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      className="absolute inset-0 w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing pointer-events-auto"
      style={{ touchAction: 'none' }}
    >
      {/* Visual Radial Dial Guide Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        style={{ zIndex: 1 }}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#111111"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>

      {/* Radial Cards Track */}
      {displayedCards.map((project, index) => {
        // Calculate dynamic angle for this card
        const rawAngle = (carouselAngle + index * stepDeg) % 360;
        // Normalize angle to [-180, 180]
        const normalizedAngle =
          ((rawAngle + 180) % 360) - 180;

        // Skip cards that are outside viewport horizon
        const isVisible = Math.abs(normalizedAngle) <= 72;
        if (!isVisible) return null;

        // Radial projection trigonometry
        const rad = (normalizedAngle * Math.PI) / 180;
        const x = centerX + radius * Math.sin(rad) - cardWidth / 2;
        const y = centerY - radius * Math.cos(rad) - cardHeight / 2;
        const rotation = normalizedAngle; // Dynamic tangential rotation

        const isHovered = hoveredIndex === index;
        // Higher z-index for cards closer to the peak (angle = 0)
        const zIndex = isHovered ? 999 : 100 - Math.round(Math.abs(normalizedAngle));

        return (
          <div
            key={`${project.id}-${index}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={(e) => {
              if (Math.abs(velocityRef.current) > 0.4) return;
              e.stopPropagation();
              onSelectProject(project);
            }}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              transform: `rotate(${rotation}deg) ${
                isHovered ? 'scale(1.08) translateY(-22px)' : 'scale(1) translateY(0)'
              }`,
              transformOrigin: 'bottom center',
              zIndex: zIndex,
              transition: isDraggingRef.current
                ? 'none'
                : 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease',
            }}
            className={`group rounded-[20px] transition-shadow cursor-pointer ${
              isHovered ? 'shadow-swiss-lifted ring-2 ring-[#EB5038]' : 'shadow-swiss'
            }`}
          >
            {/* The Outer Card Body */}
            <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-white border border-black/10">
              {/* Custom High-Fidelity Artwork */}
              <CardArtwork project={project} />

              {/* Status Ribbon Badge (Top Left of Card) */}
              <div className="absolute top-3 left-3 z-20">
                {project.status === 'published' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[8px] font-tech text-white uppercase tracking-wider">
                    <Github className="w-2.5 h-2.5 text-emerald-400" />
                    <span>GITHUB</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EB5038]/90 backdrop-blur-md text-[8px] font-tech text-white uppercase tracking-wider">
                    <Sparkles className="w-2.5 h-2.5 text-white" />
                    <span>IN LAB</span>
                  </span>
                )}
              </div>

              {/* Hover Overlay with Minimal Pill Badge ("View Project ↗") */}
              <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 flex flex-col justify-end p-4 z-30 ${
                  isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="bg-white/95 text-[#111111] p-3 rounded-xl shadow-lg border border-black/10 flex flex-col gap-1.5 transform transition-transform duration-300">
                  <div className="flex justify-between items-center">
                    <span className="font-tech text-[8px] font-bold text-[#EB5038] tracking-widest uppercase">
                      {project.category}
                    </span>
                    <span className="font-tech text-[8px] text-black/50">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-extended text-sm font-black text-black leading-tight line-clamp-1">
                    {project.title}
                  </h3>

                  <div className="flex items-center justify-between pt-1 border-t border-black/10">
                    <span className="font-tech text-[9px] font-bold text-black flex items-center gap-1">
                      VIEW CASE STUDY
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#EB5038]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
