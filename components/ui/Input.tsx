"use client";

import { forwardRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean;
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, label, error, className, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-carbon/70"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-carbon/30" />
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              "w-full rounded-2xl border border-carbon/10 bg-white px-4 py-3.5 text-carbon outline-none transition-all duration-300",
              "placeholder:text-carbon/30",
              "focus:border-rio/30 focus:ring-2 focus:ring-rio/10",
              "hover:border-carbon/20",
              icon && "pl-12",
              error && "border-red-300 focus:border-red-400 focus:ring-red/10",
              className,
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
