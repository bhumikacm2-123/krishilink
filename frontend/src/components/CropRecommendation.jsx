import React, { useState } from 'react';
import { 
  Sparkles, 
  Droplets, 
  Clock, 
  Layers, 
  MapPin, 
  Thermometer, 
  CloudRain, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  TrendingUp,
  RefreshCw,
  Info
} from 'lucide-react';
import { api } from '../services/api';

export default function CropRecommendation({ t, user, onOpenAuth }) {
  const [formData, setFormData] = useState({
    soil_type: 'Red & Yellow',
    ph: 6.5,
    N: 60,
    P: 45,
    K: 40,
    temperature: 26,
    humidity: 68,
    rainfall: 95,
    location: 'Karnataka'
  });

  const [loading, setLoading] = useState(false);
  const [fetchingWeather, setFetchingWeather] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const soilTypes = [
    'Red & Yellow',
    'Black Soil (Regur)',
    'Alluvial Soil',
    'Laterite Soil',
    'Sandy Loam',
    'Clayey'
  ];

  const indianStates = [
    'Karnataka',
    'Maharashtra',
    'Andhra Pradesh',
    'Tamil Nadu',
    'Telangana',
    'Punjab',
    'Haryana',
    'Uttar Pradesh',
    'Madhya Pradesh',
    'Gujarat',
    'Kerala'
  ];

  const presets = [
    {
      label: 'Karnataka Red Loam (Ragi / Pulses)',
      values: { soil_type: 'Red & Yellow', ph: 6.4, N: 48, P: 36, K: 32, temperature: 25, humidity: 62, rainfall: 75, location: 'Karnataka' }
    },
    {
      label: 'Cauvery Alluvial Basin (Paddy / Sugarcane)',
      values: { soil_type: 'Alluvial Soil', ph: 6.8, N: 85, P: 48, K: 45, temperature: 28, humidity: 80, rainfall: 180, location: 'Karnataka' }
    },
    {
      label: 'Deccan Black Cotton (Cotton / Chilli)',
      values: { soil_type: 'Black Soil (Regur)', ph: 7.2, N: 90, P: 50, K: 60, temperature: 30, humidity: 55, rainfall: 70, location: 'Karnataka' }
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'soil_type' || name === 'location' ? value : parseFloat(value) || 0
    }));
  };

  const applyPreset = (presetValues) => {
    setFormData(presetValues);
    setResult(null);
    setError(null);
  };

  const handleAutoFillWeather = async () => {
    setFetchingWeather(true);
    try {
      const data = await api.getWeather(formData.location || 'Mandya');
      if (data && data.current) {
        setFormData(prev => ({
          ...prev,
          temperature: Math.round(data.current.temperature),
          humidity: Math.round(data.current.humidity),
          rainfall: data.current.rain > 0 ? Math.round(data.current.rain * 15) : prev.rainfall
        }));
      }
    } catch (err) {
      console.warn('Weather auto-fill fallback used');
    } finally {
      setFetchingWeather(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const response = await api.recommendCrop(formData);
      if (response.error) {
        setError(response.error);
      } else {
        setResult(response);
        if (response.saved_to_dashboard) {
          setSavedSuccess(true);
        }
      }
    } catch (err) {
      setError('Could not connect to the recommendation API. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  // Descriptive pH badge
  const getPhDescription = (ph) => {
    if (ph < 5.5) return { label: 'Strongly Acidic', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (ph < 6.5) return { label: 'Slightly Acidic', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (ph <= 7.3) return { label: 'Neutral (Optimal)', color: 'text-emerald-800 bg-emerald-100 border-emerald-300' };
    if (ph <= 8.2) return { label: 'Mildly Alkaline', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { label: 'Strongly Alkaline', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const phMeta = getPhDescription(formData.ph);

  return (
    <section id="crop-rec" className="py-16 bg-slate-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Machine Learning Agronomy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t.cropRecTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.cropRecSubtitle}
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mr-2">
            Load Regional Presets:
          </span>
          {presets.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => applyPreset(p.values)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 shadow-2xs transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>Soil & Field Parameters</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAutoFillWeather}
                  disabled={fetchingWeather}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200 transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${fetchingWeather ? 'animate-spin' : ''}`} />
                  <span>{fetchingWeather ? 'Fetching...' : t.autoFillWeatherBtn}</span>
                </button>
              </div>

              {/* State & Soil Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.locationLabel}
                  </label>
                  <div className="relative">
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {indianStates.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.soilTypeLabel}
                  </label>
                  <select
                    name="soil_type"
                    value={formData.soil_type}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {soilTypes.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Soil pH with interactive slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {t.soilPhLabel}: <span className="text-emerald-900 font-extrabold text-sm">{formData.ph}</span>
                  </label>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${phMeta.color}`}>
                    {phMeta.label}
                  </span>
                </div>
                <input
                  type="range"
                  name="ph"
                  min="4.5"
                  max="9.0"
                  step="0.1"
                  value={formData.ph}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                  <span>Acidic (4.5)</span>
                  <span>Neutral (7.0)</span>
                  <span>Alkaline (9.0)</span>
                </div>
              </div>

              {/* N - P - K Nutrients */}
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                  <span>Soil Macronutrients (NPK)</span>
                  <span className="text-[11px] font-normal text-slate-500">From Soil Health Card</span>
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nitrogen (N)
                    </label>
                    <input
                      type="number"
                      name="N"
                      min="0"
                      max="200"
                      value={formData.N}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Phosphorus (P)
                    </label>
                    <input
                      type="number"
                      name="P"
                      min="0"
                      max="150"
                      value={formData.P}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Potassium (K)
                    </label>
                    <input
                      type="number"
                      name="K"
                      min="0"
                      max="250"
                      value={formData.K}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Climate Factors */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Temp (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    min="10"
                    max="45"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    name="humidity"
                    min="15"
                    max="100"
                    value={formData.humidity}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Rain (mm)
                  </label>
                  <input
                    type="number"
                    name="rainfall"
                    min="10"
                    max="400"
                    value={formData.rainfall}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base shadow-md shadow-emerald-800/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{t.analyzingText}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-emerald-200" />
                    <span>{t.predictCropBtn}</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7">
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}

            {!result && !loading && (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-dashed border-emerald-200/80 text-center flex flex-col items-center justify-center min-h-[420px]">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-800">
                  Ready to Predict Your Ideal Crop
                </h4>
                <p className="mt-2 text-sm text-slate-500 max-w-md">
                  Adjust soil type, NPK, and rainfall parameters on the left, then click{' '}
                  <strong className="text-emerald-700">"{t.predictCropBtn}"</strong> to generate machine-learning agronomic recommendations.
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-3xl p-12 border border-emerald-100 text-center flex flex-col items-center justify-center min-h-[420px] animate-pulse">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mb-4" />
                <h4 className="text-lg font-bold text-slate-800">
                  {t.analyzingText}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Evaluating soil-climate compatibility matrix...
                </p>
              </div>
            )}

            {result && result.recommended_crop && (
              <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden animate-fade-in">
                
                {/* Result Hero Header */}
                <div className="relative h-48 sm:h-56 bg-emerald-950 overflow-hidden">
                  <img
                    src={result.recommended_crop.image}
                    alt={result.recommended_crop.name}
                    className="w-full h-full object-cover brightness-[0.85] contrast-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/90 text-emerald-950 backdrop-blur-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.matchScore}: {result.recommended_crop.confidence}%</span>
                    </span>

                    <span className={`text-[11px] font-black px-3 py-1 rounded-full ${
                      result.is_demo_mode 
                        ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                        : 'bg-emerald-500 text-white shadow-xs'
                    }`}>
                      {result.is_demo_mode ? 'Demo Model' : 'Random Forest ML (93.4%)'}
                    </span>
                  </div>

                  {/* Crop Title on Banner */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-black text-emerald-300 uppercase tracking-widest">
                      {result.recommended_crop.category} • {result.recommended_crop.scientific_name}
                    </p>
                    <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                      <h3 className="text-2xl sm:text-3xl font-black font-serif">
                        {result.recommended_crop.name}
                      </h3>
                      <span className="text-lg font-bold text-emerald-200">
                        ({result.recommended_crop.kannada_name})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Core Agronomic Metrics Grid */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {t.waterReq}
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1 flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{result.recommended_crop.water_requirement.split('(')[0]}</span>
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {t.growthCycle}
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{result.recommended_crop.growth_duration}</span>
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Optimal pH
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1">
                        {result.recommended_crop.optimal_ph}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {t.expectedYield}
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-emerald-900 mt-1">
                        {result.recommended_crop.expected_yield}
                      </p>
                    </div>
                  </div>

                  {/* Agronomic Reasoning Box */}
                  <div className="bg-emerald-50/70 rounded-2xl p-4 sm:p-5 border border-emerald-200/80">
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-1.5">
                      <Info className="w-4 h-4 text-emerald-700" />
                      <span>{t.rationaleTitle}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                      {result.recommended_crop.reasoning}
                    </p>
                    <div className="mt-3 pt-3 border-t border-emerald-200/60 flex flex-wrap gap-2 text-xs font-semibold text-emerald-900">
                      <span><strong>Fertilizer Dose (NPK):</strong> {result.recommended_crop.npk_ratio}</span>
                      <span>•</span>
                      <span><strong>Season:</strong> {result.recommended_crop.season}</span>
                    </div>
                  </div>

                  {/* Growing Tips */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{t.growingTipsTitle}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {result.recommended_crop.growing_tips.map((tip, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 text-xs text-slate-700 font-medium leading-relaxed">
                          • {tip}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alternative Viable Crops */}
                  {result.alternatives && result.alternatives.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2.5">
                        {t.alternativesTitle}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {result.alternatives.map((alt, i) => (
                          <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <img src={alt.image} alt={alt.crop_name} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">{alt.crop_name}</p>
                              <p className="text-[10px] text-emerald-700 font-bold">{alt.confidence}% Match</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Save Action */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                      Submitted parameters: N={formData.N}, P={formData.P}, K={formData.K}, pH={formData.ph}, Rain={formData.rainfall}mm
                    </p>

                    {user ? (
                      <button
                        onClick={() => setSavedSuccess(true)}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                          savedSuccess
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-emerald-700 text-white hover:bg-emerald-800'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{savedSuccess ? t.savedSuccessText : t.saveToDashboardBtn}</span>
                      </button>
                    ) : (
                      <button
                        onClick={onOpenAuth}
                        className="px-4 py-2 rounded-xl text-xs font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                        <span>Login to Save Recommendation</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
