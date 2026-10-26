import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function ContactSection({ t }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Crop Health Advisory',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Crop Health Advisory',
          message: ''
        });
      } else {
        setError(res.error || 'Failed to submit form.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>Agricultural Extension Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Ask an Agronomist & Feedback
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Have a question about pest identification, fertilizer schedules, or government subsidy applications? Send your inquiry to our agronomy support desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Helplines */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <h3 className="text-2xl font-black font-serif">
                Farmer Emergency Helplines
              </h3>
              <p className="text-xs text-emerald-200 mt-1">
                Toll-free agricultural support provided by Ministry of Agriculture, GoI.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <Phone className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Kisan Call Center (All India)</p>
                    <p className="text-lg font-black font-mono text-white mt-0.5">1800-180-1551</p>
                    <p className="text-[11px] text-emerald-300">Toll-free 6:00 AM to 10:00 PM (All 22 Regional Languages)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <Phone className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-emerald-200 font-bold uppercase tracking-wider">PM-KISAN Helpline</p>
                    <p className="text-lg font-black font-mono text-white mt-0.5">155261 / 011-24300606</p>
                    <p className="text-[11px] text-emerald-300">Direct Benefit Transfer installment assistance</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <MapPin className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-emerald-200 font-bold uppercase tracking-wider">Karnataka RSK Support</p>
                    <p className="text-sm font-bold text-white mt-0.5">Raitha Samparka Kendra Network</p>
                    <p className="text-[11px] text-emerald-300">Available at all Hobli and Taluk headquarters</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Agricultural Extension Network</span>
              </div>
              <p>
                KrishiLink connects college research, machine learning diagnostics, and grassroots farmers into an accessible unified portal.
              </p>
            </div>

          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
            {success ? (
              <div className="py-12 text-center flex flex-col items-center justify-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Thank you! Your message has been sent.</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md">
                  Our agronomist extension team will review your query and reply within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Gowda"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98450 12345"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="farmer@example.com"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    >
                      <option value="Crop Health Advisory">Plant Disease & Pest Control</option>
                      <option value="Government Scheme Application">Govt Scheme & Subsidy Question</option>
                      <option value="Soil Health Card Query">Soil Health & NPK Dosage</option>
                      <option value="Irrigation Guidance">Drip & Irrigation Advice</option>
                      <option value="General Platform Feedback">Platform Feedback / College Project Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Describe Your Farming Query or Feedback *
                  </label>
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your field observation, crop symptoms, questions, or suggestion..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Send Inquiry to Agronomist'}</span>
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
