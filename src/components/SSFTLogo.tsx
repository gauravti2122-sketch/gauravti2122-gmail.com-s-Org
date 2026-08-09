import React from 'react';

interface SSFTLogoProps {
  variant?: 'badge' | 'header' | 'hero' | 'footer';
  className?: string;
  showSlogan?: boolean;
}

export const SSFTLogo: React.FC<SSFTLogoProps> = ({
  variant = 'header',
  className = '',
  showSlogan = false,
}) => {
  if (variant === 'hero') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        {/* Full Winged Shield Emblem */}
        <div className="relative group cursor-pointer">
          {/* Glowing Aura Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#E8B923]/30 via-purple-600/20 to-[#E8B923]/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          
          <img
            src="/ssft-logo.png"
            alt="SSFT Esports"
            className="w-64 sm:w-80 md:w-[420px] h-auto relative z-10 drop-shadow-[0_10px_30px_rgba(232,185,35,0.4)] transition-transform duration-300 hover:scale-105 object-contain"
          />
        </div>
      </div>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
        <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A1D22] to-[#0D0F12] border border-[#E8B923]/50 shadow-[0_0_15px_rgba(232,185,35,0.2)] group-hover:border-[#E8B923] group-hover:shadow-[0_0_20px_rgba(232,185,35,0.4)] transition-all overflow-hidden p-1">
          <img
            src="/ssft-logo.png"
            alt="SSFT Logo"
            className="w-10 h-10 object-contain"
          />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2ED573] rounded-full border-2 border-[#0D0F12] animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-wider text-[#F5F5F5] font-mono leading-none">
              SSFT
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#E8B923]/10 text-[#E8B923] border border-[#E8B923]/30">
              ESPORTS
            </span>
          </div>
          {showSlogan && (
            <p className="text-[10px] font-bold text-[#E8B923] tracking-widest uppercase italic mt-0.5">
              On Which You Trust
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A1D22] border border-[#E8B923]/40 shadow-md p-1 overflow-hidden">
          <img src="/ssft-logo.png" alt="SSFT Logo" className="w-10 h-10 object-contain" />
        </div>
        <div>
          <span className="text-2xl font-black tracking-wider text-[#F5F5F5] font-mono block leading-none">
            SSFT
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <img src="/ssft-logo.png" alt="SSFT Logo" className="w-8 h-8 object-contain" />
      <span className="text-lg font-black tracking-wider text-[#F5F5F5] font-mono">SSFT</span>
    </div>
  );
};
