import { BookOpen, CircleX, LayoutDashboard, Library, Receipt, UserCheck, Users } from "lucide-react";
import type React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({
  sideBarOpen,
  setSideBarOpen,
}: {
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Create User', path: '/dashboard/create-user' },
    { icon: UserCheck, label: 'Roles', path: '/dashboard/roles' },
    { icon: Library, label: 'Books', path: '/dashboard/books' },
    { icon: Receipt, label: 'Transactions', path: '/dashboard/transactions' },
  ]

  const location = useLocation()
  const isActive = (path : string) => location.pathname === path


  return (
    <>
      {/* Side Bar */}
      <aside
        className={`
          bg-brand-primary-900 w-64 min-h-screen z-50
          fixed left-0 top-0
          transition-transform duration-200
          ${sideBarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex justify-between items-center mt-5 mx-4 border-b pb-4 mb-8 border-brand-primary-800">
          <div className="flex items-center gap-x-2 text-white font-semibold">
            <BookOpen />
            <h1>LCG Library</h1>
          </div>
          <button onClick={() => setSideBarOpen(false)} className="md:hidden text-white">
            <CircleX />
          </button>
        </div>


        {/* Menu-Items */}
        {
          menuItems.map((item, index) => (
            <Link key={index} to={item.path} 
            className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${isActive(item.path)? ('bg-brand-primary-800 text-white border-r-4 border-brand-secondary-500') : ('text-brand-primary-100 hover:bg-brand-primary-800 hover:text-white')}`}>
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))
        }
      </aside>

      {/* Content blur when side open */}
      {sideBarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"></div>
      )}
    </>
  );
};

export default Sidebar;
