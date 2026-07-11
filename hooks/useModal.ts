"use client";

import { useState, useCallback, useEffect } from "react";
import type { Business } from "@/types";

export function useModal() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((business: Business) => {
    setSelectedBusiness(business);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => setSelectedBusiness(null), 300);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, close]);

  return { selectedBusiness, isOpen, open, close };
}
