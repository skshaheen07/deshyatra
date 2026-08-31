import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, ArrowRight, Star, Flame, Layers } from 'lucide-react';
import { destinations } from '../../data';
import { Destination, Region } from '../../types';
import DestinationCard from '../common/DestinationCard';

type FilterTab = 'All' | 'North' | 'South' | 'West' | 'East & Northeast' | 'Central';

export default function PopularDestinations() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const tabs: { id: FilterTab; label: string; count: number }[] = useMemo(() => {
    return [
      { id: 'All', label: 'All Curated Gems', count: destinations.length },
      {
        id: 'North',
        label: 'North (Himalayas & Forts)',
        count: destinations.filter((d) => d.region === 'North').length,
      },
      {
        id: 'South',
        label: 'South (Ghats & Backwaters)',
        count: destinations.filter((d) => d.region === 'South').length,
      },
      {
        id: 'West',
        label: 'West (Deserts & Coast)',
        count: destinations.filter((d) => d.region === 'West').length,
      },
      {
        id: 'East & Northeast',
        label: 'East & Northeast (Forests & Hills)',
        count: destinations.filter((d) => d.region === 'East' || d.region === 'Northeast').length,
      },
      {
        id: 'Central',
        label: 'Central (Heart of India)',
        count: destinations.filter((d) => d.region === 'Central').length,
      },
    ];
  }, []);

  const filteredDestinations = useMemo(() => {
    let list: Destination[] = [];
    if (activeTab === 'All') {
      // Prioritize featured ones, then highest rating
      list = [...destinations].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
    } else if (activeTab === 'East & Northeast') {
      list = destinations.filter((d) => d.region === 'East' || d.region === 'Northeast');
    } else {
      list = destinations.filter((d) => d.region === activeTab);
    }
    return list.slice(0, 6);
  }, [activeTab]);

  return (
    <section id="popular-destinations-section" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 text-orange-600" />
              Handpicked Indian Journeys
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Iconic Destinations & Hidden Wonders
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              From the highest tea estates of the Western Ghats to living root bridges in Meghalaya, discover verified destinations with full cost and itinerary breakdowns.
            </p>
          </div>

          <Link
            to="/explore"
            id="popular-view-all-link"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-200 hover:border-orange-500 text-slate-900 font-bold text-sm shadow-xs hover:shadow transition-all group shrink-0"
          >
            <span>View All Destinations ({destinations.length})</span>
            <ArrowRight className="w-4 h-4 text-orange-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`popular-tab-${tab.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white hover:bg-stone-100 text-slate-700 border border-stone-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              featuredBadge={dest.featured ? 'Curated Gem' : undefined}
            />
          ))}
        </div>

        {/* Bottom Explore Bar */}
        <div className="mt-12 text-center">
          <Link
            to="/explore"
            id="popular-bottom-browse-btn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 transition-all hover:scale-[1.01] active:scale-[0.98]"
          >
            <Layers className="w-4 h-4" />
            <span>Explore All Indian Destinations with Smart Filters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
