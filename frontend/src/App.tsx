import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.tsx";
import DashboardStats from "./components/Dashboard.tsx";
import OrderList from "./components/OrderList.tsx";
import InvoiceList from "./components/InvoiceList.tsx";
import Invoice from "./components/CreateInvoicePDF.tsx";
import Login from "./components/Login.tsx";

function DashboardPage() {
  return (
    <div>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderList />
        <InvoiceList />
      </div>
    </div>
  );
}

function Layout() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="/profile" element={<div className="bg-white rounded-lg shadow p-6"><h2 className="text-xl font-semibold mb-4">Profile Settings</h2><p className="text-gray-600">Profile management coming soon...</p></div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
