"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BusinessCard } from "@/components/ui/BusinessCard";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import type { Business, FilterOption, SortOption } from "@/types";

interface SearchSectionProps {
  businesses: Business[];
  onSelect: (business: Business) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export function SearchSection({
  businesses,
  onSelect,
  isFavorite,
  onToggleFavorite,
}: SearchSectionProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [sort, setSort] = useState<SortOption>("name");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = businesses
    .filter((b) => {
      if (query) {
        const q = query.toLowerCase();
        const matchesSearch =
          b.name.toLowerCase().includes(q) ||
          b.shortDescription.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }
      if (selectedCategory !== "all" && b.category !== selectedCategory)
        return false;
      if (filter === "featured" && !b.featured) return false;
      if (filter === "premium" && !b.premium) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const hasActiveFilters =
    query || selectedCategory !== "all" || filter !== "all";

  return (
    <section className="bg-gradient-warm py-12 md:py-16 border-y border-carbon/5">
      <Container>
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-carbon/30" />
            <input
              type="text"
              placeholder="Buscá comercios, productos o categorías..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-carbon/10 bg-white py-4 pl-14 pr-12 text-base outline-none transition-all duration-300 placeholder:text-carbon/30 focus:border-rio/30 focus:ring-2 focus:ring-rio/10 shadow-premium"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-carbon/5 text-carbon/30 hover:bg-carbon/10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                  showFilters || hasActiveFilters
                    ? "bg-rio text-white"
                    : "bg-carbon/5 text-carbon/30 hover:bg-carbon/10",
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-2xl bg-white border border-carbon/5 p-5 shadow-premium">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-xs font-semibold tracking-wider text-carbon/40 uppercase">
                        Categoría
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                            selectedCategory === "all"
                              ? "bg-rio text-white"
                              : "bg-carbon/5 text-carbon/50 hover:bg-carbon/10",
                          )}
                        >
                          Todas
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={cn(
                              "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                              selectedCategory === cat.id
                                ? "bg-rio text-white"
                                : "bg-carbon/5 text-carbon/50 hover:bg-carbon/10",
                            )}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold tracking-wider text-carbon/40 uppercase">
                        Filtros
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(["all", "featured", "premium"] as FilterOption[]).map(
                          (f) => (
                            <button
                              key={f}
                              onClick={() => setFilter(f)}
                              className={cn(
                                "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                                filter === f
                                  ? "bg-rio text-white"
                                  : "bg-carbon/5 text-carbon/50 hover:bg-carbon/10",
                              )}
                            >
                              {f === "all"
                                ? "Todos"
                                : f === "featured"
                                  ? "Destacados"
                                  : "Premium"}
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold tracking-wider text-carbon/40 uppercase">
                        Ordenar
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(["name", "rating"] as SortOption[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => setSort(s)}
                            className={cn(
                              "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                              sort === s
                                ? "bg-rio text-white"
                                : "bg-carbon/5 text-carbon/50 hover:bg-carbon/10",
                            )}
                          >
                            {s === "name"
                              ? "Alfabético"
                              : "Mejor puntuados"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-carbon/40">
              {filtered.length} de {businesses.length} comercios
            </p>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedCategory("all");
                  setFilter("all");
                  setSort("name");
                }}
                className="text-xs font-medium text-rio hover:text-rio/70 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((business, index) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onSelect={onSelect}
                  isFavorite={isFavorite(business.id)}
                  onToggleFavorite={onToggleFavorite}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-arena">
                <Search className="h-8 w-8 text-rio/40" />
              </div>
              <h3 className="font-display text-lg font-bold text-carbon">
                No encontramos resultados
              </h3>
              <p className="mt-2 text-sm text-carbon/40">
                Probá con otros términos o categorías.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
