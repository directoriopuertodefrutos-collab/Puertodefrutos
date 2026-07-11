import type { Plan } from "@/types";

export const plans: Plan[] = [
  {
    id: "free",
    name: "Gratuito",
    slug: "gratuito",
    price: "$0",
    period: "/mes",
    description:
      "Perfecto para empezar. Presencia digital básica para tu comercio.",
    features: [
      "Perfil en el directorio",
      "Información básica del comercio",
      "Horarios y contacto",
      "Ubicación en el mapa",
      "1 foto de perfil",
      "Enlace a redes sociales",
    ],
    highlighted: false,
    cta: "Comenzar gratis",
    color: "stone",
  },
  {
    id: "featured",
    name: "Destacado",
    slug: "destacado",
    price: "$9.999",
    period: "/mes",
    description:
      "Mayor visibilidad para tu comercio. Destacate entre los demás.",
    features: [
      "Todo lo del plan Gratuito",
      "Badge de Destacado",
      "Prioridad en búsquedas",
      "Galería de hasta 10 fotos",
      "Catálogo de productos",
      "Estadísticas básicas",
      "Soporte prioritario",
    ],
    highlighted: true,
    cta: "Elegir Destacado",
    color: "delta",
  },
  {
    id: "premium",
    name: "Premium",
    slug: "premium",
    price: "$19.999",
    period: "/mes",
    description:
      "Máxima presencia digital. Perfil profesional completo y exclusivo.",
    features: [
      "Todo lo del plan Destacado",
      "Badge de Premium",
      "Máxima prioridad en búsquedas",
      "Galería de hasta 30 fotos",
      "Video de presentación",
      "SEO optimizado",
      "Estadísticas avanzadas",
      "Soporte 24/7",
      "Botón de WhatsApp destacado",
      "Posibilidad de ofertas",
    ],
    highlighted: false,
    cta: "Elegir Premium",
    color: "rio",
  },
];
