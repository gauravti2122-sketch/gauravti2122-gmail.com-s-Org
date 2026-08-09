import React from 'react';
import { Settings, ArrowUp } from 'lucide-react';
import { SiteConfig } from '../types';
import { SSFTLogo } from './SSFTLogo';

interface FooterProps {
  config: SiteConfig;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0F12] border-t border-white/10 pt-16 pb-12 text-[#8A8F98] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <SSFTLogo variant="footer" showSlogan={false} />

            <p className="text-xs text-[#8A8F98] leading-relaxed max-w-md">
              SSFT (SSF Tournaments) is India's premier competitive gaming arena dedicated to Free Fire & BGMI squad tournaments, fair play verification, and fast transparent prize distributions.
            </p>

            <div className="text-xs text-[#E8B923] font-mono">
              Inquiries: <a href={`mailto:${config.contactEmail}`} className="hover:underline">{config.contactEmail}</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#what-to-expect" className="hover:text-[#E8B923] transition-colors">
                  What to Expect
                </a>
              </li>
              <li>
                <a href="#register" className="hover:text-[#E8B923] transition-colors">
                  Register Interest
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-[#E8B923] transition-colors">
                  Community Hubs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F5F5] mb-4">
              Official Channels
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href={config.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="hover:text-[#2ED573] transition-colors">
                  WhatsApp Channel
                </a>
              </li>
              <li>
                <a href={config.socialLinks.discord} target="_blank" rel="noreferrer" className="hover:text-[#818CF8] transition-colors">
                  Discord Server
                </a>
              </li>
              <li>
                <a href={config.socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-[#EF4444] transition-colors">
                  YouTube Livestreams
                </a>
              </li>
              <li>
                <a href={config.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-[#EC4899] transition-colors">
                  Instagram Official
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8F98]">
          <div>
            © {new Date().getFullYear()} <strong className="text-[#F5F5F5]">SSF Tournaments (SSFT)</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#1A1D22] border border-white/10 hover:border-[#E8B923] text-[#F5F5F5] transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
