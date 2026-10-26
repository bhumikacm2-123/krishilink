import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Upload, 
  Camera, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Pill, 
  Eye, 
  Bookmark, 
  FileText,
  X
} from 'lucide-react';
import { api } from '../services/api';

export default function DiseaseDetection({ t, user, onOpenAuth }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState(null);
  const [sampleLeaves, setSampleLeaves] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Fetch sample leaves on mount
  useEffect(() => {
    async function loadSamples() {
      try {
        const res = await api.getSampleLeaves();
        if (res && res.samples) {
          setSampleLeaves(res.samples);
        }
      } catch (e) {
        console.warn('Could not load sample leaves');
      }
    }
    loadSamples();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG, or WEBP).');
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDiagnosis(null);
      setError(null);
      setSavedSuccess(false);
    }
  };

  const handleSelectSample = (sample) => {
    setSelectedImage(sample.data_url);
    setPreviewUrl(sample.data_url);
    setDiagnosis(null);
    setError(null);
    setSavedSuccess(false);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please upload a leaf image or select a sample leaf first.');
      return;
    }

    setAnalyzing(true);
    setError(null);
    setSavedSuccess(false);

    try {
      let payload;
      if (typeof selectedImage === 'string') {
        // Base64 sample
        payload = { image: selectedImage };
      } else {
        // File object
        payload = new FormData();
        payload.append('image', selectedImage);
      }

      const res = await api.detectDisease(payload);
      if (!res.success) {
        setError(res.error || 'The model could not diagnose this image.');
      } else {
        setDiagnosis(res);
        if (res.saved_to_history) {
          setSavedSuccess(true);
        }
      }
    } catch (err) {
      setError('Failed to reach the plant disease diagnostic server. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setDiagnosis(null);
    setError(null);
    setSavedSuccess(false);
  };

  const getSeverityBadge = (severity) => {
    const s = (severity || '').toLowerCase();
    if (s.includes('severe') || s.includes('high')) {
      return { label: severity, color: 'bg-rose-100 text-rose-800 border-rose-300' };
    }
    if (s.includes('moderate')) {
      return { label: severity, color: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
    return { label: severity || 'Low', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  };

  return (
    <section id="disease-detection" className="py-16 bg-white border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5 text-teal-700" />
            <span>AI Foliar Health Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t.diseaseTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t.diseaseSubtitle}
          </p>
        </div>

        {/* 1-Click Sample Leaves Testing Bar */}
        {sampleLeaves.length > 0 && (
          <div className="mb-10 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>{t.orSelectSample}</span>
              <span className="text-[10px] text-teal-700 font-extrabold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                1-Click Test
              </span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {sampleLeaves.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample)}
                  className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition-all ${
                    previewUrl === sample.data_url
                      ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-600/20'
                      : 'border-slate-200 bg-white hover:border-teal-400 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={sample.data_url}
                    alt={sample.title}
                    className="w-16 h-16 rounded-lg object-cover mb-2 border border-slate-200"
                  />
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {sample.title}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    {sample.crop}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Upload & Preview Column */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 text-center">
              
              {!previewUrl ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 hover:border-emerald-600 rounded-2xl p-8 cursor-pointer transition-all bg-white hover:bg-emerald-50/50 group">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    {t.uploadLeafLabel}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {t.uploadHelpText}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Take or Choose Photo</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-300 shadow-md aspect-square bg-slate-900 max-w-sm mx-auto">
                    <img
                      src={previewUrl}
                      alt="Selected leaf specimen"
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
                      title="Clear image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
                      Leaf Specimen Selected
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <label className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer text-center">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={clearImage}
                      className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!selectedImage || analyzing}
                className="w-full mt-5 py-4 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-teal-800/20 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{t.diagnosingText}</span>
                  </>
                ) : (
                  <>
                    <Leaf className="w-5 h-5 text-teal-200" />
                    <span>{t.analyzeLeafBtn}</span>
                  </>
                )}
              </button>

            </div>

            <p className="text-xs text-slate-500 text-center px-4 font-normal">
              {t.sampleNotice}
            </p>

          </div>

          {/* Diagnosis Results Column */}
          <div className="lg:col-span-7">
            
            {error && (
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 animate-fade-in">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold">Image Verification Notice</h4>
                  <p className="text-xs sm:text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {!diagnosis && !analyzing && !error && (
              <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border-2 border-dashed border-slate-200 text-center flex flex-col items-center justify-center min-h-[420px]">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 mb-4">
                  <Leaf className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-800">
                  Foliar Diagnosis Ready
                </h4>
                <p className="mt-2 text-sm text-slate-500 max-w-md">
                  Upload a photo of an infected leaf or click one of the sample test leaves above to initiate automated machine-learning disease classification.
                </p>
              </div>
            )}

            {analyzing && (
              <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center flex flex-col items-center justify-center min-h-[420px] animate-pulse">
                <div className="w-16 h-16 rounded-full border-4 border-teal-600 border-t-transparent animate-spin mb-4" />
                <h4 className="text-lg font-bold text-slate-800">
                  {t.diagnosingText}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Extracting chromatic pigments, chlorosis indices, and necrotic lesion densities...
                </p>
              </div>
            )}

            {diagnosis && (
              <div className="bg-white rounded-3xl border border-teal-200 shadow-xl overflow-hidden animate-fade-in">
                
                {/* Header Banner */}
                <div className="p-6 bg-gradient-to-r from-teal-900 to-emerald-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-teal-300">
                      {diagnosis.crop} • {diagnosis.pathogen}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-serif mt-0.5">
                      {diagnosis.disease_name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                      Confidence: {diagnosis.confidence}%
                    </span>
                    {(() => {
                      const sev = getSeverityBadge(diagnosis.severity);
                      return (
                        <span className={`text-xs font-black px-3 py-1.5 rounded-full border ${sev.color}`}>
                          {sev.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Observable Symptoms */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2.5">
                      <Eye className="w-4 h-4 text-teal-700" />
                      <span>{t.symptomsTitle}</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {diagnosis.symptoms.map((sym, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Organic & Biological Remedies */}
                  <div className="bg-emerald-50/80 rounded-2xl p-4 sm:p-5 border border-emerald-200">
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-2">
                      <Leaf className="w-4 h-4 text-emerald-700" />
                      <span>{t.organicTitle}</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {diagnosis.organic_remedies.map((rem, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-emerald-950 font-medium">
                          • {rem}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chemical Treatment & Safe Dosage */}
                  <div className="bg-amber-50/80 rounded-2xl p-4 sm:p-5 border border-amber-200">
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-2 mb-2">
                      <Pill className="w-4 h-4 text-amber-700" />
                      <span>{t.chemicalTitle}</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {diagnosis.chemical_treatment.map((chem, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-amber-950 font-medium">
                          • {chem}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Preventive Cultural Practices */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-teal-700" />
                      <span>{t.preventiveTitle}</span>
                    </h4>
                    <ul className="space-y-1">
                      {diagnosis.preventive_measures.map((prev, idx) => (
                        <li key={idx} className="text-xs text-slate-600 font-medium">
                          - {prev}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Visual parameters: Green {Math.round(diagnosis.visual_analysis?.green_ratio * 100)}%, Lesions {Math.round(diagnosis.visual_analysis?.brown_ratio * 100)}%
                    </span>
                    {user ? (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Saved to Farmer Scan History</span>
                      </span>
                    ) : (
                      <button
                        onClick={onOpenAuth}
                        className="text-xs font-bold text-teal-800 hover:text-teal-950 underline"
                      >
                        Sign in to persist diagnosis history
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
