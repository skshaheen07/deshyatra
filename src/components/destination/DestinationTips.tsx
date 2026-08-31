import React from 'react';
import { HelpCircle, Calendar, Sun, CheckCircle2, ShieldAlert, Compass, Lightbulb } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationTipsProps {
  destination: Destination;
}

export default function DestinationTips({ destination }: DestinationTipsProps) {
  return (
    <section id="tips" className="scroll-mt-28 py-10 sm:py-14 border-b border-stone-200">
      <div className="space-y-8">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5 text-blue-700" />
            <span>Smart Travel Guide</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Best Time to Visit & Travel Tips
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Practical advice on weather timing, local transit, and packing essentials for {destination.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Best Time To Visit Box (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-3xl p-6 sm:p-7 border border-amber-200/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 block">
                    Ideal Season
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {destination.bestTime}
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Peak Visitor Months:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {destination.peakMonths.map((month) => (
                    <span
                      key={month}
                      className="px-3 py-1 rounded-lg bg-white border border-amber-300/80 text-slate-800 text-xs font-bold shadow-2xs"
                    >
                      {month}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-amber-200/80 text-xs text-slate-700 space-y-1">
              <span className="font-black text-amber-900 block uppercase tracking-wider text-[10px]">
                Traveler Insight
              </span>
              <p>
                During peak months, advance accommodation and transit bookings are strongly advised. Off-peak shoulder months offer quieter sights and lush seasonal scenery.
              </p>
            </div>
          </div>

          {/* Practical Tips List (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-black text-slate-900">
                Practical Advice for Travelers
              </h3>
            </div>

            <div className="space-y-3">
              {destination.travelTips && destination.travelTips.length > 0 ? (
                destination.travelTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  Carry valid photo IDs, stay hydrated, and hire registered local guides when venturing off major trails.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
