import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExpectationCards } from './components/ExpectationCards';
import { RegistrationSection } from './components/RegistrationSection';
import { CommunitySection } from './components/CommunitySection';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { defaultConfig, initialRegistrations } from './data/config';
import { RegistrationEntry, SiteConfig } from './types';

export default function App() {
  // Load site config from localStorage
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('ssft_site_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultConfig,
          ...parsed,
          googleSheetWebhookUrl: parsed.googleSheetWebhookUrl || defaultConfig.googleSheetWebhookUrl,
        };
      }
    } catch (e) {
      console.error('Failed to parse saved config:', e);
    }
    return defaultConfig;
  });

  // Load registered list from localStorage
  const [registrations, setRegistrations] = useState<RegistrationEntry[]>(() => {
    try {
      const saved = localStorage.getItem('ssft_registrations');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved registrations:', e);
    }
    return initialRegistrations;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ssft_site_config', JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save config:', e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('ssft_registrations', JSON.stringify(registrations));
    } catch (e) {
      console.error('Failed to save registrations:', e);
    }
  }, [registrations]);

  const handleNewRegistration = (entry: RegistrationEntry) => {
    setRegistrations((prev) => [entry, ...prev]);
  };

  const handleSaveConfig = (updated: SiteConfig) => {
    setConfig(updated);
  };

  const handleClearRegistrations = () => {
    setRegistrations([]);
    localStorage.removeItem('ssft_registrations');
  };

  const scrollToForm = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F5F5F5] font-sans selection:bg-[#E8B923] selection:text-[#0D0F12]">
      {/* Header */}
      <Header
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollToForm={scrollToForm}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          launchDate={config.launchDate}
          totalRegistrations={registrations.length}
          onScrollToForm={scrollToForm}
          youtubeUrl={config.socialLinks.youtube}
        />

        {/* What to Expect Section */}
        <ExpectationCards />

        {/* Pre-Registration Section (Native Form + Embedded Google Form view) */}
        <RegistrationSection
          config={config}
          onNewRegistration={handleNewRegistration}
          registeredList={registrations}
        />

        {/* Community & Social Links */}
        <CommunitySection config={config} />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin / Organizer Settings Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        registrations={registrations}
        onClearRegistrations={handleClearRegistrations}
      />
    </div>
  );
}
