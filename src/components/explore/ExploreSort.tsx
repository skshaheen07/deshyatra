import React from 'react';
import { ArrowUpDown, SlidersHorizontal, Sparkles, Check } from 'lucide-react';

export type SortOption =
  | 'recommended'
  | 'name-asc'
  | 'budget-asc'
  | 'duration-asc'
  | 'featured';

interface ExploreSortProps {
  totalCount: number;
  filteredCount: number;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  hasPersonalizedPreferences: boolean;
  onOpenMobileFilters: () => void;
  activeFilterCount: number;
}

export default function ExploreSort({
  totalCount,
  filteredCount,
  currentSort,
  onSortChange,
  hasPersonalizedPreferences,
  onOpenMobileFilters,
  activeFilterCount,
}: ExploreSortProps) {
  const sortOptions: { id: SortOption; label: string }[] = [
    {
      id: 'recommended',
      label: hasPersonalizedPreferences ? '✨ Recommended for You' : 'Recommended',
    },
    { id: 'featured', label: 'Featured Gems' },
    { id: 'name-asc', label: 'Name A–Z' },
    { id: 'budget-asc', label: 'Budget: Low to High' },
    { id: 'duration-asc', label: 'Shortest Trip' },
  ];

  return (
    <div
      id="explore-sort-bar"
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200"
    >
      {/* Dynamic Results Counter & Match Badge */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          {filteredCount === 0 ? (
            'No destinations found'
          ) : (
            <>
              <span>{filteredCount}</span>{' '}
              <span className="text-slate-600 font-semibold text-base sm:text-lg">
                {filteredCount === 1 ? 'destination found' : 'destinations found'}
              </span>
            </>
          )}
        </h2>

        {hasPersonalizedPreferences && (
          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>Personalized Match Active</span>
          </span>
        )}
      </div>

      {/* Controls: Mobile Filter Button & Desktop Sort Select */}
      <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
        {/* Mobile Filter Button */}
        <button
          type="button"
          id="mobile-sort-filter-btn"
          onClick={onOpenMobileFilters}
          className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-slate-800 font-bold text-xs shadow-xs hover:border-orange-500 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-orange-600" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-orange-500 text-white font-extrabold text-[10px]">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="explore-sort-select"
            className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:inline"
          >
            Sort by:
          </label>
          <div className="relative">
            <select
              id="explore-sort-select"
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="py-2 pl-3 pr-8 bg-white border border-stone-300 hover:border-stone-400 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-2xs appearance-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
