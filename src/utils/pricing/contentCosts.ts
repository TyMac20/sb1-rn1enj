import { QuoteDetails } from '../../types';
import { CONTENT_PRICES } from './constants';

export const calculateContentCosts = (quoteDetails: Partial<QuoteDetails>): number => {
  if (!quoteDetails.content) return 0;

  const content = quoteDetails.content;
  const pageCount = quoteDetails.pages || 1;
  let total = 0;

  if (!content.hasLogo) {
    total += content.needsLogoTouchup ? CONTENT_PRICES.logo.touchup : CONTENT_PRICES.logo.new;
  }

  if (!content.hasImages) {
    total += CONTENT_PRICES.images.base + ((pageCount - 1) * CONTENT_PRICES.images.perPage);
  }

  if (!content.hasContent) {
    total += CONTENT_PRICES.content.firstPage + ((pageCount - 1) * CONTENT_PRICES.content.additional);
  }

  return total;
};