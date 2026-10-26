import React, { useState } from 'react';
import { 
  Sprout, 
  Sparkles, 
  CloudSun, 
  Landmark, 
  BookOpen, 
  Leaf, 
  Calendar, 
  User, 
  Menu, 
  X, 
  Globe, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  lang, 
  setLang, 
  t, 
  user, 
  onOpenAuth, 
  onLogout, 
  activeTab, 
  setActiveTab 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t.navHome, icon: Sprout },
    { 
      id: 'tools', 
      label: t.navTools, 
      icon: Sparkles,
      dropdown: [
        { id: 'crop-rec', label: t.navCropRec },
        { id: 'disease-detection', label: t.navDisease }
      ]
    },
    { id: 'weather', label: t.navWeather, icon: CloudSun },
    { id: 'schemes', label: t.navSchemes, icon: Landmark },
    { id: 'guides', label: t.navGuides, icon: BookOpen },
    { id: 'practices', label: t.navPractices, icon: Leaf },
    { id: 'calendar', label: t.navCalendar, icon: Calendar }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    
    // Smooth scroll to target section if on home
    const elem = document.getElementById(tabId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-7 h-7 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-emerald-950 font-sans">
                  {t.brandName}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-xs font-semibold text-emerald-700 tracking-wide hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              if (item.dropdown) {
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        activeTab === 'crop-rec' || activeTab === 'disease-detection'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-emerald-600" />
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {toolsDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-emerald-100 py-2 z-50 animate-fade-in">
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleNavClick(sub.id)}
                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                          >
                            <span>{sub.label}</span>
                            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                              AI
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    activeTab === item.id
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Switcher & Profile/Login */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => setLang('en')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>English</span>
              </button>
              <button
                onClick={() => setLang('kn')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  lang === 'kn'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>ಕನ್ನಡ</span>
              </button>
            </div>

            {/* Dashboard / Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold border transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                <button
                  onClick={onLogout}
                  title={t.navLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <User className="w-4 h-4" />
                <span>{t.navLogin}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Lang Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
              className="px-2.5 py-1 text-xs font-black bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-300"
            >
              {lang === 'en' ? 'ಕನ್ನಡ' : 'EN'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fade-in">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span>{t.navHome}</span>
            </button>
            <button
              onClick={() => handleNavClick('crop-rec')}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>{t.navCropRec}</span>
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">AI</span>
            </button>
            <button
              onClick={() => handleNavClick('disease-detection')}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <span className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <span>{t.navDisease}</span>
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">AI</span>
            </button>
            <button
              onClick={() => handleNavClick('weather')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <CloudSun className="w-5 h-5 text-emerald-600" />
              <span>{t.navWeather}</span>
            </button>
            <button
              onClick={() => handleNavClick('schemes')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <Landmark className="w-5 h-5 text-emerald-600" />
              <span>{t.navSchemes}</span>
            </button>
            <button
              onClick={() => handleNavClick('guides')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>{t.navGuides}</span>
            </button>
            <button
              onClick={() => handleNavClick('practices')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span>{t.navPractices}</span>
            </button>
            <button
              onClick={() => handleNavClick('calendar')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>{t.navCalendar}</span>
            </button>

            {user ? (
              <div className="pt-2 border-t border-slate-200 mt-2">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-50 text-emerald-900 font-bold"
                >
                  <span className="flex items-center gap-3">
                    <User className="w-5 h-5 text-emerald-700" />
                    <span>{user.name} ({t.navDashboard})</span>
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 mt-2 text-rose-600 font-bold text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.navLogout}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-emerald-700 text-white"
              >
                <User className="w-5 h-5" />
                <span>{t.navLogin}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
