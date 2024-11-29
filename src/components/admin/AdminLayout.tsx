import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAdminStore } from '../../store/useAdminStore';
import { Sidebar } from './Sidebar';

export const AdminLayout: React.FC = () => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};