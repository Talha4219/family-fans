import { Metadata } from "next";

import Link from "next/link";

import { getProducts } from "@/lib/actions";

import ProductCard from "@/components/ProductCard";

import { Flame, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Black Friday 2026 — Biggest Fan & Heater Sale",
  description:
    "FamilyFans's Black Friday 2026 sale offers the deepest discounts of the year on premium fans and heaters. Up to 50% off — the biggest sale event of the year.",
  keywords: [
    "black friday fans",
    "black friday heaters",
    "black friday FamilyFans",
    "black friday sale 2026",
  ],
  alternates: {
    canonical: "https://FamilyFans.com/black-friday",
  },
  openGraph: {
    title: "Black Friday 2026 — Biggest Fan & Heater Sale",
    description:
      "Up to 50% off fans and heaters. Our biggest sale of the year.",
    url: "https://FamilyFans.com/black-friday",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Black Friday FamilyFans",
      },
    ],
  },
};

export default async function BlackFridayPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {" "}
      {/* Hero */}
      <div className="bg-[var(--foreground)] text-white rounded-2xl p-8 md:p-16 mb-12 text-center">
        {" "}
        <div className="flex items-center justify-center gap-2 mb-4">
          {" "}
          <Flame className="w-5 h-5 text-lime-500" />{" "}
          <span className="text-sm uppercase tracking-widest font-bold text-lime-500">
            Black Friday 2026
          </span>{" "}
        </div>{" "}
        <h1
          className="text-4xl md:text-6xl font-black mb-4"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          {" "}
          Up to 50% Off{" "}
        </h1>{" "}
        <p className="text-white/60 max-w-md mx-auto mb-8">
          {" "}
          Our biggest sale of the year on premium fans and heaters. Limited time
          — starts Nov 29, 2026.{" "}
        </p>{" "}
        <Link
          href="/deals"
          className="inline-flex items-center gap-2 bg-white text-[var(--foreground)] font-semibold px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
        >
          {" "}
          See All Deals <ArrowRight className="w-4 h-4" />{" "}
        </Link>{" "}
      </div>{" "}
      <h2
        className="text-2xl font-bold mb-6"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Deals Preview
      </h2>{" "}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {" "}
        {products.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>{" "}
    </div>
  );
}
