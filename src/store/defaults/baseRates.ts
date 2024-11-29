import { BaseRates } from '../../types/admin';

export const DEFAULT_BASE_RATES: BaseRates = {
  wordpress: {
    basePrice: 2500,
    perPageRate: 500,
    additionalPages: {
      '6-10': { perPage: 500, total: 2500 },
      '11-15': { perPage: 500, total: 2500 },
      '16-20': { perPage: 500, total: 2500 },
    },
  },
  ecommerce: {
    basePrice: 5000,
    perPageRate: 1000,
    additionalPages: {
      '6-10': { perPage: 1000, total: 5000 },
      '11-15': { perPage: 1000, total: 5000 },
      '16-20': { perPage: 1000, total: 5000 },
    },
  },
  webapp: {
    basePrice: 6000,
    perPageRate: 1200,
    additionalPages: {
      '6-10': { perPage: 1200, total: 6000 },
      '11-15': { perPage: 1200, total: 6000 },
      '16-20': { perPage: 1200, total: 6000 },
    },
  },
  existing: {
    basePrice: 3000,
    perPageRate: 600,
    additionalPages: {
      '6-10': { perPage: 600, total: 3000 },
      '11-15': { perPage: 600, total: 3000 },
      '16-20': { perPage: 600, total: 3000 },
    },
  },
};