import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, UserCheck } from 'lucide-react';
import { ExperienceCategory, UserPreferences } from '../../types';

interface ExperiencePersonalizedBannerProps {
  experience: ExperienceCategory;
  userPreferences: UserPreferences | null;
  matchReasons: string[];
}

export default function ExperiencePersonalizedBanner({
  experience,
  userPreferences,
  matchReasons,
}: ExperiencePersonalizedBannerProps) {
  if (!userPreferences || matchReasons.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 rounded-2xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 font-black shadow-md">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 text-[10px] font-black uppercase tracking-wider">
              Personalized Insight
            </span>
            <span className="text-xs font-bold text-slate-700">
              A Strong Match For Your Travel Style
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            {experience.name} aligns with your preferences
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {matchReasons.map((reason, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-xs text-slate-700 font-medium bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {reason}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-3">
        <Link
          to="/discover"
          className="text-xs font-bold text-amber-800 hover:text-amber-900 underline underline-offset-4"
        >
          Update Preferences
        </Link>
      </div>
    </div>
  );
}
