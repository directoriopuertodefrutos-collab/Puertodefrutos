"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MapPin, Navigation, Maximize2 } from "lucide-react";
import { businesses } from "@/data/businesses";

export function MapSection() {
  return (
    <section id="mapa" className="bg-white py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Mapa"
          title="Encontrá todo en el mapa"
          description="Ubicación exacta de cada comercio dentro del Puerto de Frutos. Navegá, filtrá y llegá directo."
        />

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-arena to-white shadow-premium-xl">
          <div className="aspect-[21/9] min-h-[400px] w-full bg-[#e8e4df] relative">
            <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-rio/10 backdrop-blur-sm">
                  <MapPin className="h-8 w-8 text-rio" />
                </div>
                <h3 className="font-display text-2xl font-bold text-carbon">
                  Puerto de Frutos - Tigre
                </h3>
                <p className="mt-2 max-w-md text-sm text-carbon/50">
                  {businesses.length} comercios disponibles en el directorio.
                  Hacé clic para explorar el mapa interactivo.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    icon={<Navigation className="h-4 w-4" />}
                  >
                    Cómo llegar
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    icon={<Maximize2 className="h-4 w-4" />}
                  >
                    Ver mapa completo
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {businesses.slice(0, 8).map((b) => (
                    <span
                      key={b.id}
                      className="rounded-full bg-white/70 px-3 py-1 text-xs text-carbon/60 backdrop-blur-sm border border-carbon/5"
                    >
                      {b.name}
                    </span>
                  ))}
                  <span className="rounded-full bg-rio/10 px-3 py-1 text-xs font-medium text-rio">
                    +{businesses.length - 8} más
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-carbon/5 bg-white/50 px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-carbon/40">
              <MapPin className="h-3.5 w-3.5 text-rio" />
              <span>
                Sarmiento 160, Tigre, Buenos Aires
              </span>
            </div>
            <span className="text-xs text-carbon/30">
              Datos actualizados semanalmente
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
