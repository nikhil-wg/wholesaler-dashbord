import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import DashboardStats from './components/Dashboard.tsx';
import OrderList from './components/OrderList.tsx';
import InvoiceList from './components/InvoiceList.tsx';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </h1>
          </header>

          {activePage === 'dashboard' && (
            <>
              <DashboardStats />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrderList />
                <InvoiceList />
              </div>
            </>
          )}

          {activePage === 'orders' && (
            <OrderList />
          )}

          {activePage === 'invoices' && (
            <InvoiceList />
          )}

          {activePage === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              <p className="text-gray-600">Profile management coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;