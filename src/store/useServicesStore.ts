import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FlatFeeService } from '../types/admin';
import { DEFAULT_FLAT_FEE_SERVICES } from './defaults/flatFeeServices';

interface ServicesState {
  services: FlatFeeService[];
  updateService: (updatedService: FlatFeeService) => void;
  resetServices: () => void;
}

export const useServicesStore = create<ServicesState>()(
  persist(
    (set) => ({
      services: DEFAULT_FLAT_FEE_SERVICES,
      
      updateService: (updatedService) => {
        set((state) => ({
          services: state.services.map((service) =>
            service.id === updatedService.id && service.category === updatedService.category
              ? { ...service, ...updatedService }
              : service
          ),
        }));
      },
      
      resetServices: () => {
        set({ services: DEFAULT_FLAT_FEE_SERVICES });
      },
    }),
    {
      name: 'services-store',
      version: 1,
    }
  )
);

export const getServicesByCategory = (category: string): FlatFeeService[] => {
  const services = useServicesStore.getState().services;
  return services.filter((service) => service.category === category);
};

export const getServiceById = (category: string, id: string): FlatFeeService | undefined => {
  const services = useServicesStore.getState().services;
  return services.find((service) => service.category === category && service.id === id);
};