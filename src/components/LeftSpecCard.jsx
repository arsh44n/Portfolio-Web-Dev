import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Cpu, Layers, Sparkles, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import CardArtwork from './CardArtwork';

export default function LeftSpecCard({
  project,
  currentIndex,
  totalProjects,
  onPrev,
  onNext
}) {
  if (!project) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-7 bg-[#F4F4F4] text-[#111111] rounded-[24px] border border-black/15 shadow-swiss relative overflow-hidden select-none">
      {/* Background Micro Crosshairs */}
      <div className="absolute top-3 right-3 font-mono text-[10px] text-black/25 pointer-events-none">+</div>
      <div className="absolute bottom-3 left-3 font-mono text-[10px] text-black/25 pointer-events-none">+</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full flex flex-col justify-between"
        >
          {/* =================================================================
              TOP METADATA: Category, Year, Index & Status Badge
              ================================================================= */}
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="font-tech text-[10px] sm:text-xs font-bold text-[#EB5038] tracking-widest uppercase">
                {project.category}
              </span>
              <span className="text-black/30 font-mono text-xs">•</span>
              <span className="font-tech text-[10px] sm:text-xs text-black/60 font-semibold">
                {project.year}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Pill */}
              {project.status === 'published' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-tech text-[9px] font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  GITHUB REPO
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 font-tech text-[9px] font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EB5038]" />
                  IN LAB / RESEARCH
                </span>
              )}

              {/* Index Indicator & Quick Prev/Next buttons */}
              <div className="flex items-center gap-1 pl-2 border-l border-black/15">
                <span className="font-tech text-[10px] font-bold text-black/60 mr-1">
                  [{String(currentIndex + 1).padStart(2, '0')}/{String(totalProjects).padStart(2, '0')}]
                </span>
                <button
                  onClick={onPrev}
                  className="p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer text-black/70 hover:text-black"
                  title="Previous Project (←)"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onNext}
                  className="p-1 rounded-full hover:bg-black/10 transition-colors cursor-pointer text-black/70 hover:text-black"
                  title="Next Project (→)"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* =================================================================
              MAIN CONTENT: Title, Tagline & Visual Preview Split
              ================================================================= */}
          <div className="my-auto py-3 space-y-4">
            {/* Project Title */}
            <div>
              <h2 className="font-extended text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#111111] leading-none">
                {project.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-black/75 font-medium mt-1.5 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Middle Section: Visual Thumbnail + Architecture Details */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Visual Thumbnail */}
              <div className="sm:col-span-4 h-36 sm:h-44 rounded-xl overflow-hidden shadow-inner border border-black/10 relative bg-black/5">
                <CardArtwork project={project} />
              </div>

              {/* In-Depth Architecture Overview */}
              <div className="sm:col-span-8 flex flex-col justify-between h-full space-y-2.5">
                <div>
                  <h4 className="font-tech text-[10px] tracking-widest uppercase font-bold text-black/50 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#EB5038]" />
                    Architecture & Approach
                  </h4>
                  <p className="font-sans text-xs sm:text-[13px] text-black/80 leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                </div>

                {/* Performance Metrics Pill */}
                {project.metrics && (
                  <div className="p-2 bg-[#EAEAEA] rounded-lg border border-black/10 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-[#EB5038] shrink-0" />
                    <span className="font-tech text-[10px] text-black/80 font-medium">
                      {project.metrics}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <h4 className="font-tech text-[9px] tracking-widest uppercase font-bold text-black/50 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-black" />
                Technical Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-white rounded-md border border-black/10 font-tech text-[10px] text-black/80 font-semibold shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* =================================================================
              BOTTOM ACTIONS: Direct GitHub Button & Live Demo
              ================================================================= */}
          <div className="pt-3 border-t border-black/10 flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-black text-white rounded-xl font-tech text-[11px] tracking-widest uppercase font-bold transition-all hover:-translate-y-0.5 shadow-md cursor-pointer"
              >
                <Github className="w-4 h-4 text-emerald-400" />
                <span>Open on GitHub</span>
              </a>
            )}

            {project.liveUrl && project.liveUrl !== '#lab-preview' ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-100 text-[#111111] border border-black/20 rounded-xl font-tech text-[11px] tracking-widest uppercase font-bold transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-[#EB5038]" />
                <span>Live Experience</span>
              </a>
            ) : (
              <div className="px-3 py-2 bg-black/5 rounded-xl border border-black/10 font-tech text-[10px] text-black/60 font-semibold tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#EB5038]" />
                <span>PREVIEW COMING Q2</span>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
