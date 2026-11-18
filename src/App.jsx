import React, { useState, useMemo, useEffect, useCallback } from 'react';
import HeroHeader from './components/HeroHeader';
import RadialCarousel from './components/RadialCarousel';
import BottomDial from './components/BottomDial';
import ProjectModal from './components/ProjectModal';
import AboutDrawer from './components/AboutDrawer';
import MicroGrid from './components/MicroGrid';
import { projects as allProjects, designerProfile } from './data/projects';

export default function App() {
  // Start with carousel rotated so card 2 (the designer portrait) is centered at peak
  const [carouselAngle, setCarouselAngle] = useState(-45);

  // Active filter: 'all' | 'published' | 'upcoming'
  const [filter, setFilter] = useState('all');

  // Currently opened project in modal
  const [selectedProject, setSelectedProject] = useState(null);

  // About / Contact Drawer state
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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

  // Stepping navigation (for Left / Right arrow clicks or keyboard)
  const stepAmount = 22.5;

  const handlePrev = useCallback(() => {
    setCarouselAngle((prev) => prev - stepAmount);
  }, [stepAmount]);

  const handleNext = useCallback(() => {
    setCarouselAngle((prev) => prev + stepAmount);
  }, [stepAmount]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject || isAboutOpen) return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'a' || e.key === 'A') {
        setIsAboutOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isAboutOpen, handlePrev, handleNext]);

  // Modal navigation (Next / Prev project inside the modal)
  const currentModalIndex = useMemo(() => {
    if (!selectedProject) return -1;
    return filteredProjects.findIndex((p) => p.id === selectedProject.id);
  }, [selectedProject, filteredProjects]);

  const handleModalPrev = () => {
    if (currentModalIndex === -1) return;
    const prevIndex = (currentModalIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  };

  const handleModalNext = () => {
    if (currentModalIndex === -1) return;
    const nextIndex = (currentModalIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#EAEAEA] text-[#111111] select-none flex flex-col justify-between">
      {/* Subtle Background Architectural Micro-Grid */}
      <MicroGrid />

      {/* Top 40% Hero Section */}
      <HeroHeader
        designer={designerProfile}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Lower 60% Interactive Radial Project Carousel */}
      <RadialCarousel
        projects={filteredProjects}
        onSelectProject={(project) => setSelectedProject(project)}
        carouselAngle={carouselAngle}
        setCarouselAngle={setCarouselAngle}
      />

      {/* Bottom Center Anchor Dial ("ME" + Filter Switcher) */}
      <BottomDial
        onOpenAbout={() => setIsAboutOpen(true)}
        filter={filter}
        setFilter={setFilter}
        totalProjects={allProjects.length}
      />

      {/* Project Case Study Overlay Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onPrev={handleModalPrev}
          onNext={handleModalNext}
        />
      )}

      {/* About & Contact Drawer */}
      <AboutDrawer
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </main>
  );
}
