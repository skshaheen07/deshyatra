import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Quote,
  CheckCircle2,
  MapPin,
  Flame,
  Heart,
} from 'lucide-react';
import { personalities, getDestinationById } from '../../data';
import { TravelPersonality } from '../../types';

export default function TravelPersonalities() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(personalities[0].id);

  const currentPersona =
    personalities.find((p) => p.id === selectedPersonaId) || personalities[0];

  return (
    <section id="travel-personalities-section" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            7 Distinct Indian Travel Archetypes
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            What Kind of Traveler Are You?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            India offers vastly different magic to every kind of wanderer. Explore the 7 core travel personas and discover which destinations align with your soul.
          </p>
        </div>

        {/* Archetype Selector Chips */}
        <div className="flex items-center justify-start lg:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {personalities.map((persona) => {
            const isSelected = persona.id === selectedPersonaId;
            return (
              <button
                key={persona.id}
                id={`persona-btn-${persona.id}`}
                onClick={() => setSelectedPersonaId(persona.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-lg ring-2 ring-slate-900'
                    : 'bg-stone-50 hover:bg-stone-100 text-slate-700 border border-stone-200'
                }`}
              >
                <span>{persona.badge.split(' ')[0]}</span>
                <span>{persona.title}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Archetype Card */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Persona Details */}
            <div className="md:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-900">
                  {currentPersona.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-200 text-slate-700">
                  Style: {currentPersona.travelStyle}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentPersona.title}
                </h3>
                <p className="text-sm font-bold text-orange-700 mt-0.5">
                  {currentPersona.subtitle}
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {currentPersona.description}
              </p>

              {/* Persona Quote */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs italic text-slate-700 flex items-start gap-3 shadow-xs">
                <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>&ldquo;{currentPersona.quote}&rdquo;</span>
              </div>

              {/* Dominant Interests */}
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-2">
                  Dominant Core Interests
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentPersona.dominantInterests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-white text-slate-800 border border-stone-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Curated Recommendations for this Persona */}
            <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Top Recommended Spots
                </span>
                <span className="text-[11px] text-slate-400">Curated</span>
              </div>

              <div className="space-y-3">
                {currentPersona.recommendedDestinations.slice(0, 4).map((destId) => {
                  const dest = getDestinationById(destId);
                  if (!dest) return null;
                  return (
                    <Link
                      key={dest.id}
                      to={`/destination/${dest.id}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors group"
                    >
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-orange-600">
                          {dest.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {dest.state} • {dest.idealDuration}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  to={`/discover?personality=${currentPersona.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Match as &quot;{currentPersona.title}&quot;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Launcher Callout */}
        <div className="mt-12 text-center">
          <Link
            to="/discover"
            id="travel-persona-quiz-btn"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-black text-sm sm:text-base shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Compass className="w-5 h-5 text-amber-400" />
            <span>Discover Your Exact Travel Persona in 2 Minutes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
