import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Compass, CompassIcon } from 'lucide-react';

interface ExperiencesHeroProps {
  totalCount: number;
  onExploreClick?: () => void;
}

export default function ExperiencesHero({ totalCount, onExploreClick }: ExperiencesHeroProps) {
  return (
    <section className="relative overflow-hidden bg-stone-950 text-white min-h-[480px] lg:min-h-[520px] flex items-center">
      {/* Background Image with Layered Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=2000&q=85"
          alt="Experience India"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-black tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>EXPERIENCE INDIA</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Don't Just Visit India. <br />
            <span className="text-amber-400">Experience It.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-normal">
            From mist-covered mountains to living traditions, discover the experiences that make
            every journey unforgettable.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/discover"
              id="hero-find-experience-cta"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm tracking-wide shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find My Experience</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-sm transition-all"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Explore All {totalCount} Themes</span>
            </button>
          </div>

          {/* Key Quick Badges */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <p className="text-xs font-medium text-stone-300">Curated Themes</p>
              <p className="text-xl font-black text-white">{totalCount} Archetypes</p>
            </div>
            <div>
              <p className="text-xs font-medium text-stone-300">Iconic Places</p>
              <p className="text-xl font-black text-white">40+ Cities</p>
            </div>
            <div>
              <p className="text-xs font-medium text-stone-300">Match Engine</p>
              <p className="text-xl font-black text-amber-400">100% Tailored</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
