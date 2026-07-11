"use client";

import { MapPin, Heart, ArrowUpRight, Globe } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const footerLinks = {
  directorio: [
    { href: "#categorias", label: "Categorías" },
    { href: "#destacados", label: "Destacados" },
    { href: "#mapa", label: "Mapa" },
    { href: "#planes", label: "Planes" },
  ],
  comerciantes: [
    { href: "#", label: "Agregar mi comercio" },
    { href: "#planes", label: "Planes y precios" },
    { href: "#", label: "Panel de control" },
    { href: "#faq", label: "Preguntas frecuentes" },
  ],
  informacion: [
    { href: "#", label: "Sobre nosotros" },
    { href: "#historia", label: "Historia del Puerto" },
    { href: "#", label: "Términos y condiciones" },
    { href: "#", label: "Privacidad" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-carbon/5 bg-gradient-to-b from-white to-arena/30">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rio">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-carbon">
                Puerto<span className="text-rio">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-carbon/50">
              El directorio digital más completo del Puerto de Frutos de Tigre.
              Descubrí comercios únicos, conectá con productores locales y
              explorá todo lo que el Delta tiene para ofrecer.
            </p>
            <div className="mt-6 flex items-center gap-3">
        <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-carbon/5 text-carbon/50 transition-all duration-300 hover:bg-rio hover:text-white"
                aria-label="Instagram"
              >
                <span className="h-4 w-4 flex items-center justify-center text-[10px] font-bold">IG</span>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-carbon/5 text-carbon/50 transition-all duration-300 hover:bg-rio hover:text-white"
                aria-label="Facebook"
              >
                <span className="h-4 w-4 flex items-center justify-center text-[10px] font-bold">FB</span>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-carbon/5 text-carbon/50 transition-all duration-300 hover:bg-rio hover:text-white"
                aria-label="Sitio web"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-carbon/40 uppercase">
                {key === "directorio"
                  ? "Directorio"
                  : key === "comerciantes"
                    ? "Comerciantes"
                    : "Información"}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-carbon/60 transition-colors hover:text-rio"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-carbon/5 pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs text-carbon/40">
            &copy; {new Date().getFullYear()} Puerto de Frutos. Todos los
            derechos reservados.
          </p>
          <p className="inline-flex items-center gap-1 text-xs text-carbon/40">
            Hecho con <Heart className="h-3 w-3 text-red-400" /> en Tigre,
            Buenos Aires
          </p>
        </div>
      </Container>
    </footer>
  );
}
