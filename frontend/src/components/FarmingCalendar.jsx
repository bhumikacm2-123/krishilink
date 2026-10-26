import React, { useState } from 'react';
import { 
  Calendar, 
  Sun, 
  CloudRain, 
  Snowflake, 
  Sprout, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function FarmingCalendar({ t }) {
  const [activeSeason, setActiveSeason] = useState('kharif');

  const seasons = {
    kharif: {
      name: 'Kharif Season (Monsoon / ಮುಂಗಾರು)',
      months: 'June to October',
      climate: 'Southwest Monsoon (High Rainfall & Warm Humidity)',
      crops: ['Rice (Paddy)', 'Ragi (Finger Millet)', 'Maize', 'Cotton', 'Pigeonpea (Tur)', 'Soybean', 'Groundnut'],
      schedule: [
        { month: 'May - June', stage: 'Summer Ploughing & Land Prep', details: 'Deep summer ploughing to expose hibernating pupae and weed seeds to sun. Incorporate farmyard manure (FYM) or green manure (Dhaincha).' },
        { month: 'June - July', stage: 'Seed Treatment & Sowing', details: 'Treat seeds with Trichoderma (5g/kg) and Rhizobium. Sow with the onset of regular monsoon rains at recommended row spacing.' },
        { month: 'July - August', stage: 'Weeding & Basal Fertigation', details: 'First mechanical inter-cultivation or manual weeding at 20-25 days. Apply first split dose of nitrogenous fertilizer.' },
        { month: 'August - Sept', stage: 'Flowering & Pest Monitoring', details: 'Critical moisture and nutrition phase. Install pheromone traps for borers; inspect foliage for leaf blast or blight.' },
        { month: 'Oct - November', stage: 'Harvesting & Threshing', details: 'Harvest when 85% of panicles or pods turn golden-yellow. Dry grains to 12% moisture before storage.' }
      ]
    },
    rabi: {
      name: 'Rabi Season (Winter / ಹಿಂಗಾರು)',
      months: 'October to March',
      climate: 'Retreating Monsoon / Cool Dry Winter',
      crops: ['Wheat', 'Chickpea (Bengal Gram)', 'Mustard', 'Rabi Jowar', 'Sunflower', 'Potato', 'Lentil'],
      schedule: [
        { month: 'September - Oct', stage: 'Seedbed Preparation', details: 'Conserve residual monsoon soil moisture. Fine tilth preparation for small-seeded crops like mustard and chickpea.' },
        { month: 'Oct - November', stage: 'Optimal Sowing Window', details: 'Sow wheat between Nov 1-20 for peak tillering. Inoculate chickpea seeds with Rhizobium culture.' },
        { month: 'December', stage: 'Crown Root Irrigation (Wheat)', details: 'First irrigation at 21 days after sowing (CRI stage) is mandatory for wheat root anchoring and tiller proliferation.' },
        { month: 'January - Feb', stage: 'Pod / Head Filling & Frost Care', details: 'Provide light protective irrigation if cold wave or frost warning is issued. Check chickpea for Helicoverpa pod borer.' },
        { month: 'March - April', stage: 'Harvesting & Storage', details: 'Harvest during dry sunny days. Store pulses with 2% neem oil coating to prevent bruchid beetle infestation.' }
      ]
    },
    zaid: {
      name: 'Zaid Season (Summer / ಬೇಸಿಗೆ)',
      months: 'March to June',
      climate: 'Dry Warm Sunny Days with Irrigation',
      crops: ['Watermelon', 'Muskmelon', 'Cucumber', 'Green Gram (Moong)', 'Fodder Sorghum', 'Cowpea'],
      schedule: [
        { month: 'February - March', stage: 'Nursery & Drip Setup', details: 'Lay drip laterals and silver-black mulch films. Direct seed cucurbits or transplant pro-tray seedlings.' },
        { month: 'March - April', stage: 'Vine Training & Irrigation', details: 'Frequent light drip irrigations early morning. Encourage honeybee activity or install bee boxes for thorough fruit setting.' },
        { month: 'April - May', stage: 'Fruit Sizing & Micro-nutrients', details: 'Foliar spray of water-soluble 00:52:34 and boron to enhance fruit sweetness and prevent cracking.' },
        { month: 'May - June', stage: 'Summer Harvesting', details: 'Harvest melons with intact stalks early morning before midday heat. Fetch high summer market price realization.' }
      ]
    }
  };

  const curr = seasons[activeSeason];

  return (
    <section id="calendar" className="py-16 bg-slate-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>Agro-Climatic Timelines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t.calendarTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.calendarSubtitle}
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-10">
          <button
            onClick={() => setActiveSeason('kharif')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSeason === 'kharif'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            <CloudRain className="w-4 h-4 text-emerald-300" />
            <span>Kharif (Monsoon)</span>
          </button>

          <button
            onClick={() => setActiveSeason('rabi')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSeason === 'rabi'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            <Snowflake className="w-4 h-4 text-sky-300" />
            <span>Rabi (Winter)</span>
          </button>

          <button
            onClick={() => setActiveSeason('zaid')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeSeason === 'zaid'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-300" />
            <span>Zaid (Summer)</span>
          </button>
        </div>

        {/* Season Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm animate-fade-in">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                {curr.months}
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-serif mt-1">
                {curr.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {curr.climate}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Dominant Season Crops:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {curr.crops.map((c, i) => (
                  <span key={i} className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-lg border border-emerald-100">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Month-by-Month Stepper */}
          <div className="mt-8 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-4">
              Agronomic Stage Timeline:
            </h4>
            
            <div className="space-y-4">
              {curr.schedule.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors"
                >
                  <div className="w-32 shrink-0">
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full block text-center">
                      {item.month}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Sprout className="w-4 h-4 text-emerald-600" />
                      <span>{item.stage}</span>
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
