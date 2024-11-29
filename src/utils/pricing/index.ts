import { QuoteDetails } from '../../types';
import { calculateBaseCosts } from './baseCosts';
import { calculateContentCosts } from './contentCosts';
import { calculateFeatureCosts } from './featureCosts';
import { calculatePostLaunchCosts } from './postLaunchCosts';
import { getAdditionalPagesInfo } from './additionalPages';

export const calculateTotal = (quoteDetails: Partial<QuoteDetails>): number => {
  // Calculate base costs
  let total = calculateBaseCosts(quoteDetails);

  // Add additional pages cost
  const additionalPagesInfo = getAdditionalPagesInfo(quoteDetails);
  if (additionalPagesInfo) {
    total += additionalPagesInfo.total;
  }

  // Add feature costs
  total += calculateFeatureCosts(quoteDetails);

  // Add content costs
  total += calculateContentCosts(quoteDetails);

  // Add post-launch service costs
  total += calculatePostLaunchCosts(quoteDetails);

  return total;
};

export { getAdditionalPagesInfo } from './additionalPages';
export { CONTENT_PRICES } from './constants';