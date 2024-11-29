import React from 'react';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { useAdminStore } from '../../store/useAdminStore';
import { Check, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { calculateTotal, getAdditionalPagesInfo } from '../../utils/pricing';

export const ConfirmationStep: React.FC = () => {
  const quoteDetails = useCalculatorStore((state) => state.quoteDetails);
  const { setCurrentStep } = useCalculatorStore();
  const baseRates = useAdminStore((state) => state.baseRates);
  const flatFeeServices = useAdminStore((state) => state.flatFeeServices);

  const handleEdit = () => {
    setCurrentStep(1);
  };

  const websiteType = quoteDetails.websiteType || 'wordpress';
  const websiteRates = baseRates[websiteType];

  if (!websiteRates) {
    return null;
  }

  const additionalPagesInfo = getAdditionalPagesInfo(quoteDetails);
  const customQuoteFeatures = quoteDetails.features?.filter(feature => feature.customQuote) || [];

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
        <h2 className="text-2xl font-bold mb-2">Congratulations</h2>
        <p className="text-gray-600">
          We emailed your quote! Make sure to check your spam folder if not received in the next 5 minutes.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Your Quote Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="font-medium">Base Price (5 pages included):</span>
            <span className="text-gray-700">{formatCurrency(websiteRates.basePrice)}</span>
          </div>

          {additionalPagesInfo && (
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <span className="font-medium">Additional Pages:</span>
                <div className="text-sm text-gray-600">
                  {additionalPagesInfo.count} pages at {formatCurrency(additionalPagesInfo.rate)} each
                </div>
              </div>
              <span className="text-gray-700">{formatCurrency(additionalPagesInfo.total)}</span>
            </div>
          )}

          {quoteDetails.features && quoteDetails.features.length > 0 && (
            <div className="py-2 border-b">
              <span className="font-medium">Selected Features:</span>
              <ul className="mt-2 space-y-1">
                {quoteDetails.features.map((feature) => {
                  const service = flatFeeServices.find(
                    s => s.category === websiteType && s.id === feature.id
                  );
                  return (
                    <li key={feature.id} className="text-gray-700 flex justify-between">
                      <span>• {feature.name}</span>
                      {feature.customQuote ? (
                        <span className="text-blue-600 text-sm">Custom quote required</span>
                      ) : (
                        <span className="text-gray-600">
                          {formatCurrency(service?.price || 0)}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="flex justify-between items-center py-4 text-xl font-bold">
            <span>Estimated Price:</span>
            <span className="text-blue-600">{formatCurrency(calculateTotal(quoteDetails))}</span>
          </div>

          {customQuoteFeatures.length > 0 && (
            <div className="text-gray-600 italic text-sm">
              * Final price will be adjusted based on custom quote features selected
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <Button variant="outline" onClick={handleEdit}>
          Edit Quote
        </Button>
      </div>

      <div className="text-center space-y-6">
        <h3 className="text-xl font-bold">Schedule a meeting for next steps!</h3>
        {customQuoteFeatures.length > 0 && (
          <p className="text-gray-600">
            We will gather the necessary details for the custom quote options listed above to finalize your quote.
          </p>
        )}
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
          <Calendar className="w-8 h-8 mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 mb-4">
            Select a convenient time to discuss your project and get started.
          </p>
          <Button size="lg" className="w-full animate-bounce-custom">
            Book & Let's Get Started!
          </Button>
        </div>
      </div>
    </div>
  );
};