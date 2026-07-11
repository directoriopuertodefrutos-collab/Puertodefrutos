"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { categoryIcons } from "@/components/ui/IconMap";
import type { Business } from "@/types";

interface BusinessCardProps {
  business: Business;
  onSelect: (business: Business) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  index?: number;
}

export function BusinessCard({
  business,
  onSelect,
  isFavorite,
  onToggleFavorite,
  index = 0,
}: BusinessCardProps) {
  const CategoryIcon = categoryIcons[business.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group cursor-pointer"
      onClick={() => onSelect(business)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(business);
        }
      }}
      aria-label={`Ver detalle de ${business.name}`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-premium transition-all duration-500 group-hover:shadow-premium-xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"
          />
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-all duration-700",
              "group-hover:scale-105",
            )}
            style={{ backgroundImage: `url(${business.image})` }}
          />

          <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
            {business.premium && <Badge variant="premium">Premium</Badge>}
            {business.featured && !business.premium && (
              <Badge variant="featured">Destacado</Badge>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(business.id);
            }}
            className={cn(
              "absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
              isFavorite
                ? "bg-white/90 text-red-500"
                : "bg-black/20 text-white/80 hover:bg-white/30",
            )}
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all duration-300",
                isFavorite && "fill-red-500",
              )}
            />
          </button>

          <div className="absolute bottom-3 left-3 right-3 z-20">
            <div className="flex items-center gap-2">
              {CategoryIcon && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
                  <CategoryIcon className="h-4 w-4 text-white" />
                </div>
              )}
              <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                {business.category}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-carbon group-hover:text-rio transition-colors">
              {business.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-carbon">
                {business.rating}
              </span>
            </div>
          </div>

          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-carbon/50">
            {business.shortDescription}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-carbon/40">
              <MapPin className="h-3.5 w-3.5" />
              <span>Puerto de Frutos</span>
            </div>
            <span className="text-xs font-medium text-rio opacity-0 transition-all duration-300 group-hover:opacity-100">
              Ver más &rarr;
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
