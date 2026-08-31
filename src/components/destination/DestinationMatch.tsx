import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';
import { Destination, UserPreferences, RecommendationResult } from '../../types';
import { getSavedUserPreferences } from '../../utils/storage';
import { calculateDestinationScore } from '../../utils/recommendation';

interface DestinationMatchProps {
  destination: Destination;
}

export default function DestinationMatch({ destination }: DestinationMatchProps) {
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(() => getSavedUserPreferences());
  const [matchResult, setMatchResult] = useState<RecommendationResult | null>(null);

  useEffect(() => {
    const prefs = getSavedUserPreferences();
    setUserPrefs(prefs);
    if (prefs) {
      const result = calculateDestinationScore(destination, prefs);
      setMatchResult(result);
    } else {
      setMatchResult(null);
    }
  }, [destination]);

  return (
    <section
      id="match"
      className="scroll-mt-28 py-10 sm:py-14 border-b border-stone-200"
    >
      <div id="personalized-match-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>5-Factor Personalization</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Your DeshYatra Match
            </h2>
          </div>

          <Link
            to="/discover"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 shrink-0"
          >
            <span>{userPrefs ? 'Recalibrate Preferences' : 'Take 2-Min Discovery Quiz'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {userPrefs && matchResult ? (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
            {/* Top Score Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex flex-col items-center justify-center text-slate-950 font-black shadow-lg shrink-0">
                  <span className="text-2xl sm:text-3xl tracking-tight">{matchResult.score}%</span>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold -mt-1">Match</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Highly Compatible Choice
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                      Calculated Locally
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                    Evaluated against your preferences across {userPrefs.interests.join(', ')}, budget ({userPrefs.budget}), and duration ({userPrefs.duration}).
                  </p>
                </div>
              </div>

              <Link
                to={`/planner?destination=${destination.id}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all shrink-0"
              >
                <span>Add {destination.name} to Trip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Grid of Reasons and Factor Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 cols: Specific Reasons */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                  Why {destination.name} Matches You
                </span>
                <div className="space-y-2.5">
                  {matchResult.reasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 text-xs sm:text-sm text-stone-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 cols: 5-Factor Score Breakdown */}
              <div className="lg:col-span-5 bg-slate-950/60 rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-stone-300">Factor Breakdown</span>
                  <span className="text-[11px] text-stone-400">Weight</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span>Interests Overlap</span>
                      <span className="font-bold text-amber-300">{matchResult.breakdown.interestScore}/35</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${(matchResult.breakdown.interestScore / 35) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span>Budget Tier</span>
                      <span className="font-bold text-amber-300">{matchResult.breakdown.budgetScore}/20</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${(matchResult.breakdown.budgetScore / 20) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span>Stay Duration</span>
                      <span className="font-bold text-amber-300">{matchResult.breakdown.durationScore}/15</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${(matchResult.breakdown.durationScore / 15) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span>Travel Style</span>
                      <span className="font-bold text-amber-300">{matchResult.breakdown.styleScore}/15</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${(matchResult.breakdown.styleScore / 15) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-stone-300 mb-1">
                      <span>Region Synergy</span>
                      <span className="font-bold text-amber-300">{matchResult.breakdown.regionScore}/15</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${(matchResult.breakdown.regionScore / 15) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* No Saved Preferences Prompt */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="text-xs font-black uppercase tracking-wider text-orange-600 block">
                Personalized Assessment Available
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Want to know if {destination.name} fits your travel style?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Take our 2-minute discovery assessment to see exact compatibility percentages, cost feasibility, and personalized match reasons for {destination.name}.
              </p>
            </div>

            <Link
              to="/discover"
              id="destination-launch-quiz-cta"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md transition-all shrink-0 hover:scale-102"
            >
              <Sparkles className="w-4 h-4" />
              <span>Discover My Trip</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
