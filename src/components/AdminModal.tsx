import React, { useState } from 'react';
import { X, Save, Download, Copy, Check, FileSpreadsheet, Calendar, Globe, HelpCircle, Trash2 } from 'lucide-react';
import { RegistrationEntry, SiteConfig } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSaveConfig: (updated: SiteConfig) => void;
  registrations: RegistrationEntry[];
  onClearRegistrations: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  registrations,
  onClearRegistrations,
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'submissions' | 'setupGuide'>('config');

  // Form config state
  const [googleFormEmbedUrl, setGoogleFormEmbedUrl] = useState(config.googleFormEmbedUrl);
  const [googleFormShareUrl, setGoogleFormShareUrl] = useState(config.googleFormShareUrl);
  const [googleSheetWebhookUrl, setGoogleSheetWebhookUrl] = useState(config.googleSheetWebhookUrl || '');
  const [launchDate, setLaunchDate] = useState(config.launchDate.substring(0, 16));
  const [contactEmail, setContactEmail] = useState(config.contactEmail);
  const [useGoogleFormEmbedByDefault, setUseGoogleFormEmbedByDefault] = useState(
    config.useGoogleFormEmbedByDefault
  );
  const [socialLinks, setSocialLinks] = useState(config.socialLinks);

  const [copiedCsv, setCopiedCsv] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      googleFormEmbedUrl,
      googleFormShareUrl,
      googleSheetWebhookUrl,
      launchDate: new Date(launchDate).toISOString(),
      contactEmail,
      useGoogleFormEmbedByDefault,
      socialLinks,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'IGN', 'Game', 'Mobile Number', 'Email', 'Timestamp'];
    const rows = registrations.map((r) => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.ign.replace(/"/g, '""')}"`,
      r.gameName,
      `"${r.mobileNumber}"`,
      r.email ? `"${r.email}"` : '',
      r.timestamp,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ssft_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(registrations, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1A1D22] border border-[#E8B923]/40 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-[#0D0F12] border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#F5F5F5] flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#E8B923]" />
              <span>SSFT Organizer & Page Configuration</span>
            </h3>
            <p className="text-xs text-[#8A8F98] mt-0.5">
              Customize countdown launch date, Google Form embed code, and view leads.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1A1D22] hover:bg-white/10 text-[#8A8F98] hover:text-[#F5F5F5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 bg-[#0D0F12]/50 text-xs font-bold text-[#8A8F98]">
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 py-3 px-4 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'config'
                ? 'bg-[#1A1D22] text-[#E8B923] border-b-2 border-[#E8B923]'
                : 'hover:text-[#F5F5F5]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Site & Form Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 py-3 px-4 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'submissions'
                ? 'bg-[#1A1D22] text-[#E8B923] border-b-2 border-[#E8B923]'
                : 'hover:text-[#F5F5F5]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Collected Leads ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('setupGuide')}
            className={`flex-1 py-3 px-4 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'setupGuide'
                ? 'bg-[#1A1D22] text-[#E8B923] border-b-2 border-[#E8B923]'
                : 'hover:text-[#F5F5F5]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Google Forms Guide</span>
          </button>
        </div>

        {/* Tab 1: Configuration */}
        {activeTab === 'config' && (
          <form onSubmit={handleSave} className="p-6 space-y-6 text-sm">
            {savedSuccess && (
              <div className="p-3 rounded-xl bg-[#2ED573]/20 border border-[#2ED573] text-[#2ED573] font-bold text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Configuration saved successfully!</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#2ED573] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-[#2ED573]" />
                <span>Google Apps Script Webhook URL (Live Direct Sheet Capture)</span>
              </label>
              <input
                type="text"
                value={googleSheetWebhookUrl}
                onChange={(e) => setGoogleSheetWebhookUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                className="w-full px-4 py-3 rounded-xl bg-[#0D0F12] border border-[#2ED573]/30 text-[#F5F5F5] text-xs font-mono focus:outline-none focus:border-[#2ED573]"
              />
              <p className="text-[11px] text-[#8A8F98] mt-1">
                Paste your deployed Google Apps Script Web App URL here to capture every website form submission directly in your Google Sheet in real time!
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-2">
                Google Form Embed URL
              </label>
              <input
                type="text"
                value={googleFormEmbedUrl}
                onChange={(e) => setGoogleFormEmbedUrl(e.target.value)}
                placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
                className="w-full px-4 py-3 rounded-xl bg-[#0D0F12] border border-white/10 text-[#F5F5F5] text-xs font-mono focus:outline-none focus:border-[#E8B923]"
              />
              <p className="text-[11px] text-[#8A8F98] mt-1">
                Obtain from Google Forms: Send &rarr; Embed (&lt;&gt;) &rarr; Copy src URL.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-2">
                Google Form Shareable Link (New Tab)
              </label>
              <input
                type="text"
                value={googleFormShareUrl}
                onChange={(e) => setGoogleFormShareUrl(e.target.value)}
                placeholder="https://forms.gle/..."
                className="w-full px-4 py-3 rounded-xl bg-[#0D0F12] border border-white/10 text-[#F5F5F5] text-xs font-mono focus:outline-none focus:border-[#E8B923]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E8B923]" />
                  <span>Countdown Launch Date</span>
                </label>
                <input
                  type="datetime-local"
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0F12] border border-white/10 text-[#F5F5F5] text-xs focus:outline-none focus:border-[#E8B923]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#F5F5F5] uppercase tracking-wider mb-2">
                  Contact / Support Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0F12] border border-white/10 text-[#F5F5F5] text-xs focus:outline-none focus:border-[#E8B923]"
                />
              </div>
            </div>

            {/* Social Links Section */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <label className="block text-xs font-bold text-[#E8B923] uppercase tracking-wider">
                Official Social & Community Links
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#8A8F98] mb-1">WhatsApp Channel Link</label>
                  <input
                    type="text"
                    value={socialLinks.whatsapp}
                    onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0F12] border border-white/10 text-[#F5F5F5] text-xs font-mono focus:border-[#E8B923]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8A8F98] mb-1">Discord Invite Link</label>
                  <input
                    type="text"
                    value={socialLinks.discord}
                    onChange={(e) => setSocialLinks({ ...socialLinks, discord: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0F12] border border-white/10 text-[#F5F5F5] text-xs font-mono focus:border-[#E8B923]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8A8F98] mb-1">YouTube Channel Link</label>
                  <input
                    type="text"
                    value={socialLinks.youtube}
                    onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0F12] border border-white/10 text-[#F5F5F5] text-xs font-mono focus:border-[#E8B923]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8A8F98] mb-1">Instagram Link</label>
                  <input
                    type="text"
                    value={socialLinks.instagram}
                    onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0F12] border border-white/10 text-[#F5F5F5] text-xs font-mono focus:border-[#E8B923]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0D0F12] border border-white/5">
              <input
                type="checkbox"
                id="defaultFormToggle"
                checked={useGoogleFormEmbedByDefault}
                onChange={(e) => setUseGoogleFormEmbedByDefault(e.target.checked)}
                className="w-4 h-4 rounded accent-[#E8B923]"
              />
              <label htmlFor="defaultFormToggle" className="text-xs text-[#F5F5F5] cursor-pointer">
                <strong>Show Embedded Google Form as Default View</strong> (instead of the native dark-gold form)
              </label>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#0D0F12] text-[#8A8F98] hover:text-[#F5F5F5] font-bold text-xs"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#E8B923] hover:bg-[#D4A313] text-[#0D0F12] font-bold text-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Collected Submissions */}
        {activeTab === 'submissions' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#F5F5F5]">Local Pre-Registrations</h4>
                <p className="text-xs text-[#8A8F98]">Total {registrations.length} submissions saved locally in browser.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportCSV}
                  disabled={registrations.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-[#2ED573]/20 border border-[#2ED573]/40 text-[#2ED573] hover:bg-[#2ED573]/30 font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={copyJSON}
                  disabled={registrations.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-[#1A1D22] border border-white/10 text-[#F5F5F5] hover:border-[#E8B923] font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Copy className="w-4 h-4 text-[#E8B923]" />
                  <span>{copiedJson ? 'Copied!' : 'Copy JSON'}</span>
                </button>
              </div>
            </div>

            {registrations.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#8A8F98] bg-[#0D0F12] rounded-2xl border border-white/5">
                No local submissions collected yet. Use the registration form to submit entries!
              </div>
            ) : (
              <div className="max-h-[350px] overflow-y-auto rounded-2xl border border-white/10 bg-[#0D0F12]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1A1D22] text-[#E8B923] uppercase font-mono border-b border-white/10 sticky top-0">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">IGN</th>
                      <th className="p-3">Game</th>
                      <th className="p-3">Mobile</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#F5F5F5]">
                    {registrations.map((r) => (
                      <tr key={r.id} className="hover:bg-white/5">
                        <td className="p-3 font-mono text-[#E8B923] font-bold">{r.id}</td>
                        <td className="p-3 font-semibold">{r.name}</td>
                        <td className="p-3 font-mono text-xs">{r.ign}</td>
                        <td className="p-3 font-bold">{r.gameName}</td>
                        <td className="p-3 font-mono">{r.mobileNumber}</td>
                        <td className="p-3 text-[#8A8F98]">{new Date(r.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {registrations.length > 0 && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={onClearRegistrations}
                  className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Local Submissions</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Google Sheets & Google Forms Setup Guide */}
        {activeTab === 'setupGuide' && (
          <div className="p-6 space-y-6 text-xs text-[#8A8F98] leading-relaxed max-h-[480px] overflow-y-auto">
            {/* Method A: Direct Google Sheets Webhook */}
            <div className="p-4 rounded-2xl bg-[#0D0F12] border border-[#2ED573]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-[#2ED573]" />
                  <h4 className="text-sm font-bold text-[#F5F5F5]">Method A: Direct Google Sheet Capture (Real-Time Webhook)</h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2ED573]/20 text-[#2ED573] border border-[#2ED573]/40">
                  RECOMMENDED
                </span>
              </div>
              <p className="text-xs text-[#8A8F98]">
                Captures submissions from the native SSFT form directly into your Google Sheet instantly.
              </p>

              <ol className="list-decimal pl-5 space-y-2 text-xs text-[#F5F5F5]">
                <li>
                  Open <a href="https://sheets.google.com" target="_blank" rel="noreferrer" className="text-[#2ED573] underline font-bold">Google Sheets</a> and create a new blank spreadsheet.
                </li>
                <li>
                  Click <strong>Extensions</strong> &rarr; <strong>Apps Script</strong>.
                </li>
                <li>
                  Delete any existing code, paste the script below, and click <strong>Save</strong> (💾 icon).
                </li>
              </ol>

              {/* Code Snippet */}
              <div className="relative mt-2">
                <div className="flex items-center justify-between bg-[#1A1D22] px-3 py-1.5 rounded-t-xl border-t border-x border-white/10 text-[11px] font-mono text-[#E8B923]">
                  <span>Code.gs</span>
                  <button
                    type="button"
                    onClick={() => {
                      const code = `function doPost(e) {\n  try {\n    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();\n    var data = JSON.parse(e.postData.contents);\n    if (sheet.getLastRow() === 0) {\n      sheet.appendRow(["Pass ID", "Full Name", "IGN", "Game", "Mobile Number", "Email", "Timestamp"]);\n    }\n    sheet.appendRow([\n      data.id,\n      data.name,\n      data.ign,\n      data.gameName,\n      data.mobileNumber,\n      data.email || '',\n      data.timestamp\n    ]);\n    return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);\n  } catch(err) {\n    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": err.toString()})).setMimeType(ContentService.MimeType.JSON);\n  }\n}`;
                      navigator.clipboard.writeText(code);
                      setCopiedScript(true);
                      setTimeout(() => setCopiedScript(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[#2ED573] hover:underline font-bold"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedScript ? 'Copied Code!' : 'Copy Script'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#08090A] border border-white/10 rounded-b-xl text-[10px] font-mono text-[#2ED573] overflow-x-auto whitespace-pre">
{`function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Pass ID", "Full Name", "IGN", "Game", "Mobile Number", "Email", "Timestamp"]);
    }
    sheet.appendRow([
      data.id, data.name, data.ign, data.gameName, data.mobileNumber, data.email || '', data.timestamp
    ]);
    return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}`}
                </pre>
              </div>

              <ol className="list-decimal pl-5 space-y-2 text-xs text-[#F5F5F5] pt-2" start={4}>
                <li>
                  Click top-right <strong>Deploy</strong> &rarr; <strong>New Deployment</strong>.
                </li>
                <li>
                  Click Gear icon ⚙️ &rarr; Select <strong>Web app</strong>.
                </li>
                <li>
                  Set <strong>Execute as:</strong> <code className="text-[#E8B923]">Me</code> and <strong>Who has access:</strong> <code className="text-[#2ED573]">Anyone</code> (Crucial!).
                </li>
                <li>
                  Click <strong>Deploy</strong>, grant permissions, and copy the <strong>Web App URL</strong>.
                </li>
                <li>
                  Paste that Web App URL into the <strong>Google Apps Script Webhook URL</strong> box in <strong>Site Settings</strong> tab and click <strong>Save Settings</strong>. Done!
                </li>
              </ol>
            </div>

            {/* Method B: Embedded Google Form */}
            <div className="p-4 rounded-2xl bg-[#0D0F12] border border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-[#F5F5F5]">Method B: Google Forms Embed Method (No Code)</h4>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[#F5F5F5]">
                <li>
                  Create a form at <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="text-[#E8B923] underline">Google Forms</a> with: <code className="text-[#E8B923]">Name</code>, <code className="text-[#E8B923]">IGN</code>, <code className="text-[#E8B923]">Game Name</code>, and <code className="text-[#E8B923]">Mobile Number</code>.
                </li>
                <li>
                  Go to <strong>Responses</strong> tab in Google Forms &rarr; click green <strong>Sheets</strong> icon to link it to a Google Sheet.
                </li>
                <li>
                  Click <strong>Send</strong> &rarr; <strong>Embed (&lt;&gt;)</strong> &rarr; Copy the <code className="text-[#E8B923]">src="..."</code> URL.
                </li>
                <li>
                  Paste it in the <strong>Google Form Embed URL</strong> setting tab.
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
