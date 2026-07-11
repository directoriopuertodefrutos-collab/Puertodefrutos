"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchSection } from "@/components/home/SearchSection";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { Statistics } from "@/components/home/Statistics";
import { MapSection } from "@/components/home/MapSection";
import { CTASection } from "@/components/home/CTA";
import { BusinessModal } from "@/components/modal/BusinessModal";
import { useModal } from "@/hooks/useModal";
import { useFavorites } from "@/hooks/useFavorites";
import { businesses } from "@/data/businesses";

const CategoriesSection = dynamic(
  () =>
    import("@/components/home/CategoriesSection").then(
      (mod) => mod.CategoriesSection,
    ),
  { ssr: true },
);

const HowItWorks = dynamic(
  () => import("@/components/home/HowItWorks").then((mod) => mod.HowItWorks),
  { ssr: true },
);

const History = dynamic(
  () => import("@/components/home/History").then((mod) => mod.History),
  { ssr: true },
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/home/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection,
    ),
  { ssr: true },
);

const PlansSection = dynamic(
  () => import("@/components/home/PlansSection").then((mod) => mod.PlansSection),
  { ssr: true },
);

const FAQSection = dynamic(
  () => import("@/components/home/FAQ").then((mod) => mod.FAQSection),
  { ssr: true },
);

export default function HomePage() {
  const { selectedBusiness, isOpen, open, close } = useModal();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <SearchSection
          businesses={businesses}
          onSelect={open}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        <CategoriesSection />

        <FeaturedBusinesses
          onSelect={open}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        <HowItWorks />

        <History />

        <MapSection />

        <Statistics />

        <TestimonialsSection />

        <PlansSection />

        <FAQSection />

        <CTASection />
      </main>

      <Footer />

      <BusinessModal
        business={selectedBusiness}
        isOpen={isOpen}
        onClose={close}
        isFavorite={selectedBusiness ? isFavorite(selectedBusiness.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}
