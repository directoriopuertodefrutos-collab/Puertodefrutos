"use client";

import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/animations/Counter";
import { FadeIn } from "@/components/animations/FadeIn";
import { statistics } from "@/data/statistics";

export function Statistics() {
  return (
    <section className="relative overflow-hidden border-y border-carbon/5 bg-gradient-to-b from-arena/50 to-white py-20 md:py-28">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <span className="font-display block text-5xl font-bold text-rio md:text-6xl lg:text-7xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-carbon">
                  {stat.label}
                </h3>
                <p className="mt-2 mx-auto max-w-xs text-sm leading-relaxed text-carbon/50">
                  {stat.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
