import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  MapPin,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
  Map,
} from 'lucide-react';
import { Region, BudgetTier, InterestType } from '../../types';

interface HeroSlide {
  id: string;
  name: string;
  state: string;
  region: string;
  tagline: string;
  image: string;
  theme: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'munnar',
    name: 'Munnar, Kerala',
    state: 'Kerala',
    region: 'South India',
    tagline: 'Emerald tea plantations & misty Western Ghats trails',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=85',
    theme: 'Misty Mountains & Nature',
  },
  {
    id: 'jaipur',
    name: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    region: 'North India',
    tagline: 'Century-old sandstone forts & royal royal courtyards',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=85',
    theme: 'Royal Palaces & Heritage',
  },
  {
    id: 'leh',
    name: 'Leh Ladakh',
    state: 'Ladakh',
    region: 'North India',
    tagline: 'High-altitude mountain passes & sacred cliffside gompas',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1800&q=85',
    theme: 'High Adventure & Monasteries',
  },
  {
    id: 'varanasi',
    name: 'Varanasi, Uttar Pradesh',
    state: 'Uttar Pradesh',
    region: 'North India',
    tagline: 'Timeless river ghats, temple bells & sacred evening aartis',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1800&q=85',
    theme: 'Spiritual Heritage & Traditions',
  },
  {
    id: 'goa',
    name: 'Goa Coastline',
    state: 'Goa',
    region: 'West India',
    tagline: 'Sun-drenched golden beaches, Portuguese forts & coastal cuisine',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=85',
    theme: 'Tropical Beaches & Coast',
  },
];

export default function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedInterest, setSelectedInterest] = useState<string>('Mountains');
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier>('₹5,000–₹10,000');
  const [selectedRegion, setSelectedRegion] = useState<string>('Anywhere in India');
  const navigate = useNavigate();

  // Auto rotate hero slides every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handleQuickFind = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedInterest) params.set('interest', selectedInterest);
    if (selectedBudget) params.set('budget', selectedBudget);
    if (selectedRegion && selectedRegion !== 'Anywhere in India') {
      params.set('region', selectedRegion);
    }
    navigate(`/discover?${params.toString()}`);
  };

  const activeSlide = HERO_SLIDES[activeSlideIndex];

  return (
    <section id="home-hero-section" className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel with smooth crossfade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            {/* Platform Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Personalized Indian Tourism Discovery Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-white">
              Discover India <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                Your Way.
              </span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-xl text-stone-200/90 max-w-2xl font-normal leading-relaxed">
              No generic top-10 lists. DeshYatra pairs your travel style, budget, duration, and interests with authentic destinations across all 28 states & UTs using a transparent 5-factor scoring system.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/discover"
                id="hero-start-match-cta"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-5 h-5" />
                <span>Start Smart Match</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/explore"
                id="hero-explore-destinations-cta"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-bold text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Compass className="w-5 h-5 text-amber-300" />
                <span>Browse All 25+ Gems</span>
              </Link>
            </div>

            {/* Slide Navigation Dots & Current Highlight */}
            <div className="pt-4 flex items-center gap-4 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    aria-label={`Show ${slide.name}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeSlideIndex
                        ? 'w-7 bg-amber-400'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
              <span className="text-stone-400">|</span>
              <span className="font-medium text-amber-200">
                Spotlight: <strong className="text-white font-bold">{activeSlide.name}</strong> ({activeSlide.theme})
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Match Finder Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 text-slate-900">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600 block">
                    Instant Finder
                  </span>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Where would you like to go?
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleQuickFind} className="space-y-4">
                {/* Interest / Experience Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    What excites you most?
                  </label>
                  <select
                    id="hero-interest-select"
                    value={selectedInterest}
                    onChange={(e) => setSelectedInterest(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  >
                    <option value="Mountains">🏔️ Mountains & Tea Valleys</option>
                    <option value="Heritage">🏰 Royal Forts & Palaces</option>
                    <option value="Beaches">🏖️ Tropical Beaches & Coasts</option>
                    <option value="Spiritual">🪔 Spiritual Ghats & Sacred Temples</option>
                    <option value="Wildlife">🐅 Tiger Reserves & Wildlife</option>
                    <option value="Adventure">⚡ High Adventure & Treks</option>
                    <option value="Food">🍲 Culinary Trails & Street Food</option>
                    <option value="Nature">🌿 Waterfalls, Rainforests & Lakes</option>
                    <option value="Wellness">🧘 Ayurveda & Yoga Sanctuaries</option>
                    <option value="Rural & Offbeat">🧭 Offbeat & Living Root Bridges</option>
                  </select>
                </div>

                {/* Budget Preference */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Trip Budget Level
                  </label>
                  <select
                    id="hero-budget-select"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value as BudgetTier)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  >
                    <option value="Under ₹5,000">Budget Friendly (Under ₹5,000)</option>
                    <option value="₹5,000–₹10,000">Moderate Comfort (₹5,000–₹10,000)</option>
                    <option value="₹10,000–₹20,000">Premium Explorer (₹10,000–₹20,000)</option>
                    <option value="₹20,000+">Luxury Heritage & Resorts (₹20,000+)</option>
                  </select>
                </div>

                {/* Region Preference */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Region
                  </label>
                  <select
                    id="hero-region-select"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  >
                    <option value="Anywhere in India">🇮🇳 Anywhere in India (Open)</option>
                    <option value="North">North India (Himalayas & Heritage)</option>
                    <option value="South">South India (Backwaters, Ghats & Temples)</option>
                    <option value="West">West India (Deserts & Coasts)</option>
                    <option value="East">East India (Culture & Hills)</option>
                    <option value="Northeast">Northeast India (Seven Sisters & Valleys)</option>
                    <option value="Central">Central India (Heart of India & Tigers)</option>
                  </select>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  id="hero-quick-match-submit"
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-600/30 transition-all active:scale-[0.99]"
                >
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>Get Personalized Recommendations</span>
                </button>
              </form>

              {/* Trust Callout */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Deterministic Scoring
                </span>
                <span className="flex items-center gap-1 text-slate-700">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  No Ads or Sponsored Bias
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Metrics Strip */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-300">25+</div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium">Curated Destinations</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-300">28+</div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium">State & UT Profiles</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-300">10</div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium">Authentic Experience Themes</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-300">5-Factor</div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium">Scoring Match Algorithm</div>
          </div>
        </div>
      </div>
    </section>
  );
}
