import { QuoteDetails } from '../../types';

export const calculatePostLaunchCosts = (quoteDetails: Partial<QuoteDetails>): number => {
  if (!quoteDetails.postLaunchServices) return 0;

  return quoteDetails.postLaunchServices.reduce((total, service) => {
    if (service.oneTime) {
      return total + service.price;
    }
    return total;
  }, 0);
};