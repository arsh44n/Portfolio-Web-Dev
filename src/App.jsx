import React, { useState, useMemo, useEffect, useCallback } from 'react';
import HeroHeader from './components/HeroHeader';
import LeftSpecCard from './components/LeftSpecCard';
import CenterAvatar from './components/CenterAvatar';
import SweepingArcCarousel from './components/SweepingArcCarousel';
import AboutDrawer from './components/AboutDrawer';
import MicroGrid from './components/MicroGrid';
import { projects as allProjects, designerProfile } from './data/projects';

export default function App() {
  // Start with active card 0 centered in the circular arc sweep (~50 degrees)
  const [carouselAngle, setCarouselAngle] = useState(50);

  // Active filter: 'all' | 'published' | 'upcoming'
  const [filter, setFilter] = useState('all');

  // Mobile active tab view: 'specs' | 'deck'
  const [mobileTab, setMobileTab] = useState('specs');

  // Filtered projects list
  const filteredProjects = useMemo(() => {
    if (filter === 'published') {
      return allProjects.filter((p) => p.status === 'published');
    }
    if (filter === 'upcoming') {
      return allProjects.filter((p) => p.status === 'upcoming');
    }
    return allProjects;
  }, [filter]);

  // Active project displayed in Left Specification Card
  const [activeProject, setActiveProject] = useState(allProjects[0]);

  // Sync active project if filter changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const exists = filteredProjects.some((p) => p.id === activeProject?.id);
      if (!exists) {
        setActiveProject(filteredProjects[0]);
      }
    }
  }, [filteredProjects, activeProject]);

  // About / Dossier Drawer state
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Active project index
  const currentIndex = useMemo(() => {
    if (!activeProject) return 0;
    const idx = filteredProjects.findIndex((p) => p.id === activeProject.id);
    return idx >= 0 ? idx : 0;
  }, [activeProject, filteredProjects]);

  // Stepping navigation (Next / Prev)
  const handlePrev = useCallback(() => {
    if (filteredProjects.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveProject(filteredProjects[prevIdx]);
    setCarouselAngle((prev) => prev - 36);
  }, [currentIndex, filteredProjects]);

  const handleNext = useCallback(() => {
    if (filteredProjects.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredProjects.length;
    setActiveProject(filteredProjects[nextIdx]);
    setCarouselAngle((prev) => prev + 36);
  }, [currentIndex, filteredProjects]);

  // Keyboard shortcuts
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
        filter={filter}
        setFilter={setFilter}
        totalProjects={allProjects.length}
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
          EXPLORE DECK
        </button>
      </div>

      {/* ===================================================================
          STAGE: 3-ZONE BALANCED STAGE
          1. Left: Specification Card (~36% width)
          2. Middle: 3D Character Avatar in transparent PNG (~20% width)
          3. Right & Mid-Bottom: Sweeping Circular Arc Carousel (~44% width)
          =================================================================== */}
      <section className="relative flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-6 md:px-10 py-2 sm:py-3 flex items-center justify-between overflow-hidden">
        {/* Left Zone: Project Specification Card */}
        <div
          className={`h-full w-full lg:w-[38%] xl:w-[36%] flex flex-col justify-center z-20 transition-opacity duration-300 ${
            mobileTab === 'specs' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <LeftSpecCard
            project={activeProject}
            currentIndex={currentIndex}
            totalProjects={filteredProjects.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>

        {/* Middle Zone: 3D Character Cutout Avatar */}
        <div className="hidden lg:flex lg:w-[22%] xl:w-[20%] h-full items-end justify-center z-15 pointer-events-none px-2">
          <CenterAvatar onOpenAbout={() => setIsAboutOpen(true)} />
        </div>

        {/* Right Zone: Sweeping Circular Arc Carousel */}
        <div
          className={`h-full w-full lg:w-[40%] xl:w-[44%] relative z-10 transition-opacity duration-300 ${
            mobileTab === 'deck' ? 'block' : 'hidden lg:block'
          }`}
        >
          <SweepingArcCarousel
            projects={filteredProjects}
            activeProject={activeProject}
            onSelectProject={(project) => {
              setActiveProject(project);
              // On mobile, auto-switch to specs on card click
              if (window.innerWidth < 1024) {
                setMobileTab('specs');
              }
            }}
            carouselAngle={carouselAngle}
            setCarouselAngle={setCarouselAngle}
          />
        </div>
      </section>

      {/* Bottom Footer Status Bar */}
      <footer className="w-full px-6 md:px-10 py-1.5 border-t border-black/10 flex items-center justify-between font-tech text-[8px] sm:text-[9px] text-black/50 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>STAGE ACTIVE // 60FPS</span>
        </div>
        <div className="hidden sm:block">
          SCRUB CIRCULAR ARC FROM MID-RIGHT TO MIDDLE-BOTTOM • CLICK ANY CARD TO INSPECT
        </div>
        <div>
          <span>SWISS PRECISION KINETICS</span>
        </div>
      </footer>

      {/* About & Creative Dossier Drawer */}
      <AboutDrawer
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </main>
  );
}
