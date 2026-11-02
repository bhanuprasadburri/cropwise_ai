import React from 'react';
import { CloudSun, Thermometer, Droplets, Wind, AlertTriangle, Sun, CloudRain } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { sampleWeather } from '../../data/mockData';

export const WeatherPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <CloudSun className="w-7 h-7 text-sky-500" />
            Agricultural Weather Intelligence
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            7-day telemetry for <strong className="text-agri-800">{sampleWeather.location}</strong> with farming action advisories.
          </p>
        </div>
      </div>

      {/* Current Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Current Temp</span>
            <p className="text-2xl font-extrabold text-gray-900">{sampleWeather.currentTemp}°C</p>
            <span className="text-[11px] text-gray-500">{sampleWeather.condition}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Relative Humidity</span>
            <p className="text-2xl font-extrabold text-gray-900">{sampleWeather.humidity}%</p>
            <span className="text-[11px] text-gray-500">Soil Moisture: {sampleWeather.soilMoisture}%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <CloudRain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400">24h Rainfall</span>
            <p className="text-2xl font-extrabold text-gray-900">{sampleWeather.rainfall} mm</p>
            <span className="text-[11px] text-sky-600 font-bold">Rain Tomorrow (18mm)</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400">Wind Speed</span>
            <p className="text-2xl font-extrabold text-gray-900">{sampleWeather.windSpeed} km/h</p>
            <span className="text-[11px] text-gray-500">UV Index: {sampleWeather.uvIndex} (Moderate)</span>
          </div>
        </div>
      </div>

      {/* Actionable Agricultural Advisories Banner */}
      <div className="bg-gradient-to-r from-sky-900 to-agri-dark rounded-3xl p-6 text-white shadow-xl space-y-3">
        <h3 className="font-extrabold text-lg flex items-center gap-2 text-sky-300">
          <AlertTriangle className="w-5 h-5 text-amber-400" /> Actionable Agricultural Advisories
        </h3>
        <ul className="space-y-2 text-xs text-sky-100 leading-relaxed">
          {sampleWeather.advisories.map((adv) => (
            <li key={adv} className="bg-white/10 p-3 rounded-xl border border-white/10">
              {adv}
            </li>
          ))}
        </ul>
      </div>

      {/* 7-Day Forecast Cards */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">7-Day Local Weather Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {sampleWeather.dailyForecast.map((day) => (
            <div
              key={day.day}
              className={`p-4 rounded-2xl border text-center space-y-2 ${
                day.day === 'Today' ? 'bg-agri-50 border-agri-300' : 'bg-gray-50/70 border-gray-100'
              }`}
            >
              <p className="text-xs font-extrabold text-gray-900">{day.day}</p>
              <span className="text-[10px] text-gray-400 block">{day.date}</span>

              {day.condition.includes('Rain') || day.condition.includes('Thunderstorm') ? (
                <CloudRain className="w-6 h-6 text-blue-500 mx-auto my-1" />
              ) : (
                <Sun className="w-6 h-6 text-amber-500 mx-auto my-1" />
              )}

              <div>
                <p className="text-sm font-extrabold text-gray-900">{day.tempMax}° / {day.tempMin}°C</p>
                <span className="text-[10px] font-bold text-sky-600 block">{day.rainProbability}% Rain</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Temperature & Humidity Hourly Curve Chart */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-card space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">Today's Temperature & Humidity Telemetry</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleWeather.tempTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="temp" stroke="#f59e0b" fill="#fef3c7" name="Temp (°C)" />
              <Area type="monotone" dataKey="humidity" stroke="#0284c7" fill="#e0f2fe" name="Humidity (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
