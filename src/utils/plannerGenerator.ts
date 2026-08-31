import { Destination, ItineraryDay, ItinerarySlot, TravelStyle } from '../types';

export type ActivityCategory = 'Attraction' | 'Experience' | 'Food' | 'Culture' | 'Leisure';
export type TripPace = 'Relaxed' | 'Balanced' | 'Packed';

export interface LibraryActivity {
  id: string;
  title: string;
  category: ActivityCategory;
  description: string;
  duration?: string;
  image?: string;
  badge?: string;
  recommendedTime: 'Morning' | 'Afternoon' | 'Evening';
  source: 'attraction' | 'activity' | 'food' | 'culture';
}

const DEFAULT_DAY_THEMES = [
  'Iconic Landmarks & Orientation',
  'Signature Trails & Scenic Wonders',
  'Cultural Heritage & Historic Heart',
  'Local Flavors & Hidden Corners',
  'Panoramic Byways & Leisurely Discovery',
  'Artisan Workshops & Living Traditions',
  'Grand Finale & Sunset Vistas',
  'Offbeat Expeditions & Deep Immersion',
];

/**
 * Extracts all schedulable activities, attractions, culinary trails, and cultural experiences
 * for a destination into a uniform Activity Library.
 */
export function getDestinationActivityLibrary(destination: Destination): LibraryActivity[] {
  const library: LibraryActivity[] = [];

  // 1. Attractions
  destination.attractions.forEach((attraction, idx) => {
    let recTime: 'Morning' | 'Afternoon' | 'Evening' = 'Morning';
    if (idx === 1) recTime = 'Afternoon';
    if (idx >= 2) recTime = idx % 2 === 0 ? 'Morning' : 'Afternoon';

    library.push({
      id: `attr_${destination.id}_${idx}`,
      title: attraction.name,
      category: 'Attraction',
      description: attraction.description,
      duration: attraction.timeNeeded || '2–3 hours',
      image: attraction.image || (idx === 0 ? destination.heroImage : undefined),
      badge: attraction.type || 'Landmark',
      recommendedTime: recTime,
      source: 'attraction',
    });
  });

  // 2. Signature Activities & Experiences
  destination.activities.forEach((act, idx) => {
    let recTime: 'Morning' | 'Afternoon' | 'Evening' = 'Afternoon';
    if (act.toLowerCase().includes('sunrise') || act.toLowerCase().includes('morning') || act.toLowerCase().includes('safari') || act.toLowerCase().includes('trek')) {
      recTime = 'Morning';
    } else if (act.toLowerCase().includes('sunset') || act.toLowerCase().includes('night') || act.toLowerCase().includes('dinner') || act.toLowerCase().includes('aarti')) {
      recTime = 'Evening';
    }

    library.push({
      id: `act_${destination.id}_${idx}`,
      title: act,
      category: 'Experience',
      description: `Experience the finest signature adventure and outdoor highlight of ${destination.name}.`,
      duration: '1.5–3 hours',
      badge: 'Signature Experience',
      recommendedTime: recTime,
      source: 'activity',
    });
  });

  // 3. Local Foods & Culinary Delights
  destination.localFoods.forEach((food, idx) => {
    library.push({
      id: `food_${destination.id}_${idx}`,
      title: `Taste ${food.name}`,
      category: 'Food',
      description: `${food.description}${food.mustTryPlace ? ` (Recommended at: ${food.mustTryPlace})` : ''}`,
      duration: '1–1.5 hours',
      badge: food.isVeg ? 'Vegetarian Specialty' : 'Local Delicacy',
      recommendedTime: idx % 2 === 0 ? 'Evening' : 'Afternoon',
      source: 'food',
    });
  });

  // 4. Cultural Traditions & Heritage
  if (destination.culture) {
    if (destination.culture.traditions) {
      library.push({
        id: `cult_${destination.id}_traditions`,
        title: `${destination.name} Cultural Stroll & Traditions`,
        category: 'Culture',
        description: destination.culture.traditions,
        duration: '2 hours',
        badge: 'Cultural Immersion',
        recommendedTime: 'Evening',
        source: 'culture',
      });
    }

    if (destination.culture.festivals && destination.culture.festivals.length > 0) {
      library.push({
        id: `cult_${destination.id}_festivals`,
        title: `Explore Festive Heritage (${destination.culture.festivals[0]})`,
        category: 'Culture',
        description: `Discover the vibrant festival history, folklore, and celebratory customs of ${destination.name}: ${destination.culture.festivals.join(', ')}.`,
        duration: '1.5 hours',
        badge: 'Heritage & Arts',
        recommendedTime: 'Evening',
        source: 'culture',
      });
    }
  }

  return library;
}

/**
 * Deterministically generates a day-by-day starter itinerary based on available destination data,
 * duration days count, and travel pace.
 */
