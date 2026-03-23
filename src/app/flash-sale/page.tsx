import { Metadata } from "next";

import { getProducts } from "@/lib/actions";

import ProductCard from "@/components/ProductCard";

import Link from "next/link";

import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Flash Sale — Limited Time Savings | FamilyFans",
  description:
    "Shop FamilyFans's flash sale for deeply discounted fans and heaters. 24-hour deals on premium home comfort products. Limited stock — act fast!",
  keywords: [
    "flash sale",
    "24 hour sale",
    "limited time deals",
    "fan sale",
    "heater sale",
  ],
  alternates: {
    canonical: "https://FamilyFans.com/flash-sale",
  },
  openGraph: {
    title: "Flash Sale — Limited Time Savings | FamilyFans",
    description: "24-hour deals on fans and heaters. Limited stock — act fast!",
    url: "https://FamilyFans.com/flash-sale",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FamilyFans Flash Sale",
      },
    ],
  },
};

export default async function FlashSalePage() {
  const products = await getProducts();

  const saleProducts = products.slice(0, 6);

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
        <Link
          href="/deals"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          Deals
        </Link>{" "}
        <span>/</span>{" "}
        <span className="text-[var(--foreground)] font-medium">
          Flash Sale
        </span>{" "}
      </nav>{" "}
      <div className="flex items-center gap-2 mb-2">
        {" "}
        <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />{" "}
        <span className="text-xs uppercase tracking-widest font-semibold text-yellow-500">
          Limited time
        </span>{" "}
      </div>{" "}
      <h1
        className="text-3xl md:text-4xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Flash Sale
      </h1>{" "}
      <p className="text-[var(--muted-text)] max-w-xl mb-4">
        Deep discounts for 24 hours only. These prices won't last — grab your
        favorites before they're gone.
      </p>{" "}
      <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded-full mb-10">
        {" "}
        <Zap className="w-3.5 h-3.5" /> Flash deals — refresh every 24
        hours{" "}
      </div>{" "}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {" "}
        {saleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>{" "}
    </div>
  );
}
