import { SiteConfig, RegistrationEntry } from '../types';

export const defaultConfig: SiteConfig = {
  launchDate: '2026-09-15T18:00:00+05:30', // Launch date countdown
  googleFormEmbedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc_EXAMPLE_FORM_ID/viewform?embedded=true',
  googleFormShareUrl: 'https://forms.gle/SSFTournamentsInterest',
  googleSheetWebhookUrl: 'https://script.google.com/macros/s/AKfycbzsUKpUsbf_iTkSF2eAKB107pNsHc-1-0X0-47OxUQ5UjyW9T28u-MKqz3pZR_zkW9g/exec',
  useGoogleFormEmbedByDefault: false,
  collectEmail: false,
  contactEmail: 'contact@ssftournaments.com',
  socialLinks: {
    discord: 'https://discord.gg/ZcPZKJqBG',
    instagram: 'https://instagram.com/ssf_tournaments',
    youtube: 'https://www.youtube.com/channel/UC7jYeQprGTSssYLCxVuf80Q',
    whatsapp: 'https://chat.whatsapp.com/FURb2ciM0J7E8pq61uKrAK',
  },
};

export const initialRegistrations: RegistrationEntry[] = [
  {
    id: 'SSFT-8091',
    name: 'Aman Sharma',
    ign: '⚡ SHADOW_KILLER',
    gameName: 'BGMI',
    mobileNumber: '9876543210',
    timestamp: '2026-08-07T10:15:00.000Z',
  },
  {
    id: 'SSFT-8092',
    name: 'Rohan Verma',
    ign: '🔥 VIPER_SQUAD_07',
    gameName: 'Free Fire',
    mobileNumber: '9812345678',
    timestamp: '2026-08-07T09:40:00.000Z',
  },
  {
    id: 'SSFT-8093',
    name: 'Vikram Singh',
    ign: '👑 GOD_VALKYRIE',
    gameName: 'Both',
    mobileNumber: '9765432109',
    timestamp: '2026-08-07T09:10:00.000Z',
  },
  {
    id: 'SSFT-8094',
    name: 'Priya Das',
    ign: '✨ QUEEN_MORTAL',
    gameName: 'BGMI',
    mobileNumber: '9988776655',
    timestamp: '2026-08-07T08:25:00.000Z',
  },
  {
    id: 'SSFT-8095',
    name: 'Sameer Khan',
    ign: '☠️ ALPHA_OP_99',
    gameName: 'Free Fire',
    mobileNumber: '9123456780',
    timestamp: '2026-08-07T07:50:00.000Z',
  },
];
