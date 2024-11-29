import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { useCalculatorStore } from '../../store/useCalculatorStore';
import { Settings } from 'lucide-react';

export const IntroStep: React.FC = () => {
  const setCurrentStep = useCalculatorStore((state) => state.setCurrentStep);

  return (
    <div className="text-center relative">
      <h2 className="text-3xl font-bold mb-4">Backstage Web Design Cost Calculator</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Get an instant quote for your website project. Our calculator will help you
        understand the costs involved based on your specific requirements.
      </p>
      <Button
        size="lg"
        onClick={() => setCurrentStep(1)}
        className="animate-bounce"
      >
        Get Started
      </Button>

      <div className="fixed bottom-8 right-8 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <Link to="/admin/login">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Settings size={16} />
            <span>Admin Login</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};