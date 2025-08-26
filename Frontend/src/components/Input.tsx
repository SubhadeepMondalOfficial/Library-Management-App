import type React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlFor: string;
  error?: string;
  className?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  htmlFor,
  error,
  className = "",
  required = false,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor={htmlFor}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={htmlFor}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:border-transparent transition-colors ${
          error ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
