import React from 'react';
import { Compass, RotateCcw, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { Destination } from '../../types';
import DestinationCard from '../common/DestinationCard';

export interface DestinationWithScore {
  destination: Destination;
  matchScore?: number;
  matchReasons?: string[];
}

interface ExploreResultsProps {
  destinations: DestinationWithScore[];
  onClearFilters: () => void;
  isFiltered: boolean;
}

export default function ExploreResults({
  destinations,
  onClearFilters,
  isFiltered,
}: ExploreResultsProps) {
  if (destinations.length === 0) {
    return (
      <div
        id="explore-empty-state"
        className="bg-white rounded-3xl p-8 sm:p-14 text-center border border-stone-200 shadow-xs max-w-2xl mx-auto my-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-5 border border-amber-200/60">
          <Compass className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          No destinations match your current filters
        </h3>

        <p className="mt-2.5 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Try loosening your budget tier, clearing selected states or experiences, or searching for broader terms.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            id="empty-state-clear-filters-btn"
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="explore-destinations-grid"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {destinations.map(({ destination, matchScore, matchReasons }) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          matchScore={matchScore}
          matchReasons={matchReasons}
          featuredBadge={destination.featured ? 'Featured Gem' : undefined}
          className="h-full"
        />
      ))}
    </div>
  );
}
