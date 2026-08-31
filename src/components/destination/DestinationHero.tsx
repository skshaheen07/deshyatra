import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Sparkles,
  Calendar,
  Compass,
  ArrowLeft,
  ChevronRight,
  Share2,
  Check,
  Star,
} from 'lucide-react';
import { Destination } from '../../types';
import {
  isFavoriteDestination,
  toggleFavoriteDestination,
  FAVORITES_CHANGE_EVENT,
} from '../../utils/storage';

interface DestinationHeroProps {
  destination: Destination;
}

export default function DestinationHero({ destination }: DestinationHeroProps) {
  const [isFav, setIsFav] = useState(() => isFavoriteDestination(destination.id));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsFav(isFavoriteDestination(destination.id));

    const handleFavoritesChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string; isFavorite: boolean }>;
      if (customEvent.detail.id === destination.id) {
        setIsFav(customEvent.detail.isFavorite);
      }
    };

    window.addEventListener(FAVORITES_CHANGE_EVENT, handleFavoritesChange);
    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, handleFavoritesChange);
    };
  }, [destination.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const updated = toggleFavoriteDestination(destination.id);
    setIsFav(updated);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${destination.name}, ${destination.state} | DeshYatra`,
          text: destination.tagline,
          url: window.location.href,
        });
      } catch {
        // Fallback to copy link
        navigator.clipboard?.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="destination-hero" className="relative bg-stone-900 text-white overflow-hidden">
      {/* Background Hero Image with Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.78] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-24 flex flex-col min-h-[520px] sm:min-h-[580px] justify-between">
        {/* Breadcrumb Navigation & Utility Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-300">
            <Link
              to="/"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 text-stone-300"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <Link
              to="/explore"
              className="hover:text-amber-300 transition-colors text-stone-300"
            >
              Explore
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <Link
              to={`/explore?region=${destination.region.toLowerCase()}`}
              className="hover:text-amber-300 transition-colors text-stone-300"
            >
              {destination.region} India
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="text-amber-400 font-bold truncate max-w-[140px] sm:max-w-none">
              {destination.name}
            </span>
          </nav>

          {/* Share & Quick Action */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="destination-share-btn"
              onClick={handleShare}
              aria-label="Share this destination"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-stone-200 border border-stone-700/60 backdrop-blur-md text-xs font-semibold transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-300" />
                  <span>Share</span>
                </>
              )}
            </button>

            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 backdrop-blur-md text-xs font-semibold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
          </div>
        </div>

        {/* Hero Central Content */}
        <div className="mt-12 sm:mt-20 max-w-3xl space-y-4">
          {/* Location & Tags Strip */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/90 text-white shadow-sm">
              <MapPin className="w-3.5 h-3.5" />
              {destination.state} · {destination.region} India
            </span>

            {destination.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full bg-slate-900/80 text-amber-300 border border-amber-400/30 backdrop-blur-md"
              >
                {cat}
              </span>
            ))}

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-400 font-extrabold backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{destination.rating.toFixed(1)}</span>
              <span className="text-stone-400 text-[10px] font-normal">({destination.reviewsCount})</span>
            </span>
          </div>

          {/* Big Destination Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-md">
            {destination.name}
          </h1>

          {/* Poetic Tagline */}
          <p className="text-lg sm:text-2xl text-stone-200 font-medium leading-relaxed drop-shadow-sm max-w-2xl">
            &ldquo;{destination.tagline}&rdquo;
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {/* Add to Trip / Planner CTA */}
            <Link
              to={`/planner?destination=${destination.id}`}
              id="hero-add-to-trip-btn"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-black text-sm sm:text-base shadow-xl shadow-orange-600/30 transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>Add to My Trip</span>
            </Link>

            {/* Favorite Button */}
            <button
              type="button"
              id="hero-toggle-favorite-btn"
              onClick={handleFavoriteClick}
              aria-label={isFav ? `Remove ${destination.name} from saved favorites` : `Save ${destination.name} to favorites`}
              className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl border font-bold text-sm backdrop-blur-md transition-all active:scale-95 ${
                isFav
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  isFav ? 'fill-white scale-110' : 'text-white'
                }`}
              />
              <span>{isFav ? 'Saved in Favorites' : 'Save Destination'}</span>
            </button>

            {/* Personalized Match Anchor */}
            <a
              href="#personalized-match-section"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 text-amber-300 border border-amber-400/30 text-xs sm:text-sm font-bold transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Check Compatibility</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
