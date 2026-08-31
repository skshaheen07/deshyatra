import React from 'react';
import { MapPin, Check, Sparkles, Compass } from 'lucide-react';
import { Region } from '../../types';

export type RegionPreference = Region | 'Anywhere in India';

interface RegionCardOption {
  value: RegionPreference;
  label: string;
  sublabel: string;
  states: string;
  icon: string;
  highlight: string;
}

const REGION_OPTIONS: RegionCardOption[] = [
  {
    value: 'Anywhere in India',
    label: 'Anywhere in India',
    sublabel: 'Completely Open & Flexible',
    states: 'All 28 States & 8 Union Territories',
    icon: '✨',
    highlight: 'Let DeshYatra rank every corner of India purely on your vibe and interests.',
  },
  {
    value: 'North',
    label: 'North India',
    sublabel: 'Himalayas & Imperial Forts',
    states: 'Ladakh, Himachal, Uttarakhand, Rajasthan, Punjab, Delhi, UP',
    icon: '🏔️',
    highlight: 'Snow peaks, majestic forts, river ghats, and vibrant royal culture.',
  },
  {
    value: 'South',
    label: 'South India',
    sublabel: 'Backwaters, Ghats & Temples',
    states: 'Kerala, Karnataka, Tamil Nadu, Andhra, Telangana, Puducherry',
    icon: '🌴',
    highlight: 'Lush tea plantations, emerald backwaters, Dravidian architecture & coastal cuisines.',
  },
  {
    value: 'West',
    label: 'West India',
    sublabel: 'Beaches, Coasts & Salt Deserts',
    states: 'Goa, Maharashtra, Gujarat, Daman & Diu',
    icon: '🌊',
    highlight: 'Sun-kissed beaches, coastal shacks, white salt deserts & bustling heritage ports.',
  },
  {
    value: 'East',
    label: 'East India',
    sublabel: 'Colonial Heritage & Hills',
    states: 'West Bengal, Odisha, Bihar, Jharkhand, Sikkim',
    icon: '🫖',
    highlight: 'Darjeeling tea gardens, Kolkata literary lanes, Sun Temple of Konark & sacred shores.',
  },
  {
    value: 'Central',
    label: 'Central India',
    sublabel: 'Tiger Reserves & Ancient Sculptures',
    states: 'Madhya Pradesh, Chhattisgarh',
    icon: '🐅',
    highlight: 'Pristine national parks, royal tiger corridors, and UNESCO stone temple marvels.',
  },
  {
    value: 'Northeast',
    label: 'Northeast India',
    sublabel: 'Living Bridges & Cloud Valleys',
    states: 'Meghalaya, Arunachal, Assam, Nagaland, Manipur, Mizoram, Tripura',
    icon: '🌿',
    highlight: 'Living root bridges, wettest valleys on earth, high monasteries & untouched tribal trails.',
  },
];

interface RegionStepProps {
  selectedRegion: RegionPreference;
  onChange: (region: RegionPreference) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export default function RegionStep({
  selectedRegion,
  onChange,
  onSubmit,
  isSubmitting = false,
}: RegionStepProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-black uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-orange-700" />
          <span>Step 5 · Regional Focus</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Do you have a region in mind?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Filter by geographic region, or keep it open to discover recommendations across the subcontinent.
        </p>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REGION_OPTIONS.map((option) => {
          const isSelected = selectedRegion === option.value;
          const isAnywhere = option.value === 'Anywhere in India';

          return (
            <button
              key={option.value}
              type="button"
              id={`region-opt-${option.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer relative ${
                isAnywhere ? 'md:col-span-2' : ''
              } ${
                isSelected
                  ? 'bg-orange-500/10 border-orange-500 shadow-md ring-2 ring-orange-500/20'
                  : 'bg-white border-stone-200 hover:border-orange-300 hover:bg-stone-50/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-stone-50 rounded-2xl shrink-0">
                    {option.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        {option.label}
                      </span>
                      {isAnywhere && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                          Recommended
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-orange-700">
                      {option.sublabel}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-orange-600 border-orange-700 text-white'
                      : 'border-stone-300 bg-stone-100'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {option.highlight}
              </p>

              <div className="pt-2.5 border-t border-stone-200/70 text-[11px] text-slate-500 font-medium">
                Includes: <span className="text-slate-700 font-semibold">{option.states}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-semibold">
          Selected: <strong className="text-slate-900">{selectedRegion}</strong>
        </div>

        <button
          type="button"
          id="submit-discover-quiz-btn"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-black text-base shadow-xl shadow-orange-600/30 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Analyzing Matches...</span>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Show My Recommendations</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
