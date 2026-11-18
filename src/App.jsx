import React, { useState, useMemo, useEffect, useCallback } from 'react';
import HeroHeader from './components/HeroHeader';
import LeftSpecCard from './components/LeftSpecCard';
import CenterAvatar from './components/CenterAvatar';
import VerticalCoverFlow from './components/VerticalCoverFlow';
import AboutDrawer from './components/AboutDrawer';
import MicroGrid from './components/MicroGrid';
import { projects as allProjects, designerProfile } from './data/projects';

export default function App() {
  // Start at index 1 so cards recede both above and below on initial view
  const [currentIndex, setCurrentIndex] = useState(1);

  // Mobile active tab view: 'specs' | 'deck'
  const [mobileTab, setMobileTab] = useState('specs');

  const activeProject = allProjects[currentIndex] || allProjects[0];

  // About / Dossier Drawer state
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Stepping navigation (Next / Prev)
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < allProjects.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAboutOpen) return;

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'a' || e.key === 'A') {
        setIsAboutOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAboutOpen, handlePrev, handleNext]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#EAEAEA] text-[#111111] select-none flex flex-col justify-between">
      {/* Background Architectural Micro-Grid Crosshairs */}
      <MicroGrid />

      {/* Top Hero Section */}
      <HeroHeader
        designer={designerProfile}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Mobile Tab Switcher (Visible on small screens) */}
      <div className="lg:hidden w-full px-6 py-1 flex items-center justify-center gap-2 z-30 shrink-0">
        <button
          onClick={() => setMobileTab('specs')}
          className={`px-4 py-1.5 rounded-full font-tech text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer ${
            mobileTab === 'specs'
              ? 'bg-[#111111] text-white shadow-sm'
              : 'bg-white/80 text-black/70 hover:bg-white'
          }`}
        >
          PROJECT SPECS
        </button>
        <button
          onClick={() => setMobileTab('deck')}
          className={`px-4 py-1.5 rounded-full font-tech text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer ${
            mobileTab === 'deck'
              ? 'bg-[#EB5038] text-white shadow-sm'
              : 'bg-white/80 text-black/70 hover:bg-white'
          }`}
        >
          COVER FLOW DECK
        </button>
      </div>

      {/* ===================================================================
          STAGE: 3-ZONE BALANCED STAGE
          1. Left: Specification Card with Live Hosted Preview (~42% width)
          2. Middle: 3D Character Avatar in transparent PNG (~20% width)
          3. Right: Vertical 3D Cover Flow Stack (~38% width)
          =================================================================== */}
      <section className="relative flex-1 w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 py-2 sm:py-3 flex items-center justify-between overflow-hidden">
        {/* Left Zone: Project Specification Card with Live Hosted View */}
        <div
          className={`h-full w-full lg:w-[44%] xl:w-[42%] flex flex-col justify-center z-20 transition-opacity duration-300 ${
            mobileTab === 'specs' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <LeftSpecCard project={activeProject} />
        </div>

        {/* Middle Zone: 3D Character Cutout Avatar */}
        <div className="hidden lg:flex lg:w-[18%] xl:w-[20%] h-full items-end justify-center z-15 pointer-events-none px-2">
          <CenterAvatar onOpenAbout={() => setIsAboutOpen(true)} />
        </div>

        {/* Right Zone: Vertical 3D Cover Flow Deck */}
        <div
          className={`h-full w-full lg:w-[38%] xl:w-[38%] relative z-10 transition-opacity duration-300 flex items-center justify-center ${
            mobileTab === 'deck' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <VerticalCoverFlow
            projects={allProjects}
            currentIndex={currentIndex}
            onSelectIndex={(newIdx) => {
              setCurrentIndex(newIdx);
              if (window.innerWidth < 1024) {
                setMobileTab('specs');
              }
            }}
          />
        </div>
      </section>

      {/* Bottom Minimal Footer */}
      <footer className="w-full px-6 md:px-10 py-1.5 border-t border-black/10 flex items-center justify-between font-tech text-[9px] text-black/40 uppercase tracking-widest shrink-0">
        <span className="font-mono text-xs text-black/30">+</span>
        <span className="font-mono text-[9px] text-black/45 tracking-wider">PORTFOLIO</span>
        <span className="font-mono text-xs text-black/30">+</span>
      </footer>

      {/* About & Creative Dossier Drawer */}
      <AboutDrawer
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </main>
  );
}
