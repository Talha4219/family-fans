import { Metadata } from "next";

import { getProducts } from "@/lib/actions";

import ProductCard from "@/components/ProductCard";

import Link from "next/link";

import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Top Rated Products — 5-Star Fans & Heaters | FamilyFans",
  description:
    "Browse FamilyFans's top-rated fans and heaters with 5-star customer reviews. Discover the highest quality home comfort products verified by real buyers.",
  alternates: {
    canonical: "https://FamilyFans.com/top-rated",
  },
  openGraph: {
    title: "Top Rated Products — 5-Star Fans & Heaters | FamilyFans",
    description: "Highest-rated fans and heaters verified by real customers.",
    url: "https://FamilyFans.com/top-rated",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Top Rated FamilyFans",
      },
    ],
  },
};

export default async function TopRatedPage() {
  const products = await getProducts();

  const topRated = [...products]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 8);

  return (
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
          Top Rated
        </span>{" "}
      </nav>{" "}
      <div className="flex items-center gap-2 mb-2">
        {" "}
        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />{" "}
        <span className="text-xs uppercase tracking-widest font-semibold text-lime-600">
          Highest Rated
        </span>{" "}
      </div>{" "}
      <h1
        className="text-3xl md:text-4xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Top Rated
      </h1>{" "}
      <p className="text-[var(--muted-text)] max-w-xl mb-10">
        {" "}
        Products with the highest ratings from verified buyers. Every product
        below has earned 4 stars or above.{" "}
      </p>{" "}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {" "}
        {topRated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>{" "}
    </div>
  );
}
