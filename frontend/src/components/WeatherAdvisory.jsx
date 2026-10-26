import React, { useState, useEffect } from 'react';
import { 
  CloudSun, 
  Search, 
  MapPin, 
  RefreshCw, 
  Droplets, 
  Wind, 
  Thermometer, 
  CloudRain, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  Sun,
  Flame,
  Bug,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';

export default function WeatherAdvisory({ t }) {
  const [searchCity, setSearchCity] = useState('Mandya');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const popularDistricts = [
    'Mandya',
    'Mysuru',
    'Bengaluru',
    'Hubballi',
    'Belagavi',
    'Pune',
    'Ludhiana',
    'Guntur'
  ];

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getWeather(city);
      if (data && data.success) {
        setWeatherData(data);
      } else {
        setError('Could not retrieve weather data for this location.');
      }
    } catch (err) {
      setError('Failed to reach meteorological service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Mandya');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeather(searchCity.trim());
    }
  };

  const handleQuickCity = (city) => {
    setSearchCity(city);
    fetchWeather(city);
  };

  const handleGpsDetect = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        () => {
          // Defaulting to user's local major district
          fetchWeather('Bengaluru');
          setSearchCity('Bengaluru');
        },
        () => {
          fetchWeather('Mandya');
        }
      );
    }
  };

  const getAdvisoryColor = (color) => {
    switch (color) {
      case 'red':
        return 'bg-rose-50 border-rose-300 text-rose-900';
      case 'amber':
      case 'orange':
        return 'bg-amber-50 border-amber-300 text-amber-900';
      default:
        return 'bg-emerald-50 border-emerald-300 text-emerald-900';
    }
  };

  return (
    <section id="weather" className="py-16 bg-slate-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CloudSun className="w-3.5 h-3.5 text-sky-700" />
            <span>Agro-Meteorological Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t.weatherTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.weatherSubtitle}
          </p>
        </div>

        {/* Search Bar & Quick Chips */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder={t.searchCityPlaceholder}
                className="w-full bg-white border border-slate-300 rounded-2xl pl-11 pr-4 py-3 text-sm font-semibold text-slate-800 shadow-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-sm transition-all"
            >
              {t.searchBtn}
            </button>
            <button
              type="button"
              onClick={handleGpsDetect}
              title={t.detectGpsBtn}
              className="px-3.5 py-3 rounded-2xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
            </button>
          </form>

          {/* Quick District Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Popular:</span>
            {popularDistricts.map((city) => (
              <button
                key={city}
                onClick={() => handleQuickCity(city)}
                className={`text-xs font-bold px-3 py-1 rounded-xl transition-all ${
                  searchCity.toLowerCase() === city.toLowerCase()
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mb-3" />
            <p className="text-sm font-bold text-slate-600">Retrieving satellite and station data...</p>
          </div>
        )}

        {/* Error Alert */}
        {error && !loading && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-center mb-8">
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}

        {/* Weather Results */}
        {weatherData && !loading && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Main Weather Card */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/15">
                <div>
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-black uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>{weatherData.location.city}, {weatherData.location.state} ({weatherData.location.country})</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black font-serif mt-1">
                    {weatherData.current.condition}
                  </h3>
                  <p className="text-xs text-emerald-200/80 mt-1">
                    {t.lastUpdatedText} {weatherData.last_updated}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-5xl sm:text-6xl font-black font-mono">
                      {weatherData.current.temperature}°C
                    </span>
                    <p className="text-xs text-emerald-200 font-semibold mt-0.5">
                      {t.tempFeelsLike} {weatherData.current.feels_like}°C
                    </p>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
                    <Sun className="w-10 h-10 animate-pulse-subtle" />
                  </div>
                </div>
              </div>

              {/* Weather Indicators Grid */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="text-xs text-emerald-200 font-bold block">{t.humidityText}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Droplets className="w-5 h-5 text-sky-300" />
                    <span className="text-xl font-bold font-mono">{weatherData.current.humidity}%</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="text-xs text-emerald-200 font-bold block">{t.windSpeedText}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Wind className="w-5 h-5 text-teal-300" />
                    <span className="text-xl font-bold font-mono">{weatherData.current.wind_speed} km/h</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="text-xs text-emerald-200 font-bold block">{t.precipitationText}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <CloudRain className="w-5 h-5 text-blue-300" />
                    <span className="text-xl font-bold font-mono">{weatherData.current.precipitation} mm</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <span className="text-xs text-emerald-200 font-bold block">Day Cycle</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Sun className="w-5 h-5 text-amber-300" />
                    <span className="text-xl font-bold">{weatherData.current.is_day ? 'Daytime' : 'Night'}</span>
                  </div>
                </div>
              </div>

              {/* Top ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* 5-Day Forecast Strip */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>{t.dailyForecastTitle}</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {weatherData.daily_forecast.slice(0, 5).map((day, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex flex-col justify-between"
                  >
                    <p className="text-xs font-bold text-slate-600">{day.day_name}</p>
                    <div className="my-2 flex justify-center text-amber-500">
                      <CloudSun className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 font-mono">
                        {day.temp_max}° <span className="text-slate-400 font-normal">/ {day.temp_min}°</span>
                      </p>
                      <p className="text-[11px] font-bold text-sky-700 mt-1">
                        🌧 {day.rain_prob}% ({day.rain_sum}mm)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Practical Agronomic Advisories */}
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>{t.advisoriesTitle}</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {weatherData.advisories.map((adv, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border-2 ${getAdvisoryColor(adv.color)} shadow-2xs flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-black uppercase tracking-wider bg-white/80 px-2.5 py-0.5 rounded-full border border-current">
                          {adv.category}
                        </span>
                        <span className="text-xs font-bold">
                          Urgency: {adv.urgency}
                        </span>
                      </div>
                      <h5 className="text-base font-extrabold leading-snug">
                        {adv.headline}
                      </h5>
                      <p className="mt-2 text-xs sm:text-sm font-normal opacity-90 leading-relaxed">
                        {adv.details}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-current/20 flex items-center justify-between text-xs font-bold">
                      <span>Action: {adv.type}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
