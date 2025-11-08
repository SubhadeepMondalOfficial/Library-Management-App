import { BookOpen } from "lucide-react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { API_BASE_URL } from "../../config/env";
import { ErrorMessage } from "../../components/ErrorMessage";
import { verifyToken } from "../../utils/authCheck";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formSubmitError, setFormSubmitError] = useState("");
  const [submitBtnDisable, setSubmitBtnDisable] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formSubmitError !== "") setFormSubmitError("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // dynamically updates email or password
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitBtnDisable === false) {
      setLoading(true);
      try {
        // 👇 Send credentials via fetch without use of axios
        const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // 👈 send & receive cookies
        });

        // 👇 Manually handle response
        const data = await response.json();

        //exception handle
        if (!response.ok) {
          // response.ok = false means 4xx/5xx status code
          throw new Error(data.message || "Invalid Email or Password");
        }

        //if credential is correct then redirect to verify otp
        navigate("/login/verify-otp");
      } catch (err: any) {
        setFormSubmitError(err.message);
        setSubmitBtnDisable(true);
        console.error(err.message || "Network error! Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  //logout user can only open login page
  useEffect(() => {
    const checkToken = async () => {
      const result = await verifyToken();
      if (result.user?.role) {
        navigate("/dashboard");
      }
    };
    checkToken();
  }, [navigate]);

  useEffect(() => {
    if (formData.password.length >= 6) {
      setSubmitBtnDisable(false);
    } else {
      setSubmitBtnDisable(true);
    }
  }, [formData]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-66px)] bg-brand-primary-100">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg animate__animated animate__backInDown">
        <div className="grid place-items-center gap-2">
          <div className="flex justify-center items-center">
            <span className="p-3 rounded-full bg-brand-primary-900">
              <BookOpen className="text-white w-8 h-8" />
            </span>
          </div>
          <h2 className="font-bold text-2xl">Welcome Back!</h2>
          <p>Sign in to your library account</p>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            htmlFor="email"
            required={true}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mb-4"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            htmlFor="password"
            required={true}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <div className="flex justify-between items-center mt-3 mb-4">
            <div className="flex justify-center items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <div>
              <Link to={"/"} className="text-sm">
                Forgot password?
              </Link>
            </div>
          </div>
          {/* <button className="w-full bg-brand-primary-900 text-white py-3 rounded-lg mt-8 mb-4 hover:bg-brand-primary-700 duration-300">
            Sign In
          </button> */}
          <ErrorMessage message={formSubmitError} />
          <Button
            loading={loading}
            className="mt-2 mb-4 py-3 w-full text-white flex justify-center items-center gap-2"
            disabled={submitBtnDisable}
          >
            Submit Now
          </Button>
        </form>
        <p className="text-sm text-center">
          Don't have an account? Contact Admin
        </p>
      </div>
    </div>
  );
};
