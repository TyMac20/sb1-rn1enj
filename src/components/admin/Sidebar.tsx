import React from 'react';
import { NavLink } from 'react-router-dom';
import { Settings, DollarSign, LogOut, Tag, CircleDollarSign } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { cn } from '../../utils/cn';

export const Sidebar: React.FC = () => {
  const logout = useAdminStore((state) => state.logout);

  return (
    <div className="w-64 bg-white border-r h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>
      
      <nav className="px-4 space-y-2">
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700',
              'hover:bg-gray-100 transition-colors',
              isActive && 'bg-blue-50 text-blue-600'
            )
          }
        >
          <Settings size={20} />
          <span>Agency Profile</span>
        </NavLink>
        
        <NavLink
          to="/admin/base-pricing"
          className={({ isActive }) =>
            cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700',
              'hover:bg-gray-100 transition-colors',
              isActive && 'bg-blue-50 text-blue-600'
            )
          }
        >
          <CircleDollarSign size={20} />
          <span>Base Pricing</span>
        </NavLink>

        <NavLink
          to="/admin/rates"
          className={({ isActive }) =>
            cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700',
              'hover:bg-gray-100 transition-colors',
              isActive && 'bg-blue-50 text-blue-600'
            )
          }
        >
          <DollarSign size={20} />
          <span>Agency Rates</span>
        </NavLink>

        <NavLink
          to="/admin/flat-fees"
          className={({ isActive }) =>
            cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700',
              'hover:bg-gray-100 transition-colors',
              isActive && 'bg-blue-50 text-blue-600'
            )
          }
        >
          <Tag size={20} />
          <span>Flat Fee Services</span>
        </NavLink>
        
        <button
          onClick={logout}
          className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};