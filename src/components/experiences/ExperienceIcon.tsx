import React from 'react';
import {
  Mountain,
  Palmtree,
  Landmark,
  Flame,
  Compass,
  Zap,
  Utensils,
  Trees,
  Heart,
  Palette,
  Camera,
  Sun,
  Waves,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const EXPERIENCE_ICON_MAP: Record<string, React.ElementType> = {
  Mountain,
  Palmtree,
  Landmark,
  Flame,
  Compass,
  Zap,
  Utensils,
  Trees,
  Heart,
  Palette,
  Camera,
  Sun,
  Waves,
  MapPin,
  Sparkles,
};

export function getExperienceIcon(iconName: string): React.ElementType {
  return EXPERIENCE_ICON_MAP[iconName] || Compass;
}
