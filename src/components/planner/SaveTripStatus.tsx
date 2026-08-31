import React from 'react';
import { CheckCircle2, RefreshCw } from 'lucide-react';

interface SaveTripStatusProps {
  isSaving: boolean;
  lastSavedAt: Date | null;
}

export default function SaveTripStatus({ isSaving, lastSavedAt }: SaveTripStatusProps) {
  return (
    <div
      id="save-trip-status"
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200/80 text-xs font-semibold text-slate-600 transition-all"
    >
      {isSaving ? (
        <>
          <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
          <span className="text-slate-700">Saving changes...</span>
        </>
      ) : lastSavedAt ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-slate-700">Saved to browser</span>
        </>
      ) : (
        <>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-slate-700">Autosave active</span>
        </>
      )}
    </div>
  );
}
