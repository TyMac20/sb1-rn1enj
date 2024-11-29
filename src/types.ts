import { WebsiteType } from './types';

export interface QuoteDetails {
  websiteType: WebsiteType;
  pages: number;
  products?: {
    count: number;
    range?: string;
  };
  payment?: {
    hasGateway: boolean;
    gateway?: PaymentGateway;
    customGateway?: string;
  };
  content: ContentAssets;
  features: Feature[];
  postLaunchServices: PostLaunchService[];
  timeline: Timeline;
  design: DesignPreferences;
  contactInfo: ContactInfo;
}

export type WebsiteType = 'wordpress' | 'ecommerce' | 'webapp' | 'existing';
export type Timeline = 'asap' | '1-3months' | '3-6months' | 'flexible';
export type PaymentGateway = 'stripe' | 'square' | 'authorize' | 'woocommerce' | null;

export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  customQuote?: boolean;
}

export interface ContentAssets {
  hasLogo: boolean;
  needsLogoTouchup?: boolean;
  hasImages: boolean;
  hasContent: boolean;
}

export interface DesignPreferences {
  style: string;
  colors: string[];
  typography: string;
}

export interface ContactInfo {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone' | 'video';
  startDate: string;
  termsAccepted: boolean;
}

export interface Step {
  id: number;
  title: string;
  component: React.ComponentType;
}

export interface PostLaunchService {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  price: number;
  oneTime?: boolean;
  hourly?: boolean;
}