import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Scan,
  TrendingUp,
  LineChart,
  CloudSun,
  Leaf,
  CheckCircle,
  Users,
  Award,
  Globe2,
  Sprout,
  ShieldCheck,
  UserPlus,
  LogIn
} from 'lucide-react';
import { sampleCrops } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useApp();

  const stats = [
    { value: '10K+', label: 'Registered Farmers', icon: Users },
    { value: '50+', label: 'Crops Analyzed', icon: Sprout },
    { value: '95%', label: 'Prediction Accuracy', icon: Award },
    { value: '20+', label: 'States Covered', icon: Globe2 },
  ];

  const features = [
    {
      title: 'AI Disease Detection',
      desc: 'Upload a leaf photo to identify crop diseases, severity, and get verified organic & IPM treatments.',
      icon: Scan,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      link: '/disease-detection'
    },
    {
      title: 'Smart Crop Recommendation',
      desc: 'Discover optimal crops based on season, soil pH, moisture, climate, and current mandi profitability.',
      icon: Sparkles,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      link: '/crop-recommendation'
    },
    {
      title: 'Market Intelligence',
      desc: 'Track real-time Mandi prices across Andhra Pradesh, Telangana, Punjab, and major Indian wholesale markets.',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      link: '/market'
    },
    {
      title: 'Future Price AI Prediction',
      desc: 'Forecast expected crop market prices for 7 to 90 days horizon using historical market arrival data.',
      icon: LineChart,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      link: '/price-prediction'
    },
    {
      title: 'Organic Farming Guidance',
      desc: 'Step-by-step practices for vermicomposting, bio-fertilizers, neem cake, and sustainable soil fertility.',
      icon: Leaf,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      link: '/organic-farming'
    },
    {
      title: 'Weather Intelligence',
      desc: '7-day localized rain and temperature forecasts linked with actionable agricultural irrigation alerts.',
      icon: CloudSun,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      link: '/weather'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-agri-50 border border-agri-200 text-agri-800 text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-agri-600 animate-pulse" />
                <span>AI-Powered Agriculture SaaS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-agri-dark tracking-tight leading-[1.15]">
                Smart Crop Decisions for <span className="text-agri-brand underline decoration-agri-accent/50 underline-offset-8">Higher Yield</span> & Better Profit
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed font-normal">
                Detect crop diseases, discover optimal crops for your soil & season, track market trends, predict future mandi prices, and make smarter farming decisions with AI.
              </p>

              {/* Farmer Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="/images/hero_farmer_tech.jpg"
                  alt="Indian farmer using digital agriculture tablet"
                  className="w-full h-56 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/70 via-transparent to-transparent flex items-end p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold">Real-time Agricultural Telemetry & Mandi Connectivity</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Instant Data Persistence</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Indian Mandi Integrated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Mobile & Web Ready</span>
                </div>
              </div>
            </div>

            {/* Right Column: Platform Registration Showcase Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xl space-y-6">
              <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">Start Smart Farming Today</h2>
                  <p className="text-xs text-gray-500 mt-1">Join thousands of Indian farmers storing live farm records</p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-agri-brand flex items-center justify-center text-white shadow-md shadow-agri-700/20">
                  <Sprout className="w-6 h-6 text-agri-300" />
                </div>
              </div>

              {/* Value Highlights */}
              <div className="space-y-3.5 text-xs text-gray-700">
                <div className="flex items-start gap-3 p-3 bg-agri-50/60 rounded-xl border border-agri-100/80">
                  <Scan className="w-5 h-5 text-agri-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">AI Leaf Disease Scanner</h4>
                    <p className="text-gray-600 text-[11px] mt-0.5">Detect fungal & bacterial leaf blights in seconds with organic treatment advice.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50/60 rounded-xl border border-blue-100/80">
                  <TrendingUp className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">Mandi Price Forecasts</h4>
                    <p className="text-gray-600 text-[11px] mt-0.5">Track live market arrivals and 7–90 day price trends across AP & major states.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100/80">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">Secure Database Persistence</h4>
                    <p className="text-gray-600 text-[11px] mt-0.5">All registered profile details and farm plots save directly into XAMPP DB.</p>
                  </div>
                </div>
              </div>

              {/* Call-To-Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link
                  to="/register"
                  className="w-full py-3.5 px-6 rounded-xl bg-agri-brand text-white font-extrabold text-sm shadow-lg shadow-agri-700/25 hover:bg-agri-dark hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5 text-agri-300" />
                  REGISTER ACCOUNT NOW
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Link>

                <Link
                  to="/login"
                  className="w-full py-3 px-6 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-bold text-xs hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <LogIn className="w-4 h-4 text-gray-500" />
                  Already have an account? Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-agri-dark text-white py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="space-y-1">
                  <Icon className="w-7 h-7 text-agri-300 mx-auto mb-2 opacity-80" />
                  <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{s.value}</p>
                  <p className="text-xs font-semibold text-agri-200 uppercase tracking-wider">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-agri-700 uppercase tracking-widest bg-agri-100 px-3 py-1 rounded-full">
            Agricultural Intelligence Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Designed for Precision Farming
          </h2>
          <p className="text-gray-600 text-base">
            CropWise AI brings disease recognition, agronomic matching, weather telemetry, and mandi price forecasting into one integrated platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-xl hover:border-agri-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color} mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-agri-800 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-50">
                  <Link
                    to={feat.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-agri-700 hover:text-agri-900 transition-colors"
                  >
                    Explore Module <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Crops Catalog Section with Accurate Images */}
      <section className="bg-agri-50/60 py-16 border-y border-agri-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-agri-700 uppercase tracking-wider">Crop Catalog</span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">Supported Agricultural Crops</h2>
            </div>
            <Link to="/crop-guide" className="inline-flex items-center gap-2 text-sm font-bold text-agri-800 hover:underline">
              View Full Crop Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCrops.slice(0, 3).map((crop) => (
              <div key={crop.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-lg transition-all">
                <img src={crop.image} alt={crop.name} className="w-full h-48 object-cover object-center" />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-agri-100 text-agri-800">
                      {crop.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">★ {crop.suitabilityScore}% Match</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{crop.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{crop.description}</p>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-semibold">Mandi Rate: <strong className="text-gray-900">₹{crop.currentPrice}/qtl</strong></span>
                    <span className="text-emerald-700 font-extrabold">+{crop.priceTrendPercent}% Trend</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-agri-dark to-agri-sidebar rounded-3xl p-8 sm:p-12 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to transform your farm yields with AI?</h2>
            <p className="text-agri-100/90 text-sm sm:text-base leading-relaxed">
              Join thousands of progressive farmers using CropWise AI for disease detection, crop recommendation, and price forecasts.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 text-white font-bold shadow-lg hover:bg-emerald-600 transition-colors"
              >
                Create Account Now
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-colors"
              >
                Sign In to Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
