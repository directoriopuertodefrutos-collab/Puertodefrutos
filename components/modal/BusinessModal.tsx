"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  Share2,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Globe,
  Navigation,
  Star,
  Quote,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { categoryIcons } from "@/components/ui/IconMap";
import { cn } from "@/lib/utils";
import { formatPhone, isOpenNow } from "@/lib/utils";
import type { Business } from "@/types";

interface BusinessModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function BusinessModal({
  business,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: BusinessModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!business) return null;

  const open = isOpenNow(business.schedule);
  const CategoryIcon = categoryIcons[business.category] || categoryIcons.decoracion;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: business.name,
          text: business.shortDescription,
          url: window.location.href,
        });
      } catch {
        setShowShareMenu(false);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label={business.name}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative mx-auto mt-8 mb-8 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-premium-xl md:mt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/50"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute top-4 right-4 z-30 flex gap-2">
              <button
                onClick={() => onToggleFavorite?.(business.id)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
                  isFavorite
                    ? "bg-white/90 text-red-500"
                    : "bg-black/30 text-white/80 hover:bg-white/30",
                )}
                aria-label={
                  isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
                }
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isFavorite && "fill-red-500",
                  )}
                />
              </button>
              <button
                onClick={handleShare}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/50"
                aria-label="Compartir"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-rio/20 via-arena to-rio/10">
              {business.images.length > 0 && (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{
                      backgroundImage: `url(${business.images[activeImage] || business.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </>
              )}

              {business.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {business.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === activeImage
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/70",
                      )}
                      aria-label={`Ver imagen ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {CategoryIcon && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                          <CategoryIcon className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <span className="text-xs font-medium tracking-wider text-white/80 uppercase">
                        {business.category}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                      {business.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 rounded-xl px-3 py-1.5 backdrop-blur-md">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-white">
                      {business.rating}
                    </span>
                    <span className="text-xs text-white/60">
                      ({business.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 lg:p-10">
              <div className="flex flex-wrap gap-2 mb-6">
                {business.premium && <Badge variant="premium">Premium</Badge>}
                {business.featured && (
                  <Badge variant="featured">Destacado</Badge>
                )}
                <Badge variant={open ? "open" : "closed"}>
                  {open ? "Abierto ahora" : "Cerrado"}
                </Badge>
              </div>

              <StarRating rating={business.rating} showValue />

              <div className="mt-6 space-y-4 text-base leading-relaxed text-carbon/60">
                <p>{business.description}</p>
              </div>

              <div className="mt-6 rounded-2xl bg-arena/50 p-6">
                <div className="flex items-start gap-3">
                  <Quote className="h-5 w-5 text-rio/40 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-carbon">
                      Nuestra historia
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-carbon/50">
                      {business.story}
                    </p>
                    {business.established && (
                      <p className="mt-2 text-xs text-rio/60">
                        Desde {business.established}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {business.products.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-display text-lg font-bold text-carbon mb-4">
                    Productos destacados
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {business.products.map((product) => (
                      <div
                        key={product.id}
                        className="overflow-hidden rounded-2xl border border-carbon/5 bg-white transition-all duration-300 hover:shadow-premium"
                      >
                        <div className="aspect-square bg-gradient-to-br from-arena to-rio/10" />
                        <div className="p-4">
                          <span className="text-[10px] font-semibold tracking-wider text-rio uppercase">
                            {product.category}
                          </span>
                          <h4 className="mt-1 text-sm font-semibold text-carbon">
                            {product.name}
                          </h4>
                          <p className="mt-1 text-xs text-carbon/40 line-clamp-2">
                            {product.description}
                          </p>
                          {product.price && (
                            <p className="mt-2 text-sm font-bold text-rio">
                              {product.price}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white border border-carbon/5 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-carbon mb-3">
                    <Clock className="h-4 w-4 text-rio" />
                    Horarios
                  </div>
                  <div className="space-y-1.5">
                    {Object.entries(business.schedule).map(([day, s]) => {
                      if (!s) return null;
                      const dayNames: Record<string, string> = {
                        monday: "Lunes",
                        tuesday: "Martes",
                        wednesday: "Miércoles",
                        thursday: "Jueves",
                        friday: "Viernes",
                        saturday: "Sábado",
                        sunday: "Domingo",
                      };
                      return (
                        <div
                          key={day}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-carbon/50">
                            {dayNames[day]}
                          </span>
                          <span
                            className={cn(
                              "font-medium",
                              s.closed
                                ? "text-red-400"
                                : "text-carbon",
                            )}
                          >
                            {s.closed
                              ? "Cerrado"
                              : `${s.open} - ${s.close}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-carbon/5 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-carbon mb-4">
                    <MapPin className="h-4 w-4 text-rio" />
                    Ubicación
                  </div>
                  <p className="text-sm text-carbon/60 mb-3">
                    {business.location.address}
                  </p>
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-arena to-rio/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto h-6 w-6 text-rio/40" />
                      <p className="mt-1 text-xs text-carbon/40">Mapa</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-carbon/5 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-carbon mb-3">
                    <MessageCircle className="h-4 w-4 text-rio" />
                    Contacto
                  </div>
                  <div className="space-y-2">
                    <a
                      href={`https://wa.me/${business.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-delta/10 p-3 text-sm font-medium text-delta transition-all hover:bg-delta/20"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${business.contact.phone}`}
                      className="flex items-center gap-2 rounded-xl bg-rio/5 p-3 text-sm font-medium text-rio transition-all hover:bg-rio/10"
                    >
                      <Phone className="h-4 w-4" />
                      {formatPhone(business.contact.phone)}
                    </a>
                    {business.contact.email && (
                      <a
                        href={`mailto:${business.contact.email}`}
                        className="flex items-center gap-2 rounded-xl bg-carbon/5 p-3 text-sm font-medium text-carbon/60 transition-all hover:bg-carbon/10"
                      >
                        <Globe className="h-4 w-4" />
                        {business.contact.email}
                      </a>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-carbon/5 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-carbon mb-3">
                    Redes
                  </div>
                  <div className="space-y-2">
                    {business.social.instagram && (
                      <a
                        href={`https://instagram.com/${business.social.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-pink-50 p-3 text-sm font-medium text-pink-600 transition-all hover:bg-pink-100"
                      >
                        <span className="h-4 w-4 flex items-center justify-center text-[9px] font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded">IG</span>
                        {business.social.instagram}
                      </a>
                    )}
                    {business.social.facebook && (
                      <a
                        href={`https://facebook.com/${business.social.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-sm font-medium text-blue-600 transition-all hover:bg-blue-100"
                      >
                        <span className="h-4 w-4 flex items-center justify-center text-[9px] font-bold bg-blue-600 text-white rounded">FB</span>
                        {business.social.facebook}
                      </a>
                    )}
                    {business.contact.website && (
                      <a
                        href={business.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-carbon/5 p-3 text-sm font-medium text-carbon/60 transition-all hover:bg-carbon/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Sitio web
                      </a>
                    )}
                    <a
                      href={business.location.mapUrl || `https://maps.google.com/?q=${business.location.latitude},${business.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-rio/5 p-3 text-sm font-medium text-rio transition-all hover:bg-rio/10"
                    >
                      <Navigation className="h-4 w-4" />
                      Cómo llegar
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-carbon/5 px-6 py-4 md:px-8">
              <div className="flex items-center justify-between">
                <span className="text-xs text-carbon/30">
                  {business.name} &mdash; {business.category}
                </span>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  Cerrar
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
