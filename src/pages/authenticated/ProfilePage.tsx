import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Award, Sprout, Tractor, Edit3, Save, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfilePage: React.FC = () => {
  const { userProfile, setUserProfile, farms } = useApp();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userProfile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatarUrl: imageUrl });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(formData);
    setEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={formData.avatarUrl}
            alt={formData.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-agri-200 shadow-md"
          />
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-gray-900">{formData.name}</h1>
              <span className="bg-agri-100 text-agri-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                {formData.role}
              </span>
            </div>
            <p className="text-xs font-semibold text-agri-700">{formData.location}, {formData.district}, {formData.state}</p>
            <p className="text-xs text-gray-500 font-medium">{formData.experienceYears} Years Farming Experience • {formData.farmSize} Land holding</p>
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-agri-50 border border-agri-200 text-agri-800 text-xs font-bold hover:bg-agri-100 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          {editing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" /> Profile details saved successfully!
        </div>
      )}

      {/* Profile Details Form / Display */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
        {editing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="font-extrabold text-lg text-gray-900 border-b border-gray-100 pb-3">Edit Farmer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex items-center gap-4 p-3 bg-agri-50/50 rounded-2xl border border-agri-100">
                <img src={formData.avatarUrl} alt="Preview" className="w-14 h-14 rounded-2xl object-cover border-2 border-agri-300" />
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-800 mb-1">Upload New Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="block w-full text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-agri-brand file:text-white hover:file:bg-agri-dark cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Crops</label>
                <input
                  type="text"
                  value={formData.primaryCrop}
                  onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                  className="w-full px-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-xs shadow-md hover:bg-agri-dark transition-colors"
            >
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <h3 className="font-extrabold text-lg text-gray-900 border-b border-gray-100 pb-3">Farmer Profile Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-gray-50 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Total Registered Farms</span>
                <p className="text-xl font-extrabold text-gray-900">{farms.length} Farm Plots</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Primary Crop Cultivation</span>
                <p className="text-sm font-extrabold text-agri-800">{userProfile.primaryCrop}</p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Preferred Language</span>
                <p className="text-sm font-extrabold text-gray-900">{userProfile.preferredLanguage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
