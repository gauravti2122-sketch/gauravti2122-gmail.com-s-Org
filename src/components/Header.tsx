import React from 'react';
import { Sparkles, Settings, Trophy } from 'lucide-react';
import { SSFTLogo } from './SSFTLogo';

interface HeaderProps {
  onOpenAdmin?: () => void;
  onScrollToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToForm }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0D0F12]/90 backdrop-blur-md border-b border-[#1A1D22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <SSFTLogo variant="header" />
        </div>

        {/* Center / Right Nav Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#8A8F98]">
            <a href="#what-to-expect" className="hover:text-[#F5F5F5] transition-colors">
              What to Expect
            </a>
            <a href="#register" className="hover:text-[#F5F5F5] transition-colors">
              Register
            </a>
            <a href="#community" className="hover:text-[#F5F5F5] transition-colors">
              Community
            </a>
          </nav>

          {/* Launching Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1D22] border border-[#E8B923]/20 text-xs text-[#8A8F98]">
            <Trophy className="w-3.5 h-3.5 text-[#E8B923]" />
            <span>Launch: <strong className="text-[#F5F5F5]">03 2026</strong></span>
          </div>

          {/* CTA Button */}
          <button
            onClick={onScrollToForm}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#E8B923] hover:bg-[#D4A313] text-[#0D0F12] font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-[0_0_15px_rgba(232,185,35,0.25)] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-[#0D0F12]" />
            <span>Pre-Register</span>
          </button>
        </div>
      </div>
    </header>
  );
};
