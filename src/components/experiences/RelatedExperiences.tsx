import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ExperienceCategory } from '../../types';
import { getExperienceIcon } from './ExperienceIcon';

interface RelatedExperiencesProps {
  relatedList: ExperienceCategory[];
}

export default function RelatedExperiences({ relatedList }: RelatedExperiencesProps) {
  if (relatedList.length === 0) return null;

  return (
    <section className="py-14 sm:py-18 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>EXPAND YOUR JOURNEY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              You May Also Like
            </h2>
          </div>

          <Link
            to="/experiences"
            className="text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-500 flex items-center gap-1"
          >
            <span>View All Themes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedList.map((exp) => {
            const IconComponent = getExperienceIcon(exp.iconName);

            return (
              <Link
                key={exp.id}
                to={`/experiences/${exp.id}`}
                className="group bg-stone-50 rounded-2xl border border-stone-200/90 overflow-hidden hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
                  <img
                    src={exp.heroImage}
                    alt={exp.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-stone-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400">
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base font-black group-hover:text-amber-300 transition-colors">
                      {exp.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2">{exp.tagline}</p>

                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-orange-600 font-bold">
                    <span>{exp.highlightDestinations.length} Destinations</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
