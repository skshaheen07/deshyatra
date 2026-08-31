import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface DiscoverProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  onBack: () => void;
}

export default function DiscoverProgress({
  currentStep,
  totalSteps,
  stepTitle,
  onBack,
}: DiscoverProgressProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  const stepNames = ['Interests', 'Budget', 'Duration', 'Travel Style', 'Region'];

  return (
    <div className="w-full bg-white border-b border-stone-200 sticky top-16 z-30 py-3.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
      <div className="max-w-4xl mx-auto flex flex-col gap-2.5">
        {/* Top bar with back button & step label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              id="quiz-back-btn"
              onClick={onBack}
              aria-label="Go to previous question"
              className="p-1.5 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-stone-100 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-black text-slate-900">{stepTitle}</span>
            <span className="text-[11px] text-slate-400 font-medium ml-2">
              ({percentage}%)
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Quiz progress: ${percentage}%`}
          className="w-full h-2 bg-stone-100 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Step dots for larger screens */}
        <div className="hidden sm:flex items-center justify-between text-[11px] font-semibold text-slate-400 px-1 pt-1">
          {stepNames.map((name, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            return (
              <div
                key={name}
                className={`flex items-center gap-1.5 ${
                  isCurrent
                    ? 'text-orange-600 font-bold'
                    : isCompleted
                    ? 'text-slate-700'
                    : 'text-slate-400'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent
                      ? 'bg-orange-600 text-white font-bold'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-stone-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </span>
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
