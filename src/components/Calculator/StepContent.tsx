import React from 'react';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { IntroStep } from '../steps/IntroStep';
import { WebsiteTypeStep } from '../steps/WebsiteTypeStep';
import { PageCountStep } from '../steps/PageCountStep';
import { ProductCountStep } from '../steps/ProductCountStep';
import { PaymentGatewayStep } from '../steps/PaymentGatewayStep';
import { FeaturesStep } from '../steps/FeaturesStep';
import { ContentStep } from '../steps/ContentStep';
import { PostLaunchStep } from '../steps/PostLaunchStep';
import { ContactStep } from '../steps/ContactStep';
import { ConfirmationStep } from '../steps/ConfirmationStep';
import { Step } from '../../types';

const getSteps = (websiteType: string | undefined): Step[] => {
  const baseSteps: Step[] = [
    { id: 0, title: 'Welcome', component: IntroStep },
    { id: 1, title: 'Website Type', component: WebsiteTypeStep },
    { id: 2, title: 'Pages', component: PageCountStep },
  ];

  const ecommerceSteps: Step[] = [
    { id: 3, title: 'Products', component: ProductCountStep },
    { id: 4, title: 'Payment', component: PaymentGatewayStep },
  ];

  const commonSteps: Step[] = [
    { id: websiteType === 'ecommerce' ? 5 : 3, title: 'Features', component: FeaturesStep },
    { id: websiteType === 'ecommerce' ? 6 : 4, title: 'Content', component: ContentStep },
    { id: websiteType === 'ecommerce' ? 7 : 5, title: 'Post-Launch', component: PostLaunchStep },
    { id: websiteType === 'ecommerce' ? 8 : 6, title: 'Contact', component: ContactStep },
    { id: websiteType === 'ecommerce' ? 9 : 7, title: 'Confirmation', component: ConfirmationStep },
  ];

  return websiteType === 'ecommerce'
    ? [...baseSteps, ...ecommerceSteps, ...commonSteps]
    : [...baseSteps, ...commonSteps];
};

export const StepContent: React.FC = () => {
  const currentStep = useCalculatorStore((state) => state.currentStep);
  const websiteType = useCalculatorStore((state) => state.quoteDetails.websiteType);
  
  const steps = React.useMemo(() => getSteps(websiteType), [websiteType]);
  const CurrentStepComponent = steps[currentStep]?.component || IntroStep;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8 animate-fade-in">
      <CurrentStepComponent />
    </div>
  );
};