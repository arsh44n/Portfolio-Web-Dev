import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowLeft, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';
import CardArtwork from './CardArtwork';

export default function ProjectModal({ project, onClose, onPrev, onNext }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#F4F4F4] text-[#111111] rounded-[24px] shadow-2xl border border-black/15 overflow-hidden flex flex-col z-10"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-[#EAEAEA]">
            <div className="flex items-center gap-3">
              <span className="font-tech text-xs font-bold text-[#EB5038] tracking-widest uppercase">
                {project.category}
              </span>
              <span className="text-black/30 font-mono text-xs">•</span>
              <span className="font-tech text-xs text-black/60">
                {project.year}
              </span>
            </div>

            {/* Navigation & Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                className="p-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                title="Previous Project (←)"
              >
                <ArrowLeft className="w-4 h-4 text-black/70" />
              </button>
              <button
                onClick={onNext}
                className="p-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                title="Next Project (→)"
              >
                <ArrowRight className="w-4 h-4 text-black/70" />
              </button>
              <div className="w-[1px] h-4 bg-black/20 mx-1" />
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Title & Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <h2 className="font-extended text-2xl sm:text-4xl font-black tracking-tight text-[#111111]">
                {project.title}
              </h2>
              <div>
                {project.status === 'published' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-tech text-[10px] font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    PUBLISHED ON GITHUB
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-300 font-tech text-[10px] font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#EB5038]" />
                    LAB PREVIEW // UPCOMING
                  </span>
                )}
              </div>
            </div>

            {/* Tagline */}
            <p className="font-sans text-base sm:text-lg text-black/80 font-medium leading-relaxed">
              {project.tagline}
            </p>

            {/* Visual Card Artwork Showcase */}
            <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-inner border border-black/10 flex items-center justify-center bg-black/5">
              <div className="w-48 sm:w-60 h-full p-2">
                <CardArtwork project={project} />
              </div>
            </div>

            {/* Two-Column Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Left Column: Description & Architecture */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="font-tech text-xs tracking-widest uppercase font-bold text-black/50 mb-2 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#EB5038]" />
                    Architecture & Approach
                  </h4>
                  <p className="font-sans text-sm text-black/75 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.metrics && (
                  <div className="p-3 bg-[#EAEAEA] rounded-xl border border-black/10 flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-[#EB5038] shrink-0" />
                    <span className="font-tech text-xs text-black/80 font-medium">
                      {project.metrics}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Tech Stack & Actions */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-tech text-xs tracking-widest uppercase font-bold text-black/50 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-black" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white rounded-md border border-black/10 font-tech text-[10px] text-black/80 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Action Links */}
                <div className="space-y-2 pt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-black text-white rounded-xl font-tech text-xs tracking-widest uppercase font-bold transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>View on GitHub</span>
                    </a>
                  )}

                  {project.liveUrl && project.liveUrl !== '#lab-preview' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-100 text-[#111111] border border-black/20 rounded-xl font-tech text-xs tracking-widest uppercase font-bold transition-transform hover:-translate-y-0.5 shadow-sm cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-[#EB5038]" />
                      <span>Open Live Experience</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
