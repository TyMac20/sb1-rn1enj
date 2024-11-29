import React from 'react';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { CreditCard } from 'lucide-react';
import { PaymentGateway } from '../../types';
import { cn } from '../../utils/cn';

const paymentGateways = [
  { id: 'stripe', name: 'Stripe', description: 'Popular payment solution with competitive rates' },
  { id: 'square', name: 'Square', description: 'Integrated payments and point-of-sale system' },
  { id: 'authorize', name: 'Authorize.net', description: 'Trusted payment gateway for businesses' },
  { id: 'woocommerce', name: 'WooCommerce Payments', description: 'Native payments for WooCommerce' },
];

export const PaymentGatewayStep: React.FC = () => {
  const { setCurrentStep } = useCalculatorStore();
  const [hasGateway, setHasGateway] = React.useState<boolean | null>(null);
  const [selectedGateway, setSelectedGateway] = React.useState<PaymentGateway>(null);
  const [customGateway, setCustomGateway] = React.useState('');

  const handleContinue = () => {
    useCalculatorStore.setState((state) => ({
      quoteDetails: {
        ...state.quoteDetails,
        payment: {
          hasGateway,
          gateway: hasGateway ? null : selectedGateway,
          customGateway: hasGateway ? customGateway : null,
        },
      },
    }));
    setCurrentStep(5); // Move to content step
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <CreditCard className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold mb-2">Payment Gateway Setup</h2>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Do you have a payment gateway already selected?</h3>
          <div className="flex items-start space-x-4">
            <div className="flex space-x-4">
              <Button
                variant={hasGateway === true ? 'primary' : 'outline'}
                onClick={() => setHasGateway(true)}
              >
                Yes
              </Button>
              <Button
                variant={hasGateway === false ? 'primary' : 'outline'}
                onClick={() => {
                  setHasGateway(false);
                  setCustomGateway('');
                }}
              >
                No
              </Button>
            </div>
            {hasGateway === true && (
              <div className="flex-1 max-w-xs animate-fade-in">
                <input
                  type="text"
                  value={customGateway}
                  onChange={(e) => setCustomGateway(e.target.value)}
                  placeholder="Enter your payment gateway name"
                  className="input-base w-full"
                  required
                />
              </div>
            )}
          </div>
        </div>

        {hasGateway === false && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold">Choose a payment gateway:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentGateways.map((gateway) => (
                <button
                  key={gateway.id}
                  onClick={() => setSelectedGateway(gateway.id as PaymentGateway)}
                  className={cn(
                    'p-6 rounded-lg border-2 text-left transition-all duration-200',
                    'hover:border-blue-500 hover:shadow-md',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                    selectedGateway === gateway.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  )}
                >
                  <h4 className="text-lg font-semibold mb-2">{gateway.name}</h4>
                  <p className="text-gray-600 text-sm">{gateway.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => setCurrentStep(3)}>
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={
            hasGateway === null || 
            (hasGateway === true && !customGateway) || 
            (hasGateway === false && !selectedGateway)
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
};