import { ExperienceCategory } from '../types';

export const experiences: ExperienceCategory[] = [
  {
    id: 'mountains',
    name: 'Misty Mountains & Valleys',
    tagline: 'Snowy Himalayan summits, high-altitude passes, and lush tea-scented hills',
    description:
      'From the rugged snow-scapes of Ladakh and Himachal to the emerald rolling tea estates of Munnar and Darjeeling, discover serene high-altitude retreats.',
    iconName: 'Mountain',
    heroImage:
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Mountains', 'Nature', 'Adventure', 'Photography'],
    highlightDestinations: ['manali', 'leh', 'munnar', 'darjeeling', 'shillong', 'coorg', 'tawang'],
  },
  {
    id: 'beaches',
    name: 'Sun-Kissed Beaches & Coasts',
    tagline: 'Golden sands, swaying palm groves, pristine coral reefs, and coastal sunsets',
    description:
      'Experience India’s 7,500 km coastline: sun-drenched sands in Goa, turquoise lagoons in the Andaman Islands, and French promenade sunsets in Pondicherry.',
    iconName: 'Palmtree',
    heroImage:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Beaches', 'Relaxed' as any, 'Photography', 'Food'],
    highlightDestinations: ['goa', 'andaman', 'pondicherry', 'gokarna', 'kochi'],
  },
  {
    id: 'heritage',
    name: 'Royal Heritage & Fortresses',
    tagline: 'Centuries of grandeur, sandstone forts, royal palaces, and ancient temple ruins',
    description:
      'Walk through the regal halls of Rajasthan’s palaces, explore UNESCO World Heritage boulder ruins in Hampi, and admire the timeless marble glory of the Taj Mahal.',
    iconName: 'Landmark',
    heroImage:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Heritage', 'Culture', 'Photography', 'Arts & Craft'],
    highlightDestinations: ['jaipur', 'udaipur', 'jaisalmer', 'hampi', 'agra', 'mysuru', 'khajuraho', 'varanasi'],
  },
  {
    id: 'spiritual',
    name: 'Spiritual Ghats & Sacred Temples',
    tagline: 'Ancient ritual chants, river aartis, serene monasteries, and yoga sanctuaries',
    description:
      'Witness the eternal evening Ganga Aarti in Varanasi, meditate at Himalayan yoga ashrams in Rishikesh, or experience deep devotion at Amritsar’s Golden Temple.',
    iconName: 'Flame',
    heroImage:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Spiritual', 'Culture', 'Wellness', 'Photography'],
    highlightDestinations: ['varanasi', 'rishikesh', 'amritsar', 'puri', 'hampi', 'bodhgaya'],
  },
  {
    id: 'wildlife',
    name: 'Untamed Wildlife & Jungle Safaris',
    tagline: 'Royal Bengal tigers, one-horned rhinos, Asian elephants, and rich biodiversity',
    description:
      'Track majestic tigers across the teak forests of Central India, spot one-horned rhinos in the grasslands of Assam, and witness rare avifauna in pristine sanctuaries.',
    iconName: 'Compass',
    heroImage:
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Wildlife', 'Nature', 'Adventure', 'Photography'],
    highlightDestinations: ['kaziranga', 'kanha', 'wayanad', 'sundarbans', 'periyar', 'ranthambore'],
  },
  {
    id: 'adventure',
    name: 'Thrill & High Adventure',
    tagline: 'Whitewater rafting, high-altitude trekking, paragliding, and motor expeditions',
    description:
      'Raft through the roaring rapids of the Ganges in Rishikesh, trek along living root bridges in Meghalaya, or cross the world’s highest motorable passes in Ladakh.',
    iconName: 'Zap',
    heroImage:
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Adventure', 'Mountains', 'Nature'],
    highlightDestinations: ['rishikesh', 'manali', 'leh', 'meghalaya', 'andaman', 'tawang'],
  },
  {
    id: 'food',
    name: 'Culinary Trails & Flavors of India',
    tagline: 'Fragrant biryanis, royal thalis, fiery coastal curries, and legendary street food',
    description:
      'Embark on an unforgettable gastronomic journey tasting Nizami biryani in Hyderabad, Kathi rolls in Kolkata, Chettinad spices, and royal Rajasthani Dal Baati Churma.',
    iconName: 'Utensils',
    heroImage:
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Food', 'Culture', 'Rural & Offbeat'],
    highlightDestinations: ['hyderabad', 'amritsar', 'mumbai', 'kolkata', 'delhi', 'kochi', 'jaipur'],
  },
  {
    id: 'nature',
    name: 'Lush Forests & Waterfalls',
    tagline: 'Misty cloud forests, roaring cascading falls, emerald backwaters, and deep gorges',
    description:
      'Cruise the tranquil coconut-fringed backwaters of Alleppey, stand before roaring monsoon falls in Cherrapunji, and hike through Western Ghats coffee estates in Coorg.',
    iconName: 'Trees',
    heroImage:
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Nature', 'Photography', 'Rural & Offbeat', 'Wellness'],
    highlightDestinations: ['munnar', 'coorg', 'wayanad', 'shillong', 'meghalaya', 'pachmarhi'],
  },
  {
    id: 'wellness',
    name: 'Ayurveda, Yoga & Holistic Healing',
    tagline: 'Authentic Ayurvedic rejuvenation, riverside meditation, and serene forest ashrams',
    description:
      'Rebalance your mind and body with traditional panchakarma therapies in Kerala, morning meditation by the holy Ganges, and tranquil hill station retreats.',
    iconName: 'Heart',
    heroImage:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Wellness', 'Spiritual', 'Nature'],
    highlightDestinations: ['rishikesh', 'wayanad', 'kochi', 'pondicherry', 'dharamshala'],
  },
  {
    id: 'culture',
    name: 'Living Arts, Crafts & Folk Traditions',
    tagline: 'Vibrant local festivals, handloom weaving, block prints, and classical dance forms',
    description:
      'Witness classical Kathakali performances, explore royal handloom workshops in Varanasi and Jaipur, and experience ancient tribal festivals in Northeast India.',
    iconName: 'Palette',
    heroImage:
      'https://images.unsplash.com/photo-1609137144822-77eb8bf29290?auto=format&fit=crop&w=1200&q=80',
    matchingInterests: ['Culture', 'Arts & Craft', 'Heritage', 'Photography'],
    highlightDestinations: ['jaipur', 'varanasi', 'kochi', 'shillong', 'hampi', 'mysuru', 'kolkata'],
  },
];

export const getExperienceById = (id: string): ExperienceCategory | undefined => {
  return experiences.find((exp) => exp.id.toLowerCase() === id.toLowerCase());
};
