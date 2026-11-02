import React, { useState } from 'react';
import { Settings, Globe, Shield, Bell, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { userProfile, setUserProfile } = useApp();
  const [saved, setSaved] = useState(false);

  const [lang, setLang] = useState(userProfile.preferredLanguage);
  const [units, setUnits] = useState('Metric (Acres, Quintals, °C)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile((prev) => ({ ...prev, preferredLanguage: lang }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Settings className="w-7 h-7 text-gray-700" />
            Account & App Settings
          </h1>
          <p className="text-xs text-gray-500 mt-1">Configure language, units of measure, notification channels, and data preferences.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" /> Settings preferences saved!
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-6">
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-gray-900 border-b border-gray-100 pb-2">Language & Regional Preferences</h3>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Language</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full max-w-md px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-semibold"
            >
              <option value="Telugu / English">Telugu / English (తెలుగు)</option>
              <option value="English Only">English Only</option>
              <option value="Hindi / English">Hindi / English (हिंदी)</option>
              <option value="Tamil / English">Tamil / English (தமிழ்)</option>
              <option value="Kannada / English">Kannada / English (கன்னட)</option>
              <option value="Marathi / English">Marathi / English (मराठी)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Units of Measurement</label>
            <select
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full max-w-md px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-semibold"
            >
              <option value="Metric (Acres, Quintals, °C)">Metric (Acres, Quintals, °C)</option>
              <option value="Hectares & Tonnes">Hectares & Tonnes</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="font-extrabold text-base text-gray-900 border-b border-gray-100 pb-2">Notification Channels</h3>

          <div className="space-y-2 text-xs font-semibold text-gray-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-agri-600" />
              WhatsApp Disease Scan Alerts & IPM Tips
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-agri-600" />
              SMS Extreme Weather Warnings (Rain & Wind)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded text-agri-600" />
              Daily Mandi Price Fluctuation Summary
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-xs shadow-md hover:bg-agri-dark transition-colors"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};
