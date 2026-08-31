import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Heart,
  Sparkles,
  ShieldCheck,
  Globe2,
  Mountain,
  Palmtree,
  Camera,
  Navigation,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative top border highlight */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 inline-block">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white leading-none">
                  DESHYATRA
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-amber-400 mt-0.5">
                  Discover India Your Way
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              DeshYatra is India’s personalized travel discovery engine. We match your unique travel interests,
              budget, duration, and style with authentic destinations across every state and union territory.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Deterministic Scoring</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Client-Side</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link to="/discover" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Discover My Trip</span>
                  <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.2 rounded font-mono">
                    Match
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/states" className="text-slate-400 hover:text-amber-400 transition-colors">
                  States Explorer
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <Link to="/planner" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Smart Itinerary Planner
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-slate-400 hover:text-amber-400 transition-colors">
                  My Saved Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Explore by Region
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'].map(
                (region) => (
                  <li key={region}>
                    <Link
                      to={`/explore?region=${encodeURIComponent(region.replace(' India', ''))}`}
                      className="text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      {region}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Key Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Top Experiences
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Misty Mountains', id: 'mountains' },
                { name: 'Coastal & Beaches', id: 'beaches' },
                { name: 'Royal Heritage', id: 'heritage' },
                { name: 'Spiritual Ghats', id: 'spiritual' },
                { name: 'Wildlife Safaris', id: 'wildlife' },
                { name: 'Culinary Trails', id: 'food' },
              ].map((exp) => (
                <li key={exp.id}>
                  <Link
                    to={`/experiences/${exp.id}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {exp.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} DeshYatra. Handcrafted with passion for Incredible India.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-300 transition-colors">
              About DeshYatra
            </Link>
            <Link to="/discover" className="hover:text-slate-300 transition-colors">
              Recommendation Engine
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Frontend-Only Local Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
