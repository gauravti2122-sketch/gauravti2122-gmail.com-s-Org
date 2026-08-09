import React from 'react';
import { MessageSquare, Instagram, Youtube, PhoneCall, Mail, Users } from 'lucide-react';
import { SiteConfig } from '../types';

interface CommunitySectionProps {
  config: SiteConfig;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ config }) => {
  const channels = [
    {
      name: 'WhatsApp Channel',
      role: 'Room IDs, Passwords & Scrims',
      members: '15,000+ Gamers',
      icon: PhoneCall,
      color: 'text-[#2ED573]',
      bgColor: 'bg-[#2ED573]/10',
      borderColor: 'border-[#2ED573]/30',
      link: config.socialLinks.whatsapp,
      action: 'Join WhatsApp',
    },
    {
      name: 'Discord Arena',
      role: 'Voice Channels & Match Support',
      members: '8,200+ Squads',
      icon: MessageSquare,
      color: 'text-[#818CF8]',
      bgColor: 'bg-[#818CF8]/10',
      borderColor: 'border-[#818CF8]/30',
      link: config.socialLinks.discord,
      action: 'Join Discord',
    },
    {
      name: 'YouTube Channel',
      role: 'Live @ 8 PM Launch with CEO (Q&A)',
      members: '25,000+ Subs',
      icon: Youtube,
      color: 'text-[#EF4444]',
      bgColor: 'bg-[#EF4444]/10',
      borderColor: 'border-[#EF4444]/30',
      link: config.socialLinks.youtube,
      action: 'Set Live Reminder',
    },
    {
      name: 'Instagram Official',
      role: 'Winner Announcements & Clips',
      members: '10,000+ Followers',
      icon: Instagram,
      color: 'text-[#EC4899]',
      bgColor: 'bg-[#EC4899]/10',
      borderColor: 'border-[#EC4899]/30',
      link: config.socialLinks.instagram,
      action: 'Follow Instagram',
    },
  ];

  return (
    <section id="community" className="py-20 bg-[#1A1D22] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0F12] border border-[#E8B923]/30 text-xs font-bold text-[#E8B923] tracking-widest uppercase mb-4">
            <Users className="w-4 h-4" />
            <span>Join the Army</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight">
            Connect with SSFT Community
          </h2>
          <p className="mt-4 text-base text-[#8A8F98]">
            Get live match updates, custom room codes, scrimmage timings, and direct support from our tournament ref team across all official SSFT channels.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((chan, idx) => {
            const IconComponent = chan.icon;
            return (
              <a
                key={idx}
                href={chan.link}
                target="_blank"
                rel="noreferrer"
                className="p-6 rounded-2xl bg-[#0D0F12] border border-white/5 hover:border-[#E8B923]/50 transition-all group flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${chan.bgColor} ${chan.color} border ${chan.borderColor} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F5F5F5] group-hover:text-[#E8B923] transition-colors">
                    {chan.name}
                  </h3>
                  <p className="text-xs text-[#8A8F98] mt-1">{chan.role}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#2ED573]">
                    {chan.members}
                  </span>
                  <span className="text-xs font-bold text-[#E8B923] group-hover:underline">
                    {chan.action} &rarr;
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Live Q&A Event Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#EF4444]/20 via-[#0D0F12] to-[#E8B923]/20 border border-[#EF4444]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 rounded-xl bg-[#EF4444] text-white shrink-0 shadow-lg shadow-[#EF4444]/30">
              <Youtube className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-2 py-0.5 rounded bg-[#EF4444] text-white text-[10px] font-black uppercase tracking-wider mb-1">
                LAUNCH DAY SPECIAL • 8:00 PM
              </div>
              <h3 className="text-xl font-black text-[#F5F5F5]">
                YouTube Live at 8:00 PM on Launch with CEO
              </h3>
              <p className="text-sm font-bold text-[#E8B923] font-mono italic mt-1">
                "Your Questions, Our Responsibility"
              </p>
              <p className="text-xs text-[#8A8F98] mt-1">
                Ask your questions directly to the CEO during the live stream about tournament rules, payouts, scrims, and upcoming PC/mobile game additions.
              </p>
            </div>
          </div>
          <a
            href={config.socialLinks.youtube}
            target="_blank"
            rel="noreferrer"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs uppercase tracking-widest shrink-0 transition-all text-center flex items-center justify-center gap-2 shadow-lg"
          >
            <Youtube className="w-4 h-4" />
            <span>Join Stream & Ask Qs</span>
          </a>
        </div>

        {/* Support Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0D0F12] border border-[#E8B923]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 rounded-xl bg-[#E8B923]/10 text-[#E8B923]">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#F5F5F5]">Sponsorships & Organizer Inquiries</h4>
              <p className="text-xs text-[#8A8F98]">Have questions or want to partner for a tournament series?</p>
            </div>
          </div>
          <a
            href={`mailto:${config.contactEmail}`}
            className="px-6 py-3 rounded-xl bg-[#1A1D22] hover:bg-[#1A1D22]/80 border border-white/10 text-[#E8B923] font-bold text-xs uppercase tracking-wider shrink-0 transition-all"
          >
            {config.contactEmail}
          </a>
        </div>
      </div>
    </section>
  );
};
