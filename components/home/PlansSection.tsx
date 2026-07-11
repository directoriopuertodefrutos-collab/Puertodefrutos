"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { plans } from "@/data/plans";
import { cn } from "@/lib/utils";

export function PlansSection() {
  return (
    <section id="planes" className="bg-white py-24 md:py-32 scroll-mt-24">
      <Container>
        <SectionHeading
          label="Planes"
          title="Elegí el plan ideal para tu comercio"
          description="Sumá tu comercio al directorio y aumentá tu presencia digital. Sin promesas de ventas, solo visibilidad y profesionalismo."
        />

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative overflow-hidden rounded-3xl border transition-all duration-500",
                plan.highlighted
                  ? "border-rio/20 bg-gradient-to-b from-rio/5 to-white shadow-premium-xl scale-105 lg:scale-110"
                  : "border-carbon/5 bg-white shadow-premium hover:shadow-premium-lg",
              )}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <div className="bg-rio px-8 py-1.5 text-xs font-semibold tracking-wider text-white -rotate-45 translate-x-6 translate-y-4 uppercase">
                    Más popular
                  </div>
                </div>
              )}

              <div className="p-8 md:p-10">
                <h3 className="font-display text-xl font-bold text-carbon">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-carbon/50">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-carbon">
                    {plan.price}
                  </span>
                  <span className="text-sm text-carbon/40">{plan.period}</span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-carbon/60"
                    >
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.highlighted ? "text-rio" : "text-delta",
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "primary" : "outline"}
                  size="lg"
                  fullWidth
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="mt-8"
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
