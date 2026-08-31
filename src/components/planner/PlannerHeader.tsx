import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Heart,
  FolderHeart,
  ExternalLink,
  ChevronDown,
  Clock,
  Wallet,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Destination } from '../../types';
import {
  isFavoriteDestination,
  toggleFavoriteDestination,
  FAVORITES_CHANGE_EVENT,
} from '../../utils/storage';
import SaveTripStatus from './SaveTripStatus';

interface PlannerHeaderProps {
  destination: Destination | null;
  durationDays: number;
  totalActivitiesCount: number;
  onChangeDestinationClick: () => void;
  onOpenSavedTripsClick: () => void;
  savedTripsCount: number;
  isSaving: boolean;
  lastSavedAt: Date | null;
}

export default function PlannerHeader({
  destination,
  durationDays,
  totalActivitiesCount,
  onChangeDestinationClick,
  onOpenSavedTripsClick,
  savedTripsCount,
  isSaving,
  lastSavedAt,
}: PlannerHeaderProps) {
  const [isFav, setIsFav] = useState(
    destination ? isFavoriteDestination(destination.id) : false
  );

  useEffect(() => {
    if (destination) {
      setIsFav(isFavoriteDestination(destination.id));
    }

    const handleFavoritesChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string; isFavorite: boolean }>;
      if (destination && customEvent.detail.id === destination.id) {
        setIsFav(customEvent.detail.isFavorite);
      }
    };

    window.addEventListener(FAVORITES_CHANGE_EVENT, handleFavoritesChange);
    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, handleFavoritesChange);
    };
  }, [destination]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (destination) {
      const updated = toggleFavoriteDestination(destination.id);
      setIsFav(updated);
    }
  };

  return (
    <header className="bg-white border-b border-stone-200/80 pt-8 pb-6 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Title & Utility Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/70 text-orange-700 text-xs font-black uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Smart Itinerary Builder</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Plan Your Journey
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal mt-1 max-w-2xl">
              Turn your destination into a trip that fits your time and travel style.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <SaveTripStatus isSaving={isSaving} lastSavedAt={lastSavedAt} />

            <button
              type="button"
              id="planner-saved-trips-btn"
              onClick={onOpenSavedTripsClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 active:scale-95 text-slate-700 font-bold text-xs sm:text-sm transition-all border border-stone-200"
            >
              <FolderHeart className="w-4 h-4 text-orange-600" />
              <span>My Saved Trips</span>
              {savedTripsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] font-black flex items-center justify-center">
                  {savedTripsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Destination Info & Quick Metric Strip */}
        {destination ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Destination Tag & Switcher */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 border border-stone-200 shadow-sm">
                <img
                  src={destination.heroImage}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                    {destination.state} · {destination.region} India
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleFavorite}
                    aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    className="p-1 rounded-md text-stone-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'text-stone-400'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 truncate">
                    {destination.name}
                  </h2>
                  <Link
                    to={`/destinations/${destination.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline ml-1"
                    title="View destination guide"
                  >
                    <span>Guide</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {destination.tagline}
                </p>
              </div>
            </div>

            {/* Metrics & Change Destination Button */}
            <div className="flex items-center flex-wrap gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-200">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-slate-500 font-medium">Duration:</span>
                <span className="font-extrabold text-slate-800">{durationDays} Days</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
                <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-slate-500 font-medium">Est. Daily:</span>
                <span className="font-extrabold text-slate-800">
                  ~₹{destination.estimatedCostPerDay.toLocaleString('en-IN')}/day
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-slate-500 font-medium">Scheduled:</span>
                <span className="font-extrabold text-slate-800">
                  {totalActivitiesCount} Activities
                </span>
              </div>

              <button
                type="button"
                id="planner-change-destination-btn"
                onClick={onChangeDestinationClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Change City</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3">
            <p className="text-sm font-bold text-amber-900">
              No destination selected yet. Choose where in India you want to travel!
            </p>
            <button
              type="button"
              id="planner-choose-destination-btn"
              onClick={onChangeDestinationClick}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span>Select a Destination</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
