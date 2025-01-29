import React from 'react';
import { LayoutDashboard, Package, FileText, UserCog, LogOut } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }: { 
  activePage: string;
  setActivePage: (page: string) => void;
}) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders', icon: Package, label: 'Orders' },
    { id: 'invoices', icon: FileText, label: 'Invoices' },
    { id: 'profile', icon: UserCog, label: 'Profile' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">PrintTrack</h2>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                activePage === item.id ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
        <button className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 mt-8">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;