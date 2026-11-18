import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import CardArtwork from './CardArtwork';
import { ExternalLink, Github, Sparkles, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function RightSpiralCarousel({
  projects,
  activeProject,
  onSelectProject,
  carouselAngle,
  setCarouselAngle,
}) {
  const containerRef = useRef(null);

  // Pane dimensions
  const [dimensions, setDimensions] = useState({
    width: 650,
    height: 700,
  });

  // Hover state to pause auto-glide
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Drag interaction physics
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const lastYRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const autoGlideSpeedRef = useRef(0.025); // Subtle, continuous turntable drift

  // Update container dimensions on mount & resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Card & Arc Dimensions
  const isMobile = dimensions.width < 500;
  const cardWidth = isMobile ? 180 : 215;
  const cardHeight = isMobile ? 240 : 290;

  // Arc Radius and Center:
  // Center is pushed to the right, arc curves convexly towards the left
  const radius = Math.max(380, dimensions.height * 0.74);
  const centerX = dimensions.width + radius * 0.28;
  const centerY = dimensions.height / 2;

  // Angular step between cards
  const stepDeg = 21;

  // Infinite duplicate list to loop continuously
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

  // 60fps Animation Loop (Auto-Glide & Inertia)
  useEffect(() => {
    let animId;

    const tick = () => {
      if (!isDraggingRef.current) {
        // Natural drift when not hovering
        if (hoveredIndex === null) {
          setCarouselAngle((prev) => prev + autoGlideSpeedRef.current);
        }

        // Apply friction / momentum damping
        if (Math.abs(velocityRef.current) > 0.001) {
          setCarouselAngle((prev) => prev + velocityRef.current);
          velocityRef.current *= 0.92;
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
    dragStartYRef.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    lastYRef.current = dragStartYRef.current;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  // Pointer Move (Dragging up/down)
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaY = clientY - lastYRef.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);

    // Map screen pixel drag to angular scrub
    const angleDelta = (deltaY / dimensions.height) * 55;
    setCarouselAngle((prev) => prev + angleDelta);

    // Inertia release velocity
    velocityRef.current = (angleDelta / dt) * 16;

    lastYRef.current = clientY;
    lastTimeRef.current = now;
  };

  // Pointer Up (Release)
  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  // Mouse Wheel Scrubbing with Inertia (Vertical & Horizontal wheel)
  const handleWheel = useCallback((e) => {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    const scrub = (delta / 100) * 1.5;
    velocityRef.current += scrub;
  }, []);

  // Quick Up / Down Stepping
  const handleStepUp = (e) => {
    e.stopPropagation();
    velocityRef.current -= stepDeg * 0.4;
  };

  const handleStepDown = (e) => {
    e.stopPropagation();
    velocityRef.current += stepDeg * 0.4;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      className="relative w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing pointer-events-auto"
      style={{ touchAction: 'none' }}
    >
      {/* Background Arc Contour Guide */}
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
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
      </svg>

      {/* Up / Down Navigation Controls pinned on far right */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        <button
          onClick={handleStepUp}
          className="p-2 rounded-full bg-white/90 hover:bg-white text-black shadow-md border border-black/15 transition-transform hover:-translate-y-0.5 cursor-pointer"
          title="Scroll Up (▲)"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={handleStepDown}
          className="p-2 rounded-full bg-white/90 hover:bg-white text-black shadow-md border border-black/15 transition-transform hover:translate-y-0.5 cursor-pointer"
          title="Scroll Down (▼)"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Instructions Pill */}
      <div className="absolute top-2 right-4 z-30 pointer-events-none font-tech text-[8px] tracking-widest uppercase text-black/40 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EB5038] animate-ping" />
        <span>SCROLL / CLICK CARDS</span>
      </div>

      {/* Cards Deck revolving along the vertical arc */}
      {displayedCards.map((project, index) => {
        // Calculate angle for this card
        const rawAngle = (carouselAngle + index * stepDeg) % 360;
        // Normalize angle to [-180, 180]
        const normalizedAngle = ((rawAngle + 180) % 360) - 180;

        // Skip cards outside vertical horizon
        const isVisible = Math.abs(normalizedAngle) <= 62;
        if (!isVisible) return null;

        // Radial trigonometry along right vertical arc
        const rad = (normalizedAngle * Math.PI) / 180;
        const x = centerX - radius * Math.cos(rad) - cardWidth / 2;
        const y = centerY + radius * Math.sin(rad) - cardHeight / 2;
        const rotation = normalizedAngle * 0.85; // Tangential tilt

        const isActive = activeProject && activeProject.id === project.id;
        const isHovered = hoveredIndex === index;
        const zIndex = isActive ? 100 : isHovered ? 90 : 50 - Math.round(Math.abs(normalizedAngle));

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
                isActive
                  ? 'scale(1.06) translateX(-12px)'
                  : isHovered
                  ? 'scale(1.05) translateX(-8px)'
                  : 'scale(1) translateX(0)'
              }`,
              transformOrigin: 'center right',
              zIndex: zIndex,
              transition: isDraggingRef.current
                ? 'none'
                : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
            }}
            className={`group rounded-[20px] transition-shadow cursor-pointer ${
              isActive
                ? 'shadow-swiss-lifted ring-3 ring-[#EB5038]'
                : isHovered
                ? 'shadow-swiss-lifted ring-2 ring-black/40'
                : 'shadow-swiss'
            }`}
          >
            {/* Card Body */}
            <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-white border border-black/10">
              <CardArtwork project={project} />

              {/* Status Indicator Badge */}
              <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1">
                {project.status === 'published' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[7px] font-tech text-white uppercase tracking-wider">
                    <Github className="w-2 h-2 text-emerald-400" />
                    <span>GITHUB</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EB5038]/90 backdrop-blur-md text-[7px] font-tech text-white uppercase tracking-wider">
                    <Sparkles className="w-2 h-2 text-white" />
                    <span>IN LAB</span>
                  </span>
                )}

                {/* Active Pill */}
                {isActive && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EB5038] text-[7px] font-tech text-white font-bold uppercase tracking-wider shadow-sm animate-pulse">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>ACTIVE</span>
                  </span>
                )}
              </div>

              {/* Bottom Quick Label Overlay on Hover / Active */}
              <div
                className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex flex-col justify-end transition-opacity duration-200 z-30 ${
                  isActive || isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="font-tech text-[8px] text-[#EB5038] font-bold uppercase tracking-widest">
                  {project.category}
                </div>
                <div className="font-extended text-xs font-black text-white leading-tight truncate">
                  {project.title}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
