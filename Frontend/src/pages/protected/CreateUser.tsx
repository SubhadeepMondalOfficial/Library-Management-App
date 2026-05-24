import { useState } from "react";
import { UserPlus, Check } from "lucide-react";
import { Card } from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";

export const CreateUser = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    { value: "member", label: "Member" },
    { value: "admin", label: "Admin" },
    { value: "librarian", label: "Librarian" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    aadhaar: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setError("");

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/v1/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // IMPORTANT for HttpOnly cookies
        credentials: "include",

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      setSuccess(true);

      // clear form
      setFormData({
        name: "",
        fatherName: "",
        email: "",
        aadhaar: "",
        role: "",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto pt-12">
        <Card className="text-center p-8 animate-slide-up">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            User Created Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            The new user has been added to the system and will receive login
            credentials via email.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            className="text-white px-3 py-2"
          >
            Create Another User
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-8">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
          <UserPlus className="w-8 h-8 mr-3 text-primary-900" />
          Create New User
        </h1>
        <p className="text-gray-600 mt-2">
          Add a new user to the library management system
        </p>
      </div>

      <Card className="animate-slide-up p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              htmlFor="fullName"
              type="text"
              name="name"
              required
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Father's Name"
              htmlFor="fatherName"
              type="text"
              name="fatherName"
              required
              placeholder="User's Father Name"
              value={formData.fatherName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address"
              htmlFor="emailAddress"
              type="email"
              name="email"
              required
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Aadhaar Number"
              htmlFor="aadhaarNumber"
              type="number"
              name="aadhaar"
              required
              placeholder="Aadhaar Number"
              value={formData.aadhaar}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              className={`
                w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors
                
              `}
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium text-right">
              {error}
            </p>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              className="px-8 py-2 w-fit bg-slate-200 text-black border border-gray-300 hover:text-white hover:bg-red-700"
            >
              Clear Form
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="px-8 py-2 w-fit text-white"
            >
              Create User
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
