import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-agri-dark text-white border-t border-agri-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-agri-brand flex items-center justify-center text-white shadow-md">
                <Sprout className="w-6 h-6 text-agri-300" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">CropWise AI</span>
            </div>
            <p className="text-agri-100/80 text-sm leading-relaxed">
              AI-powered crop intelligence platform empowering farmers with disease detection, season recommendations, market forecasts, and weather insights.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-agri-300">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Kisan Helpline: <strong>1800-180-1551 (Toll Free)</strong></span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-agri-300 mb-4">Platform Features</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/disease-detection" className="hover:text-agri-300 transition-colors">AI Disease Detection</Link></li>
              <li><Link to="/crop-recommendation" className="hover:text-agri-300 transition-colors">Crop Recommendation Engine</Link></li>
              <li><Link to="/market" className="hover:text-agri-300 transition-colors">Market Price Intelligence</Link></li>
              <li><Link to="/price-prediction" className="hover:text-agri-300 transition-colors">AI Future Price Prediction</Link></li>
              <li><Link to="/weather" className="hover:text-agri-300 transition-colors">Agri Weather Forecast</Link></li>
            </ul>
          </div>

          {/* Useful Resources */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-agri-300 mb-4">Resources & Guides</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/crop-guide" className="hover:text-agri-300 transition-colors">Crop Cultivation Guide</Link></li>
              <li><Link to="/organic-farming" className="hover:text-agri-300 transition-colors">Organic Farming Practices</Link></li>
              <li><Link to="/pest-management" className="hover:text-agri-300 transition-colors">Integrated Pest Management (IPM)</Link></li>
              <li><Link to="/about" className="hover:text-agri-300 transition-colors">About Technology Stack</Link></li>
              <li><Link to="/contact" className="hover:text-agri-300 transition-colors">Support & Contact</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-agri-300 mb-4">Regional Hub</h4>
            <ul className="space-y-3 text-sm text-agri-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Narasaraopet, Palnadu District, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@cropwise.ai</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 (08647) 224-890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-agri-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-agri-100/60 gap-4">
          <p>© 2026 CropWise AI Platform. All rights reserved. Built for Smart Agricultural Intelligence.</p>
          <div className="flex items-center gap-1">
            <span>Empowering Indian Farmers with AI</span>
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
