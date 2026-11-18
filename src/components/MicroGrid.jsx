import React from 'react';

export default function MicroGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* 4 Corner Crosshairs */}
      <div className="absolute top-4 left-4 font-mono text-xs text-black/25">+</div>
      <div className="absolute top-4 right-4 font-mono text-xs text-black/25">+</div>
      <div className="absolute bottom-4 left-4 font-mono text-xs text-black/25">+</div>
      <div className="absolute bottom-4 right-4 font-mono text-xs text-black/25">+</div>

      {/* Side Center Crosshairs */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 font-mono text-xs text-black/25">+</div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 font-mono text-xs text-black/25">+</div>
    </div>
  );
}
