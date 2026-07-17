import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://wingers-web-v2.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1.0 },
    { path: "/menu", priority: 0.9 },
    { path: "/locations", priority: 0.9 },
    { path: "/flavour-lab", priority: 0.8 },
    { path: "/loyalty", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/allergies", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${SITE_URL}/locations/${loc.slug}`,
    lastModified: new Date(loc.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...locationRoutes];
}
