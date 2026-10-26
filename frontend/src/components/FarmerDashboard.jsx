import React, { useState, useEffect } from 'react';
import { 
  User, 
  Layers, 
  MapPin, 
  Sparkles, 
  Leaf, 
  Landmark, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Bookmark,
  Droplets,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

export default function FarmerDashboard({ t, user, onOpenAuth }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recs');

  const fetchDashboard = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await api.getDashboard();
      if (data && !data.error) {
        setDashboardData(data);
      }
    } catch (e) {
      console.warn('Dashboard fetch error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [user]);

  const handleDeleteRec = async (id) => {
    if (window.confirm('Delete this saved crop recommendation?')) {
      await api.deleteSavedRec(id);
      fetchDashboard();
    }
  };

  const handlePrintSummary = () => {
    window.print();
  };

  if (!user) {
    return (
      <section id="dashboard" className="py-20 bg-slate-50 border-b border-emerald-100">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
            {t.dashboardTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to view your saved AI crop recommendations, disease scan history, and bookmarked government welfare subsidies.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-16 bg-slate-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-slate-900 font-serif">{user.name}</h2>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Verified Farmer
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user.village ? `${user.village}, ` : ''}{user.district}, {user.state}</span>
                  <span>•</span>
                  <span>{user.phone || user.email}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handlePrintSummary}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-50 text-slate-700"
            >
              <Printer className="w-4 h-4" />
              <span>Print Farm Report</span>
            </button>
          </div>

          {/* Farm Details Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Landholding</span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">{user.farm_size || '3.5 Acres'}</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Soil Type</span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">{user.soil_type || 'Red Sandy Loam'}</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Primary Crops</span>
              <p className="text-sm font-extrabold text-emerald-900 mt-1 truncate">
                {Array.isArray(user.primary_crops) ? user.primary_crops.join(', ') : user.primary_crops}
              </p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Irrigation Mode</span>
              <p className="text-sm font-extrabold text-slate-900 mt-1">{user.irrigation_type || 'Drip & Borewell'}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs & Counts */}
        <div className="flex border-b border-slate-200 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('recs')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'recs'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Saved Recommendations ({dashboardData?.stats?.saved_recommendations_count || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('scans')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'scans'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>Disease Scan History ({dashboardData?.stats?.disease_scans_count || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'bookmarks'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Bookmarked Schemes ({dashboardData?.stats?.bookmarked_schemes_count || 0})</span>
          </button>
        </div>

        {/* Tab 1: Saved Recommendations */}
        {activeTab === 'recs' && (
          <div className="space-y-4">
            {(!dashboardData?.recent_recommendations || dashboardData.recent_recommendations.length === 0) ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">{t.noSavedRecs}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.recent_recommendations.map((rec) => (
                  <div key={rec._id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex justify-between gap-4">
                    <div className="flex gap-4">
                      {rec.recommended_crop?.image && (
                        <img
                          src={rec.recommended_crop.image}
                          alt={rec.recommended_crop.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">{rec.recommended_crop?.name}</h4>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {rec.recommended_crop?.confidence}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {rec.recommended_crop?.reasoning}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2">
                          Saved: {new Date(rec.created_at || rec.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteRec(rec._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl self-start"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Disease Scan History */}
        {activeTab === 'scans' && (
          <div className="space-y-4">
            {(!dashboardData?.recent_scans || dashboardData.recent_scans.length === 0) ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                <Leaf className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">{t.noScans}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardData.recent_scans.map((scan, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
                    {scan.preview_image ? (
                      <img
                        src={scan.preview_image}
                        alt="Leaf preview"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 shrink-0">
                        <Leaf className="w-7 h-7" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">{scan.crop}</span>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{scan.disease_name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-bold text-teal-700">{scan.confidence}% Confidence</span>
                        <span className="text-[10px] text-slate-400">• {new Date(scan.analyzed_at || scan.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Bookmarked Schemes */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-4">
            {(!dashboardData?.bookmarked_schemes || dashboardData.bookmarked_schemes.length === 0) ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">{t.noBookmarks}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.bookmarked_schemes.map((s) => (
                  <div key={s.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {s.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{s.name}</h4>
                      <p className="text-xs font-bold text-amber-800 mt-1">{s.financial_benefit}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.short_description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={s.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
