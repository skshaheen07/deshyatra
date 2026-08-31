export type Region = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';

export type BudgetTier = 'Under ₹5,000' | '₹5,000–₹10,000' | '₹10,000–₹20,000' | '₹20,000+';

export type DurationOption = '1–2 days' | '3–4 days' | '5–7 days' | '7+ days';

export type TravelStyle =
  | 'Solo'
  | 'Couple'
  | 'Family'
  | 'Friends'
  | 'Adventure'
  | 'Relaxed'
  | 'Luxury'
  | 'Budget';

export type InterestType =
  | 'Nature'
  | 'Adventure'
  | 'Beaches'
  | 'Mountains'
  | 'Heritage'
  | 'Spiritual'
  | 'Food'
  | 'Culture'
  | 'Wildlife'
  | 'Photography'
  | 'Wellness'
  | 'Arts & Craft'
  | 'Rural & Offbeat';

export interface Attraction {
  name: string;
  type: string;
  description: string;
  timeNeeded: string;
  image?: string;
}

export interface LocalFood {
  name: string;
  description: string;
  isVeg: boolean;
  mustTryPlace?: string;
}

export interface CultureInfo {
  traditions: string;
  festivals: string[];
  languages: string[];
  etiquetteTips?: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  region: Region;
  tagline: string;
  description: string;
  categories: string[];
  interests: InterestType[];
  budgetRange: BudgetTier;
  estimatedCostPerDay: number;
  idealDuration: DurationOption;
  idealDurationDays: number;
  travelStyles: TravelStyle[];
  bestTime: string;
  peakMonths: string[];
  attractions: Attraction[];
  activities: string[];
  localFoods: LocalFood[];
  culture: CultureInfo;
  travelTips: string[];
  heroImage: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewsCount: number;
  featured?: boolean;
}

export interface UserPreferences {
  interests: InterestType[];
  budget: BudgetTier;
  duration: DurationOption;
  travelStyle: TravelStyle;
  region: Region | 'Anywhere in India';
}

export interface ScoreBreakdown {
  interestScore: number;
  budgetScore: number;
  durationScore: number;
  styleScore: number;
  regionScore: number;
}

export interface RecommendationResult {
  destination: Destination;
  score: number;
  breakdown: ScoreBreakdown;
  reasons: string[];
  matchedInterests: string[];
}

export interface StateData {
  id: string;
  name: string;
  region: Region;
  capital: string;
  description: string;
  heroImage: string;
  popularDestinations: string[]; // destination IDs
  famousCuisine: string[];
  culturalHighlights: string[];
  topExperiences: string[];
  bestTimeToVisit: string;
  fastFacts: {
    officialLanguage: string;
    knownAs: string;
    topFestival: string;
  };
}

export interface ExperienceCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  heroImage: string;
  matchingInterests: InterestType[];
  highlightDestinations: string[]; // destination IDs
}

export interface TravelPersonality {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  accentColor: string;
  dominantInterests: InterestType[];
  travelStyle: TravelStyle;
  recommendedDestinations: string[]; // destination IDs
  recommendedExperiences: string[];
  quote: string;
}

export interface ItinerarySlot {
  id?: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  category: 'Attraction' | 'Experience' | 'Food' | 'Culture' | 'Leisure';
  description: string;
  location?: string;
  costEstimate?: string;
  duration?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  slots: ItinerarySlot[];
  notes?: string;
}

export interface SavedItinerary {
  id: string;
  destinationId: string;
  destinationName: string;
  destinationState: string;
  destinationImage: string;
  budgetTier: string;
  daysCount: number;
  days: ItineraryDay[];
  createdAt: string;
  updatedAt?: string;
  travelStyle?: TravelStyle;
  pace?: 'Relaxed' | 'Balanced' | 'Packed';
  notes?: string;
}
