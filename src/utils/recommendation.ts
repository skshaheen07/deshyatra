import {
  BudgetTier,
  Destination,
  DurationOption,
  InterestType,
  RecommendationResult,
  Region,
  ScoreBreakdown,
  TravelStyle,
  UserPreferences,
} from '../types';

/**
 * Normalizes budget tier to numeric weight for distance calculation
 */
const budgetTierOrder: Record<BudgetTier, number> = {
  'Under ₹5,000': 1,
  '₹5,000–₹10,000': 2,
  '₹10,000–₹20,000': 3,
  '₹20,000+': 4,
};

/**
 * Normalizes duration to numeric scale for compatibility checking
 */
const durationTierOrder: Record<DurationOption, number> = {
  '1–2 days': 1,
  '3–4 days': 2,
  '5–7 days': 3,
  '7+ days': 4,
};

/**
 * Calculates interest match score (0 - 35 points)
 */
export function calculateInterestScore(
  userInterests: InterestType[],
  destinationInterests: InterestType[]
): { score: number; matched: InterestType[] } {
  if (!userInterests.length) {
    return { score: 30, matched: [] }; // neutral default
  }

  const matched = userInterests.filter((interest) =>
    destinationInterests.some((di) => di.toLowerCase() === interest.toLowerCase())
  );

  // Ratio of user interests fulfilled by destination
  const fulfillmentRatio = matched.length / userInterests.length;
  // Extra bonus if destination has deep interest overlap
  const depthBonus = matched.length >= 3 ? 1.0 : matched.length === 2 ? 0.9 : matched.length === 1 ? 0.75 : 0.2;

  const rawScore = (fulfillmentRatio * 0.7 + depthBonus * 0.3) * 35;
  return {
    score: Math.min(35, Math.max(0, Math.round(rawScore))),
    matched,
  };
}

/**
 * Calculates budget compatibility score (0 - 20 points)
 */
export function calculateBudgetScore(
  userBudget: BudgetTier,
  destinationBudget: BudgetTier
): number {
  const userRank = budgetTierOrder[userBudget] || 2;
  const destRank = budgetTierOrder[destinationBudget] || 2;

  // Exact match
  if (userRank === destRank) return 20;

  // User has higher budget than destination needs (great fit, destination is affordable!)
  if (userRank > destRank) {
    const diff = userRank - destRank;
    return diff === 1 ? 19 : 17;
  }

  // User has lower budget than destination usually requires
  const deficit = destRank - userRank;
  if (deficit === 1) return 12; // can be done on a stretch
  if (deficit === 2) return 6;
  return 3;
}

/**
 * Calculates duration compatibility score (0 - 15 points)
 */
export function calculateDurationScore(
  userDuration: DurationOption,
  destDuration: DurationOption
): number {
  const userRank = durationTierOrder[userDuration] || 2;
  const destRank = durationTierOrder[destDuration] || 2;

  if (userRank === destRank) return 15;

  const diff = Math.abs(userRank - destRank);
  if (diff === 1) return 12;
  if (diff === 2) return 7;
  return 3;
}

/**
 * Calculates travel style compatibility score (0 - 15 points)
 */
export function calculateTravelStyleScore(
  userStyle: TravelStyle,
  destStyles: TravelStyle[]
): number {
  if (!userStyle) return 12;

  const directMatch = destStyles.includes(userStyle);
  if (directMatch) return 15;

  // Compatible neighbor styles
  const compatibilityMap: Record<TravelStyle, TravelStyle[]> = {
    Solo: ['Adventure', 'Relaxed', 'Budget'],
    Couple: ['Relaxed', 'Luxury', 'Solo'],
    Family: ['Relaxed', 'Culture', 'Luxury'] as unknown as TravelStyle[],
    Friends: ['Adventure', 'Budget', 'Relaxed'],
    Adventure: ['Solo', 'Friends', 'Budget'],
    Relaxed: ['Couple', 'Family', 'Luxury'],
    Luxury: ['Couple', 'Relaxed', 'Family'],
    Budget: ['Solo', 'Friends', 'Adventure'],
  };

  const adjacent = compatibilityMap[userStyle] || [];
  const hasAdjacent = adjacent.some((adj) => destStyles.includes(adj));

  return hasAdjacent ? 10 : 5;
}

