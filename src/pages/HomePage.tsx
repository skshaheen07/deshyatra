import React from 'react';
import HeroSection from '../components/home/HeroSection';
import QuickDiscovery from '../components/home/QuickDiscovery';
import PopularDestinations from '../components/home/PopularDestinations';
import ExperienceExplorer from '../components/home/ExperienceExplorer';
import RegionExplorer from '../components/home/RegionExplorer';
import TravelPersonalities from '../components/home/TravelPersonalities';
import PersonalizedDiscovery from '../components/home/PersonalizedDiscovery';
import CultureSection from '../components/home/CultureSection';
import FinalCTA from '../components/home/FinalCTA';

export default function HomePage() {
  return (
    <div id="homepage-root" className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* 1. Cinematic Hero Section with Quick Finder & Rotating Highlights */}
      <HeroSection />

      {/* 2. Live Interactive Preference Matcher Preview */}
      <QuickDiscovery />

      {/* 3. Handpicked Destinations & Region Filter Tabs */}
      <PopularDestinations />

      {/* 4. 10 Authentic Indian Travel Experience Themes */}
      <ExperienceExplorer />

      {/* 5. Explore India by 6 Distinct Geographical Regions */}
      <RegionExplorer />

      {/* 6. Discover Your Travel Personality Archetype */}
      <TravelPersonalities />

      {/* 7. How DeshYatra Works: Transparent 5-Factor Personalization Breakdown */}
      <PersonalizedDiscovery />

      {/* 8. Travel Beyond Places: Cuisines, Festivals & Cultural Etiquette */}
      <CultureSection />

      {/* 9. Final Call to Action & Trip Planner Launchpad */}
      <FinalCTA />
    </div>
  );
}
