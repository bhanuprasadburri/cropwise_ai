import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Sprout,
  LayoutDashboard,
  User,
  Tractor,
  Scan,
  Sparkles,
  CloudSun,
  BookOpen,
  TrendingUp,
  LineChart,
  Leaf,
  Bug,
  FileCheck,
  Bell,
  Settings,
  LogOut,
  X,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, setMobileOpen }) => {
  const { alerts, activeFarm, logout } = useApp();
  const navigate = useNavigate();

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'My Farms', path: '/farms', icon: Tractor },
    { name: 'Disease Detection', path: '/disease-detection', icon: Scan, badge: 'AI' },
    { name: 'Crop Recommendation', path: '/crop-recommendation', icon: Sparkles, badge: 'AI' },
    { name: 'Weather Forecast', path: '/weather', icon: CloudSun },
    { name: 'Crop Guide', path: '/app-crop-guide', icon: BookOpen },
    { name: 'Market Prices', path: '/market', icon: TrendingUp },
    { name: 'Future Price AI', path: '/price-prediction', icon: LineChart, badge: 'Predict' },
    { name: 'Organic Farming', path: '/organic-farming', icon: Leaf },
    { name: 'Pest & Pesticide', path: '/pest-management', icon: Bug },
    { name: 'Saved Reports', path: '/reports', icon: FileCheck },
    { name: 'Alerts & Notifications', path: '/alerts', icon: Bell, count: unreadAlertsCount },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <aside className="w-72 bg-agri-sidebar text-white flex flex-col h-full border-r border-agri-800 shadow-xl select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-agri-800/80 flex items-center justify-between">
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-agri-brand flex items-center justify-center text-white shadow-md">
            <Sprout className="w-6 h-6 text-agri-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">CropWise</span>
              <span className="bg-agri-accent text-agri-dark text-[10px] font-extrabold px-1.5 py-0.5 rounded">AI</span>
            </div>
            <p className="text-[11px] text-agri-300/80 font-medium">SaaS Platform</p>
          </div>
        </NavLink>
        {setMobileOpen && (
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-400 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Active Farm Indicator Chip */}
      <div className="mx-4 my-3 p-3 rounded-xl bg-agri-dark/90 border border-agri-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="truncate">
            <p className="text-[10px] uppercase font-bold tracking-wider text-agri-300">Active Farm</p>
            <p className="text-xs font-semibold text-white truncate">{activeFarm?.name || 'Green Valley Farm'}</p>
          </div>
        </div>
        <NavLink to="/farms" className="text-agri-300 hover:text-white text-xs font-medium flex items-center gap-0.5">
          <ChevronRight className="w-4 h-4" />
        </NavLink>
      </div>

      {/* Nav Menu Items */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                  isActive
                    ? 'bg-agri-brand text-white font-semibold shadow-md border-l-4 border-agri-accent'
                    : 'text-agri-100/80 hover:bg-agri-dark hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-agri-300 group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white animate-bounce">
                    {item.count}
                  </span>
                )}
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Logout Footer Button */}
      <div className="p-4 border-t border-agri-800/80">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl font-semibold text-sm text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0 z-30">{sidebarContent}</div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen && setMobileOpen(false)} />
          <div className="relative z-10 w-72 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
