import { FlatFeeService } from '../../types/admin';
import { wordpressFeatures, webAppFeatures, existingSiteFeatures, ecommerceFeatures } from '../../features';

// List of features with fixed pricing
const FIXED_PRICE_FEATURES = new Set([
  // WordPress
  'contact-forms',
  'social-media',
  'custom-forms',
  'multi-language',
  
  // E-commerce
  'customer-login',
  'notifications',
  'multi-language',
  'analytics-dashboard',
  'social-media',
  
  // Web App
  'user-auth',
  'role-based-access',
  'real-time-notifications',
  'dashboard-analytics',
  'api-integration',
  'file-management',
  'payment-processing',
  'user-profiles',
  'feedback-support',
  'multi-language',
  'activity-logs',
  'live-chat',
  
  // Existing Site
  'contact-forms',
  'social-media',
  'multi-language',
  'faq'
]);

const getDefaultPrice = (category: string, feature: any): number => {
  const prices: Record<string, Record<string, number>> = {
    wordpress: {
      blog: 1200,
      seo: 1000,
      'social-media': 500,
      'multi-language': 540,
      faq: 800,
      'contact-forms': 800,
      analytics: 600,
      'custom-forms': 1200,
    },
    ecommerce: {
      'customer-login': 1500,
      inventory: 2000,
      shipping: 1800,
      pricing: 1500,
      customization: 2000,
      notifications: 1200,
      'multi-language': 2500,
      'analytics-dashboard': 2000,
      'social-media': 1000,
      reviews: 1200,
      reporting: 1800,
    },
    webapp: {
      'user-auth': 2000,
      'real-time-notifications': 1800,
      'dashboard-analytics': 2500,
      'file-management': 1500,
      'payment-processing': 2500,
      collaboration: 2000,
      calendar: 1500,
      'user-profiles': 1200,
      'feedback-support': 1500,
      'multi-language': 2500,
      'activity-logs': 1500,
      'live-chat': 2000,
    },
    existing: {
      blog: 1200,
      'contact-forms': 800,
      analytics: 600,
      'social-media': 500,
      'multi-language': 540,
      faq: 800,
      redesign: 3000,
      speed: 1500,
      mobile: 2000,
      content: 1000,
      plugins: 800,
      accessibility: 2000,
      forms: 1200,
    },
  };

  if (feature.customQuote) return 0;
  return prices[category]?.[feature.id] || 1000;
};

const convertFeaturesToServices = (features: any[], category: string): FlatFeeService[] => {
  return features.map(feature => ({
    id: feature.id,
    name: feature.name,
    price: getDefaultPrice(category, feature),
    category,
    customQuote: feature.customQuote || false,
    fixedPrice: FIXED_PRICE_FEATURES.has(feature.id),
  }));
};

export const DEFAULT_FLAT_FEE_SERVICES: FlatFeeService[] = [
  ...convertFeaturesToServices(wordpressFeatures, 'wordpress'),
  ...convertFeaturesToServices(ecommerceFeatures, 'ecommerce'),
  ...convertFeaturesToServices(webAppFeatures, 'webapp'),
  ...convertFeaturesToServices(existingSiteFeatures, 'existing'),
];