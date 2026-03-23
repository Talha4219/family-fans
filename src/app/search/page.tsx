import { Metadata } from "next";

import { getProducts } from "@/lib/actions";

import ProductCard from "@/components/ProductCard";

import Link from "next/link";

import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Products — Find Fans & Heaters | FamilyFans",
  description:
    "Search FamilyFans's full catalog of premium fans and heaters. Find by name, category, or price range. Fast delivery and free shipping over $50.",
  alternates: {
    canonical: "https://FamilyFans.com/search",
  },
  openGraph: {
    title: "Search Products — Find Fans & Heaters | FamilyFans",
    description:
      "Search our catalog of fans and heaters. Free shipping over $50.",
    url: "https://FamilyFans.com/search",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Search FamilyFans",
      },
    ],
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  const sp = await searchParams;

  const query = sp.q?.toLowerCase().trim() ?? "";

  const allProducts = await getProducts();

  const results = query
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query),
      )
    : [];

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
          Search
        </span>{" "}
      </nav>{" "}
      <h1
        className="text-3xl md:text-4xl font-bold mb-6"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        {" "}
        {query
          ? `Results for"${query}
"`
          : "Search Products"}
      </h1>{" "}
      {/* Search input */}
      <form method="GET" action="/search" className="flex gap-3 mb-10 max-w-xl">
        {" "}
        <div className="relative flex-1">
          {" "}
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--muted-text)]" />{" "}
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search fans, heaters, accessories..."
            className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--foreground)] transition-colors"
          />{" "}
        </div>{" "}
        <button type="submit" className="btn-primary !py-2 !px-5 !text-sm">
          Search
        </button>{" "}
      </form>{" "}
      {query ? (
        results.length > 0 ? (
          <>
            {" "}
            <p className="text-sm text-[var(--muted-text)] mb-6">
              {results.length}
              result{results.length !== 1 ? "s" : ""}
              found
            </p>{" "}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {" "}
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>{" "}
          </>
        ) : (
          <div className="py-24 text-center border border-dashed border-[var(--border)] rounded-xl">
            {" "}
            <h2 className="text-xl font-semibold mb-2">
              No results for &quot;{query}
              &quot;
            </h2>{" "}
            <p className="text-[var(--muted-text)] text-sm mb-6">
              Try a different keyword or browse our catalog.
            </p>{" "}
            <div className="flex gap-3 justify-center">
              {" "}
              <Link href="/shop" className="btn-primary !text-sm !py-2">
                Browse All
              </Link>{" "}
              <Link href="/deals" className="btn-secondary !text-sm !py-2">
                View Deals
              </Link>{" "}
            </div>{" "}
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {" "}
          {allProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
