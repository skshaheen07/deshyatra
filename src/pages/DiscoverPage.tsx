import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BudgetTier,
  DurationOption,
  InterestType,
  RecommendationResult,
  Region,
  TravelStyle,
  UserPreferences,
} from '../types';
import { destinations } from '../data';
import { getRecommendations } from '../utils/recommendation';
import {
  getSavedUserPreferences,
  saveUserPreferences,
} from '../utils/storage';

import DiscoverIntro from '../components/discover/DiscoverIntro';
import DiscoverProgress from '../components/discover/DiscoverProgress';
import InterestStep from '../components/discover/InterestStep';
import BudgetStep from '../components/discover/BudgetStep';
import DurationStep from '../components/discover/DurationStep';
import TravelStyleStep from '../components/discover/TravelStyleStep';
import RegionStep, { RegionPreference } from '../components/discover/RegionStep';
import DiscoverResults from '../components/discover/DiscoverResults';

const DEFAULT_PREFERENCES: UserPreferences = {
  interests: ['Nature', 'Mountains'],
  budget: '₹5,000–₹10,000',
  duration: '3–4 days',
  travelStyle: 'Relaxed',
  region: 'Anywhere in India',
};

const STEP_TITLES = [
  'Introduction',
  'Choose Experiences',
  'Select Budget',
  'Trip Duration',
  'Travel Style',
  'Regional Focus',
  'Personalized Results',
];

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedPrefs, setSavedPrefs] = useState<UserPreferences | null>(null);

  // Step state: 0 = Intro, 1..5 = Quiz steps, 6 = Results
  const [currentStep, setCurrentStep] = useState<number>(0);

  // User quiz answers
  const [interests, setInterests] = useState<InterestType[]>(DEFAULT_PREFERENCES.interests);
  const [budget, setBudget] = useState<BudgetTier>(DEFAULT_PREFERENCES.budget);
  const [duration, setDuration] = useState<DurationOption>(DEFAULT_PREFERENCES.duration);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(DEFAULT_PREFERENCES.travelStyle);
  const [region, setRegion] = useState<RegionPreference>(DEFAULT_PREFERENCES.region);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize from storage or URL param
  useEffect(() => {
    const stored = getSavedUserPreferences();
    if (stored) {
      setSavedPrefs(stored);
      setInterests(stored.interests || DEFAULT_PREFERENCES.interests);
      setBudget(stored.budget || DEFAULT_PREFERENCES.budget);
      setDuration(stored.duration || DEFAULT_PREFERENCES.duration);
      setTravelStyle(stored.travelStyle || DEFAULT_PREFERENCES.travelStyle);
      setRegion(stored.region || DEFAULT_PREFERENCES.region);
    }

    const stepParam = searchParams.get('step');
    if (stepParam) {
      const parsedStep = parseInt(stepParam, 10);
      if (!isNaN(parsedStep) && parsedStep >= 0 && parsedStep <= 6) {
        setCurrentStep(parsedStep);
      }
    }
  }, [searchParams]);

  // Current preferences object
  const currentPreferences: UserPreferences = useMemo(() => {
    return {
      interests,
      budget,
      duration,
      travelStyle,
      region,
    };
  }, [interests, budget, duration, travelStyle, region]);

  // Calculated recommendations
  const recommendationResults: RecommendationResult[] = useMemo(() => {
    return getRecommendations(destinations, currentPreferences);
  }, [currentPreferences]);

  // Scroll to top whenever step changes
  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams(step > 0 ? { step: step.toString() } : {});
  };

  const handleStartQuiz = () => {
    goToStep(1);
  };

  const handleViewSavedResults = () => {
    if (savedPrefs) {
      setInterests(savedPrefs.interests);
      setBudget(savedPrefs.budget);
      setDuration(savedPrefs.duration);
      setTravelStyle(savedPrefs.travelStyle);
      setRegion(savedPrefs.region);
      goToStep(6);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitting(true);
    // Persist to local storage
    saveUserPreferences(currentPreferences);
    setSavedPrefs(currentPreferences);

    setTimeout(() => {
      setIsSubmitting(false);
      goToStep(6);
    }, 400);
  };

  const handleRetake = () => {
    goToStep(1);
  };

  const handleEditStep = (stepNum: number) => {
    goToStep(stepNum);
  };

  return (
    <div className="min-h-screen bg-stone-50/50 pb-20">
      {/* Progress Header shown only during steps 1 to 5 */}
      {currentStep >= 1 && currentStep <= 5 && (
        <DiscoverProgress
          currentStep={currentStep}
          totalSteps={5}
          stepTitle={STEP_TITLES[currentStep]}
          onBack={handleBack}
        />
      )}

      {/* Main Step Views */}
      <main className="animate-fade-in">
        {currentStep === 0 && (
          <DiscoverIntro
            onStart={handleStartQuiz}
            savedPreferences={savedPrefs}
            onViewSavedResults={handleViewSavedResults}
          />
        )}

        {currentStep === 1 && (
          <InterestStep
            selectedInterests={interests}
            onChange={setInterests}
            onNext={() => goToStep(2)}
          />
        )}

        {currentStep === 2 && (
          <BudgetStep
            selectedBudget={budget}
            onChange={setBudget}
            onNext={() => goToStep(3)}
          />
        )}

        {currentStep === 3 && (
          <DurationStep
            selectedDuration={duration}
            onChange={setDuration}
            onNext={() => goToStep(4)}
          />
        )}

        {currentStep === 4 && (
          <TravelStyleStep
            selectedStyle={travelStyle}
            onChange={setTravelStyle}
            onNext={() => goToStep(5)}
          />
        )}

        {currentStep === 5 && (
          <RegionStep
            selectedRegion={region}
            onChange={setRegion}
            onSubmit={handleSubmitQuiz}
            isSubmitting={isSubmitting}
          />
        )}

        {currentStep === 6 && (
          <DiscoverResults
            results={recommendationResults}
            preferences={currentPreferences}
            onRetake={handleRetake}
            onEditStep={handleEditStep}
          />
        )}
      </main>
    </div>
  );
}
