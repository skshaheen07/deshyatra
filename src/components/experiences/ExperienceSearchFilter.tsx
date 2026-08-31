import React from 'react';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { InterestType, Region } from '../../types';

interface ExperienceSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedInterest: string;
  onInterestChange: (interest: string) => void;
  availableInterests: string[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  availableRegions: string[];
  totalResults: number;
  totalAvailable: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export default function ExperienceSearchFilter({
  searchQuery,
  onSearchChange,
  selectedInterest,
  onInterestChange,
  availableInterests,
  selectedRegion,
  onRegionChange,
  availableRegions,
  totalResults,
  totalAvailable,
  onResetFilters,
  hasActiveFilters,
}: ExperienceSearchFilterProps) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-5">
      {/* Top Bar: Search Input + Result Count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search experiences by theme, vibe, activities, or places..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-stone-50 pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 placeholder:text-slate-600 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-3 p-0.5 rounded-full hover:bg-stone-200 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Count & Clear */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <span className="text-xs font-semibold text-slate-600">
            Showing <strong className="text-slate-900">{totalResults}</strong> of {totalAvailable}{' '}
            experiences
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-bold text-slate-700 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Row 1: Interest Types */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Filter by Interest Theme</span>
          </label>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => onInterestChange('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedInterest === 'All'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-stone-50 border border-stone-200 text-slate-600 hover:bg-stone-100'
            }`}
          >
            All Themes
          </button>
          {availableInterests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => onInterestChange(interest)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedInterest === interest
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-stone-50 border border-stone-200 text-slate-600 hover:bg-stone-100'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Row 2: Regions Available */}
      <div className="space-y-2 pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
            <span>Filter by Region Availability</span>
          </label>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => onRegionChange('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedRegion === 'All'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-50 border border-stone-200 text-slate-600 hover:bg-stone-100'
            }`}
          >
            All Regions
          </button>
          {availableRegions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => onRegionChange(region)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedRegion === region
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-50 border border-stone-200 text-slate-600 hover:bg-stone-100'
              }`}
            >
              {region} India
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
