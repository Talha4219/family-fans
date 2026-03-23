import { Metadata } from "next";

import { getProducts } from "@/lib/actions";

import ProductCard from "@/components/ProductCard";

import Link from "next/link";

import { Sparkles, ArrowRight } from "lucide-react";

import PageAnimate from "@/components/PageAnimate";

export const metadata: Metadata = {
  title: "New Arrivals — Latest Fans & Heaters | FamilyFans",
  description:
    "Discover FamilyFans's newest fans and heaters. Be the first to explore our latest energy-efficient home comfort products. New items added weekly.",
  keywords: [
    "new fans",
    "new heaters",
    "latest products",
    "new arrivals",
    "FamilyFans new",
  ],
  alternates: {
    canonical: "https://FamilyFans.com/new-arrivals",
  },
  openGraph: {
    title: "New Arrivals — Latest Fans & Heaters | FamilyFans",
    description:
      "Discover our latest fans and heaters. New items added weekly.",
    url: "https://FamilyFans.com/new-arrivals",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FamilyFans New Arrivals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Arrivals | FamilyFans",
    description: "Our latest fans and heaters — new items weekly.",
  },
};

export default async function NewArrivalsPage() {
  const products = await getProducts();

  const newArrivals = products.slice(0, 8);

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
            New Arrivals
          </span>{" "}
        </nav>{" "}
        <div className="flex items-center gap-3 mb-2">
          {" "}
          <Sparkles className="w-5 h-5 text-[var(--highlight)]" />{" "}
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--highlight)]">
            Just landed
          </span>{" "}
        </div>{" "}
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          {" "}
          New Arrivals{" "}
        </h1>{" "}
        <p className="text-[var(--muted-text)] max-w-xl mb-10">
          {" "}
          Fresh additions to our lineup — the latest in energy-efficient home
          comfort. Check back every week for new products.{" "}
        </p>{" "}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {" "}
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>{" "}
        <div className="mt-12 text-center">
          {" "}
          <Link
            href="/shop"
            className="btn-secondary inline-flex items-center gap-2"
          >
            {" "}
            View All Products <ArrowRight className="w-4 h-4" />{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </PageAnimate>
  );
}
