import React, { useState } from 'react';
import { TrendingUp, Filter, Search, BarChart2, Calendar, MapPin } from 'lucide-react';
import { ResponsiveContainer, LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { sampleMarketData } from '../../data/mockData';

export const MarketPricesPage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('Paddy (Common)');
  const [selectedState, setSelectedState] = useState('Andhra Pradesh');

  const currentMarket = sampleMarketData.find((m) => m.cropName === selectedCrop) || sampleMarketData[0];

  const mandiComparisonData = [
    { mandi: 'Narasaraopet (Palnadu)', price: currentMarket.currentPrice },
    { mandi: 'Guntur Wholesale', price: currentMarket.currentPrice + 40 },
    { mandi: 'Vijayawada APMC', price: currentMarket.currentPrice + 80 },
    { mandi: 'Kurnool Yard', price: currentMarket.currentPrice - 30 },
    { mandi: 'Warangal Mandi', price: currentMarket.currentPrice + 10 }
  ];

  return (
    <div className="space-y-8 pb-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-blue-600" />
            Market Price Intelligence
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time AP & Indian wholesale Mandi rates, historical trends, and arrival volumes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
          >
            <option value="Paddy (Common)">Paddy (Common)</option>
            <option value="Tomato">Tomato</option>
            <option value="Cotton (Lint)">Cotton (Lint)</option>
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
          >
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Telangana">Telangana</option>
            <option value="Punjab">Punjab</option>
          </select>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400">Prevailing Mandi Rate</span>
          <p className="text-3xl font-extrabold text-gray-900">₹{currentMarket.currentPrice} <span className="text-xs text-gray-500 font-normal">/ qtl</span></p>
          <span className="text-xs text-emerald-600 font-bold">+{currentMarket.priceChange}% this month</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400">Daily Arrival Volume</span>
          <p className="text-xl font-extrabold text-gray-900">{currentMarket.arrivalVolume}</p>
          <span className="text-xs text-gray-500 font-medium">Narasaraopet APMC Yard</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400">Market Demand Index</span>
          <p className="text-xl font-extrabold text-emerald-700">{currentMarket.demand} Demand</p>
          <span className="text-xs text-gray-500 font-medium">High Mill Procurement</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400">30-Day Forecast Outlook</span>
          <p className="text-xl font-extrabold text-agri-800">
            ₹{currentMarket.futurePredictions[2]?.price || currentMarket.currentPrice + 180} / qtl
          </p>
          <span className="text-xs text-emerald-600 font-bold">Upward Price Signal</span>
        </div>
      </div>

      {/* Historical Line Chart & Mandi Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historical Chart */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card space-y-4">
          <h3 className="font-extrabold text-base text-gray-900">30-Day Mandi Price Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={currentMarket.historicalPrices}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => [`₹${value}/qtl`, 'Price']} />
                <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* State Mandi Comparison Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card space-y-4">
          <h3 className="font-extrabold text-base text-gray-900">Cross-Mandi Rate Comparison</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mandiComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mandi" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => [`₹${value}/qtl`, 'Rate']} />
                <Bar dataKey="price" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
