import { QuoteDetails } from '../../types';
import { useAdminStore } from '../../store/useAdminStore';

export const calculateBaseCosts = (quoteDetails: Partial<QuoteDetails>): number => {
  if (!quoteDetails.websiteType) return 0;
  
  const adminStore = useAdminStore.getState();
  const websiteRates = adminStore.baseRates[quoteDetails.websiteType];
  
  if (!websiteRates) return 0;
  
  return websiteRates.basePrice;
};