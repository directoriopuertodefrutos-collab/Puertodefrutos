"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
  light,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-12 max-w-3xl md:mb-16",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {label && (
        <span
          className={cn(
            "mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase",
            light ? "text-white/50" : "text-rio",
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl",
          light ? "text-white" : "text-carbon",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg md:mt-6 md:text-xl",
            light ? "text-white/60" : "text-carbon/60",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
