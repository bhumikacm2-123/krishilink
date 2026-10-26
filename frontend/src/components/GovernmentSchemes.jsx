import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Bookmark, 
  ShieldCheck, 
  FileText, 
  Phone, 
  X,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { api } from '../services/api';

export default function GovernmentSchemes({ t, user, onOpenAuth }) {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalScheme, setActiveModalScheme] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'financial', label: t.categoryFinancial },
    { id: 'insurance', label: t.categoryInsurance },
    { id: 'irrigation', label: t.categoryIrrigation },
    { id: 'credit', label: t.categoryCredit },
    { id: 'solar', label: t.categorySolar },
    { id: 'soil', label: t.categorySoil }
  ];

  const fetchSchemes = async (cat = selectedCategory, search = searchQuery) => {
    setLoading(true);
    try {
      const res = await api.getSchemes(cat === 'all' ? '' : cat, search);
      if (res && res.schemes) {
        setSchemes(res.schemes);
      }
    } catch (e) {
      console.warn('Failed to load schemes');
    } finally {
      setLoading(false);
    }
  };

  const loadUserBookmarks = async () => {
    if (user) {
      try {
        const res = await api.getUserBookmarks();
        if (res && res.bookmarked_scheme_ids) {
          setBookmarkedIds(res.bookmarked_scheme_ids);
        }
      } catch (e) {}
    }
  };

  useEffect(() => {
    fetchSchemes(selectedCategory, searchQuery);
    loadUserBookmarks();
  }, [user]);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    fetchSchemes(catId, searchQuery);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSchemes(selectedCategory, searchQuery);
  };

  const handleToggleBookmark = async (schemeId) => {
    if (!user) {
      onOpenAuth();
      return;
    }
    try {
      const res = await api.toggleBookmark(schemeId);
      if (res.bookmarked) {
        setBookmarkedIds(prev => [...prev, schemeId]);
      } else {
        setBookmarkedIds(prev => prev.filter(id => id !== schemeId));
      }
    } catch (e) {
      console.warn('Bookmark error');
    }
  };

  return (
    <section id="schemes" className="py-16 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Landmark className="w-3.5 h-3.5 text-amber-800" />
            <span>Government Welfare & Subsidies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t.schemesTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.schemesSubtitle}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mb-10 space-y-4 max-w-4xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchSchemesPlaceholder}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-12 pr-28 py-3.5 text-sm font-semibold text-slate-800 shadow-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xs"
            >
              {t.searchBtn}
            </button>
          </form>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
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
            <p className="text-sm font-bold text-slate-600">Retrieving official government schemes...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && schemes.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 max-w-lg mx-auto">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800">No schemes found</h4>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); fetchSchemes('all', ''); }}
              className="mt-4 px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => {
            const isBookmarked = bookmarkedIds.includes(scheme.id);
            return (
              <div
                key={scheme.id}
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.verifiedBadge}</span>
                    </span>

                    <button
                      onClick={() => handleToggleBookmark(scheme.id)}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark Scheme'}
                      className={`p-2 rounded-xl border transition-colors ${
                        isBookmarked
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-slate-50 text-slate-400 hover:text-amber-600 border-slate-200'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Scheme Name & Ministry */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {scheme.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    {scheme.kannada_name}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 mt-1">
                    {scheme.ministry}
                  </p>

                  {/* Highlight Benefit Box */}
                  <div className="my-4 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 flex items-start gap-2.5">
                    <TrendingUp className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
                        Direct Financial Benefit
                      </span>
                      <p className="text-xs font-extrabold text-amber-950 mt-0.5 leading-snug">
                        {scheme.financial_benefit}
                      </p>
                    </div>
                  </div>

                  {/* Short description */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {scheme.short_description}
                  </p>

                  {/* Eligibility bullets */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Eligibility Checklist:
                    </span>
                    <ul className="space-y-1">
                      {scheme.eligibility.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalScheme(scheme)}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.viewDetailsBtn}</span>
                  </button>

                  <a
                    href={scheme.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-emerald-700 hover:text-white text-slate-800 border border-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>{t.officialPortalBtn}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Scheme Detail & Application Steps Modal */}
        {activeModalScheme && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-8">
              
              <button
                onClick={() => setActiveModalScheme(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pr-8">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {activeModalScheme.category} • {activeModalScheme.badge}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 font-serif">
                  {activeModalScheme.name}
                </h3>
                <p className="text-sm font-bold text-emerald-700 mt-0.5">
                  {activeModalScheme.kannada_name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeModalScheme.ministry}
                </p>
              </div>

              {/* Benefit Banner */}
              <div className="my-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                  Official Financial Benefit
                </span>
                <p className="text-sm font-extrabold mt-1">
                  {activeModalScheme.financial_benefit}
                </p>
              </div>

              <div className="space-y-5 text-left max-h-[55vh] overflow-y-auto pr-2">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Scheme Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {activeModalScheme.short_description}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                    Key Entitlements & Advantages
                  </h4>
                  <ul className="space-y-1.5">
                    {activeModalScheme.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step-by-Step Application */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>Step-by-Step Application Procedure</span>
                  </h4>
                  <ol className="space-y-2">
                    {activeModalScheme.application_steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Required Documents */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                    Required Documents Checklist
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalScheme.required_documents.map((doc, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded-lg border border-slate-200">
                        📄 {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Helpline */}
                {activeModalScheme.helpline && (
                  <div className="flex items-center gap-2 text-xs text-slate-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                    <Phone className="w-4 h-4 text-emerald-700" />
                    <span><strong>Toll-Free Scheme Helpline:</strong> {activeModalScheme.helpline}</span>
                  </div>
                )}

              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => handleToggleBookmark(activeModalScheme.id)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.includes(activeModalScheme.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>{bookmarkedIds.includes(activeModalScheme.id) ? 'Bookmarked to Dashboard' : 'Bookmark Scheme'}</span>
                </button>

                <a
                  href={activeModalScheme.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Apply on Official .gov.in Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
