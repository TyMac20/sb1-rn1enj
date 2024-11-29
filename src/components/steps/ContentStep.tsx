import React from 'react';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { FileText, Image, Type } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ContentAssets } from '../../types';

interface ContentOption {
  id: keyof ContentAssets;
  title: string;
  description: string;
  icon: React.ElementType;
}

const contentOptions: ContentOption[] = [
  {
    id: 'hasLogo',
    title: 'Do you currently have a logo?',
    description: 'A professional logo helps establish your brand identity',
    icon: FileText,
  },
  {
    id: 'hasImages',
    title: 'Do you currently have images for the new site?',
    description: 'High-quality images enhance your website\'s visual appeal',
    icon: Image,
  },
  {
    id: 'hasContent',
    title: 'Do you currently have written content for the new site?',
    description: 'Engaging content helps connect with your audience',
    icon: Type,
  },
];

export const ContentStep: React.FC = () => {
  const { setCurrentStep, setContentAssets } = useCalculatorStore();
  const websiteType = useCalculatorStore((state) => state.quoteDetails.websiteType);
  const [selections, setSelections] = React.useState<ContentAssets>({
    hasLogo: false,
    needsLogoTouchup: false,
    hasImages: false,
    hasContent: false,
  });

  const handleOptionChange = (id: keyof ContentAssets) => {
    if (id === 'hasLogo') {
      const newHasLogo = !selections[id];
      setSelections(prev => ({
        ...prev,
        [id]: newHasLogo,
        needsLogoTouchup: false, // Reset touchup when toggling logo
      }));
    } else {
      setSelections(prev => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  const handleLogoTouchupChange = () => {
    setSelections(prev => ({
      ...prev,
      needsLogoTouchup: !prev.needsLogoTouchup,
    }));
  };

  React.useEffect(() => {
    setContentAssets(selections);
  }, [selections, setContentAssets]);

  const handleBack = () => {
    setCurrentStep(websiteType === 'ecommerce' ? 5 : 3);
  };

  const handleContinue = () => {
    setCurrentStep(websiteType === 'ecommerce' ? 7 : 5);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <Type className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold mb-2">Content Assessment</h2>
        <p className="text-gray-600 mb-4">
          "Content is King" - Let's assess your content needs
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {contentOptions.map(({ id, title, description, icon: Icon }) => (
          <div
            key={id}
            className={cn(
              'p-6 rounded-lg border-2 transition-all duration-200',
              'hover:border-blue-500',
              selections[id] ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            )}
          >
            <div className="flex items-start space-x-4">
              <Icon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-4">{description}</p>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => handleOptionChange(id)}
                    className={cn(
                      'px-4 py-2 rounded-md font-medium transition-colors',
                      selections[id]
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    )}
                  >
                    {selections[id] ? 'Yes' : 'No'}
                  </button>

                  {id === 'hasLogo' && selections.hasLogo && (
                    <div className="flex items-center space-x-4 ml-4 animate-fade-in">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Need a logo touch-up?</span>
                        <span className="text-xs text-gray-600">
                          We will take your existing logo and give it a polished updated look and feel
                        </span>
                        {selections.needsLogoTouchup && (
                          <span className="text-xs text-blue-600 mt-1">
                            We will touch up your existing logo and save you money
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleLogoTouchupChange}
                        className={cn(
                          'px-4 py-2 rounded-md font-medium transition-colors',
                          selections.needsLogoTouchup
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        )}
                      >
                        {selections.needsLogoTouchup ? 'Yes' : 'No'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
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