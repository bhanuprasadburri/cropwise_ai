import React from 'react';
import { Link } from 'react-router-dom';
import { Scan, Sparkles, TrendingUp, LineChart, CloudSun, Leaf, Bug, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const featureList = [
    {
      title: 'AI Crop Disease Detection Engine',
      subtitle: 'Instant pathology recognition with mobile leaf photos',
      icon: Scan,
      color: 'bg-rose-500 text-white',
      link: '/disease-detection',
      points: [
        'Supports Tomato, Paddy, Cotton, Corn, Sugarcane & Chilli leaf scans',
        'Multi-stage CNN pipeline with 94.6% benchmark diagnostic accuracy',
        'Bounding box lesion visualization and severity grading (Low to Severe)',
        'Integrated Pest Management (IPM) & bio-agent treatment advisories'
      ]
    },
    {
      title: 'Smart Crop Recommendation Engine',
      subtitle: 'Multi-parameter agronomic matching algorithm',
      icon: Sparkles,
      color: 'bg-emerald-600 text-white',
      link: '/crop-recommendation',
      points: [
        'Analyzes Season (Kharif/Rabi/Zaid), Soil Type, Soil pH & Water access',
        'Dynamic 0-100% suitability score tailored to farmer location',
        'Transparent "Why this crop?" AI reasoning explanations',
        'Side-by-side comparison matrix for crop profit evaluation'
      ]
    },
    {
      title: 'Real-Time Market Price Intelligence',
      subtitle: 'Live AP & Indian wholesale Mandi pricing data',
      icon: TrendingUp,
      color: 'bg-blue-600 text-white',
      link: '/market',
      points: [
        'Tracks daily Mandi arrival volumes and prevailing rates (₹/quintal)',
        'Interactive historical price charts with state and district filters',
        'Market demand indicators (High, Moderate, Low)',
        'Daily price fluctuation percentage tracking'
      ]
    },
    {
      title: 'AI Future Price Prediction Engine',
      subtitle: 'Time-series forecasting for 7 to 90 days horizon',
      icon: LineChart,
      color: 'bg-purple-600 text-white',
      link: '/price-prediction',
      points: [
        'ARIMA / Time-series ML forecasting models',
        'Distinguishes historical values from predicted forecast corridors',
        'Key market factors analysis (export policies, monsoon impact, arrivals)',
        'Clear decision-support safety disclaimers'
      ]
    },
    {
      title: 'Organic Farming & Bio-Fertilizers',
      subtitle: 'Sustainable regenerative soil practices',
      icon: Leaf,
      color: 'bg-amber-600 text-white',
      link: '/organic-farming',
      points: [
        'Crop-stage specific organic nutrition guidelines',
        'Vermicompost, Neem cake, Azotobacter & Trichoderma application rates',
        'Natural pest repellent concoctions (Neem oil, Jeevamrutha)',
        'Soil organic carbon and moisture enhancement'
      ]
    },
    {
      title: 'Agricultural Weather Forecast',
      subtitle: 'Hyper-local weather intelligence & farming alerts',
      icon: CloudSun,
      color: 'bg-sky-500 text-white',
      link: '/weather',
      points: [
        '7-day temperature, rainfall probability, and relative humidity curves',
        'Actionable weather advisories linked to irrigation and spraying schedules',
        'Extreme weather alerts (Heavy rain, heatwaves, strong winds)'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-agri-700 uppercase tracking-widest bg-agri-100 px-3 py-1 rounded-full">
          Platform Architecture
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Comprehensive AI Features for Modern Farmers
        </h1>
        <p className="text-base text-gray-600">
          Discover how CropWise AI combines computer vision, machine learning, weather telemetry, and mandi price models into a unified platform.
        </p>
      </div>

      <div className="space-y-8">
        {featureList.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-card flex flex-col lg:flex-row gap-8 items-start justify-between ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${feat.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">{feat.title}</h2>
                    <p className="text-xs font-bold text-agri-700">{feat.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {feat.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Link
                    to={feat.link}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-sm hover:bg-agri-dark transition-colors"
                  >
                    Open {feat.title.split(' ')[1]} Engine
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
