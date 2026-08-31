import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Heart,
  MapPin,
} from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="final-cta-section" className="py-20 sm:py-28 bg-gradient-to-b from-stone-900 via-slate-950 to-stone-950 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Your Unforgettable Indian Journey Starts Here</span>
        </div>

        {/* Big Catchy Heading */}
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] max-w-3xl mx-auto">
          Ready to Experience India <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
            Tailored Exactly to You?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
          Skip generic recommendations. Take our 2-minute trip discovery assessment and unlock destinations, cost models, and custom itineraries crafted around your style.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/discover"
            id="final-cta-launch-discover"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base shadow-2xl shadow-orange-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>Launch Personalized Match Engine</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/explore"
            id="final-cta-browse-explore"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Compass className="w-5 h-5 text-amber-300" />
            <span>Browse All Destinations</span>
          </Link>
        </div>

        {/* Trust Badges Strip */}
        <div className="pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-stone-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free & Client-Side</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Multi-Day Itineraries</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Save & Export Anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
