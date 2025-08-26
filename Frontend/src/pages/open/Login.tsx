import { BookOpen } from "lucide-react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false)

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
        <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Email Address"
            type="email"
            htmlFor="email"
            required={true}
            placeholder="Enter your email"
            className="mb-4"
          />
          <Input
            label="Password"
            type="password"
            htmlFor="password"
            required={true}
            placeholder="Enter your password"
          />
          <div className="flex justify-between items-center mt-3">
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
          <Button loading={loading} onClick={() => setLoading(!loading)} >Submit Now</Button>
        </form>
        <p className="text-sm text-center">
          Don't have an account? Contact Admin
        </p>
      </div>
    </div>
  );
};
