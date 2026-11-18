import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Globe,
  RotateCw,
  CheckCircle2
} from 'lucide-react';
import CardArtwork from './CardArtwork';

export default function LeftSpecCard({
  project,
  currentIndex,
  totalProjects,
  onPrev,
  onNext
}) {
  // Toggle between 'live' browser preview and 'spec' architecture breakdown
  const [viewMode, setViewMode] = useState('live'); // 'live' | 'spec'
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);

  if (!project) return null;

  const isLiveHosted = project.liveUrl && project.liveUrl.startsWith('http');

  // Trigger loading spinner whenever project or viewMode or iframeKey changes
  const handleReload = () => {
    setIframeLoading(true);
    setIframeKey((k) => k + 1);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 md:p-6 bg-[#F4F4F4] text-[#111111] rounded-[24px] border border-black/15 shadow-swiss relative overflow-hidden select-none">
      {/* Background Micro Crosshairs */}
      <div className="absolute top-3 right-3 font-mono text-[10px] text-black/25 pointer-events-none">+</div>
      <div className="absolute bottom-3 left-3 font-mono text-[10px] text-black/25 pointer-events-none">+</div>

      {/* =====================================================================
          TOP HEADER BAR: Category, Status & View Mode Toggle
          ===================================================================== */}
      <div className="flex items-center justify-between border-b border-black/10 pb-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-tech text-[10px] sm:text-xs font-bold text-[#EB5038] tracking-widest uppercase">
            {project.category}
          </span>
          <span className="text-black/30 font-mono text-xs">•</span>
          <span className="font-tech text-[10px] sm:text-xs text-black/60 font-semibold">
            {project.year}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle Switcher */}
          <div className="flex items-center p-0.5 bg-[#E6E6E6] rounded-lg border border-black/10">
            <button
              onClick={() => setViewMode('live')}
              className={`px-2 py-0.5 rounded font-tech text-[8px] font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'live'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              <Globe className="w-2.5 h-2.5" />
              <span>LIVE PREVIEW</span>
            </button>
            <button
              onClick={() => setViewMode('spec')}
              className={`px-2 py-0.5 rounded font-tech text-[8px] font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'spec'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              <Layers className="w-2.5 h-2.5" />
              <span>SPECS</span>
            </button>
          </div>

          {/* Stepper Index */}
          <div className="flex items-center gap-1 pl-1.5 border-l border-black/15">
            <span className="font-tech text-[10px] font-bold text-black/60 mr-1">
              [{String(currentIndex + 1).padStart(2, '0')}/{String(totalProjects).padStart(2, '0')}]
            </span>
            <button
              onClick={onPrev}
              className="p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer text-black/70 hover:text-black"
              title="Previous (←)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNext}
              className="p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer text-black/70 hover:text-black"
              title="Next (→)"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MIDDLE CONTENT: Title & Dynamic View (Live Hosted vs Specs)
          ===================================================================== */}
      <div className="flex-1 flex flex-col justify-between my-2 overflow-hidden">
        {/* Project Title & Tagline */}
        <div className="shrink-0 mb-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-extended text-2xl sm:text-3xl font-black tracking-tight text-[#111111] leading-none">
              {project.title}
            </h2>
            {project.status === 'published' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-tech text-[8px] font-bold tracking-wider shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE ON GITHUB
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 font-tech text-[8px] font-bold tracking-wider shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EB5038]" />
                LAB PROTOCOL
              </span>
            )}
          </div>
          <p className="font-sans text-xs sm:text-[13px] text-black/75 font-medium mt-1 leading-snug line-clamp-1">
            {project.tagline}
          </p>
        </div>

        {/* VIEW MODE 1: LIVE HOSTED BROWSER PREVIEW */}
        {viewMode === 'live' ? (
          <div className="flex-1 w-full rounded-xl overflow-hidden border border-black/15 shadow-md flex flex-col bg-white">
            {/* Browser Address Bar Chrome */}
            <div className="h-7 px-3 bg-[#EAEAEA] border-b border-black/10 flex items-center justify-between shrink-0 font-tech text-[9px] text-black/70">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/15" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/15" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/15" />
              </div>

              <div className="flex-1 mx-3 px-2 py-0.5 bg-white rounded border border-black/10 text-center truncate font-mono text-[8px] text-black/80 flex items-center justify-center gap-1">
                <span>🔒</span>
                <span className="truncate">{project.liveUrl}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReload}
                  className="p-1 hover:bg-black/10 rounded transition-colors cursor-pointer"
                  title="Reload Preview"
                >
                  <RotateCw className="w-2.5 h-2.5" />
                </button>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-black/10 rounded transition-colors cursor-pointer"
                  title="Open in Full Window"
                >
                  <ExternalLink className="w-2.5 h-2.5 text-[#EB5038]" />
                </a>
              </div>
            </div>

            {/* Live Iframe or Interactive Card Preview */}
            <div className="flex-1 w-full relative bg-[#F8F9FA] overflow-hidden">
              {isLiveHosted ? (
                <>
                  {iframeLoading && (
                    <div className="absolute inset-0 bg-[#F4F4F4]/95 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 z-10">
                      <div className="w-6 h-6 rounded-full border-2 border-black/15 border-t-[#EB5038] animate-spin" />
                      <span className="font-tech text-[8px] uppercase tracking-widest text-black/60 font-bold">
                        INITIALIZING LIVE PREVIEW...
                      </span>
                    </div>
                  )}
                  <iframe
                    key={`${project.id}-${iframeKey}`}
                    src={project.liveUrl}
                    title={project.title}
                    className="w-full h-full border-0 select-auto"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    loading="lazy"
                    onLoad={() => setIframeLoading(false)}
                  />
                </>
              ) : (
                <div className="w-full h-full p-3 flex items-center justify-center bg-black/5">
                  <div className="w-48 h-full">
                    <CardArtwork project={project} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
            /* VIEW MODE 2: IN-DEPTH ARCHITECTURE SPECIFICATION */
            <div className="flex-1 flex flex-col justify-between space-y-3 py-1">
              {/* Architecture & Approach */}
              <div>
                <h4 className="font-tech text-[10px] tracking-widest uppercase font-bold text-black/50 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#EB5038]" />
                  What We Engineered & Built
                </h4>
                <p className="font-sans text-xs sm:text-[13px] text-black/80 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Key Accomplishments Checklist */}
              {project.highlights && (
                <div>
                  <h4 className="font-tech text-[9px] tracking-widest uppercase font-bold text-black/50 mb-1.5">
                    Key Features & Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {project.highlights.map((h) => (
                      <div
                        key={h}
                        className="px-2.5 py-1 bg-white rounded-lg border border-black/10 font-sans text-xs text-black/85 flex items-center gap-1.5 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Telemetry & Performance Pill */}
              {project.metrics && (
                <div className="p-2.5 bg-[#EAEAEA] rounded-xl border border-black/10 flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[#EB5038] shrink-0" />
                  <span className="font-tech text-xs text-black/85 font-semibold">
                    {project.metrics}
                  </span>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div>
                <h4 className="font-tech text-[9px] tracking-widest uppercase font-bold text-black/50 mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-black" />
                  Production Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 bg-white rounded-md border border-black/10 font-tech text-[10px] text-black/80 font-semibold shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      {/* =====================================================================
          BOTTOM ACTIONS: Direct GitHub Button & Live Hosted Site
          ===================================================================== */}
      <div className="pt-2.5 border-t border-black/10 flex items-center gap-3 shrink-0">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#111111] hover:bg-black text-white rounded-xl font-tech text-[11px] tracking-widest uppercase font-bold transition-all hover:-translate-y-0.5 shadow-md cursor-pointer"
          >
            <Github className="w-4 h-4 text-emerald-400" />
            <span>View on GitHub</span>
          </a>
        )}

        {isLiveHosted ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white hover:bg-neutral-100 text-[#111111] border border-black/20 rounded-xl font-tech text-[11px] tracking-widest uppercase font-bold transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-[#EB5038]" />
            <span>Open Live Site ↗</span>
          </a>
        ) : (
          <div className="px-3 py-2 bg-black/5 rounded-xl border border-black/10 font-tech text-[10px] text-black/60 font-semibold tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#EB5038]" />
            <span>IN LAB // EXPERIMENT</span>
          </div>
        )}
      </div>
    </div>
  );
}
