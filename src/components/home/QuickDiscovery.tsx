import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Sliders,
  ArrowRight,
  Check,
  CheckCircle2,
  Compass,
  Star,
  MapPin,
  Clock,
  Wallet,
} from 'lucide-react';
import { destinations } from '../../data';
import {
  BudgetTier,
  DurationOption,
  InterestType,
  TravelStyle,
  UserPreferences,
} from '../../types';
import { getRecommendations } from '../../utils/recommendation';
import DestinationCard from '../common/DestinationCard';

const QUICK_INTERESTS: { label: string; icon: string; value: InterestType }[] = [
  { label: 'Mountains & Tea', icon: '🏔️', value: 'Mountains' },
  { label: 'Heritage Forts', icon: '🏰', value: 'Heritage' },
  { label: 'Beaches & Ocean', icon: '🏖️', value: 'Beaches' },
  { label: 'Spiritual Ghats', icon: '🪔', value: 'Spiritual' },
  { label: 'Wildlife Safaris', icon: '🐅', value: 'Wildlife' },
  { label: 'High Adventure', icon: '⚡', value: 'Adventure' },
  { label: 'Culinary Trails', icon: '🍲', value: 'Food' },
  { label: 'Wellness & Yoga', icon: '🧘', value: 'Wellness' },
  { label: 'Offbeat Hamlets', icon: '🧭', value: 'Rural & Offbeat' },
];

const BUDGET_OPTIONS: BudgetTier[] = [
  'Under ₹5,000',
  '₹5,000–₹10,000',
  '₹10,000–₹20,000',
  '₹20,000+',
];

const DURATION_OPTIONS: DurationOption[] = [
  '1–2 days',
  '3–4 days',
  '5–7 days',
  '7+ days',
];

export default function QuickDiscovery() {
  const [selectedInterests, setSelectedInterests] = useState<InterestType[]>([
    'Mountains',
    'Nature',
  ]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier>('₹5,000–₹10,000');
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('3–4 days');
  const [selectedStyle, setSelectedStyle] = useState<TravelStyle>('Relaxed');

  const toggleInterest = (interest: InterestType) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((i) => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const userPrefs: UserPreferences = useMemo(
    () => ({
      interests: selectedInterests,
      budget: selectedBudget,
      duration: selectedDuration,
      travelStyle: selectedStyle,
      region: 'Anywhere in India',
    }),
    [selectedInterests, selectedBudget, selectedDuration, selectedStyle]
  );

  const recommendations = useMemo(() => {
    return getRecommendations(destinations, userPrefs).slice(0, 3);
  }, [userPrefs]);

  return (
    <section id="quick-discovery-section" className="py-16 sm:py-24 bg-stone-100/70 border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Sliders className="w-3.5 h-3.5 text-amber-700" />
              Live Interactive Match Preview
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Test Your Travel Match in Real-Time
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Toggle your preferred themes and budget below. Watch how the transparent 5-factor scoring engine instantly recalculates compatibility across India.
            </p>
          </div>

          <Link
            to="/discover"
            id="quick-discovery-full-engine-link"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-stone-300 hover:border-orange-500 text-slate-900 font-bold text-sm shadow-sm hover:shadow transition-all group shrink-0"
          >
            <span>Open Full Discovery Engine</span>
            <ArrowRight className="w-4 h-4 text-orange-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Interactive Controls Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200/80 mb-10 space-y-6">
          {/* 1. Interest Chips */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                1. Select Interests ({selectedInterests.length} selected)
              </span>
              <span className="text-xs text-slate-400">Click to add/remove</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {QUICK_INTERESTS.map((item) => {
                const isSelected = selectedInterests.includes(item.value);
                return (
                  <button
                    key={item.value}
                    type="button"
                    id={`quick-interest-pill-${item.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => toggleInterest(item.value)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-2 ring-slate-900'
                        : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Budget & Duration Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-stone-100">
            {/* Budget */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                2. Target Budget
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BUDGET_OPTIONS.map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setSelectedBudget(budget)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-center transition-all ${
                      selectedBudget === budget
                        ? 'bg-orange-600 text-white shadow-sm ring-1 ring-orange-600'
                        : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border border-stone-200'
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                3. Trip Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DURATION_OPTIONS.map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setSelectedDuration(dur)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-center transition-all ${
                      selectedDuration === dur
                        ? 'bg-orange-600 text-white shadow-sm ring-1 ring-orange-600'
                        : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border border-stone-200'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                4. Travel Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Relaxed', 'Adventure', 'Couple', 'Solo'] as TravelStyle[]).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setSelectedStyle(style)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-center transition-all ${
                      selectedStyle === style
                        ? 'bg-orange-600 text-white shadow-sm ring-1 ring-orange-600'
                        : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border border-stone-200'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Top Matches Output */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-bold text-slate-900">
                Top Calculated Matches for Your Selection
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Deterministic 5-Factor Ranking
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <DestinationCard
                key={rec.destination.id}
                destination={rec.destination}
                matchScore={rec.score}
                matchReasons={rec.reasons}
                featuredBadge={rec.destination.featured ? 'Featured Gem' : undefined}
              />
            ))}
          </div>

          {/* Prompt to take complete assessment */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                Want deep personalized itinerary & travel personality insights?
              </h4>
              <p className="text-xs sm:text-sm text-stone-300">
                Our full discovery tool computes custom day-by-day itineraries and matches your exact travel persona.
              </p>
            </div>
            <Link
              to="/discover"
              id="quick-discovery-bottom-cta"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm whitespace-nowrap shadow-md transition-all active:scale-95 shrink-0"
            >
              Start Personalized Discovery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
