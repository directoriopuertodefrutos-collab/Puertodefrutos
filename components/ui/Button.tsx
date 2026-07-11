"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  magnetic?: boolean;
  loading?: boolean;
}

const variants = {
  primary:
    "bg-rio text-white hover:bg-rio/90 shadow-premium hover:shadow-premium-lg",
  secondary:
    "bg-white text-rio border border-rio/20 hover:bg-arena/50 shadow-premium",
  ghost: "text-carbon hover:bg-carbon/5",
  outline:
    "border-2 border-carbon/10 text-carbon hover:border-rio hover:text-rio",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
  xl: "px-10 py-5 text-lg rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      fullWidth,
      magnetic = true,
      loading,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const content = (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 font-display font-medium transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-rio/50 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === "left" && (
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {!loading && icon && iconPosition === "right" && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </button>
    );

    if (!magnetic) return content;

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn("inline-block", fullWidth && "w-full")}
      >
        {content}
      </motion.div>
    );
  },
);

Button.displayName = "Button";
