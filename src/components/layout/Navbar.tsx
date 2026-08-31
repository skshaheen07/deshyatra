import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  Heart,
  Menu,
  X,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Search,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { FAVORITES_CHANGE_EVENT, getStoredFavorites } from '../../utils/storage';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Initial sync
    setFavoritesCount(getStoredFavorites().length);

    // React to storage events
    const handleFavChange = () => {
      setFavoritesCount(getStoredFavorites().length);
    };

    window.addEventListener(FAVORITES_CHANGE_EVENT, handleFavChange);
    window.addEventListener('storage', handleFavChange);

    return () => {
      window.removeEventListener(FAVORITES_CHANGE_EVENT, handleFavChange);
      window.removeEventListener('storage', handleFavChange);
    };
  }, []);

  // Close menus on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Discover', path: '/discover', isNovelty: true },
    { name: 'States', path: '/states' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Planner', path: '/planner' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              to="/"
              id="brand-logo"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900 leading-none flex items-center gap-1.5">
                  DESHYATRA
                  <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                </span>
                <span className="text-[11px] font-medium tracking-wider uppercase text-amber-700 font-sans mt-0.5">
                  Discover India Your Way
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-orange-600 bg-orange-50/80 font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-stone-100/70'
                    }`
                  }
                >
                  {link.name}
                  {link.isNovelty && (
                    <span className="px-1.5 py-0.5 text-[10px] uppercase font-extrabold tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-xs">
                      Smart Match
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Actions & CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Quick Search Button */}
              <button
                type="button"
                id="navbar-search-btn"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-stone-100 rounded-xl transition-colors"
                aria-label="Search destinations"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Favorites Button with Badge */}
              <Link
                to="/favorites"
                id="navbar-favorites-btn"
                className="relative p-2.5 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors flex items-center"
                aria-label="View favorite destinations"
              >
                <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Primary Call to Action */}
              <Link
                to="/discover"
                id="navbar-primary-cta"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-orange-600/20 hover:shadow-lg hover:shadow-orange-600/30 transition-all active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Plan My Trip</span>
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                to="/favorites"
                className="relative p-2 text-slate-700"
                aria-label="Favorites"
              >
                <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute 0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:bg-stone-100 rounded-lg"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-xl">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search Jaipur, Kerala, Trekking..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 pl-10 pr-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </form>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                      isActive
                        ? 'text-orange-600 bg-orange-50 font-bold'
                        : 'text-slate-800 hover:bg-stone-50'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.isNovelty && (
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-orange-500 text-white rounded-full">
                      Match Engine
                    </span>
                  )}
                </NavLink>
              ))}

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                    isActive ? 'text-orange-600 bg-orange-50' : 'text-slate-800 hover:bg-stone-50'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Favorites
                </span>
                <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-bold">
                  {favoritesCount}
                </span>
              </NavLink>
            </div>

            <div className="pt-3 border-t border-stone-100">
              <Link
                to="/discover"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-base font-bold py-3 px-4 rounded-xl shadow-md"
              >
                <Sparkles className="w-5 h-5" />
                <span>Start Trip Discovery</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-stone-200">
            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-stone-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-orange-600 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by destination, state, experience (e.g., Munnar, Beaches, Himachal)..."
                className="w-full text-base font-medium text-slate-800 placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            <div className="p-4 bg-stone-50 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Popular Searches</div>
              <div className="flex flex-wrap gap-1.5">
                {['Munnar', 'Goa Beaches', 'Rajasthan Heritage', 'Leh Ladakh', 'Varanasi Ghats', 'Meghalaya Waterfalls', 'Wildlife Safari'].map(
                  (tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        navigate(`/explore?search=${encodeURIComponent(tag)}`);
                        setSearchOpen(false);
                      }}
                      className="px-3 py-1.5 bg-white border border-stone-200 text-slate-700 hover:border-orange-400 hover:text-orange-600 rounded-lg transition-colors font-medium text-xs flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-orange-500" />
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
