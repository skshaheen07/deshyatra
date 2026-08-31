import { SavedItinerary, UserPreferences } from '../types';

const FAVORITES_KEY = 'deshyatra_favorites';
const ITINERARIES_KEY = 'deshyatra_saved_itineraries';
const PREFERENCES_KEY = 'deshyatra_user_preferences';
const RECENT_SEARCHES_KEY = 'deshyatra_recent_searches';

// Custom event to sync favorites state across components without prop drilling
export const FAVORITES_CHANGE_EVENT = 'deshyatra:favorites_changed';
export const ITINERARY_CHANGE_EVENT = 'deshyatra:itinerary_changed';
export const PREFERENCES_CHANGE_EVENT = 'deshyatra:preferences_changed';

export const getStoredFavorites = (): string[] => {
  try {
    const item = localStorage.getItem(FAVORITES_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const isFavoriteDestination = (id: string): boolean => {
  const favorites = getStoredFavorites();
  return favorites.includes(id);
};

export const toggleFavoriteDestination = (id: string): boolean => {
  try {
    const current = getStoredFavorites();
    let updated: string[];
    let isFav: boolean;

    if (current.includes(id)) {
      updated = current.filter((item) => item !== id);
      isFav = false;
    } else {
      updated = [...current, id];
      isFav = true;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(FAVORITES_CHANGE_EVENT, { detail: { id, isFavorite: isFav } }));
    return isFav;
  } catch (error) {
    console.error('Error toggling favorite in localStorage:', error);
    return false;
  }
};

export const getSavedItineraries = (): SavedItinerary[] => {
  try {
    const item = localStorage.getItem(ITINERARIES_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    return Array.isArray(parsed)
      ? parsed.filter(
          (i) =>
            i &&
            typeof i === 'object' &&
            typeof i.id === 'string' &&
            typeof i.destinationId === 'string' &&
            Array.isArray(i.days)
        )
      : [];
  } catch (error) {
    console.error('Error reading itineraries from localStorage:', error);
    return [];
  }
};

export const getSavedItineraryById = (id: string): SavedItinerary | undefined => {
  const itineraries = getSavedItineraries();
  return itineraries.find((item) => item.id === id);
};

export const getSavedItineraryByDestination = (destinationId: string): SavedItinerary | undefined => {
  const itineraries = getSavedItineraries();
  return itineraries.find((item) => item.destinationId === destinationId);
};

export const saveItinerary = (itinerary: SavedItinerary): void => {
  try {
    const current = getSavedItineraries();
    const existingIndex = current.findIndex((i) => i.id === itinerary.id);
    let updated: SavedItinerary[];

    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = itinerary;
    } else {
      updated = [itinerary, ...current];
    }

    localStorage.setItem(ITINERARIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(ITINERARY_CHANGE_EVENT, { detail: itinerary }));
  } catch (error) {
    console.error('Error saving itinerary to localStorage:', error);
  }
};

export const deleteSavedItinerary = (id: string): void => {
  try {
    const current = getSavedItineraries();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(ITINERARIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(ITINERARY_CHANGE_EVENT, { detail: { deletedId: id } }));
  } catch (error) {
    console.error('Error deleting itinerary from localStorage:', error);
  }
};

export const getSavedUserPreferences = (): UserPreferences | null => {
  try {
    const item = localStorage.getItem(PREFERENCES_KEY);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (
      parsed &&
      typeof parsed === 'object' &&
      Array.isArray(parsed.interests) &&
      typeof parsed.budget === 'string' &&
      typeof parsed.duration === 'string' &&
      typeof parsed.travelStyle === 'string' &&
      typeof parsed.region === 'string'
    ) {
      return parsed as UserPreferences;
    }
    return null;
  } catch (error) {
    console.error('Error reading preferences from localStorage:', error);
    return null;
  }
};

export const saveUserPreferences = (prefs: UserPreferences): void => {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new CustomEvent(PREFERENCES_CHANGE_EVENT, { detail: prefs }));
  } catch (error) {
    console.error('Error saving preferences to localStorage:', error);
  }
};

export const getRecentSearches = (): string[] => {
  try {
    const item = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed.filter((q) => typeof q === 'string') : [];
  } catch (error) {
    return [];
  }
};

export const addRecentSearch = (query: string): void => {
  if (!query.trim()) return;
  try {
    const current = getRecentSearches();
    const filtered = current.filter((q) => q.toLowerCase() !== query.trim().toLowerCase());
    const updated = [query.trim(), ...filtered].slice(0, 6);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
};
