import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import CardArtwork from './CardArtwork';
import { ExternalLink, Github, Sparkles, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

export default function SweepingArcCarousel({
  projects,
  activeProject,
  onSelectProject,
  carouselAngle,
  setCarouselAngle,
}) {
  const containerRef = useRef(null);

  // Viewport / container dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  // Hover state to pause auto-glide
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Drag interaction physics
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const autoGlideSpeedRef = useRef(0.022); // Slow, fluid turntable drift

  // Update dimensions
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      } else {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;

  // Spacey, premium card dimensions
  const cardWidth = isMobile ? 180 : isTablet ? 200 : 215;
  const cardHeight = isMobile ? 240 : isTablet ? 265 : 290;

  // Circular curvature geometry:
  // Starts from mid-right of the screen and sweeps in a circular curvature down to the middle-bottom
  const radius = isMobile
    ? Math.max(340, dimensions.height * 0.58)
    : Math.max(520, dimensions.height * 0.74);

  const centerX = dimensions.width + (isMobile ? 30 : 70);
  const centerY = dimensions.height + (isMobile ? 30 : 60);

  // Spacey angular interval: Exactly 360 / N degrees (e.g. 45 degrees for 8 projects)
  // Guarantees zero duplicate cards on screen!
  const stepDeg = 360 / Math.max(1, projects.length);

  // 60fps Animation Loop (Continuous Auto-Glide & Inertia)
  useEffect(() => {
    let animId;

    const tick = () => {
      if (!isDraggingRef.current) {
        // Natural left-to-right / circular drift when not hovering
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
    dragStartXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartYRef.current = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    lastXRef.current = dragStartXRef.current;
    lastYRef.current = dragStartYRef.current;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  // Pointer Move (Scrub along circular arc)
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = clientX - lastXRef.current;
    const deltaY = clientY - lastYRef.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);

    // Diagonal drag projection along the quadrant curvature
    const combinedDelta = deltaY * 0.7 - deltaX * 0.7;
    const angleDelta = (combinedDelta / dimensions.height) * 65;

    setCarouselAngle((prev) => prev + angleDelta);
    velocityRef.current = (angleDelta / dt) * 16;

    lastXRef.current = clientX;
    lastYRef.current = clientY;
    lastTimeRef.current = now;
  };

  // Pointer Up (Release)
  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  // Mouse Wheel Scrubbing with Inertia (both vertical and horizontal wheel)
  const handleWheel = useCallback((e) => {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    const scrub = (delta / 100) * 1.5;
    velocityRef.current += scrub;
  }, []);

  // On-Screen Stepping Controls
  const handleStepPrev = (e) => {
    e.stopPropagation();
    velocityRef.current -= stepDeg * 0.4;
  };

  const handleStepNext = (e) => {
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
      className="absolute inset-0 w-full h-full overflow-hidden select-none cursor-grab active:cursor-grabbing pointer-events-auto"
      style={{ touchAction: 'none' }}
    >
      {/* Background Circular Arc Contour Guide Line */}
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
          strokeDasharray="5 7"
        />
        {/* Subtle radial guide ticks along the sweep */}
        {[0, 15, 30, 45, 60, 75, 90, 105].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = centerX - (radius - 12) * Math.sin(rad);
          const y1 = centerY - (radius - 12) * Math.cos(rad);
          const x2 = centerX - (radius + 12) * Math.sin(rad);
          const y2 = centerY - (radius + 12) * Math.cos(rad);
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#111111"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Floating Stepping Controls */}
      <div className="absolute right-4 bottom-6 z-40 flex items-center gap-2">
        <button
          onClick={handleStepPrev}
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-black shadow-md border border-black/15 transition-transform hover:-translate-x-0.5 cursor-pointer"
          title="Previous Card (←)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleStepNext}
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-black shadow-md border border-black/15 transition-transform hover:translate-x-0.5 cursor-pointer"
          title="Next Card (→)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Telemetry Indicator */}
      <div className="absolute top-2 right-4 z-30 pointer-events-none font-tech text-[8px] tracking-widest uppercase text-black/45 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EB5038] animate-ping" />
        <span>CIRCULAR ARC // R-{Math.round(radius)}PX</span>
      </div>

      {/* Cards Deck positioned along the circular curvature */}
      {projects.map((project, index) => {
        // Calculate nominal angle along the circle
        const rawAngle = (carouselAngle + index * stepDeg) % 360;
        // Normalize angle to [-180, 180]
        const normalizedAngle = ((rawAngle + 180) % 360) - 180;

        // Visible quadrant: from mid-right (~90 deg) down to middle-bottom (~0 deg)
        // With an extended sweep [-15 deg, 110 deg]
        const isVisible = normalizedAngle >= -15 && normalizedAngle <= 110;
        if (!isVisible) return null;

        // Trigonometric projection:
        // Angle theta: 90 deg is mid-right, 0 deg is middle-bottom
        const rad = (normalizedAngle * Math.PI) / 180;
        const x = centerX - radius * Math.sin(rad) - cardWidth / 2;
        const y = centerY - radius * Math.cos(rad) - cardHeight / 2;

        // Dynamic tangential rotation following the curve
        const rotation = (90 - normalizedAngle) * 0.45;

        const isActive = activeProject && activeProject.id === project.id;
        const isHovered = hoveredIndex === index;
        const zIndex = isActive ? 100 : isHovered ? 90 : 50 + Math.round(normalizedAngle);

        return (
          <div
            key={project.id}
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
                  ? 'scale(1.07) translateY(-14px)'
                  : isHovered
                  ? 'scale(1.05) translateY(-8px)'
                  : 'scale(1) translateY(0)'
              }`,
              transformOrigin: 'bottom center',
              zIndex: zIndex,
              transition: isDraggingRef.current
                ? 'none'
                : 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease',
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
