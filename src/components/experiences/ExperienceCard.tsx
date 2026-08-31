import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { ExperienceCategory } from '../../types';
import { getExperienceIcon } from './ExperienceIcon';

interface ExperienceCardProps {
  key?: React.Key;
  experience: ExperienceCategory;
  isPersonalizedMatch?: boolean;
  matchReason?: string;
  destinationCount?: number;
}

export default function ExperienceCard({
  experience,
  isPersonalizedMatch,
  matchReason,
  destinationCount,
}: ExperienceCardProps) {
  const IconComponent = getExperienceIcon(experience.iconName);
  const count = destinationCount ?? experience.highlightDestinations.length;

  return (
    <article
      id={`experience-card-${experience.id}`}
      className="group relative bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-amber-400"
    >
      {/* Top Image Banner */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
        <img
          src={experience.heroImage}
          alt={experience.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

        {/* Icon Floating Badge */}
        <div className="absolute top-3.5 left-3.5 w-11 h-11 rounded-xl bg-stone-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all shadow-md">
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Personalized Match Badge */}
        {isPersonalizedMatch && (
          <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
            <Sparkles className="w-3 h-3" />
            <span>Top Match</span>
          </div>
        )}

        {/* Destination Count Indicator */}
        {!isPersonalizedMatch && (
          <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-amber-200">
            {count} Destinations
          </div>
        )}

        {/* Title and Tagline on Image bottom */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
          <h2 className="text-xl font-black tracking-tight group-hover:text-amber-300 transition-colors">
            {experience.name}
          </h2>
          <p className="text-xs text-stone-200 line-clamp-1 mt-0.5 font-medium">
            {experience.tagline}
          </p>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
            {experience.description}
          </p>

          {/* Match Reason if Personalized */}
          {matchReason && (
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200/60 text-xs font-semibold text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">{matchReason}</span>
            </div>
          )}

          {/* Interest Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {experience.matchingInterests.map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-1 rounded-md bg-stone-100 text-slate-700 text-[11px] font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-semibold">{count} signature places</span>
          </div>

          <Link
            to={`/experiences/${experience.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-xs group/btn"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
