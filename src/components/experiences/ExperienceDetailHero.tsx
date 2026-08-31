import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Compass,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { ExperienceCategory, Region } from '../../types';
import { getExperienceIcon } from './ExperienceIcon';

interface ExperienceDetailHeroProps {
  experience: ExperienceCategory;
  destinationCount: number;
  availableRegions: Region[];
  onScrollToDestinations: () => void;
  primaryInterest?: string;
  isPersonalizedMatch?: boolean;
}

export default function ExperienceDetailHero({
  experience,
  destinationCount,
  availableRegions,
  onScrollToDestinations,
  primaryInterest,
  isPersonalizedMatch,
}: ExperienceDetailHeroProps) {
  const IconComponent = getExperienceIcon(experience.iconName);

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white min-h-[520px] lg:min-h-[580px] flex items-center">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={experience.heroImage}
          alt={experience.name}
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-stone-300">
          <Link
            to="/experiences"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Experiences</span>
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-bold">{experience.name}</span>
        </div>

        <div className="max-w-3xl space-y-6">
          {/* Eyebrow & Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/90 border border-white/20 text-amber-400 text-xs font-black tracking-wider uppercase backdrop-blur-md">
              <IconComponent className="w-4 h-4" />
              <span>Experience Archetype</span>
            </div>

            {isPersonalizedMatch && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended For You</span>
              </div>
            )}
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            {experience.name}
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-amber-300/90 font-medium leading-relaxed">
            {experience.tagline}
          </p>

          {/* Editorial Description */}
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
            {experience.description}
          </p>

          {/* Interest & Region Metadata */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-300 mr-1">Interests:</span>
            {experience.matchingInterests.map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-stone-200 text-xs font-semibold backdrop-blur-sm"
              >
                {interest}
              </span>
            ))}
          </div>

          {/* Available Regions */}
          {availableRegions.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-stone-300 mr-1">Available in:</span>
              {availableRegions.map((region) => (
                <span
                  key={region}
                  className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold"
                >
                  {region} India
                </span>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onScrollToDestinations}
              id="hero-discover-destinations-btn"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm tracking-wide shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Compass className="w-4 h-4" />
              <span>Discover Destinations ({destinationCount})</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {primaryInterest && (
              <Link
                to={`/explore?interest=${encodeURIComponent(primaryInterest)}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-sm transition-all"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Explore on Map</span>
              </Link>
            )}

            <Link
              to="/discover"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-stone-300 hover:text-white font-semibold text-sm transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Personalize Quiz</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
