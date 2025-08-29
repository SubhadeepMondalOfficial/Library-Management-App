import { Shield, UserCheck } from "lucide-react";
import { useState } from "react";
import { Card } from "../../components/Card";

export const Roles = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Owner",
      description: "Full system access and control",
      permissions: ["All Permissions"],
      userCount: 1,
      color: "bg-red-100 text-red-800",
    },
    {
      id: 2,
      name: "Admin",
      description: "All Librarian Responsibilites",
      permissions: [
        "Create Users",
        "Manage Books",
        "View Reports",
        "Manage Tansactions",
      ],
      userCount: 3,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      name: "Member",
      description: "Basic Library Access",
      permissions: ["View Books", "Issued Books", "Available Books"],
      userCount: 150,
      color: "bg-green-200 text-green-800",
    },
  ]);

  return (
    <div className="pt-6 pb-4 px-6">
      <div>
        <div className="flex items-center">
          <UserCheck className="w-8 h-8 mr-3 text-brand-primary-900" />
          <h1 className="text-3xl font-bold">Roles Management</h1>
        </div>
        <p className="text-gray-600 mt-2">Manage user roles and permissions</p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <Card key={index} hover className="animate-slide-up p-6" >
            <div className="flex items-center gap-x-3">
              <Shield className={`${role.color.split(" ")[1]}`} />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${role.color}`}>{role.userCount} users</span>
              </div>
            </div>

            <p className="my-4 text-gray-500 text-sm">{role.description}</p>

            <div>
              <p className="text-xs font-medium text-gray-700 mb-2">Permissions:</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permit, index) => (
                  <span key={index} className={`${role.color} rounded-lg text-sm px-2 py-1`}>{permit}</span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
