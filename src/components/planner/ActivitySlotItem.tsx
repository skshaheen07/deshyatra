import React from 'react';
import {
  Clock,
  Trash2,
  ChevronUp,
  ChevronDown,
  Compass,
  Utensils,
  Landmark,
  Sparkles,
  MapPin,
  Coffee,
} from 'lucide-react';
import { ItinerarySlot } from '../../types';

interface ActivitySlotItemProps {
  key?: React.Key;
  slot: ItinerarySlot;
  index: number;
  totalSlots: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onChangeTimeOfDay: (time: 'Morning' | 'Afternoon' | 'Evening') => void;
}

export default function ActivitySlotItem({
  slot,
  index,
  totalSlots,
  onMoveUp,
  onMoveDown,
  onRemove,
  onChangeTimeOfDay,
}: ActivitySlotItemProps) {
  // Category badge colors & icons
  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'Attraction':
        return {
          icon: Landmark,
          bg: 'bg-orange-50 text-orange-700 border-orange-200',
          dot: 'bg-orange-500',
        };
      case 'Experience':
        return {
          icon: Compass,
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
        };
      case 'Food':
        return {
          icon: Utensils,
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'Culture':
        return {
          icon: Sparkles,
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          dot: 'bg-purple-500',
        };
      default:
        return {
          icon: Coffee,
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
        };
    }
  };

  const meta = getCategoryMeta(slot.category);
  const CategoryIcon = meta.icon;

  const getTimeBg = (time: string) => {
    switch (time) {
      case 'Morning':
        return 'bg-amber-100/70 text-amber-900 border-amber-300/60';
      case 'Afternoon':
        return 'bg-sky-100/70 text-sky-900 border-sky-300/60';
      case 'Evening':
        return 'bg-indigo-100/70 text-indigo-900 border-indigo-300/60';
      default:
        return 'bg-stone-100 text-slate-800 border-stone-200';
    }
  };

  return (
    <div
      id={`activity-slot-${slot.id || index}`}
      className="group relative bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-stone-300 transition-all space-y-3"
    >
      {/* Top Meta Line: Time of Day Selector, Category, and Actions */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Time of Day Picker */}
          <select
            aria-label="Time of Day"
            value={slot.timeOfDay}
            onChange={(e) => onChangeTimeOfDay(e.target.value as 'Morning' | 'Afternoon' | 'Evening')}
            className={`px-2.5 py-1 rounded-lg text-xs font-black border transition-all cursor-pointer ${getTimeBg(
              slot.timeOfDay
            )}`}
          >
            <option value="Morning">🌅 Morning</option>
            <option value="Afternoon">☀️ Afternoon</option>
            <option value="Evening">🌙 Evening</option>
          </select>

          {/* Category Tag */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${meta.bg}`}
          >
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{slot.category}</span>
          </span>
        </div>

        {/* Action Controls: Move Up, Move Down, Remove */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={onMoveUp}
            aria-label="Move item earlier"
            title="Move earlier"
            className="p-1.5 rounded-lg text-stone-400 hover:text-slate-700 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-400 transition-colors"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <button
            type="button"
            disabled={index === totalSlots - 1}
            onClick={onMoveDown}
            aria-label="Move item later"
            title="Move later"
            className="p-1.5 rounded-lg text-stone-400 hover:text-slate-700 hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-400 transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${slot.title}`}
            title="Remove from day"
            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content: Title and Description */}
      <div>
        <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {slot.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
          {slot.description}
        </p>
      </div>

      {/* Bottom Info Bar: Duration & Location */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          {slot.duration && (
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{slot.duration}</span>
            </span>
          )}

          {slot.location && (
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{slot.location}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
