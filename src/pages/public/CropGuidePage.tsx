import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, ArrowRight, Droplets, Calendar, TrendingUp } from 'lucide-react';
import { sampleCrops } from '../../data/mockData';

export const CropGuidePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'Cereals', 'Vegetables', 'Cash Crops', 'Oilseeds', 'Pulses'];

  const filteredCrops = sampleCrops.filter((crop) => {
    const matchesCat = selectedCategory === 'All' || crop.category === selectedCategory;
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || crop.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-agri-700 uppercase tracking-widest bg-agri-100 px-3 py-1 rounded-full">
          Agronomic Database
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Comprehensive Crop Cultivation Guide
        </h1>
        <p className="text-base text-gray-600">
          Search detailed agronomy practices, water requirements, seasonal sowing windows, and market values for major Indian crops.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-agri-brand text-white shadow-sm'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search crops (e.g. Tomato, Paddy)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-600"
          />
        </div>
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <div key={crop.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="relative">
                <img src={crop.image} alt={crop.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-agri-brand text-white shadow-md">
                  {crop.category}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-agri-800 shadow-md">
                  {crop.bestSeason} Season
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-agri-800 transition-colors">{crop.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{crop.description}</p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-semibold text-gray-700 bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span>Water: <strong>{crop.waterRequirement}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>Duration: <strong>{crop.durationDays}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <div className="flex items-center gap-1 text-emerald-700 font-extrabold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  ₹{crop.currentPrice}/qtl
                </div>
                <Link
                  to={`/crop-guide/${crop.id}`}
                  className="inline-flex items-center gap-1 font-bold text-agri-700 hover:text-agri-900 hover:underline"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
