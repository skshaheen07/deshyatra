import React from 'react';
import { Compass, Sparkles, Quote, CheckCircle2, BookmarkPlus } from 'lucide-react';
import { TravelPersonality } from '../../types';

interface PersonalityResultProps {
  personality: TravelPersonality;
}

export default function PersonalityResult({ personality }: PersonalityResultProps) {
  return (
    <div
      id="travel-personality-result-card"
      className="bg-gradient-to-br from-white to-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl shadow-stone-900/5 relative overflow-hidden"
    >
      {/* Dynamic Ambient Glow using personality accent color */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: personality.accentColor }}
      />

      <div className="relative z-10 space-y-6">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-wider shadow-sm">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Your Travel Personality Archetype</span>
          </div>

          <span
            className="px-3.5 py-1 rounded-full text-xs font-bold border"
            style={{
              borderColor: `${personality.accentColor}40`,
              backgroundColor: `${personality.accentColor}15`,
              color: personality.accentColor,
            }}
          >
            {personality.badge}
          </span>
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {personality.title}
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-600">
            {personality.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {personality.description}
        </p>

        {/* Quote Block */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200/80 flex items-start gap-3 shadow-2xs">
          <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm italic font-medium text-slate-600">
            &ldquo;{personality.quote}&rdquo;
          </p>
        </div>

        {/* Dominant Themes & Synergies */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Dominant Alignments:</span>
          {personality.dominantInterests.map((interest) => (
            <span
              key={interest}
              className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 font-bold text-slate-800"
            >
              {interest}
            </span>
          ))}
          <span className="px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 font-bold text-orange-800">
            {personality.travelStyle} Style
          </span>
        </div>
      </div>
    </div>
  );
}
