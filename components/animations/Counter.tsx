"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface CounterProps {
  from?: number;
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function Counter({
  from = 0,
  to,
  suffix = "",
  className,
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(from);

  const spring = useSpring(from, {
    stiffness: 50,
    damping: 20,
    duration,
  });

  const rounded = useTransform(spring, (value) => Math.round(value));

  useEffect(() => {
    if (isInView) {
      spring.set(to);
    }
  }, [isInView, spring, to]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (value) => {
      setDisplayValue(value);
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {displayValue}
      {suffix}
    </span>
  );
}
