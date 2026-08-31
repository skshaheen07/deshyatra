import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { experiences } from '../data/experiences';
import { destinations, getDestinationById } from '../data/destinations';
import { ExperienceCategory, InterestType, Region, UserPreferences } from '../types';
import { getSavedUserPreferences, PREFERENCES_CHANGE_EVENT } from '../utils/storage';
import ExperiencesHero from '../components/experiences/ExperiencesHero';
import ExperienceSearchFilter from '../components/experiences/ExperienceSearchFilter';
import ExperienceCard from '../components/experiences/ExperienceCard';
import { Sparkles, Compass } from 'lucide-react';

export default function ExperiencesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialInterest = searchParams.get('interest') || searchParams.get('theme') || 'All';
  const initialRegion = searchParams.get('region') || 'All';
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedInterest, setSelectedInterest] = useState<string>(initialInterest);
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion);

  // User preferences from localStorage for personalized matching
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(() =>
    getSavedUserPreferences()
  );

  const gridRef = useRef<HTMLDivElement>(null);

  // Synchronize user preferences changes
  useEffect(() => {
    const handlePrefChange = () => {
      setUserPrefs(getSavedUserPreferences());
    };
    window.addEventListener(PREFERENCES_CHANGE_EVENT, handlePrefChange);
    return () => {
      window.removeEventListener(PREFERENCES_CHANGE_EVENT, handlePrefChange);
    };
  }, []);

  // Compute all available interest themes from dataset
  const availableInterests = useMemo(() => {
    const interestsSet = new Set<string>();
    experiences.forEach((exp) => {
      exp.matchingInterests.forEach((interest) => interestsSet.add(interest));
    });
    return Array.from(interestsSet);
  }, []);

  // Compute all available regions among destination highlights
  const availableRegions = useMemo(() => {
    const regionsSet = new Set<Region>();
    experiences.forEach((exp) => {
      exp.highlightDestinations.forEach((destId) => {
        const dest = getDestinationById(destId);
        if (dest) regionsSet.add(dest.region);
      });
    });
    return Array.from(regionsSet);
  }, []);

  // Filter and search experiences
  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      // 1. Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = exp.name.toLowerCase().includes(query);
        const matchesTagline = exp.tagline.toLowerCase().includes(query);
        const matchesDesc = exp.description.toLowerCase().includes(query);
        const matchesInterest = exp.matchingInterests.some((i) =>
          i.toLowerCase().includes(query)
        );
        const matchesDestination = exp.highlightDestinations.some((destId) => {
          const dest = getDestinationById(destId);
          return (
            dest?.name.toLowerCase().includes(query) ||
            dest?.state.toLowerCase().includes(query)
          );
        });

        if (
          !matchesName &&
          !matchesTagline &&
          !matchesDesc &&
          !matchesInterest &&
          !matchesDestination
        ) {
          return false;
        }
      }

      // 2. Interest Filter
      if (selectedInterest !== 'All') {
        const hasInterest = exp.matchingInterests.some(
          (i) => i.toLowerCase() === selectedInterest.toLowerCase()
        );
        if (!hasInterest) return false;
      }

      // 3. Region Filter
      if (selectedRegion !== 'All') {
        const matchesRegion = exp.highlightDestinations.some((destId) => {
          const dest = getDestinationById(destId);
          return dest?.region.toLowerCase() === selectedRegion.toLowerCase();
        });
        if (!matchesRegion) return false;
      }

      return true;
    });
  }, [searchQuery, selectedInterest, selectedRegion]);

  // Determine personalized match status for each experience
  const getPersonalizedMatch = (exp: ExperienceCategory) => {
    if (!userPrefs) return { isMatch: false, reason: '' };

    // Check user interests overlap
    const matchedInterests = exp.matchingInterests.filter((interest) =>
      userPrefs.interests.some((ui) => ui.toLowerCase() === interest.toLowerCase())
    );

    if (matchedInterests.length > 0) {
      return {
        isMatch: true,
        reason: `Matches your interest in ${matchedInterests.join(' & ')}`,
      };
    }

    // Check travel style alignment
    if (userPrefs.travelStyle === 'Adventure' && exp.id === 'adventure') {
      return { isMatch: true, reason: 'Curated for Adventure seekers' };
    }
    if (userPrefs.travelStyle === 'Relaxed' && (exp.id === 'wellness' || exp.id === 'beaches')) {
      return { isMatch: true, reason: 'Perfect for Relaxed vacations' };
    }
    if (userPrefs.travelStyle === 'Family' && (exp.id === 'heritage' || exp.id === 'wildlife')) {
      return { isMatch: true, reason: 'Great for Family exploration' };
    }

    return { isMatch: false, reason: '' };
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedInterest('All');
    setSelectedRegion('All');
  };

  const handleScrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedInterest !== 'All' || selectedRegion !== 'All';

  return (
    <div className="min-h-screen bg-stone-50/50 pb-24">
      {/* 1. Editorial Hero */}
      <ExperiencesHero
        totalCount={experiences.length}
        onExploreClick={handleScrollToGrid}
      />

      {/* 2. Main Discovery Workspace */}
      <main ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-8">
        {/* Search & Filter Toolbar */}
        <ExperienceSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedInterest={selectedInterest}
          onInterestChange={setSelectedInterest}
          availableInterests={availableInterests}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          availableRegions={availableRegions}
          totalResults={filteredExperiences.length}
          totalAvailable={experiences.length}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Personalized Banner if user has preferences */}
        {userPrefs && !hasActiveFilters && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Experiences Tailored to You
                </p>
                <p className="text-sm text-slate-700">
                  Highlighting themes matching your selected travel style ({userPrefs.travelStyle}) and
                  interests ({userPrefs.interests.join(', ')}).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Experience Cards Grid */}
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredExperiences.map((exp) => {
              const { isMatch, reason } = getPersonalizedMatch(exp);
              return (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  isPersonalizedMatch={isMatch}
                  matchReason={reason}
                  destinationCount={exp.highlightDestinations.length}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-20 bg-white rounded-3xl border border-stone-200 text-center space-y-4 max-w-lg mx-auto p-8 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <Compass className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-slate-900">No Experiences Found</h2>
            <p className="text-sm text-slate-600">
              We couldn't find any travel experiences matching your search and filter criteria.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Reset All Filters</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
