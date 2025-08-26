import { Bell, Menu, Search, User } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export const ProtectedLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div>
      <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

      <div className={`md:ml-64 ${sideBarOpen && "bg"}`}>
        <header className="flex justify-between items-center h-16 shadow-md px-6 sticky top-0 bg-white">
          <div>
            {!sideBarOpen && (
              <button
                onClick={() => setSideBarOpen(true)}
                className="md:hidden"
              >
                <Menu />
              </button>
            )}
            <h1 className="font-semibold text-lg hidden md:block">
              Library Management
            </h1>
          </div>

          <div className="flex justify-between items-center gap-x-6">
            <div className="flex justify-center items-center gap-x-2 bg-gray-100 py-1 px-3 rounded">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search Books..."
                className="bg-gray-100 focus:outline-none w-56"
              />
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              <Bell size={22} />
            </button>
            <button className="flex justify-center items-center gap-x-1 text-gray-600 hover:text-gray-900">
              <User size={22} />
              <span>Admin</span>
            </button>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
