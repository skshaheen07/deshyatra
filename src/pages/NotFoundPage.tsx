import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-bounce" />
        </div>
        <div className="space-y-2">
          <span className="text-sm font-bold uppercase tracking-widest text-orange-600">404 Error</span>
          <h1 className="text-3xl font-extrabold text-slate-900">Destination Not Found</h1>
          <p className="text-sm text-slate-600">
            Looks like you've wandered off the trail. The page or destination you are searching for doesn't exist.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl font-bold text-sm hover:bg-orange-700 transition-colors shadow-md"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
