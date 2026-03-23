import { Metadata } from "next";

import Link from "next/link";

import { getProducts } from "@/lib/actions";

import ProductCard from "@/components/ProductCard";

import { Sun, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Summer Sale 2026 — Up to 40% Off Premium Fans",
  description:
    "Beat the heat with FamilyFans's Summer Sale 2026. Up to 40% off on ceiling fans, tower fans, and desk fans. Free shipping on all orders this summer.",
  keywords: [
    "summer sale fans",
    "summer fan deals",
    "summer 2026 sale",
    "cheap fans summer",
  ],
  alternates: {
    canonical: "https://FamilyFans.com/summer-sale",
  },
  openGraph: {
    title: "Summer Sale 2026 — Up to 40% Off Premium Fans",
    description: "Up to 40% off on fans. Free shipping all summer long.",
    url: "https://FamilyFans.com/summer-sale",
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

export default async function SummerSalePage() {
  const products = await getProducts();

  const fanProducts = products.filter(
    (p) => p.category?.toLowerCase() === "fans",
  );

  const show = fanProducts.length > 0 ? fanProducts : products.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {" "}
      <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl p-8 md:p-16 mb-12 text-center border border-blue-200">
        {" "}
        <div className="flex items-center justify-center gap-2 mb-4">
          {" "}
          <Sun className="w-5 h-5 text-lime-600" />{" "}
          <span className="text-sm uppercase tracking-widest font-bold text-amber-600">
            Summer 2026
          </span>{" "}
        </div>{" "}
        <h1
          className="text-4xl md:text-6xl font-black mb-4"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          {" "}
          Stay Cool, Save Big{" "}
        </h1>{" "}
        <p className="text-[var(--muted-text)] max-w-md mx-auto mb-8">
          {" "}
          Up to 40% off on our best fans this summer. Free shipping on all
          orders. Ends August 31, 2026.{" "}
        </p>{" "}
        <Link href="/category/fans" className="btn-primary inline-flex">
          {" "}
          Shop Fans <ArrowRight className="w-4 h-4" />{" "}
        </Link>{" "}
      </div>{" "}
      <h2
        className="text-2xl font-bold mb-6"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Summer Picks
      </h2>{" "}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {" "}
        {show.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>{" "}
    </div>
  );
}
