import React from 'react';
import { Sparkles, CloudRain, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TodayInsightsCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-agri-dark via-agri-brand to-agri-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Today's AI Insights
          </div>
          <span className="text-xs text-agri-200/80">Updated 15 mins ago</span>
        </div>
        <Link to="/alerts" className="text-xs font-bold text-agri-300 hover:text-white flex items-center gap-1">
          View All Alerts <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold mb-1">
            <CloudRain className="w-4 h-4" />
            Weather Insight
          </div>
          <p className="text-xs text-agri-100 font-medium leading-relaxed">
            Rain expected tomorrow (18mm). Hold drip irrigation & delay pesticide spraying on tomato crops.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold mb-1">
            <TrendingUp className="w-4 h-4" />
            Market Outlook
          </div>
          <p className="text-xs text-agri-100 font-medium leading-relaxed">
            Tomato prices up +13.5% in Guntur mandi. Paddy expected to gain +7.8% over next 30 days.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-2 text-rose-300 text-xs font-bold mb-1">
            <AlertTriangle className="w-4 h-4" />
            Disease Advisory
          </div>
          <p className="text-xs text-agri-100 font-medium leading-relaxed">
            High humidity (74%) increases early blight risk. Spray Neem oil (5ml/L) preventatively.
          </p>
        </div>
      </div>
    </div>
  );
};
