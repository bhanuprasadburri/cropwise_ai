import React from 'react';
import { Sprout, ShieldCheck, Target, Heart, Award, Cpu } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-agri-700 uppercase tracking-widest bg-agri-100 px-3 py-1 rounded-full">
          About CropWise AI
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Technology for Smarter and Sustainable Farming
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          CropWise AI combines artificial intelligence, agricultural data, weather intelligence, crop disease detection, and market analytics to help farmers make informed decisions.
        </p>
      </div>

      {/* Mission Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Our Mission</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Empower smallholder and commercial farmers with accessible, real-time AI tools that reduce crop losses, optimize fertilizer inputs, and maximize market profit margins.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Our Vision</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Create a climate-resilient, data-driven agricultural ecosystem where computer vision and time-series forecasting eliminate crop failure risks across India.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-agri-dark text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <h2 className="text-3xl font-extrabold text-center tracking-tight">Our Guiding Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
            <Cpu className="w-6 h-6 text-agri-300" />
            <h3 className="font-bold text-lg">AI Innovation</h3>
            <p className="text-xs text-agri-100/80">State-of-the-art CNN pathology models & time-series price predictors.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
            <Heart className="w-6 h-6 text-emerald-300" />
            <h3 className="font-bold text-lg">Farmer First</h3>
            <p className="text-xs text-agri-100/80">Designed for ease of use in regional languages without complex tech speak.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
            <ShieldCheck className="w-6 h-6 text-amber-300" />
            <h3 className="font-bold text-lg">Sustainability</h3>
            <p className="text-xs text-agri-100/80">Promoting organic soil bio-fertilizers and Integrated Pest Management.</p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 space-y-2">
            <Sprout className="w-6 h-6 text-sky-300" />
            <h3 className="font-bold text-lg">Data Integrity</h3>
            <p className="text-xs text-agri-100/80">Empirical agricultural data verified with Krishi Vigyan Kendras.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
