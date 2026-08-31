import React, { useState, useMemo } from 'react';
import { Search, MapPin, Star, Clock, Wallet, X, ChevronRight, Compass } from 'lucide-react';
import { destinations } from '../../data/destinations';
import { Destination, Region } from '../../types';

interface DestinationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (destination: Destination) => void;
  currentDestinationId?: string;
}

const REGIONS: (Region | 'All')[] = ['All', 'North', 'South', 'West', 'East', 'Central', 'Northeast'];

export default function DestinationSelector({
  isOpen,
  onClose,
  onSelect,
  currentDestinationId,
}: DestinationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch =
        searchQuery === '' ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  if (!isOpen) return null;

  return (
    <div
      id="destination-selector-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white w-full max-w-4xl rounded-3xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-black text-slate-900">Choose a Destination</h2>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Select an Indian destination to build or customize your trip itinerary
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close destination selector"
            className="p-2 rounded-xl text-stone-400 hover:text-slate-700 hover:bg-stone-200/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-6 border-b border-stone-100 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="destination-selector-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, state, or interest (e.g. Munnar, Rajasthan, Beaches)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-100/80 border border-stone-200 text-sm text-slate-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-slate-700 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {REGIONS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedRegion === region
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                }`}
              >
                {region === 'All' ? 'All Regions' : `${region} India`}
              </button>
            ))}
          </div>
        </div>

        {/* Destination List Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDestinations.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              <MapPin className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700">No destinations found</p>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your search keywords or region filter.</p>
            </div>
          ) : (
            filteredDestinations.map((dest) => {
              const isSelected = dest.id === currentDestinationId;
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => {
                    onSelect(dest);
                    onClose();
                  }}
                  id={`select-destination-${dest.id}`}
                  className={`group text-left rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/30'
                      : 'border-stone-200 hover:border-orange-300 hover:shadow-md bg-white'
                  }`}
                >
                  <div className="relative h-32 w-full overflow-hidden bg-stone-100">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                          {dest.state}
                        </span>
                        <h3 className="text-base font-black leading-tight drop-shadow-sm">{dest.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-extrabold text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>{dest.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {dest.tagline}
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {dest.idealDurationDays} Days Ideal
                      </span>
                      <span className="flex items-center gap-1 font-bold text-slate-700">
                        <Wallet className="w-3 h-3 text-emerald-600" />
                        ~₹{dest.estimatedCostPerDay}/d
                      </span>
                    </div>
                  </div>

                  <div className="px-3.5 py-2 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <span>{isSelected ? 'Currently Selected' : 'Plan Trip to ' + dest.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
