import React, { useState, useEffect, useCallback } from 'react';
import HeroHeader from './components/HeroHeader';
import LeftSpecCard from './components/LeftSpecCard';
import CenterAvatar from './components/CenterAvatar';
import VerticalCoverFlow from './components/VerticalCoverFlow';
import HorizontalCoverFlow from './components/HorizontalCoverFlow';
import AboutDrawer from './components/AboutDrawer';
import MicroGrid from './components/MicroGrid';
import { projects as allProjects, designerProfile } from './data/projects';

export default function App() {
  // Start at index 1 so cards recede both above and below on initial view
  const [currentIndex, setCurrentIndex] = useState(1);

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

      {/* ===================================================================
          STAGE: DUAL-VIEWPORT ARCHITECTURE
          1. Desktop (lg+): 3-zone balanced stage (Left Preview, Center Avatar, Right Vertical Cover Flow)
          2. Mobile (<lg): Split view (Upper Half Desktop Preview, Lower Half Horizontal Cover Flow)
          =================================================================== */}
      <section className="relative flex-1 w-full max-w-[1800px] mx-auto px-3 sm:px-6 md:px-10 py-1 sm:py-2 md:py-3 overflow-hidden">
        
        {/* DESKTOP VIEWPORT (Screen width >= 1024px) */}
        <div className="hidden lg:flex w-full h-full items-center justify-between">
          {/* Left Zone: Desktop Preview Card (~42% width) */}
          <div className="h-full w-[43%] xl:w-[41%] flex flex-col justify-center z-20">
            <LeftSpecCard project={activeProject} />
          </div>

          {/* Middle Zone: 3D Character Cutout Avatar (~18% width) */}
          <div className="w-[18%] xl:w-[20%] h-full flex items-end justify-center z-15 pointer-events-none px-2">
            <CenterAvatar onOpenAbout={() => setIsAboutOpen(true)} />
          </div>

          {/* Right Zone: Vertical 3D Cover Flow Deck (~39% width) */}
          <div className="h-full w-[39%] relative z-10 flex items-center justify-center">
            <VerticalCoverFlow
              projects={allProjects}
              currentIndex={currentIndex}
              onSelectIndex={setCurrentIndex}
            />
          </div>
        </div>

        {/* MOBILE & TABLET VIEWPORT (Screen width < 1024px) */}
        <div className="flex lg:hidden flex-col justify-between w-full h-full gap-2 overflow-hidden">
          {/* Upper Half: Desktop Preview Card */}
          <div className="w-full h-[54%] min-h-0 flex flex-col justify-center z-20">
            <LeftSpecCard project={activeProject} />
          </div>

          {/* Lower Half: Horizontal Cover Flow Carousel */}
          <div className="w-full h-[46%] min-h-0 relative z-10 flex items-center justify-center">
            <HorizontalCoverFlow
              projects={allProjects}
              currentIndex={currentIndex}
              onSelectIndex={setCurrentIndex}
            />
          </div>
        </div>

      </section>

      {/* Bottom Minimal Footer */}
      <footer className="w-full px-4 sm:px-6 md:px-10 py-1 sm:py-1.5 border-t border-black/10 flex items-center justify-between font-tech text-[8px] sm:text-[9px] text-black/40 uppercase tracking-widest shrink-0">
        <span className="font-mono text-xs text-black/30">+</span>
        <span className="font-mono text-[8px] sm:text-[9px] text-black/45 tracking-wider">PORTFOLIO</span>
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