import React from 'react';
import { Search, X, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react';

interface ExploreHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalDestinations: number;
  filteredCount: number;
  onOpenMobileFilters: () => void;
  activeFilterCount: number;
}

export default function ExploreHeader({
  searchQuery,
  onSearchChange,
  totalDestinations,
  filteredCount,
  onOpenMobileFilters,
  activeFilterCount,
}: ExploreHeaderProps) {
  const quickSearchTags = [
    'Kerala',
    'Rajasthan',
    'Ladakh',
    'Mountains',
    'Beaches',
    'Heritage',
    'Wildlife',
    'Spiritual',
  ];

  return (
    <div id="explore-header" className="relative bg-white border-b border-stone-200/80 pt-8 pb-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Eyebrow & Headline */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>EXPLORE INDIA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Find Your Next Escape
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Browse destinations across India&apos;s landscapes, cultures and experiences.
            <span className="ml-2 inline-flex items-center gap-1 font-bold text-slate-900 bg-stone-100 px-2.5 py-0.5 rounded-full text-xs">
              <MapPin className="w-3 h-3 text-orange-600" />
              {totalDestinations} Curated Destinations
            </span>
          </p>
        </div>

        {/* Search Field */}
        <div className="mt-8 max-w-3xl">
          <div className="relative flex items-center">
            <label htmlFor="explore-search-input" className="sr-only">
              Search destinations, states or experiences
            </label>
            <div className="absolute left-4 pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              id="explore-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search destinations, states or experiences..."
              className="w-full pl-12 pr-12 py-4 bg-stone-50 hover:bg-stone-100/70 focus:bg-white border border-stone-200 rounded-2xl text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-xs"
            />

            {searchQuery && (
              <button
                type="button"
                id="explore-clear-search-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search text"
                className="absolute right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Tag Suggestions & Mobile Filter Button */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5 text-slate-500">
              <span className="font-semibold text-slate-400">Popular:</span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  id={`quick-search-tag-${tag.toLowerCase()}`}
                  onClick={() => onSearchChange(tag)}
                  className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                    searchQuery.toLowerCase() === tag.toLowerCase()
                      ? 'bg-orange-600 text-white font-bold'
                      : 'bg-stone-100 hover:bg-stone-200 text-slate-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle (Visible on smaller screens) */}
            <div className="lg:hidden w-full sm:w-auto pt-2 sm:pt-0">
              <button
                type="button"
                id="mobile-filters-trigger-btn"
                onClick={onOpenMobileFilters}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm hover:bg-orange-600 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-orange-500 text-white font-extrabold text-[11px]">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
