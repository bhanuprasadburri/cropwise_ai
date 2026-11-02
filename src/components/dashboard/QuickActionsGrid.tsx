import React from 'react';
import { Link } from 'react-router-dom';
import { Scan, Sparkles, TrendingUp, LineChart, CloudSun, Leaf, Bug, Tractor } from 'lucide-react';

export const QuickActionsGrid: React.FC = () => {
  const actions = [
    { title: 'Detect Disease', icon: Scan, path: '/disease-detection', color: 'bg-rose-500 text-white', desc: 'Scan leaf photo' },
    { title: 'Find Best Crop', icon: Sparkles, path: '/crop-recommendation', color: 'bg-emerald-600 text-white', desc: 'AI Crop Match' },
    { title: 'Check Market Price', icon: TrendingUp, path: '/market', color: 'bg-blue-600 text-white', desc: 'Mandi Live Rates' },
    { title: 'Predict Future Price', icon: LineChart, path: '/price-prediction', color: 'bg-purple-600 text-white', desc: 'Price AI Horizon' },
    { title: 'View Weather', icon: CloudSun, path: '/weather', color: 'bg-sky-500 text-white', desc: '7-Day Forecast' },
    { title: 'Organic Farming', icon: Leaf, path: '/organic-farming', color: 'bg-amber-600 text-white', desc: 'Bio & Vermicompost' },
    { title: 'Pest Advisor (IPM)', icon: Bug, path: '/pest-management', color: 'bg-teal-600 text-white', desc: 'Pest Control Guide' },
    { title: 'Manage Farms', icon: Tractor, path: '/farms', color: 'bg-agri-dark text-white', desc: 'Soil & Acreage' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
      <h3 className="font-extrabold text-base text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.title}
              to={act.path}
              className="p-3.5 rounded-xl border border-gray-100 hover:border-agri-300 hover:shadow-md transition-all group flex flex-col items-center text-center bg-gray-50/50 hover:bg-white"
            >
              <div className={`w-10 h-10 rounded-xl ${act.color} flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-gray-900 group-hover:text-agri-800 transition-colors">{act.title}</span>
              <span className="text-[10px] text-gray-400 font-medium mt-0.5">{act.desc}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
