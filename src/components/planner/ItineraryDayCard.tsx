import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  StickyNote,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
} from 'lucide-react';
import { ItineraryDay, ItinerarySlot } from '../../types';
import ActivitySlotItem from './ActivitySlotItem';

interface ItineraryDayCardProps {
  key?: React.Key;
  day: ItineraryDay;
  onAddSlotClick: (dayNumber: number) => void;
  onRemoveSlot: (dayNumber: number, slotIndex: number) => void;
  onMoveSlot: (dayNumber: number, fromIndex: number, toIndex: number) => void;
  onChangeSlotTime: (
    dayNumber: number,
    slotIndex: number,
    time: 'Morning' | 'Afternoon' | 'Evening'
  ) => void;
  onUpdateDayNotes: (dayNumber: number, notes: string) => void;
}

export default function ItineraryDayCard({
  day,
  onAddSlotClick,
  onRemoveSlot,
  onMoveSlot,
  onChangeSlotTime,
  onUpdateDayNotes,
}: ItineraryDayCardProps) {
  const [showNotes, setShowNotes] = useState(Boolean(day.notes && day.notes.trim()));
  const [notesText, setNotesText] = useState(day.notes || '');

  const slots = day.slots || [];
  const timesPresent = Array.from(new Set(slots.map((s) => s.timeOfDay)));

  const handleNotesBlur = () => {
    onUpdateDayNotes(day.dayNumber, notesText);
  };

  return (
    <section
      id={`itinerary-day-${day.dayNumber}`}
      className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden transition-all scroll-mt-24"
    >
      {/* Day Header Banner */}
      <div className="px-6 py-5 bg-gradient-to-r from-stone-50 via-stone-50/80 to-white border-b border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
            D{day.dayNumber}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900">
                {day.title || `Day ${day.dayNumber}`}
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200/70 text-slate-700">
                {slots.length} {slots.length === 1 ? 'Activity' : 'Activities'}
              </span>
            </div>
            <p className="text-xs text-orange-600 font-bold mt-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{day.theme}</span>
            </p>
          </div>
        </div>

        {/* Header Right: Coverage Pills & Action */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-500 mr-2">
            {['Morning', 'Afternoon', 'Evening'].map((t) => {
              const active = timesPresent.includes(t as any);
              return (
                <span
                  key={t}
                  className={`px-2 py-0.5 rounded-md ${
                    active
                      ? 'bg-orange-100 text-orange-800 font-extrabold'
                      : 'bg-stone-100 text-stone-400 font-medium'
                  }`}
                >
                  {t.slice(0, 3)}
                </span>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onAddSlotClick(day.dayNumber)}
            id={`add-activity-btn-day-${day.dayNumber}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Activity</span>
          </button>
        </div>
      </div>

      {/* Slots Body */}
      <div className="p-5 sm:p-6 space-y-4">
        {slots.length === 0 ? (
          <div className="py-8 px-4 rounded-2xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-800">
                Your Day {day.dayNumber} itinerary is waiting for its first experience.
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Browse attractions, food stops, or signature adventures from the activity library.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onAddSlotClick(day.dayNumber)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Add an Activity to Day {day.dayNumber}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {slots.map((slot, idx) => (
              <ActivitySlotItem
                key={slot.id || `slot-${day.dayNumber}-${idx}`}
                slot={slot}
                index={idx}
                totalSlots={slots.length}
                onMoveUp={() => onMoveSlot(day.dayNumber, idx, idx - 1)}
                onMoveDown={() => onMoveSlot(day.dayNumber, idx, idx + 1)}
                onRemove={() => onRemoveSlot(day.dayNumber, idx)}
                onChangeTimeOfDay={(newTime) =>
                  onChangeSlotTime(day.dayNumber, idx, newTime)
                }
              />
            ))}
          </div>
        )}

        {/* Day Notes Expandable Section */}
        <div className="pt-3 border-t border-stone-100">
          {!showNotes ? (
            <button
              type="button"
              onClick={() => setShowNotes(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors"
            >
              <StickyNote className="w-3.5 h-3.5" />
              <span>{notesText ? 'Edit Day Notes' : '+ Add Day Notes / Reminders'}</span>
            </button>
          ) : (
            <div className="space-y-2 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <StickyNote className="w-3.5 h-3.5 text-orange-600" />
                  Day {day.dayNumber} Notes & Reminders
                </label>
                <button
                  type="button"
                  onClick={() => setShowNotes(false)}
                  className="text-xs text-stone-400 hover:text-slate-700 font-bold"
                >
                  Minimize
                </button>
              </div>
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                onBlur={handleNotesBlur}
                placeholder="E.g. Ticket reservations booked for 10 AM, local taxi driver contact, dress code reminders..."
                rows={2}
                className="w-full p-2.5 rounded-xl bg-white border border-stone-200 text-xs text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
