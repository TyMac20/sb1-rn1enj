import React from 'react';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { WebsiteType } from '../../types';
import { Globe, ShoppingCart, Code, Wrench } from 'lucide-react';
import { cn } from '../../utils/cn';

const websiteTypes: Array<{
  type: WebsiteType;
  title: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    type: 'wordpress',
    title: 'New WordPress Site',
    description: 'Create a professional website for your business or personal brand.',
    icon: Globe,
  },
  {
    type: 'ecommerce',
    title: 'New E-Commerce Site',
    description: 'Start selling your products or services online with ease.',
    icon: ShoppingCart,
  },
  {
    type: 'webapp',
    title: 'New Web App',
    description: 'Build a custom web application tailored to your needs.',
    icon: Code,
  },
  {
    type: 'existing',
    title: 'Existing Site',
    description: 'Enhance or fix your current website.',
    icon: Wrench,
  },
];

export const WebsiteTypeStep: React.FC = () => {
  const { setWebsiteType, setCurrentStep } = useCalculatorStore();
  const selectedType = useCalculatorStore((state) => state.quoteDetails.websiteType);

  const handleSelect = (type: WebsiteType) => {
    setWebsiteType(type);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">What type of website do you need?</h2>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {websiteTypes.map(({ type, title, description, icon: Icon }) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className={cn(
              'p-6 rounded-lg border-2 hover:border-blue-500',
              'transition-all duration-200 text-left',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              selectedType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            )}
          >
            <div className="flex items-start">
              <Icon className="w-8 h-8 mt-1 text-blue-600 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
      </div>
    </div>
  );
};