import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Github, Check, Copy, Sparkles, Terminal, Globe, Award } from 'lucide-react';
import { designerProfile } from '../data/projects';

export default function AboutDrawer({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(designerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[92vh] bg-[#F4F4F4] text-[#111111] rounded-[24px] shadow-2xl border border-black/15 overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-[#EAEAEA]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EB5038] animate-pulse" />
              <span className="font-tech text-xs font-bold tracking-widest uppercase text-black/70">
                CREATIVE PROFILE // DOSSIER
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Top Identity Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
              <div>
                <span className="font-tech text-[10px] tracking-widest text-[#EB5038] font-bold uppercase">
                  {designerProfile.availability}
                </span>
                <h2 className="font-extended text-3xl sm:text-4xl font-black tracking-tight text-[#111111]">
                  {designerProfile.name}
                </h2>
                <p className="font-tech text-xs tracking-wider text-black/60 font-semibold mt-0.5">
                  {designerProfile.role} • {designerProfile.location}
                </p>
              </div>

              {/* Quick Action Button */}
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#EB5038] hover:bg-[#D03E27] text-white rounded-xl font-tech text-xs tracking-widest uppercase font-bold transition-transform hover:-translate-y-0.5 shadow-md cursor-pointer self-start sm:self-auto"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'EMAIL COPIED!' : 'COPY EMAIL'}</span>
              </button>
            </div>

            {/* Philosophy / Bio */}
            <div>
              <h3 className="font-tech text-xs tracking-widest uppercase font-bold text-black/50 mb-2 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#EB5038]" />
                Creative Ethos & Architecture
              </h3>
              <p className="font-sans text-sm sm:text-base text-black/80 leading-relaxed">
                {designerProfile.bio}
              </p>
            </div>

            {/* Key Telemetry Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {designerProfile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 bg-[#EAEAEA] rounded-xl border border-black/10 text-center"
                >
                  <div className="font-extended text-lg sm:text-xl font-black text-black">
                    {stat.value}
                  </div>
                  <div className="font-tech text-[8px] sm:text-[9px] text-black/60 font-semibold tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Competencies */}
            <div>
              <h3 className="font-tech text-xs tracking-widest uppercase font-bold text-black/50 mb-2 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                Technical & Design Disciplines
              </h3>
              <div className="flex flex-wrap gap-2">
                {designerProfile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white rounded-lg border border-black/10 font-tech text-xs text-black/80 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Connect Grid */}
            <div className="pt-2 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-3 font-tech text-xs">
              <span className="text-black/60">
                Direct Line: <strong className="text-black">{designerProfile.email}</strong>
              </span>

              <div className="flex items-center gap-4">
                <a
                  href={designerProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-black hover:text-[#EB5038] font-bold transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={`mailto:${designerProfile.email}`}
                  className="flex items-center gap-1.5 text-[#EB5038] hover:underline font-bold"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Message</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