export function generateStarterItinerary(
  destination: Destination,
  daysCount: number,
  pace: TripPace = 'Balanced',
  travelStyle: TravelStyle = 'Relaxed'
): ItineraryDay[] {
  const library = getDestinationActivityLibrary(destination);
  const attractions = library.filter((i) => i.source === 'attraction');
  const activities = library.filter((i) => i.source === 'activity');
  const foods = library.filter((i) => i.source === 'food');
  const cultures = library.filter((i) => i.source === 'culture');

  const days: ItineraryDay[] = [];

  // Determine target slots per day based on pace
  // Relaxed: 2 items/day (Morning, Evening)
  // Balanced: 3 items/day (Morning, Afternoon, Evening)
  // Packed: 4 items/day (Early Morning, Morning/Midday, Afternoon, Evening)
  const itemsPerDay = pace === 'Relaxed' ? 2 : pace === 'Balanced' ? 3 : 4;

  let attrPointer = 0;
  let actPointer = 0;
  let foodPointer = 0;
  let cultPointer = 0;

  for (let dayIndex = 0; dayIndex < daysCount; dayIndex++) {
    const dayNum = dayIndex + 1;
    const theme = DEFAULT_DAY_THEMES[dayIndex % DEFAULT_DAY_THEMES.length];
    const slots: ItinerarySlot[] = [];

    // Morning Slot
    let morningItem: LibraryActivity | undefined;
    if (attractions.length > 0) {
      morningItem = attractions[attrPointer % attractions.length];
      attrPointer++;
    } else if (activities.length > 0) {
      morningItem = activities[actPointer % activities.length];
      actPointer++;
    }

    if (morningItem) {
      slots.push({
        id: `slot_${destination.id}_d${dayNum}_1_${Math.random().toString(36).substring(2, 7)}`,
        timeOfDay: 'Morning',
        title: morningItem.title,
        category: morningItem.category,
        description: morningItem.description,
        duration: morningItem.duration || '2–3 hours',
        location: destination.name,
      });
    }

    // Afternoon Slot (Included in Balanced and Packed)
    if (itemsPerDay >= 3) {
      let afternoonItem: LibraryActivity | undefined;
      if (activities.length > 0) {
        afternoonItem = activities[actPointer % activities.length];
        actPointer++;
      } else if (attractions.length > attrPointer) {
        afternoonItem = attractions[attrPointer % attractions.length];
        attrPointer++;
      } else if (foods.length > 0) {
        afternoonItem = foods[foodPointer % foods.length];
        foodPointer++;
      }

      if (afternoonItem) {
        slots.push({
          id: `slot_${destination.id}_d${dayNum}_2_${Math.random().toString(36).substring(2, 7)}`,
          timeOfDay: 'Afternoon',
          title: afternoonItem.title,
          category: afternoonItem.category,
          description: afternoonItem.description,
          duration: afternoonItem.duration || '2 hours',
          location: destination.name,
        });
      }
    }

    // Additional Midday / Afternoon Activity for Packed Pace
    if (itemsPerDay >= 4) {
      let packedExtra: LibraryActivity | undefined;
      if (attractions.length > attrPointer) {
        packedExtra = attractions[attrPointer % attractions.length];
        attrPointer++;
      } else if (activities.length > actPointer) {
        packedExtra = activities[actPointer % activities.length];
        actPointer++;
      } else if (cultures.length > cultPointer) {
        packedExtra = cultures[cultPointer % cultures.length];
        cultPointer++;
      }

      if (packedExtra) {
        slots.push({
          id: `slot_${destination.id}_d${dayNum}_3_${Math.random().toString(36).substring(2, 7)}`,
          timeOfDay: 'Afternoon',
          title: packedExtra.title,
          category: packedExtra.category,
          description: packedExtra.description,
          duration: packedExtra.duration || '1.5 hours',
          location: destination.name,
        });
      }
    }

    // Evening Slot
    let eveningItem: LibraryActivity | undefined;
    if (dayIndex % 2 === 0 && foods.length > 0) {
      eveningItem = foods[foodPointer % foods.length];
      foodPointer++;
    } else if (cultures.length > 0) {
      eveningItem = cultures[cultPointer % cultures.length];
      cultPointer++;
    } else if (activities.length > 0) {
      eveningItem = activities[actPointer % activities.length];
      actPointer++;
    } else if (foods.length > 0) {
      eveningItem = foods[foodPointer % foods.length];
      foodPointer++;
    }

    if (eveningItem) {
      slots.push({
        id: `slot_${destination.id}_d${dayNum}_e_${Math.random().toString(36).substring(2, 7)}`,
        timeOfDay: 'Evening',
        title: eveningItem.title,
        category: eveningItem.category,
        description: eveningItem.description,
        duration: eveningItem.duration || '1.5–2 hours',
        location: destination.name,
      });
    }

    days.push({
      dayNumber: dayNum,
      title: `Day ${dayNum}`,
      theme,
      slots,
      notes: '',
    });
  }

  return days;
}

/**
 * Calculates estimated trip budget based on daily average cost
 */
export function calculateEstimatedTripBudget(destination: Destination, daysCount: number): {
  dailyCost: number;
  totalCost: number;
  formattedTotal: string;
} {
  const dailyCost = destination.estimatedCostPerDay || 2500;
  const totalCost = dailyCost * Math.max(1, daysCount);
  return {
    dailyCost,
    totalCost,
    formattedTotal: `₹${totalCost.toLocaleString('en-IN')}`,
  };
}

/**
 * Counts total activities scheduled across all days
 */
export function countTotalActivities(days: ItineraryDay[]): number {
  return days.reduce((sum, day) => sum + (day.slots ? day.slots.length : 0), 0);
}

/**
 * Helper to check if a specific library activity title is already in the itinerary
 */
export function isActivityInItinerary(title: string, days: ItineraryDay[]): boolean {
  const cleanTitle = title.trim().toLowerCase();
  for (const day of days) {
    if (day.slots) {
      for (const slot of day.slots) {
        if (slot.title.trim().toLowerCase() === cleanTitle) {
          return true;
        }
      }
    }
  }
  return false;
}
