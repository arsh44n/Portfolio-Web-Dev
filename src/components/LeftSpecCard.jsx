import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Layers, X, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function LeftSpecCard({ project }) {
  const [showSpecs, setShowSpecs] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const previewRef = useRef(null);
  const [scale, setScale] = useState(0.38);

  // Compute desktop scaling factor based on container width
  useEffect(() => {
    const updateScale = () => {
      if (previewRef.current) {
        const width = previewRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 1280);
        }
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (previewRef.current) ro.observe(previewRef.current);
    window.addEventListener('resize', updateScale);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  // Reset iframe loading state when project changes
  useEffect(() => {
    setIframeLoaded(false);
  }, [project?.id]);

  if (!project) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 md:p-6 bg-[#F4F4F4] text-[#111111] rounded-[20px] sm:rounded-[24px] border border-black/15 shadow-swiss relative overflow-hidden select-none">
      {/* Background Micro Crosshairs */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 font-mono text-[9px] sm:text-[10px] text-black/20 pointer-events-none">+</div>
      <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 font-mono text-[9px] sm:text-[10px] text-black/20 pointer-events-none">+</div>

      {/* =====================================================================
          TOP HEADER: Category (Single Line) + Title + 5-6 Word Caption
          ===================================================================== */}
      <div className="shrink-0 mb-1 sm:mb-2.5">
        {/* Single line category */}
        <div className="font-tech text-[8px] sm:text-[10px] md:text-xs font-bold text-[#EB5038] tracking-widest uppercase truncate">
          {project.category}
        </div>

        {/* Project Name */}
        <h2 className="font-extended text-base sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-[#111111] leading-tight sm:leading-none mt-0.5 sm:mt-1 truncate">
          {project.title}
        </h2>

        {/* 5-6 Words Caption */}
        <p className="font-sans text-[10px] sm:text-xs md:text-[13px] text-black/65 font-medium mt-0.5 sm:mt-1 leading-snug truncate">
          {project.caption}
        </p>
      </div>

      {/* =====================================================================
          MIDDLE: DESKTOP VIEWPORT PREVIEW (16:10 Laptop/Desktop Resolution)
          ===================================================================== */}
      <div className="flex-1 w-full min-h-0 flex flex-col justify-center my-0.5 sm:my-1 overflow-hidden">
        <div className="w-full rounded-lg sm:rounded-xl overflow-hidden border border-black/15 shadow-sm sm:shadow-md flex flex-col bg-white">
          {/* macOS Desktop Chrome Bar (Clean: 3 dots + Clean Domain Name) */}
          <div className="h-5 sm:h-7 px-2 sm:px-3 bg-[#EAEAEA] border-b border-black/10 flex items-center justify-between shrink-0 font-tech text-[8px] sm:text-[9px] text-black/70">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F56] border border-black/15" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E] border border-black/15" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27C93F] border border-black/15" />
            </div>

            {/* Clean Brand Domain (No full URL exposure) */}
            <div className="flex items-center gap-1 px-2 sm:px-3 py-0.5 bg-white rounded border border-black/10 font-mono text-[8px] sm:text-[9px] text-black/80 font-medium">
              <span className="text-[9px]">🔒</span>
              <span className="truncate">{project.displayUrl || 'portfolio.site'}</span>
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-0.5 sm:p-1 hover:bg-black/10 rounded transition-colors cursor-pointer text-black/60 hover:text-black"
              title="Open full website in new tab"
            >
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#EB5038]" />
            </a>
          </div>

          {/* Desktop Scaled Viewport Container (Aspect Ratio 16:10) */}
          <div
            ref={previewRef}
            className="w-full relative bg-[#0D0D0D] overflow-hidden aspect-[16/10] flex items-start justify-start"
          >
            {/* Real Desktop Screenshot Background */}
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            )}

            {/* Interactive Scaled Desktop Iframe */}
            {project.liveUrl && project.liveUrl.startsWith('http') && (
              <div
                style={{
                  width: '1280px',
                  height: '800px',
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
                className={`absolute top-0 left-0 pointer-events-auto transition-opacity duration-300 ${
                  iframeLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <iframe
                  key={project.id}
                  src={project.liveUrl}
                  title={project.title}
                  className="w-[1280px] h-[800px] border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="lazy"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM ACTIONS: Visit Website & Specifications (Only 2 Clean Buttons)
          ===================================================================== */}
      <div className="pt-2 sm:pt-3 border-t border-black/10 flex items-center gap-2 sm:gap-3 shrink-0">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 bg-[#111111] hover:bg-black text-white rounded-lg sm:rounded-xl font-tech text-[9px] sm:text-xs tracking-wider uppercase font-bold transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer truncate"
        >
          <span className="sm:hidden">Visit Site</span>
          <span className="hidden sm:inline">Visit Website</span>
          <ExternalLink className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0" />
        </a>

        <button
          onClick={() => setShowSpecs(true)}
          className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 bg-white hover:bg-neutral-100 text-[#111111] border border-black/20 rounded-lg sm:rounded-xl font-tech text-[9px] sm:text-xs tracking-wider uppercase font-bold transition-all hover:-translate-y-0.5 shadow-xs cursor-pointer truncate"
        >
          <Layers className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#EB5038] shrink-0" />
          <span className="sm:hidden">Specs</span>
          <span className="hidden sm:inline">Specifications</span>
        </button>
      </div>

      {/* =====================================================================
          SPECIFICATIONS MODAL OVERLAY
          ===================================================================== */}
      {showSpecs && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="w-full max-h-[90%] bg-[#F4F4F4] text-[#111111] rounded-[20px] border border-black/20 p-4 sm:p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-2.5">
              <div>
                <span className="font-tech text-[9px] sm:text-[10px] font-bold text-[#EB5038] tracking-widest uppercase">
                  {project.category}
                </span>
                <h3 className="font-extended text-lg sm:text-xl font-black text-[#111111] leading-tight">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={() => setShowSpecs(false)}
                className="p-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer text-black/70 hover:text-black"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-3 my-1">
              <div>
                <h4 className="font-tech text-[8px] sm:text-[9px] uppercase tracking-widest text-black/50 font-bold mb-1">
                  Architecture & Overview
                </h4>
                <p className="font-sans text-xs text-black/80 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.highlights && (
                <div>
                  <h4 className="font-tech text-[8px] sm:text-[9px] uppercase tracking-widest text-black/50 font-bold mb-1">
                    Core Functionality
                  </h4>
                  <div className="space-y-1">
                    {project.highlights.map((h) => (
                      <div
                        key={h}
                        className="px-2.5 py-1 bg-white rounded-lg border border-black/10 font-sans text-[11px] sm:text-xs text-black/85 flex items-center gap-2 shadow-xs"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.techStack && (
                <div>
                  <h4 className="font-tech text-[8px] sm:text-[9px] uppercase tracking-widest text-black/50 font-bold mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-black" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-white rounded-md border border-black/10 font-tech text-[9px] sm:text-[10px] text-black/80 font-semibold shadow-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-2.5 border-t border-black/10 flex items-center gap-2 mt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#111111] hover:bg-black text-white rounded-lg sm:rounded-xl font-tech text-[10px] sm:text-xs tracking-wider uppercase font-bold transition-colors cursor-pointer"
              >
                <span>Visit Website ↗</span>
              </a>
              <button
                onClick={() => setShowSpecs(false)}
                className="px-3.5 py-2 bg-white hover:bg-neutral-100 text-[#111111] border border-black/20 rounded-lg sm:rounded-xl font-tech text-[10px] sm:text-xs tracking-wider uppercase font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}