import React from 'react';
import { X, RotateCcw, Filter } from 'lucide-react';
import { BudgetTier, DurationOption, InterestType, Region, TravelStyle } from '../../types';

export interface FilterState {
  region: string;
  state: string;
  interests: InterestType[];
  budget: BudgetTier | '';
  duration: DurationOption | '';
  travelStyle: TravelStyle | '';
  searchQuery: string;
}

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value?: string) => void;
  onClearAll: () => void;
  filteredCount: number;
  totalCount: number;
}

export default function ActiveFilters({
  filters,
  onRemoveFilter,
  onClearAll,
  filteredCount,
  totalCount,
}: ActiveFiltersProps) {
  const activeChips: { key: keyof FilterState; label: string; value?: string }[] = [];

  if (filters.searchQuery) {
    activeChips.push({
      key: 'searchQuery',
      label: `"${filters.searchQuery}"`,
    });
  }

  if (filters.region && filters.region !== 'All India') {
    activeChips.push({
      key: 'region',
      label: `${filters.region} India`,
    });
  }

  if (filters.state) {
    activeChips.push({
      key: 'state',
      label: filters.state,
    });
  }

  filters.interests.forEach((interest) => {
    activeChips.push({
      key: 'interests',
      label: interest,
      value: interest,
    });
  });

  if (filters.budget) {
    activeChips.push({
      key: 'budget',
      label: filters.budget,
    });
  }

  if (filters.duration) {
    activeChips.push({
      key: 'duration',
      label: filters.duration,
    });
  }

  if (filters.travelStyle) {
    activeChips.push({
      key: 'travelStyle',
      label: `${filters.travelStyle} Style`,
    });
  }

  if (activeChips.length === 0) {
    return null;
  }

  return (
    <div
      id="active-filters-bar"
      className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 bg-stone-100/90 rounded-2xl border border-stone-200/80 mb-6 text-xs"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold text-slate-500 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          Active Filters ({activeChips.length}):
        </span>

        {activeChips.map((chip, idx) => (
          <span
            key={`${chip.key}-${chip.label}-${idx}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-800 border border-stone-300 font-semibold shadow-2xs hover:border-orange-500 transition-colors"
          >
            <span>{chip.label}</span>
            <button
              type="button"
              id={`remove-filter-${chip.key}-${idx}`}
              onClick={() => onRemoveFilter(chip.key, chip.value)}
              aria-label={`Remove filter ${chip.label}`}
              className="p-0.5 rounded-full hover:bg-stone-100 text-slate-400 hover:text-rose-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <button
        type="button"
        id="clear-all-active-filters-btn"
        onClick={onClearAll}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 font-bold transition-colors ml-auto"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear All</span>
      </button>
    </div>
  );
}
