import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Utensils,
  BookOpen,
  HelpCircle,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

export default function DestinationNav() {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'match', label: 'Compatibility', icon: Sparkles },
    { id: 'attractions', label: 'Things to Do', icon: MapPin },
    { id: 'food', label: 'Local Food', icon: Utensils },
    { id: 'culture', label: 'Culture & Etiquette', icon: BookOpen },
    { id: 'tips', label: 'Travel Tips', icon: HelpCircle },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="destination-sticky-nav"
      aria-label="Destination section navigation"
      className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs hidden sm:block"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                id={`dest-nav-btn-${item.id}`}
                onClick={() => scrollTo(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-amber-300 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
