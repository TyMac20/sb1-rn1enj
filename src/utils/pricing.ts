import { QuoteDetails } from '../types';
import { useAdminStore } from '../store/useAdminStore';

export const CONTENT_PRICES = {
  logo: {
    new: 500,
    touchup: 250,
  },
  images: {
    base: 800,
    perPage: 100,
  },
  content: {
    firstPage: 1200,
    additional: 150,
  },
};

export const calculateTotal = (quoteDetails: Partial<QuoteDetails>): number => {
  if (!quoteDetails.websiteType) return 0;
  
  const adminStore = useAdminStore.getState();
  const websiteRates = adminStore.baseRates[quoteDetails.websiteType];
  
  if (!websiteRates) return 0;
  
  // Start with base price (includes first 5 pages)
  let total = websiteRates.basePrice;

  // Calculate additional pages cost using perPageRate
  if (quoteDetails.pages && quoteDetails.pages > 5) {
    const additionalPages = quoteDetails.pages - 5;
    total += additionalPages * websiteRates.perPageRate;
  }

  // Add feature costs
  quoteDetails.features?.forEach(feature => {
    if (!feature.customQuote) {
      const service = adminStore.flatFeeServices.find(
        s => s.category === quoteDetails.websiteType && s.id === feature.id
      );
      if (service) {
        total += service.price;
      }
    }
  });

  // Calculate content costs
  if (quoteDetails.content) {
    const content = quoteDetails.content;
    const pageCount = quoteDetails.pages || 1;

    if (!content.hasLogo) {
      total += content.needsLogoTouchup ? CONTENT_PRICES.logo.touchup : CONTENT_PRICES.logo.new;
    }

    if (!content.hasImages) {
      total += CONTENT_PRICES.images.base + ((pageCount - 1) * CONTENT_PRICES.images.perPage);
    }

    if (!content.hasContent) {
      total += CONTENT_PRICES.content.firstPage + ((pageCount - 1) * CONTENT_PRICES.content.additional);
    }
  }

  // Add post-launch service costs
  quoteDetails.postLaunchServices?.forEach(service => {
    if (service.oneTime) {
      total += service.price;
    }
  });

  return total;
};

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
    total: totalCost
  };
};