import React from 'react';
import { Clock, Check, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { DurationOption } from '../../types';

interface DurationCardOption {
  value: DurationOption;
  label: string;
  sublabel: string;
  description: string;
  icon: string;
  pace: string;
}

const DURATION_OPTIONS: DurationCardOption[] = [
  {
    value: '1–2 days',
    label: '1–2 days',
    sublabel: 'Quick Weekend Escape',
    description: 'Perfect for quick getaways, nearby road trips, hill retreats, or focused heritage walks.',
    icon: '⚡',
    pace: 'Fast-paced, focused itinerary',
  },
  {
    value: '3–4 days',
    label: '3–4 days',
    sublabel: 'Long Weekend Holiday',
    description: 'Ideal balance to discover major landmarks, explore local culinary trails, and relax without rushing.',
    icon: '☕',
    pace: 'Moderate, comfortable exploration',
  },
  {
    value: '5–7 days',
    label: '5–7 days',
    sublabel: 'Classic One-Week Vacation',
    description: 'Deep dive into a region: multi-stop circuits, wildlife safaris, scenic valley drives, and cultural roots.',
    icon: '🌄',
    pace: 'Immersive, thorough regional journey',
  },
  {
    value: '7+ days',
    label: '7+ days',
    sublabel: 'Grand Expedition & Slow Travel',
    description: 'Expansive multi-destination routes across high mountain passes, coastal circuits, or remote offbeat frontiers.',
    icon: '🗺️',
    pace: 'Unrushed slow travel & expeditions',
  },
];

interface DurationStepProps {
  selectedDuration: DurationOption;
  onChange: (duration: DurationOption) => void;
  onNext: () => void;
}

export default function DurationStep({
  selectedDuration,
  onChange,
  onNext,
}: DurationStepProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-blue-700" />
          <span>Step 3 · Trip Duration</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          How much time do you have?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          We&apos;ll match you with destinations that feel complete within your available time window.
        </p>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DURATION_OPTIONS.map((option) => {
          const isSelected = selectedDuration === option.value;
          return (
            <button
              key={option.value}
              type="button"
              id={`duration-opt-${option.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-4 cursor-pointer relative ${
                isSelected
                  ? 'bg-blue-500/10 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-stone-200 hover:border-blue-300 hover:bg-stone-50/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-stone-50 rounded-2xl shrink-0">
                    {option.icon}
                  </span>
                  <div>
                    <span className="text-lg font-black text-slate-900 block">
                      {option.label}
                    </span>
                    <span className="text-xs font-bold text-blue-700">
                      {option.sublabel}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 border-blue-700 text-white'
                      : 'border-stone-300 bg-stone-100'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {option.description}
              </p>

              <div className="pt-3 border-t border-stone-200/70 text-[11px] text-slate-500 font-semibold flex items-center justify-between">
                <span>Trip Pace:</span>
                <span className="text-slate-800 font-bold">{option.pace}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-semibold">
          Selected: <strong className="text-slate-900">{selectedDuration}</strong>
        </div>

        <button
          type="button"
          id="duration-step-next-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-black text-sm shadow-md shadow-orange-600/30 transition-all cursor-pointer"
        >
          <span>Continue to Travel Style</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
