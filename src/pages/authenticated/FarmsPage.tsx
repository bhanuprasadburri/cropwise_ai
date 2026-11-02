import React, { useState } from 'react';
import { Tractor, Plus, Trash2, Edit3, CheckCircle, MapPin, Droplets, Compass, Calendar, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Farm } from '../../types';

export const FarmsPage: React.FC = () => {
  const { farms, activeFarm, setActiveFarm, addFarm, deleteFarm } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const [newFarm, setNewFarm] = useState<Omit<Farm, 'id' | 'healthScore'>>({
    name: '',
    location: '',
    state: 'Andhra Pradesh',
    district: 'Palnadu',
    areaAcres: 3.0,
    soilType: 'Clay Loam',
    irrigationType: 'Borewell / Tube Well',
    currentCrop: 'Paddy',
    sowingDate: '2026-06-15',
    soilPh: 6.8
  });

  const handleCreateFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarm.name) return;
    addFarm(newFarm);
    setShowAddModal(false);
    setNewFarm({
      name: '',
      location: '',
      state: 'Andhra Pradesh',
      district: 'Palnadu',
      areaAcres: 3.0,
      soilType: 'Clay Loam',
      irrigationType: 'Borewell / Tube Well',
      currentCrop: 'Paddy',
      sowingDate: '2026-06-15',
      soilPh: 6.8
    });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Tractor className="w-6 h-6 text-agri-600" />
            My Farm Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">Configure soil profile, acreage, irrigation type, and active crops</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-xs shadow-md hover:bg-agri-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Farm Plot
        </button>
      </div>

      {/* Farms Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => {
          const isSelected = activeFarm.id === farm.id;
          return (
            <div
              key={farm.id}
              className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-4 shadow-card ${
                isSelected ? 'border-2 border-agri-600 ring-2 ring-agri-100' : 'border-gray-100 hover:border-agri-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900">{farm.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {farm.location}, {farm.district}, {farm.state}
                    </p>
                  </div>
                  {isSelected ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" /> Active Farm
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveFarm(farm)}
                      className="text-[10px] font-bold text-agri-700 hover:bg-agri-50 px-2.5 py-1 rounded-full border border-agri-200"
                    >
                      Set Active
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold bg-gray-50 p-3 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Area</span>
                    <span className="text-gray-900 font-bold">{farm.areaAcres} Acres</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Soil Type</span>
                    <span className="text-gray-900 font-bold">{farm.soilType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Irrigation</span>
                    <span className="text-gray-900 font-bold">{farm.irrigationType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Current Crop</span>
                    <span className="text-agri-800 font-bold">{farm.currentCrop}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-gray-500 font-medium">Health Rating: <strong className="text-emerald-700">{farm.healthScore}/100</strong></span>
                  <span className="text-gray-500 font-medium">Soil pH: <strong className="text-gray-900">{farm.soilPh}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => deleteFarm(farm.id)}
                  disabled={farms.length <= 1}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 disabled:opacity-30"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
                <button
                  onClick={() => setActiveFarm(farm)}
                  className="text-xs font-bold text-agri-800 hover:underline"
                >
                  Select & View Dashboard
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Farm Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl animate-in fade-in">
            <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Add New Farm Plot</h3>

            <form onSubmit={handleCreateFarm} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Farm Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Riverbed Organic Plot"
                  value={newFarm.name}
                  onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location / Village</label>
                  <input
                    type="text"
                    placeholder="Narasaraopet"
                    value={newFarm.location}
                    onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newFarm.areaAcres}
                    onChange={(e) => setNewFarm({ ...newFarm, areaAcres: parseFloat(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Soil Type</label>
                  <select
                    value={newFarm.soilType}
                    onChange={(e) => setNewFarm({ ...newFarm, soilType: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="Clay Loam">Clay Loam</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Black Cotton">Black Cotton</option>
                    <option value="Red Soil">Red Soil</option>
                    <option value="Alluvial Soil">Alluvial Soil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Irrigation Method</label>
                  <select
                    value={newFarm.irrigationType}
                    onChange={(e) => setNewFarm({ ...newFarm, irrigationType: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="Drip">Drip Irrigation</option>
                    <option value="Borewell / Tube Well">Borewell / Tube Well</option>
                    <option value="Canal">Canal</option>
                    <option value="Sprinkler">Sprinkler</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Current Crop</label>
                  <input
                    type="text"
                    value={newFarm.currentCrop}
                    onChange={(e) => setNewFarm({ ...newFarm, currentCrop: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Soil pH</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newFarm.soilPh}
                    onChange={(e) => setNewFarm({ ...newFarm, soilPh: parseFloat(e.target.value) || 6.5 })}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-agri-brand text-white font-bold text-xs shadow-md"
                >
                  Save Farm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
