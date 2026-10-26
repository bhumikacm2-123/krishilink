import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickAccessCards from './components/QuickAccessCards';
import CropRecommendation from './components/CropRecommendation';
import DiseaseDetection from './components/DiseaseDetection';
import WeatherAdvisory from './components/WeatherAdvisory';
import GovernmentSchemes from './components/GovernmentSchemes';
import CropGuides from './components/CropGuides';
import SustainableFarming from './components/SustainableFarming';
import FarmingCalendar from './components/FarmingCalendar';
import KnowledgeBase from './components/KnowledgeBase';
import FarmerDashboard from './components/FarmerDashboard';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

import { translations } from './i18n/translations';
import { api } from './services/api';

export default function App() {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [backendHealth, setBackendHealth] = useState(null);

  const t = translations[lang] || translations.en;

  useEffect(() => {
    // Check saved user session
    const currentUser = api.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    // Check backend API health
    async function checkBackend() {
      try {
        const health = await api.checkHealth();
        setBackendHealth(health);
      } catch (e) {
        console.warn('Backend not responding yet');
      }
    }
    checkBackend();
  }, []);

  const handleLogout = () => {
    api.logout();
    setUser(null);
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Landing Hero Section */}
        <Hero
          t={t}
          onExploreTools={() => scrollToSection('crop-rec')}
          onDiscoverSchemes={() => scrollToSection('schemes')}
        />

        {/* 4 Quick Access Tool Cards */}
        <QuickAccessCards
          t={t}
          onSelectTool={scrollToSection}
        />

        {/* AI Smart Crop Recommendation Engine */}
        <CropRecommendation
          t={t}
          user={user}
          onOpenAuth={() => setAuthModalOpen(true)}
        />

        {/* AI Plant Disease Detection Studio */}
        <DiseaseDetection
          t={t}
          user={user}
          onOpenAuth={() => setAuthModalOpen(true)}
        />

        {/* Real-time Weather & Agro-Advisories */}
        <WeatherAdvisory
          t={t}
        />

        {/* Government Schemes & Subsidies Directory */}
        <GovernmentSchemes
          t={t}
          user={user}
          onOpenAuth={() => setAuthModalOpen(true)}
        />

        {/* Comprehensive Indian Crop Growing Guides */}
        <CropGuides
          t={t}
        />

        {/* Sustainable Farming & Interactive Soil NPK Calculator */}
        <SustainableFarming
          t={t}
        />

        {/* Seasonal Farming Calendar (Kharif, Rabi, Zaid) */}
        <FarmingCalendar
          t={t}
        />

        {/* Searchable Knowledge Base & FAQs */}
        <KnowledgeBase
          t={t}
        />

        {/* Farmer Dashboard */}
        <FarmerDashboard
          t={t}
          user={user}
          onOpenAuth={() => setAuthModalOpen(true)}
        />

        {/* Ask Agronomist & Feedback Form */}
        <ContactSection
          t={t}
        />

      </main>

      {/* Farmer-Focused Footer */}
      <Footer
        t={t}
        onSelectTab={scrollToSection}
      />

      {/* User Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
