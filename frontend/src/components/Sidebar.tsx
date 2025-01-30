import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, FileText, UserCog, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation(); // Get the current URL path

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { id: "orders", icon: Package, label: "Orders", path: "/orders" },
    { id: "invoices", icon: FileText, label: "Invoices", path: "/invoices" },
    { id: "profile", icon: UserCog, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">PrintTrack</h2>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                isActive ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}

        {/* Logout button (no navigation needed, just a function call) */}
        <button className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 mt-8">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
