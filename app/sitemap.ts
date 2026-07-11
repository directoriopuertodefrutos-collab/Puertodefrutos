import type { MetadataRoute } from "next";
import { businesses } from "@/data/businesses";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://puertodefrutos.com";

  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  const businessPages = businesses.map((business) => ({
    url: `${siteUrl}/negocio/${business.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${siteUrl}/categoria/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...businessPages, ...categoryPages];
}
