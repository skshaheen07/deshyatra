import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  Compass,
  Sparkles,
  Mountain,
  Palmtree,
  Landmark,
  Trees,
  CheckCircle2,
} from 'lucide-react';
import { Region } from '../../types';
import { states, destinations } from '../../data';

interface RegionInfo {
  id: Region;
  name: string;
  tagline: string;
  description: string;
  image: string;
  signatureHighlights: string[];
  climate: string;
  bestMonths: string;
}

const REGION_DATA: RegionInfo[] = [
  {
    id: 'North',
    name: 'North India',
    tagline: 'Snowcapped Himalayan Peaks, Sacred River Valleys & Regal Forts',
    description:
      'From the towering heights of Ladakh and Rohtang Pass to the historic sandstone forts of Rajasthan and the spiritual riverbanks of the Ganges in Varanasi.',
    image:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    signatureHighlights: ['Himalayan High Passes', 'Sandstone Desert Fortresses', 'Ganga Aarti Ghats', 'Royal Haveli Palaces'],
    climate: 'Cool Alpine in Mountains, Semi-Arid in Plains',
    bestMonths: 'October to March (Plains), May to September (Ladakh)',
  },
  {
    id: 'South',
    name: 'South India',
    tagline: 'Emerald Backwaters, Western Ghats Tea & Ancient Dravidian Temples',
    description:
      'Lush tropical greenery, tranquil coconut-fringed lagoons in Kerala, spice plantations in Coorg, and the monumental boulder ruins of the Vijayanagara Empire in Hampi.',
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    signatureHighlights: ['Kerala Houseboat Cruises', 'High-Altitude Tea Estates', 'UNESCO Boulder Ruins in Hampi', 'Ayurvedic Sanctuaries'],
    climate: 'Tropical & Maritime with Cool Hill Stations',
    bestMonths: 'September to March',
  },
  {
    id: 'West',
    name: 'West India',
    tagline: 'Sun-Drenched Arabian Beaches, White Salt Marshes & Coastal Forts',
    description:
      'Experience the golden sands and Portuguese churches of Goa, the vibrant white salt deserts of Kutch, and the bustling energy of Mumbai and Gujarat.',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    signatureHighlights: ['Sunset Beach Shacks', 'Rann of Kutch Salt Flats', 'Seafood Gastronomy', 'Heritage Colonial Quarters'],
    climate: 'Coastal Warmth & Desert Aridity',
    bestMonths: 'November to February',
  },
  {
    id: 'East',
    name: 'East India',
    tagline: 'Colonial Architecture, Himalayan Tea Foothills & Sacred Deltas',
    description:
      'Discover the colonial charm of Kolkata, toy train climbs up to Darjeeling overlooking Kanchenjunga, and ancient Buddhist shrines in Bodhgaya.',
    image:
      'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
    signatureHighlights: ['Darjeeling Himalayan Railway', 'Kolkata Street Food & Art', 'Bodhgaya Enlightenment Shrines', 'Mangrove Tigers'],
    climate: 'Humid Subtropical & Himalayan Temperate',
    bestMonths: 'October to March',
  },
  {
    id: 'Northeast',
    name: 'Northeast India',
    tagline: 'Living Root Bridges, Seven Sisters & Cloud-Clad Monasteries',
    description:
      'India’s most pristine frontier: double-decker living root bridges in Meghalaya, one-horned rhinos in Kaziranga, and cliffside Buddhist monasteries in Tawang.',
    image:
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    signatureHighlights: ['Living Root Bridges', 'Kaziranga Rhino Safaris', 'Tawang High Monasteries', 'Crystal Clear Dawki River'],
    climate: 'Alpine, Cloud Forests & Heavy Monsoon',
    bestMonths: 'October to April',
  },
  {
    id: 'Central',
    name: 'Central India',
    tagline: 'The Heart of India, Ancient Rock Art & Dense Teak Tiger Reserves',
    description:
      'Dense sal forests where tigers roam freely in Kanha and Bandhavgarh, UNESCO erotic temple carvings in Khajuraho, and peaceful hill stations in Pachmarhi.',
    image:
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    signatureHighlights: ['Open Gypsy Tiger Safaris', 'Khajuraho UNESCO Temples', 'Marble Rocks at Bhedaghat', 'Gond Tribal Art'],
    climate: 'Continental & Tropical Savannah',
    bestMonths: 'October to April',
  },
];

export default function RegionExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('North');

  const currentRegion = REGION_DATA.find((r) => r.id === selectedRegion) || REGION_DATA[0];
  const regionStates = states.filter((s) => s.region === selectedRegion);
  const regionDestinations = destinations.filter((d) => d.region === selectedRegion);

  return (
    <section id="region-explorer-section" className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              Geographical Diversity
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore India by Region
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              From the highest peaks of the Himalayas to the southernmost tips of the Indian Ocean, each region carries unique culture, cuisine, and topography.
            </p>
          </div>

          <Link
            to="/states"
            id="region-view-states-link"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-200 hover:border-orange-500 text-slate-900 font-bold text-sm shadow-xs hover:shadow transition-all group shrink-0"
          >
            <span>View All 28 States & UTs</span>
            <ArrowRight className="w-4 h-4 text-orange-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {REGION_DATA.map((region) => (
            <button
              key={region.id}
              id={`region-tab-${region.id.toLowerCase()}`}
              onClick={() => setSelectedRegion(region.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2.5 ${
                selectedRegion === region.id
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'bg-white hover:bg-stone-100 text-slate-700 border border-stone-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{region.name}</span>
            </button>
          ))}
        </div>

        {/* Active Region Feature Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Rich Region Media Banner */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[460px]">
            <img
              src={currentRegion.image}
              alt={currentRegion.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-600/90 text-white inline-block">
                {currentRegion.id} Zone
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">{currentRegion.name}</h3>
              <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
                {currentRegion.tagline}
              </p>
            </div>
          </div>

          {/* Right Column: Deep Regional Breakdown */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                About the Region
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentRegion.description}
              </p>

              {/* Climate & Best Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 p-4 rounded-2xl bg-stone-50 border border-stone-100 text-xs">
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">
                    Typical Climate
                  </span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">
                    {currentRegion.climate}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase tracking-wider block text-[10px]">
                    Prime Visiting Window
                  </span>
                  <span className="font-semibold text-orange-700 mt-0.5 block">
                    {currentRegion.bestMonths}
                  </span>
                </div>
              </div>

              {/* Signature Highlights */}
              <div className="mt-5">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-2.5">
                  Signature Regional Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentRegion.signatureHighlights.map((hl) => (
                    <div key={hl} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick States / Destinations Strip */}
            <div className="pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">
                <strong className="text-slate-900 font-bold">{regionDestinations.length} Curated Places</strong> in {regionStates.length} States & UTs
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/explore?region=${encodeURIComponent(currentRegion.id)}`}
                  id={`explore-region-btn-${currentRegion.id.toLowerCase()}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  <span>Filter {currentRegion.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
