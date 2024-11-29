import { QuoteDetails } from '../../types';
import { useAdminStore, getServiceById } from '../../store/useAdminStore';

export const calculateFeatureCosts = (quoteDetails: Partial<QuoteDetails>): number => {
  if (!quoteDetails.features?.length || !quoteDetails.websiteType) return 0;

  let total = 0;

  quoteDetails.features.forEach(feature => {
    if (!feature.customQuote) {
      const service = getServiceById(quoteDetails.websiteType!, feature.id);
      if (service && !service.customQuote) {
        total += service.price;
      }
    }
  });

  return total;
};