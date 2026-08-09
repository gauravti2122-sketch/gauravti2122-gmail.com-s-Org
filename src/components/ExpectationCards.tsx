import React from 'react';
import { ShieldCheck, Banknote, Flame, Zap, Award, CheckCircle2, Gamepad2, Sparkles } from 'lucide-react';

export const ExpectationCards: React.FC = () => {
  const highlights = [
    {
      icon: Flame,
      title: 'Free Fire & BGMI Matches',
      badge: 'Custom Lobbies',
      description:
        'Daily scrims, weekly cups, and squad tournaments for Free Fire and BGMI with fast room code distribution.',
      color: 'text-[#E8B923]',
      bgColor: 'bg-[#E8B923]/10',
      borderColor: 'border-[#E8B923]/30',
      features: ['Squad & Duos', 'Auto Room Codes', 'Live Streams'],
    },
    {
      icon: Award,
      title: 'Free Entry & Custom Lobbies',
      badge: 'Zero Entry Fee',
      description:
        'Join community scrims and custom lobbies free of charge with competitive point tables and verified match results.',
      color: 'text-[#E8B923]',
      bgColor: 'bg-[#E8B923]/10',
      borderColor: 'border-[#E8B923]/30',
      features: ['100% Free Entry', 'Instant Lobbies', 'Live Point Tables'],
    },
    {
      icon: ShieldCheck,
      title: 'Fair Play & Anti-Cheat',
      badge: '100% Fair',
      description:
        'Built on trust and transparency. Every winner is verified via screenshot proof and ID checks.',
      color: 'text-[#E8B923]',
      bgColor: 'bg-[#E8B923]/10',
      borderColor: 'border-[#E8B923]/30',
      features: ['ID Checks', 'No Emulators', 'Anti-Hack Policy'],
    },
    {
      icon: Zap,
      title: 'Automated Points & Stats',
      badge: 'Live Standings',
      description:
        'Track squad kill counts, overall rank points, and tournament stats with live point calculations.',
      color: 'text-[#F5F5F5]',
      bgColor: 'bg-white/10',
      borderColor: 'border-white/20',
      features: ['Auto Kill Points', 'Live Leaderboards', 'Verified Stats'],
    },
  ];

  return (
    <section id="what-to-expect" className="py-20 bg-[#0D0F12] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D22] border border-[#E8B923]/30 text-xs font-bold text-[#E8B923] tracking-widest uppercase mb-4">
            <Award className="w-4 h-4" />
            <span>Platform Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight">
            What to Expect at SSFT
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#8A8F98]">
            Built for competitive esports players. Here is why top squads choose SSFT for tournament gaming.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {highlights.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#1A1D22] border border-white/5 hover:border-[#E8B923]/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(232,185,35,0.1)] group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-xl ${card.bgColor} ${card.color} border ${card.borderColor}`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0D0F12] text-[#E8B923] border border-[#E8B923]/20">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#F5F5F5] group-hover:text-[#E8B923] transition-colors mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#8A8F98] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Sub Features */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-x-4 gap-y-2">
                  {card.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 text-xs text-[#F5F5F5] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2ED573] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Games Expanding Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1A1D22] via-[#0D0F12] to-[#1A1D22] border border-[#E8B923]/30 text-left relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-[#E8B923]/10 text-[#E8B923] border border-[#E8B923]/30 shrink-0">
              <Gamepad2 className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8B923] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Expanding Esports Portfolio</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-[#F5F5F5]">
                More Game Titles Coming Soon!
              </h4>
              <p className="text-xs sm:text-sm text-[#8A8F98] mt-1 max-w-2xl">
                While we launch with Free Fire & BGMI, upcoming tournaments will include Call of Duty: Mobile, Valorant PC, CS:GO, Minecraft Bedwars, and Valorant Mobile.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {['CODM', 'Valorant PC', 'CS:GO', 'Minecraft Bedwars', 'Valorant Mobile'].map((title, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#F5F5F5] font-bold"
              >
                🎮 {title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
