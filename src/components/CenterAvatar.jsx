import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CenterAvatar({ onOpenAbout }) {
  // Interactive 3D spatial parallax tilt towards mouse coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-end select-none pointer-events-none pb-2">
      {/* Floating 3D Character Container */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transform: `rotateY(${mousePos.x * 0.7}deg) rotateX(${-mousePos.y * 0.7}deg)`,
          perspective: 1000,
        }}
        className="relative z-20 flex flex-col items-center justify-end h-[85%] max-h-[520px] transition-transform duration-150 ease-out pointer-events-auto cursor-pointer group"
        onClick={onOpenAbout}
        title="Creator 3D Avatar (Click to open Dossier)"
      >
        {/* Top Floating Telemetry Tag */}
        <div className="mb-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/15 shadow-sm flex items-center gap-2 font-tech text-[8px] sm:text-[9px] text-[#111111] font-bold tracking-widest uppercase group-hover:border-[#EB5038] transition-colors shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>ARSHAAN // 3D TWIN</span>
          <span className="text-black/30 font-mono">•</span>
          <span className="text-[#EB5038]">FOUNDER</span>
        </div>

        {/* The 3D Character Cutout Image */}
        <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 h-[380px] sm:h-[440px] md:h-[480px] flex items-end justify-center">
          <img
            src="./assets/creator_avatar.png"
            onError={(e) => {
              e.currentTarget.src = './assets/avatar_raw.jpg';
            }}
            alt="Creator 3D Avatar"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_16px_28px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-103"
          />

          {/* Interactive Hover Pill on Avatar */}
          <div className="absolute bottom-4 inset-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
            <span className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-md text-white font-tech text-[8px] sm:text-[9px] font-bold tracking-widest uppercase shadow-lg border border-white/20">
              VIEW DOSSIER ↗
            </span>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Ground Contact Shadow */}
      <motion.div
        animate={{
          scale: [1, 0.92, 1],
          opacity: [0.35, 0.24, 0.35],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-40 sm:w-52 md:w-60 h-4 rounded-full bg-black/40 blur-md -mt-2 z-10 pointer-events-none"
      />
    </div>
  );
}
