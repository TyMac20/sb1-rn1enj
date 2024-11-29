import { QuoteDetails } from '../../types';
import { useAdminStore } from '../../store/useAdminStore';

export const getAdditionalPagesInfo = (quoteDetails: Partial<QuoteDetails>) => {
  if (!quoteDetails.websiteType || !quoteDetails.pages || quoteDetails.pages <= 5) {
    return null;
  }

  const adminStore = useAdminStore.getState();
  const websiteRates = adminStore.baseRates[quoteDetails.websiteType];

  if (!websiteRates) {
    return null;
  }

  const additionalPages = quoteDetails.pages - 5;
  const perPageRate = websiteRates.perPageRate;
  const totalCost = additionalPages * perPageRate;

  return {
    count: additionalPages,
    rate: perPageRate,
    total: totalCost,
  };
};