import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Scan, TrendingUp, CloudSun, Eye, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../../context/AppContext';
import { TodayInsightsCard } from '../../components/dashboard/TodayInsightsCard';
import { SummaryCards } from '../../components/dashboard/SummaryCards';
import { FarmHealthScore } from '../../components/dashboard/FarmHealthScore';
import { QuickActionsGrid } from '../../components/dashboard/QuickActionsGrid';
import { sampleMarketData } from '../../data/mockData';

export const DashboardPage: React.FC = () => {
  const { userProfile, activeFarm, diseaseScans, isAuthenticated } = useApp();

  const miniChartData = sampleMarketData[0].historicalPrices;

  return (
    <div className="space-y-6 pb-8">
      {!isAuthenticated && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs font-bold flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <span>
              <strong>Interactive Demo Mode (Farmer: XYZ)</strong> — You are viewing sample farm data. <Link to="/register" className="text-agri-800 underline">Sign Up with @gmail.com</Link> to save your real farm records into your XAMPP MariaDB database!
            </span>
          </div>
          <Link to="/login" className="px-3 py-1.5 bg-agri-brand text-white rounded-xl text-[11px] font-extrabold shrink-0 hover:bg-agri-dark">
            Sign In with Password
          </Link>
        </div>
      )}

      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, {isAuthenticated ? userProfile.name : 'XYZ (Demo Mode)'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Here's what's happening with <strong className="text-agri-800">{activeFarm.name}</strong> ({activeFarm.areaAcres} Acres, {activeFarm.district}, {activeFarm.state}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/disease-detection"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-xs shadow-md hover:bg-agri-dark transition-colors"
          >
            <Scan className="w-4 h-4 text-agri-300" />
            AI Leaf Scan
          </Link>
        </div>
      </div>

      {/* AI Insights Alert Banner */}
      <TodayInsightsCard />

      {/* 6 Summary Metric Cards */}
      <SummaryCards />

      {/* Grid: Health Score & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FarmHealthScore score={activeFarm.healthScore} />
        <QuickActionsGrid />
      </div>

      {/* Grid: Mini Charts (Market Trend & Weather Telemetry) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Trend Mini Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-agri-700" />
                Paddy Mandi Rate Trend (AP)
              </h3>
              <p className="text-xs text-gray-500">Historical price movement past 30 days (₹/quintal)</p>
            </div>
            <Link to="/market" className="text-xs font-bold text-agri-700 hover:underline">
              View Market
            </Link>
          </div>

          <div className="h-52 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={miniChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => [`₹${value}/qtl`, 'Rate']} />
                <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, fill: '#16a34a' }} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Disease Scans Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <Scan className="w-5 h-5 text-rose-600" />
                Recent AI Disease Scans
              </h3>
              <p className="text-xs text-gray-500">Pathology scans performed on your crops</p>
            </div>
            <Link to="/disease-detection" className="text-xs font-bold text-agri-700 hover:underline">
              Scan History
            </Link>
          </div>

          <div className="space-y-3 overflow-x-auto">
            {diseaseScans.slice(0, 2).map((scan) => (
              <div key={scan.id} className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={scan.leafImageUrl} alt={scan.crop} className="w-12 h-12 rounded-xl object-cover border border-gray-200" />
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">{scan.crop} – {scan.diseaseName}</h4>
                    <span className="text-[10px] text-gray-500">{scan.date} • {scan.farmName}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-emerald-600 block">{scan.confidence}% Confidence</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 inline-block mt-0.5">
                    {scan.severity} Risk
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/disease-detection"
            className="w-full py-2.5 rounded-xl bg-agri-50 border border-agri-200 text-agri-800 text-xs font-bold text-center block hover:bg-agri-100 transition-colors"
          >
            + Run New Crop Leaf Scan
          </Link>
        </div>
      </div>
    </div>
  );
};
