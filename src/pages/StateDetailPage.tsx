import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';

export default function StateDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/states" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-600 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to States
      </Link>
      <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm text-center">
        <Layers className="w-12 h-12 text-orange-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-900 capitalize">State: {id?.replace(/-/g, ' ')}</h1>
        <p className="mt-2 text-slate-600">Explore regional highlights, cuisine, festivals, and top destinations.</p>
      </div>
    </div>
  );
}
