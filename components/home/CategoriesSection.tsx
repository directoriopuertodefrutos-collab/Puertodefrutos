"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categoryIcons } from "@/components/ui/IconMap";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function CategoriesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="categorias" className="relative overflow-hidden bg-gradient-warm py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Categorías"
          title="Explorá por categoría"
          description="Navegá por las distintas categorías del Puerto de Frutos y descubrí comercios únicos en cada una."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => {
            const Icon: LucideIcon = categoryIcons[category.id] || categoryIcons.decoracion;

            return (
              <motion.a
                key={category.id}
                href={`#${category.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl transition-all duration-500",
                  "bg-white shadow-premium hover:shadow-premium-lg",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className={cn(
                      "absolute inset-0 bg-cover bg-center transition-all duration-700",
                      hoveredId === category.id && "scale-110",
                    )}
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div
                    className={cn(
                      "absolute inset-0 bg-rio/20 opacity-0 transition-opacity duration-500",
                      hoveredId === category.id && "opacity-100",
                    )}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">
                          {category.name}
                        </h3>
                        <p className="text-xs text-white/60">
                          {category.businessCount} comercios
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4">
                  <span className="text-sm text-carbon/50">
                    {category.description.slice(0, 40)}...
                  </span>
                  <ArrowRight className="h-4 w-4 text-rio opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
