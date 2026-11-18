import React from 'react';

/**
 * High-fidelity artwork renderer matching the exact visual references:
 * 1. cosmic-eye: Glowing bioluminescent fractal nebula eye on dark cosmic backdrop
 * 2. coral-mark: Vibrant coral-red with the iconic black clover-eye graphic symbol
 * 3. monochrome-portrait: Avant-garde grayscale designer portrait with DVS X2X4 stamp
 * 4. polestar-spec: White futuristic automotive 1:1 poster with hypercar and technical specs
 * 5. casino-royale: Deep noir card with optical guilloche lace and 007 typography
 * 6. spatial-vision: Holographic frosted glass UI with futuristic glowing reticles
 * 7. neural-mesh: Cybernetic green vector field with agentic DAG nodes
 * 8. audio-synth: Kinetic waveform typography with purple harmonic ripples
 */
export default function CardArtwork({ project }) {
  const { visualTheme } = project;

  // 1. COSMIC EYE (Blue generative iris)
  if (visualTheme === 'cosmic-eye') {
    return (
      <div className="w-full h-full relative bg-[#04060B] flex items-center justify-center overflow-hidden rounded-[20px]">
        {/* Soft volumetric blue core vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.35)_0%,rgba(14,165,233,0.15)_45%,transparent_75%)]" />

        {/* Generative fractal iris flower */}
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
          {/* Ambient outer bloom */}
          <div className="absolute inset-4 rounded-full bg-cyan-500/25 blur-2xl animate-pulse" />

          <svg className="w-full h-full" viewBox="0 0 220 220" fill="none">
            <defs>
              <radialGradient id="irisCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#BAE6FD" />
                <stop offset="55%" stopColor="#0284C7" />
                <stop offset="85%" stopColor="#031525" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
              <filter id="bloom">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Delicate nested ray ellipses creating floral mandala */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 360) / 36;
              return (
                <ellipse
                  key={i}
                  cx="110"
                  cy="110"
                  rx="84"
                  ry="13"
                  transform={`rotate(${angle} 110 110)`}
                  stroke="#38BDF8"
                  strokeWidth="0.8"
                  strokeOpacity="0.65"
                  fill="none"
                />
              );
            })}

            {/* Inner secondary geometric rings */}
            <circle cx="110" cy="110" r="62" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.8" />
            <circle cx="110" cy="110" r="48" stroke="#38BDF8" strokeWidth="1.8" opacity="0.9" filter="url(#bloom)" />
            <circle cx="110" cy="110" r="34" fill="url(#irisCore)" filter="url(#bloom)" />
            <circle cx="110" cy="110" r="18" fill="#020617" />
            <circle cx="110" cy="110" r="13" fill="#FFFFFF" opacity="0.95" />
            <circle cx="106" cy="106" r="3.5" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Technical corner indicators */}
        <div className="absolute top-4 left-4 font-tech text-[9px] text-blue-300/80 tracking-widest">
          SYS.01 // GLSL
        </div>
        <div className="absolute top-4 right-4 flex gap-1.5 items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end border-t border-blue-900/40 pt-2 font-tech">
          <span className="text-[8px] text-blue-200/60 uppercase">IRIS_FREQ // 432Hz</span>
          <span className="text-[8px] text-cyan-400 font-bold">120 FPS</span>
        </div>
      </div>
    );
  }

  // 2. CORAL MARK (Iconic red card with black clover eye mark)
  if (visualTheme === 'coral-mark') {
    return (
      <div className="w-full h-full relative bg-[#EB5038] flex flex-col items-center justify-between p-6 overflow-hidden rounded-[20px]">
        {/* Subtle architectural micro-dot grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] [background-size:18px_18px]" />

        {/* Top center triangle marker */}
        <div className="w-full flex justify-center z-10">
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-black" />
        </div>

        {/* Center iconic clover-eye emblem */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <svg className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-md" viewBox="0 0 160 160" fill="none">
            {/* Organic 4-lobed cloud clover boundary */}
            <path
              d="M 80 20 
                 C 94 20, 104 30, 110 40 
                 C 122 34, 136 38, 142 50 
                 C 148 62, 144 76, 136 86 
                 C 146 94, 148 108, 140 118 
                 C 130 128, 116 126, 106 120 
                 C 98 130, 86 138, 74 138 
                 C 60 138, 50 130, 44 120 
                 C 32 124, 18 120, 12 108 
                 C 6 96 10 82 20 74 
                 C 12 64 14 48 26 40 
                 C 38 32, 52 36, 60 44 
                 C 68 30, 74 20, 80 20 Z"
              fill="#111111"
            />
            {/* Inner coral cutout */}
            <path
              d="M 80 36 
                 C 90 36, 98 44, 102 52 
                 C 112 47, 122 50, 128 60 
                 C 134 70, 130 80, 124 88 
                 C 132 94, 132 104, 126 112 
                 C 118 120, 108 118, 100 114 
                 C 94 122, 84 128, 74 128 
                 C 64 128, 56 122, 52 114 
                 C 42 118, 30 114, 26 106 
                 C 22 98, 24 88, 32 82 
                 C 26 74, 28 62, 38 56 
                 C 48 50, 58 53, 64 60 
                 C 70 48, 74 36, 80 36 Z"
              fill="#EB5038"
            />
            {/* Center black eye */}
            <ellipse cx="80" cy="80" rx="22" ry="14" fill="#111111" />
            <circle cx="80" cy="80" r="7" fill="#EB5038" />
            <circle cx="80" cy="80" r="3.5" fill="#111111" />
          </svg>
        </div>

        {/* Bottom micro-dot indicator */}
        <div className="w-full flex justify-between items-center z-10 px-2 font-tech text-[9px] text-black/85 font-bold uppercase tracking-widest">
          <span>META // 02</span>
          <div className="w-2.5 h-2.5 rounded-full bg-black" />
          <span>EST. 2025</span>
        </div>
      </div>
    );
  }

  // 3. MONOCHROME PORTRAIT (DVS X2X4)
  if (visualTheme === 'monochrome-portrait') {
    return (
      <div className="w-full h-full relative bg-[#E0E0E0] flex flex-col justify-between overflow-hidden rounded-[20px] text-[#111111]">
        {/* Top header markings */}
        <div className="relative z-10 flex justify-between items-start p-5">
          <div className="font-tech text-[9px] tracking-widest font-bold text-black/80">
            DVS // ARCHIVE
          </div>
          <div className="text-right">
            <div className="font-extended text-base font-black tracking-tight leading-none">DVS</div>
            <div className="font-tech text-[9px] tracking-widest font-bold text-black/60">X2X4</div>
          </div>
        </div>

        {/* High-contrast stylish designer silhouette with sunglasses */}
        <div className="absolute inset-0 flex items-center justify-center pt-6">
          <svg className="w-full h-full" viewBox="0 0 240 320" fill="none">
            <defs>
              <linearGradient id="faceShade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9C9C9" />
                <stop offset="40%" stopColor="#9E9E9E" />
                <stop offset="100%" stopColor="#4A4A4A" />
              </linearGradient>
              <linearGradient id="jacketShade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#181818" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>
            </defs>

            {/* Jaw & Face */}
            <path
              d="M120 75 C82 75 78 110 78 150 C78 190 98 220 120 220 C142 220 162 190 162 150 C162 110 158 75 120 75 Z"
              fill="url(#faceShade)"
            />

            {/* Angular swept hair */}
            <path
              d="M74 125 C70 95 86 65 120 60 C154 55 168 85 166 120 C154 90 138 80 120 80 C98 80 82 98 74 125 Z"
              fill="#111111"
            />

            {/* Angular Sunglasses with crisp reflection */}
            <rect x="84" y="125" width="32" height="19" rx="2" fill="#0A0A0A" />
            <rect x="124" y="125" width="32" height="19" rx="2" fill="#0A0A0A" />
            <line x1="116" y1="132" x2="124" y2="132" stroke="#0A0A0A" strokeWidth="3" />
            {/* White/Silver edge highlight reflection */}
            <polygon points="86,127 100,127 91,141" fill="#FFFFFF" opacity="0.45" />
            <polygon points="126,127 140,127 131,141" fill="#FFFFFF" opacity="0.45" />

            {/* Collar, Neck & Jacket */}
            <path d="M40 320 L58 235 L102 225 L120 265 L138 225 L182 235 L200 320 Z" fill="url(#jacketShade)" />
            <polygon points="102,225 120,265 92,245" fill="#2E2E2E" />
            <polygon points="138,225 120,265 148,245" fill="#161616" />
          </svg>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex justify-between items-center text-white font-tech text-[9px] tracking-widest">
          <span>PORTRAIT // TOKYO</span>
          <span className="text-[#EB5038] font-bold">MONOCHROME</span>
        </div>
      </div>
    );
  }

  // 4. POLESTAR SPEC (Futuristic White Automotive Poster 1:1)
  if (visualTheme === 'polestar-spec') {
    return (
      <div className="w-full h-full relative bg-[#FAFAFA] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-[#111111] border border-black/10">
        {/* Top Header */}
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-1">
            <span className="font-tech text-[10px] tracking-widest uppercase font-bold text-black/70">
              Polestar
            </span>
            <span className="font-mono text-xs font-bold tracking-widest text-[#111111]">✦ 1:1</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="font-extended text-3xl font-black tracking-tight leading-none text-black">
              1:1
            </div>
            <div className="font-tech text-[8px] text-right text-black/60 font-medium">
              CHASSIS SPEC<br />AERODYNAMIC // EV
            </div>
          </div>
        </div>

        {/* Sleek hypercar rendering */}
        <div className="relative my-auto flex items-center justify-center">
          <svg className="w-full h-36" viewBox="0 0 220 120" fill="none">
            <defs>
              <linearGradient id="bodySilver" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#E4E4E7" />
                <stop offset="100%" stopColor="#A1A1AA" />
              </linearGradient>
            </defs>

            {/* Soft ground contact shadow */}
            <ellipse cx="110" cy="100" rx="88" ry="12" fill="#000000" opacity="0.22" filter="blur(4px)" />

            {/* Rear wheel */}
            <ellipse cx="58" cy="86" rx="16" ry="13" fill="#18181B" stroke="#71717A" strokeWidth="2" />
            <circle cx="58" cy="86" r="5" fill="#E4E4E7" />

            {/* Front wheel */}
            <ellipse cx="170" cy="74" rx="14" ry="11" fill="#18181B" stroke="#71717A" strokeWidth="2" />
            <circle cx="170" cy="74" r="4" fill="#E4E4E7" />

            {/* Sleek Low-slung Cockpit & Aero Shell */}
            <path
              d="M32 82 C38 68 62 60 90 56 C124 52 158 54 188 64 C198 68 202 78 192 84 C175 90 125 94 62 92 C42 90 28 88 32 82 Z"
              fill="url(#bodySilver)"
              stroke="#52525B"
              strokeWidth="0.8"
            />
            {/* Dark glass canopy */}
            <path
              d="M72 58 C84 44 116 40 144 44 C158 48 168 54 162 60 C140 57 105 55 72 58 Z"
              fill="#0F172A"
            />
            {/* LED Headlight Strips */}
            <line x1="36" y1="80" x2="50" y2="78" stroke="#38BDF8" strokeWidth="2" />
            <line x1="188" y1="68" x2="198" y2="72" stroke="#EB5038" strokeWidth="2" />

            {/* Red measurement reticle */}
            <circle cx="110" cy="64" r="14" stroke="#EB5038" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="110" y1="46" x2="110" y2="82" stroke="#EB5038" strokeWidth="0.6" />
            <line x1="92" y1="64" x2="128" y2="64" stroke="#EB5038" strokeWidth="0.6" />
          </svg>
        </div>

        {/* Technical Footer */}
        <div className="relative z-10 pt-2 border-t border-black/15 font-tech text-[8px] text-black/70">
          <div className="flex justify-between items-center mb-1">
            <span className="tracking-widest font-bold uppercase">— JEROEN CLAUS</span>
            <span className="font-mono text-black font-bold">100% ELECTRIC</span>
          </div>
          <div className="flex justify-between text-[7px] text-black/50">
            <span>POLESTAR // CONCEPT_01</span>
            <span>SCALE RATIO: 1:1</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. CASINO ROYALE (Noir rosette silhouette)
  if (visualTheme === 'casino-royale') {
    return (
      <div className="w-full h-full relative bg-[#0C0C0C] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white">
        {/* Top Technical marking */}
        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-white/60">
          <span>007 EDITION</span>
          <span className="text-[#D97706] font-bold">CLASSIFIED</span>
        </div>

        {/* Center Circular Lace Portrait */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          <div className="relative w-38 h-38 rounded-full border border-white/20 p-2 flex items-center justify-center">
            {/* Guilloche border rosette */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/50 animate-spin-slow" />

            <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden flex items-center justify-center relative">
              <svg className="w-28 h-28 object-cover" viewBox="0 0 100 100" fill="none">
                <path
                  d="M50 25 C40 25 35 35 35 50 C35 65 42 75 50 75 C58 75 65 65 65 50 C65 35 60 25 50 25 Z"
                  fill="#E4E4E7"
                />
                <path
                  d="M32 95 C35 70 42 60 50 60 C58 60 65 70 68 95 Z"
                  fill="#000000"
                />
                <circle cx="50" cy="58" r="3" fill="#D97706" />
                <path d="M40 38 Q50 45 60 38" stroke="#111111" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom vertical typography */}
        <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-2 font-tech">
          <div>
            <div className="text-[11px] font-black tracking-widest text-amber-500">CASINO ROYALE</div>
            <div className="text-[8px] text-white/50 tracking-wider">MI6 // ARCHIVE NO. 007</div>
          </div>
          <span className="font-extended text-sm font-black text-white/90">007</span>
        </div>
      </div>
    );
  }

  // 6. SPATIAL VISION
  if (visualTheme === 'spatial-vision') {
    return (
      <div className="w-full h-full relative bg-[#090D16] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-cyan-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-transparent to-blue-950/60" />

        <div className="relative z-10 flex justify-between font-tech text-[9px] text-cyan-400 tracking-widest">
          <span>SPATIAL LAB</span>
          <span className="bg-cyan-500/20 px-2 py-0.5 rounded text-[8px] text-cyan-300 font-bold">UPCOMING</span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <div className="relative w-36 h-28">
            <div className="absolute inset-0 bg-cyan-400/10 backdrop-blur-md rounded-xl border border-cyan-400/40 transform -rotate-6 shadow-lg shadow-cyan-500/20" />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl border border-white/50 transform rotate-3 flex flex-col p-3 justify-between">
              <div className="flex justify-between items-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-tech text-[8px] text-cyan-200">GAZE TRACK</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-3/4 bg-white/60 rounded-full" />
                <div className="h-1.5 w-1/2 bg-cyan-400/80 rounded-full" />
              </div>
              <div className="flex justify-between font-tech text-[7px] text-white/70">
                <span>DEPTH: 0.85m</span>
                <span>Z-INDEX 3D</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 font-tech text-[8px] text-cyan-300/80 flex justify-between border-t border-cyan-800/40 pt-2">
          <span>VISION OS // WEBGPU</span>
          <span>EST. Q2 2026</span>
        </div>
      </div>
    );
  }

  // 7. NEURAL MESH
  if (visualTheme === 'neural-mesh') {
    return (
      <div className="w-full h-full relative bg-[#07130F] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-emerald-500/30">
        <div className="relative z-10 flex justify-between font-tech text-[9px] text-emerald-400 tracking-widest">
          <span>AGENTIC DAG</span>
          <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[8px] text-emerald-300 font-bold">IN LAB</span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-36 h-28" viewBox="0 0 160 120" fill="none">
            <path d="M20 60 L60 30 L100 45 L140 60" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
            <path d="M20 60 L60 90 L100 75 L140 60" stroke="#10B981" strokeWidth="1.5" opacity="0.7" />
            <circle cx="20" cy="60" r="8" fill="#10B981" />
            <circle cx="60" cy="30" r="6" fill="#34D399" />
            <circle cx="60" cy="90" r="6" fill="#34D399" />
            <circle cx="100" cy="45" r="7" fill="#6EE7B7" />
            <circle cx="100" cy="75" r="7" fill="#6EE7B7" />
            <circle cx="140" cy="60" r="9" fill="#10B981" />
          </svg>
        </div>

        <div className="relative z-10 font-tech text-[8px] text-emerald-400/80 flex justify-between border-t border-emerald-800/40 pt-2">
          <span>MULTI-AGENT COGNITION</span>
          <span>AUTONOMOUS</span>
        </div>
      </div>
    );
  }

  // 8. AUDIO SYNTH
  return (
    <div className="w-full h-full relative bg-[#13091F] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-purple-500/30">
      <div className="relative z-10 flex justify-between font-tech text-[9px] text-purple-400 tracking-widest">
        <span>AUDIO SYNTH</span>
        <span className="bg-purple-500/20 px-2 py-0.5 rounded text-[8px] text-purple-300 font-bold">ALPHA</span>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-center">
        <svg className="w-36 h-28" viewBox="0 0 160 100" fill="none">
          <path
            d="M10 50 Q 30 10, 50 50 T 90 50 T 130 50 T 150 50"
            stroke="#C084FC"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M10 50 Q 30 80, 50 50 T 90 50 T 130 50 T 150 50"
            stroke="#A855F7"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            fill="none"
          />
          <circle cx="50" cy="50" r="4" fill="#E9D5FF" />
          <circle cx="90" cy="50" r="4" fill="#E9D5FF" />
        </svg>
      </div>

      <div className="relative z-10 font-tech text-[8px] text-purple-400/80 flex justify-between border-t border-purple-800/40 pt-2">
        <span>OSCILLATOR 808</span>
        <span>KINETIC VIBE</span>
      </div>
    </div>
  );
}
