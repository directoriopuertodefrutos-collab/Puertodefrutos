"use client";

import { motion } from "framer-motion";
import { ArrowRight, Store } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-rio py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 75% 50%, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
            <Store className="h-10 w-10 text-white" />
          </div>

          <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            ¿Tenés un comercio en el
            <br />
            <span className="text-arena">Puerto de Frutos</span>?
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/60 md:text-xl">
            Sumate al directorio digital y aumentá tu presencia online. Miles de
            personas descubren nuevos comercios todos los meses. No te quedes
            afuera.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="secondary"
              size="xl"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Agregar mi comercio
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Ver planes
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/30">
            Sin compromiso. Plan gratuito disponible.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
