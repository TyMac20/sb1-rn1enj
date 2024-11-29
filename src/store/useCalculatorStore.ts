import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuoteDetails, WebsiteType, Feature, Timeline, DesignPreferences, ContactInfo, ContentAssets, PaymentGateway, PostLaunchService } from '../types';

interface CalculatorState {
  currentStep: number;
  quoteDetails: Partial<QuoteDetails>;
  setCurrentStep: (step: number) => void;
  setWebsiteType: (type: WebsiteType) => void;
  setPages: (pages: number) => void;
  setProducts: (count: number) => void;
  setFeatures: (features: Feature[]) => void;
  toggleFeature: (feature: Feature) => void;
  togglePostLaunchService: (service: PostLaunchService) => void;
  setContentAssets: (content: ContentAssets) => void;
  setContactInfo: (info: ContactInfo) => void;
  resetQuote: () => void;
}

const initialState = {
  currentStep: 0,
  quoteDetails: {
    websiteType: undefined,
    pages: undefined,
    products: undefined,
    features: [],
    postLaunchServices: [],
    content: {
      hasLogo: false,
      needsLogoTouchup: false,
      hasImages: false,
      hasContent: false,
    },
    contactInfo: undefined,
  },
};

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setWebsiteType: (type) => set((state) => ({
        quoteDetails: {
          ...initialState.quoteDetails, // Reset all other fields when changing website type
          websiteType: type,
        },
      })),

      setPages: (pages) => set((state) => ({
        quoteDetails: {
          ...state.quoteDetails,
          pages,
        },
      })),

      setProducts: (count) => set((state) => ({
        quoteDetails: {
          ...state.quoteDetails,
          products: { count },
        },
      })),

      setFeatures: (features) => set((state) => ({
        quoteDetails: {
          ...state.quoteDetails,
          features,
        },
      })),

      toggleFeature: (feature) => set((state) => {
        const currentFeatures = state.quoteDetails.features || [];
        const featureExists = currentFeatures.some((f) => f.id === feature.id);
        
        const updatedFeatures = featureExists
          ? currentFeatures.filter((f) => f.id !== feature.id)
          : [...currentFeatures, feature];

        return {
          quoteDetails: {
            ...state.quoteDetails,
            features: updatedFeatures,
          },
        };
      }),

      togglePostLaunchService: (service) => set((state) => {
        const currentServices = state.quoteDetails.postLaunchServices || [];
        const serviceExists = currentServices.some((s) => s.id === service.id);
        
        const updatedServices = serviceExists
          ? currentServices.filter((s) => s.id !== service.id)
          : [...currentServices, service];

        return {
          quoteDetails: {
            ...state.quoteDetails,
            postLaunchServices: updatedServices,
          },
        };
      }),

      setContentAssets: (content) => set((state) => ({
        quoteDetails: {
          ...state.quoteDetails,
          content,
        },
      })),

      setContactInfo: (contactInfo) => set((state) => ({
        quoteDetails: {
          ...state.quoteDetails,
          contactInfo,
        },
      })),

      resetQuote: () => set(initialState),
    }),
    {
      name: 'calculator-storage',
      partialize: (state) => ({
        quoteDetails: state.quoteDetails,
      }),
    }
  )
);