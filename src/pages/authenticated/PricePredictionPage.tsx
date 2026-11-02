import React, { useState } from 'react';
import { LineChart, Sparkles, TrendingUp, AlertCircle, ShieldAlert, Calendar, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Line, ComposedChart } from 'recharts';
import { predictFutureMarketPrice } from '../../services/priceAI';

export const PricePredictionPage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('Paddy (Common)');
  const [horizonDays, setHorizonDays] = useState<number>(30);

  const prediction = predictFutureMarketPrice({
    cropName: selectedCrop,
    state: 'Andhra Pradesh',
    district: 'Palnadu',
    horizonDays
  });

  // Combine historical and prediction series for chart
  const combinedSeries = [
    ...prediction.historicalSeries.map((h) => ({
      date: h.date,
      historicalPrice: h.price,
      predictedPrice: null as number | null,
      confidenceHigh: null as number | null
    })),
    ...prediction.predictedSeries.map((p) => ({
      date: p.date,
      historicalPrice: null as number | null,
      predictedPrice: p.price,
      confidenceHigh: p.confidenceHigh
    }))
  ];

  return (
    <div className="space-y-8 pb-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <LineChart className="w-7 h-7 text-purple-600" />
            AI Future Price Prediction Engine
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Time-series machine learning model forecasting expected mandi prices for 7 to 90 days.
          </p>
        </div>

        {/* Prediction Period Options */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-gray-700">Horizon:</label>
          {[7, 30, 60, 90].map((days) => (
            <button
              key={days}
              onClick={() => setHorizonDays(days)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                horizonDays === days
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      {/* Main Prediction Summary Card */}
      <div className="bg-gradient-to-br from-purple-900 via-agri-dark to-agri-sidebar rounded-3xl p-8 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="bg-purple-400/20 text-purple-200 text-xs font-extrabold px-3 py-1 rounded-full border border-purple-400/30">
              AI Forecast Model (Confidence: {prediction.confidenceScore}%)
            </span>
            <h2 className="text-3xl font-extrabold mt-2">{prediction.cropName} Price Outlook</h2>
            <p className="text-xs text-purple-200 mt-0.5">Forecast Horizon: Next {horizonDays} Days</p>
          </div>

          <div className="text-right">
            <span className="text-4xl font-extrabold text-emerald-400">₹{prediction.predictedPrice}</span>
            <span className="block text-xs font-bold text-purple-200">Predicted Rate / qtl (+{prediction.priceChangePercent}%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-[10px] text-purple-200 uppercase font-bold">Current Rate Today</span>
            <p className="text-2xl font-extrabold text-white">₹{prediction.currentPrice} / qtl</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-[10px] text-purple-200 uppercase font-bold">Expected Net Gain</span>
            <p className="text-2xl font-extrabold text-emerald-300">+₹{prediction.predictedPrice - prediction.currentPrice} / qtl</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-[10px] text-purple-200 uppercase font-bold">Forecast Direction</span>
            <p className="text-2xl font-extrabold text-amber-300">{prediction.trend} Trend</p>
          </div>
        </div>
      </div>

      {/* Historical vs Predicted Forecast Chart */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-gray-900">Historical vs Predicted Price Series</h3>
            <p className="text-xs text-gray-500">Solid line indicates past mandi data; dashed line represents AI forecast</p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={combinedSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip formatter={(value) => value ? [`₹${value}/qtl`, 'Rate'] : ['-', '']} />
              <Line type="monotone" dataKey="historicalPrice" stroke="#2563eb" strokeWidth={3} name="Historical Rate" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="predictedPrice" stroke="#9333ea" strokeWidth={3} strokeDasharray="5 5" name="AI Forecast" dot={{ r: 5, fill: '#9333ea' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Factors Section */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">Why is the price predicted to change?</h3>
        <ul className="space-y-3">
          {prediction.factors.map((factor) => (
            <li key={factor} className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-semibold text-gray-800 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span>{factor}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
