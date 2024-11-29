import React from 'react';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { ShoppingBag } from 'lucide-react';
import { cn } from '../../utils/cn';

const productRanges = [
  { min: 1, max: 5, label: '1-5 products', description: 'Perfect for starting your online store' },
  { min: 6, max: 10, label: '6-10 products', description: 'Great for small product catalogs' },
  { min: 11, max: 20, label: '11-20 products', description: 'Ideal for medium-sized stores' },
  { min: 21, max: null, label: '20+ products', description: 'Custom quote required for large catalogs' },
];

export const ProductCountStep: React.FC = () => {
  const { setCurrentStep, setProducts } = useCalculatorStore();
  const [selectedRange, setSelectedRange] = React.useState<number | null>(null);

  const handleSelect = (min: number) => {
    setSelectedRange(min);
    setProducts(min);
    setCurrentStep(4); // Move to payment gateway step
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold mb-2">How many products do you want to sell on your site?</h2>
        <p className="text-gray-600">Select the estimated number of products for your online store</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {productRanges.map(({ min, max, label, description }) => (
          <button
            key={min}
            onClick={() => handleSelect(min)}
            className={cn(
              'p-6 rounded-lg border-2 text-left transition-all duration-200',
              'hover:border-blue-500 hover:shadow-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              selectedRange === min ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
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
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          Back
        </Button>
      </div>
    </div>
  );
};