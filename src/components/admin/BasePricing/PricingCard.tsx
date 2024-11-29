import React from 'react';
import { Info } from 'lucide-react';
import { WebsiteTypeRates } from '../../../types/admin';
import { cn } from '../../../utils/cn';

interface PricingCardProps {
  type: string;
  label: string;
  rates: WebsiteTypeRates;
  baseRates: WebsiteTypeRates;
  onChange: (field: string, value: number) => void;
  showTooltip: boolean;
  onTooltipChange: (show: boolean) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  type,
  label,
  rates,
  baseRates,
  onChange,
  showTooltip,
  onTooltipChange,
}) => {
  const hasChanges = 
    rates.basePrice !== baseRates.basePrice ||
    rates.perPageRate !== baseRates.perPageRate;

  return (
    <div className={cn(
      'bg-gray-50 p-6 rounded-lg transition-all',
      hasChanges && 'border-2 border-yellow-500'
    )}>
      <div className="flex items-center mb-6">
        <h3 className="text-xl font-semibold">{label}</h3>
        <button
          className="ml-2 text-gray-500 hover:text-gray-700"
          onMouseEnter={() => onTooltipChange(true)}
          onMouseLeave={() => onTooltipChange(false)}
        >
          <Info size={16} />
        </button>
        {showTooltip && (
          <div className="absolute ml-8 p-2 bg-gray-900 text-white text-sm rounded shadow-lg z-10">
            Configure base pricing and additional page rates
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium mb-4">Base Price (Includes 5 Pages)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost Per Page
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={rates.basePrice / 5}
                  onChange={(e) => onChange('basePrice', Number(e.target.value) * 5)}
                  className={cn(
                    'input-base pl-8',
                    rates.basePrice !== baseRates.basePrice && 'border-yellow-500'
                  )}
                  min="0"
                  step="100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={rates.basePrice}
                  className="input-base pl-8 bg-gray-100"
                  disabled
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                ${rates.basePrice / 5} × 5 pages
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-4">Additional Pages Pricing</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost Per Additional Page
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={rates.perPageRate}
                onChange={(e) => onChange('perPageRate', Number(e.target.value))}
                className={cn(
                  'input-base pl-8',
                  rates.perPageRate !== baseRates.perPageRate && 'border-yellow-500'
                )}
                min="0"
                step="50"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Flat rate for each page beyond the first 5 pages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};