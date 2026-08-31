import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Plus,
  Check,
  Landmark,
  Compass,
  Utensils,
  Sparkles,
  Clock,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';
import { Destination, ItineraryDay, ItinerarySlot } from '../../types';
import {
  getDestinationActivityLibrary,
  LibraryActivity,
  ActivityCategory,
  isActivityInItinerary,
} from '../../utils/plannerGenerator';

interface ActivityLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination;
  days: ItineraryDay[];
  targetDayNumber?: number;
  onAddActivityToDay: (
    dayNumber: number,
    activity: {
      title: string;
      category: ActivityCategory;
      description: string;
      timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
      duration?: string;
      location?: string;
    }
  ) => void;
}

export default function ActivityLibrary({
  isOpen,
  onClose,
  destination,
  days,
  targetDayNumber = 1,
  onAddActivityToDay,
}: ActivityLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState<number>(targetDayNumber);
  const [showCustomForm, setShowCustomForm] = useState(false);

  // Custom activity form state
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState<ActivityCategory>('Attraction');
  const [customTimeOfDay, setCustomTimeOfDay] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [customDuration, setCustomDuration] = useState('2 hours');
  const [customDesc, setCustomDesc] = useState('');

  // Update selected day whenever targetDayNumber changes
  React.useEffect(() => {
    if (targetDayNumber) {
      setSelectedDay(targetDayNumber);
    }
  }, [targetDayNumber]);

  const library = useMemo(() => {
    return getDestinationActivityLibrary(destination);
  }, [destination]);

  const filteredItems = useMemo(() => {
    return library.filter((item) => {
      const matchesCat =
        activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [library, activeCategory, searchQuery]);

  if (!isOpen) return null;

  const handleAddLibraryItem = (item: LibraryActivity, dayNum: number) => {
    onAddActivityToDay(dayNum, {
      title: item.title,
      category: item.category,
      description: item.description,
      timeOfDay: item.recommendedTime,
      duration: item.duration,
      location: destination.name,
    });
  };

  const handleAddCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    onAddActivityToDay(selectedDay, {
      title: customTitle.trim(),
      category: customCategory,
      description: customDesc.trim() || `Custom planned experience in ${destination.name}.`,
      timeOfDay: customTimeOfDay,
      duration: customDuration,
      location: destination.name,
    });

    // Reset form
    setCustomTitle('');
    setCustomDesc('');
    setShowCustomForm(false);
  };

  return (
    <div
      id="activity-library-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-black text-slate-900">
                {destination.name} Activity Library
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Select verified attractions, culinary trails, and experiences to add to your trip.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close activity library"
            className="p-2 rounded-xl text-stone-400 hover:text-slate-700 hover:bg-stone-200/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Day Target Selector & Search Controls */}
        <div className="p-6 border-b border-stone-100 space-y-4 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Target Day:
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-xs font-black text-orange-800 focus:outline-none cursor-pointer"
              >
                {days.map((d) => (
                  <option key={d.dayNumber} value={d.dayNumber}>
                    Day {d.dayNumber}: {d.theme}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showCustomForm ? 'Hide Custom Activity' : '+ Create Custom Activity'}</span>
            </button>
          </div>

          {/* Custom Activity Inline Form */}
          {showCustomForm && (
            <form
              onSubmit={handleAddCustomActivity}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
            >
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Add Custom Activity to Day {selectedDay}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Activity Title (e.g. Sunset Boat Ride)"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="sm:col-span-2 px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs text-slate-800 focus:ring-2 focus:ring-orange-500/20"
                  required
                />
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as ActivityCategory)}
                  className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-slate-800 cursor-pointer"
                >
                  <option value="Attraction">Attraction</option>
                  <option value="Experience">Experience</option>
                  <option value="Food">Food & Dining</option>
                  <option value="Culture">Culture</option>
                  <option value="Leisure">Leisure</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={customTimeOfDay}
                  onChange={(e) => setCustomTimeOfDay(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-slate-800 cursor-pointer"
                >
                  <option value="Morning">🌅 Morning Slot</option>
                  <option value="Afternoon">☀️ Afternoon Slot</option>
                  <option value="Evening">🌙 Evening Slot</option>
                </select>
                <input
                  type="text"
                  placeholder="Duration (e.g. 2 hours)"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCustomForm(false)}
                  className="px-3 py-1.5 rounded-xl bg-stone-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-xs"
                >
                  Add to Day {selectedDay}
                </button>
              </div>
            </form>
          )}

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter library activities, dishes, trails..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'Attraction', 'Experience', 'Food', 'Culture'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                }`}
              >
                {cat === 'All' ? 'All Activities' : cat === 'Food' ? 'Local Food' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Items List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              <p className="font-bold">No matching activities found</p>
              <p className="text-xs text-slate-400 mt-1">Try clearing search or picking another category.</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const alreadyAdded = isActivityInItinerary(item.title, days);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 p-4 hover:border-stone-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 text-[11px] font-bold">
                        {item.badge || item.category}
                      </span>
                      {item.duration && (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                      )}
                      <span className="text-[11px] text-orange-600 font-bold">
                        Rec: {item.recommendedTime}
                      </span>
                      {alreadyAdded && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                          <Check className="w-3 h-3" />
                          <span>In Plan</span>
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-black text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Add to Day Action Button */}
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddLibraryItem(item, selectedDay)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Day {selectedDay}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
