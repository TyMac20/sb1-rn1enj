import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Code, Paintbrush, Search, HeadphonesIcon } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { Button } from '../Button';
import { AgencyRates } from '../../types/admin';

const ratesSchema = z.object({
  development: z.number().min(0, 'Rate must be positive'),
  design: z.number().min(0, 'Rate must be positive'),
  seo: z.number().min(0, 'Rate must be positive'),
  support: z.number().min(0, 'Rate must be positive'),
});

const rateFields = [
  {
    name: 'development' as const,
    label: 'Development Rate',
    icon: Code,
    description: 'Hourly rate for development work',
  },
  {
    name: 'design' as const,
    label: 'Design Rate',
    icon: Paintbrush,
    description: 'Hourly rate for design work',
  },
  {
    name: 'seo' as const,
    label: 'SEO Rate',
    icon: Search,
    description: 'Hourly rate for SEO services',
  },
  {
    name: 'support' as const,
    label: 'Support Rate',
    icon: HeadphonesIcon,
    description: 'Hourly rate for support services',
  },
];

export const RatesPage: React.FC = () => {
  const { rates, updateRates } = useAdminStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<AgencyRates>({
    resolver: zodResolver(ratesSchema),
    defaultValues: rates,
  });

  const onSubmit = (data: AgencyRates) => {
    updateRates(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Agency Rates</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {rateFields.map(({ name, label, icon: Icon, description }) => (
            <div key={name} className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                <Icon size={16} />
                <span>{label}</span>
              </label>
              <p className="text-sm text-gray-600 mb-2">{description}</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  {...register(name, { valueAsNumber: true })}
                  className="input-base pl-8"
                  placeholder="Enter hourly rate"
                  min="0"
                  step="0.01"
                />
              </div>
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
              )}
            </div>
          ))}
          
          <Button
            type="submit"
            disabled={!isDirty}
            className="w-full"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};