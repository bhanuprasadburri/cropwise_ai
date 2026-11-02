import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, User, Mail, Phone, MapPin, Lock, ArrowRight, Tractor } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiRegister, setAuthTokens } from '../../services/api';

export const RegisterPage: React.FC = () => {
  const { login, setUserProfile } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    state: 'Andhra Pradesh',
    district: 'Palnadu',
    farmSize: '5 Acres',
    primaryCrop: 'Paddy & Tomato'
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@gmail.com')) {
      setErrorMsg('Registration Error: Only valid @gmail.com email addresses are allowed.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await apiRegister({
        name: formData.name,
        email: cleanEmail,
        password: formData.password || 'password123',
        phone: formData.phone,
        state: formData.state,
        district: formData.district,
        farm_size: formData.farmSize,
        primary_crop: formData.primaryCrop,
      });

      const token = res.access || res.tokens?.access;
      const refreshToken = res.refresh || res.tokens?.refresh;
      if (token) {
        setAuthTokens(token, refreshToken);
      }

      setUserProfile((prev: any) => ({
        ...prev,
        name: formData.name,
        email: cleanEmail,
        phone: formData.phone || prev.phone,
        state: formData.state,
        district: formData.district,
        farmSize: formData.farmSize,
        primaryCrop: formData.primaryCrop
      }));

      login(cleanEmail);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      setErrorMsg(err.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-3xl w-full bg-white rounded-3xl border border-gray-100 shadow-2xl p-8 sm:p-10 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Create Farmer Account</h1>
            <p className="text-xs text-gray-500 mt-0.5">Must be a valid @gmail.com email account</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-agri-brand flex items-center justify-center text-white">
            <Sprout className="w-6 h-6 text-agri-300" />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium flex items-start gap-2">
            <span className="font-bold text-red-600">⚠️ Registration Error:</span> {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="farmer@cropwise.ai"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+91 98480 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
              >
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Punjab">Punjab</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">District</label>
              <input
                type="text"
                placeholder="Palnadu / Guntur"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Farm Size (Acres)</label>
              <input
                type="text"
                placeholder="e.g. 5 Acres"
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Primary Crop</label>
              <input
                type="text"
                placeholder="e.g. Paddy / Tomato / Cotton"
                value={formData.primaryCrop}
                onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-agri-brand text-white font-bold text-sm shadow-md hover:bg-agri-dark transition-colors flex items-center justify-center gap-2"
          >
            Create Account & Access Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-agri-700 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
