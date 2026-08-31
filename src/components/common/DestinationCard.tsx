import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Clock,
  Wallet,
  Heart,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Destination } from '../../types';
import {
  FAVORITES_CHANGE_EVENT,
  isFavoriteDestination,
  toggleFavoriteDestination,
} from '../../utils/storage';

interface DestinationCardProps {
  key?: React.Key;
  destination: Destination;
  matchScore?: number;
  matchReasons?: string[];
  featuredBadge?: string;
  className?: string;
}

export default function DestinationCard({
  destination,
  matchScore,
  matchReasons,
  featuredBadge,
  className = '',
}: DestinationCardProps) {
  const [isFav, setIsFav] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsFav(isFavoriteDestination(destination.id));

    const handleFavChange = () => {
      setIsFav(isFavoriteDestination(destination.id));
    };

    window.addEventListener(FAVORITES_CHANGE_EVENT, handleFavChange);
    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, handleFavChange);
    };
  }, [destination.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleFavoriteDestination(destination.id);
    setIsFav(updated);
  };

  return (
    <div
      id={`destination-card-${destination.id}`}
      className={`group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-amber-400/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={destination.heroImage}
          alt={destination.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

        {/* Favorite Heart Button */}
        <button
          type="button"
          id={`fav-btn-${destination.id}`}
          onClick={handleFavoriteClick}
          aria-label={isFav ? `Remove ${destination.name} from favorites` : `Add ${destination.name} to favorites`}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white hover:text-rose-500 hover:scale-110 active:scale-95 transition-all shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-700'
            }`}
          />
        </button>

        {/* Region & State Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-amber-300 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {destination.state}
          </span>
          {featuredBadge && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-xs">
              {featuredBadge}
            </span>
          )}
          {matchScore !== undefined && (
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              {matchScore}% Match
            </span>
          )}
        </div>

        {/* Bottom Image Overlay: Title & Rating */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
          <div>
            <span className="text-[11px] font-medium tracking-wide uppercase text-amber-200/90 block">
              {destination.region} India
            </span>
            <h3 className="text-xl font-black tracking-tight drop-shadow-sm group-hover:text-amber-200 transition-colors">
              {destination.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold border border-white/10">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{destination.rating.toFixed(1)}</span>
            <span className="text-stone-300 font-normal text-[10px]">({destination.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Tagline */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {destination.tagline}
        </p>

        {/* Quick Highlights / Match Reasons if present */}
        {matchReasons && matchReasons.length > 0 ? (
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5 text-xs text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1 text-[11px] text-emerald-700 uppercase tracking-wide">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Why this matches you:
            </div>
            <p className="line-clamp-2 text-emerald-800 text-[11px] leading-snug">
              {matchReasons[0]}
            </p>
          </div>
        ) : (
          /* Interests / Experience Pills */
          <div className="flex flex-wrap gap-1.5">
            {destination.interests.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-slate-700 border border-stone-200/60"
              >
                {interest}
              </span>
            ))}
            {destination.interests.length > 3 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-50 text-slate-500">
                +{destination.interests.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Practical Meta: Budget & Duration */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>{destination.idealDuration}</span>
          </div>

          <div className="flex items-center gap-1.5 font-medium text-slate-800">
            <Wallet className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>{destination.budgetRange}</span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-1">
          <Link
            to={`/destination/${destination.id}`}
            id={`view-destination-btn-${destination.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-600 text-slate-800 hover:text-white font-bold text-xs sm:text-sm transition-all duration-200 group-hover:shadow-md"
          >
            <span>Explore Destination</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
