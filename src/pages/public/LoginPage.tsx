import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Lock, Mail, ArrowRight, UserCheck, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiLogin, setAuthTokens } from '../../services/api';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('ramesh.farmer@gmail.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@gmail.com')) {
      setErrorMsg('Access Denied: Only valid @gmail.com email addresses are permitted to log in.');
      return;
    }

    setLoading(true);

    try {
      const res = await apiLogin({ username: cleanEmail, email: cleanEmail, password });
      if (res.access || res.tokens?.access) {
        setAuthTokens(res.access || res.tokens.access, res.refresh || res.tokens.refresh);
        setSuccessMsg(`🎉 Login Successful! Welcome back, ${cleanEmail}. Redirecting to your dashboard...`);
        setTimeout(() => {
          login(cleanEmail);
          navigate('/dashboard');
        }, 1200);
      } else {
        throw new Error('Authentication failed. User not registered in database.');
      }
    } catch (err: any) {
      console.error('Database login error:', err);
      setErrorMsg(err.message || 'Invalid credentials or user not registered in database. Please create an account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Agricultural Image Side */}
        <div className="relative bg-agri-dark text-white p-8 hidden md:flex flex-col justify-between overflow-hidden">
          <img
            src="/images/hero_farmer_tech.jpg"
            alt="Agri Tech"
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-agri-brand flex items-center justify-center">
                <Sprout className="w-5 h-5 text-agri-300" />
              </div>
              <span className="font-extrabold text-2xl">CropWise AI</span>
            </div>
            <h2 className="text-2xl font-extrabold leading-tight">Welcome Back to Your Farm Intelligence Hub</h2>
            <p className="text-xs text-agri-100/90 leading-relaxed">
              Access real-time disease detection reports, crop recommendation algorithms, and mandi price predictions.
            </p>
          </div>

          <div className="relative z-10 space-y-2 pt-6 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 text-agri-300 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> 10K+ Active Indian Farmers
            </div>
            <div className="flex items-center gap-2 text-agri-300 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Secure Persistent Account Storage
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900">Sign In to CropWise</h2>
              <p className="text-xs text-gray-500 mt-1">Must be a registered @gmail.com email account</p>
            </div>

            {successMsg && (
              <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2 shadow-sm animate-pulse">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium flex items-start gap-2">
                <span className="font-bold text-red-600">⚠️ Error:</span> {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email / Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 font-semibold">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-agri-600 focus:ring-agri-500"
                  />
                  Remember me
                </label>
                <a href="#forgot" className="text-agri-700 font-bold hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-agri-brand text-white font-bold text-sm shadow-md hover:bg-agri-dark transition-colors flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-gray-100 text-center text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-agri-700 font-bold hover:underline">
              Create Account Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
