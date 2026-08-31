import React from 'react';
import { Sparkles, Clock, Compass, ArrowRight, ShieldCheck, CheckCircle2, History } from 'lucide-react';
import { UserPreferences } from '../../types';

interface DiscoverIntroProps {
  onStart: () => void;
  savedPreferences: UserPreferences | null;
  onViewSavedResults: () => void;
}

export default function DiscoverIntro({
  onStart,
  savedPreferences,
  onViewSavedResults,
}: DiscoverIntroProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Editorial Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-stone-200 shadow-xl shadow-stone-900/5 text-center space-y-8 relative overflow-hidden">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Eyebrow */}
        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>PERSONALIZED INDIA</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Let&apos;s Find Your Kind of India.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Tell us what you love, how you travel, and how much time you have. We&apos;ll match you with destinations that fit your exact travel rhythm.
          </p>
        </div>

        {/* Feature Highlights Ribbon */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 max-w-2xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-orange-100 text-orange-700 shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Takes 2 Minutes</span>
              <span className="text-[11px] text-slate-500">5 simple, visual questions</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Transparent Scoring</span>
              <span className="text-[11px] text-slate-500">5 weighted travel factors</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700 shrink-0 mt-0.5">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Discover Personality</span>
              <span className="text-[11px] text-slate-500">Find your traveler archetype</span>
            </div>
          </div>
        </div>

        {/* Primary Action Controls */}
        <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            id="start-discover-quiz-btn"
            onClick={onStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-black text-base shadow-xl shadow-orange-600/30 transition-all cursor-pointer"
          >
            <span>Start Discovering</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {savedPreferences && (
            <button
              type="button"
              id="view-saved-results-btn"
              onClick={onViewSavedResults}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-sm border border-stone-200 transition-all cursor-pointer"
            >
              <History className="w-4 h-4 text-orange-600" />
              <span>View Saved Results</span>
            </button>
          )}
        </div>

        {savedPreferences && (
          <p className="text-xs text-slate-400 font-medium">
            Previous preferences saved: {savedPreferences.interests.slice(0, 2).join(', ')} · {savedPreferences.budget} · {savedPreferences.duration}
          </p>
        )}
      </div>
    </div>
  );
}
