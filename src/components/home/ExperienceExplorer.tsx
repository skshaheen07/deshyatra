import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mountain,
  Palmtree,
  Landmark,
  Flame,
  Compass,
  Zap,
  Utensils,
  Trees,
  Heart,
  Palette,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { experiences } from '../../data';
import { ExperienceCategory } from '../../types';

// Map iconName strings to Lucide icon components
const ICON_MAP: Record<string, React.ElementType> = {
  Mountain,
  Palmtree,
  Landmark,
  Flame,
  Compass,
  Zap,
  Utensils,
  Trees,
  Heart,
  Palette,
};

export default function ExperienceExplorer() {
  return (
    <section id="experience-explorer-section" className="py-16 sm:py-24 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              10 Authentic Travel Themes
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Discover India by Experience
            </h2>
            <p className="mt-2 text-base text-stone-300 max-w-2xl">
              Travel beyond standard geography. Choose an experience archetype and uncover destinations curated specifically for what inspires your soul.
            </p>
          </div>

          <Link
            to="/experiences"
            id="experience-view-all-link"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all group shrink-0"
          >
            <span>Explore All 10 Themes</span>
            <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => {
            const IconComponent = ICON_MAP[exp.iconName] || Compass;
            const isFeatured = idx === 0 || idx === 2; // visually highlight 2 cards for nice asymmetric rhythm

            return (
              <Link
                key={exp.id}
                to={`/experiences/${exp.id}`}
                id={`experience-card-${exp.id}`}
                className={`group relative rounded-2xl overflow-hidden border border-white/15 bg-stone-800 hover:border-amber-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Background Hero Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={exp.heroImage}
                    alt={exp.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-stone-900/20" />

                  {/* Icon Badge */}
                  <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Destination Count Pill */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-bold text-amber-200">
                    {exp.highlightDestinations.length} Places
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-stone-900/90">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                      {exp.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-stone-300 leading-relaxed line-clamp-2">
                      {exp.tagline}
                    </p>
                  </div>

                  {/* Highlight Tags */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <div className="flex flex-wrap gap-1">
                      {exp.matchingInterests.slice(0, 2).map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-0.5 rounded bg-white/10 text-stone-200 text-[10px] font-semibold"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>

                    <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
