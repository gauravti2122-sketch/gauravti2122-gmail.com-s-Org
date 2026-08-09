import React, { useState } from 'react';
import { 
  User, 
  Gamepad2, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  ShieldCheck,
  AlertCircle,
  Mail,
} from 'lucide-react';
import { GameChoice, RegistrationEntry, SiteConfig } from '../types';

interface RegistrationSectionProps {
  config: SiteConfig;
  onNewRegistration: (entry: RegistrationEntry) => void;
  registeredList: RegistrationEntry[];
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  config,
  onNewRegistration,
  registeredList,
}) => {
  // Form State
  const [name, setName] = useState('');
  const [ign, setIgn] = useState('');
  const [gameName, setGameName] = useState<GameChoice>('BGMI');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  // Form Validation & Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEntry, setSubmittedEntry] = useState<RegistrationEntry | null>(null);
  const [copiedPassId, setCopiedPassId] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!ign.trim()) {
      newErrors.ign = 'In-Game Name (IGN) is required';
    } else {
      const isDuplicateIgn = registeredList.some(
        (entry) => entry.ign.trim().toLowerCase() === ign.trim().toLowerCase()
      );
      if (isDuplicateIgn) {
        newErrors.ign = 'Duplicate registration! This IGN has already been registered.';
      }
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.mobileNumber = '10-digit mobile number is required';
    } else if (cleanPhone.length !== 10) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    } else {
      const isDuplicatePhone = registeredList.some(
        (entry) => entry.mobileNumber.replace(/\D/g, '') === cleanPhone
      );
      if (isDuplicatePhone) {
        newErrors.mobileNumber = 'Duplicate registration! This mobile number is already registered.';
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const passId = `SSFT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newEntry: RegistrationEntry = {
        id: passId,
        name: name.trim(),
        ign: ign.trim(),
        gameName,
        mobileNumber: mobileNumber.trim(),
        email: email.trim() || undefined,
        timestamp: new Date().toISOString(),
      };

      // If Google Apps Script / Sheet Webhook URL is set, send data in real-time
      if (config.googleSheetWebhookUrl && config.googleSheetWebhookUrl.startsWith('http')) {
        try {
          fetch(config.googleSheetWebhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEntry),
          }).catch((err) => console.log('Webhook send log:', err));
        } catch (err) {
          console.error('Failed to post to Google Sheet Webhook:', err);
        }
      }

      onNewRegistration(newEntry);
      setSubmittedEntry(newEntry);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyPass = () => {
    if (submittedEntry) {
      navigator.clipboard.writeText(submittedEntry.id);
      setCopiedPassId(true);
      setTimeout(() => setCopiedPassId(false), 2500);
    }
  };

  const resetForm = () => {
    setSubmittedEntry(null);
    setName('');
    setIgn('');
    setGameName('BGMI');
    setMobileNumber('');
    setEmail('');
    setErrors({});
  };

  return (
    <section id="register" className="py-20 bg-[#0D0F12] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-xs font-bold text-[#E8B923] uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Priority Access</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight">
            Be the First to Know — Register Now
          </h2>
          <p className="mt-3 text-base text-[#8A8F98] max-w-xl mx-auto">
            Reserve your squad spot ahead of official room announcements. Get SMS and WhatsApp alerts for upcoming Free Fire & BGMI cash prize matches.
          </p>
        </div>

        {/* Direct Native Dark-Gold Registration Form */}
        <div className="bg-[#1A1D22] rounded-3xl p-6 sm:p-10 border border-[#E8B923]/30 shadow-2xl relative overflow-hidden">
          {/* Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8B923]/5 rounded-full blur-3xl pointer-events-none" />

          {submittedEntry ? (
              /* Success State */
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-[#2ED573]/20 border border-[#2ED573] flex items-center justify-center mx-auto mb-6 text-[#2ED573]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] mb-2">
                  Registration Complete!
                </h3>
                <p className="text-sm text-[#8A8F98] max-w-md mx-auto mb-6">
                  Welcome to SSFT Esports, <strong className="text-[#F5F5F5]">{submittedEntry.name}</strong>! Your interest has been locked in.
                </p>

                {/* Priority Pass Badge */}
                <div className="p-6 rounded-2xl bg-[#0D0F12] border border-[#E8B923]/40 max-w-sm mx-auto mb-8 text-left relative">
                  <div className="text-[10px] font-mono font-bold text-[#E8B923] uppercase tracking-widest mb-1">
                    SSFT OFFICIAL PRIORITY PASS
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black font-mono text-[#F5F5F5]">
                        {submittedEntry.id}
                      </div>
                      <div className="text-xs text-[#8A8F98] mt-1">
                        IGN: <span className="text-[#E8B923] font-bold">{submittedEntry.ign}</span> ({submittedEntry.gameName})
                      </div>
                    </div>
                    <button
                      onClick={handleCopyPass}
                      className="p-2.5 rounded-xl bg-[#1A1D22] border border-white/10 hover:border-[#E8B923] text-[#8A8F98] hover:text-[#E8B923] transition-colors"
                      title="Copy Pass ID"
                    >
                      {copiedPassId ? <CheckCircle2 className="w-5 h-5 text-[#2ED573]" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A1D22] hover:bg-[#1A1D22]/80 border border-white/10 text-[#F5F5F5] font-bold text-sm"
                  >
                    Register Another Squad
                  </button>
                  <a
                    href="#community"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E8B923] hover:bg-[#D4A313] text-[#0D0F12] font-bold text-sm"
                  >
                    Join SSFT WhatsApp Channel
                  </a>
                </div>
              </div>
            ) : (
              /* Actual Form Inputs */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#E8B923]" />
                    <span className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wider">
                      Official SSFT Pre-Registration
                    </span>
                  </div>
                  <span className="text-xs text-[#2ED573] font-mono flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#2ED573] animate-pulse" />
                    Instant Entry
                  </span>
                </div>

                {(errors.mobileNumber?.includes('Duplicate') || errors.ign?.includes('Duplicate')) && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-semibold flex items-center gap-2.5 animate-shake">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    <div>
                      <strong className="block text-red-300 font-bold uppercase tracking-wider text-[11px]">
                        Duplicate Registration Not Approved
                      </strong>
                      <span>This Mobile Number or In-Game Name (IGN) has already been registered! Each player is allowed only 1 registration.</span>
                    </div>
                  </div>
                )}

                {/* Field 1: Name */}
                <div>
                  <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-2">
                    1. Full Name <span className="text-[#E8B923]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Aman Sharma"
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0D0F12] border ${
                        errors.name ? 'border-red-500' : 'border-white/10 focus:border-[#E8B923]'
                      } text-[#F5F5F5] placeholder-[#8A8F98]/50 text-sm focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Field 2: IGN */}
                <div>
                  <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-2">
                    2. In-Game Name (IGN) <span className="text-[#E8B923]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={ign}
                      onChange={(e) => setIgn(e.target.value)}
                      placeholder="e.g., ⚡ SHADOW_KILLER or 512398401"
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0D0F12] border ${
                        errors.ign ? 'border-red-500' : 'border-white/10 focus:border-[#E8B923]'
                      } text-[#F5F5F5] placeholder-[#8A8F98]/50 text-sm focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.ign && <p className="text-xs text-red-400 mt-1">{errors.ign}</p>}
                </div>

                {/* Field 3: Game Name Multiple Choice */}
                <div>
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                    <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider">
                      3. Game Name <span className="text-[#E8B923]">*</span>
                    </label>
                    <span className="text-[11px] font-bold text-[#E8B923] flex items-center gap-1 bg-[#E8B923]/10 px-2 py-0.5 rounded border border-[#E8B923]/20">
                      <Sparkles className="w-3 h-3 text-[#E8B923]" />
                      <span>More Games Coming Soon!</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {(['BGMI', 'Free Fire', 'Both'] as GameChoice[]).map((game) => (
                      <button
                        key={game}
                        type="button"
                        onClick={() => setGameName(game)}
                        className={`py-3.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                          gameName === game
                            ? 'bg-[#E8B923] text-[#0D0F12] border-[#E8B923] shadow-md'
                            : 'bg-[#0D0F12] text-[#8A8F98] border-white/10 hover:border-white/30 hover:text-[#F5F5F5]'
                        }`}
                      >
                        <span>{game}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#8A8F98] mt-1.5 flex items-center gap-1">
                    <span className="text-[#E8B923]">★</span>
                    <span>Currently launching with BGMI & Free Fire. CODM, Valorant PC, CS:GO & Minecraft Bedwars tournaments coming soon!</span>
                  </p>
                </div>

                {/* Field 4: Mobile Number (10 digit validation) */}
                <div>
                  <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-2">
                    4. Mobile Number (10 Digits) <span className="text-[#E8B923]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98] text-sm font-bold">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className={`w-full pl-14 pr-4 py-3.5 rounded-xl bg-[#0D0F12] border ${
                        errors.mobileNumber ? 'border-red-500' : 'border-white/10 focus:border-[#E8B923]'
                      } text-[#F5F5F5] placeholder-[#8A8F98]/50 text-sm font-mono focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.mobileNumber ? (
                    <p className="text-xs text-red-400 mt-1">{errors.mobileNumber}</p>
                  ) : (
                    <p className="text-[11px] text-[#8A8F98] mt-1">
                      Used strictly for tournament room ID/password notifications.
                    </p>
                  )}
                </div>

                {/* Field 5: Email Address */}
                <div>
                  <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-2">
                    5. Email Address <span className="text-[#E8B923]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F98]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., player@example.com"
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0D0F12] border ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#E8B923]'
                      } text-[#F5F5F5] placeholder-[#8A8F98]/50 text-sm focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.email ? (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  ) : (
                    <p className="text-[11px] text-[#8A8F98] mt-1">
                      Used to send official tournament priority pass and updates.
                    </p>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#E8B923] hover:bg-[#D4A313] text-[#0D0F12] font-black text-base tracking-wide transition-all shadow-[0_0_20px_rgba(232,185,35,0.3)] flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#0D0F12] border-t-transparent rounded-full animate-spin" />
                      <span>LOCKING IN REGISTRATION...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 fill-[#0D0F12]" />
                      <span>REGISTER INTEREST NOW</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        {/* Total Registrants Bar */}
        <div className="mt-8 text-center text-xs text-[#8A8F98] font-mono flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2ED573]" />
          <span>{registeredList.length + 12840} Total Registrations Collected Across All Channels</span>
        </div>
      </div>
    </section>
  );
};
