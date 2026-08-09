export type GameChoice = 'Free Fire' | 'BGMI' | 'Both';

export interface RegistrationEntry {
  id: string;
  name: string;
  ign: string;
  gameName: GameChoice;
  mobileNumber: string;
  email?: string;
  timestamp: string;
}

export interface SiteConfig {
  launchDate: string; // ISO format or YYYY-MM-DD HH:mm
  googleFormEmbedUrl: string;
  googleFormShareUrl: string;
  googleSheetWebhookUrl?: string;
  useGoogleFormEmbedByDefault: boolean;
  collectEmail: boolean;
  contactEmail: string;
  socialLinks: {
    discord: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
}
