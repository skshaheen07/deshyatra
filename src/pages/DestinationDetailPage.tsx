import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  ArrowLeft,
  Compass,
  Sparkles,
  Search,
} from 'lucide-react';
import { getDestinationById } from '../data/destinations';
import DestinationHero from '../components/destination/DestinationHero';
import DestinationSnapshot from '../components/destination/DestinationSnapshot';
import DestinationNav from '../components/destination/DestinationNav';
import DestinationAbout from '../components/destination/DestinationAbout';
import DestinationMatch from '../components/destination/DestinationMatch';
import DestinationActivities from '../components/destination/DestinationActivities';
import DestinationFood from '../components/destination/DestinationFood';
import DestinationCulture from '../components/destination/DestinationCulture';
import DestinationTips from '../components/destination/DestinationTips';
import DestinationGallery from '../components/destination/DestinationGallery';
import RelatedDestinations from '../components/destination/RelatedDestinations';

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const destination = id ? getDestinationById(id) : undefined;

  // Scroll to top upon ID change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Handle Invalid / Not Found Destination gracefully
  if (!destination) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-stone-50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
            <MapPin className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-orange-600">
              404 — Location Notice
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Destination Not Found
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              We couldn&apos;t locate a destination matching <code className="px-2 py-0.5 rounded-md bg-stone-100 font-mono text-xs text-orange-700 font-bold">&quot;{id}&quot;</code> in our curated India database.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/explore"
              id="not-found-explore-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Destinations</span>
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50 pb-20">
      {/* 1. Immersive Hero */}
      <DestinationHero destination={destination} />

      {/* 2. Destination Snapshot Strip */}
      <DestinationSnapshot destination={destination} />

      {/* 3. In-page Sticky Navigation */}
      <DestinationNav />

      {/* 4. Main Editorial Content Sections Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About & Why You'll Love It */}
        <DestinationAbout destination={destination} />

        {/* Personalized 5-Factor Match Engine */}
        <DestinationMatch destination={destination} />

        {/* Things to Do & Signature Activities */}
        <DestinationActivities destination={destination} />

        {/* Local Culinary Heritage */}
        <DestinationFood destination={destination} />

        {/* Culture, Customs, Traditions & Etiquette */}
        <DestinationCulture destination={destination} />

        {/* Best Time & Practical Travel Advice */}
        <DestinationTips destination={destination} />

        {/* Visual Photo Gallery */}
        <DestinationGallery destination={destination} />

        {/* Related & Nearby Recommendations */}
        <RelatedDestinations currentDestination={destination} />
      </main>
    </div>
  );
}
