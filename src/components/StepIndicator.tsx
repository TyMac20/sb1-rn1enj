import React from 'react';
import { cn } from '../utils/cn';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = React.useMemo(() => {
    const stepTitles = ['Welcome', 'Website Type', 'Pages'];
    if (totalSteps === 9) {
      stepTitles.push('Products', 'Payment');
    }
    stepTitles.push('Features', 'Content', 'Post-Launch', 'Contact', 'Confirmation');
    return stepTitles;
  }, [totalSteps]);

  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-8">
      {steps.map((title, index) => (
        <div key={index} className="flex items-center">
          <div className="relative">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold',
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              )}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'absolute top-1/2 w-full h-0.5',
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                )}
                style={{ left: '100%', width: '100%' }}
              />
            )}
          </div>
          <span
            className={cn(
              'ml-3 text-sm font-medium',
              index <= currentStep ? 'text-blue-600' : 'text-gray-500'
            )}
          >
            {title}
          </span>
        </div>
      ))}
    </div>
  );
};