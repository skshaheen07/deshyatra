import React from 'react';
import {
  Clock,
  Wallet,
  Calendar,
  Users,
  Compass,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { Destination } from '../../types';

interface DestinationSnapshotProps {
  destination: Destination;
}

export default function DestinationSnapshot({ destination }: DestinationSnapshotProps) {
  const stats = [
    {
      id: 'duration',
      icon: Clock,
      label: 'Ideal Duration',
      value: destination.idealDuration,
      subValue: `${destination.idealDurationDays} Recommended Days`,
      color: 'text-amber-600 bg-amber-50 border-amber-200/80',
    },
    {
      id: 'budget',
      icon: Wallet,
      label: 'Estimated Budget',
      value: destination.budgetRange,
      subValue: `~₹${destination.estimatedCostPerDay.toLocaleString('en-IN')}/day avg.`,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
    },
    {
      id: 'bestTime',
      icon: Calendar,
      label: 'Best Time to Visit',
      value: destination.bestTime,
      subValue: `Peak: ${destination.peakMonths.slice(0, 3).join(', ')}`,
      color: 'text-blue-600 bg-blue-50 border-blue-200/80',
    },
    {
      id: 'travelStyles',
      icon: Users,
      label: 'Best Travel Styles',
      value: destination.travelStyles.slice(0, 3).join(' · '),
      subValue: destination.travelStyles.includes('Family')
        ? 'Great for all ages'
        : 'Tailored for explorers',
      color: 'text-purple-600 bg-purple-50 border-purple-200/80',
    },
  ];

  return (
    <div id="destination-snapshot" className="relative -mt-8 sm:-mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-lg shadow-stone-900/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`flex items-start gap-4 ${
                  idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
                }`}
              >
                <div className={`p-3 rounded-2xl border ${stat.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                    {stat.label}
                  </span>
                  <p className="text-sm sm:text-base font-black text-slate-900 truncate mt-0.5">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                    {stat.subValue}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
