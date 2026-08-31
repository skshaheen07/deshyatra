import React from 'react';
import {
  X,
  FolderHeart,
  Calendar,
  Clock,
  Trash2,
  Copy,
  ChevronRight,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { SavedItinerary } from '../../types';

interface SavedTripsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItineraries: SavedItinerary[];
  onLoadItinerary: (itinerary: SavedItinerary) => void;
  onDeleteItinerary: (id: string) => void;
  onDuplicateItinerary: (itinerary: SavedItinerary) => void;
  currentItineraryId?: string;
}

export default function SavedTripsDrawer({
  isOpen,
  onClose,
  savedItineraries,
  onLoadItinerary,
  onDeleteItinerary,
  onDuplicateItinerary,
  currentItineraryId,
}: SavedTripsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      id="saved-trips-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm flex justify-end"
    >
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <FolderHeart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">My Saved Trips</h2>
              <p className="text-xs text-slate-500">
                {savedItineraries.length} {savedItineraries.length === 1 ? 'Trip' : 'Trips'} saved in browser
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved trips drawer"
            className="p-2 rounded-xl text-stone-400 hover:text-slate-700 hover:bg-stone-200/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trips List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {savedItineraries.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <FolderHeart className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-700">No saved trips yet</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  When you plan an itinerary, it is automatically stored here for future visits.
                </p>
              </div>
            </div>
          ) : (
            savedItineraries.map((itinerary) => {
              const totalSlots = itinerary.days.reduce(
                (sum, d) => sum + (d.slots?.length || 0),
                0
              );
              const isCurrent = itinerary.id === currentItineraryId;

              return (
                <div
                  key={itinerary.id}
                  className={`rounded-2xl border p-4 transition-all space-y-3 ${
                    isCurrent
                      ? 'border-orange-500 bg-orange-50/20 ring-2 ring-orange-500/10'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  {/* Top: Destination Image, Title, State */}
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                      <img
                        src={itinerary.destinationImage}
                        alt={itinerary.destinationName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block">
                        {itinerary.destinationState}
                      </span>
                      <h3 className="text-base font-black text-slate-900 truncate">
                        {itinerary.destinationName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-bold text-slate-700">
                          {itinerary.daysCount} Days
                        </span>
                        <span>·</span>
                        <span>{totalSlots} Activities</span>
                        {itinerary.travelStyle && (
                          <>
                            <span>·</span>
                            <span className="text-slate-600">{itinerary.travelStyle}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Open, Duplicate, Delete */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      Saved {new Date(itinerary.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onDuplicateItinerary(itinerary)}
                        title="Duplicate Trip"
                        aria-label="Duplicate itinerary"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteItinerary(itinerary.id)}
                        title="Delete Trip"
                        aria-label="Delete itinerary"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onLoadItinerary(itinerary);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-xs transition-all ml-1"
                      >
                        <span>{isCurrent ? 'Viewing' : 'Open'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 text-center">
          <p className="text-[11px] text-slate-500">
            Trips are securely stored in your browser&apos;s LocalStorage.
          </p>
        </div>
      </div>
    </div>
  );
}
