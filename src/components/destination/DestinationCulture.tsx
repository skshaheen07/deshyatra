import React from 'react';
import { BookOpen, Sparkles, MessageSquare, ShieldCheck, Heart, Users } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationCultureProps {
  destination: Destination;
}

export default function DestinationCulture({ destination }: DestinationCultureProps) {
  if (!destination.culture) {
    return null;
  }

  const { traditions, festivals, languages, etiquetteTips } = destination.culture;

  return (
    <section id="culture" className="scroll-mt-28 py-10 sm:py-14 border-b border-stone-200">
      <div className="space-y-8">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-purple-700" />
            <span>Living Traditions</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Experience the Local Culture
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Immerse yourself respectfully into the customs, vibrant festivals, and languages of {destination.state}.
          </p>
        </div>

        {/* Culture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditions Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Customs & Cultural Roots
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {traditions}
            </p>
          </div>

          {/* Etiquette Tips Card */}
          {etiquetteTips && (
            <div className="bg-amber-50/60 rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Thoughtful Travel Etiquette
                </h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {etiquetteTips}
              </p>
            </div>
          )}

          {/* Festivals */}
          {festivals && festivals.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Celebrations & Major Festivals
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {festivals.map((festival) => (
                  <span
                    key={festival}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-900 text-xs font-bold border border-rose-200/70"
                  >
                    🎉 {festival}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Spoken */}
          {languages && languages.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Languages Spoken Locally
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {languages.map((language) => (
                  <span
                    key={language}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200/70"
                  >
                    🗣️ {language}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
