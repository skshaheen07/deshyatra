import { TravelPersonality } from '../types';

export const personalities: TravelPersonality[] = [
  {
    id: 'nature-soul',
    title: 'The Nature Soul',
    subtitle: 'Quiet pine forests, misty valleys & serene landscapes',
    description:
      'You find peace in untouched landscapes, misty cloud forests, and gushing waterfalls. You prefer slow-paced travel away from urban chaos, listening to birdsong and soaking in emerald vistas.',
    badge: '🌿 Wilderness Seeker',
    accentColor: '#059669', // Emerald
    dominantInterests: ['Nature', 'Mountains', 'Photography', 'Rural & Offbeat'],
    travelStyle: 'Relaxed',
    recommendedDestinations: ['munnar', 'coorg', 'wayanad', 'shillong', 'meghalaya', 'darjeeling'],
    recommendedExperiences: ['mountains', 'nature', 'wellness'],
    quote: 'In every walk with nature, one receives far more than he seeks.',
  },
  {
    id: 'heritage-seeker',
    title: 'The Heritage Seeker',
    subtitle: 'Ancient stone tales, royal palaces & storied ruins',
    description:
      'You are captivated by the grandeur of bygone eras. Exploring century-old sandstone forts, UNESCO World Heritage monuments, royal darbars, and ancient temple carvings brings history to life for you.',
    badge: '🏰 History & Architecture',
    accentColor: '#B45309', // Amber Gold
    dominantInterests: ['Heritage', 'Culture', 'Arts & Craft', 'Photography'],
    travelStyle: 'Family',
    recommendedDestinations: ['jaipur', 'udaipur', 'hampi', 'agra', 'jaisalmer', 'varanasi', 'khajuraho'],
    recommendedExperiences: ['heritage', 'culture', 'arts'],
    quote: 'Architecture is frozen music, and India’s forts tell the grandest symphonies.',
  },
  {
    id: 'adventure-hunter',
    title: 'The Adventure Hunter',
    subtitle: 'High-octane rapids, rugged passes & backcountry treks',
    description:
      'You thrive on adrenaline and breathtaking outdoor challenges. Whether navigating class-IV Himalayan river rapids, mountain-biking high passes, or trekking across living root bridges, you seek thrills.',
    badge: '⚡ Adrenaline Thrills',
    accentColor: '#DC2626', // Crimson Red
    dominantInterests: ['Adventure', 'Mountains', 'Nature'],
    travelStyle: 'Adventure',
    recommendedDestinations: ['rishikesh', 'manali', 'leh', 'meghalaya', 'andaman', 'tawang'],
    recommendedExperiences: ['adventure', 'mountains', 'nature'],
    quote: 'Life begins at the end of your comfort zone.',
  },
  {
    id: 'beach-lover',
    title: 'The Beach Lover',
    subtitle: 'Golden coastal breezes, turquoise surf & sunset shacks',
    description:
      'The rhythm of ocean waves and salty sea air is your ideal holiday therapy. You love tropical coastlines, sea kayaking, coastal seafood feasts, and lounging under swaying coconut palms.',
    badge: '🌊 Coastal Wanderer',
    accentColor: '#0284C7', // Ocean Blue
    dominantInterests: ['Beaches', 'Food', 'Photography'],
    travelStyle: 'Relaxed',
    recommendedDestinations: ['goa', 'andaman', 'pondicherry', 'kochi'],
    recommendedExperiences: ['beaches', 'food', 'wellness'],
    quote: 'The ocean stirs the heart, inspires the imagination and brings eternal joy.',
  },
  {
    id: 'food-explorer',
    title: 'The Food Explorer',
    subtitle: 'Fiery coastal spices, fragrant biryanis & legendary street bites',
    description:
      'For you, the best way to understand a culture is through its kitchen. You chase centuries-old royal recipes, fragrant spice bazaars, crispy street snacks, and authentic regional home cooking.',
    badge: '🍲 Culinary Connoisseur',
    accentColor: '#EA580C', // Saffron Orange
    dominantInterests: ['Food', 'Culture', 'Heritage'],
    travelStyle: 'Friends',
    recommendedDestinations: ['hyderabad', 'amritsar', 'mumbai', 'kolkata', 'kochi', 'jaipur', 'delhi'],
    recommendedExperiences: ['food', 'culture', 'heritage'],
    quote: 'To travel India is to feast through thousands of unique flavor profiles.',
  },
  {
    id: 'spiritual-traveller',
    title: 'The Spiritual Traveller',
    subtitle: 'Sacred river ghats, monastic chants & peaceful mindfulness',
    description:
      'You travel to reflect, heal, and connect with higher consciousness. The holy chants of the evening Ganga Aarti, quiet meditation in Himalayan monasteries, and traditional yoga sanctuaries resonate with your soul.',
    badge: '🪔 Soul & Serenity',
    accentColor: '#7C3AED', // Violet
    dominantInterests: ['Spiritual', 'Wellness', 'Culture'],
    travelStyle: 'Solo',
    recommendedDestinations: ['varanasi', 'rishikesh', 'amritsar', 'puri', 'hampi', 'dharamshala'],
    recommendedExperiences: ['spiritual', 'wellness', 'heritage'],
    quote: 'Travel makes one modest. You see what a tiny place you occupy in the world.',
  },
  {
    id: 'the-explorer',
    title: 'The Explorer',
    subtitle: 'Off-grid tribal trails, hidden valleys & authentic discoveries',
    description:
      'Curious, spontaneous, and independent. You love unscripted journeys, exploring untouched tribal hamlets in the Northeast, discovering ancient craft techniques, and taking the road less travelled.',
    badge: '🧭 Offbeat Trailblazer',
    accentColor: '#0D9488', // Teal
    dominantInterests: ['Rural & Offbeat', 'Culture', 'Photography', 'Nature'],
    travelStyle: 'Solo',
    recommendedDestinations: ['meghalaya', 'tawang', 'shillong', 'wayanad', 'kutch', 'kanha'],
    recommendedExperiences: ['nature', 'culture', 'adventure'],
    quote: 'Not all those who wander are lost.',
  },
];

export const getPersonalityById = (id: string): TravelPersonality | undefined => {
  return personalities.find((p) => p.id.toLowerCase() === id.toLowerCase());
};

/**
 * Derives the dominant travel personality based on a list of selected interests
 */
export const derivePersonalityFromInterests = (interests: string[]): TravelPersonality => {
  if (!interests.length) return personalities[0];

  let bestMatch = personalities[0];
  let highestOverlap = -1;

  for (const personality of personalities) {
    const overlap = personality.dominantInterests.filter((di) =>
      interests.some((ui) => ui.toLowerCase() === di.toLowerCase())
    ).length;

    if (overlap > highestOverlap) {
      highestOverlap = overlap;
      bestMatch = personality;
    }
  }

  return bestMatch;
};
