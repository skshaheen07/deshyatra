import React, { useState } from 'react';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationGalleryProps {
  destination: Destination;
}

export default function DestinationGallery({ destination }: DestinationGalleryProps) {
  // Combine heroImage and images without duplicates
  const allImages = Array.from(
    new Set([destination.heroImage, ...(destination.images || [])].filter(Boolean))
  );

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  if (allImages.length === 0) {
    return null;
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev !== null ? (prev === 0 ? allImages.length - 1 : prev - 1) : 0
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev !== null ? (prev === allImages.length - 1 ? 0 : prev + 1) : 0
      );
    }
  };

  return (
    <section id="gallery" className="scroll-mt-28 py-10 sm:py-14 border-b border-stone-200">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-slate-700 text-xs font-black uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
              <span>Visual Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Glimpse of {destination.name}
            </h2>
          </div>

          <span className="text-xs font-bold text-slate-500">
            {allImages.length} {allImages.length === 1 ? 'Photo' : 'Photos'}
          </span>
        </div>

        {allImages.length === 1 ? (
          <div
            onClick={() => setActiveLightboxIndex(0)}
            className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-stone-100 border border-stone-200 shadow-sm cursor-pointer group"
          >
            <img
              src={allImages[0]}
              alt={destination.name}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-3 rounded-full bg-white/80 text-slate-900 backdrop-blur-md">
                <Maximize2 className="w-5 h-5" />
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allImages.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLightboxIndex(idx)}
                className={`relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-2xs cursor-pointer group ${
                  idx === 0 ? 'sm:col-span-2 sm:aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${destination.name} showcase ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Preview"
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveLightboxIndex(null)}
            aria-label="Close image preview"
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls if multiple images */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Active Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-stone-900 border border-stone-800"
          >
            <img
              src={allImages[activeLightboxIndex]}
              alt={`${destination.name} full view`}
              className="w-full h-full max-h-[85vh] object-contain"
            />
            <div className="p-4 bg-stone-950 text-white text-center text-xs sm:text-sm font-semibold flex items-center justify-between px-6">
              <span>{destination.name}, {destination.state}</span>
              <span className="text-stone-400">
                {activeLightboxIndex + 1} of {allImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
