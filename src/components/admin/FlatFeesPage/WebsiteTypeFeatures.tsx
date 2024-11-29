import React from 'react';
import { FlatFeeService } from '../../../types/admin';
import { WebsiteType } from '../../../types';
import { DollarSign, Lock } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { getServicesByCategory } from '../../../store/useAdminStore';

interface WebsiteTypeFeaturesProps {
  type: WebsiteType;
  label: string;
  unsavedChanges: Record<string, number>;
  onPriceChange: (service: FlatFeeService, price: number) => void;
}

export const WebsiteTypeFeatures: React.FC<WebsiteTypeFeaturesProps> = ({
  type,
  label,
  unsavedChanges,
  onPriceChange,
}) => {
  const [expanded, setExpanded] = React.useState(true);
  const services = getServicesByCategory(type);

  const handlePriceChange = (service: FlatFeeService, value: string) => {
    if (service.fixedPrice) return;
    
    const price = parseInt(value, 10);
    if (!isNaN(price) && price >= 0) {
      onPriceChange(service, price);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-xl font-semibold">{label}</h3>
        <span className="text-blue-600">
          {expanded ? 'Collapse' : 'Expand'}
        </span>
      </button>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const key = `${service.category}-${service.id}`;
            const currentPrice = unsavedChanges[key] ?? service.price;

            return (
              <div
                key={service.id}
                className={cn(
                  'bg-white p-4 rounded-lg border-2',
                  service.fixedPrice ? 'border-gray-200' : 
                  unsavedChanges[key] !== undefined ? 'border-yellow-500' : 'border-gray-200'
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  {service.fixedPrice && (
                    <Lock size={16} className="text-gray-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign size={16} className="text-gray-500" />
                  <input
                    type="number"
                    value={currentPrice}
                    onChange={(e) => handlePriceChange(service, e.target.value)}
                    className={cn(
                      "w-32 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500",
                      service.fixedPrice && "bg-gray-100 cursor-not-allowed"
                    )}
                    min="0"
                    step="100"
                    disabled={service.customQuote || service.fixedPrice}
                  />
                  {service.customQuote && (
                    <span className="text-sm text-blue-600 ml-2">Custom quote required</span>
                  )}
                  {service.fixedPrice && (
                    <span className="text-sm text-gray-500 ml-2">Fixed price</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};