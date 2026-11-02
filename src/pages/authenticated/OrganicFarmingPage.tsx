import React, { useState } from 'react';
import { Leaf, CheckCircle, Info, Sparkles, BookOpen } from 'lucide-react';
import { organicPractices } from '../../data/mockData';

export const OrganicFarmingPage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');

  const practices = organicPractices.filter((p) => p.crop.toLowerCase().includes(selectedCrop.toLowerCase())) || organicPractices;

  return (
    <div className="space-y-8 pb-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Leaf className="w-7 h-7 text-amber-600" />
            Organic Farming Assistant
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Sustainable soil bio-fertilizers, vermicompost, Neem cake, bio-pesticides, and mulching guidelines.
          </p>
        </div>

        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
        >
          <option value="Tomato">Tomato</option>
          <option value="Paddy">Paddy (Rice)</option>
        </select>
      </div>

      {/* Organic Packages Cards */}
      <div className="space-y-6">
        {practices.map((prac) => (
          <div key={prac.title} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                  {prac.practiceType} • {prac.stage}
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 mt-2">{prac.title}</h3>
              </div>
              <span className="text-xs font-bold text-agri-800 bg-agri-50 px-3 py-1 rounded-full border border-agri-200">
                Crop: {prac.crop}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">{prac.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                <strong className="text-xs font-extrabold text-emerald-900 block">How to Apply & Dosage:</strong>
                <p className="text-xs text-gray-700 leading-relaxed">{prac.howToApply}</p>
                <span className="text-[10px] text-emerald-700 font-bold block pt-1">Frequency: {prac.frequency}</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
                <strong className="text-xs font-extrabold text-amber-900 block">Soil & Plant Benefits:</strong>
                <p className="text-xs text-gray-700 leading-relaxed">{prac.benefits}</p>
                <span className="text-[10px] text-amber-800 font-bold block pt-1">Precautions: {prac.precautions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
