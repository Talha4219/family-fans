import { Metadata } from "next";

import { getProducts } from "@/lib/actions";

import ProductCard from "@/components/ProductCard";

import Link from "next/link";

import { TrendingUp, ArrowRight } from "lucide-react";

import PageAnimate from "@/components/PageAnimate";

export const metadata: Metadata = {
  title: "Best Sellers — Top-Rated Fans & Heaters | FamilyFans",
  description:
    "Shop FamilyFans's best-selling fans and heaters. Customer-loved products with thousands of reviews. Quality home comfort at unbeatable prices.",
  keywords: [
    "best sellers",
    "top fans",
    "popular heaters",
    "most popular",
    "customer favorites",
  ],
  alternates: {
    canonical: "https://FamilyFans.com/best-sellers",
  },
  openGraph: {
    title: "Best Sellers — Top-Rated Fans & Heaters | FamilyFans",
    description:
      "Customer-loved products with thousands of reviews. Top fans and heaters.",
    url: "https://FamilyFans.com/best-sellers",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FamilyFans Best Sellers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Sellers | FamilyFans",
    description: "Our most-loved fans and heaters.",
  },
};

export default async function BestSellersPage() {
  const products = await getProducts();

  const bestSellers = [...products]
    .sort((a, b) => (b.numReviews ?? 0) - (a.numReviews ?? 0))
    .slice(0, 8);

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
            Best Sellers
          </span>{" "}
        </nav>{" "}
        <div className="flex items-center gap-2 mb-2">
          {" "}
          <TrendingUp className="w-5 h-5 text-[var(--highlight)]" />{" "}
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--highlight)]">
            Customer Favorites
          </span>{" "}
        </div>{" "}
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          Best Sellers
        </h1>{" "}
        <p className="text-[var(--muted-text)] max-w-xl mb-10">
          {" "}
          The products our customers love most — ranked by reviews and repeat
          purchases. Guaranteed quality.{" "}
        </p>{" "}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {" "}
          {bestSellers.map((p, i) => (
            <div key={p.id} className="relative">
              {" "}
              {i < 3 && (
                <span className="absolute top-2 left-2 z-10 bg-[var(--foreground)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {" "}
                  #{i + 1}
                </span>
              )}
              <ProductCard product={p} />{" "}
            </div>
          ))}
        </div>{" "}
        <div className="mt-12 text-center">
          {" "}
          <Link
            href="/shop"
            className="btn-secondary inline-flex items-center gap-2"
          >
            {" "}
            Explore All Products <ArrowRight className="w-4 h-4" />{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </PageAnimate>
  );
}
