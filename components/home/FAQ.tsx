"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Todas" },
  { id: "general", label: "General" },
  { id: "planes", label: "Planes" },
  { id: "comerciantes", label: "Comerciantes" },
  { id: "visitantes", label: "Visitantes" },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = faqItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="bg-gradient-warm py-24 md:py-32">
      <Container>
        <SectionHeading
          label="FAQ"
          title="Preguntas frecuentes"
          description="Todo lo que necesitás saber sobre el directorio del Puerto de Frutos."
        />

        <div className="mx-auto max-w-3xl">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-carbon/30" />
            <input
              type="text"
              placeholder="Buscá una pregunta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-carbon/10 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-carbon/30 focus:border-rio/30 focus:ring-2 focus:ring-rio/10"
            />
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "bg-rio text-white"
                    : "bg-white text-carbon/50 hover:bg-carbon/5",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "overflow-hidden rounded-2xl border border-carbon/5 bg-white transition-all duration-300",
                  openId === index && "shadow-premium",
                )}
              >
                <button
                  onClick={() => setOpenId(openId === index ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openId === index}
                >
                  <span className="text-sm font-semibold text-carbon pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-carbon/30 transition-transform duration-300",
                      openId === index && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openId === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-carbon/60">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-carbon/40">
                No encontramos resultados para tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
