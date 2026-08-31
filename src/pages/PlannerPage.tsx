import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Compass,
  MapPin,
  Sparkles,
  Plus,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { destinations, getDestinationById } from '../data/destinations';
import {
  Destination,
  ItineraryDay,
  ItinerarySlot,
  SavedItinerary,
  TravelStyle,
  UserPreferences,
} from '../types';
import {
  getSavedItineraries,
  saveItinerary,
  deleteSavedItinerary,
  getSavedUserPreferences,
  ITINERARY_CHANGE_EVENT,
  PREFERENCES_CHANGE_EVENT,
} from '../utils/storage';
import {
  generateStarterItinerary,
  calculateEstimatedTripBudget,
  countTotalActivities,
  TripPace,
  ActivityCategory,
} from '../utils/plannerGenerator';
import PlannerHeader from '../components/planner/PlannerHeader';
import DestinationSelector from '../components/planner/DestinationSelector';
import TripSettings from '../components/planner/TripSettings';
import ItineraryTimeline from '../components/planner/ItineraryTimeline';
import ActivityLibrary from '../components/planner/ActivityLibrary';
import TripSummary from '../components/planner/TripSummary';
import SavedTripsDrawer from '../components/planner/SavedTripsDrawer';

export default function PlannerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlDestinationId = searchParams.get('destination');

  // Load user preferences for personalization
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(() =>
    getSavedUserPreferences()
  );

  // Saved itineraries list
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>(() =>
    getSavedItineraries()
  );

  // Active Destination
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(() => {
    if (urlDestinationId) {
      const found = getDestinationById(urlDestinationId);
      if (found) return found;
    }
    // Check if there is a recently saved itinerary
    const saved = getSavedItineraries();
    if (saved.length > 0) {
      const found = getDestinationById(saved[0].destinationId);
      if (found) return found;
    }
    // Default to first destination (e.g. Munnar) if nothing else
    return destinations[0] || null;
  });

  // Trip Configuration State
  const [durationDays, setDurationDays] = useState<number>(() => {
    return currentDestination?.idealDurationDays || 3;
  });

  const [travelStyle, setTravelStyle] = useState<TravelStyle>(() => {
    if (userPreferences?.travelStyle) return userPreferences.travelStyle;
    if (currentDestination?.travelStyles?.[0]) return currentDestination.travelStyles[0];
    return 'Relaxed';
  });

  const [pace, setPace] = useState<TripPace>('Balanced');

  // Day-by-Day Itinerary Structure
  const [days, setDays] = useState<ItineraryDay[]>([]);
  const [currentItineraryId, setCurrentItineraryId] = useState<string>('');

  // Autosave and UI states
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isSavedManual, setIsSavedManual] = useState(false);

  // Modals and Drawers
  const [isDestinationSelectorOpen, setIsDestinationSelectorOpen] = useState(false);
  const [isSavedTripsOpen, setIsSavedTripsOpen] = useState(false);
  const [isActivityLibraryOpen, setIsActivityLibraryOpen] = useState(false);
  const [activityLibraryTargetDay, setActivityLibraryTargetDay] = useState<number>(1);

  // Ref to track initial mount
  const isInitialMount = useRef(true);

  // Keep savedItineraries in sync with local storage event
  useEffect(() => {
    const handleItineraryStorage = () => {
      setSavedItineraries(getSavedItineraries());
    };
    const handlePrefStorage = () => {
      setUserPreferences(getSavedUserPreferences());
    };

    window.addEventListener(ITINERARY_CHANGE_EVENT, handleItineraryStorage);
    window.addEventListener(PREFERENCES_CHANGE_EVENT, handlePrefStorage);
    return () => {
      window.removeEventListener(ITINERARY_CHANGE_EVENT, handleItineraryStorage);
      window.removeEventListener(PREFERENCES_CHANGE_EVENT, handlePrefStorage);
    };
  }, []);

  // Initialize or load itinerary whenever Destination changes or URL changes
  useEffect(() => {
    if (urlDestinationId) {
      const dest = getDestinationById(urlDestinationId);
      if (dest && dest.id !== currentDestination?.id) {
        setCurrentDestination(dest);
        setDurationDays(dest.idealDurationDays || 3);
        const starter = generateStarterItinerary(
          dest,
          dest.idealDurationDays || 3,
          pace,
          travelStyle
        );
        setDays(starter);
        setCurrentItineraryId(`trip_${dest.id}_${Date.now()}`);
        setLastSavedAt(new Date());
        return;
      }
    }

    if (currentDestination && days.length === 0) {
      // Check if existing saved itinerary matches
      const existing = savedItineraries.find((i) => i.destinationId === currentDestination.id);
      if (existing) {
        setDays(existing.days);
        setDurationDays(existing.daysCount);
        if (existing.travelStyle) setTravelStyle(existing.travelStyle);
        if (existing.pace) setPace(existing.pace);
        setCurrentItineraryId(existing.id);
        setLastSavedAt(new Date(existing.updatedAt || existing.createdAt));
      } else {
        const starter = generateStarterItinerary(
          currentDestination,
          durationDays,
          pace,
          travelStyle
        );
        setDays(starter);
        setCurrentItineraryId(`trip_${currentDestination.id}_${Date.now()}`);
        setLastSavedAt(new Date());
      }
    }
  }, [urlDestinationId, currentDestination]);

  // Debounced Autosave to localStorage
  const performSave = useCallback(() => {
    if (!currentDestination || days.length === 0) return;

    setIsSaving(true);
    const itineraryToSave: SavedItinerary = {
      id: currentItineraryId || `trip_${currentDestination.id}_${Date.now()}`,
      destinationId: currentDestination.id,
      destinationName: currentDestination.name,
      destinationState: currentDestination.state,
      destinationImage: currentDestination.heroImage,
      budgetTier: currentDestination.budgetRange,
      daysCount: days.length,
      days,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      travelStyle,
      pace,
    };

    saveItinerary(itineraryToSave);
    setSavedItineraries(getSavedItineraries());
    setLastSavedAt(new Date());
    setTimeout(() => {
      setIsSaving(false);
    }, 400);
  }, [currentDestination, days, currentItineraryId, travelStyle, pace]);

  // Trigger autosave when itinerary or configuration changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!currentDestination || days.length === 0) return;

    const timer = setTimeout(() => {
      performSave();
    }, 600);

    return () => clearTimeout(timer);
  }, [days, travelStyle, pace, durationDays, performSave]);

  // Handle Destination Change
  const handleSelectDestination = (newDest: Destination) => {
    setCurrentDestination(newDest);
    setSearchParams({ destination: newDest.id });
    const newDuration = newDest.idealDurationDays || 3;
    setDurationDays(newDuration);
    const starter = generateStarterItinerary(newDest, newDuration, pace, travelStyle);
    setDays(starter);
    setCurrentItineraryId(`trip_${newDest.id}_${Date.now()}`);
    setLastSavedAt(new Date());
    setIsSavedManual(false);
  };

  // Handle Duration Change (Adjusts day count accordingly)
  const handleDurationChange = (newDaysCount: number) => {
    if (!currentDestination || newDaysCount < 1) return;

    setDurationDays(newDaysCount);

    if (newDaysCount === days.length) return;

    if (newDaysCount < days.length) {
      // Trim to new count
      setDays((prev) => prev.slice(0, newDaysCount));
    } else {
      // Generate extra days to fill
      const fullRegenerated = generateStarterItinerary(
        currentDestination,
        newDaysCount,
        pace,
        travelStyle
      );
      const existingDays = [...days];
      for (let i = existingDays.length; i < newDaysCount; i++) {
        existingDays.push(fullRegenerated[i]);
      }
      setDays(existingDays);
    }
  };

  // Handle Add 1 Day
  const handleAddDay = () => {
    if (!currentDestination) return;
    const newCount = days.length + 1;
    handleDurationChange(newCount);
  };

  // Handle Pace Change (Regenerates slot count according to pace)
  const handlePaceChange = (newPace: TripPace) => {
    setPace(newPace);
    if (currentDestination) {
      const refreshed = generateStarterItinerary(
        currentDestination,
        durationDays,
        newPace,
        travelStyle
      );
      setDays(refreshed);
    }
  };

  // Handle Regenerate Itinerary (Resets to fresh starter plan)
  const handleRegenerateItinerary = () => {
    if (!currentDestination) return;
    const starter = generateStarterItinerary(
      currentDestination,
      durationDays,
      pace,
      travelStyle
    );
    setDays(starter);
  };

  // Add Activity to a specific Day
  const handleAddActivityToDay = (
    dayNumber: number,
    activityData: {
      title: string;
      category: ActivityCategory;
      description: string;
      timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
      duration?: string;
      location?: string;
    }
  ) => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.dayNumber === dayNumber) {
          const newSlot: ItinerarySlot = {
            id: `slot_${currentDestination?.id || 'custom'}_d${dayNumber}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            title: activityData.title,
            category: activityData.category,
            description: activityData.description,
            timeOfDay: activityData.timeOfDay,
            duration: activityData.duration || '2 hours',
            location: activityData.location || currentDestination?.name,
          };
          return {
            ...day,
            slots: [...(day.slots || []), newSlot],
          };
        }
        return day;
      })
    );
  };

  // Open Activity Library for a specific Day
  const handleOpenActivityLibraryForDay = (dayNum: number) => {
    setActivityLibraryTargetDay(dayNum);
    setIsActivityLibraryOpen(true);
  };

  // Remove a Slot from a Day
  const handleRemoveSlot = (dayNumber: number, slotIndex: number) => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.dayNumber === dayNumber) {
          const updatedSlots = [...(day.slots || [])];
          updatedSlots.splice(slotIndex, 1);
          return {
            ...day,
            slots: updatedSlots,
          };
        }
        return day;
      })
    );
  };

  // Move Slot up or down within a Day
  const handleMoveSlot = (dayNumber: number, fromIndex: number, toIndex: number) => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.dayNumber === dayNumber && day.slots) {
          if (toIndex < 0 || toIndex >= day.slots.length) return day;
          const updatedSlots = [...day.slots];
          const [movedItem] = updatedSlots.splice(fromIndex, 1);
          updatedSlots.splice(toIndex, 0, movedItem);
          return {
            ...day,
            slots: updatedSlots,
          };
        }
        return day;
      })
    );
  };

  // Change Time of Day for a Slot
  const handleChangeSlotTime = (
    dayNumber: number,
    slotIndex: number,
    time: 'Morning' | 'Afternoon' | 'Evening'
  ) => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.dayNumber === dayNumber && day.slots) {
          const updatedSlots = [...day.slots];
          updatedSlots[slotIndex] = {
            ...updatedSlots[slotIndex],
            timeOfDay: time,
          };
          return {
            ...day,
            slots: updatedSlots,
          };
        }
        return day;
      })
    );
  };

  // Update Day Notes
  const handleUpdateDayNotes = (dayNumber: number, notes: string) => {
    setDays((prevDays) =>
      prevDays.map((day) => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            notes,
          };
        }
        return day;
      })
    );
  };

  // Manual explicit Save Trip
  const handleManualSaveTrip = () => {
    performSave();
    setIsSavedManual(true);
    setTimeout(() => setIsSavedManual(false), 3000);
  };

  // Load Saved Itinerary from Drawer
  const handleLoadSavedItinerary = (itinerary: SavedItinerary) => {
    const dest = getDestinationById(itinerary.destinationId);
    if (dest) {
      setCurrentDestination(dest);
      setSearchParams({ destination: dest.id });
    }
    setDays(itinerary.days);
    setDurationDays(itinerary.daysCount);
    if (itinerary.travelStyle) setTravelStyle(itinerary.travelStyle);
    if (itinerary.pace) setPace(itinerary.pace);
    setCurrentItineraryId(itinerary.id);
    setLastSavedAt(new Date());
  };

  // Delete Saved Itinerary
  const handleDeleteSavedItinerary = (id: string) => {
    deleteSavedItinerary(id);
    setSavedItineraries(getSavedItineraries());
  };

  // Duplicate Saved Itinerary
  const handleDuplicateSavedItinerary = (itinerary: SavedItinerary) => {
    const duplicated: SavedItinerary = {
      ...itinerary,
      id: `trip_${itinerary.destinationId}_${Date.now()}`,
      destinationName: `${itinerary.destinationName} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveItinerary(duplicated);
    setSavedItineraries(getSavedItineraries());
  };

  // Total activities and estimated total cost calculations
  const totalActivitiesCount = useMemo(() => countTotalActivities(days), [days]);

  const budgetMetrics = useMemo(() => {
    if (!currentDestination) return { dailyCost: 0, totalCost: 0, formattedTotal: '₹0' };
    return calculateEstimatedTripBudget(currentDestination, days.length);
  }, [currentDestination, days.length]);

  return (
    <div className="min-h-screen bg-stone-50/50 pb-24">
      {/* 1. Planner Header */}
      <PlannerHeader
        destination={currentDestination}
        durationDays={days.length}
        totalActivitiesCount={totalActivitiesCount}
        onChangeDestinationClick={() => setIsDestinationSelectorOpen(true)}
        onOpenSavedTripsClick={() => setIsSavedTripsOpen(true)}
        savedTripsCount={savedItineraries.length}
        isSaving={isSaving}
        lastSavedAt={lastSavedAt}
      />

      {/* 2. Main Planner Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentDestination ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Timeline Column (7 Cols on desktop) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Trip Settings Panel */}
              <TripSettings
                durationDays={days.length}
                onDurationChange={handleDurationChange}
                travelStyle={travelStyle}
                onTravelStyleChange={setTravelStyle}
                pace={pace}
                onPaceChange={handlePaceChange}
                onRegenerateItinerary={handleRegenerateItinerary}
                hasPersonalizedRecommendation={Boolean(
                  userPreferences &&
                    (userPreferences.travelStyle === travelStyle ||
                      userPreferences.region === currentDestination.region)
                )}
              />

              {/* Day by Day Interactive Timeline */}
              <ItineraryTimeline
                days={days}
                onAddSlotClick={handleOpenActivityLibraryForDay}
                onRemoveSlot={handleRemoveSlot}
                onMoveSlot={handleMoveSlot}
                onChangeSlotTime={handleChangeSlotTime}
                onUpdateDayNotes={handleUpdateDayNotes}
                onAddDay={handleAddDay}
              />
            </div>

            {/* Right Sticky Sidebar Column (4 Cols on desktop) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <TripSummary
                destination={currentDestination}
                days={days}
                durationDays={days.length}
                travelStyle={travelStyle}
                pace={pace}
                totalCostFormatted={budgetMetrics.formattedTotal}
                totalActivitiesCount={totalActivitiesCount}
                userPreferences={userPreferences}
                onSaveTrip={handleManualSaveTrip}
                isSaved={isSavedManual}
              />
            </aside>
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <Compass className="w-12 h-12 text-orange-600 mx-auto" />
            <h2 className="text-2xl font-black text-slate-900">Select a Destination to Begin</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Choose an Indian destination from our curated repository to build your day-by-day smart itinerary.
            </p>
            <button
              type="button"
              onClick={() => setIsDestinationSelectorOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md"
            >
              <MapPin className="w-4 h-4" />
              <span>Browse Destinations</span>
            </button>
          </div>
        )}
      </main>

      {/* 3. Destination Selector Modal */}
      <DestinationSelector
        isOpen={isDestinationSelectorOpen}
        onClose={() => setIsDestinationSelectorOpen(false)}
        onSelect={handleSelectDestination}
        currentDestinationId={currentDestination?.id}
      />

      {/* 4. Activity Library Modal */}
      {currentDestination && (
        <ActivityLibrary
          isOpen={isActivityLibraryOpen}
          onClose={() => setIsActivityLibraryOpen(false)}
          destination={currentDestination}
          days={days}
          targetDayNumber={activityLibraryTargetDay}
          onAddActivityToDay={handleAddActivityToDay}
        />
      )}

      {/* 5. Saved Trips Slide-Out Drawer */}
      <SavedTripsDrawer
        isOpen={isSavedTripsOpen}
        onClose={() => setIsSavedTripsOpen(false)}
        savedItineraries={savedItineraries}
        onLoadItinerary={handleLoadSavedItinerary}
        onDeleteItinerary={handleDeleteSavedItinerary}
        onDuplicateItinerary={handleDuplicateSavedItinerary}
        currentItineraryId={currentItineraryId}
      />
    </div>
  );
}
