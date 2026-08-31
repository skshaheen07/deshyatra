import React from 'react';
import { Calendar, Users, Zap, RefreshCw, Sparkles } from 'lucide-react';
import { TravelStyle } from '../../types';
import { TripPace } from '../../utils/plannerGenerator';

interface TripSettingsProps {
  durationDays: number;
  onDurationChange: (days: number) => void;
  travelStyle: TravelStyle;
  onTravelStyleChange: (style: TravelStyle) => void;
  pace: TripPace;
  onPaceChange: (pace: TripPace) => void;
  onRegenerateItinerary: () => void;
  hasPersonalizedRecommendation?: boolean;
}

const TRAVEL_STYLES: TravelStyle[] = [
  'Relaxed',
  'Couple',
  'Solo',
  'Family',
  'Friends',
  'Adventure',
  'Luxury',
  'Budget',
];

const PACES: { pace: TripPace; label: string; desc: string }[] = [
  { pace: 'Relaxed', label: 'Relaxed', desc: '1–2 items/day · Unhurried' },
  { pace: 'Balanced', label: 'Balanced', desc: '2–3 items/day · Optimal' },
  { pace: 'Packed', label: 'Packed', desc: '3–4 items/day · High-energy' },
];

export default function TripSettings({
  durationDays,
  onDurationChange,
  travelStyle,
  onTravelStyleChange,
  pace,
  onPaceChange,
  onRegenerateItinerary,
  hasPersonalizedRecommendation,
}: TripSettingsProps) {
  return (
    <div
      id="trip-settings-panel"
      className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Trip Configuration</h3>
            <p className="text-xs text-slate-500">Fine-tune duration, style, and pacing</p>
          </div>
        </div>

        {hasPersonalizedRecommendation && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Personalized Match</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Duration Days */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
              Duration
            </span>
            <span className="text-orange-600 font-extrabold">{durationDays} {durationDays === 1 ? 'Day' : 'Days'}</span>
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                type="button"
                id={`duration-btn-${num}`}
                onClick={() => onDurationChange(num)}
                className={`flex-1 min-w-[38px] py-2 rounded-xl text-xs font-black transition-all ${
                  durationDays === num
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                }`}
              >
                {num}D
              </button>
            ))}
          </div>
        </div>

        {/* 2. Travel Style */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-orange-600" />
              Travel Style
            </span>
            <span className="text-slate-700 font-bold">{travelStyle}</span>
          </label>
          <select
            id="travel-style-select"
            value={travelStyle}
            onChange={(e) => onTravelStyleChange(e.target.value as TravelStyle)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
          >
            {TRAVEL_STYLES.map((style) => (
              <option key={style} value={style}>
                {style} Explorer
              </option>
            ))}
          </select>
        </div>

        {/* 3. Pace Selection */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-600" />
              Daily Pacing
            </span>
            <span className="text-slate-700 font-bold">{pace}</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {PACES.map((item) => (
              <button
                key={item.pace}
                type="button"
                id={`pace-btn-${item.pace.toLowerCase()}`}
                onClick={() => onPaceChange(item.pace)}
                title={item.desc}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                  pace === item.pace
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-generate helper note and action */}
      <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <p className="text-slate-500 text-center sm:text-left">
          Pacing automatically optimizes suggested activities for each time slot without overcrowding.
        </p>

        <button
          type="button"
          id="regenerate-itinerary-btn"
          onClick={onRegenerateItinerary}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 active:scale-95 text-slate-700 font-bold text-xs transition-all shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
          <span>Reset to Starter Plan</span>
        </button>
      </div>
    </div>
  );
}
