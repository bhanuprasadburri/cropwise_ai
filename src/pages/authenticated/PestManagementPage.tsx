import React, { useState } from 'react';
import { Bug, ShieldCheck, AlertTriangle, CheckCircle, Search, Info } from 'lucide-react';
import { pestDatabase } from '../../data/mockData';

export const PestManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('Tomato');

  const activePest = pestDatabase[0];

  return (
    <div className="space-y-8 pb-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Bug className="w-7 h-7 text-teal-600" />
            Integrated Pest Management (IPM) Advisor
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Search crop pests and implement the 4-tier IPM hierarchy before using chemical pesticides.
          </p>
        </div>

        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
        >
          <option value="Tomato">Tomato (Fruit Borer)</option>
          <option value="Paddy">Paddy (Stem Borer)</option>
          <option value="Cotton">Cotton (Pink Bollworm)</option>
        </select>
      </div>

      {/* Main Pest IPM Card */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
              Severity: {activePest.severity} Risk
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-2">{activePest.pestName}</h2>
            <p className="text-xs text-gray-500">Target Crop: {activePest.crop} • Stage: {activePest.stage}</p>
          </div>
        </div>

        {/* Symptoms */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
          <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Visual Damage Symptoms</h4>
          <ul className="space-y-1 text-xs text-gray-700">
            {activePest.symptoms.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span> {s}
              </li>
            ))}
          </ul>
        </div>

        {/* IPM 4-Tier Steps */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-lg text-gray-900">4-Tier Integrated Pest Control Strategy</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Cultural Control */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-2">
              <h4 className="font-extrabold text-xs text-emerald-900 uppercase">Tier 1: Cultural Control</h4>
              <ul className="space-y-1.5 text-xs text-gray-800">
                {activePest.culturalControl.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Mechanical Control */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-2">
              <h4 className="font-extrabold text-xs text-blue-900 uppercase">Tier 2: Mechanical & Physical</h4>
              <ul className="space-y-1.5 text-xs text-gray-800">
                {activePest.mechanicalControl.map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Biological Control */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-2">
              <h4 className="font-extrabold text-xs text-amber-900 uppercase">Tier 3: Biological Control</h4>
              <ul className="space-y-1.5 text-xs text-gray-800">
                {activePest.biologicalControl.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Chemical Control */}
            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/60 space-y-2">
              <h4 className="font-extrabold text-xs text-purple-900 uppercase">Tier 4: Chemical Control (Last Resort)</h4>
              <ul className="space-y-1.5 text-xs text-gray-800">
                {activePest.chemicalControl.map((chem) => (
                  <li key={chem} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{chem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Warning */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block">Pesticide Label Compliance Warning:</strong>
            {activePest.safetyWarning}
          </div>
        </div>
      </div>
    </div>
  );
};
