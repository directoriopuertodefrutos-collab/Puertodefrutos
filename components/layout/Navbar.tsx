"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Search, MapPin } from "lucide-react";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#categorias", label: "Categorías" },
  { href: "#destacados", label: "Destacados" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#mapa", label: "Mapa" },
  { href: "#planes", label: "Planes" },
];

export function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-premium"
          : "bg-transparent",
      )}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="relative z-10 flex items-center gap-2.5"
            aria-label="Puerto de Frutos - Inicio"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rio">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span
              className={cn(
                "font-display text-lg font-bold transition-colors duration-300",
                isScrolled ? "text-carbon" : "text-white",
              )}
            >
              Puerto<span className="text-rio">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300",
                  "hover:bg-white/10",
                  isScrolled
                    ? "text-carbon/70 hover:text-carbon hover:bg-carbon/5"
                    : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={cn(
                "rounded-xl p-2.5 transition-all duration-300",
                isScrolled
                  ? "text-carbon/60 hover:bg-carbon/5 hover:text-carbon"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              className={cn(
                "hidden rounded-xl p-2.5 transition-all duration-300 sm:block",
                isScrolled
                  ? "text-carbon/60 hover:bg-carbon/5 hover:text-carbon"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
              aria-label="Favoritos"
            >
              <Heart className="h-5 w-5" />
            </button>

            <Button
              variant={isScrolled ? "primary" : "outline"}
              size="sm"
              className={cn(
                "hidden sm:flex",
                !isScrolled && "border-white/30 text-white hover:bg-white/10",
              )}
            >
              Agregar Comercio
            </Button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "rounded-xl p-2.5 transition-all duration-300 md:hidden",
                isScrolled
                  ? "text-carbon/60 hover:bg-carbon/5"
                  : "text-white/70 hover:bg-white/10",
              )}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-carbon/5 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <Container className="py-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-carbon/70 transition-colors hover:bg-carbon/5 hover:text-carbon"
                  >
                    {link.label}
                  </a>
                ))}
                <Button fullWidth className="mt-4">
                  Agregar Comercio
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-carbon/5 bg-white/95 backdrop-blur-xl"
          >
            <Container className="py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-carbon/30" />
                <input
                  type="text"
                  placeholder="Buscá comercios, productos o categorías..."
                  className="w-full rounded-2xl border border-carbon/10 bg-arena/30 px-12 py-4 text-base outline-none transition-all duration-300 placeholder:text-carbon/30 focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
                  autoFocus
                />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
