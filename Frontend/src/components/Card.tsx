import React, { type ReactNode } from "react";

interface CardProps {
  children: ReactNode; // 👈 children type explicitly declared
  className?: string;
  hover?: boolean;
style?: {animationDelay: string}
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
  style
}) => {
  const hoverEffect = hover
    ? "hover:shadow-lg transform hover:-translate-y-1"
    : "";

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 transition-all duration-200 ${hoverEffect} ${className}`} style={style}
    >
      {children}
    </div>
  );
};
