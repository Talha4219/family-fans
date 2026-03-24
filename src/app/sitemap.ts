import { MetadataRoute } from "next";
import { getProducts, getCategoryTree, getBlogPosts } from "@/lib/actions";

// This generates a dynamic XML sitemap for search engines.
// Validates technical SEO requirements for scaling e-commerce.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://familyfans.net";

  // 1. Core Static Pages
  const staticPages = [
    "",
    "/shop",
    "/blog",
    "/certificates",
    "/contact",
    "/about",
    "/faq",
    "/catalog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  // 2. Fetch Dynamic Data
  const [products, categoryTree, blogPosts] = await Promise.all([
    getProducts(),
    getCategoryTree(true),
    getBlogPosts(),
  ]);

  // 3. Dynamic Products
  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug || product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 4. Dynamic Categories (Flattened Tree)
  const flattenCategories = (categories: any[]): any[] => {
    let flat: any[] = [];
    categories.forEach((cat) => {
      flat.push(cat);
      if (cat.subCategories && cat.subCategories.length > 0) {
        flat = [...flat, ...flattenCategories(cat.subCategories)];
      }
    });
    return flat;
  };

  const categoryPages = flattenCategories(categoryTree).map((category) => ({
    url: `${baseUrl}/shop?category=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 5. Dynamic Blog Posts
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug || post.id}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...blogPages];
}
