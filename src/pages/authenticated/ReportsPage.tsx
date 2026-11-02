import React from 'react';
import { FileCheck, Download, Trash2, Eye, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import { useApp } from '../../context/AppContext';
import type { SavedReport } from '../../types';

export const ReportsPage: React.FC = () => {
  const { savedReports, deleteSavedReport } = useApp();

  const handleDownloadPDF = (report: SavedReport) => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(27, 67, 50);
    doc.text(`🌱 CropWise AI - ${report.type} Report`, 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Title: ${report.title}`, 14, 28);
    doc.text(`Date Generated: ${report.date} | Farm: ${report.farmName}`, 14, 34);
    doc.line(14, 38, 196, 38);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text('Report Summary & Observations:', 14, 48);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const splitSummary = doc.splitTextToSize(report.summary, 180);
    doc.text(splitSummary, 14, 56);

    doc.save(`CropWise_${report.type.replace(/\s+/g, '_')}_${report.date}.pdf`);
  };

  return (
    <div className="space-y-8 pb-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <FileCheck className="w-7 h-7 text-emerald-600" />
            Saved Reports Archives
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Downloadable PDF reports for disease diagnostics, crop suitability recommendations, and market analysis.
          </p>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-100 text-[11px] uppercase font-bold text-gray-400">
              <tr>
                <th className="p-3">Report Title</th>
                <th className="p-3">Category Type</th>
                <th className="p-3">Date</th>
                <th className="p-3">Farm Plot</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {savedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-bold text-gray-900">{report.title}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{report.date}</td>
                  <td className="p-3 font-medium text-gray-800">{report.farmName}</td>
                  <td className="p-3 text-right space-x-3">
                    <button
                      onClick={() => handleDownloadPDF(report)}
                      className="inline-flex items-center gap-1 font-bold text-agri-800 hover:text-agri-900"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                    <button
                      onClick={() => deleteSavedReport(report.id)}
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
