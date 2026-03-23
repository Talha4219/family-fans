import { MetadataRoute } from "next";

// This generates a dynamic XML sitemap for search engines.
// Validates technical SEO requirements for scaling e-commerce.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://familyfans-store.com";

  // Core Pages
  const corePages = [
    "",
    "/shop",
    "/search",
    "/shop?category=fans",
    "/shop?category=heaters",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  // Discovery & Marketing Pages
  const discoveryPages = [
    "/new-arrivals",
    "/best-sellers",
    "/top-rated",
    "/deals",
    "/flash-sale",
    "/clearance",
    "/bundles",
    "/coupons",
    "/trending",
    "/summer-sale",
    "/black-friday",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Content & Trust Pages
  const contentPages = [
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/blog",
    "/help",
    "/gift-cards",
    "/newsletter",
    "/affiliate",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Legal & Utility Pages
  const legalPages = ["/privacy", "/terms", "/cookies", "/sitemap-page"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    }),
  );

  return [...corePages, ...discoveryPages, ...contentPages, ...legalPages];
}
