"use client";

import { motion } from "framer-motion";
import { Search, Store, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

const steps = [
  {
    icon: Search,
    title: "Explorá",
    description:
      "Navegá por categorías, buscá comercios o descubrí nuevos lugares. Todo desde un solo lugar.",
    color: "from-rio to-rio/80",
  },
  {
    icon: Store,
    title: "Descubrí",
    description:
      "Conocé la historia de cada comercio, mirá sus productos y enterate de todo lo que ofrecen.",
    color: "from-delta to-delta/80",
  },
  {
    icon: MessageCircle,
    title: "Conectá",
    description:
      "Contactá directo por WhatsApp, seguilos en redes o encontrálos en el mapa del Puerto.",
    color: "from-madera to-madera/80",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-rio py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <Container>
        <SectionHeading
          label="Cómo funciona"
          title="Tres pasos para descubrir el Puerto"
          description="Es simple, rápido y gratuito. Encontrá lo que buscás en segundos."
          light
        />

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-3xl bg-white/10 p-8 backdrop-blur-sm transition-all duration-500 hover:bg-white/15"
              >
                <div
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color}`}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </div>

                <span className="mb-3 block font-display text-5xl font-bold text-white/10">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
