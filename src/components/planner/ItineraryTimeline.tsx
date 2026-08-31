import React, { useState } from 'react';
import { Plus, Calendar, Sparkles, Eye } from 'lucide-react';
import { ItineraryDay } from '../../types';
import ItineraryDayCard from './ItineraryDayCard';

interface ItineraryTimelineProps {
  days: ItineraryDay[];
  onAddSlotClick: (dayNumber: number) => void;
  onRemoveSlot: (dayNumber: number, slotIndex: number) => void;
  onMoveSlot: (dayNumber: number, fromIndex: number, toIndex: number) => void;
  onChangeSlotTime: (
    dayNumber: number,
    slotIndex: number,
    time: 'Morning' | 'Afternoon' | 'Evening'
  ) => void;
  onUpdateDayNotes: (dayNumber: number, notes: string) => void;
  onAddDay: () => void;
}

export default function ItineraryTimeline({
  days,
  onAddSlotClick,
  onRemoveSlot,
  onMoveSlot,
  onChangeSlotTime,
  onUpdateDayNotes,
  onAddDay,
}: ItineraryTimelineProps) {
  const [activeDayFilter, setActiveDayFilter] = useState<number | 'all'>('all');

  const displayedDays =
    activeDayFilter === 'all'
      ? days
      : days.filter((d) => d.dayNumber === activeDayFilter);

  const scrollToDay = (dayNum: number) => {
    setActiveDayFilter('all');
    setTimeout(() => {
      const el = document.getElementById(`itinerary-day-${dayNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div id="itinerary-timeline-container" className="space-y-6">
      {/* Sticky Day Navigation Bar */}
      <div className="sticky top-16 z-30 bg-stone-50/95 backdrop-blur-md py-3 border-b border-stone-200/80 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveDayFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeDayFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              All {days.length} Days
            </button>

            {days.map((day) => (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => scrollToDay(day.dayNumber)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
                  activeDayFilter === day.dayNumber
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>D{day.dayNumber}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  ({day.slots?.length || 0})
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onAddDay}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-200/80 hover:bg-stone-300 active:scale-95 text-slate-800 text-xs font-bold shrink-0 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Day</span>
          </button>
        </div>
      </div>

      {/* List of Days */}
      <div className="space-y-6">
        {displayedDays.map((day) => (
          <ItineraryDayCard
            key={day.dayNumber}
            day={day}
            onAddSlotClick={onAddSlotClick}
            onRemoveSlot={onRemoveSlot}
            onMoveSlot={onMoveSlot}
            onChangeSlotTime={onChangeSlotTime}
            onUpdateDayNotes={onUpdateDayNotes}
          />
        ))}
      </div>

      {/* Add Day Bottom CTA */}
      <div className="pt-2 flex items-center justify-center">
        <button
          type="button"
          onClick={onAddDay}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-stone-100 border-2 border-dashed border-stone-300 text-slate-700 font-bold text-xs sm:text-sm shadow-xs transition-all"
        >
          <Plus className="w-4 h-4 text-orange-600" />
          <span>Extend Trip (+ Add Day {days.length + 1})</span>
        </button>
      </div>
    </div>
  );
}
