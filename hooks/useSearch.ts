"use client";

import { useState, useMemo, useCallback } from "react";
import type { Business, FilterOption, SortOption } from "@/types";

interface UseSearchProps {
  businesses: Business[];
}

export function useSearch({ businesses }: UseSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [sort, setSort] = useState<SortOption>("name");

  const filtered = useMemo(() => {
    let result = [...businesses];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)) ||
          b.products.some((p) => p.name.toLowerCase().includes(q)),
      );
    }

    if (category && category !== "all") {
      result = result.filter((b) => b.category === category);
    }

    if (filter === "featured") result = result.filter((b) => b.featured);
    if (filter === "premium") result = result.filter((b) => b.premium);
    if (filter === "open") {
      const { isOpenNow } = require("@/lib/utils");
      result = result.filter((b) => isOpenNow(b.schedule));
    }

    switch (sort) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.established || 0) - (a.established || 0));
        break;
      case "name":
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [businesses, query, category, filter, sort]);

  const reset = useCallback(() => {
    setQuery("");
    setCategory("all");
    setFilter("all");
    setSort("name");
  }, []);

  return {
    query,
    setQuery,
    category,
    setCategory,
    filter,
    setFilter,
    sort,
    setSort,
    filtered,
    reset,
  };
}
