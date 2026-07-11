"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  size = 14,
  showValue = true,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={cn(
              "transition-colors",
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-carbon/10 text-carbon/10",
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-carbon">{rating}</span>
      )}
    </div>
  );
}
