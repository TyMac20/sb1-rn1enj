import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoginPage } from './components/admin/LoginPage';
import { ProfilePage } from './components/admin/ProfilePage';
import { RatesPage } from './components/admin/RatesPage';
import { FlatFeesPage } from './components/admin/FlatFeesPage';
import { BasePricingPage } from './components/admin/BasePricingPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/admin/login',
    element: <LoginPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'rates',
        element: <RatesPage />,
      },
      {
        path: 'flat-fees',
        element: <FlatFeesPage />,
      },
      {
        path: 'base-pricing',
        element: <BasePricingPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);