"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500 shadow-lg shadow-blue-500/20 border border-blue-500/50",
    secondary:
      "bg-emerald-500 text-white hover:bg-emerald-400 focus:ring-emerald-500 shadow-lg shadow-emerald-500/20 border border-emerald-500/50",
    outline:
      "bg-transparent border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/20",
    ghost:
      "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
    gradient:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 border border-white/10",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs uppercase tracking-wide",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base md:text-lg",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
