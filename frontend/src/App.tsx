import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import DashboardStats from "./components/Dashboard.tsx";
import OrderList from "./components/OrderList.tsx";
import InvoiceList from "./components/InvoiceList.tsx";
import Invoice from "./components/CreateInvoicePDF.tsx"; // New invoice detail page

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

// Wrapper component to handle Sidebar conditionally
function Layout() {
  const location = useLocation();
  const hideSidebarRoutes = ["/invoice/:id"]; // Add any routes where Sidebar should be hidden

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Render Sidebar only if the current route is NOT in hideSidebarRoutes */}
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar activePage={""} setActivePage={function (): void {
        throw new Error("Function not implemented.");
      } } />}

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route
              path="/profile"
              element={
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                  <p className="text-gray-600">Profile management coming soon...</p>
                </div>
              }
            />
            <Route path="/invoice/:id" element={<Invoice />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
