import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-agri-700 uppercase tracking-widest bg-agri-100 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          We are Here to Support Your Farming Journey
        </h1>
        <p className="text-base text-gray-600">
          Have questions about CropWise AI features, agronomist partnership, or KVK integrations? Send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="bg-agri-dark text-white rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold">Contact Information</h2>
            <div className="space-y-4 text-sm text-agri-100/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <strong className="block text-white">CropWise Regional Agronomy Center</strong>
                  <span>Narasaraopet, Palnadu District, Andhra Pradesh - 522601</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-white">Farmer Toll-Free Helpline</strong>
                  <span>1800-180-1551 / +91 (08647) 224-890</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-white">Support Email</strong>
                  <span>support@cropwise.ai</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="block text-white">Working Hours</strong>
                  <span>Mon – Sat: 6:00 AM – 8:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs text-agri-200">
            🌾 Instant Agri Assistance available for Telugu & English speaking farmers.
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
          {submitted ? (
            <div className="p-8 text-center space-y-4 my-8">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-extrabold text-gray-900">Message Sent Successfully!</h3>
              <p className="text-sm text-gray-600">Our agronomist support team will respond to your query within 24 hours.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-agri-brand text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-extrabold text-gray-900">Send Us a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email / Mobile Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="ramesh@cropwise.ai"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Question about Tomato Disease scan"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Message Details</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Type your question or query here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-agri-brand text-white font-bold text-sm shadow-md hover:bg-agri-dark transition-colors"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
