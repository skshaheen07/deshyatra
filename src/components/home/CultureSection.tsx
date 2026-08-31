import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  Flame,
  BookOpen,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  ShieldAlert,
} from 'lucide-react';

type CultureTab = 'cuisines' | 'festivals' | 'etiquette';

export default function CultureSection() {
  const [activeTab, setActiveTab] = useState<CultureTab>('cuisines');

  const cuisines = [
    {
      name: 'Kerala Appam with Coconut Stew',
      region: 'Kerala (South India)',
      description: 'Lacy, fermented rice batter hoppers with a fluffy center, served with fragrant coconut milk spiced stew.',
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dal Baati Churma with Pure Ghee',
      region: 'Rajasthan (North India)',
      description: 'Hard wheat flour balls baked over coal, dipped in spiced lentils and served with sweetened crumb dessert.',
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Kashmiri Wazwan & Rogan Josh',
      region: 'Kashmir (North India)',
      description: 'Centuries-old royal multi-course feast flavored with Kashmiri red chillies, cockscomb flower, and saffron.',
      isVeg: false,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Goan Fish Curry & Traditional Bebinca',
      region: 'Goa (West India)',
      description: 'Tangy kokum and coconut gravy with kingfish, followed by a multi-layered coconut milk pudding.',
      isVeg: false,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const festivals = [
    {
      name: 'Pushkar Camel Fair & Cultural Mela',
      location: 'Pushkar, Rajasthan',
      month: 'November (Kartik Purnima)',
      description: 'Tens of thousands of decorated camels gathered in the Thar desert with folk musicians, dancers, and sacred lake aartis.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Hornbill Festival of Nagaland',
      location: 'Kohima / Kisama, Nagaland',
      month: 'December 1–10',
      description: 'The "Festival of Festivals" uniting all 17 indigenous Naga tribes showcasing traditional war dances, crafts, and archery.',
      image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dev Deepawali & Ganga Mahotsav',
      location: 'Varanasi, Uttar Pradesh',
      month: 'November (Full Moon)',
      description: 'All 84 stone ghats along the sacred Ganges illuminated by over one million earthen oil lamps (diyas).',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Hemis Gompa Masked Festival',
      location: 'Ladakh',
      month: 'June / July',
      description: 'Sacred Cham masked dances performed by Buddhist lamas in the courtyard of Ladakh’s largest monastery.',
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const etiquetteTips = [
    {
      title: 'Sacred Sites & Temple Protocol',
      icon: '🪔',
      content: 'Always remove footwear before entering temples, mosques, and gurdwaras. Dress modestly covering shoulders and knees. Cover your head at Sikh gurdwaras.',
    },
    {
      title: 'High-Altitude Acclimatization',
      icon: '🏔️',
      content: 'When visiting Ladakh, Spiti, or Tawang, dedicate the first 24–48 hours to complete rest without physical exertion. Hydrate with water and ginger tea.',
    },
    {
      title: 'Eco-Sensitive Travel in the Himalayas',
      icon: '🌿',
      content: 'Never litter single-use plastic bottles on trekking trails or near sacred lakes. Support community homestays that conserve water and firewood.',
    },
    {
      title: 'Local Hospitality & Photography Etiquette',
      icon: '📸',
      content: 'Always ask permission with a polite smile before photographing monks, tribal artisans, or rituals. A respectful "Namaste" opens warm hearts everywhere.',
    },
  ];

  return (
    <section id="cultural-insights-section" className="py-16 sm:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Living Traditions & Culinary Heritage
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Travel Beyond Places: Cultural Wisdom
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              Authentic Indian travel is an immersive sensory tapestry. Understand local flavors, legendary seasonal gatherings, and respectful etiquette before you set foot.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-stone-100 border border-stone-200/80 shrink-0">
            <button
              id="culture-tab-cuisines"
              onClick={() => setActiveTab('cuisines')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'cuisines'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Utensils className="w-4 h-4 text-orange-600" />
              <span>Iconic Cuisines</span>
            </button>
            <button
              id="culture-tab-festivals"
              onClick={() => setActiveTab('festivals')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'festivals'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Festivals & Fairs</span>
            </button>
            <button
              id="culture-tab-etiquette"
              onClick={() => setActiveTab('etiquette')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'etiquette'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Local Etiquette</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'cuisines' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {cuisines.map((item) => (
              <div
                key={item.name}
                className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-amber-400 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-300">
                    {item.region}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>{item.isVeg ? '🌱 Pure Vegetarian' : '🍗 Regional Specialty'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'festivals' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {festivals.map((fest) => (
              <div
                key={fest.name}
                className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-amber-400 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={fest.image}
                    alt={fest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {fest.month}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block">
                      {fest.location}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug mt-0.5">
                      {fest.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {fest.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'etiquette' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {etiquetteTips.map((tip) => (
              <div
                key={tip.title}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-500 transition-all"
              >
                <div>
                  <div className="text-3xl mb-2">{tip.icon}</div>
                  <h3 className="font-black text-sm text-slate-900">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {tip.content}
                  </p>
                </div>
                <div className="pt-3 border-t border-stone-200/60 text-[11px] font-bold text-emerald-700">
                  ✓ Verified Cultural Practice
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