/**
 * Calculates region compatibility score (0 - 15 points)
 */
export function calculateRegionScore(
  userRegion: Region | 'Anywhere in India',
  destRegion: Region
): number {
  if (!userRegion || userRegion === 'Anywhere in India') {
    return 15; // Full points when flexible
  }

  return userRegion === destRegion ? 15 : 2;
}

/**
 * Generates clear, human-understandable match reasons
 */
export function getMatchReasons(
  destination: Destination,
  prefs: UserPreferences,
  breakdown: ScoreBreakdown,
  matchedInterests: InterestType[]
): string[] {
  const reasons: string[] = [];

  // Interest match reason
  if (matchedInterests.length > 0) {
    if (matchedInterests.length >= 3) {
      reasons.push(
        `Exceptional match for your ${matchedInterests.slice(0, 3).join(', ')} interests.`
      );
    } else if (matchedInterests.length === 2) {
      reasons.push(`Top destination for ${matchedInterests.join(' and ')} enthusiasts.`);
    } else {
      reasons.push(`Great place to explore ${matchedInterests[0]}.`);
    }
  }

  // Duration reason
  if (prefs.duration === destination.idealDuration) {
    reasons.push(`Ideal for a ${prefs.duration} itinerary without feeling rushed.`);
  } else if (breakdown.durationScore >= 12) {
    reasons.push(`Easily tailored to your ${prefs.duration} schedule.`);
  }

  // Budget reason
  if (prefs.budget === destination.budgetRange) {
    reasons.push(`Fits comfortably within your ${prefs.budget} budget.`);
  } else if (breakdown.budgetScore >= 17) {
    reasons.push(`Very economical — easily stays under your ${prefs.budget} tier.`);
  }

  // Region reason
  if (prefs.region === destination.region) {
    reasons.push(`Located in ${destination.region} India (${destination.state}) as selected.`);
  } else if (prefs.region === 'Anywhere in India') {
    reasons.push(`A premier highlight of ${destination.region} India.`);
  }

  // Travel style reason
  if (destination.travelStyles.includes(prefs.travelStyle)) {
    reasons.push(`Perfect atmosphere for ${prefs.travelStyle.toLowerCase()} travelers.`);
  }

  // Fallback if sparse
  if (reasons.length === 0) {
    reasons.push(`Renowned for ${destination.activities.slice(0, 2).join(' and ')}.`);
  }

  return reasons;
}

/**
 * Calculates complete score and breakdown for a destination
 */
export function calculateDestinationScore(
  destination: Destination,
  preferences: UserPreferences
): RecommendationResult {
  const { score: interestScore, matched: matchedInterests } = calculateInterestScore(
    preferences.interests,
    destination.interests
  );

  const budgetScore = calculateBudgetScore(preferences.budget, destination.budgetRange);
  const durationScore = calculateDurationScore(preferences.duration, destination.idealDuration);
  const styleScore = calculateTravelStyleScore(preferences.travelStyle, destination.travelStyles);
  const regionScore = calculateRegionScore(preferences.region, destination.region);

  const totalRaw = interestScore + budgetScore + durationScore + styleScore + regionScore;
  // Normalized 0-100 score (sum of max weights: 35 + 20 + 15 + 15 + 15 = 100)
  const score = Math.min(99, Math.max(25, Math.round(totalRaw)));

  const breakdown: ScoreBreakdown = {
    interestScore,
    budgetScore,
    durationScore,
    styleScore,
    regionScore,
  };

  const reasons = getMatchReasons(destination, preferences, breakdown, matchedInterests);

  return {
    destination,
    score,
    breakdown,
    reasons,
    matchedInterests,
  };
}

/**
 * Ranks all destinations based on user preferences
 */
export function getRecommendations(
  destinations: Destination[],
  preferences: UserPreferences
): RecommendationResult[] {
  const results = destinations.map((dest) => calculateDestinationScore(dest, preferences));

  // Sort descending by score, tiebreak by rating
  return results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.destination.rating - a.destination.rating;
  });
}
