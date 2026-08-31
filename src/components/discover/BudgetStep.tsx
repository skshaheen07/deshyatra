import React from 'react';
import { Wallet, Check, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { BudgetTier } from '../../types';

interface BudgetOption {
  value: BudgetTier;
  label: string;
  sublabel: string;
  description: string;
  icon: string;
  stayTypes: string;
}

const BUDGET_OPTIONS: BudgetOption[] = [
  {
    value: 'Under ₹5,000',
    label: 'Under ₹5,000',
    sublabel: 'Backpacker & Budget Friendly',
    description: 'Hostels, local guesthouses, state transport buses, local trains, and authentic street food & dhabas.',
    icon: '🎒',
    stayTypes: 'Hostels & Homestays (~₹800–₹2,000/day)',
  },
  {
    value: '₹5,000–₹10,000',
    label: '₹5,000–₹10,000',
    sublabel: 'Comfort & Value Exploring',
    description: 'Charming boutique stays, 3-star heritage hotels, private cabs, and popular regional restaurants.',
    icon: '✨',
    stayTypes: 'Boutique Hotels & Stays (~₹2,500–₹5,500/day)',
  },
  {
    value: '₹10,000–₹20,000',
    label: '₹10,000–₹20,000',
    sublabel: 'Premium & Heritage Retreats',
    description: '4-star resorts, private guided heritage tours, private houseboats, and curated culinary experiences.',
    icon: '🏰',
    stayTypes: 'Heritage Havels & Resorts (~₹6,000–₹14,000/day)',
  },
  {
    value: '₹20,000+',
    label: '₹20,000+',
    sublabel: 'Luxury & Royal Escapes',
    description: '5-star royal palaces, luxury glamping, private chauffeurs, spa therapies, and exclusive private access.',
    icon: '👑',
    stayTypes: 'Luxury Palaces & 5-Star Properties (~₹15,000+/day)',
  },
];

interface BudgetStepProps {
  selectedBudget: BudgetTier;
  onChange: (budget: BudgetTier) => void;
  onNext: () => void;
}

export default function BudgetStep({
  selectedBudget,
  onChange,
  onNext,
}: BudgetStepProps) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
          <Wallet className="w-3.5 h-3.5 text-emerald-700" />
          <span>Step 2 · Travel Budget</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          What&apos;s your travel budget?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Estimated daily trip spending per person for accommodation, meals, transit, and activities.
        </p>
      </div>

      {/* Selectable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BUDGET_OPTIONS.map((option) => {
          const isSelected = selectedBudget === option.value;
          return (
            <button
              key={option.value}
              type="button"
              id={`budget-opt-${option.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-4 cursor-pointer relative ${
                isSelected
                  ? 'bg-emerald-500/10 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-stone-50/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-stone-50 rounded-2xl shrink-0">
                    {option.icon}
                  </span>
                  <div>
                    <span className="text-lg font-black text-slate-900 block">
                      {option.label}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      {option.sublabel}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-700 text-white'
                      : 'border-stone-300 bg-stone-100'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {option.description}
              </p>

              <div className="pt-3 border-t border-stone-200/70 text-[11px] text-slate-500 font-semibold flex items-center justify-between">
                <span>Typical Accommodations:</span>
                <span className="text-slate-800 font-bold">{option.stayTypes}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info notice */}
      <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-slate-600 flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
        <span>
          <strong>Note:</strong> This is an approximate planning category to help rank destination affordability, not a rigid price constraint.
        </span>
      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-semibold">
          Selected: <strong className="text-slate-900">{selectedBudget}</strong>
        </div>

        <button
          type="button"
          id="budget-step-next-btn"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-black text-sm shadow-md shadow-orange-600/30 transition-all cursor-pointer"
        >
          <span>Continue to Duration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
