import { FlatFeeService } from '../types/admin';
import { wordpressFeatures, webAppFeatures, existingSiteFeatures, ecommerceFeatures } from './index';

const getDefaultPrice = (category: string, feature: any) => {
  if (feature.customQuote) return 0;
  
  switch (category) {
    case 'wordpress':
      switch (feature.id) {
        case 'blog': return 1200;
        case 'seo': return 1000;
        case 'social-media': return 500;
        case 'multi-language': return 540;
        case 'faq': return 800;
        case 'contact-forms': return 800;
        case 'analytics': return 600;
        case 'custom-forms': return 1200;
        default: return 1000;
      }
    case 'ecommerce':
      switch (feature.id) {
        case 'customer-login': return 1500;
        case 'inventory': return 2000;
        case 'shipping': return 1800;
        case 'pricing': return 1500;
        case 'customization': return 2000;
        case 'notifications': return 1200;
        case 'multi-language': return 2500;
        case 'analytics-dashboard': return 2000;
        case 'social-media': return 1000;
        case 'reviews': return 1200;
        case 'reporting': return 1800;
        default: return 1500;
      }
    case 'webapp':
      switch (feature.id) {
        case 'user-auth': return 2000;
        case 'real-time-notifications': return 1800;
        case 'dashboard-analytics': return 2500;
        case 'file-management': return 1500;
        case 'payment-processing': return 2500;
        case 'collaboration': return 2000;
        case 'calendar': return 1500;
        case 'user-profiles': return 1200;
        case 'feedback-support': return 1500;
        case 'multi-language': return 2500;
        case 'activity-logs': return 1500;
        case 'live-chat': return 2000;
        default: return 2000;
      }
    case 'existing':
      switch (feature.id) {
        case 'blog': return 1200;
        case 'contact-forms': return 800;
        case 'analytics': return 600;
        case 'social-media': return 500;
        case 'multi-language': return 540;
        case 'faq': return 800;
        case 'redesign': return 3000;
        case 'speed': return 1500;
        case 'mobile': return 2000;
        case 'content': return 1000;
        case 'plugins': return 800;
        case 'accessibility': return 2000;
        case 'forms': return 1200;
        default: return 1000;
      }
    default:
      return 1000;
  }
};

export const DEFAULT_FLAT_FEE_SERVICES: FlatFeeService[] = [
  // WordPress Features
  ...wordpressFeatures.map(feature => ({
    id: feature.id,
    name: feature.name,
    price: getDefaultPrice('wordpress', feature),
    category: 'wordpress',
  })),

  // E-commerce Features
  ...ecommerceFeatures.map(feature => ({
    id: feature.id,
    name: feature.name,
    price: getDefaultPrice('ecommerce', feature),
    category: 'ecommerce',
  })),

  // Web App Features
  ...webAppFeatures.map(feature => ({
    id: feature.id,
    name: feature.name,
    price: getDefaultPrice('webapp', feature),
    category: 'webapp',
  })),

  // Existing Site Features
  ...existingSiteFeatures.map(feature => ({
    id: feature.id,
    name: feature.name,
    price: getDefaultPrice('existing', feature),
    category: 'existing',
  })),
];