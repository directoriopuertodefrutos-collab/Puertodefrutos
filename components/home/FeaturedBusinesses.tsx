"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BusinessCard } from "@/components/ui/BusinessCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { businesses } from "@/data/businesses";
import type { Business } from "@/types";

interface FeaturedBusinessesProps {
  onSelect: (business: Business) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export function FeaturedBusinesses({
  onSelect,
  isFavorite,
  onToggleFavorite,
}: FeaturedBusinessesProps) {
  const featured = businesses.filter((b) => b.featured || b.premium);
  const display = featured.slice(0, 6);

  return (
    <section id="destacados" className="py-24 md:py-32 scroll-mt-24">
      <Container>
        <SectionHeading
          label="Destacados"
          title="Comercios destacados"
          description="Comercios seleccionados por su calidad, trayectoria y compromiso con el Puerto de Frutos."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {display.map((business, index) => (
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

        <div className="mt-12 text-center">
          <Button variant="secondary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Ver todos los comercios
          </Button>
        </div>
      </Container>
    </section>
  );
}
