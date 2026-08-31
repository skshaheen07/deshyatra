import React, { useEffect } from 'react';
import {
  X,
  RotateCcw,
  SlidersHorizontal,
  Compass,
  MapPin,
  Sparkles,
  Wallet,
  Clock,
  Users,
  Check,
} from 'lucide-react';
import {
  BudgetTier,
  DurationOption,
  InterestType,
  Region,
  TravelStyle,
} from '../../types';
import { FilterState } from './ActiveFilters';

interface ExploreFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearAll: () => void;
  availableStates: { id: string; name: string; region: Region; count: number }[];
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  totalFilteredCount: number;
}

export default function ExploreFilters({
  filters,
  onFilterChange,
  onClearAll,
  availableStates,
  isMobileOpen,
  onCloseMobile,
  totalFilteredCount,
}: ExploreFiltersProps) {
  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onCloseMobile();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileOpen, onCloseMobile]);

  const regions: (Region | 'All India')[] = [
    'All India',
    'North',
    'South',
    'East',
    'West',
    'Central',
    'Northeast',
  ];

  const interestOptions: { type: InterestType; icon: string }[] = [
    { type: 'Mountains', icon: '🏔️' },
    { type: 'Beaches', icon: '🏖️' },
    { type: 'Heritage', icon: '🏛️' },
    { type: 'Spiritual', icon: '🪔' },
    { type: 'Wildlife', icon: '🐅' },
    { type: 'Nature', icon: '🌿' },
    { type: 'Adventure', icon: '🧗' },
    { type: 'Food', icon: '🍛' },
    { type: 'Culture', icon: '🎭' },
    { type: 'Wellness', icon: '🧘' },
    { type: 'Photography', icon: '📸' },
    { type: 'Arts & Craft', icon: '🎨' },
    { type: 'Rural & Offbeat', icon: '🏡' },
  ];

  const budgetOptions: (BudgetTier | 'All')[] = [
    'All',
    'Under ₹5,000',
    '₹5,000–₹10,000',
    '₹10,000–₹20,000',
    '₹20,000+',
  ];

  const durationOptions: (DurationOption | 'All')[] = [
    'All',
    '1–2 days',
    '3–4 days',
    '5–7 days',
    '7+ days',
  ];

  const travelStyleOptions: (TravelStyle | 'All')[] = [
    'All',
    'Solo',
    'Couple',
    'Family',
    'Friends',
    'Adventure',
    'Relaxed',
    'Luxury',
    'Budget',
  ];

  const toggleInterest = (interest: InterestType) => {
    const exists = filters.interests.includes(interest);
    const updated = exists
      ? filters.interests.filter((i) => i !== interest)
      : [...filters.interests, interest];
    onFilterChange({ ...filters, interests: updated });
  };

  const handleRegionSelect = (region: string) => {
    onFilterChange({
      ...filters,
      region,
      state: '', // Reset state when region changes if state belongs to different region
    });
  };

  const filterContent = (
    <div className="space-y-6">
      {/* 1. Region Selector */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
          <Compass className="w-4 h-4 text-orange-600" />
          <span>Geographical Region</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {regions.map((region) => {
            const isSelected =
              filters.region === region || (!filters.region && region === 'All India');
            return (
              <button
                key={region}
                type="button"
                id={`filter-region-${region.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleRegionSelect(region)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-amber-300 shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200/80 text-slate-700'
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. State Dropdown / Dynamic Filter */}
      <div>
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span>State / Territory</span>
          </div>
          {filters.state && (
            <button
              type="button"
              id="clear-state-filter-btn"
              onClick={() => onFilterChange({ ...filters, state: '' })}
              className="text-[11px] font-bold text-orange-600 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <label htmlFor="filter-state-select" className="sr-only">
          Select State
        </label>
        <select
          id="filter-state-select"
          value={filters.state}
          onChange={(e) => onFilterChange({ ...filters, state: e.target.value })}
          className="w-full py-2.5 px-3 bg-stone-50 hover:bg-stone-100/70 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        >
          <option value="">All States & UTs ({availableStates.length})</option>
          {availableStates.map((st) => (
            <option key={st.id} value={st.name}>
              {st.name} ({st.count} {st.count === 1 ? 'place' : 'places'})
            </option>
          ))}
        </select>
      </div>

      {/* 3. Experience / Interest Categories */}
      <div>
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>Experience & Theme</span>
          </div>
          {filters.interests.length > 0 && (
            <span className="text-[11px] font-bold text-orange-600">
              {filters.interests.length} selected
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {interestOptions.map((item) => {
            const isSelected = filters.interests.includes(item.type);
            return (
              <button
                key={item.type}
                type="button"
                id={`filter-interest-${item.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => toggleInterest(item.type)}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between text-left ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200/80 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span className="text-sm">{item.icon}</span>
                  <span className="truncate">{item.type}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Budget Range */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
          <Wallet className="w-4 h-4 text-orange-600" />
          <span>Estimated Budget Tier</span>
        </div>
        <div className="space-y-1">
          {budgetOptions.map((tier) => {
            const isSelected =
              (tier === 'All' && !filters.budget) || filters.budget === tier;
            return (
              <button
                key={tier}
                type="button"
                id={`filter-budget-${tier.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    budget: tier === 'All' ? '' : (tier as BudgetTier),
                  })
                }
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-amber-300'
                    : 'hover:bg-stone-100 text-slate-700'
                }`}
              >
                <span>{tier === 'All' ? 'Any Budget' : tier}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Ideal Duration */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
          <Clock className="w-4 h-4 text-orange-600" />
          <span>Ideal Stay Duration</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {durationOptions.map((dur) => {
            const isSelected =
              (dur === 'All' && !filters.duration) || filters.duration === dur;
            return (
              <button
                key={dur}
                type="button"
                id={`filter-duration-${dur.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    duration: dur === 'All' ? '' : (dur as DurationOption),
                  })
                }
                className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  isSelected
                    ? 'bg-slate-900 text-amber-300'
                    : 'bg-stone-100 hover:bg-stone-200/80 text-slate-700'
                }`}
              >
                {dur === 'All' ? 'Any Duration' : dur}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Travel Style */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
          <Users className="w-4 h-4 text-orange-600" />
          <span>Travel Style</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {travelStyleOptions.map((style) => {
            const isSelected =
              (style === 'All' && !filters.travelStyle) || filters.travelStyle === style;
            return (
              <button
                key={style}
                type="button"
                id={`filter-style-${style.toLowerCase()}`}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    travelStyle: style === 'All' ? '' : (style as TravelStyle),
                  })
                }
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-amber-300'
                    : 'bg-stone-100 hover:bg-stone-200/80 text-slate-700'
                }`}
              >
                {style === 'All' ? 'Any Style' : style}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR FILTER PANEL */}
      <aside
        id="explore-desktop-filters-sidebar"
        className="hidden lg:block w-72 shrink-0 bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-orange-600" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Filter By
            </h2>
          </div>
          <button
            type="button"
            id="desktop-filters-reset-btn"
            onClick={onClearAll}
            className="text-xs font-bold text-slate-500 hover:text-rose-600 inline-flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {filterContent}
      </aside>

      {/* MOBILE FILTER MODAL / DRAWER */}
      {isMobileOpen && (
        <div
          id="explore-mobile-filters-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Destination Filters"
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
        >
          {/* Backdrop click to dismiss */}
          <div
            className="fixed inset-0"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="relative w-full max-h-[90vh] bg-white rounded-t-3xl shadow-2xl flex flex-col z-10 animate-slideUp">
            {/* Drawer Handle */}
            <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mt-3 mb-1" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-orange-600" />
                <h2 className="text-base font-black text-slate-900">
                  Filter Destinations
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="mobile-filters-clear-all-btn"
                  onClick={onClearAll}
                  className="text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
                <button
                  type="button"
                  id="mobile-filters-close-btn"
                  onClick={onCloseMobile}
                  aria-label="Close filters"
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Filter List */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {filterContent}
            </div>

            {/* Sticky Mobile Apply Button */}
            <div className="p-4 bg-stone-50 border-t border-stone-200">
              <button
                type="button"
                id="mobile-filters-apply-btn"
                onClick={onCloseMobile}
                className="w-full py-3.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>View {totalFilteredCount} {totalFilteredCount === 1 ? 'Destination' : 'Destinations'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
