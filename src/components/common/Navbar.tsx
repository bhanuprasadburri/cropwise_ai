import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Menu, X, ArrowRight, UserCheck, LayoutDashboard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Crop Guide', path: '/crop-guide' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-agri-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-agri-brand flex items-center justify-center text-white shadow-md shadow-agri-700/20 group-hover:bg-agri-dark transition-colors">
            <Sprout className="w-6 h-6 text-agri-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl text-agri-dark tracking-tight">CropWise</span>
              <span className="bg-agri-100 text-agri-800 text-xs font-bold px-2 py-0.5 rounded-full border border-agri-200">AI</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium tracking-wide">Smarter Farming. Better Decisions.</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive(link.path)
                  ? 'text-agri-800 bg-agri-50 border border-agri-200/60'
                  : 'text-gray-600 hover:text-agri-800 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-sm shadow-md shadow-agri-700/20 hover:bg-agri-dark hover:shadow-lg transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-agri-300" />
              GO TO DASHBOARD
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3.5 py-2.5 rounded-xl text-gray-700 hover:text-agri-800 font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-sm shadow-md shadow-agri-700/20 hover:bg-agri-dark hover:shadow-lg transition-all"
              >
                REGISTER
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-agri-800 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-semibold ${
                isActive(link.path)
                  ? 'text-agri-800 bg-agri-50 border border-agri-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-agri-brand text-white font-semibold shadow-md"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-gray-700 font-semibold border border-gray-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-agri-brand text-white font-semibold"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
