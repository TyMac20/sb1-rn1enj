import React from 'react';
import { useAdminStore } from '../../../store/useAdminStore';
import { Button } from '../../Button';
import { Save, Info, RotateCcw } from 'lucide-react';
import { WebsiteType } from '../../../types';
import { BaseRates } from '../../../types/admin';
import { cn } from '../../../utils/cn';
import { PricingCard } from './PricingCard';

const websiteTypes = [
  { type: 'wordpress' as WebsiteType, label: 'WordPress' },
  { type: 'ecommerce' as WebsiteType, label: 'E-Commerce' },
  { type: 'webapp' as WebsiteType, label: 'Web App' },
  { type: 'existing' as WebsiteType, label: 'Existing Site' },
];

export const BasePricingPage: React.FC = () => {
  const { baseRates, updateBaseRates, resetToDefaults } = useAdminStore();
  const [localRates, setLocalRates] = React.useState<BaseRates>(baseRates);
  const [showTooltip, setShowTooltip] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLocalRates(baseRates);
  }, [baseRates]);

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
    }
  };

  const hasChanges = JSON.stringify(localRates) !== JSON.stringify(baseRates);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Base Pricing Configuration</h2>
            <p className="text-sm text-gray-500">Configure base prices and per-page rates for each website type</p>
          </div>
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

        <div className="grid grid-cols-1 gap-6">
          {websiteTypes.map(({ type, label }) => (
            <PricingCard
              key={type}
              type={type}
              label={label}
              rates={localRates[type]}
              baseRates={baseRates[type]}
              onChange={(field, value) => handleRateChange(type, field, value)}
              showTooltip={showTooltip === type}
              onTooltipChange={(show) => setShowTooltip(show ? type : null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};