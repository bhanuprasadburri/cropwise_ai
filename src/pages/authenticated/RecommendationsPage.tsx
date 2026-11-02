import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle, TrendingUp, Calendar, Droplets, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getSmartCropRecommendations } from '../../services/cropAI';
import type { Crop } from '../../types';

export const RecommendationsPage: React.FC = () => {
  const { activeFarm } = useApp();
  const [season, setSeason] = useState<'Kharif' | 'Rabi' | 'Zaid'>('Kharif');
  const [soilType, setSoilType] = useState(activeFarm.soilType || 'Clay Loam');
  const [soilPh, setSoilPh] = useState(activeFarm.soilPh || 6.8);
  const [waterAvailability, setWaterAvailability] = useState<'High' | 'Moderate' | 'Low'>('High');

  const [recommendations, setRecommendations] = useState<Crop[]>(() =>
    getSmartCropRecommendations({
      farmName: activeFarm.name,
      season: 'Kharif',
      soilType: activeFarm.soilType || 'Clay Loam',
      soilPh: activeFarm.soilPh || 6.8,
      waterAvailability: 'High',
      farmArea: activeFarm.areaAcres
    })
  );

  const handleCompute = (e: React.FormEvent) => {
    e.preventDefault();
    const recs = getSmartCropRecommendations({
      farmName: activeFarm.name,
      season,
      soilType,
      soilPh,
      waterAvailability,
      farmArea: activeFarm.areaAcres
    });
    setRecommendations(recs);
  };

  return (
    <div className="space-y-8 pb-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-emerald-600" />
            Smart Crop Recommendations
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            AI-driven suitability scoring for <strong className="text-agri-800">{activeFarm.name}</strong> based on soil pH, season, water, and mandi profitability.
          </p>
        </div>
      </div>

      {/* Multi-Parameter Form & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card space-y-4">
          <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-agri-600" /> Farm Input Parameters
          </h3>

          <form onSubmit={handleCompute} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Target Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-semibold"
              >
                <option value="Kharif">Kharif (Monsoon / June - Oct)</option>
                <option value="Rabi">Rabi (Winter / Nov - March)</option>
                <option value="Zaid">Zaid (Summer / April - May)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Soil Type</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-semibold"
              >
                <option value="Clay Loam">Clay Loam</option>
                <option value="Sandy Loam">Sandy Loam</option>
                <option value="Black Cotton">Black Cotton</option>
                <option value="Red Soil">Red Soil</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Soil pH Value</span>
                <span className="text-agri-800">{soilPh} pH</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="8.5"
                step="0.1"
                value={soilPh}
                onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                className="w-full accent-agri-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Water / Irrigation Access</label>
              <select
                value={waterAvailability}
                onChange={(e) => setWaterAvailability(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-semibold"
              >
                <option value="High">High (Abundant Borewell / Canal)</option>
                <option value="Moderate">Moderate (Drip / Seasonal canal)</option>
                <option value="Low">Low (Rainfed / Limited storage)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-agri-brand text-white font-bold text-xs shadow-md hover:bg-agri-dark transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Recalculate AI Match
            </button>
          </form>
        </div>

        {/* Recommended Crops List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-xl text-gray-900">Top Recommended Crops ({recommendations.length})</h2>
            <span className="text-xs text-agri-700 font-bold">Sorted by Match Score</span>
          </div>

          <div className="space-y-6">
            {recommendations.slice(0, 3).map((crop, idx) => (
              <div
                key={crop.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden p-6 space-y-4 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={crop.image} alt={crop.name} className="w-16 h-16 rounded-2xl object-cover border border-gray-200" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-extrabold text-gray-900">{crop.name}</h3>
                        {idx === 0 && (
                          <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                            ★ Top Match
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{crop.category} • {crop.durationDays}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-emerald-600">{crop.suitabilityScore}%</span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase">Match Score</span>
                  </div>
                </div>

                {/* AI Explanation Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-950 space-y-1">
                  <strong className="font-bold block flex items-center gap-1.5 text-emerald-900">
                    <Sparkles className="w-4 h-4 text-emerald-700" /> Why this crop?
                  </strong>
                  <p className="leading-relaxed">{crop.whyRecommended}</p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold bg-gray-50 p-3 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Expected Yield</span>
                    <span className="text-gray-900 font-extrabold">{crop.expectedYield}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Current Price</span>
                    <span className="text-emerald-700 font-extrabold">₹{crop.currentPrice} / qtl</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Predicted Price</span>
                    <span className="text-emerald-700 font-extrabold">₹{crop.predictedPrice} / qtl</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Profit Potential</span>
                    <span className="text-agri-800 font-extrabold">{crop.profitPotential}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-Side Crop Comparison Table */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-4">
        <h2 className="text-2xl font-extrabold text-gray-900">Crop Comparison Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase font-bold text-gray-400">
              <tr>
                <th className="p-3">Crop Name</th>
                <th className="p-3">Suitability Score</th>
                <th className="p-3">Expected Yield</th>
                <th className="p-3">Current Price</th>
                <th className="p-3">Predicted Price</th>
                <th className="p-3">Water Needs</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Profitability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recommendations.slice(0, 4).map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-extrabold text-gray-900">{c.name}</td>
                  <td className="p-3 font-bold text-emerald-700">{c.suitabilityScore}%</td>
                  <td className="p-3 font-medium">{c.expectedYield}</td>
                  <td className="p-3 font-bold">₹{c.currentPrice}</td>
                  <td className="p-3 font-bold text-emerald-600">₹{c.predictedPrice}</td>
                  <td className="p-3 font-medium">{c.waterRequirement}</td>
                  <td className="p-3 font-medium">{c.durationDays}</td>
                  <td className="p-3 font-bold text-agri-800">{c.profitPotential}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
