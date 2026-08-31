import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  destinations,
  states as allStatesData,
  experiences as allExperiencesData,
} from '../data';
import {
  BudgetTier,
  Destination,
  DurationOption,
  InterestType,
  Region,
  TravelStyle,
  UserPreferences,
} from '../types';
import { getSavedUserPreferences } from '../utils/storage';
import { calculateDestinationScore } from '../utils/recommendation';
import ExploreHeader from '../components/explore/ExploreHeader';
import ExploreFilters from '../components/explore/ExploreFilters';
import ActiveFilters, { FilterState } from '../components/explore/ActiveFilters';
import ExploreSort, { SortOption } from '../components/explore/ExploreSort';
import ExploreResults, { DestinationWithScore } from '../components/explore/ExploreResults';

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // User preferences from storage for personalized recommendation scoring
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(() => getSavedUserPreferences());
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Parse initial filters from URL query parameters
  const getInitialFilters = useCallback((): FilterState => {
    const regionParam = searchParams.get('region');
    const stateParam = searchParams.get('state');
    const interestParam = searchParams.get('interest') || searchParams.get('experience');
    const budgetParam = searchParams.get('budget');
    const durationParam = searchParams.get('duration');
    const styleParam = searchParams.get('style') || searchParams.get('travelStyle');
    const queryParam = searchParams.get('q') || searchParams.get('search');

    // Region matching
    const validRegions: Region[] = ['North', 'South', 'East', 'West', 'Central', 'Northeast'];
    const matchedRegion = validRegions.find(
      (r) => r.toLowerCase() === regionParam?.toLowerCase()
    ) || (regionParam === 'All India' ? 'All India' : '');

    // State matching
    let matchedState = '';
    if (stateParam) {
      const foundState = allStatesData.find(
        (s) => s.id.toLowerCase() === stateParam.toLowerCase() || s.name.toLowerCase() === stateParam.toLowerCase()
      );
      if (foundState) {
        matchedState = foundState.name;
      }
    }

    // Interest/Experience matching
    const initialInterests: InterestType[] = [];
    if (interestParam) {
      const interestTokens = interestParam.split(',');
      interestTokens.forEach((token) => {
        const clean = token.trim();
        // Check matching experience ID or interest type name
        const expMatch = allExperiencesData.find(
          (e) => e.id.toLowerCase() === clean.toLowerCase() || e.name.toLowerCase().includes(clean.toLowerCase())
        );
        if (expMatch && expMatch.matchingInterests.length > 0) {
          initialInterests.push(expMatch.matchingInterests[0] as InterestType);
        } else {
          // Direct interest check
          const directMatch: InterestType[] = [
            'Nature', 'Adventure', 'Beaches', 'Mountains', 'Heritage',
            'Spiritual', 'Food', 'Culture', 'Wildlife', 'Photography',
            'Wellness', 'Arts & Craft', 'Rural & Offbeat'
          ];
          const found = directMatch.find((im) => im.toLowerCase() === clean.toLowerCase());
          if (found && !initialInterests.includes(found)) {
            initialInterests.push(found);
          }
        }
      });
    }

    // Budget matching
    let matchedBudget: BudgetTier | '' = '';
    const validBudgets: BudgetTier[] = [
      'Under ₹5,000',
      '₹5,000–₹10,000',
      '₹10,000–₹20,000',
      '₹20,000+',
    ];
    if (budgetParam) {
      const foundBudget = validBudgets.find(
        (b) => b.toLowerCase() === budgetParam.toLowerCase() || b.includes(budgetParam)
      );
      if (foundBudget) matchedBudget = foundBudget;
    }

    // Duration matching
    let matchedDuration: DurationOption | '' = '';
    const validDurations: DurationOption[] = [
      '1–2 days',
      '3–4 days',
      '5–7 days',
      '7+ days',
    ];
    if (durationParam) {
      const foundDur = validDurations.find(
        (d) => d.toLowerCase() === durationParam.toLowerCase() || d.includes(durationParam)
      );
      if (foundDur) matchedDuration = foundDur;
    }

    // Travel style matching
    let matchedStyle: TravelStyle | '' = '';
    const validStyles: TravelStyle[] = [
      'Solo',
      'Couple',
      'Family',
      'Friends',
      'Adventure',
      'Relaxed',
      'Luxury',
      'Budget',
    ];
    if (styleParam) {
      const foundStyle = validStyles.find(
        (s) => s.toLowerCase() === styleParam.toLowerCase()
      );
      if (foundStyle) matchedStyle = foundStyle;
    }

    return {
      region: matchedRegion,
      state: matchedState,
      interests: initialInterests,
      budget: matchedBudget,
      duration: matchedDuration,
      travelStyle: matchedStyle,
      searchQuery: queryParam || '',
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<FilterState>(getInitialFilters);

  // Sorting option
  const initialSort = (searchParams.get('sort') as SortOption) || 'recommended';
  const [currentSort, setCurrentSort] = useState<SortOption>(initialSort);

  // Listen to preference changes in storage
  useEffect(() => {
    setUserPrefs(getSavedUserPreferences());

    const handlePrefChange = () => {
      setUserPrefs(getSavedUserPreferences());
    };

    window.addEventListener('deshyatra:preferences_changed', handlePrefChange);
    return () => {
      window.removeEventListener('deshyatra:preferences_changed', handlePrefChange);
    };
  }, []);

  // Synchronize state with URL search params changes (e.g. Back/Forward navigation)
  useEffect(() => {
    setFilters(getInitialFilters());
  }, [getInitialFilters]);

  // Synchronize filters back to URL search params
  const updateUrlParams = useCallback(
    (newFilters: FilterState, sort: SortOption) => {
      const params = new URLSearchParams();

      if (newFilters.searchQuery.trim()) {
        params.set('search', newFilters.searchQuery.trim());
      }
      if (newFilters.region && newFilters.region !== 'All India') {
        params.set('region', newFilters.region.toLowerCase());
      }
      if (newFilters.state) {
        params.set('state', newFilters.state.toLowerCase());
      }
      if (newFilters.interests.length > 0) {
        params.set('interest', newFilters.interests.join(','));
      }
      if (newFilters.budget) {
        params.set('budget', newFilters.budget);
      }
      if (newFilters.duration) {
        params.set('duration', newFilters.duration);
      }
      if (newFilters.travelStyle) {
        params.set('style', newFilters.travelStyle.toLowerCase());
      }
      if (sort !== 'recommended') {
        params.set('sort', sort);
      }

      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateUrlParams(newFilters, currentSort);
  };

  const handleSortChange = (newSort: SortOption) => {
    setCurrentSort(newSort);
    updateUrlParams(filters, newSort);
  };

  const handleSearchChange = (query: string) => {
    const updated = { ...filters, searchQuery: query };
    setFilters(updated);
    updateUrlParams(updated, currentSort);
  };

  const handleRemoveSingleFilter = (key: keyof FilterState, value?: string) => {
    let updated: FilterState;
    if (key === 'interests' && value) {
      updated = {
        ...filters,
        interests: filters.interests.filter((i) => i !== value),
      };
    } else {
      updated = {
        ...filters,
        [key]: key === 'interests' ? [] : '',
      };
    }
    setFilters(updated);
    updateUrlParams(updated, currentSort);
  };

  const handleClearAllFilters = () => {
    const resetFilters: FilterState = {
      region: '',
      state: '',
      interests: [],
      budget: '',
      duration: '',
      travelStyle: '',
      searchQuery: '',
    };
    setFilters(resetFilters);
    setCurrentSort('recommended');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Dynamic available states with place counts
  const availableStates = useMemo(() => {
    const stateCountMap: Record<string, { count: number; region: Region }> = {};

    destinations.forEach((dest) => {
      if (!stateCountMap[dest.state]) {
        stateCountMap[dest.state] = { count: 0, region: dest.region };
      }
      stateCountMap[dest.state].count += 1;
    });

    return Object.entries(stateCountMap)
      .map(([name, data]) => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        region: data.region,
        count: data.count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter and Score Destinations
  const filteredDestinations = useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase();

    return destinations
      .filter((dest) => {
        // 1. Search Query filter
        if (query) {
          const matchName = dest.name.toLowerCase().includes(query);
          const matchState = dest.state.toLowerCase().includes(query);
          const matchRegion = dest.region.toLowerCase().includes(query);
          const matchTagline = dest.tagline.toLowerCase().includes(query);
          const matchCategories = dest.categories.some((c) => c.toLowerCase().includes(query));
          const matchInterests = dest.interests.some((i) => i.toLowerCase().includes(query));
          const matchActivities = dest.activities.some((a) => a.toLowerCase().includes(query));
          const matchAttractions = dest.attractions.some((attr) =>
            attr.name.toLowerCase().includes(query) || attr.description.toLowerCase().includes(query)
          );

          if (
            !matchName &&
            !matchState &&
            !matchRegion &&
            !matchTagline &&
            !matchCategories &&
            !matchInterests &&
            !matchActivities &&
            !matchAttractions
          ) {
            return false;
          }
        }

        // 2. Region filter
        if (filters.region && filters.region !== 'All India') {
          if (dest.region.toLowerCase() !== filters.region.toLowerCase()) {
            return false;
          }
        }

        // 3. State filter
        if (filters.state) {
          if (dest.state.toLowerCase() !== filters.state.toLowerCase()) {
            return false;
          }
        }

        // 4. Interests filter (Match if destination matches ANY of the selected interests)
        if (filters.interests.length > 0) {
          const hasAnyInterest = filters.interests.some((interest) =>
            dest.interests.some((di) => di.toLowerCase() === interest.toLowerCase())
          );
          if (!hasAnyInterest) {
            return false;
          }
        }

        // 5. Budget filter
        if (filters.budget) {
          if (dest.budgetRange !== filters.budget) {
            return false;
          }
        }

        // 6. Duration filter
        if (filters.duration) {
          if (dest.idealDuration !== filters.duration) {
            return false;
          }
        }

        // 7. Travel Style filter
        if (filters.travelStyle) {
          if (!dest.travelStyles.includes(filters.travelStyle)) {
            return false;
          }
        }

        return true;
      })
      .map((dest): DestinationWithScore => {
        // Attach recommendation score if user preferences exist
        if (userPrefs) {
          const scored = calculateDestinationScore(dest, userPrefs);
          return {
            destination: dest,
            matchScore: scored.score,
            matchReasons: scored.reasons,
          };
        }
        return {
          destination: dest,
        };
      });
  }, [filters, userPrefs]);

  // Sort Filtered Results
  const sortedDestinations = useMemo(() => {
    const list = [...filteredDestinations];

    switch (currentSort) {
      case 'recommended':
        return list.sort((a, b) => {
          if (a.matchScore !== undefined && b.matchScore !== undefined) {
            if (b.matchScore !== a.matchScore) {
              return b.matchScore - a.matchScore;
            }
          }
          if (a.destination.featured && !b.destination.featured) return -1;
          if (!a.destination.featured && b.destination.featured) return 1;
          return b.destination.rating - a.destination.rating;
        });

      case 'name-asc':
        return list.sort((a, b) => a.destination.name.localeCompare(b.destination.name));

      case 'budget-asc':
        return list.sort(
          (a, b) => a.destination.estimatedCostPerDay - b.destination.estimatedCostPerDay
        );

      case 'duration-asc':
        return list.sort(
          (a, b) => a.destination.idealDurationDays - b.destination.idealDurationDays
        );

      case 'featured':
        return list.sort((a, b) => {
          if (a.destination.featured && !b.destination.featured) return -1;
          if (!a.destination.featured && b.destination.featured) return 1;
          return b.destination.rating - a.destination.rating;
        });

      default:
        return list;
    }
  }, [filteredDestinations, currentSort]);

  // Count active filter criteria
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count += 1;
    if (filters.region && filters.region !== 'All India') count += 1;
    if (filters.state) count += 1;
    count += filters.interests.length;
    if (filters.budget) count += 1;
    if (filters.duration) count += 1;
    if (filters.travelStyle) count += 1;
    return count;
  }, [filters]);

  const isFiltered = activeFilterCount > 0;

  return (
    <div id="explore-page-root" className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* 1. Page Header with Search & Quick Tags */}
      <ExploreHeader
        searchQuery={filters.searchQuery}
        onSearchChange={handleSearchChange}
        totalDestinations={destinations.length}
        filteredCount={sortedDestinations.length}
        onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Filters Sidebar (Desktop) & Drawer (Mobile) */}
          <ExploreFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
            availableStates={availableStates}
            isMobileOpen={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
            totalFilteredCount={sortedDestinations.length}
          />

          {/* Right: Results View & Sort Bar */}
          <main className="flex-1 w-full">
            {/* Active Filter Chips */}
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveSingleFilter}
              onClearAll={handleClearAllFilters}
              filteredCount={sortedDestinations.length}
              totalCount={destinations.length}
            />

            {/* Sort and Count Header */}
            <ExploreSort
              totalCount={destinations.length}
              filteredCount={sortedDestinations.length}
              currentSort={currentSort}
              onSortChange={handleSortChange}
              hasPersonalizedPreferences={!!userPrefs}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
              activeFilterCount={activeFilterCount}
            />

            {/* Destination Grid / Empty State */}
            <div className="pt-6">
              <ExploreResults
                destinations={sortedDestinations}
                onClearFilters={handleClearAllFilters}
                isFiltered={isFiltered}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
