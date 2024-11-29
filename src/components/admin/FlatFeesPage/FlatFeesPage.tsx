import React from 'react';
import { useAdminStore } from '../../../store/useAdminStore';
import { Button } from '../../Button';
import { Save, RotateCcw } from 'lucide-react';
import { FlatFeeService } from '../../../types/admin';
import { WebsiteTypeFeatures } from './WebsiteTypeFeatures';

export const FlatFeesPage: React.FC = () => {
  const { updateFlatFeeService, resetToDefaults } = useAdminStore();
  const [unsavedChanges, setUnsavedChanges] = React.useState<Record<string, number>>({});

  const handlePriceChange = (service: FlatFeeService, newPrice: number) => {
    const key = `${service.category}-${service.id}`;
    setUnsavedChanges(prev => ({
      ...prev,
      [key]: newPrice,
    }));
  };

  const handleSave = () => {
    Object.entries(unsavedChanges).forEach(([key, price]) => {
      const [category, id] = key.split('-');
      const service = {
        category,
        id,
        price,
      } as FlatFeeService;
      updateFlatFeeService(service);
    });
    setUnsavedChanges({});
  };

  const handleReset = () => {
    const confirmed = window.confirm('Are you sure you want to reset to default values?');
    if (confirmed) {
      resetToDefaults();
      setUnsavedChanges({});
    }
  };

  const hasChanges = Object.keys(unsavedChanges).length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Flat Fee Services</h2>
            <p className="text-sm text-gray-500">Configure pricing for additional features and services</p>
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

        <div className="space-y-8">
          <WebsiteTypeFeatures
            type="wordpress"
            label="WordPress Features"
            unsavedChanges={unsavedChanges}
            onPriceChange={handlePriceChange}
          />
          <WebsiteTypeFeatures
            type="ecommerce"
            label="E-Commerce Features"
            unsavedChanges={unsavedChanges}
            onPriceChange={handlePriceChange}
          />
          <WebsiteTypeFeatures
            type="webapp"
            label="Web App Features"
            unsavedChanges={unsavedChanges}
            onPriceChange={handlePriceChange}
          />
          <WebsiteTypeFeatures
            type="existing"
            label="Existing Site Features"
            unsavedChanges={unsavedChanges}
            onPriceChange={handlePriceChange}
          />
        </div>
      </div>
    </div>
  );
};