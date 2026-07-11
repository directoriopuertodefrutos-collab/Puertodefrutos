import type { Metadata } from "next";
import type { Business, Category } from "@/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://puertodefrutos.com";
const siteName = "Puerto de Frutos";
const description =
  "Descubrí el mejor directorio digital del Puerto de Frutos de Tigre. Decoración, muebles, arte, gastronomía y más en un solo lugar.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Directorio Digital de Tigre`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "Puerto de Frutos",
    "Tigre",
    "directorio",
    "decoración",
    "muebles",
    "arte",
    "gastronomía",
    "compras",
    "Buenos Aires",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName,
    title: `${siteName} | Directorio Digital de Tigre`,
    description,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Directorio Digital de Tigre`,
    description,
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon-16x16.png",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/icons/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
};

export function getBusinessMetadata(business: Business): Metadata {
  return {
    title: business.name,
    description: business.shortDescription,
    openGraph: {
      title: business.name,
      description: business.shortDescription,
      images: [
        {
          url: business.image,
          width: 1200,
          height: 630,
          alt: business.name,
        },
      ],
    },
    twitter: {
      title: business.name,
      description: business.shortDescription,
      images: [business.image],
    },
  };
}

export function getCategoryMetadata(category: Category): Metadata {
  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: category.name,
      description: category.description,
      images: [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icons/logo.svg`,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tigre",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
  };
}

export function generateBusinessSchema(business: Business) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    image: business.image,
    url: `${siteUrl}/negocio/${business.slug}`,
    telephone: business.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.location.address,
      addressLocality: "Tigre",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.location.latitude,
      longitude: business.location.longitude,
    },
    ...(business.established && {
      foundingDate: business.established.toString(),
    }),
    openingHoursSpecification: generateOpeningHours(business.schedule),
  };
}

function generateOpeningHours(
  schedule: Business["schedule"],
): Array<Record<string, string>> {
  const days: Record<string, string> = {
    monday: "Mo",
    tuesday: "Tu",
    wednesday: "We",
    thursday: "Th",
    friday: "Fr",
    saturday: "Sa",
    sunday: "Su",
  };

  return Object.entries(schedule)
    .filter(([, value]) => value && !value.closed)
    .map(([key, value]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days[key],
      opens: value!.open,
      closes: value!.close,
    }));
}

export { siteUrl, siteName, description };
