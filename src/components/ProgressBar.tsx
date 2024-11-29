import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};