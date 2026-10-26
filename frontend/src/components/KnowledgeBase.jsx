import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  ShieldCheck, 
  Sprout, 
  Landmark 
} from 'lucide-react';

export default function KnowledgeBase({ t }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: 'Government Schemes & Subsidies',
      question: 'How do I complete mandatory e-KYC for PM-KISAN ₹6,000 yearly benefit?',
      answer: 'Farmers can complete PM-KISAN e-KYC through two simple methods: 1) Online OTP method: Visit pmkisan.gov.in, click on "e-KYC", enter your 12-digit Aadhaar number, and verify the OTP sent to your Aadhaar-linked mobile. 2) Biometric method: Visit your nearest Common Service Center (CSC) or Grama One Center with your Aadhaar card for fingerprint authentication.'
    },
    {
      category: 'Irrigation & Subsidies',
      question: 'How can I get up to 90% subsidy on Drip and Sprinkler irrigation?',
      answer: 'Under the Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) and state horticulture schemes (e.g., Raitha Siri in Karnataka), small and marginal farmers with verified land records (RTC) and an active borewell or well water source can apply through their local Raitha Samparka Kendra (RSK) or state horticulture portal. Subsidy covers 55% to 90% of equipment costs including mainlines, filters, drippers, and venturi units.'
    },
    {
      category: 'Soil Fertility & Health',
      question: 'What is the correct method for collecting a soil sample for testing?',
      answer: 'Collect soil samples from 8 to 10 random spots in a zig-zag pattern across your field. Scrape off surface weeds, dig a "V" shaped pit up to 15 cm depth (plough layer), and collect a 1-inch slice from top to bottom. Mix all sub-samples thoroughly in a clean bucket. By quartering method, reduce the sample to 500 grams, dry in shade, pack in a cloth bag with land survey details, and submit to your local KVK or Agriculture Department.'
    },
    {
      category: 'Organic Farming',
      question: 'What is the exact recipe for preparing Jeevamrutha bio-fertilizer?',
      answer: 'For 1 Acre: Take a 200-Litre plastic barrel and add 10 kg fresh desi cow dung, 10 Litres cow urine, 2 kg jaggery or sugarcane juice, 2 kg pulse flour (besan/gram flour), and a handful of fertile virgin soil from a bund or banyan tree root. Fill with water and mix well with a wooden pole. Keep in shade covered with a wet gunny bag. Stir clockwise 2-3 times daily for 48-72 hours. Apply with irrigation water or filter and spray at 10% dilution.'
    },
    {
      category: 'Crop Protection',
      question: 'How to prevent Koleroga (Fruit Rot) disease in Arecanut gardens?',
      answer: 'Spray Bordeaux mixture (1%) thoroughly covering all arecanut bunches before the onset of monsoon rains (May-June). A second spray should be given 40 days later during a break in monsoon rains. Ensure adequate drainage channels in the garden to avoid water stagnation. For severe infections, Metalaxyl-Mancozeb (2g/L) can be sprayed with agricultural sticker.'
    },
    {
      category: 'Low-Interest Credit',
      question: 'Who is eligible for a Kisan Credit Card (KCC) at 4% interest rate?',
      answer: 'All individual farmers, tenant farmers, sharecroppers, and members of Self-Help Groups (SHGs) are eligible. Submit a 1-page application along with Aadhaar, land RTC, and crop details to your primary agricultural credit society or commercial bank. Farmers get loans up to ₹1.60 Lakh without any collateral and up to ₹3.00 Lakh with prompt repayment subsidy bringing effective interest down to just 4%.'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-white border-b border-emerald-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Searchable Agronomy Knowledge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Farmer Knowledge Base & FAQs
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            Quick, practical answers to common questions about subsidies, soil testing, pest management, and low-cost natural farming.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. PM-KISAN, drip subsidy, Jeevamrutha, KCC)..."
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-12 pr-4 py-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-800 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block mb-1">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="p-1 rounded-full bg-white border border-slate-200 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-700" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white font-normal animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
