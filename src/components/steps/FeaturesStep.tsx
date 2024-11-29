import React from 'react';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { Feature } from '../../types';
import { ShoppingCart } from 'lucide-react';
import { cn } from '../../utils/cn';
import {
  wordpressFeatures,
  webAppFeatures,
  existingSiteFeatures,
  ecommerceFeatures,
} from '../../features';

export const FeaturesStep: React.FC = () => {
  const { toggleFeature, setCurrentStep } = useCalculatorStore();
  const selectedFeatures = useCalculatorStore((state) => state.quoteDetails.features || []);
  const websiteType = useCalculatorStore((state) => state.quoteDetails.websiteType);

  const features = React.useMemo(() => {
    switch (websiteType) {
      case 'wordpress':
        return wordpressFeatures;
      case 'webapp':
        return webAppFeatures;
      case 'existing':
        return existingSiteFeatures;
      case 'ecommerce':
        return ecommerceFeatures;
      default:
        return [];
    }
  }, [websiteType]);

  const isSelected = (feature: Feature) => 
    selectedFeatures.some((f) => f.id === feature.id);

  const handleToggle = (feature: Feature) => {
    toggleFeature(feature);
  };

  const handleContinue = () => {
    // Next step is always Content
    setCurrentStep(websiteType === 'ecommerce' ? 6 : 4);
  };

  const handleBack = () => {
    // Previous step depends on website type
    if (websiteType === 'ecommerce') {
      setCurrentStep(4); // Payment Gateway
    } else {
      setCurrentStep(2); // Pages
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold mb-2">Select Additional Features</h2>
        <p className="text-gray-600">
          Choose the features you need for your website
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => handleToggle(feature)}
            className={cn(
              'p-6 rounded-lg border-2 text-left transition-all duration-200',
              'hover:border-blue-500 hover:shadow-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              isSelected(feature) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            )}
          >
            <div className="flex items-start">
              <feature.icon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-1">{feature.name}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                {feature.customQuote && (
                  <span className="inline-block mt-2 text-sm text-blue-600">
                    Custom quote required
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
};