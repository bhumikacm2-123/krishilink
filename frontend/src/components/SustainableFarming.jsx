import React, { useState } from 'react';
import { 
  Leaf, 
  Droplets, 
  Calculator, 
  Sprout, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Sun,
  Flame,
  ArrowRight
} from 'lucide-react';

export default function SustainableFarming({ t }) {
  // Soil NPK Calculator State
  const [calcData, setCalcData] = useState({
    acres: 2,
    crop: 'ragi',
    currentN: 40,
    currentP: 25,
    currentK: 20
  });

  const [calcResult, setCalcResult] = useState(null);

  const cropNutrientDemands = {
    rice: { name: 'Rice / Paddy', reqN: 40, reqP: 20, reqK: 20 },
    ragi: { name: 'Ragi (Finger Millet)', reqN: 30, reqP: 18, reqK: 15 },
    maize: { name: 'Maize (Corn)', reqN: 50, reqP: 25, reqK: 20 },
    sugarcane: { name: 'Sugarcane', reqN: 90, reqP: 40, reqK: 50 },
    chilli: { name: 'Chilli', reqN: 50, reqP: 30, reqK: 30 },
    tomato: { name: 'Tomato', reqN: 55, reqP: 35, reqK: 35 }
  };

  const handleCalculateNPK = (e) => {
    e.preventDefault();
    const demand = cropNutrientDemands[calcData.crop] || cropNutrientDemands.ragi;
    const acres = parseFloat(calcData.acres) || 1;

    // Total required nutrients for the whole plot
    const targetN = demand.reqN * acres;
    const targetP = demand.reqP * acres;
    const targetK = demand.reqK * acres;

    // Deficit calculation
    const defN = Math.max(0, targetN - (calcData.currentN * 0.4 * acres));
    const defP = Math.max(0, targetP - (calcData.currentP * 0.3 * acres));
    const defK = Math.max(0, targetK - (calcData.currentK * 0.5 * acres));

    // Fertilizer conversion:
    // DAP (18-46-0): 100kg DAP provides 18kg N and 46kg P
    const dapKg = (defP / 0.46);
    const nFromDap = dapKg * 0.18;
    const remainingN = Math.max(0, defN - nFromDap);
    
    // Urea (46% N): 100kg Urea provides 46kg N
    const ureaKg = remainingN / 0.46;

    // MOP (60% K): 100kg MOP provides 60kg K
    const mopKg = defK / 0.60;

    // 50kg Bags
    const ureaBags = (ureaKg / 50).toFixed(1);
    const dapBags = (dapKg / 50).toFixed(1);
    const mopBags = (mopKg / 50).toFixed(1);

    setCalcResult({
      targetCrop: demand.name,
      acres,
      defN: defN.toFixed(1),
      defP: defP.toFixed(1),
      defK: defK.toFixed(1),
      ureaBags,
      dapBags,
      mopBags,
      ureaKg: Math.round(ureaKg),
      dapKg: Math.round(dapKg),
      mopKg: Math.round(mopKg)
    });
  };

  const practices = [
    {
      title: 'Precision Drip & Micro-Irrigation',
      icon: Droplets,
      badge: '50% Water Saving',
      description: 'Delivers water and dissolved nutrients directly to root zones via regulated emitters. Prevents evaporation and eliminates 80% weed germination in furrows.',
      tips: [
        'Operate drippers early morning to maintain root turgidity through daytime heat.',
        'Use venturi injectors for fertigation to reduce synthetic fertilizer waste by 35%.',
        'Flush screen and disc filters every week to prevent emitter salt clogging.'
      ]
    },
    {
      title: 'Jeevamrutha & Bio-Enriched Manures',
      icon: Leaf,
      badge: 'Soil Microbial Life',
      description: 'Indigenous microbial bio-stimulant formulated from local desi cow dung, cow urine, jaggery, pulse flour, and fertile boundary soil. Multiplies beneficial earthworms and mycorrhizae.',
      tips: [
        'Ferment for 48-72 hours in shade, stirring clockwise twice daily.',
        'Apply 200 Litres per acre with irrigation water twice a month.',
        'Improves soil humus, water holding capacity, and natural systemic disease immunity.'
      ]
    },
    {
      title: 'Organic Mulching & Farm Ponds (Krishi Honda)',
      icon: Layers,
      badge: 'Moisture Retention',
      description: 'Covering inter-row beds with crop residue, straw, or silver-black plastic prevents moisture vaporization, keeps soil 4°C cooler, and suppresses weeds.',
      tips: [
        'Maintain 3 to 4-inch layer of straw or dried sugarcane trash.',
        'Harvest monsoon runoff into farm ponds lined with 500-micron UV-stabilized polythene.',
        'Provides life-saving protective irrigation during crucial flowering periods.'
      ]
    },
    {
      title: 'Intercropping & Crop Rotation',
      icon: Sprout,
      badge: 'Biological Nitrogen',
      description: 'Pairing deep-rooted legumes (Red Gram, Cowpea, Green Gram) with cereal staples (Ragi, Maize) naturally enriches root nodules with atmospheric nitrogen.',
      tips: [
        'Practice 8:2 row ratio of Ragi and Red Gram in Karnataka drylands.',
        'Breaks pest lifecycle, reducing reliance on chemical pesticides.',
        'Ensures risk hedging: if one crop faces weather stress, the legume provides assured income.'
      ]
    }
  ];

  return (
    <section id="practices" className="py-16 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>Regenerative Agriculture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t.practicesTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.practicesSubtitle}
          </p>
        </div>

        {/* 4 Core Sustainable Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {practices.map((prac, i) => {
            const Icon = prac.icon;
            return (
              <div
                key={i}
                className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-emerald-500 transition-all shadow-xs hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-700 text-white shadow-2xs">
                    {prac.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {prac.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                  {prac.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Practical Farmer Guidelines:
                  </span>
                  {prac.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive NPK Fertilizer Requirement Calculator */}
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2 border border-white/10">
              <Calculator className="w-3.5 h-3.5" />
              <span>Agronomic Fertilizer Tool</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-serif">
              {t.calculatorTitle}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100 font-normal">
              Enter your plot size and soil test NPK values to calculate the exact recommended number of Urea, DAP, and Potash bags required.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
            
            {/* Input Form */}
            <form onSubmit={handleCalculateNPK} className="lg:col-span-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    Plot Size (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="100"
                    value={calcData.acres}
                    onChange={(e) => setCalcData({ ...calcData, acres: e.target.value })}
                    className="w-full bg-white text-slate-900 font-bold px-3 py-2 rounded-xl text-sm focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-200 mb-1">
                    Target Crop
                  </label>
                  <select
                    value={calcData.crop}
                    onChange={(e) => setCalcData({ ...calcData, crop: e.target.value })}
                    className="w-full bg-white text-slate-900 font-bold px-3 py-2 rounded-xl text-sm focus:outline-hidden"
                  >
                    {Object.entries(cropNutrientDemands).map(([k, v]) => (
                      <option key={k} value={k}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-emerald-200 mb-1">
                  Soil Test Available NPK (kg/acre)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-emerald-300">Available N</label>
                    <input
                      type="number"
                      value={calcData.currentN}
                      onChange={(e) => setCalcData({ ...calcData, currentN: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white text-slate-900 font-bold px-2 py-1.5 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-300">Available P</label>
                    <input
                      type="number"
                      value={calcData.currentP}
                      onChange={(e) => setCalcData({ ...calcData, currentP: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white text-slate-900 font-bold px-2 py-1.5 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-300">Available K</label>
                    <input
                      type="number"
                      value={calcData.currentK}
                      onChange={(e) => setCalcData({ ...calcData, currentK: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white text-slate-900 font-bold px-2 py-1.5 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Fertilizer Quantity</span>
              </button>

            </form>

            {/* Results Output Card */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 text-slate-800 border border-emerald-200 shadow-lg">
              {calcResult ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                        Fertilizer Prescription
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        For {calcResult.acres} Acres of {calcResult.targetCrop}
                      </h4>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-extrabold px-2.5 py-1 rounded-full">
                      50kg Bags
                    </span>
                  </div>

                  {/* 3 Bags Recommendation */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <span className="text-xs font-bold text-emerald-900 block">Urea (46% N)</span>
                      <p className="text-2xl font-black text-emerald-900 font-mono mt-1">
                        {calcResult.ureaBags}
                      </p>
                      <span className="text-[10px] text-slate-500">Bags (~{calcResult.ureaKg} kg)</span>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                      <span className="text-xs font-bold text-amber-900 block">DAP (18-46-0)</span>
                      <p className="text-2xl font-black text-amber-900 font-mono mt-1">
                        {calcResult.dapBags}
                      </p>
                      <span className="text-[10px] text-slate-500">Bags (~{calcResult.dapKg} kg)</span>
                    </div>

                    <div className="bg-sky-50 p-3 rounded-xl border border-sky-200">
                      <span className="text-xs font-bold text-sky-900 block">MOP (60% K)</span>
                      <p className="text-2xl font-black text-sky-900 font-mono mt-1">
                        {calcResult.mopBags}
                      </p>
                      <span className="text-[10px] text-slate-500">Bags (~{calcResult.mopKg} kg)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-normal">
                    💡 <strong>Application Advice:</strong> Apply full quantity of DAP and half of MOP at sowing/planting as basal application. Apply Urea in two split doses during tillering/vegetative growth and pre-flowering stages.
                  </p>
                </div>
              ) : (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <Calculator className="w-12 h-12 text-slate-300 mb-2" />
                  <p className="text-sm font-bold text-slate-700">Prescription Awaiting Parameters</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Click "Calculate Fertilizer Quantity" on the left to generate the recommended bag breakdown.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
