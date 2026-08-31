import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { InterestType } from '../../types';

interface InterestOption {
  value: InterestType;
  label: string;
  icon: string;
  description: string;
}

const INTEREST_OPTIONS: InterestOption[] = [
  {
    value: 'Nature',
    label: 'Nature & Valleys',
    icon: '🌿',
    description: 'Emerald tea plantations, lush greenery, serene lakes & botanical sanctuaries.',
  },
  {
    value: 'Mountains',
    label: 'Mountains & Peaks',
    icon: '🏔️',
    description: 'Himalayan ridges, pine-scented hill stations, cool breezes & alpine vistas.',
  },
  {
    value: 'Beaches',
    label: 'Beaches & Coastlines',
    icon: '🏖️',
    description: 'Golden sands, turquoise waters, sea breeze shacks & coastal sunsets.',
  },
  {
    value: 'Adventure',
    label: 'High Adventure',
    icon: '⚡',
    description: 'White-water river rafting, mountain passes, backcountry trekking & thrills.',
  },
  {
    value: 'Heritage',
    label: 'Heritage & Forts',
    icon: '🏰',
    description: 'Royal palaces, UNESCO stone monuments, medieval forts & timeless history.',
  },
  {
    value: 'Spiritual',
    label: 'Spiritual Ghats & Temples',
    icon: '🪔',
    description: 'Sacred river ceremonies, peaceful ashrams, holy chants & soul renewal.',
  },
  {
    value: 'Wildlife',
    label: 'Wildlife Safaris',
    icon: '🐅',
    description: 'Royal Bengal tigers, national parks, elephant corridors & birdwatching.',
  },
  {
    value: 'Food',
    label: 'Culinary Trails',
    icon: '🍛',
    description: 'Fragrant spice bazaars, street food lanes, royal thalis & authentic local cooking.',
  },
  {
    value: 'Culture',
    label: 'Living Culture & Arts',
    icon: '🎭',
    description: 'Classical dance forms, folklore festivities, tribal traditions & craft fairs.',
  },
  {
    value: 'Photography',
    label: 'Photography & Vistas',
    icon: '📸',
    description: 'Golden-hour architecture, scenic landscapes, vibrant colors & candid frames.',
  },
  {
    value: 'Wellness',
    label: 'Wellness & Ayurveda',
    icon: '🧘',
    description: 'Herbal therapies, yoga retreats, holistic rejuvenation & meditative silence.',
  },
  {
    value: 'Arts & Craft',
    label: 'Arts & Traditional Craft',
    icon: '🎨',
    description: 'Handloom textiles, brass metalwork, terracotta pottery & artisan workshops.',
  },
  {
    value: 'Rural & Offbeat',
    label: 'Rural & Offbeat Hamlets',
    icon: '🏡',
    description: 'Untouched villages, homestays, living root bridges & slow travel.',
  },
];

interface InterestStepProps {
  selectedInterests: InterestType[];
  onChange: (interests: InterestType[]) => void;
  onNext: () => void;
}

export default function InterestStep({
  selectedInterests,
  onChange,
  onNext,
}: InterestStepProps) {
  const toggleInterest = (value: InterestType) => {
    if (selectedInterests.includes(value)) {
      onChange(selectedInterests.filter((i) => i !== value));
    } else {
      onChange([...selectedInterests, value]);
    }
  };

  const isComplete = selectedInterests.length > 0;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Step 1 · Experiences</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          What do you want to experience?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Select everything you&apos;re curious about in India. (Choose 1 or more)
        </p>
      </div>

      {/* Grid of Selectable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {INTEREST_OPTIONS.map((option) => {
          const isSelected = selectedInterests.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              id={`interest-opt-${option.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => toggleInterest(option.value)}
              aria-pressed={isSelected}
              className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer relative ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                  : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50/80'
              }`}
            >
              <span className="text-2xl sm:text-3xl p-1 bg-stone-50 rounded-xl shrink-0">
                {option.icon}
              </span>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {option.label}
                  </h3>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-amber-500 border-amber-600 text-slate-950'
                        : 'border-stone-300 bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-semibold">
          {selectedInterests.length === 0 ? (
            <span className="text-amber-700 font-bold">Please select at least 1 experience</span>
          ) : (
            <span className="text-slate-800 font-bold">
              {selectedInterests.length} {selectedInterests.length === 1 ? 'experience' : 'experiences'} selected
            </span>
          )}
        </div>

        <button
          type="button"
          id="interest-step-next-btn"
          onClick={onNext}
          disabled={!isComplete}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm shadow-md transition-all cursor-pointer ${
            isComplete
              ? 'bg-orange-600 hover:bg-orange-500 active:scale-95 text-white shadow-orange-600/30'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <span>Continue to Budget</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
