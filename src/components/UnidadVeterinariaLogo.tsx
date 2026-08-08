import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'vertical' | 'badge';
}

/**
 * High-precision vector component for "UNIDAD VETERINARIA" logos
 * depicting the 3 iconic animal silhouettes (bovine, equine, swine)
 */
export const UnidadVeterinariaEmblem: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle cx="100" cy="100" r="96" fill="#008037" />
      <circle cx="100" cy="100" r="92" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.3" />

      {/* Main Animals Group (White silhouettes) */}
      <g fill="#FFFFFF">
        {/* Left Animal: Cow / Bovine Head */}
        <path d="M 62 70 C 50 72 32 88 28 108 C 26 118 32 128 46 132 C 60 136 74 130 82 120 C 84 105 78 88 62 70 Z" />
        {/* Cow horn & ear */}
        <path d="M 58 64 C 50 52 38 56 36 68 C 44 68 54 66 58 64 Z" />
        <path d="M 32 84 C 20 86 16 98 22 102 C 28 102 32 94 32 84 Z" />
        {/* Cow Eye detail */}
        <circle cx="52" cy="92" r="3" fill="#008037" />

        {/* Right Animal: Pig / Swine Head */}
        <path d="M 138 70 C 150 72 168 88 172 108 C 174 118 168 128 154 132 C 140 136 126 130 118 120 C 116 105 122 88 138 70 Z" />
        {/* Pig ear & snout */}
        <path d="M 142 64 C 150 52 162 56 164 68 C 156 68 146 66 142 64 Z" />
        <path d="M 168 84 C 180 86 184 98 178 102 C 172 102 168 94 168 84 Z" />
        {/* Pig Eye detail */}
        <circle cx="148" cy="92" r="3" fill="#008037" />

        {/* Center Animal: Horse / Equine Head */}
        <path d="M 100 24 C 84 32 80 50 82 72 C 84 92 88 120 86 138 C 86 148 92 156 100 156 C 108 156 114 148 114 138 C 112 120 116 92 118 72 C 120 50 116 32 100 24 Z" />
        
        {/* Horse Ears */}
        <path d="M 82 32 L 72 10 L 86 24 Z" />
        <path d="M 118 32 L 128 10 L 114 24 Z" />

        {/* Horse Mane (Tupé / Crin) */}
        <path d="M 100 28 Q 94 45 100 65 Q 106 45 100 28 Z" fill="#008037" />
        
        {/* Muzzle / Nares / Eyes details */}
        <ellipse cx="94" cy="144" rx="2.5" ry="4" fill="#008037" />
        <ellipse cx="106" cy="144" rx="2.5" ry="4" fill="#008037" />
        <circle cx="88" cy="78" r="3" fill="#008037" />
        <circle cx="112" cy="78" r="3" fill="#008037" />
      </g>
    </svg>
  );
};

export const UnidadVeterinariaLogoHorizontal: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-3 bg-[#008037] text-white rounded-2xl p-2 pr-5 shadow-md border border-emerald-600/30 ${className}`}>
      {/* Badge Circle Icon */}
      <div className="w-11 h-11 shrink-0 bg-white/10 rounded-xl p-1 backdrop-blur-xs border border-white/20 flex items-center justify-center">
        <UnidadVeterinariaEmblem className="w-full h-full" />
      </div>

      {/* Text Branding */}
      <div className="flex flex-col justify-center leading-none">
        <span className="text-base sm:text-lg font-black tracking-wider uppercase font-sans text-white">
          UNIDAD
        </span>
        <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase font-sans text-emerald-100 mt-0.5">
          VETERINARIA
        </span>
      </div>
    </div>
  );
};

export const UnidadVeterinariaLogoVertical: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center text-center bg-[#008037] text-white rounded-2xl p-4 shadow-lg border border-emerald-600/30 ${className}`}>
      {/* Big Badge Icon */}
      <UnidadVeterinariaEmblem className="w-20 h-20 mb-2" />

      {/* Text Box */}
      <div className="w-full bg-white text-[#008037] font-black text-xl tracking-widest uppercase py-1 px-3 rounded-lg shadow-xs">
        UNIDAD
      </div>
      <div className="font-extrabold text-sm tracking-widest uppercase text-white mt-1.5">
        VETERINARIA
      </div>
    </div>
  );
};

export const UnidadVeterinariaLogoBadge: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <UnidadVeterinariaEmblem className="w-full h-full drop-shadow-md" />
    </div>
  );
};
