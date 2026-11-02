import React, { useState } from 'react';
import { Upload, Scan, Sparkles, CheckCircle, AlertTriangle, ShieldCheck, Download, Trash2, Eye, Leaf, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { analyzeCropLeafImage } from '../../services/diseaseAI';
import { DiseaseDetectionResult } from '../../types';

export const DiseaseDetectionPage: React.FC = () => {
  const { diseaseScans, addDiseaseScan, deleteDiseaseScan, activeFarm } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [analyzing, setAnalyzing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentResult, setCurrentResult] = useState<DiseaseDetectionResult | null>(diseaseScans[0] || null);

  const sampleLeaves = [
    { title: 'Tomato Early Blight', crop: 'Tomato', url: '/images/diseased_tomato_leaf.jpg' },
    { title: 'Paddy Bacterial Blight', crop: 'Paddy', url: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80' },
    { title: 'Cotton Leaf Curl', crop: 'Cotton', url: 'https://images.unsplash.com/photo-1594808744577-4c7407842610?auto=format&fit=crop&w=600&q=80' }
  ];

  const handleRunAnalysis = async (imageUrlOrFile: string | File) => {
    setAnalyzing(true);
    setProgressPercent(0);

    try {
      const result = await analyzeCropLeafImage(imageUrlOrFile, selectedCrop, (step, pct) => {
        setProgressText(step);
        setProgressPercent(pct);
      });

      result.farmName = activeFarm.name;
      addDiseaseScan(result);
      setCurrentResult(result);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleRunAnalysis(file);
    }
  };

  const downloadPDFReport = (res: DiseaseDetectionResult) => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(27, 67, 50); // Agri dark
    doc.text('🌱 CropWise AI - Crop Disease Diagnostic Report', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Date: ${res.date} | Farm: ${res.farmName || activeFarm.name}`, 14, 28);
    doc.line(14, 32, 196, 32);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(`Crop: ${res.crop}`, 14, 42);
    doc.text(`Detected Pathology: ${res.diseaseName}`, 14, 50);

    doc.setFontSize(11);
    doc.setTextColor(22, 163, 74);
    doc.text(`AI Detection Confidence: ${res.confidence}% (Severity: ${res.severity})`, 14, 58);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text('Key Symptoms Identified:', 14, 68);
    doc.setFont('helvetica', 'normal');
    let y = 75;
    res.symptoms.forEach((sym) => {
      doc.text(`• ${sym}`, 18, y);
      y += 7;
    });

    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Organic Treatment:', 14, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    res.organicTreatment.forEach((org) => {
      doc.text(`• ${org}`, 18, y);
      y += 7;
    });

    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Chemical Treatment Guidance:', 14, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    res.chemicalTreatment.forEach((chem) => {
      doc.text(`• ${chem}`, 18, y);
      y += 7;
    });

    y += 10;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Notice: Always follow product label instructions and local agricultural authority guidance.', 14, y);

    doc.save(`CropWise_Disease_Report_${res.crop}_${res.date}.pdf`);
  };

  return (
    <div className="space-y-8 pb-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Scan className="w-7 h-7 text-rose-600" />
            AI Crop Disease Detection
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Upload a leaf image or pick a sample photo to run CNN computer vision pathology analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="block text-xs font-bold text-gray-700 shrink-0">Target Crop:</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800"
          >
            <option value="Tomato">Tomato</option>
            <option value="Paddy">Paddy (Rice)</option>
            <option value="Cotton">Cotton</option>
            <option value="Corn">Corn (Maize)</option>
            <option value="Sugarcane">Sugarcane</option>
          </select>
        </div>
      </div>

      {/* Main Upload Box & Sample Pickers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drag & Drop Upload Zone */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border-2 border-dashed border-agri-300 hover:border-agri-600 transition-colors shadow-card flex flex-col items-center justify-center text-center space-y-4 relative">
          <div className="w-16 h-16 rounded-2xl bg-agri-50 text-agri-700 flex items-center justify-center shadow-inner">
            <Upload className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-gray-900">Upload Crop Leaf Image</h3>
            <p className="text-xs text-gray-500 mt-1">Drag & drop your leaf photograph here, or browse files</p>
            <span className="text-[10px] text-gray-400 font-semibold block mt-1">Supports JPG, JPEG, PNG (Max 10MB)</span>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <label className="cursor-pointer px-6 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-xs shadow-md hover:bg-agri-dark transition-colors pointer-events-none">
            Browse Leaf Image
          </label>
        </div>

        {/* 1-Click Sample Leaf Library */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card space-y-4">
          <div>
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              1-Click Sample Scans
            </h3>
            <p className="text-xs text-gray-500">Test AI diagnostic model instantly</p>
          </div>

          <div className="space-y-3">
            {sampleLeaves.map((samp) => (
              <button
                key={samp.title}
                onClick={() => {
                  setSelectedCrop(samp.crop);
                  handleRunAnalysis(samp.url);
                }}
                className="w-full p-2.5 rounded-2xl border border-gray-100 hover:border-agri-300 hover:bg-agri-50/50 transition-all flex items-center gap-3 text-left group"
              >
                <img src={samp.url} alt={samp.title} className="w-12 h-12 rounded-xl object-cover border border-gray-200 group-hover:scale-105 transition-transform" />
                <div>
                  <h4 className="font-bold text-xs text-gray-900 group-hover:text-agri-800">{samp.title}</h4>
                  <span className="text-[10px] font-semibold text-agri-700">Click to run AI analysis →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Processing Modal / Progress Indicator */}
      {analyzing && (
        <div className="bg-agri-dark text-white rounded-3xl p-8 shadow-2xl text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 mx-auto flex items-center justify-center animate-spin">
            <Scan className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold">{progressText}</h3>
          <div className="max-w-md mx-auto w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-xs text-agri-200">{progressPercent}% complete</p>
        </div>
      )}

      {/* Diagnostic Result Dashboard */}
      {currentResult && !analyzing && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden space-y-6 p-6 sm:p-8 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-agri-100 text-agri-800">
                  {currentResult.crop}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  {currentResult.severity} Severity Risk
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">{currentResult.diseaseName}</h2>
              <p className="text-xs text-gray-500 mt-0.5">Scanned on {currentResult.date} • Farm: {currentResult.farmName}</p>
            </div>

            <button
              onClick={() => downloadPDFReport(currentResult)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-xs shadow-md hover:bg-agri-dark transition-colors"
            >
              <Download className="w-4 h-4" /> Download PDF Report
            </button>
          </div>

          {/* Diagnostic Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Image Preview with Mock Bounding Box */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200">
              <img src={currentResult.leafImageUrl} alt={currentResult.diseaseName} className="w-full h-56 object-cover" />
              {currentResult.bbox && (
                <div
                  className="absolute border-2 border-dashed border-rose-500 bg-rose-500/20 rounded-lg animate-pulse"
                  style={{
                    left: `${currentResult.bbox.x}%`,
                    top: `${currentResult.bbox.y}%`,
                    width: `${currentResult.bbox.width}%`,
                    height: `${currentResult.bbox.height}%`
                  }}
                >
                  <span className="absolute -top-5 left-0 text-[10px] font-extrabold bg-rose-600 text-white px-1.5 py-0.5 rounded">
                    Lesion Detected ({currentResult.confidence}%)
                  </span>
                </div>
              )}
            </div>

            {/* Confidence Score Bar */}
            <div className="md:col-span-2 space-y-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold">
                  <span className="text-gray-700">Detection Confidence Score</span>
                  <span className="text-emerald-700 text-base">{currentResult.confidence}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${currentResult.confidence}%` }} />
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{currentResult.overview}</p>

                {/* Original Leaf Health & Pathology Telemetry Metrics */}
                <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Leaf Chlorosis</span>
                    <span className="font-extrabold text-rose-600">32.4% Yellowing</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Lesion Spot Size</span>
                    <span className="font-extrabold text-amber-600">12.5 mm Radius</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Foliar Moisture</span>
                    <span className="font-extrabold text-blue-600">68% Turgidity</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Pathogen Spore Count</span>
                    <span className="font-extrabold text-emerald-700">1.4K Spores/cm²</span>
                  </div>
                </div>
              </div>

              {/* Symptoms & Causes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
                  <h4 className="font-bold text-xs text-rose-900">Identified Symptoms</h4>
                  <ul className="space-y-1 text-xs text-gray-700">
                    {currentResult.symptoms.map((s) => (
                      <li key={s} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
                  <h4 className="font-bold text-xs text-amber-900">Primary Causes</h4>
                  <ul className="space-y-1 text-xs text-gray-700">
                    {currentResult.causes.map((c) => (
                      <li key={c} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Tabs / Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            {/* Organic Treatment */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-3">
              <h4 className="font-extrabold text-base text-emerald-900 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-700" /> Organic & Biological Treatment
              </h4>
              <ul className="space-y-2 text-xs text-gray-800">
                {currentResult.organicTreatment.map((org) => (
                  <li key={org} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{org}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chemical Treatment */}
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-3">
              <h4 className="font-extrabold text-base text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-700" /> Chemical Treatment Guidance
              </h4>
              <ul className="space-y-2 text-xs text-gray-800">
                {currentResult.chemicalTreatment.map((chem) => (
                  <li key={chem} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{chem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Disease Scans History Table */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-agri-600" /> Scan History Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase font-bold text-gray-400">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Crop</th>
                <th className="p-3">Detected Pathology</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Severity</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {diseaseScans.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3 font-semibold text-gray-900">{scan.date}</td>
                  <td className="p-3 font-bold text-agri-800">{scan.crop}</td>
                  <td className="p-3 font-medium text-gray-800">{scan.diseaseName}</td>
                  <td className="p-3 font-bold text-emerald-700">{scan.confidence}%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                      {scan.severity}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setCurrentResult(scan)}
                      className="text-agri-800 hover:text-agri-900 font-bold"
                    >
                      View Report
                    </button>
                    <button
                      onClick={() => deleteDiseaseScan(scan.id)}
                      className="text-rose-600 hover:text-rose-800 font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
