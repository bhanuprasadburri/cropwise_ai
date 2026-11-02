import React from 'react';
import { Sun, Thermometer, Droplets, Compass, TrendingUp, ShieldAlert } from 'lucide-react';
import { sampleWeather, sampleMarketData } from '../../data/mockData';

export const SummaryCards: React.FC = () => {
  const cards = [
    {
      title: 'Current Season',
      value: 'Kharif',
      subtitle: 'Sowing Season Active',
      icon: Sun,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      badge: 'Optimal'
    },
    {
      title: 'Temperature',
      value: `${sampleWeather.currentTemp}°C`,
      subtitle: 'Moderate Heat',
      icon: Thermometer,
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      badge: 'Normal'
    },
    {
      title: 'Rainfall Forecast',
      value: `${sampleWeather.rainfall} mm`,
      subtitle: 'Rain expected tomorrow',
      icon: Droplets,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      badge: '18mm Tomorrow'
    },
    {
      title: 'Soil Moisture',
      value: `${sampleWeather.soilMoisture}%`,
      subtitle: 'Clay Loam Rootzone',
      icon: Compass,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      badge: 'Optimal'
    },
    {
      title: 'Market Trend',
      value: '+8.4%',
      subtitle: 'Paddy & Tomato gain',
      icon: TrendingUp,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badge: 'Positive'
    },
    {
      title: 'Disease Risk',
      value: 'Low to Moderate',
      subtitle: 'Early Blight Watch',
      icon: ShieldAlert,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      badge: 'Monitored'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.title} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card flex flex-col justify-between hover:border-agri-200 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{c.title}</span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${c.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900 tracking-tight">{c.value}</p>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">{c.subtitle}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {c.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
