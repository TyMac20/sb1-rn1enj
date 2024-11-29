import React from 'react';
import { StepContent } from './StepContent';
import { StepIndicator } from '../StepIndicator';
import { ProgressBar } from '../ProgressBar';
import { useCalculatorStore } from '../../store/useCalculatorStore';

export const Calculator: React.FC = () => {
  const currentStep = useCalculatorStore((state) => state.currentStep);
  const websiteType = useCalculatorStore((state) => state.quoteDetails.websiteType);
  const totalSteps = websiteType === 'ecommerce' ? 9 : 7;

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <StepContent />
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </div>
  );
};