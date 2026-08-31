import React from 'react';
import { Sparkles, Compass, CheckCircle2, Heart, Award } from 'lucide-react';
import { ExperienceCategory, Region } from '../../types';
import { getExperienceIcon } from './ExperienceIcon';

interface ExperienceOverviewProps {
  experience: ExperienceCategory;
  regions: Region[];
  destinationCount: number;
}

export default function ExperienceOverview({
  experience,
  regions,
  destinationCount,
}: ExperienceOverviewProps) {
  const IconComponent = getExperienceIcon(experience.iconName);

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Editorial Narrative (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-600">
                <Sparkles className="w-4 h-4" />
                <span>The Essence of the Journey</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                What This Experience Means
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {experience.description}
            </p>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-orange-600" />
                <span>Why Travelers Seek This In India</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                India’s profound geological and cultural tapestry creates unmatched expressions of{' '}
                <strong className="text-slate-900">{experience.name.toLowerCase()}</strong>. From
                historic centuries-old tradition to raw, untamed terrain, this travel theme connects
                you directly to the living spirit of the subcontinent.
              </p>
            </div>

            {/* Pillar Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/50">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Authenticity
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Rooted in real local traditions and landscapes
                </p>
              </div>

              <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/50">
                <p className="text-xs font-bold text-orange-800 uppercase tracking-wider">
                  Discovery
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Curated across {destinationCount} premier Indian destinations
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-100 border border-stone-200/60">
                <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Immersion
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Signature food, nature, and cultural experiences
                </p>
              </div>
            </div>
          </div>

          {/* Right Highlights Box (5 Columns) */}
          <div className="lg:col-span-5 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                  Experience Highlights
                </p>
                <h3 className="text-xl font-black text-white">{experience.name}</h3>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Matching Themes:</strong>{' '}
                  {experience.matchingInterests.join(', ')}
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Regional Spread:</strong>{' '}
                  {regions.length > 0 ? regions.map((r) => `${r} India`).join(', ') : 'Pan India'}
                </span>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Trip Planning:</strong> Seamless 1–7+ day
                  customizable itineraries available in our planner
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs text-stone-200">
              <span className="font-bold text-amber-300">Curator’s Note: </span>
              {experience.tagline}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
