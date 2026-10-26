import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Droplets, 
  Clock, 
  Layers, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Sprout, 
  AlertCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { api } from '../services/api';

export default function CropGuides({ t }) {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const categories = [
    { id: 'all', label: 'All Crops' },
    { id: 'cereal', label: 'Cereals & Millets' },
    { id: 'plantation', label: 'Plantation Crops' },
    { id: 'spice', label: 'Spices & Cash Crops' },
    { id: 'fruit', label: 'Horticulture & Fruits' },
    { id: 'pulse', label: 'Pulses & Legumes' }
  ];

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const res = await api.getCropGuides(categoryFilter === 'all' ? '' : categoryFilter, search);
      if (res && res.crops) {
        setCrops(res.crops);
      }
    } catch (e) {
      console.warn('Failed to load crop guides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCrops();
  };

  return (
    <section id="guides" className="py-16 bg-slate-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Agronomic Knowledge Manuals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t.guidesTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.guidesSubtitle}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crop guides (e.g. Rice, Ragi, Arecanut, Chilli, Cotton, Maize)..."
              className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-28 py-3.5 text-sm font-semibold text-slate-800 shadow-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xs"
            >
              Search
            </button>
          </form>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mb-3" />
            <p className="text-sm font-bold text-slate-600">Loading comprehensive Indian crop guides...</p>
          </div>
        )}

        {/* Crops Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <div
              key={crop.key}
              onClick={() => setSelectedCrop(crop)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Crop Image */}
                <div className="relative h-44 bg-emerald-950 overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black text-emerald-950">
                    {crop.category}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xl font-bold font-serif leading-tight">
                      {crop.name}
                    </h3>
                    <p className="text-xs text-emerald-300 font-semibold mt-0.5">
                      {crop.kannada_name} • <span className="italic">{crop.scientific_name}</span>
                    </p>
                  </div>
                </div>

                {/* Key Facts Summary */}
                <div className="p-5 space-y-3">
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Duration</span>
                      <span className="font-extrabold text-slate-800">{crop.growth_duration}</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Water</span>
                      <span className="font-extrabold text-slate-800 truncate block">{crop.water_requirement.split('(')[0]}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                      Suitable Soils
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {crop.suitable_soils.slice(0, 3).map((st, i) => (
                        <span key={i} className="text-[11px] bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded-md border border-emerald-100">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    {crop.growing_tips[0]}
                  </p>

                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
                <span>View Full Agronomic Manual</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

        {/* Single Crop Detail Modal */}
        {selectedCrop && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden relative my-8 max-h-[90vh] flex flex-col">
              
              {/* Modal Image Header */}
              <div className="relative h-48 sm:h-56 bg-emerald-950 shrink-0">
                <img
                  src={selectedCrop.image}
                  alt={selectedCrop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <button
                  onClick={() => setSelectedCrop(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                    {selectedCrop.category} • {selectedCrop.scientific_name}
                  </span>
                  <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                    <h3 className="text-2xl sm:text-3xl font-black font-serif">
                      {selectedCrop.name}
                    </h3>
                    <span className="text-lg font-bold text-emerald-200">
                      ({selectedCrop.kannada_name})
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                
                {/* Agronomic Matrix Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Optimal pH</span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1">{selectedCrop.optimal_ph}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Growth Cycle</span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1">{selectedCrop.growth_duration}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Expected Yield</span>
                    <p className="text-xs sm:text-sm font-extrabold text-emerald-900 mt-1">{selectedCrop.expected_yield}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Season Window</span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1 truncate">{selectedCrop.season.split('(')[0]}</p>
                  </div>
                </div>

                {/* Fertilizer Schedule */}
                <div className="bg-emerald-50 rounded-2xl p-4 sm:p-5 border border-emerald-200">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                    <span>Recommended Fertilizer Schedule (NPK)</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-950 font-bold">
                    {selectedCrop.npk_ratio}
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Apply phosphorus as basal dose. Split nitrogen into 2 to 3 applications (basal, vegetative growth, and flower initiation).
                  </p>
                </div>

                {/* Practical Growing Tips */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Agronomic Management & Water Conservation Tips</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedCrop.growing_tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary Growing States */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Primary Cultivation Belts in India</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCrop.primary_states.map((st, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded-lg border border-slate-200">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedCrop(null)}
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  Close Guide
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
