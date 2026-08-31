import React from 'react';
import { Layers } from 'lucide-react';

export default function StatesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto py-12">
        <Layers className="w-12 h-12 text-orange-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-900">States & Territories of India</h1>
        <p className="mt-2 text-slate-600">Explore the vibrant diversity of India’s states, regions, and cultural heritages.</p>
      </div>
    </div>
  );
}
