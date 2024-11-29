import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AdminState, AgencyProfile, AgencyRates, FlatFeeService, BaseRates } from '../types/admin';
import { DEFAULT_BASE_RATES } from './defaults/baseRates';
import { DEFAULT_FLAT_FEE_SERVICES } from './defaults/flatFeeServices';

const STORE_VERSION = 1;

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      profile: {
        name: '',
        phone: '',
        logo: '',
      },
      rates: {
        development: 150,
        design: 125,
        seo: 100,
        support: 75,
      },
      baseRates: DEFAULT_BASE_RATES,
      flatFeeServices: DEFAULT_FLAT_FEE_SERVICES,
      
      login: (username: string, password: string) => {
        if (username === 'admin' && password === 'admin') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => set({ isAuthenticated: false }),
      
      updateProfile: (profile: Partial<AgencyProfile>) => 
        set(state => ({ profile: { ...state.profile, ...profile } })),
      
      updateRates: (rates: Partial<AgencyRates>) => 
        set(state => ({ rates: { ...state.rates, ...rates } })),
      
      updateBaseRates: (baseRates: BaseRates) => set({ baseRates }),
      
      updateFlatFeeService: (updatedService: FlatFeeService) => {
        set(state => ({
          flatFeeServices: state.flatFeeServices.map(service => 
            service.id === updatedService.id && service.category === updatedService.category
              ? { ...service, price: updatedService.price }
              : service
          )
        }));
      },

      resetToDefaults: () => set({
        baseRates: DEFAULT_BASE_RATES,
        flatFeeServices: DEFAULT_FLAT_FEE_SERVICES,
      }),
    }),
    {
      name: 'admin-store',
      version: STORE_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        profile: state.profile,
        rates: state.rates,
        baseRates: state.baseRates,
        flatFeeServices: state.flatFeeServices,
      }),
    }
  )
);

export const getServicesByCategory = (category: string): FlatFeeService[] => {
  const state = useAdminStore.getState();
  return state.flatFeeServices.filter(service => service.category === category);
};

export const getServiceById = (category: string, id: string): FlatFeeService | undefined => {
  const state = useAdminStore.getState();
  return state.flatFeeServices.find(
    service => service.category === category && service.id === id
  );
};