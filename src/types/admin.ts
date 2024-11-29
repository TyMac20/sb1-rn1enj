import { WebsiteType } from '../types';

export interface AgencyProfile {
  name: string;
  phone: string;
  logo: string;
}

export interface AgencyRates {
  development: number;
  design: number;
  seo: number;
  support: number;
}

export interface PageRates {
  perPage: number;
  total: number;
}

export interface WebsiteTypeRates {
  basePrice: number;
  perPageRate: number;
  additionalPages: {
    '6-10': PageRates;
    '11-15': PageRates;
    '16-20': PageRates;
  };
}

export interface BaseRates {
  [key in WebsiteType]: WebsiteTypeRates;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

export interface ServicePrice {
  id: string;
  serviceId: string;
  categoryId: WebsiteType;
  basePrice: number;
  isCustomQuote: boolean;
  isFixedPrice: boolean;
  lastUpdated: number;
}

export interface FlatFeeService {
  id: string;
  name: string;
  description: string;
  category: WebsiteType;
  price: number;
  customQuote: boolean;
  fixedPrice: boolean;
}

export interface AdminState {
  isAuthenticated: boolean;
  profile: AgencyProfile;
  rates: AgencyRates;
  baseRates: BaseRates;
  services: {
    byId: Record<string, FlatFeeService>;
    allIds: string[];
  };
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<AgencyProfile>) => void;
  updateRates: (rates: Partial<AgencyRates>) => void;
  updateBaseRates: (baseRates: BaseRates) => void;
  updateService: (service: FlatFeeService) => void;
  resetToDefaults: () => void;
}