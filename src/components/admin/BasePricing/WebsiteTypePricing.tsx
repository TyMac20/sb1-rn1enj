import React from 'react';
import { WebsiteTypeRates } from '../../../types/admin';
import { DollarSign, Info } from 'lucide-react';

interface WebsiteTypePricingProps {
  type: string;
  rates: WebsiteTypeRates;
  onBaseRateChange: (type: string, field: keyof WebsiteTypeRates, value: number) => void;
  onPerPageRateChange: (type: string, value: number) => void;
}

export const WebsiteTypePricing: React.FC<WebsiteTypePricingProps> = ({
  type,
  rates,
  onBaseRateChange,
  onPerPageRateChange,
}) => {
  const perPageRate = rates.basePrice / 5;
  const [showTooltip, setShowTooltip] = React.useState<string | null>(null);

  const handleAdditionalPageRateChange = (range: string, value: number) => {
    const pages = {
      '6-10': 5,
      '11-15': 5,
      '16-20': 5,
    };

    onBaseRateChange(type, 'additionalPages', {
      ...rates.additionalPages,
      [range]: {
        perPage: value,
        total: value * pages[range as keyof typeof pages],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price per Page
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <DollarSign size={16} />
            </span>
            <input
              type="number"
              value={perPageRate}
              onChange={(e) => onPerPageRateChange(type, Number(e.target.value))}
              className="w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Base Price (5 Pages)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <DollarSign size={16} />
            </span>
            <input
              type="number"
              value={rates.basePrice}
              className="w-full pl-8 pr-4 py-2 border rounded-md bg-gray-100"
              disabled
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Calculated: ${perPageRate} × 5 pages = ${rates.basePrice}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center mb-4">
          <h4 className="text-lg font-medium">Additional Pages Pricing</h4>
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onMouseEnter={() => setShowTooltip('additional')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <Info size={16} />
          </button>
          {showTooltip === 'additional' && (
            <div className="absolute ml-8 p-2 bg-gray-900 text-white text-sm rounded shadow-lg">
              Price per page for additional pages beyond the base 5 pages
            </div>
          )}
        </div>

        <div className="space-y-4">
          {Object.entries(rates.additionalPages).map(([range, pricing]) => (
            <div key={range} className="grid grid-cols-2 gap-6 p-4 bg-white rounded-lg border">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {range} Pages (Price per Page)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <DollarSign size={16} />
                  </span>
                  <input
                    type="number"
                    value={pricing.perPage}
                    onChange={(e) => handleAdditionalPageRateChange(range, Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Price for Range
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <DollarSign size={16} />
                  </span>
                  <input
                    type="number"
                    value={pricing.total}
                    className="w-full pl-8 pr-4 py-2 border rounded-md bg-gray-100"
                    disabled
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Calculated: ${pricing.perPage} × 5 pages = ${pricing.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};