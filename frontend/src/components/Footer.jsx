import React from 'react';
import { 
  Sprout, 
  Phone, 
  Mail, 
  Globe, 
  Heart, 
  ExternalLink, 
  Landmark, 
  ShieldCheck 
} from 'lucide-react';

export default function Footer({ t, onSelectTab }) {
  const govtLinks = [
    { label: 'PM-KISAN Samman Nidhi', url: 'https://pmkisan.gov.in/' },
    { label: 'PM Fasal Bima Yojana (PMFBY)', url: 'https://pmfby.gov.in/' },
    { label: 'PM Krishi Sinchayee Yojana', url: 'https://pmksy.gov.in/' },
    { label: 'Soil Health Card Portal', url: 'https://soilhealth.dac.gov.in/' },
    { label: 'Kisan Credit Card (myScheme)', url: 'https://www.myscheme.gov.in/schemes/kcc' },
    { label: 'Karnataka FRUITS Portal', url: 'https://fruits.karnataka.gov.in/' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-700/30">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight font-sans">
                  {t.brandName}
                </span>
                <p className="text-xs font-bold text-emerald-400">
                  {t.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              {t.footerDesc}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/40">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Dedicated to Indian Agrarian Prosperity & Food Security</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Platform Tools
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onSelectTab('crop-rec')} className="hover:text-emerald-400 transition-colors">
                  {t.navCropRec}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('disease-detection')} className="hover:text-emerald-400 transition-colors">
                  {t.navDisease}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('weather')} className="hover:text-emerald-400 transition-colors">
                  {t.navWeather}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('schemes')} className="hover:text-emerald-400 transition-colors">
                  {t.navSchemes}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('guides')} className="hover:text-emerald-400 transition-colors">
                  {t.navGuides}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('practices')} className="hover:text-emerald-400 transition-colors">
                  {t.navPractices}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('calendar')} className="hover:text-emerald-400 transition-colors">
                  {t.navCalendar}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Govt Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Official Portals (.gov.in)
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {govtLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Helplines Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              {t.footerHelplineTitle}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Kisan Call Center</span>
                <span className="text-sm font-black text-emerald-400 font-mono mt-0.5 block">1800-180-1551</span>
                <span className="text-[10px] text-slate-500">Toll Free 24x7 Support</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">PM-KISAN Direct Line</span>
                <span className="text-sm font-black text-amber-400 font-mono mt-0.5 block">155261 / 011-24300606</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Farmer Grievance Email</span>
                <span className="text-xs font-semibold text-slate-300 mt-0.5 block">support@krishilink.in</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Credits */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with modern AI & agricultural science for Indian Farmers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
