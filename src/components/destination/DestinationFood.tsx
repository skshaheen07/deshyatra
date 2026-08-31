import React from 'react';
import { Utensils, MapPin, Sparkles, Heart } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationFoodProps {
  destination: Destination;
}

export default function DestinationFood({ destination }: DestinationFoodProps) {
  if (!destination.localFoods || destination.localFoods.length === 0) {
    return null;
  }

  return (
    <section id="food" className="scroll-mt-28 py-10 sm:py-14 border-b border-stone-200">
      <div className="space-y-8">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5 text-amber-700" />
            <span>Culinary Heritage</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Taste of {destination.name} & {destination.state}
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            India is experienced through its palate. Savor these authentic, time-honored regional flavors during your visit.
          </p>
        </div>

        {/* Food Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destination.localFoods.map((dish, idx) => (
            <div
              key={dish.name}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Standard Indian Veg / Non-Veg Indicator Icon */}
                    <div
                      className={`w-4 h-4 rounded-xs border-2 flex items-center justify-center ${
                        dish.isVeg
                          ? 'border-emerald-600 text-emerald-600'
                          : 'border-rose-700 text-rose-700'
                      }`}
                      title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      aria-label={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          dish.isVeg ? 'bg-emerald-600' : 'bg-rose-700'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        dish.isVeg ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {dish.isVeg ? 'Vegetarian' : 'Non-Veg'}
                    </span>
                  </div>

                  <span className="text-xs text-stone-400 font-medium">#{idx + 1} Must-Try</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                  {dish.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {dish.mustTryPlace && (
                <div className="pt-3 border-t border-stone-100 flex items-start gap-2 text-xs text-slate-700 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-900 block text-[11px] uppercase tracking-wider">
                      Recommended Place:
                    </span>
                    <span className="font-semibold text-slate-800">{dish.mustTryPlace}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
