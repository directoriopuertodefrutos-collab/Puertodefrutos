"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  variant?: "default" | "premium" | "featured" | "open" | "closed" | "custom";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
}

const variantStyles = {
  default: "bg-carbon/5 text-carbon",
  premium: "bg-rio text-white",
  featured: "bg-delta text-white",
  open: "bg-delta/10 text-delta border border-delta/20",
  closed: "bg-red-50 text-red-600 border border-red-100",
  custom: "",
};

const sizeStyles = {
  sm: "px-2.5 py-0.5 text-[10px] tracking-wider",
  md: "px-3 py-1 text-xs tracking-wider",
};

export function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
}: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold uppercase",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {variant === "open" && (
        <span className="h-1.5 w-1.5 rounded-full bg-delta animate-pulse" />
      )}
      {children}
    </motion.span>
  );
}
