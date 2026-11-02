import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Droplets, Calendar, TrendingUp, CheckCircle, Leaf, Bug, ShieldAlert, FileText } from 'lucide-react';
import { sampleCrops } from '../../data/mockData';

export const CropDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const crop = sampleCrops.find((c) => c.id === id) || sampleCrops[0];

  const timelineSteps = [
    { title: '1. Land Preparation', desc: 'Plow field twice to fine tilth. Apply 10 tons well-decomposed FYM / vermicompost per acre 15 days before sowing.' },
    { title: '2. Seed Selection & Treatment', desc: 'Select certified hybrid seed stock. Treat seeds with Trichoderma viride @ 4g/kg seed or Pseudomonas fluorescens to prevent damping off.' },
    { title: '3. Sowing / Transplanting', desc: 'Maintain line spacing of 60cm x 45cm. Sow at depth of 2-3 cm in moist soil bed.' },
    { title: '4. Nutrient Management', desc: 'Apply NPK balanced ratio (120:60:60 kg/ha). Apply 50% N + 100% P & K as basal dose, top dress remaining N at tillering/flowering.' },
    { title: '5. Irrigation Schedule', desc: 'Critical water stages: Flowering, pod formation, and grain filling. Avoid waterlogging during vegetative stage.' },
    { title: '6. Weed & Pest Control', desc: 'Perform manual weeding at 20 and 40 DAS. Install yellow sticky traps and monitor for fruit borers / leaf hoppers.' },
    { title: '7. Harvesting & Storage', desc: 'Harvest when 85% of pods/grains turn golden yellow. Dry grains to below 12% moisture content before bagging.' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <Link to="/crop-guide" className="inline-flex items-center gap-2 text-sm font-bold text-agri-800 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Crop Guide
      </Link>

      {/* Hero Crop Header Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <img src={crop.image} alt={crop.name} className="w-full h-80 lg:h-full object-cover" />
        <div className="p-8 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-agri-100 text-agri-800 uppercase">
                {crop.category}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                {crop.bestSeason} Season
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{crop.name}</h1>
            <p className="text-sm text-gray-600 leading-relaxed">{crop.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
            <div className="bg-gray-50 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-gray-400">Current Mandi Rate</span>
              <p className="text-lg font-extrabold text-emerald-700">₹{crop.currentPrice} / qtl</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-gray-400">Expected Yield</span>
              <p className="text-sm font-extrabold text-gray-900">{crop.expectedYield}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Timeline */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-agri-600" />
          Step-by-Step Cultivation Guide
        </h2>

        <div className="space-y-4">
          {timelineSteps.map((step, idx) => (
            <div key={step.title} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-agri-brand text-white flex items-center justify-center font-bold shrink-0">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">{step.title}</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
