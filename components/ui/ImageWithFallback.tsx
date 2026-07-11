"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
}

const FALLBACK_BG = "bg-gradient-to-br from-arena to-rio/10";

export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  containerClassName,
  priority = false,
  sizes,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          FALLBACK_BG,
          "flex items-center justify-center",
          fill && "absolute inset-0",
          containerClassName || className,
        )}
      >
        <div className="text-center p-4">
          <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-rio text-lg font-bold">
              {alt.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-xs text-carbon/40">{alt}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(fill && "relative", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn("object-cover", className)}
        onError={() => setError(true)}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        loading={priority ? undefined : "lazy"}
      />
    </div>
  );
}
