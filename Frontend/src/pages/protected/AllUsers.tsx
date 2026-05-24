import { useEffect, useState } from "react";
import {
  Search,
  Users,
  Pencil,
  Trash2,
  UserPlus,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

import { Card } from "../../components/Card";
import Button from "../../components/Button";
import { API_BASE_URL } from "../../config/env";
import { useNavigate, useOutletContext } from "react-router-dom";

type UserType = {
  _id: string;
  name: string;
  fatherName: string;
  email: string;
  aadhaar: string;
  role: "owner" | "admin" | "member";
};

type UserDetails = {
  _id?: string;
  name?: string;
  email?: string;
  role?: "owner" | "admin" | "member";
};

type OutletContextType = {
  userDetails: UserDetails | null;
};

export const AllUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [editPopup, setEditPopup] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const [showAadhaar, setShowAadhaar] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const { userDetails } = useOutletContext<OutletContextType>();

  const loggedInRole = userDetails?.role;
  const loggedInUserId = userDetails?._id;

  // ======================================================
  // FETCH USERS
  // ======================================================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/auth/all-users`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data.users);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ======================================================
  // FILTER USERS
  // ======================================================
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase());

    const matchRole = selectedRole === "" || user.role === selectedRole;

    return matchSearch && matchRole;
  });

  // ======================================================
  // LOADING UI
  // ======================================================
  if (loading) {
    return <div className="p-6 text-gray-600">Loading users...</div>;
  }

  // ======================================================
  // OPEN EDIT POPUP
  // ======================================================
  const handleEditClick = (user: UserType) => {
    setSelectedUser(user);
    setEditPopup(true);
  };

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (!selectedUser) return;

    const { name, value } = e.target;

    setSelectedUser((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  // ======================================================
  // UPDATE USER
  // ======================================================
  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    const confirmUpdate = window.confirm(
      "Are you sure you want to update this user?",
    );

    if (!confirmUpdate) return;

    try {
      setEditLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/v1/auth/update-user/${selectedUser._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedUser),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      // update local UI
      setUsers((prev) =>
        prev.map((user) =>
          user._id === selectedUser._id ? data.user : user,
        ),
      );

      alert("User updated successfully");

      setEditPopup(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  // ======================================================
  // DELETE USER
  // ======================================================
  const handleDeleteUser = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/auth/delete-user/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      // remove deleted user instantly
      setUsers((prev) => prev.filter((user) => user._id !== id));

      alert("User deleted successfully");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ======================================================
  // PERMISSION HELPERS
  // ======================================================

  const canEditUser = (targetUser: UserType) => {
    if (loggedInRole === "owner") {
      return true;
    }

    if (loggedInRole === "admin") {
      return targetUser.role === "member";
    }

    return false;
  };

  const canDeleteUser = (targetUser: UserType) => {
    // cannot delete self
    if (loggedInUserId === targetUser._id) {
      return false;
    }

    if (loggedInRole === "owner") {
      return targetUser.role !== "owner";
    }

    if (loggedInRole === "admin") {
      return targetUser.role === "member";
    }

    return false;
  };

  return (
    <div className="p-6">
      {/* ====================================================== */}
      {/* TOP HEADING */}
      {/* ====================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="text-primary-900" />
            All Users
          </h1>

          <p className="text-gray-600 mt-2">
            Manage all library users from one place
          </p>
        </div>

        <Button
          onClick={() => navigate("/dashboard/create-user")}
          className="w-fit px-5 py-2 text-white flex items-center gap-2"
        >
          <UserPlus size={18} />
          Add User
        </Button>
      </div>

      {/* ====================================================== */}
      {/* ERROR */}
      {/* ====================================================== */}

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* ====================================================== */}
      {/* SEARCH + FILTER */}
      {/* ====================================================== */}

      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* SEARCH */}
          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* FILTER */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Roles</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
        </div>
      </Card>

      {/* ====================================================== */}
      {/* TABLE */}
      {/* ====================================================== */}

      <Card className="overflow-hidden animate-slide-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* TABLE HEAD */}
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  User
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Father Name
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Aadhaar
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                  Role
                </th>

                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    {/* USER */}
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>

                    {/* FATHER NAME */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.fatherName}
                    </td>

                    {/* AADHAAR */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      XXXX-XXXX-{String(user.aadhaar).slice(-4)}
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                        ${
                          user.role === "owner"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "admin"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }
                      `}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center gap-3">
                        {/* EDIT */}
                        {canEditUser(user) && (
                          <button
                            onClick={() => handleEditClick(user)}
                            className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                          >
                            <Pencil size={18} />
                          </button>
                        )}

                        {/* DELETE */}
                        {canDeleteUser(user) && (
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ====================================================== */}
      {/* EDIT POPUP */}
      {/* ====================================================== */}

      {editPopup && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 px-8 py-5 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Edit User</h2>

                <p className="text-blue-300 text-sm mt-1">
                  Update user information and permissions
                </p>
              </div>

              <button
                onClick={() => setEditPopup(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NAME */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={selectedUser.name}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* FATHER NAME */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Father Name
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    value={selectedUser.fatherName}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={selectedUser.email}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* AADHAAR */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Aadhaar Number
                  </label>

                  <div className="relative">
                    <input
                      type={showAadhaar ? "text" : "password"}
                      name="aadhaar"
                      value={selectedUser.aadhaar}
                      onChange={handleEditChange}
                      disabled={loggedInRole !== "owner"}
                      className={`
                        w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500
                        ${
                          loggedInRole !== "owner"
                            ? "bg-gray-100 cursor-not-allowed text-gray-500"
                            : ""
                        }
                      `}
                    />

                    <button
                      type="button"
                      onClick={() => setShowAadhaar(!showAadhaar)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-700"
                    >
                      {showAadhaar ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* ROLE */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    User Role
                  </label>

                  <select
                    name="role"
                    value={selectedUser.role}
                    onChange={handleEditChange}
                    disabled={
                      loggedInRole !== "owner" ||
                      selectedUser.role === "owner"
                    }
                    className={`
                      w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500
                      ${
                        loggedInRole !== "owner" ||
                        selectedUser.role === "owner"
                          ? "bg-gray-100 cursor-not-allowed text-gray-500"
                          : ""
                      }
                    `}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>

                    {/* ONLY SHOW OWNER FOR EXISTING OWNER */}
                    {selectedUser.role === "owner" && (
                      <option value="owner">Owner</option>
                    )}
                  </select>

                  {selectedUser.role === "owner" && (
                    <p className="text-xs text-red-500 mt-2">
                      Owner role cannot be transferred. Only one owner is
                      allowed in the system.
                    </p>
                  )}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setEditPopup(false)}
                  className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 font-medium transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdateUser}
                  disabled={editLoading}
                  className="px-6 py-3 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-medium shadow-lg transition-all disabled:opacity-50"
                >
                  {editLoading ? "Updating..." : "Update User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};