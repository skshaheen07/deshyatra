import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  Compass,
  ArrowRight,
  Filter,
  CheckCircle2,
  MapPin,
  Flame,
  Award,
} from 'lucide-react';
import { RecommendationResult, UserPreferences } from '../../types';
import { derivePersonalityFromInterests } from '../../data/personalities';
import PersonalityResult from './PersonalityResult';
import RecommendationResultCard from './RecommendationResultCard';

interface DiscoverResultsProps {
  results: RecommendationResult[];
  preferences: UserPreferences;
  onRetake: () => void;
  onEditStep: (stepNumber: number) => void;
}

type FilterTab = 'all' | 'top_tier' | 'budget_match' | 'duration_match';

export default function DiscoverResults({
  results,
  preferences,
  onRetake,
  onEditStep,
}: DiscoverResultsProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Trigger celebration confetti once on result render
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#d97706', '#059669', '#2563eb', '#7c3aed'],
      });
    } catch {
      // ignore
    }
  }, []);

  const personality = useMemo(() => {
    return derivePersonalityFromInterests(preferences.interests);
  }, [preferences.interests]);

  // Filtered recommendations
  const filteredResults = useMemo(() => {
    switch (activeTab) {
      case 'top_tier':
        return results.filter((r) => r.score >= 85);
      case 'budget_match':
        return results.filter(
          (r) => r.destination.budgetRange === preferences.budget || r.breakdown.budgetScore >= 18
        );
      case 'duration_match':
        return results.filter(
          (r) => r.destination.idealDuration === preferences.duration || r.breakdown.durationScore >= 12
        );
      case 'all':
      default:
        return results;
    }
  }, [results, activeTab, preferences.budget, preferences.duration]);

  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>PERSONALIZED RECOMMENDATIONS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Your India, Curated.
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Based on what you told us, these destinations are your strongest matches.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="retake-quiz-btn"
              onClick={onRetake}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs flex items-center gap-2 border border-stone-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            <Link
              to="/explore"
              id="results-explore-all-link"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore All Destinations</span>
            </Link>
          </div>
        </div>

        {/* Preferences Summary Chips */}
        <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-400">Your profile:</span>

          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>✨ {preferences.interests.slice(0, 3).join(', ')}</span>
            {preferences.interests.length > 3 && (
              <span>+{preferences.interests.length - 3}</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold border border-emerald-200 transition-colors cursor-pointer"
          >
            <span>💳 {preferences.budget}</span>
          </button>

          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold border border-blue-200 transition-colors cursor-pointer"
          >
            <span>⏱️ {preferences.duration}</span>
          </button>

          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="px-3 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold border border-purple-200 transition-colors cursor-pointer"
          >
            <span>🎒 {preferences.travelStyle}</span>
          </button>

          <button
            type="button"
            onClick={() => onEditStep(5)}
            className="px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-900 font-bold border border-orange-200 transition-colors cursor-pointer"
          >
            <span>📍 {preferences.region}</span>
          </button>
        </div>
      </div>

      {/* Travel Personality Archetype Section */}
      <PersonalityResult personality={personality} />

      {/* Recommendations Section */}
      <div className="space-y-6">
        {/* Results Title & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Award className="w-6 h-6 text-orange-600" />
              <span>Ranked Destinations</span>
              <span className="text-sm font-bold text-slate-500 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                {filteredResults.length} {filteredResults.length === 1 ? 'place' : 'places'}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Sorted by overall multi-factor algorithm match score
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-2xl border border-stone-200">
            <button
              type="button"
              id="filter-tab-all"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({results.length})
            </button>

            <button
              type="button"
              id="filter-tab-top-tier"
              onClick={() => setActiveTab('top_tier')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'top_tier'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Top Tier 85%+ ({results.filter((r) => r.score >= 85).length})
            </button>

            <button
              type="button"
              id="filter-tab-budget"
              onClick={() => setActiveTab('budget_match')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'budget_match'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Budget Fit
            </button>

            <button
              type="button"
              id="filter-tab-duration"
              onClick={() => setActiveTab('duration_match')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'duration_match'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Duration Fit
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredResults.map((result, index) => (
              <RecommendationResultCard
                key={result.destination.id}
                result={result}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200 space-y-4">
            <Compass className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-black text-slate-900">
              No destinations match this filter.
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Try switching back to &apos;All&apos; or adjust your quiz preferences to discover more places across India.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
