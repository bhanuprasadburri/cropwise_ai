import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, Trash2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AlertsPage: React.FC = () => {
  const { alerts, markAlertAsRead, clearAllAlerts } = useApp();

  return (
    <div className="space-y-8 pb-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Bell className="w-7 h-7 text-amber-500" />
            Alerts & Advisory Notifications
          </h1>
          <p className="text-xs text-gray-500 mt-1">Real-time weather warnings, disease risk advisories, and mandi price spikes.</p>
        </div>

        <button
          onClick={clearAllAlerts}
          className="text-xs font-bold text-rose-600 hover:text-rose-800 border border-rose-200 px-3 py-1.5 rounded-xl hover:bg-rose-50"
        >
          Clear All Alerts
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card space-y-3">
        {alerts.length === 0 ? (
          <p className="p-8 text-center text-xs text-gray-500">No active alerts present.</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => markAlertAsRead(alert.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                !alert.read ? 'bg-agri-50/70 border-agri-200' : 'bg-gray-50/50 border-gray-100'
              }`}
            >
              <div className="flex items-start gap-3">
                {alert.severity === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
                {alert.severity === 'critical' && <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                {alert.severity === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                {alert.severity === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}

                <div>
                  <h4 className="font-bold text-sm text-gray-900">{alert.title}</h4>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{alert.message}</p>
                  <span className="text-[10px] text-gray-400 block mt-1">{alert.date}</span>
                </div>
              </div>

              {!alert.read && (
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-500 text-white shrink-0">
                  New
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
