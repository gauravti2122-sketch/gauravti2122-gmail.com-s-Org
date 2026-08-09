import React from 'react';
import { Flame, Swords, ArrowRight, ShieldCheck, Users, Zap, Youtube, Radio } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { SSFTLogo } from './SSFTLogo';

interface HeroProps {
  launchDate: string;
  totalRegistrations: number;
  onScrollToForm: () => void;
  youtubeUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  launchDate,
  totalRegistrations,
  onScrollToForm,
  youtubeUrl = 'https://youtube.com',
}) => {
  return (
    <section className="relative pt-8 pb-20 overflow-hidden bg-gradient-to-b from-[#0D0F12] via-[#1A1D22]/40 to-[#0D0F12]">
      {/* Background glowing geometric radial accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8B923]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#2ED573]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Official Winged Shield SSFT Logo */}
        <div className="mb-6">
          <SSFTLogo variant="hero" />
        </div>

        {/* Top Trust Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1D22] border border-[#E8B923]/30 text-xs sm:text-sm font-semibold text-[#E8B923] shadow-lg mb-6 animate-fade-in flex-wrap justify-center">
          <ShieldCheck className="w-4 h-4 text-[#E8B923] shrink-0" />
          <span className="tracking-wide">INDIA'S TRUSTED ESPORTS ARENA</span>
          <span className="text-[#8A8F98]">•</span>
          <span className="text-[#F5F5F5] font-mono">FREE FIRE & BGMI</span>
          <span className="text-[#8A8F98]">•</span>
          <span className="text-[#E8B923] font-bold text-xs uppercase tracking-wider bg-[#E8B923]/10 px-2 py-0.5 rounded border border-[#E8B923]/20">
            + MORE GAMES COMING SOON
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#F5F5F5] tracking-tight max-w-5xl mx-auto leading-[1.1] mb-4">
          India's Trusted Esports Arena <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#E8B923] via-[#F5F5F5] to-[#E8B923] bg-clip-text text-transparent">
            Launching Soon
          </span>
        </h1>

        {/* Official Slogan */}
        <div className="my-3">
          <p className="text-xl sm:text-2xl font-bold tracking-widest text-[#E8B923] uppercase font-mono italic">
            "On Which You Trust"
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E8B923] to-transparent mx-auto mt-2 rounded-full" />
        </div>

        {/* Subtext description */}
        <p className="mt-6 text-base sm:text-lg text-[#8A8F98] max-w-2xl mx-auto leading-relaxed">
          Compete in high-stakes Free Fire & BGMI squad tournaments. Guaranteed fair play, 
          automated room codes, and instant squad support.
        </p>

        {/* Special Launch Event Box: YouTube Live with CEO */}
        <div className="my-8 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#EF4444]/15 via-[#1A1D22] to-[#E8B923]/15 border border-[#EF4444]/40 shadow-2xl relative overflow-hidden text-left group hover:border-[#EF4444] transition-all">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="p-3.5 rounded-xl bg-[#EF4444] text-white shadow-lg shadow-[#EF4444]/30 flex items-center justify-center">
                  <Youtube className="w-7 h-7" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#EF4444]"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#EF4444] text-white flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse" />
                    LIVE ON LAUNCH
                  </span>
                  <span className="text-xs font-mono text-[#E8B923] font-bold">
                    8:00 PM Sharp
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#F5F5F5] mt-1 flex items-center gap-2">
                  <span>YouTube Live at 8 PM with CEO</span>
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#E8B923] font-mono italic mt-0.5">
                  "Your Questions, Our Responsibility"
                </p>
                <p className="text-xs text-[#8A8F98] mt-1 hidden sm:block">
                  Direct Q&A session addressing squad queries, tournament schedules & anti-cheat system.
                </p>
              </div>
            </div>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Youtube className="w-4 h-4" />
              <span>Watch / Set Reminder</span>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToForm}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E8B923] hover:bg-[#D4A313] text-[#0D0F12] font-black text-base tracking-wide transition-all shadow-[0_0_25px_rgba(232,185,35,0.35)] flex items-center justify-center gap-3 group gold-glow"
          >
            <Flame className="w-5 h-5 fill-[#0D0F12]" />
            <span>REGISTER YOUR INTEREST</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#what-to-expect"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#1A1D22] hover:bg-[#1A1D22]/80 border border-white/10 text-[#F5F5F5] font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <Swords className="w-5 h-5 text-[#E8B923]" />
            <span>Explore Tournament Features</span>
          </a>
        </div>

        {/* Live Countdown Timer */}
        <CountdownTimer targetDate={launchDate} />

        {/* Key Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-white/10">
          <div className="p-4 rounded-xl bg-[#1A1D22]/60 border border-white/5 flex items-center gap-4 text-left">
            <div className="p-3 rounded-lg bg-[#E8B923]/10 text-[#E8B923]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-[#F5F5F5]">
                {(1000 + totalRegistrations).toLocaleString()}+
              </div>
              <div className="text-xs text-[#8A8F98] font-medium">Interested Squads Registered</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1A1D22]/60 border border-white/5 flex items-center gap-4 text-left">
            <div className="p-3 rounded-lg bg-[#E8B923]/10 text-[#E8B923]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-[#F5F5F5]">
                100% Fair
              </div>
              <div className="text-xs text-[#8A8F98] font-medium">Anti-Cheat & Verified Matches</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#1A1D22]/60 border border-white/5 flex items-center gap-4 text-left">
            <div className="p-3 rounded-lg bg-[#E8B923]/10 text-[#E8B923]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-[#F5F5F5]">
                Instant
              </div>
              <div className="text-xs text-[#8A8F98] font-medium">Room ID & WhatsApp Alerts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

