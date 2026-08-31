import React from 'react';
import { Users, Check, ArrowRight, Sparkles } from 'lucide-react';
import { TravelStyle } from '../../types';

interface StyleCardOption {
  value: TravelStyle;
  label: string;
  sublabel: string;
  icon: string;
  description: string;
}

const STYLE_OPTIONS: StyleCardOption[] = [
  {
    value: 'Solo',
    label: 'Solo Explorer',
    sublabel: 'Independence & Self-Discovery',
    icon: '🧭',
    description: 'Flexibility, meeting fellow travelers in hostels/cafes, introspection, and offbeat trails.',
  },
  {
    value: 'Couple',
    label: 'Romantic Couple',
    sublabel: 'Intimacy & Scenic Romance',
    icon: '💑',
    description: 'Charming sunset viewpoints, cozy heritage stays, candlelight dinners, and tranquil lakes.',
  },
  {
    value: 'Family',
    label: 'Family Vacation',
    sublabel: 'Multi-Generational Comfort',
    icon: '👨‍👩‍👧‍👦',
    description: 'Kid-friendly sights, comfortable transport, accessible hotels, and safe landmark visits.',
  },
  {
    value: 'Friends',
    label: 'Friends Getaway',
    sublabel: 'Vibrant Energy & Fun',
    icon: '🎉',
    description: 'Road trips, lively food hotspots, group adventures, beach cafes, and fun nightlife.',
  },
  {
    value: 'Adventure',
    label: 'Adventure Thrillseeker',
    sublabel: 'Active & High Energy',
    icon: '🧗',
    description: 'Challenging treks, river rafting, paragliding, camping under stars, and rugged trails.',
  },
  {
    value: 'Relaxed',
    label: 'Relaxed & Mindful',
    sublabel: 'Slow Pace & Rejuvenation',
    icon: '☕',
    description: 'Unhurried mornings, tea gardens, spa wellness, reading with views, and gentle strolls.',
  },
  {
    value: 'Luxury',
    label: 'Luxury & Indulgence',
    sublabel: 'Finest Stays & Service',
    icon: '👑',
    description: 'Palatial havelis, 5-star hospitality, private boat charters, and curated fine dining.',
  },
  {
    value: 'Budget',
    label: 'Smart Budget',
    sublabel: 'High Value & Authenticity',
    icon: '🎒',
    description: 'Maximizing every rupee, authentic local transport, street delicacies, and budget guesthouses.',
  },
];

interface TravelStyleStepProps {
  selectedStyle: TravelStyle;
  onChange: (style: TravelStyle) => void;
  onNext: () => void;
}

export default function TravelStyleStep({
  selectedStyle,
  onChange,
  onNext,
}: TravelStyleStepProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-purple-700" />
          <span>Step 4 · Travel Style</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          How do you like to travel?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          This helps calibrate the vibe, atmosphere, and hospitality type that suits you best.
        </p>
      </div>

      {/* Selectable Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {STYLE_OPTIONS.map((option) => {
          const isSelected = selectedStyle === option.value;
          return (
            <button
              key={option.value}
              type="button"
              id={`style-opt-${option.value.toLowerCase()}`}
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer relative ${
                isSelected
                  ? 'bg-purple-500/10 border-purple-500 shadow-md ring-2 ring-purple-500/20'
                  : 'bg-white border-stone-200 hover:border-purple-300 hover:bg-stone-50/80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-2xl p-1 bg-stone-50 rounded-xl shrink-0">
                  {option.icon}
                </span>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-purple-600 border-purple-700 text-white'
                      : 'border-stone-300 bg-stone-100'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {option.label}
                </h3>
                <span className="text-[11px] font-bold text-purple-700 block">
                  {option.sublabel}
                </span>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-semibold">
          Selected: <strong className="text-slate-900">{selectedStyle}</strong>
        </div>

        <button
          type="button"
          id="style-step-next-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-black text-sm shadow-md shadow-orange-600/30 transition-all cursor-pointer"
        >
          <span>Continue to Region</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
