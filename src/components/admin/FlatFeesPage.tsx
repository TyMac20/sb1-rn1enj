import React, { useState } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { Button } from '../Button';
import { DollarSign, Save, RotateCcw } from 'lucide-react';
import { FlatFeeService } from '../../types/admin';
import { cn } from '../../utils/cn';

const categories = {
  wordpress: 'WordPress',
  ecommerce: 'E-Commerce',
  webapp: 'Web App',
  existing: 'Existing Site',
};

export const FlatFeesPage: React.FC = () => {
  const { flatFeeServices, updateFlatFeeService, resetToDefaults } = useAdminStore();
  const [selectedCategory, setSelectedCategory] = useState<FlatFeeService['category']>('wordpress');
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, number>>({});
  
  const handlePriceChange = (service: FlatFeeService, newPrice: number) => {
    setUnsavedChanges({
      ...unsavedChanges,
      [`${service.category}-${service.id}`]: newPrice,
    });
  };

  const handleSave = () => {
    Object.entries(unsavedChanges).forEach(([key, price]) => {
      const [category, id] = key.split('-');
      const service = flatFeeServices.find(
        (s) => s.category === category && s.id === id
      );
      if (service) {
        updateFlatFeeService({
          ...service,
          price,
        });
      }
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
          <h2 className="text-2xl font-bold">Flat Fee Services</h2>
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
        
        <div className="flex space-x-4 mb-6">
          {Object.entries(categories).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSelectedCategory(value as FlatFeeService['category'])}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === value
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          {flatFeeServices
            .filter((service) => service.category === selectedCategory)
            .map((service) => {
              const key = `${service.category}-${service.id}`;
              const currentPrice = unsavedChanges[key] ?? service.price;
              
              return (
                <div
                  key={key}
                  className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    {service.customQuote && (
                      <p className="text-sm text-blue-600">Custom quote required</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign size={16} className="text-gray-500" />
                    <input
                      type="number"
                      value={currentPrice}
                      onChange={(e) => handlePriceChange(service, Number(e.target.value))}
                      className={cn(
                        'w-24 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500',
                        unsavedChanges[key] !== undefined ? 'border-yellow-500' : ''
                      )}
                      min="0"
                      step="1"
                      disabled={service.customQuote}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};