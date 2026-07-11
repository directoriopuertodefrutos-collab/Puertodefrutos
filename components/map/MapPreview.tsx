"use client";

import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Business } from "@/types";

interface MapPreviewProps {
  businesses: Business[];
  className?: string;
}

export function MapPreview({
  businesses,
  className,
}: MapPreviewProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-[#e8e4df]", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="mx-auto h-8 w-8 text-rio/40" />
          <p className="mt-2 text-sm text-carbon/40">
            Mapa interactivo próximo a integrar
          </p>
          <p className="mt-1 text-xs text-carbon/30">
            {businesses.length} comercios para ubicar
          </p>
        </div>
      </div>
      <div className="aspect-[16/9]" />
    </div>
  );
}
