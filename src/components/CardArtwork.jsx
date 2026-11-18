import React from 'react';

/**
 * Clean Swiss Editorial Artwork Cards
 * Spacious, visually striking, with zero filler text or buzzwords.
 */
export default function CardArtwork({ project }) {
  const { visualTheme } = project;

  // 1. INDIAN CELEBRITIE (Haute Parfumerie Boutique)
  if (visualTheme === 'indian-celebritie') {
    return (
      <div className="w-full h-full relative bg-[#120B06] flex flex-col justify-between p-6 overflow-hidden rounded-[20px] text-white border border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.18)_0%,transparent_70%)]" />

        {/* Top Minimal Tag */}
        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-amber-400/80">
          <span>HAUTE PARFUM</span>
          <span>BOUTIQUE</span>
        </div>

        {/* Perfume Bottle Silhouette */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-28 h-36" viewBox="0 0 120 160" fill="none">
            {/* Cap */}
            <rect x="46" y="18" width="28" height="24" rx="2" fill="#D97706" stroke="#FDE68A" strokeWidth="1.5" />
            {/* Neck */}
            <rect x="52" y="42" width="16" height="10" fill="#78350F" />
            {/* Body */}
            <rect x="30" y="52" width="60" height="90" rx="8" fill="#451A03" stroke="#F59E0B" strokeWidth="2" />
            {/* Liquid */}
            <path d="M34 95 Q60 88 86 95 L86 136 Q60 138 34 136 Z" fill="#D97706" opacity="0.75" />
            {/* Label */}
            <rect x="40" y="70" width="40" height="36" rx="2" fill="#1C1917" stroke="#D97706" strokeWidth="1" />
            <text x="60" y="86" textAnchor="middle" fill="#FDE68A" fontSize="7" fontFamily="monospace" fontWeight="bold">FIFTY</text>
            <text x="60" y="96" textAnchor="middle" fill="#FDE68A" fontSize="6" fontFamily="monospace">SHADES</text>
          </svg>
        </div>

        {/* Bottom Title */}
        <div className="relative z-10 flex justify-between items-end border-t border-amber-900/40 pt-2 font-tech">
          <div className="text-[11px] font-black tracking-widest text-amber-300">INDIAN CELEBRITIE</div>
          <span className="text-[9px] text-amber-400/70 uppercase">PARFUM</span>
        </div>
      </div>
    );
  }

  // 2. BATTLE PARK INDIA (Pickleball Venue)
  if (visualTheme === 'battle-park') {
    return (
      <div className="w-full h-full relative bg-[#091F13] flex flex-col justify-between p-6 overflow-hidden rounded-[20px] text-white border border-emerald-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.2)_0%,transparent_65%)]" />

        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-emerald-400/80">
          <span>DELHI // SAKET</span>
          <span>VENUE</span>
        </div>

        {/* Center Padel Racket & Court Lines */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-32 h-32" viewBox="0 0 160 160" fill="none">
            <rect x="25" y="20" width="110" height="120" rx="6" stroke="#22C55E" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <line x1="80" y1="20" x2="80" y2="140" stroke="#22C55E" strokeWidth="1" opacity="0.35" />
            <line x1="25" y1="80" x2="135" y2="80" stroke="#22C55E" strokeWidth="1.2" opacity="0.5" />

            <circle cx="80" cy="72" r="30" fill="#14532D" stroke="#4ADE80" strokeWidth="2" />
            {[-10, 0, 10].map((x) =>
              [-10, 0, 10].map((y) => (
                <circle key={`${x}-${y}`} cx={80 + x} cy={72 + y} r="2.2" fill="#22C55E" />
              ))
            )}
            <rect x="76" y="102" width="8" height="30" rx="2" fill="#166534" stroke="#4ADE80" strokeWidth="1.2" />
            <circle cx="116" cy="50" r="8" fill="#D4F03C" />
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-emerald-900/50 pt-2 font-tech">
          <div className="text-[11px] font-black tracking-widest text-emerald-300">BATTLE PARK</div>
          <span className="text-[9px] text-emerald-400/70 uppercase">SPORTS</span>
        </div>
      </div>
    );
  }

  // 3. THE PADDLE STORE (Athletic Equipment Store)
  if (visualTheme === 'paddle-store') {
    return (
      <div className="w-full h-full relative bg-[#081224] flex flex-col justify-between p-6 overflow-hidden rounded-[20px] text-white border border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.22)_0%,transparent_65%)]" />

        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-blue-400/80">
          <span>EQUIPMENT</span>
          <span>STORE</span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-32 h-32" viewBox="0 0 160 160" fill="none">
            <path d="M30 30 L130 130" stroke="#1E40AF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M130 30 L30 130" stroke="#1E40AF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path
              d="M80 25 C105 25 120 45 120 75 C120 100 100 115 80 115 C60 115 40 100 40 75 C40 45 55 25 80 25 Z"
              fill="#1E293B"
              stroke="#3B82F6"
              strokeWidth="2"
            />
            <path d="M72 100 L88 100 L80 112 Z" fill="#091529" stroke="#60A5FA" strokeWidth="1.2" />
            <rect x="75" y="115" width="10" height="28" rx="2" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.2" />
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-blue-900/50 pt-2 font-tech">
          <div className="text-[11px] font-black tracking-widest text-blue-300">THE PADDLE STORE</div>
          <span className="text-[9px] text-blue-400/70 uppercase">EQUIPMENT</span>
        </div>
      </div>
    );
  }

  // 4. PADEL AE (UAE Venue Network)
  if (visualTheme === 'padel-ae') {
    return (
      <div className="w-full h-full relative bg-[#180C05] flex flex-col justify-between p-6 overflow-hidden rounded-[20px] text-white border border-orange-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.2)_0%,transparent_65%)]" />

        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-orange-400/80">
          <span>DUBAI // UAE</span>
          <span>NETWORK</span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-32 h-32" viewBox="0 0 160 160" fill="none">
            <circle cx="80" cy="80" r="48" stroke="#EA580C" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <circle cx="80" cy="80" r="30" stroke="#F97316" strokeWidth="1.2" />
            <line x1="80" y1="20" x2="80" y2="140" stroke="#FB923C" strokeWidth="1" opacity="0.3" />
            <line x1="20" y1="80" x2="140" y2="80" stroke="#FB923C" strokeWidth="1" opacity="0.3" />
            <polygon points="80,56 94,80 80,104 66,80" fill="#EA580C" />
            <circle cx="80" cy="80" r="4" fill="#FFF7ED" />
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-orange-900/50 pt-2 font-tech">
          <div className="text-[11px] font-black tracking-widest text-orange-300">PADEL AE</div>
          <span className="text-[9px] text-orange-400/70 uppercase">DIRECTORY</span>
        </div>
      </div>
    );
  }

  // 5. PICKLEADS (Venue Automation Platform)
  if (visualTheme === 'pickleads') {
    return (
      <div className="w-full h-full relative bg-[#051610] flex flex-col justify-between p-6 overflow-hidden rounded-[20px] text-white border border-teal-500/20">
        <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-teal-400/80">
          <span>INFRASTRUCTURE</span>
          <span>AUTOMATION</span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg className="w-32 h-32" viewBox="0 0 160 160" fill="none">
            <polygon points="80,30 135,60 80,90 25,60" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
            <polygon points="80,60 135,90 80,120 25,90" fill="#022C22" stroke="#059669" strokeWidth="1.2" opacity="0.8" />
            <polygon points="80,90 135,120 80,150 25,120" fill="#011B14" stroke="#047857" strokeWidth="1" opacity="0.6" />
            <circle cx="80" cy="60" r="6" fill="#34D399" />
          </svg>
        </div>

        <div className="relative z-10 flex justify-between items-end border-t border-teal-900/50 pt-2 font-tech">
          <div className="text-[11px] font-black tracking-widest text-teal-300">PICKLEADS</div>
          <span className="text-[9px] text-teal-400/70 uppercase">PLATFORM</span>
        </div>
      </div>
    );
  }

  // 6. METAMINDS (Clover Eye Graphic Poster)
  if (visualTheme === 'coral-mark') {
    return (
      <div className="w-full h-full relative bg-[#EB5038] flex flex-col items-center justify-between p-6 overflow-hidden rounded-[20px]">
        <div className="absolute inset-0 opacity-12 bg-[radial-gradient(#000000_1.2px,transparent_1.2px)] [background-size:18px_18px]" />

        <div className="w-full flex justify-between items-center z-10 font-tech text-[9px] text-black/80 font-bold tracking-widest">
          <span>METAMINDS</span>
          <span>STUDIO</span>
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

        <div className="w-full flex justify-between items-center z-10 border-t border-black/20 pt-2 font-tech text-[9px] text-black font-bold uppercase tracking-widest">
          <span>CYBERNETIC</span>
          <span>LUXURY</span>
        </div>
      </div>
    );
  }

  // 7. AURIX ONE (3D Audio Showcase)
  return (
    <div className="w-full h-full relative bg-[#0D0709] flex flex-col justify-between p-6 overflow-hidden rounded-[20px] text-white border border-rose-500/20">
      <div className="relative z-10 flex justify-between font-tech text-[9px] tracking-widest text-rose-400/80">
        <span>ACOUSTICS</span>
        <span>HARDWARE</span>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-center">
        <svg className="w-32 h-32" viewBox="0 0 160 160" fill="none">
          <ellipse cx="80" cy="55" rx="42" ry="14" fill="#27272A" stroke="#E11D48" strokeWidth="1.5" />
          <ellipse cx="80" cy="75" rx="36" ry="12" fill="#18181B" stroke="#FB7185" strokeWidth="1.2" />
          <ellipse cx="80" cy="95" rx="44" ry="15" fill="#3F3F46" stroke="#E11D48" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 flex justify-between items-end border-t border-rose-900/50 pt-2 font-tech">
        <div className="text-[11px] font-black tracking-widest text-rose-300">AURIX ONE</div>
        <span className="text-[9px] text-rose-400/70 uppercase">AUDIO</span>
      </div>
    </div>
  );
}