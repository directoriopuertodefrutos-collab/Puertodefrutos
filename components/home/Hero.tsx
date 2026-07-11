"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/60 via-carbon/40 to-carbon/80 z-10" />

      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/delta-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[2]">
        <div className="absolute inset-0 bg-gradient-to-r from-rio/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <Container className="relative z-20 pt-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider text-white/80 backdrop-blur-md uppercase">
              Directorio Oficial del Puerto de Frutos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
          >
            Descubrí el
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-arena to-white">
              Delta
            </span>{" "}
            como nunca
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl md:text-2xl"
          >
            El directorio digital definitivo del Puerto de Frutos de Tigre.
            Explorá comercios únicos, conectá con productores y viví la
            experiencia del Delta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              variant="primary"
              size="xl"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Explorar comercios
            </Button>
            <Button
              variant="outline"
              size="xl"
              icon={<Play className="h-5 w-5" />}
              iconPosition="left"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Ver video
            </Button>
          </motion.div>
        </div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}
