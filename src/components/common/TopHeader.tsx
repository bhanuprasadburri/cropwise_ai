import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, Menu, Tractor, User, ChevronDown, CheckCircle, AlertTriangle, Info, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TopHeaderProps {
  onMobileMenuToggle: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onMobileMenuToggle }) => {
  const { userProfile, farms, activeFarm, setActiveFarm, alerts, markAlertAsRead } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFarmDropdown, setShowFarmDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigate = useNavigate();
  const unreadAlerts = alerts.filter((a) => !a.read);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('disease') || q.includes('blight') || q.includes('leaf') || q.includes('scan')) {
      navigate('/disease-detection');
    } else if (q.includes('price') || q.includes('market') || q.includes('mandi') || q.includes('cost')) {
      navigate('/market');
    } else if (q.includes('weather') || q.includes('rain') || q.includes('temp')) {
      navigate('/weather');
    } else if (q.includes('organic') || q.includes('vermicompost') || q.includes('neem')) {
      navigate('/organic-farming');
    } else {
      navigate('/app-crop-guide');
    }
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Mobile Hamburger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search crops, diseases, market prices, pests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-600 focus:bg-white transition-all"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Active Farm Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFarmDropdown(!showFarmDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-agri-50 border border-agri-200 text-agri-900 font-semibold text-xs hover:bg-agri-100 transition-colors"
          >
            <Tractor className="w-4 h-4 text-agri-700" />
            <span className="hidden sm:inline truncate max-w-[120px]">{activeFarm.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-agri-600" />
          </button>

          {showFarmDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-30 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] font-extrabold uppercase text-gray-400 tracking-wider">
                Select Active Farm
              </div>
              {farms.map((farm) => (
                <button
                  key={farm.id}
                  onClick={() => {
                    setActiveFarm(farm);
                    setShowFarmDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-agri-50 transition-colors ${
                    activeFarm.id === farm.id ? 'text-agri-800 bg-agri-50' : 'text-gray-700'
                  }`}
                >
                  <span className="truncate">{farm.name}</span>
                  {activeFarm.id === farm.id && <CheckCircle className="w-3.5 h-3.5 text-agri-700" />}
                </button>
              ))}
              <div className="pt-1 border-t border-gray-100 px-2">
                <Link
                  to="/farms"
                  onClick={() => setShowFarmDropdown(false)}
                  className="block text-center w-full py-1.5 text-xs text-agri-700 font-bold hover:underline"
                >
                  + Manage / Add Farms
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Button */}
        <Link
          to="/disease-detection"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-agri-brand text-white font-semibold text-xs shadow-sm hover:bg-agri-dark transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-agri-300" />
          Scan Leaf
        </Link>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-30 animate-in fade-in">
              <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <h4 className="font-bold text-sm text-gray-900">Notifications ({unreadAlerts.length} new)</h4>
                <Link to="/alerts" onClick={() => setShowNotifications(false)} className="text-xs text-agri-700 font-bold hover:underline">
                  View All
                </Link>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                {alerts.length === 0 ? (
                  <p className="p-4 text-xs text-gray-500 text-center">No notifications at present.</p>
                ) : (
                  alerts.slice(0, 4).map((alert) => (
                    <div
                      key={alert.id}
                      onClick={() => markAlertAsRead(alert.id)}
                      className={`p-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                        !alert.read ? 'bg-agri-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {alert.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                        {alert.severity === 'critical' && <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                        {alert.severity === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                        {alert.severity === 'info' && <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                        <div>
                          <p className="text-xs font-bold text-gray-900">{alert.title}</p>
                          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{alert.message}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block">{alert.date}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-9 h-9 rounded-xl object-cover border border-agri-300 shadow-xs"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-gray-900 leading-tight">{userProfile.name}</p>
              <p className="text-[10px] text-agri-700 font-semibold">{userProfile.district}, {userProfile.state}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-30">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900">{userProfile.name}</p>
                <p className="text-[11px] text-gray-500 truncate">{userProfile.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setShowProfileDropdown(false)}
                className="block px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                My Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setShowProfileDropdown(false)}
                className="block px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Account Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
