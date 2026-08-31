import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  ArrowLeft,
  Heart,
  Calendar,
  Layers,
  MapPin,
} from 'lucide-react';
import { experiences, getExperienceById } from '../data/experiences';
import { destinations, getDestinationById } from '../data/destinations';
import { Destination, ExperienceCategory, Region, UserPreferences } from '../types';
import {
  getStoredFavorites,
  toggleFavoriteDestination,
  FAVORITES_CHANGE_EVENT,
  getSavedUserPreferences,
  PREFERENCES_CHANGE_EVENT,
} from '../utils/storage';
import { calculateDestinationScore } from '../utils/recommendation';
import ExperienceDetailHero from '../components/experiences/ExperienceDetailHero';
import ExperienceOverview from '../components/experiences/ExperienceOverview';
import ExperiencePersonalizedBanner from '../components/experiences/ExperiencePersonalizedBanner';
import ExperienceDestinations from '../components/experiences/ExperienceDestinations';
import RelatedExperiences from '../components/experiences/RelatedExperiences';

export default function ExperienceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<string[]>(() => getStoredFavorites());
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(() =>
    getSavedUserPreferences()
  );

  // Sync favorites and user preferences
  useEffect(() => {
    const handleFavChange = () => setFavorites(getStoredFavorites());
    const handlePrefChange = () => setUserPrefs(getSavedUserPreferences());

    window.addEventListener(FAVORITES_CHANGE_EVENT, handleFavChange);
    window.addEventListener(PREFERENCES_CHANGE_EVENT, handlePrefChange);
    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, handleFavChange);
      window.removeEventListener(PREFERENCES_CHANGE_EVENT, handlePrefChange);
    };
  }, []);

  // Retrieve current experience
  const experience = useMemo(() => {
    if (!id) return undefined;
    return getExperienceById(id);
  }, [id]);

  // Handle Invalid Experience ID gracefully
  if (!experience) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-lg text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 mx-auto flex items-center justify-center">
            <Compass className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Experience Not Found</h1>
            <p className="text-sm text-slate-600">
              The travel experience archetype "{id}" does not exist in our curated collection.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore All Experiences</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Derive all destinations connected to this experience
  const connectedDestinations = useMemo(() => {
    const result: { destination: Destination; score?: number; isPrimaryHighlight?: boolean }[] = [];
    const addedIds = new Set<string>();

    // 1. First add highlight destinations (Primary Hubs)
    experience.highlightDestinations.forEach((destId) => {
      const dest = getDestinationById(destId);
      if (dest && !addedIds.has(dest.id)) {
        addedIds.add(dest.id);
        let matchScore: number | undefined = undefined;
        if (userPrefs) {
          const rec = calculateDestinationScore(dest, userPrefs);
          matchScore = rec.score;
        }
        result.push({
          destination: dest,
          score: matchScore,
          isPrimaryHighlight: true,
        });
      }
    });

    // 2. Add other destinations whose interests overlap with experience matching interests
    destinations.forEach((dest) => {
      if (!addedIds.has(dest.id)) {
        const hasOverlap = dest.interests.some((di) =>
          experience.matchingInterests.some((mi) => mi.toLowerCase() === di.toLowerCase())
        );
        if (hasOverlap) {
          addedIds.add(dest.id);
          let matchScore: number | undefined = undefined;
          if (userPrefs) {
            const rec = calculateDestinationScore(dest, userPrefs);
            matchScore = rec.score;
          }
          result.push({
            destination: dest,
            score: matchScore,
            isPrimaryHighlight: false,
          });
        }
      }
    });

    // Sort: Primary highlights first, then by score or rating
    return result.sort((a, b) => {
      if (a.isPrimaryHighlight && !b.isPrimaryHighlight) return -1;
      if (!a.isPrimaryHighlight && b.isPrimaryHighlight) return 1;
      if (a.score !== undefined && b.score !== undefined) return b.score - a.score;
      return b.destination.rating - a.destination.rating;
    });
  }, [experience, userPrefs]);

  // Derive unique regions among connected destinations
  const availableRegions = useMemo(() => {
    const regionsSet = new Set<Region>();
    connectedDestinations.forEach((item) => {
      regionsSet.add(item.destination.region);
    });
    return Array.from(regionsSet);
  }, [connectedDestinations]);

  // Check personalized reasons for this experience
  const personalizedReasons = useMemo(() => {
    if (!userPrefs) return [];
    const reasons: string[] = [];

    const matchedInterests = experience.matchingInterests.filter((interest) =>
      userPrefs.interests.some((ui) => ui.toLowerCase() === interest.toLowerCase())
    );
    if (matchedInterests.length > 0) {
      reasons.push(`Matches your interest in ${matchedInterests.join(', ')}`);
    }

    if (userPrefs.travelStyle === 'Adventure' && experience.id === 'adventure') {
      reasons.push('Matches your Adventure travel personality');
    } else if (
      userPrefs.travelStyle === 'Relaxed' &&
      (experience.id === 'wellness' || experience.id === 'beaches')
    ) {
      reasons.push('Suits your Relaxed vacation style');
    } else if (
      userPrefs.travelStyle === 'Family' &&
      (experience.id === 'heritage' || experience.id === 'wildlife')
    ) {
      reasons.push('Recommended for Family trips');
    }

    if (userPrefs.region !== 'Anywhere in India' && availableRegions.includes(userPrefs.region as Region)) {
      reasons.push(`Available in your preferred ${userPrefs.region} region`);
    }

    return reasons;
  }, [experience, userPrefs, availableRegions]);

  // Find related experiences deterministically (matching shared interests or categories)
  const relatedExperiences = useMemo(() => {
    return experiences
      .filter((other) => other.id !== experience.id)
      .map((other) => {
        // Calculate shared interests
        const sharedInterests = other.matchingInterests.filter((interest) =>
          experience.matchingInterests.some((mi) => mi.toLowerCase() === interest.toLowerCase())
        );
        return {
          experience: other,
          overlapScore: sharedInterests.length,
        };
      })
      .sort((a, b) => b.overlapScore - a.overlapScore)
      .slice(0, 3)
      .map((item) => item.experience);
  }, [experience]);

  const handleToggleFavorite = (destId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavoriteDestination(destId);
    setFavorites(getStoredFavorites());
  };

  const handleScrollToDestinations = () => {
    const el = document.getElementById('experience-destinations-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50/40">
      {/* 1. Detail Hero */}
      <ExperienceDetailHero
        experience={experience}
        destinationCount={connectedDestinations.length}
        availableRegions={availableRegions}
        onScrollToDestinations={handleScrollToDestinations}
        primaryInterest={experience.matchingInterests[0]}
        isPersonalizedMatch={personalizedReasons.length > 0}
      />

      {/* 2. Personalized Banner (if applicable) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ExperiencePersonalizedBanner
          experience={experience}
          userPreferences={userPrefs}
          matchReasons={personalizedReasons}
        />
      </div>

      {/* 3. What This Experience Means Overview */}
      <ExperienceOverview
        experience={experience}
        regions={availableRegions}
        destinationCount={connectedDestinations.length}
      />

      {/* 4. Where to Experience It (Connected Destinations Grid) */}
      <ExperienceDestinations
        experience={experience}
        destinationsList={connectedDestinations}
        userPreferences={userPrefs}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 5. Related Experiences */}
      <RelatedExperiences relatedList={relatedExperiences} />
    </div>
  );
}
