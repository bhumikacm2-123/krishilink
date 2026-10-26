import React from 'react';
import { 
  Sparkles, 
  Landmark, 
  ShieldCheck, 
  TrendingUp, 
  CloudSun, 
  CheckCircle2, 
  ArrowRight,
  Sprout
} from 'lucide-react';

export default function Hero({ t, onExploreTools, onDiscoverSchemes }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-emerald-100/60">
      
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 -translate-y-12 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 -translate-x-12 w-80 h-80 bg-lime-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Banner */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300/80 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span className="text-xs sm:text-sm font-bold text-emerald-900 tracking-wide">
                🌱 {t.heroBadge3} • {t.heroBadge1}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              <span className="block text-emerald-950 font-serif">
                {t.heroHeading}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreTools}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white font-extrabold text-base shadow-lg shadow-emerald-900/25 hover:from-emerald-900 hover:to-emerald-800 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 text-emerald-200 group-hover:rotate-12 transition-transform" />
                <span>{t.exploreToolsBtn}</span>
                <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onDiscoverSchemes}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white text-emerald-900 border-2 border-emerald-700/30 font-extrabold text-base hover:bg-emerald-50/70 hover:border-emerald-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 shadow-sm"
              >
                <Landmark className="w-5 h-5 text-emerald-700" />
                <span>{t.discoverSchemesBtn}</span>
              </button>
            </div>

            {/* Trust checkmarks */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free for all Indian Farmers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified .gov.in Subsidies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Offline Resilient Architecture</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Agricultural Images and AI Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Rounded Hero Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-emerald-900">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80"
                  alt="Indian farmer inspecting lush green field with smart technology"
                  className="w-full h-full object-cover brightness-[0.95] contrast-[1.05] hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20" />

                {/* Bottom caption on image */}
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-emerald-300 font-black">Smart Crop Intelligence</p>
                      <h4 className="text-sm font-bold">Ragi, Paddy & 14+ Indian Crops</h4>
                    </div>
                    <span className="text-xs font-black bg-emerald-500 text-white px-2.5 py-1 rounded-full shadow-xs">
                      Live AI
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Diagnostic Accuracy */}
              <div className="absolute -top-5 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-emerald-100 flex items-center gap-3 animate-fade-in hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Benchmark Model</p>
                  <p className="text-sm font-extrabold text-emerald-900">93.4% Diagnostic Acc.</p>
                </div>
              </div>

              {/* Floating Badge 2: Direct Govt Subsidies */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white rounded-2xl p-3.5 shadow-xl border border-emerald-100 flex items-center gap-3 animate-fade-in hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">PM-KISAN & KCC</p>
                  <p className="text-sm font-extrabold text-slate-900">Direct ₹ & Low 4% Loan</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Stats Grid */}
        <div className="mt-14 pt-8 border-t border-emerald-100 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
            <p className="text-2xl sm:text-3xl font-black text-emerald-900 font-mono">16+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">{t.statCrops}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
            <p className="text-2xl sm:text-3xl font-black text-emerald-900 font-mono">93.4%</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">{t.statAccuracy}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
            <p className="text-2xl sm:text-3xl font-black text-emerald-900 font-mono">8 Verified</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">{t.statSchemes}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors">
            <p className="text-2xl sm:text-3xl font-black text-emerald-900 font-mono">24/7</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">{t.statAdvisories}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
