import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Star,
  MapPin,
  Clock,
  Wallet,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
} from 'lucide-react';
import { RecommendationResult } from '../../types';
import {
  isFavoriteDestination,
  toggleFavoriteDestination,
  FAVORITES_CHANGE_EVENT,
} from '../../utils/storage';

interface RecommendationResultCardProps {
  key?: React.Key;
  result: RecommendationResult;
  rank: number;
}

export default function RecommendationResultCard({
  result,
  rank,
}: RecommendationResultCardProps) {
  const { destination, score, breakdown, reasons, matchedInterests } = result;
  const [isFav, setIsFav] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    setIsFav(isFavoriteDestination(destination.id));

    const handleFavChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string; isFavorite: boolean }>;
      if (customEvent.detail && customEvent.detail.id === destination.id) {
        setIsFav(customEvent.detail.isFavorite);
      }
    };

    window.addEventListener(FAVORITES_CHANGE_EVENT, handleFavChange);
    return () => window.removeEventListener(FAVORITES_CHANGE_EVENT, handleFavChange);
  }, [destination.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleFavoriteDestination(destination.id);
    setIsFav(updated);
  };

  // Color gradient based on match score
  const getScoreColor = (sc: number) => {
    if (sc >= 85) return 'bg-emerald-600 text-white';
    if (sc >= 70) return 'bg-amber-600 text-white';
    return 'bg-slate-700 text-white';
  };

  return (
    <div
      id={`rec-card-${destination.id}`}
      className="bg-white rounded-3xl border border-stone-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
    >
      {/* Top Media & Header Section */}
      <div>
        {/* Image Frame */}
        <div className="relative aspect-16/9 w-full overflow-hidden bg-stone-100">
          <img
            src={destination.heroImage}
            alt={destination.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Rank Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white font-black text-xs border border-white/20 shadow-md flex items-center gap-1.5">
              <span>#{rank}</span>
              <span className="text-[10px] text-amber-400 uppercase tracking-wider">Top Match</span>
            </span>
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            id={`fav-btn-${destination.id}`}
            onClick={handleFavoriteClick}
            aria-label={isFav ? `Remove ${destination.name} from favorites` : `Save ${destination.name} to favorites`}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center text-slate-700 hover:text-red-500 transition-all shadow-md active:scale-90 cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFav ? 'fill-red-500 text-red-500' : 'text-slate-700'
              }`}
            />
          </button>

          {/* Match Score Badge (Bottom Right of Image) */}
          <div className="absolute bottom-4 right-4 z-10">
            <span
              className={`px-3 py-1 rounded-full font-black text-xs shadow-lg flex items-center gap-1 ${getScoreColor(
                score
              )}`}
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{score}% Match</span>
            </span>
          </div>

          {/* Destination Title & State inside Hero Overlay */}
          <div className="absolute bottom-4 left-4 right-28 z-10 text-white">
            <h3 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">
              {destination.name}
            </h3>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-200 mt-0.5">
              <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
              <span>
                {destination.state} · {destination.region} India
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 font-semibold text-slate-800">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{destination.idealDuration}</span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 font-semibold text-slate-800">
              <Wallet className="w-3.5 h-3.5 text-emerald-600" />
              <span>{destination.budgetRange}</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-900 font-bold ml-auto">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{destination.rating}</span>
              <span className="text-[10px] text-amber-700 font-normal">({destination.reviewsCount})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          {/* Match Reasons (Why this destination was recommended) */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Why it fits your profile:
            </span>
            <div className="space-y-1.5">
              {reasons.slice(0, 2).map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Matched Interests Pills */}
          {matchedInterests.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400">Matched themes:</span>
              {matchedInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-800 text-[11px] font-bold border border-orange-200/60"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}

          {/* 5-Factor Score Breakdown Accordion */}
          <div className="pt-2">
            <button
              type="button"
              id={`breakdown-toggle-${destination.id}`}
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-500 hover:text-slate-900 py-1.5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-orange-600" />
                <span>5-Factor Score Breakdown</span>
              </span>
              {showBreakdown ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showBreakdown && (
              <div className="mt-2.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Interests (Max 35):</span>
                  <span className="font-black text-slate-900">{breakdown.interestScore} pts</span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-orange-500 h-full rounded-full"
                    style={{ width: `${(breakdown.interestScore / 35) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-600">Budget (Max 20):</span>
                  <span className="font-black text-slate-900">{breakdown.budgetScore} pts</span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(breakdown.budgetScore / 20) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-600">Duration (Max 15):</span>
                  <span className="font-black text-slate-900">{breakdown.durationScore} pts</span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${(breakdown.durationScore / 15) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-600">Travel Style (Max 15):</span>
                  <span className="font-black text-slate-900">{breakdown.styleScore} pts</span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full"
                    style={{ width: `${(breakdown.styleScore / 15) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-600">Region Fit (Max 15):</span>
                  <span className="font-black text-slate-900">{breakdown.regionScore} pts</span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${(breakdown.regionScore / 15) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 pt-0">
        <Link
          to={`/destinations/${destination.id}`}
          id={`view-dest-link-${destination.id}`}
          className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:bg-orange-600"
        >
          <span>View Detailed Itinerary</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
