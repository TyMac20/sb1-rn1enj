import React from 'react';
import { useRouteError } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="w-full"
        >
          Refresh Page
        </Button>
      </div>
    </div>
  );
};