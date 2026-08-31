import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  IndianRupee,
  Clock,
  ArrowRight,
  Sparkles,
  Heart,
  Compass,
} from 'lucide-react';
import { Destination, ExperienceCategory, UserPreferences } from '../../types';
import { toggleFavoriteDestination, getStoredFavorites } from '../../utils/storage';

interface DestinationWithMatchScore {
  destination: Destination;
  score?: number;
  isPrimaryHighlight?: boolean;
}

interface ExperienceDestinationsProps {
  experience: ExperienceCategory;
  destinationsList: DestinationWithMatchScore[];
  userPreferences: UserPreferences | null;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function ExperienceDestinations({
  experience,
  destinationsList,
  userPreferences,
  favorites,
  onToggleFavorite,
}: ExperienceDestinationsProps) {
  return (
    <section id="experience-destinations-section" className="py-14 sm:py-20 bg-stone-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-600">
              <Compass className="w-4 h-4" />
              <span>WHERE TO EXPERIENCE IT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Top Destinations for {experience.name}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Handpicked Indian cities and sanctuaries renowned for authentic{' '}
              {experience.name.toLowerCase()} journeys.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/explore?interest=${encodeURIComponent(experience.matchingInterests[0] || experience.id)}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 hover:border-orange-500 hover:text-orange-600 bg-white text-slate-700 font-bold text-xs sm:text-sm shadow-xs transition-all"
            >
              <span>Explore All on Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {destinationsList.map(({ destination, score, isPrimaryHighlight }) => {
            const isFav = favorites.includes(destination.id);

            return (
              <div
                key={destination.id}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                  <img
                    src={destination.heroImage}
                    alt={destination.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                  {/* Favorite Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => onToggleFavorite(destination.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-stone-950/60 backdrop-blur-md text-white hover:text-rose-500 hover:bg-stone-950/90 transition-all shadow-md"
                    title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    aria-label="Toggle favorite"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
                    />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {isPrimaryHighlight && (
                      <span className="px-2.5 py-1 rounded-lg bg-orange-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                        Signature Hub
                      </span>
                    )}

                    {score !== undefined && score > 60 && (
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{score}% Match</span>
                      </span>
                    )}
                  </div>

                  {/* Title Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xl font-black">{destination.name}</h3>
                    <p className="text-xs text-stone-200 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>
                        {destination.state} • {destination.region} India
                      </span>
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {destination.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-700">
                      <div className="flex items-center gap-1.5 bg-stone-50 rounded-lg p-2 border border-stone-100">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        <div className="truncate">
                          <span className="text-[10px] text-slate-600 block uppercase font-bold">
                            Budget
                          </span>
                          <span className="font-semibold text-slate-900">
                            {destination.budgetRange}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 bg-stone-50 rounded-lg p-2 border border-stone-100">
                        <Clock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        <div className="truncate">
                          <span className="text-[10px] text-slate-600 block uppercase font-bold">
                            Ideal Stay
                          </span>
                          <span className="font-semibold text-slate-900">
                            {destination.idealDurationDays} Days
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Top Attractions Preview */}
                    {destination.attractions.length > 0 && (
                      <div className="text-xs text-slate-600 space-y-1">
                        <span className="font-bold text-slate-900 text-[11px] uppercase tracking-wider block">
                          Key Experiences:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {destination.attractions.slice(0, 3).map((att) => (
                            <span
                              key={att.name}
                              className="px-2 py-0.5 bg-stone-100 rounded text-[11px] font-medium text-slate-700 truncate max-w-[200px]"
                            >
                              {att.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                    <Link
                      to={`/destinations/${destination.id}`}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 hover:border-slate-400 text-slate-700 font-bold text-xs transition-colors"
                    >
                      View Details
                    </Link>

                    <Link
                      to={`/planner?destination=${destination.id}`}
                      className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Plan Trip</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
