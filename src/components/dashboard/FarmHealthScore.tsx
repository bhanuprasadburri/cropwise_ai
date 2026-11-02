import React from 'react';
import { ShieldCheck, Droplets, Thermometer, TrendingUp, AlertCircle, Leaf } from 'lucide-react';

interface FarmHealthScoreProps {
  score?: number;
}

export const FarmHealthScore: React.FC<FarmHealthScoreProps> = ({ score = 84 }) => {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (s >= 65) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const factors = [
    { name: 'Soil Quality & pH', value: 88, status: 'Optimal (pH 6.8)', icon: Leaf, color: 'bg-emerald-500' },
    { name: 'Water Availability', value: 92, status: 'Adequate Borewell', icon: Droplets, color: 'bg-blue-500' },
    { name: 'Weather Index', value: 78, status: 'Rain Expected', icon: Thermometer, color: 'bg-sky-500' },
    { name: 'Disease Suppression', value: 75, status: 'Moderate Humidity', icon: AlertCircle, color: 'bg-amber-500' },
    { name: 'Market Potential', value: 89, status: 'Positive Trend', icon: TrendingUp, color: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-agri-600" />
            Farm Health Score
          </h3>
          <p className="text-xs text-gray-500">Real-time composite agronomic rating</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(score)}`}>
          Excellent Condition
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
        {/* Score Ring / Badge */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-agri-600 transition-all duration-1000 ease-out"
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-extrabold text-gray-900">{score}</span>
            <span className="text-[10px] uppercase font-bold text-gray-400">Out of 100</span>
          </div>
        </div>

        {/* Factors Breakdown */}
        <div className="flex-1 w-full space-y-2.5">
          {factors.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-700 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-gray-500" />
                    {f.name}
                  </span>
                  <span className="text-gray-500 font-medium">{f.status} ({f.value}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${f.color} transition-all duration-500`}
                    style={{ width: `${f.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
