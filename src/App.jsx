import React, { useState, useMemo, useEffect, useCallback } from 'react';
import HeroHeader from './components/HeroHeader';
import LeftSpecCard from './components/LeftSpecCard';
import RightSpiralCarousel from './components/RightSpiralCarousel';
import AboutDrawer from './components/AboutDrawer';
import MicroGrid from './components/MicroGrid';
import { projects as allProjects, designerProfile } from './data/projects';

export default function App() {
  // Carousel angular rotation in degrees
  const [carouselAngle, setCarouselAngle] = useState(0);

  // Active filter: 'all' | 'published' | 'upcoming'
  const [filter, setFilter] = useState('all');

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

  // Currently active project displayed in the Left Specification Card
  const [activeProject, setActiveProject] = useState(allProjects[0]);

  // Keep active project valid when filter changes
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
    setCarouselAngle((prev) => prev - 21);
  }, [currentIndex, filteredProjects]);

  const handleNext = useCallback(() => {
    if (filteredProjects.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredProjects.length;
    setActiveProject(filteredProjects[nextIdx]);
    setCarouselAngle((prev) => prev + 21);
  }, [currentIndex, filteredProjects]);

  // Keyboard navigation
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
      {/* Subtle Background Architectural Micro-Grid Crosshairs */}
      <MicroGrid />

      {/* Top Hero Section: "WELCOME TO MY", Kinetic PORTFOLIO, Metadata */}
      <HeroHeader
        designer={designerProfile}
        onOpenAbout={() => setIsAboutOpen(true)}
        filter={filter}
        setFilter={setFilter}
        totalProjects={allProjects.length}
      />

      {/* ===================================================================
          DUAL-STAGE INTERACTIVE WORKBENCH:
          - Left: Permanent Project Specifications & Architecture Showcase
          - Right: Kinetic Spiral Carousel revolving along the right vertical arc
          =================================================================== */}
      <section className="relative flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-3 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 overflow-hidden">
        {/* Left Side: Specification Card (5 cols on large screens, 45% width) */}
        <div className="lg:col-span-5 xl:col-span-5 h-full flex flex-col justify-center z-20">
          <LeftSpecCard
            project={activeProject}
            currentIndex={currentIndex}
            totalProjects={filteredProjects.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>

        {/* Right Side: Kinetic Spiral Deck (7 cols on large screens, 55% width) */}
        <div className="lg:col-span-7 xl:col-span-7 h-full relative z-10">
          <RightSpiralCarousel
            projects={filteredProjects}
            activeProject={activeProject}
            onSelectProject={(project) => setActiveProject(project)}
            carouselAngle={carouselAngle}
            setCarouselAngle={setCarouselAngle}
          />
        </div>
      </section>

      {/* Bottom Footer Status Bar */}
      <footer className="w-full px-6 md:px-10 py-2 border-t border-black/10 flex items-center justify-between font-tech text-[8px] sm:text-[9px] text-black/50 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>STAGE ACTIVE // 60FPS</span>
        </div>
        <div className="hidden sm:block">
          USE MOUSE WHEEL OR DRAG CAROUSEL TO SCRUB • CLICK ANY CARD TO INSPECT
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
