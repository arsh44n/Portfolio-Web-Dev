import React from 'react';

/**
 * High-fidelity artwork renderer for Arshaan's real project portfolio:
 * 1. battle-park: Court green & neon padel racket with 8PM Cup markings
 * 2. indian-celebritie: Haute parfumerie gold bottle with Fifty Shades typography
 * 3. paddle-store: Carbon fiber weave padel racket with tournament specs
 * 4. pickleads: Digital padel court isometric booking matrix
 * 5. padel-ae: UAE desert ember gradient with Dubai court directory telemetry
 * 6. aurix-one: Audiophile crimson & graphite 3D exploded acoustic drivers
 * 7. coral-mark: MetaMinds coral red clover eye insignia
 * 8. neural-mesh: Autonomous cognitive agentic DAG network
 */
export default function CardArtwork({ project }) {
  const { visualTheme } = project;

  // 1. BATTLE PARK INDIA (Premier Pickleball & Night Sports)
  if (visualTheme === 'battle-park') {
    return (
      <div className="w-full h-full relative bg-[#0B2516] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-emerald-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.25)_0%,transparent_60%)]" />

        <div className="relative z-10 flex justify-between items-center font-tech text-[9px] tracking-widest text-emerald-400">
          <span>DELHI // SAKET</span>
          <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[8px] text-emerald-300 font-bold">8PM CUP</span>
        </div>

        {/* Center Padel Racket & Court Lines */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-36 h-36" viewBox="0 0 160 160" fill="none">
            {/* Court Grid */}
            <rect x="25" y="20" width="110" height="120" rx="6" stroke="#22C55E" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
            <line x1="80" y1="20" x2="80" y2="140" stroke="#22C55E" strokeWidth="1" opacity="0.4" />
            <line x1="25" y1="80" x2="135" y2="80" stroke="#22C55E" strokeWidth="1.5" opacity="0.6" />

            {/* Padel Racket Silhouette */}
            <circle cx="80" cy="72" r="32" fill="#14532D" stroke="#4ADE80" strokeWidth="2.5" />
            {/* Padel Holes */}
            {[-12, 0, 12].map((x) =>
              [-12, 0, 12].map((y) => (
                <circle key={`${x}-${y}`} cx={80 + x} cy={72 + y} r="2.5" fill="#22C55E" />
              ))
            )}
            {/* Handle */}
            <rect x="75" y="104" width="10" height="32" rx="3" fill="#166534" stroke="#4ADE80" strokeWidth="1.5" />
            {/* Tennis/Pickleball Ball */}
            <circle cx="118" cy="50" r="9" fill="#D4F03C" />
            <path d="M112 45 Q118 50 124 45" stroke="#14532D" strokeWidth="1.2" fill="none" />
            <path d="M112 55 Q118 50 124 55" stroke="#14532D" strokeWidth="1.2" fill="none" />
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-emerald-900/60 pt-2 font-tech">
          <div>
            <div className="text-[11px] font-black tracking-widest text-emerald-300">BATTLE PARK</div>
            <div className="text-[8px] text-emerald-400/60">6-MATCH GUARANTEED</div>
          </div>
          <span className="font-extended text-xs font-black text-[#D4F03C]">100% LIVE</span>
        </div>
      </div>
    );
  }

  // 2. INDIAN CELEBRITIE (Luxury Fragrance House)
  if (visualTheme === 'indian-celebritie') {
    return (
      <div className="w-full h-full relative bg-[#120B06] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.22)_0%,transparent_65%)]" />

        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-amber-400">
          <span>HAUTE PARFUM</span>
          <span className="text-amber-200/80">PURE OIL</span>
        </div>

        {/* Perfume Bottle Silhouette */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-32 h-40" viewBox="0 0 120 160" fill="none">
            {/* Cap */}
            <rect x="46" y="18" width="28" height="24" rx="2" fill="#D97706" stroke="#FDE68A" strokeWidth="1.5" />
            {/* Neck */}
            <rect x="52" y="42" width="16" height="10" fill="#78350F" />
            {/* Body */}
            <rect x="30" y="52" width="60" height="90" rx="8" fill="#451A03" stroke="#F59E0B" strokeWidth="2" />
            {/* Liquid inside */}
            <path d="M34 95 Q60 88 86 95 L86 136 Q60 138 34 136 Z" fill="#D97706" opacity="0.75" />
            {/* Label on bottle */}
            <rect x="40" y="70" width="40" height="36" rx="2" fill="#1C1917" stroke="#D97706" strokeWidth="1" />
            <text x="60" y="86" textAnchor="middle" fill="#FDE68A" fontSize="7" fontFamily="monospace" fontWeight="bold">FIFTY</text>
            <text x="60" y="96" textAnchor="middle" fill="#FDE68A" fontSize="6" fontFamily="monospace">SHADES</text>
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-amber-900/60 pt-2 font-tech">
          <div>
            <div className="text-[11px] font-black tracking-widest text-amber-400">INDIAN CELEBRITIE</div>
            <div className="text-[8px] text-amber-200/50">8+ HOURS SILLAGE</div>
          </div>
          <span className="font-extended text-xs font-black text-amber-300">PARFUM</span>
        </div>
      </div>
    );
  }

  // 3. THE PADDLE STORE (Pro Athlete Equipment)
  if (visualTheme === 'paddle-store') {
    return (
      <div className="w-full h-full relative bg-[#091529] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.25)_0%,transparent_60%)]" />

        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-blue-400">
          <span>STORE FRONT</span>
          <span className="bg-blue-500/20 px-2 py-0.5 rounded text-[8px] text-blue-300 font-bold">PRO GEAR</span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-36 h-36" viewBox="0 0 160 160" fill="none">
            {/* Carbon weave lines */}
            <path d="M30 30 L130 130" stroke="#1E40AF" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M130 30 L30 130" stroke="#1E40AF" strokeWidth="1" strokeDasharray="3 3" />

            {/* Teardrop Paddle Outline */}
            <path
              d="M80 25 C105 25 120 45 120 75 C120 100 100 115 80 115 C60 115 40 100 40 75 C40 45 55 25 80 25 Z"
              fill="#1E293B"
              stroke="#3B82F6"
              strokeWidth="2.5"
            />
            {/* Aerodynamic throat cutout */}
            <path d="M72 100 L88 100 L80 112 Z" fill="#091529" stroke="#60A5FA" strokeWidth="1.5" />
            {/* Handle */}
            <rect x="74" y="115" width="12" height="30" rx="3" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
            {/* Spec lines */}
            <line x1="80" y1="40" x2="80" y2="90" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-blue-900/60 pt-2 font-tech">
          <div>
            <div className="text-[11px] font-black tracking-widest text-blue-400">THE PADDLE STORE</div>
            <div className="text-[8px] text-blue-300/50">CARBON 18K SPEC</div>
          </div>
          <span className="font-extended text-xs font-black text-blue-300">SHOP</span>
        </div>
      </div>
    );
  }

  // 4. PICKLEADS (SaaS Club Automation)
  if (visualTheme === 'pickleads') {
    return (
      <div className="w-full h-full relative bg-[#071912] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-teal-500/20">
        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-teal-400">
          <span>SAAS ENGINE</span>
          <span className="text-teal-200">AUTOMATION</span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-36 h-36" viewBox="0 0 160 160" fill="none">
            {/* Isometric Booking Matrix */}
            <polygon points="80,30 135,60 80,90 25,60" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
            <polygon points="80,60 135,90 80,120 25,90" fill="#022C22" stroke="#059669" strokeWidth="1.5" opacity="0.8" />
            <polygon points="80,90 135,120 80,150 25,120" fill="#011B14" stroke="#047857" strokeWidth="1" opacity="0.6" />

            {/* Glowing Booking Node */}
            <circle cx="80" cy="60" r="7" fill="#34D399" />
            <circle cx="80" cy="60" r="12" stroke="#6EE7B7" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" />
            <circle cx="55" cy="45" r="4" fill="#10B981" />
            <circle cx="105" cy="45" r="4" fill="#10B981" />
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-teal-900/60 pt-2 font-tech">
          <div>
            <div className="text-[11px] font-black tracking-widest text-teal-400">PICKLEADS</div>
            <div className="text-[8px] text-teal-300/50">DYNAMIC YIELD ENGINE</div>
          </div>
          <span className="font-extended text-xs font-black text-teal-300">OS</span>
        </div>
      </div>
    );
  }

  // 5. PADEL AE (UAE Venue Network)
  if (visualTheme === 'padel-ae') {
    return (
      <div className="w-full h-full relative bg-[#1E0F07] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-orange-500/20">
        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-orange-400">
          <span>DUBAI // UAE</span>
          <span className="text-orange-200">DIRECTORY</span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-36 h-36" viewBox="0 0 160 160" fill="none">
            {/* Radial Coordinates */}
            <circle cx="80" cy="80" r="50" stroke="#EA580C" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <circle cx="80" cy="80" r="32" stroke="#F97316" strokeWidth="1.5" />
            <line x1="80" y1="20" x2="80" y2="140" stroke="#FB923C" strokeWidth="1" opacity="0.4" />
            <line x1="20" y1="80" x2="140" y2="80" stroke="#FB923C" strokeWidth="1" opacity="0.4" />
            {/* Center Falcon Emblem */}
            <polygon points="80,55 95,80 80,105 65,80" fill="#EA580C" />
            <circle cx="80" cy="80" r="5" fill="#FFF7ED" />
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-orange-900/60 pt-2 font-tech">
          <div>
            <div className="text-[11px] font-black tracking-widest text-orange-400">PADEL AE</div>
            <div className="text-[8px] text-orange-300/50">MIDDLE EAST HUB</div>
          </div>
          <span className="font-extended text-xs font-black text-orange-300">UAE</span>
        </div>
      </div>
    );
  }

  // 6. AURIX ONE ACOUSTICS (3D Canvas Exploded Audio)
  if (visualTheme === 'aurix-one') {
    return (
      <div className="w-full h-full relative bg-[#0F080A] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-rose-500/20">
        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-rose-400">
          <span>3D CANVAS</span>
          <span className="text-rose-200">GRAPHENE 40MM</span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-36 h-36" viewBox="0 0 160 160" fill="none">
            {/* Exploded headphone drivers */}
            <ellipse cx="80" cy="55" rx="42" ry="14" fill="#27272A" stroke="#E11D48" strokeWidth="2" />
            <ellipse cx="80" cy="75" rx="36" ry="12" fill="#18181B" stroke="#FB7185" strokeWidth="1.5" />
            <ellipse cx="80" cy="95" rx="44" ry="15" fill="#3F3F46" stroke="#E11D48" strokeWidth="2" />
            {/* Frequency acoustic rays */}
            <path d="M25 80 Q 50 65, 80 80 T 135 80" stroke="#FDA4AF" strokeWidth="2" fill="none" opacity="0.8" />
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-rose-900/60 pt-2 font-tech">
          <div>
            <div className="text-[11px] font-black tracking-widest text-rose-400">AURIX ONE</div>
            <div className="text-[8px] text-rose-300/50">EXPLODED DISASSEMBLY</div>
          </div>
          <span className="font-extended text-xs font-black text-rose-300">3D</span>
        </div>
      </div>
    );
  }

  // 7. CORAL MARK (MetaMinds Cybernetic Agency)
  if (visualTheme === 'coral-mark') {
    return (
      <div className="w-full h-full relative bg-[#EB5038] flex flex-col items-center justify-between p-5 overflow-hidden rounded-[20px]">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] [background-size:18px_18px]" />

        <div className="w-full flex justify-center z-10">
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-black" />
        </div>

        <div className="relative z-10 flex items-center justify-center my-auto">
          <svg className="w-36 h-36 drop-shadow-md" viewBox="0 0 160 160" fill="none">
            <path
              d="M 80 20 C 94 20, 104 30, 110 40 C 122 34, 136 38, 142 50 C 148 62, 144 76, 136 86 C 146 94, 148 108, 140 118 C 130 128, 116 126, 106 120 C 98 130, 86 138, 74 138 C 60 138, 50 130, 44 120 C 32 124, 18 120, 12 108 C 6 96 10 82 20 74 C 12 64 14 48 26 40 C 38 32, 52 36, 60 44 C 68 30, 74 20, 80 20 Z"
              fill="#111111"
            />
            <path
              d="M 80 36 C 90 36, 98 44, 102 52 C 112 47, 122 50, 128 60 C 134 70, 130 80, 124 88 C 132 94, 132 104, 126 112 C 118 120, 108 118, 100 114 C 94 122, 84 128, 74 128 C 64 128, 56 122, 52 114 C 42 118, 30 114, 26 106 C 22 98, 24 88, 32 82 C 26 74, 28 62, 38 56 C 48 50, 58 53, 64 60 C 70 48, 74 36, 80 36 Z"
              fill="#EB5038"
            />
            <ellipse cx="80" cy="80" rx="22" ry="14" fill="#111111" />
            <circle cx="80" cy="80" r="7" fill="#EB5038" />
            <circle cx="80" cy="80" r="3.5" fill="#111111" />
          </svg>
        </div>

        <div className="w-full flex justify-between items-center z-10 px-2 font-tech text-[8px] text-black/85 font-bold uppercase tracking-widest">
          <span>METAMINDS // 02</span>
          <div className="w-2 h-2 rounded-full bg-black" />
          <span>EST. 2025</span>
        </div>
      </div>
    );
  }

  // 8. NEURAL MESH (Autonomous Website Creator)
  return (
    <div className="w-full h-full relative bg-[#0D081E] flex flex-col justify-between p-5 overflow-hidden rounded-[20px] text-white border border-purple-500/20">
      <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-purple-400">
        <span>AGENTIC SYSTEM</span>
        <span className="text-purple-200">AUTONOMOUS</span>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-center">
        <svg className="w-36 h-36" viewBox="0 0 160 120" fill="none">
          <path d="M20 60 L60 30 L100 45 L140 60" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <path d="M20 60 L60 90 L100 75 L140 60" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.8" />
          <circle cx="20" cy="60" r="7" fill="#8B5CF6" />
          <circle cx="60" cy="30" r="5" fill="#A78BFA" />
          <circle cx="60" cy="90" r="5" fill="#A78BFA" />
          <circle cx="100" cy="45" r="6" fill="#C4B5FD" />
          <circle cx="100" cy="75" r="6" fill="#C4B5FD" />
          <circle cx="140" cy="60" r="8" fill="#8B5CF6" />
        </svg>
      </div>

      <div className="relative z-10 flex justify-between items-end border-t border-purple-900/60 pt-2 font-tech">
        <div>
          <div className="text-[11px] font-black tracking-widest text-purple-400">SITE CREATOR</div>
          <div className="text-[8px] text-purple-300/50">8-PHASE PIPELINE</div>
        </div>
        <span className="font-extended text-xs font-black text-purple-300">V3.0</span>
      </div>
    </div>
  );
}
