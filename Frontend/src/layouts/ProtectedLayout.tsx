import { Bell, Menu, Search, User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { verifyToken } from "../utils/authCheck";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GrUserSettings } from "react-icons/gr";
import { logoutUser } from "../utils/logout";

type UserDetails = {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
};

type OutletContextType = {
  userDetails: UserDetails | null;
};

export const ProtectedLayout = () => {
  const navigate = useNavigate();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const result = await verifyToken();

        if (!result.valid) {
          setUserDetails(null);
        } else {
          setUserDetails(result.user);
        }
      } catch (error) {
        setUserDetails(null);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking authentication...
      </div>
    );
  }

  if (!userDetails) {
    return <Navigate to="/login" replace />;
  }


const handleLogout = async () => {
  const success = await logoutUser();

  if (success) {
    navigate("/");
  }
};

  return (
    <div>
      <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

      <div className={`md:ml-64 ${sideBarOpen ? "bg" : ""}`}>
        <header className="flex justify-between items-center h-[66px] shadow-md px-6 sticky top-0 bg-white z-30">
          <div className="flex items-center gap-x-3">
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

          <div className="flex justify-between items-center gap-x-4 md:gap-x-6">
            <div className="hidden sm:flex justify-center items-center gap-x-2 bg-gray-100 py-1 px-3 rounded">
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

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-x-1 text-gray-600 hover:text-gray-900"
              >
                <User size={22} />

                <span className="text-sm font-medium capitalize hidden sm:block">
                  {userDetails?.role}
                </span>
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 animate__animated animate__fadeIn animate__faster">
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm flex items-center gap-x-2">
                    <GrUserSettings />
                    <span>Profile</span>
                  </button>

                  <button className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600 flex items-center gap-x-2" onClick={handleLogout}>
                    <RiLogoutCircleRLine />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="bg-gray-50 min-h-[calc(100vh-66px)]">
          <Outlet context={{ userDetails } satisfies OutletContextType} />
        </main>
      </div>
    </div>
  );
};
