import React from 'react';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { ContactInfo } from '../../types';
import { Mail } from 'lucide-react';

export const ContactStep: React.FC = () => {
  const { setContactInfo, setCurrentStep } = useCalculatorStore();
  const websiteType = useCalculatorStore((state) => state.quoteDetails.websiteType);
  const [formData, setFormData] = React.useState<ContactInfo>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    startDate: '',
    termsAccepted: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactInfo(formData);
    // Move to confirmation step
    setCurrentStep(websiteType === 'ecommerce' ? 9 : 7);
  };

  const handleBack = () => {
    // Go back to Post Launch step
    setCurrentStep(websiteType === 'ecommerce' ? 7 : 5);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h2 className="text-2xl font-bold mb-2">Your Quote is Ready To Be Emailed!</h2>
        <p className="text-gray-600">
          Let us know where to send your quote below and we will get it sent to you instantly.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            required
            className="input-base"
            value={formData.businessName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, businessName: e.target.value }))
            }
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Name
          </label>
          <input
            type="text"
            required
            className="input-base"
            value={formData.contactName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contactName: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            className="input-base"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            required
            className="input-base"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Contact Method
        </label>
        <select
          className="input-base"
          value={formData.preferredContact}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              preferredContact: e.target.value as 'email' | 'phone' | 'video',
            }))
          }
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="video">Video Call</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            required
            id="terms"
            className="h-4 w-4 mt-1 text-blue-600 rounded"
            checked={formData.termsAccepted}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }))
            }
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            <span className="font-medium block mb-1">Consent</span>
            I agree to the Terms of Service & the Privacy Policy provided by Backstage Web Design. By providing my phone number, I consent to receiving marketing and promotional messages from Backstage Web Design.
          </label>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">CAPTCHA verification</div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button type="submit">Get Quote</Button>
      </div>
    </form>
  );
};