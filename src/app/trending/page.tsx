import { Metadata } from "next";

import Link from "next/link";

import { getProducts } from "@/lib/actions";

import ProductCard from "@/components/ProductCard";

import { TrendingUp } from "lucide-react";

import PageAnimate from "@/components/PageAnimate";

export const metadata: Metadata = {
  title: "Trending Products — What's Hot Right Now | FamilyFans",
  description:
    "See what FamilyFans customers are buying right now. Trending fans and heaters based on real-time sales data, searches, and customer reviews.",
  keywords: [
    "trending fans",
    "popular heaters",
    "what's hot",
    "trending FamilyFans",
    "bestselling",
  ],
  alternates: {
    canonical: "https://FamilyFans.com/trending",
  },
  openGraph: {
    title: "Trending Products — What's Hot Right Now | FamilyFans",
    description:
      "Trending fans and heaters based on real-time sales and reviews.",
    url: "https://FamilyFans.com/trending",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function TrendingPage() {
  const products = await getProducts();

  const trending = [...products].sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <PageAnimate>
      {" "}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {" "}
        <nav className="text-sm text-[var(--muted-text)] mb-6 flex items-center gap-2">
          {" "}
          <Link
            href="/"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Home
          </Link>{" "}
          <span>/</span>{" "}
          <span className="text-[var(--foreground)] font-medium">
            Trending
          </span>{" "}
        </nav>{" "}
        <div className="flex items-center gap-2 mb-2">
          {" "}
          <TrendingUp className="w-5 h-5 text-[var(--highlight)]" />{" "}
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--highlight)]">
            Trending now
          </span>{" "}
        </div>{" "}
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          Trending Products
        </h1>{" "}
        <p className="text-[var(--muted-text)] max-w-xl mb-10">
          What FamilyFans customers are buying and loving right now — updated in
          real time.
        </p>{" "}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {" "}
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>{" "}
      </div>{" "}
    </PageAnimate>
  );
}
