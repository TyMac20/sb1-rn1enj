import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, Phone, Image } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { Button } from '../Button';
import { AgencyProfile } from '../../types/admin';

const profileSchema = z.object({
  name: z.string().min(1, 'Agency name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  logo: z.string().url('Must be a valid URL').or(z.literal('')),
});

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile } = useAdminStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<AgencyProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  const onSubmit = (data: AgencyProfile) => {
    updateProfile(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Agency Profile</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
              <Building2 size={16} />
              <span>Agency Name</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className="input-base"
              placeholder="Enter your agency name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
              <Phone size={16} />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="input-base"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
          
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
              <Image size={16} />
              <span>Logo URL</span>
            </label>
            <input
              type="url"
              {...register('logo')}
              className="input-base"
              placeholder="Enter your logo URL"
            />
            {errors.logo && (
              <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
            )}
          </div>
          
          {profile.logo && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img
                src={profile.logo}
                alt="Agency logo"
                className="max-w-xs h-auto rounded-lg border"
              />
            </div>
          )}
          
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