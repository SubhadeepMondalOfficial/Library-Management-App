import { Loader2 } from "lucide-react";
import type React from "react";

type ButtonProps = {
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  type = "submit",
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`rounded-lg ${disabled ? "bg-slate-300 hover:bg-slate-300 hover:cursor-not-allowed" : "bg-brand-primary-900 hover:bg-brand-primary-700"} duration-300 ${className} ${
        loading && "bg-slate-300 hover:bg-slate-300 hover:cursor-not-allowed"
      }`}
      {...props}
    >
      {loading && <Loader2 size={20} className="animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
