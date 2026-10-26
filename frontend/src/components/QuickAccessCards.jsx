import React from 'react';
import { 
  Sparkles, 
  Leaf, 
  CloudSun, 
  Landmark, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function QuickAccessCards({ t, onSelectTool }) {
  const cards = [
    {
      id: 'crop-rec',
      title: t.qaCropRecTitle,
      description: t.qaCropRecDesc,
      icon: Sparkles,
      iconBg: 'bg-emerald-100 text-emerald-800',
      badge: 'ML Engine',
      accentColor: 'border-emerald-200 hover:border-emerald-500 hover:shadow-emerald-900/10',
      features: ['N-P-K Soil Analysis', 'Water & Yield Prediction', 'Agronomic Tips']
    },
    {
      id: 'disease-detection',
      title: t.qaDiseaseTitle,
      description: t.qaDiseaseDesc,
      icon: Leaf,
      iconBg: 'bg-teal-100 text-teal-800',
      badge: 'Leaf Vision AI',
      accentColor: 'border-teal-200 hover:border-teal-500 hover:shadow-teal-900/10',
      features: ['Foliar Image Scanner', 'Organic & Bio Control', 'Chemical Spray Dosage']
    },
    {
      id: 'weather',
      title: t.qaWeatherTitle,
      description: t.qaWeatherDesc,
      icon: CloudSun,
      iconBg: 'bg-sky-100 text-sky-800',
      badge: 'Micro-Climate',
      accentColor: 'border-sky-200 hover:border-sky-500 hover:shadow-sky-900/10',
      features: ['Irrigation Advice', 'Spray Window Warning', 'Pest Outbreak Alert']
    },
    {
      id: 'schemes',
      title: t.qaSchemesTitle,
      description: t.qaSchemesDesc,
      icon: Landmark,
      iconBg: 'bg-amber-100 text-amber-800',
      badge: 'Subsidies & DBT',
      accentColor: 'border-amber-200 hover:border-amber-500 hover:shadow-amber-900/10',
      features: ['PM-KISAN ₹6,000/yr', 'Crop Insurance (PMFBY)', 'KCC Low 4% Loans']
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI & Field Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t.quickAccessTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.quickAccessSub}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onSelectTool(card.id)}
                className={`group relative bg-white rounded-3xl p-6 border-2 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 ${card.accentColor}`}
              >
                <div>
                  {/* Top row: Icon and Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconBg} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {card.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="mt-6 pt-3 flex items-center justify-between text-sm font-bold text-emerald-800 group-hover:text-emerald-900">
                  <span>Open Tool</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
