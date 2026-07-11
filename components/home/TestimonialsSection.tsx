"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const paginate = (newDir: number) => {
    setDirection(newDir);
    setCurrent((prev) => {
      let next = prev + newDir;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  };

  const t = testimonials[current];

  return (
    <section className="relative overflow-hidden bg-gradient-warm py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Testimonios"
          title="Lo que dicen sobre nosotros"
          description="Comerciantes y visitantes comparten su experiencia con el directorio."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full"
              >
                <div className="rounded-3xl bg-white p-8 shadow-premium-lg md:p-12">
                  <Quote className="h-8 w-8 text-rio/20 mb-6" />

                  <p className="text-lg leading-relaxed text-carbon/70 md:text-xl">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < t.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-carbon/10 text-carbon/10",
                        )}
                      />
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rio to-delta flex items-center justify-center text-white font-bold">
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-carbon">{t.name}</p>
                      <p className="text-sm text-carbon/40">
                        {t.role}
                        {t.business && ` · ${t.business}`}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-premium transition-all duration-300 hover:shadow-premium-lg hover:-translate-x-0.5"
              aria-label="Anterior testimonio"
            >
              <ChevronLeft className="h-5 w-5 text-carbon" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === current
                      ? "w-8 bg-rio"
                      : "w-2 bg-carbon/20 hover:bg-carbon/30",
                  )}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-premium transition-all duration-300 hover:shadow-premium-lg hover:translate-x-0.5"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5 text-carbon" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
