import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Calendar,
  Compass,
  MapPin,
  Sparkles,
  Trash2,
  Share2,
  Copy,
  Check,
  Search,
  ArrowRight,
  Plus,
  SlidersHorizontal,
  Clock,
  IndianRupee,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { destinations, getDestinationById } from '../data/destinations';
import { Destination, SavedItinerary } from '../types';
import {
  getStoredFavorites,
  toggleFavoriteDestination,
  FAVORITES_CHANGE_EVENT,
  getSavedItineraries,
  deleteSavedItinerary,
  saveItinerary,
  ITINERARY_CHANGE_EVENT,
} from '../utils/storage';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'destinations' | 'itineraries'>('destinations');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getStoredFavorites());
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>(() =>
    getSavedItineraries()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Synchronize favorites and itineraries with storage events
  useEffect(() => {
    const syncFavorites = () => {
      setFavoriteIds(getStoredFavorites());
    };
    const syncItineraries = () => {
      setSavedItineraries(getSavedItineraries());
    };

    window.addEventListener(FAVORITES_CHANGE_EVENT, syncFavorites);
    window.addEventListener(ITINERARY_CHANGE_EVENT, syncItineraries);
    window.addEventListener('storage', syncFavorites);

    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, syncFavorites);
      window.removeEventListener(ITINERARY_CHANGE_EVENT, syncItineraries);
      window.removeEventListener('storage', syncFavorites);
    };
  }, []);

  // Compute favorite destination objects
  const favoriteDestinations: Destination[] = useMemo(() => {
    return favoriteIds
      .map((id) => getDestinationById(id))
      .filter((dest): dest is Destination => dest !== undefined);
  }, [favoriteIds]);

  // Filter favorite destinations by query and region
  const filteredFavorites = useMemo(() => {
    return favoriteDestinations.filter((dest) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        selectedRegion === 'All' || dest.region.toLowerCase() === selectedRegion.toLowerCase();

      return matchesSearch && matchesRegion;
    });
  }, [favoriteDestinations, searchQuery, selectedRegion]);

  // Filter saved itineraries by query
  const filteredItineraries = useMemo(() => {
    return savedItineraries.filter((itin) => {
      if (!searchQuery.trim()) return true;
      return (
        itin.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itin.destinationState.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [savedItineraries, searchQuery]);

  // Regions available among favorites
  const availableRegions = useMemo(() => {
    const regions = new Set<string>();
    favoriteDestinations.forEach((d) => regions.add(d.region));
    return ['All', ...Array.from(regions)];
  }, [favoriteDestinations]);

  // Remove Favorite
  const handleRemoveFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavoriteDestination(id);
    setFavoriteIds(getStoredFavorites());
  };

  // Delete Itinerary
  const handleDeleteItinerary = (id: string) => {
    deleteSavedItinerary(id);
    setSavedItineraries(getSavedItineraries());
  };

  // Duplicate Itinerary
  const handleDuplicateItinerary = (itinerary: SavedItinerary) => {
    const duplicated: SavedItinerary = {
      ...itinerary,
      id: `trip_${itinerary.destinationId}_${Date.now()}`,
      destinationName: `${itinerary.destinationName} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveItinerary(duplicated);
    setSavedItineraries(getSavedItineraries());
  };

  // Copy share summary
  const handleCopySummary = (itin: SavedItinerary) => {
    const summary = `🇮🇳 DeshYatra Trip Plan: ${itin.destinationName}, ${itin.destinationState} (${itin.daysCount} Days)\n${itin.days
      .map(
        (d) =>
          `Day ${d.dayNumber}: ${d.title}\n${(d.slots || [])
            .map((s) => `  • [${s.timeOfDay}] ${s.title}`)
            .join('\n')}`
      )
      .join('\n\n')}\n\nPlanned on DeshYatra`;

    navigator.clipboard.writeText(summary);
    setCopiedId(itin.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50/50 pb-24">
      {/* Page Header */}
      <section className="bg-white border-b border-stone-200/80 pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>My Travel Collection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Saved Favorites & Trips
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                Manage your handpicked dream destinations and custom day-by-day travel itineraries.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/explore"
                className="px-4 py-2.5 rounded-xl border border-stone-300 hover:border-orange-500 hover:text-orange-600 bg-white text-slate-700 font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explore More</span>
              </Link>
              <Link
                to="/planner"
                className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Trip Planner</span>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-stone-100">
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-black">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Favorite Places
                </p>
                <p className="text-xl font-black text-slate-900">{favoriteDestinations.length}</p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Custom Itineraries
                </p>
                <p className="text-xl font-black text-slate-900">{savedItineraries.length}</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-stone-50 rounded-xl p-3.5 border border-stone-200/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Total Travel Days
                </p>
                <p className="text-xl font-black text-slate-900">
                  {savedItineraries.reduce((acc, curr) => acc + (curr.daysCount || 0), 0)} Days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Filter Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          {/* Tab buttons */}
          <div className="flex items-center gap-2 bg-stone-200/70 p-1 rounded-2xl w-fit">
            <button
              type="button"
              onClick={() => setActiveTab('destinations')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'destinations'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  activeTab === 'destinations' ? 'text-rose-500 fill-rose-500' : 'text-slate-400'
                }`}
              />
              <span>Saved Places ({favoriteDestinations.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('itineraries')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'itineraries'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>Trip Itineraries ({savedItineraries.length})</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search saved..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* TAB 1: SAVED DESTINATIONS */}
        {activeTab === 'destinations' && (
          <div className="pt-6 space-y-6">
            {/* Region Filter Chips */}
            {availableRegions.length > 2 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1 shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Region:
                </span>
                {availableRegions.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                      selectedRegion === region
                        ? 'bg-orange-600 text-white'
                        : 'bg-white border border-stone-200 text-slate-600 hover:border-stone-300'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}

            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFavorites.map((dest) => (
                  <div
                    key={dest.id}
                    className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
                  >
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden bg-stone-900">
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => handleRemoveFavorite(dest.id, e)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-rose-500 hover:bg-white transition-all shadow-md"
                        title="Remove from favorites"
                        aria-label="Remove favorite"
                      >
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      </button>

                      {/* Region Tag */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider">
                        {dest.region} India
                      </div>

                      {/* Title Info */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h2 className="text-xl font-black">{dest.name}</h2>
                        <p className="text-xs text-stone-200 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                          <span>{dest.state}</span>
                        </p>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {dest.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {dest.travelStyles.slice(0, 3).map((style) => (
                            <span
                              key={style}
                              className="px-2 py-0.5 rounded-md bg-stone-100 text-[11px] font-medium text-slate-700"
                            >
                              {style}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                        <div className="text-[11px] text-slate-600 font-medium">
                          <span>Ideal: </span>
                          <span className="font-bold text-slate-900">{dest.idealDurationDays} Days</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/destinations/${dest.id}`}
                            className="px-3 py-1.5 rounded-xl border border-stone-200 text-slate-700 hover:border-stone-400 font-bold text-xs transition-colors"
                          >
                            Details
                          </Link>
                          <Link
                            to={`/planner?destination=${dest.id}`}
                            className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Plan Trip</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 bg-white rounded-2xl border border-stone-200 text-center space-y-4 max-w-lg mx-auto p-8 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
                  <Heart className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-black text-slate-900">
                  {searchQuery ? 'No matching favorites found' : 'Your favorites list is empty'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  {searchQuery
                    ? `No places match "${searchQuery}". Try a different search term.`
                    : 'Click the heart icon on any destination or experience to save it here for effortless trip planning.'}
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/explore"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Explore Destinations</span>
                  </Link>
                  <Link
                    to="/discover"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 hover:border-orange-500 text-slate-700 font-bold text-xs sm:text-sm transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span>Take Match Quiz</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED ITINERARIES */}
        {activeTab === 'itineraries' && (
          <div className="pt-6 space-y-6">
            {filteredItineraries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItineraries.map((itin) => (
                  <div
                    key={itin.id}
                    className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
                  >
                    {/* Header Banner */}
                    <div className="relative h-44 overflow-hidden bg-stone-900">
                      <img
                        src={itin.destinationImage}
                        alt={itin.destinationName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-orange-600 text-[11px] font-black text-white uppercase tracking-wider flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{itin.daysCount} Days Itinerary</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h2 className="text-xl font-black">{itin.destinationName}</h2>
                        <p className="text-xs text-stone-200 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-orange-400" />
                          <span>{itin.destinationState}</span>
                          {itin.travelStyle && (
                            <>
                              <span>•</span>
                              <span>{itin.travelStyle}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Highlights */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          Day Plan Highlights
                        </p>
                        <div className="space-y-1.5">
                          {itin.days.slice(0, 3).map((day) => (
                            <div
                              key={day.dayNumber}
                              className="text-xs text-slate-700 bg-stone-50 rounded-lg p-2 border border-stone-100 flex items-start gap-2"
                            >
                              <span className="font-bold text-orange-600 shrink-0">
                                Day {day.dayNumber}:
                              </span>
                              <span className="truncate">{day.title}</span>
                            </div>
                          ))}
                          {itin.days.length > 3 && (
                            <p className="text-[11px] text-slate-600 text-center italic">
                              + {itin.days.length - 3} more days in timeline
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleCopySummary(itin)}
                            className="p-2 rounded-lg border border-stone-200 text-slate-600 hover:text-slate-900 hover:bg-stone-50 transition-colors"
                            title="Copy plan text"
                            aria-label="Copy itinerary"
                          >
                            {copiedId === itin.id ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDuplicateItinerary(itin)}
                            className="p-2 rounded-lg border border-stone-200 text-slate-600 hover:text-slate-900 hover:bg-stone-50 transition-colors"
                            title="Duplicate plan"
                            aria-label="Duplicate itinerary"
                          >
                            <Plus className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteItinerary(itin.id)}
                            className="p-2 rounded-lg border border-stone-200 text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                            title="Delete plan"
                            aria-label="Delete itinerary"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => navigate(`/planner?destination=${itin.destinationId}`)}
                          className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <span>Open in Planner</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 bg-white rounded-2xl border border-stone-200 text-center space-y-4 max-w-lg mx-auto p-8 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 mx-auto flex items-center justify-center">
                  <Calendar className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-black text-slate-900">No Saved Itineraries Yet</h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Build custom day-by-day travel schedules for any Indian destination, tailor activity pacing, and save your progress automatically.
                </p>
                <div className="pt-2">
                  <Link
                    to="/planner"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Create Your First Itinerary</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

