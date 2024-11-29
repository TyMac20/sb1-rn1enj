import React from 'react';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { Globe, Wrench, Users, HeadphonesIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { PostLaunchService } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

const postLaunchServices: PostLaunchService[] = [
  {
    id: 'hosting',
    name: 'Hosting',
    description: 'Every site needs a reliable home on the internet. We\'ll handle your hosting needs with fast, secure, and dependable service so your website stays online and performs at its best.',
    icon: Globe,
    price: 50,
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    description: 'Preplanned Quarterly Maintenance for a Secure and Updated Site. Our team performs scheduled quarterly checkups to handle everything your site needs. From updates and performance monitoring to security checks and issue resolution, we ensure your site stays safe, functional, and up to date—all with minimal effort on your part.',
    icon: Wrench,
    price: 150,
  },
  {
    id: 'training',
    name: 'Website Training',
    description: 'Learn to take control of your site with confidence. Gain the skills to manage your site with confidence. Our step-by-step training covers how to update content, add images, manage products, and more—empowering you to maintain your website with ease.',
    icon: Users,
    price: 300,
    oneTime: true,
  },
  {
    id: 'support',
    name: 'On-Demand Support',
    description: 'Support Tailored to Your Needs—When You Need It. Leverage our dedicated help desk platform for expert assistance on demand. Easily submit support requests for fixing issues, updating features, adding a staff member, or updating seasonal promo images. Perfect for those who need reliable support without the commitment of a full maintenance plan. We offer this service with a NO COST sign up, then only pay monthly for what you use.',
    icon: HeadphonesIcon,
    price: 100,
    hourly: true,
  },
];

export const PostLaunchStep: React.FC = () => {
  const { setCurrentStep, togglePostLaunchService } = useCalculatorStore();
  const selectedServices = useCalculatorStore((state) => state.quoteDetails.postLaunchServices || []);
  const websiteType = useCalculatorStore((state) => state.quoteDetails.websiteType);

  const isSelected = (service: PostLaunchService) =>
    selectedServices.some((s) => s.id === service.id);

  const handleToggle = (service: PostLaunchService) => {
    togglePostLaunchService(service);
  };

  const handleContinue = () => {
    // Go to Contact step
    setCurrentStep(websiteType === 'ecommerce' ? 8 : 6);
  };

  const handleBack = () => {
    // Go back to Content step
    setCurrentStep(websiteType === 'ecommerce' ? 6 : 4);
  };

  const getPriceDisplay = (service: PostLaunchService) => {
    if (service.oneTime) {
      return `${formatCurrency(service.price)} one-time fee`;
    }
    if (service.hourly) {
      return `${formatCurrency(service.price)}/hour`;
    }
    return `${formatCurrency(service.price)}/month`;
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <Wrench className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold mb-2">Post-Launch Care</h2>
        <p className="text-gray-600">
          Choose the services you need to maintain, manage and optimize your website needs.
        </p>
        <p className="text-gray-600 mt-2">
          Select one or more options to see how we can train your staff and provide support for your site on a monthly basis.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {postLaunchServices.map((service) => (
          <button
            key={service.id}
            onClick={() => handleToggle(service)}
            className={cn(
              'p-6 rounded-lg border-2 text-left transition-all duration-200',
              'hover:border-blue-500 hover:shadow-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              isSelected(service) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            )}
          >
            <div className="flex items-start">
              <service.icon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <span className="inline-block mt-2 text-sm text-blue-600">
                  {getPriceDisplay(service)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};