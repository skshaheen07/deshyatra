import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  BarChart3,
  SlidersHorizontal,
} from 'lucide-react';

export default function PersonalizedDiscovery() {
  const factors = [
    {
      percentage: '35%',
      title: 'Interest Alignment',
      description: 'Measures multi-theme overlap across Mountains, Heritage, Beaches, Spiritual, Wildlife, and Food.',
      icon: '🏔️',
    },
    {
      percentage: '20%',
      title: 'Budget Compatibility',
      description: 'Calculates real daily expenses including stays, food, and permits against your budget ceiling.',
      icon: '💳',
    },
    {
      percentage: '15%',
      title: 'Trip Duration Feasibility',
      description: 'Ensures recommended itineraries fit comfortably into 1-2, 3-4, 5-7, or 7+ day windows.',
      icon: '⏱️',
    },
    {
      percentage: '15%',
      title: 'Travel Style Synergy',
      description: 'Calibrates for Solo explorers, Couples, Family vacations, Friends trips, and Adventure seekers.',
      icon: '🎒',
    },
    {
      percentage: '15%',
      title: 'Regional Geography',
      description: 'Accommodates specific North, South, West, East, Central, or Northeast travel preferences.',
      icon: '📍',
    },
  ];

  return (
    <section id="how-it-works-section" className="py-16 sm:py-24 bg-stone-100/80 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Transparent 5-Factor Personalization
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How DeshYatra Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            No black-box hallucinations or sponsored bias. DeshYatra runs a deterministic client-side recommendation engine that evaluates verified travel data against your exact criteria.
          </p>
        </div>

        {/* 5-Factor Weight Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
          {factors.map((factor, idx) => (
            <div
              key={factor.title}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between space-y-3 hover:border-amber-400 transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{factor.icon}</span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 font-extrabold text-xs">
                    {factor.percentage}
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-900 leading-snug">
                  {factor.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison / Architecture Callout */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-orange-600 block">
                Why Transparent Rule-Based Scoring Matters
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Accurate Indian Tourism Without the Fluff
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Standard travel portals push sponsored hotels or arbitrary top-10 listicles. DeshYatra computes real suitability scores in your browser, generating honest explanations for why a destination matches your constraints.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Works 100% locally with zero latency or tracking</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Real per-day costs and ideal stay durations</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>State & cultural etiquette insights included</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Exportable, customizable day-by-day itineraries</span>
                </div>
              </div>
            </div>

            {/* Right: Mock Score Visualizer Card */}
            <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 text-white space-y-4 shadow-xl border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Live Score Inspector
                  </span>
                </div>
                <span className="text-xs font-extrabold text-emerald-400">96% Match</span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Interests (Nature + Mountains)</span>
                    <span className="font-bold text-amber-300">35 / 35</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Budget Tier (₹5,000–₹10,000)</span>
                    <span className="font-bold text-amber-300">20 / 20</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Duration Feasibility (3–4 days)</span>
                    <span className="font-bold text-amber-300">15 / 15</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Travel Style (Relaxed)</span>
                    <span className="font-bold text-amber-300">15 / 15</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Region Target (South India)</span>
                    <span className="font-bold text-amber-300">11 / 15</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '73%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/discover"
                  className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Run Recommendation Engine</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
