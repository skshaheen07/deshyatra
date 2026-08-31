import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import { Destination } from '../../types';
import { destinations } from '../../data/destinations';
import DestinationCard from '../common/DestinationCard';

interface RelatedDestinationsProps {
  currentDestination: Destination;
}

export default function RelatedDestinations({ currentDestination }: RelatedDestinationsProps) {
  // Deterministic related destinations algorithm:
  // 1. Same region (+3 points)
  // 2. Each overlapping interest (+2 points)
  // 3. Same state (+2 points)
  // 4. Each overlapping travel style (+1 point)
  // Exclude currentDestination.id
  const relatedList = destinations
    .filter((d) => d.id !== currentDestination.id)
    .map((dest) => {
      let score = 0;
      if (dest.region === currentDestination.region) score += 3;
      if (dest.state === currentDestination.state) score += 2;

      // Intersect interests
      const commonInterests = dest.interests.filter((i) =>
        currentDestination.interests.includes(i)
      );
      score += commonInterests.length * 2;

      // Intersect styles
      const commonStyles = dest.travelStyles.filter((s) =>
        currentDestination.travelStyles.includes(s)
      );
      score += commonStyles.length;

      return {
        destination: dest,
        score,
      };
    })
    .sort((a, b) => b.score - a.score || b.destination.rating - a.destination.rating)
    .slice(0, 3)
    .map((item) => item.destination);

  if (relatedList.length === 0) {
    return null;
  }

  return (
    <section id="related" className="scroll-mt-28 py-12 sm:py-16">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-950 text-xs font-black uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-orange-600" />
              <span>Continue Exploring</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              You Might Also Like
            </h2>
            <p className="text-sm text-slate-600">
              Similar destinations in {currentDestination.region} India with matching landscapes and travel vibes.
            </p>
          </div>

          <Link
            to={`/explore?region=${currentDestination.region.toLowerCase()}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <span>Explore more in {currentDestination.region} India</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedList.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              featuredBadge={dest.region === currentDestination.region ? `${dest.region} India` : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
