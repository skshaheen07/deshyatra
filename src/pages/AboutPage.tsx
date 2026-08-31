import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Code2,
  MapPin,
  Calendar,
  Layers,
  Heart,
  ArrowRight,
  Calculator,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50/50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-black tracking-widest uppercase">
            <Compass className="w-4 h-4 text-orange-600" />
            <span>ABOUT THE PLATFORM</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            DeshYatra — Discover India Your Way
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A frontend-first personalized Indian tourism discovery and smart trip-planning platform
            crafted for modern travelers exploring India's vast cultural, geographic, and sensory heritage.
          </p>
        </div>

        {/* 1. Core Philosophy & Value */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-orange-600" />
            <span>Why DeshYatra Exists</span>
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            India is unimaginably diverse: from the high-altitude desert monasteries of Ladakh and
            the pine valleys of Himachal, to the living root bridges of Meghalaya, the golden dunes
            of Jaisalmer, the backwaters of Kerala, and the coral lagoons of the Andaman Islands.
          </p>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Instead of presenting static, generic tourism listicles, <strong>DeshYatra</strong> powers
            personalized, transparent discovery. Travelers articulate their specific interests,
            budget tier, available duration, travel companion style, and regional preferences.
            Our scoring engine calculates authentic compatibility scores with explicit, step-by-step
            match reasons.
          </p>
        </div>

        {/* 2. Core Novelty: Transparent Five-Factor Matching Engine */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <Calculator className="w-6 h-6 text-amber-600" />
              <span>The Five-Factor Recommendation Model</span>
            </h2>
            <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full w-fit">
              Deterministic & Transparent
            </span>
          </div>

          <p className="text-slate-600 text-sm">
            Every destination recommendation in DeshYatra is derived from a transparent mathematical
            model that scores compatibility across five weighted dimensions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col justify-between space-y-2">
              <div className="text-2xl font-black text-amber-700">35%</div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Interests Alignment</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Evaluates overlap with mountains, beaches, heritage, wildlife, cuisine, spirituality, and culture.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 flex flex-col justify-between space-y-2">
              <div className="text-2xl font-black text-orange-700">20%</div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Budget Compatibility</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Assesses alignment across budget tiers from under ₹5,000 to luxury ₹20,000+ per trip.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col justify-between space-y-2">
              <div className="text-2xl font-black text-emerald-700">15%</div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Duration Feasibility</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Validates itinerary pacing for 1–2 days, 3–4 days, 5–7 days, or 7+ days.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex flex-col justify-between space-y-2">
              <div className="text-2xl font-black text-rose-700">15%</div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Travel Style Synergy</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Tailored for Solo, Couple, Family, Friends, Adventure, Relaxed, or Luxury travelers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex flex-col justify-between space-y-2">
              <div className="text-2xl font-black text-indigo-700">15%</div>
              <div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">Regional Geography</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  North, South, East, West, Central, Northeast, or flexible Pan-India exploration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Product Capabilities Suite */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-orange-600" />
            <span>Product Capabilities</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Discover Quiz</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step interactive questionnaire matching travel personas with personality breakdown.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Explore Hub</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filterable directory with multi-tag query params, interactive map markers, and personalized scoring.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Destinations & States</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rich guides with cultural insights, must-try food, seasonal weather, attractions, and photo galleries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Experiences Archetypes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thematic deep-dives across mountains, beaches, royal heritage, wildlife, spiritual ghats, and food.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Smart Day-by-Day Planner</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customizable itinerary builder with activity reordering, budget calculator, custom items, and notes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Favorites & Saved Trips</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full client-side persistence for bookmarked destinations and saved custom itineraries.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Technical Architecture */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Code2 className="w-6 h-6 text-orange-600" />
            <span>Technical Architecture</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700">
                Frontend Stack
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Built with <strong>React 18</strong>, <strong>TypeScript</strong>, <strong>Vite</strong>, and <strong>Tailwind CSS</strong> for performant, responsive UI rendering and strict type safety.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700">
                Routing & Navigation
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Powered by <strong>React Router</strong> with synchronized URL query parameters, state transitions, and accessible navigation hooks.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700">
                Client-Side Engine
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Pure deterministic recommendation math running 100% in browser memory with zero network latency or external tracking.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-700">
                Local Persistence
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Defensive <strong>LocalStorage</strong> abstraction with cross-component event broadcasting for instantaneous synchronization.
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero server dependencies required for core functionality — instant, fast, and privacy-respecting.</span>
          </div>
        </div>

        {/* Action CTA */}
        <div className="text-center pt-4">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm tracking-wide shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Your Personalized Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
