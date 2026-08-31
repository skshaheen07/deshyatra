import React from 'react';
import { MapPin, Clock, CheckCircle2, Compass, Sparkles, Layers } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationActivitiesProps {
  destination: Destination;
}

export default function DestinationActivities({ destination }: DestinationActivitiesProps) {
  return (
    <section id="attractions" className="scroll-mt-28 py-10 sm:py-14 border-b border-stone-200">
      <div className="space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Curated Itinerary Highlights</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Things to Do in {destination.name}
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Handpicked landmarks, natural wonders, and signature experiences for an unforgettable stay.
          </p>
        </div>

        {/* 1. Prime Attractions Cards */}
        {destination.attractions && destination.attractions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span>Must-Visit Attractions & Sights</span>
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {destination.attractions.length} Landmarks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.attractions.map((attraction, idx) => (
                <div
                  key={attraction.name}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group"
                >
                  {attraction.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-300">
                        {attraction.type}
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {!attraction.image && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-slate-700 mb-1">
                          {attraction.type}
                        </span>
                      )}

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {attraction.name}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {attraction.description}
                      </p>
                    </div>

                    {attraction.timeNeeded && (
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-orange-600" />
                          <span>Time Needed:</span>
                        </span>
                        <span className="text-slate-900 font-bold bg-stone-100 px-2.5 py-0.5 rounded-md">
                          {attraction.timeNeeded}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Signature Activities & Experiences Checklist */}
        {destination.activities && destination.activities.length > 0 && (
          <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Signature Activities & Experiences
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {destination.activities.map((activity, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-stone-200/80 shadow-2xs flex items-start gap-3 hover:border-orange-300 transition-colors"
                >
                  <div className="p-1 rounded-lg bg-orange-50 text-orange-600 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                    {activity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
