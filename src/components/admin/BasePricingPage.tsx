import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { Button } from '../Button';
import { Save, Info, RotateCcw } from 'lucide-react';
import { WebsiteType } from '../../types';
import { BaseRates } from '../../types/admin';
import { cn } from '../../utils/cn';

const websiteTypes: { type: WebsiteType; label: string }[] = [
  { type: 'wordpress', label: 'WordPress' },
  { type: 'ecommerce', label: 'E-Commerce' },
  { type: 'webapp', label: 'Web App' },
  { type: 'existing', label: 'Existing Site' },
];

export const BasePricingPage: React.FC = () => {
  const { baseRates, updateBaseRates, resetToDefaults } = useAdminStore();
  const [localRates, setLocalRates] = useState<BaseRates>(baseRates);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleRateChange = (type: WebsiteType, field: string, value: number) => {
    setLocalRates((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    const isValid = Object.values(localRates).every((typeRates) => {
      return typeRates.basePrice > 0 && typeRates.perPageRate > 0;
    });

    if (!isValid) {
      alert('Please ensure all prices are greater than 0');
      return;
    }

    updateBaseRates(localRates);
  };

  const handleReset = () => {
    const confirmed = window.confirm('Are you sure you want to reset to default values?');
    if (confirmed) {
      resetToDefaults();
      setLocalRates(baseRates);
    }
  };

  const hasChanges = JSON.stringify(localRates) !== JSON.stringify(baseRates);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Base Pricing Configuration</h2>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center space-x-2"
            >
              <RotateCcw size={16} />
              <span>Reset to Defaults</span>
            </Button>
            {hasChanges && (
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save size={16} />
                <span>Save Changes</span>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {websiteTypes.map(({ type, label }) => (
            <div
              key={type}
              className={cn(
                'bg-gray-50 p-6 rounded-lg',
                JSON.stringify(localRates[type]) !== JSON.stringify(baseRates[type]) && 'border-2 border-yellow-500'
              )}
            >
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-semibold">{label}</h3>
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onMouseEnter={() => setShowTooltip(type)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <Info size={16} />
                </button>
                {showTooltip === type && (
                  <div className="absolute ml-8 p-2 bg-gray-900 text-white text-sm rounded shadow-lg">
                    Configure base pricing and additional page rates
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Base Price (Includes 5 Pages)</h4>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={localRates[type].basePrice}
                      onChange={(e) => handleRateChange(type, 'basePrice', Number(e.target.value))}
                      className={cn(
                        'input-base pl-8',
                        localRates[type].basePrice !== baseRates[type].basePrice && 'border-yellow-500'
                      )}
                      min="0"
                      step="100"
                    />
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
                        value={localRates[type].perPageRate}
                        onChange={(e) => handleRateChange(type, 'perPageRate', Number(e.target.value))}
                        className={cn(
                          'input-base pl-8',
                          localRates[type].perPageRate !== baseRates[type].perPageRate && 'border-yellow-500'
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
          ))}
        </div>
      </div>
    </div>
  );
};