import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Wallet,
  Clock,
  Sparkles,
  Printer,
  Copy,
  Check,
  Compass,
  Heart,
  Bookmark,
  Share2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Destination, ItineraryDay, TravelStyle, UserPreferences } from '../../types';
import { TripPace } from '../../utils/plannerGenerator';

interface TripSummaryProps {
  destination: Destination;
  days: ItineraryDay[];
  durationDays: number;
  travelStyle: TravelStyle;
  pace: TripPace;
  totalCostFormatted: string;
  totalActivitiesCount: number;
  userPreferences: UserPreferences | null;
  onSaveTrip: () => void;
  isSaved: boolean;
}

export default function TripSummary({
  destination,
  days,
  durationDays,
  travelStyle,
  pace,
  totalCostFormatted,
  totalActivitiesCount,
  userPreferences,
  onSaveTrip,
  isSaved,
}: TripSummaryProps) {
  const [copied, setCopied] = useState(false);

  // Check personalization match
  const isPersonalized =
    userPreferences &&
    (userPreferences.travelStyle === travelStyle ||
      userPreferences.region === destination.region ||
      destination.interests.some((i) => userPreferences.interests.includes(i)));

  // Generate plain text version of the itinerary for clipboard copy / sharing
  const handleCopyItinerary = () => {
    let text = `DeshYatra Trip Plan: ${destination.name}, ${destination.state}\n`;
    text += `Duration: ${durationDays} Days | Style: ${travelStyle} | Pace: ${pace}\n`;
    text += `Est. Total Budget: ${totalCostFormatted}\n\n`;

    days.forEach((d) => {
      text += `DAY ${d.dayNumber}: ${d.theme}\n`;
      if (d.slots && d.slots.length > 0) {
        d.slots.forEach((s) => {
          text += `  • [${s.timeOfDay}] ${s.title} (${s.category}${s.duration ? ` - ${s.duration}` : ''})\n`;
          if (s.description) text += `    ${s.description}\n`;
        });
      } else {
        text += `  • No activities scheduled.\n`;
      }
      if (d.notes) {
        text += `  Notes: ${d.notes}\n`;
      }
      text += `\n`;
    });

    text += `Planned with DeshYatra (https://ai.studio/build)`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="trip-summary-card" className="space-y-6">
      {/* 1. Trip Metrics Card */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Trip Overview</h3>
              <p className="text-xs text-slate-500">{destination.name}, {destination.state}</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-black">
            {durationDays} Days
          </span>
        </div>

        {/* Personalized Insight Pill */}
        {isPersonalized && (
          <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block">Personalized Recommendation</span>
              <p className="text-amber-800 text-[11px] leading-relaxed mt-0.5">
                Curated to fit your {travelStyle} travel style and passion for{' '}
                {destination.interests.slice(0, 2).join(' & ')}.
              </p>
            </div>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Activities Planned
            </span>
            <span className="text-lg font-black text-slate-900 mt-0.5 block">
              {totalActivitiesCount} Items
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Pacing
            </span>
            <span className="text-lg font-black text-slate-900 mt-0.5 block">
              {pace}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              Est. Daily Cost
            </span>
            <span className="text-lg font-black text-slate-900 mt-0.5 block">
              ~₹{destination.estimatedCostPerDay.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
              Est. Total Cost
            </span>
            <span className="text-lg font-black text-emerald-900 mt-0.5 block">
              {totalCostFormatted}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            id="save-trip-manual-btn"
            onClick={onSaveTrip}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 active:scale-98 text-white font-black text-xs sm:text-sm shadow-md shadow-orange-600/20 transition-all"
          >
            <Bookmark className="w-4 h-4" />
            <span>{isSaved ? 'Trip Saved to Library ✓' : 'Save Itinerary'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyItinerary}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 active:scale-95 text-slate-700 font-bold text-xs transition-all border border-stone-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Plan</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 active:scale-95 text-slate-700 font-bold text-xs transition-all border border-stone-200"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / PDF</span>
            </button>
          </div>

          <Link
            to={`/destinations/${destination.id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-slate-700 font-bold text-xs transition-all border border-stone-200 mt-1"
          >
            <span>Explore {destination.name} Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
          </Link>
        </div>
      </div>

      {/* 2. Completion State Card */}
      <div className="bg-gradient-to-br from-slate-900 to-stone-900 rounded-3xl p-6 text-white shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Trip Status</span>
        </div>

        <div>
          <h4 className="text-lg font-black text-white">
            Your {destination.name} journey is taking shape.
          </h4>
          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
            You have {totalActivitiesCount} curated experiences planned across {durationDays} days.
            All customizations are saved automatically in your browser.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800">
          <span>Ready to travel?</span>
          <span className="text-amber-400 font-bold">Have a wonderful journey!</span>
        </div>
      </div>
    </div>
  );
}
