import { Metadata } from "next";

import { getProducts } from "@/lib/actions";

import ProductCard from "@/components/ProductCard";

import Link from "next/link";

import { PercentCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Clearance Sale — Up to 60% Off Fans & Heaters",
  description:
    "Shop FamilyFans's clearance sale for the deepest discounts on fans and heaters. End-of-line products at up to 60% off while stocks last.",
  alternates: {
    canonical: "https://FamilyFans.com/clearance",
  },
  openGraph: {
    title: "Clearance Sale — Up to 60% Off Fans & Heaters",
    description:
      "Up to 60% off end-of-line fans and heaters. While stocks last.",
    url: "https://FamilyFans.com/clearance",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FamilyFans Clearance",
      },
    ],
  },
};

export default async function ClearancePage() {
  const products = await getProducts();

  const clearanceItems = products.slice(2, 10);

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
          Clearance
        </span>{" "}
      </nav>{" "}
      <div className="flex items-center gap-2 mb-2">
        {" "}
        <PercentCircle className="w-5 h-5 text-lime-600" />{" "}
        <span className="text-xs uppercase tracking-widest font-semibold text-lime-600">
          Up to 60% off
        </span>{" "}
      </div>{" "}
      <h1
        className="text-3xl md:text-4xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Clearance
      </h1>{" "}
      <p className="text-[var(--muted-text)] max-w-xl mb-10">
        {" "}
        End-of-season and discontinued products at our lowest ever prices. All
        sales final. Limited stock available.{" "}
      </p>{" "}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {" "}
        {clearanceItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>{" "}
    </div>
  );
}
