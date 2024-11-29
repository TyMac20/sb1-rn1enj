import React from 'react';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

const getPageRangeLabel = (min: number, max: number | null, websiteType: string) => {
  const baseLabel = max ? `${min}-${max} pages` : `${min}+ pages`;
  return websiteType === 'ecommerce' ? `${baseLabel} (not including product pages)` : baseLabel;
};

const getPageRanges = (websiteType: string) => [
  { min: 1, max: 5, description: 'Perfect for small business websites' },
  { min: 6, max: 10, description: 'Ideal for medium-sized businesses' },
  { min: 11, max: 15, description: 'Great for larger businesses' },
  { min: 16, max: 20, description: 'Suitable for extensive websites' },
  { min: 21, max: null, description: 'Custom quote required' },
].map(range => ({
  ...range,
  label: getPageRangeLabel(range.min, range.max, websiteType)
}));

export const PageCountStep: React.FC = () => {
  const { setPages, setCurrentStep } = useCalculatorStore();
  const websiteType = useCalculatorStore((state) => state.quoteDetails.websiteType);
  const [selectedRange, setSelectedRange] = React.useState<number | null>(null);

  const pageRanges = React.useMemo(() => getPageRanges(websiteType), [websiteType]);

  const handleSelect = (min: number, max: number | null) => {
    setSelectedRange(min);
    // Set the actual number of pages based on the max value of the range
    if (max) {
      setPages(max);
    } else {
      setPages(min);
    }
    setCurrentStep(websiteType === 'ecommerce' ? 3 : 3);
  };

  const getPageDescription = () => {
    if (websiteType === 'ecommerce') {
      return "Select the estimated number of pages needed for your website. Do not include product pages (we will determine product pages on the next step).";
    }
    return "Select the estimated number of pages for your website";
  };

  return (
    <div>
      <div className="text-center mb-8">
        <FileText className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold mb-2">How many pages do you need?</h2>
        <p className="text-gray-600">
          {getPageDescription()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {pageRanges.map(({ min, max, label, description }) => (
          <button
            key={min}
            onClick={() => handleSelect(min, max)}
            className={cn(
              'p-6 rounded-lg border-2 text-left transition-all duration-200',
              'hover:border-blue-500 hover:shadow-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              selectedRange === min
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            )}
          >
            <h3 className="text-lg font-semibold mb-1">{label}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
            {max === null && (
              <span className="inline-block mt-2 text-xs text-blue-600 font-medium">
                Custom quote required
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
      </div>
    </div>
  );
};