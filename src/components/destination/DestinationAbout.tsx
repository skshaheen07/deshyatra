import React from 'react';
import { Sparkles, Heart, CheckCircle2, Compass, Layers } from 'lucide-react';
import { Destination, InterestType } from '../../types';

interface DestinationAboutProps {
  destination: Destination;
}

export default function DestinationAbout({ destination }: DestinationAboutProps) {
  // Map interest types to descriptions and icons
  const interestHighlights: Record<InterestType, { icon: string; highlight: string }> = {
    Mountains: {
      icon: '🏔️',
      highlight: 'Majestic high-altitude peaks, panoramic ridge viewpoints & fresh alpine air.',
    },
    Beaches: {
      icon: '🏖️',
      highlight: 'Golden coastline sands, swaying palms, tranquil coves & ocean sunsets.',
    },
    Heritage: {
      icon: '🏛️',
      highlight: 'Centuries-old stone architecture, royal palaces, UNESCO monuments & living lore.',
    },
    Spiritual: {
      icon: '🪔',
      highlight: 'Sacred river ghats, ancient meditation shrines & soulful evening prayer ceremonies.',
    },
    Wildlife: {
      icon: '🐅',
      highlight: 'Protected national park sanctuaries, rare endemic species & guided jeep safaris.',
    },
    Nature: {
      icon: '🌿',
      highlight: 'Lush biodiversity, serene lakes, rainforest trails & restorative greenery.',
    },
    Adventure: {
      icon: '🧗',
      highlight: 'Exhilarating river rafting, mountain trekking, paragliding & off-road jeep expeditions.',
    },
    Food: {
      icon: '🍛',
      highlight: 'Authentic regional spice blends, legendary street food lanes & centuries-old culinary traditions.',
    },
    Culture: {
      icon: '🎭',
      highlight: 'Vibrant classical arts, folk music celebrations, tribal crafts & seasonal fairs.',
    },
    Wellness: {
      icon: '🧘',
      highlight: 'Holistic Ayurvedic rejuvenation, serene yoga retreats & natural herbal therapies.',
    },
    Photography: {
      icon: '📸',
      highlight: 'Golden hour vistas, architectural symmetry, wildlife encounters & vibrant street portraits.',
    },
    'Arts & Craft': {
      icon: '🎨',
      highlight: 'Handloom textile weavers, intricate pottery, brass metalwork & traditional wood carving.',
    },
    'Rural & Offbeat': {
      icon: '🏡',
      highlight: 'Tranquil village homestays, untouched hamlet walks & warm authentic community hospitality.',
    },
  };

  return (
    <section id="overview" className="scroll-mt-28 py-10 sm:py-14 border-b border-stone-200">
      <div className="space-y-10">
        {/* About Section Header & Text */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-slate-700 text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-orange-600" />
            <span>Destination Profile</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            About {destination.name}
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {destination.description}
          </p>
        </div>

        {/* Why You'll Love Section */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/80">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Why You&apos;ll Love {destination.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {destination.interests.map((interest) => {
              const info = interestHighlights[interest] || {
                icon: '✨',
                highlight: 'Remarkable experiences and unforgettable memories.',
              };
              return (
                <div
                  key={interest}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-2xs hover:border-amber-400 transition-all flex items-start gap-3.5"
                >
                  <span className="text-2xl sm:text-3xl shrink-0 p-1 bg-stone-50 rounded-xl">
                    {info.icon}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>{interest}</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {info.highlight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Categories Pill Strip */}
          <div className="mt-6 pt-5 border-t border-stone-200/70 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Themes:
            </span>
            {destination.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 rounded-full bg-stone-200/80 text-slate-800 font-semibold"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
