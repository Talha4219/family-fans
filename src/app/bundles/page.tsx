import { Metadata } from "next";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Bundle Deals — Buy More, Save More | FamilyFans",
  description:
    "Save more with FamilyFans bundle deals. Pair fans with heaters or accessories for extra savings. Curated home comfort packages at the best prices.",
  alternates: {
    canonical: "https://FamilyFans.com/bundles",
  },
  openGraph: {
    title: "Bundle Deals — Buy More, Save More | FamilyFans",
    description: "Pair fans with heaters or accessories for extra savings.",
    url: "https://FamilyFans.com/bundles",
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

const BUNDLES = [
  {
    name: "Comfort Duo",
    desc: "1 Desk Fan + 1 Ceramic Heater",
    price: 74.99,
    original: 89.99,
    saving: "17%",
  },
  {
    name: "Home Essentials",
    desc: "1 Ceiling Fan + 1 Panel Heater + Filter",
    price: 149.99,
    original: 189.99,
    saving: "21%",
  },
  {
    name: "Premium Pack",
    desc: "2 Tower Fans + 1 Smart Heater",
    price: 219.99,
    original: 279.99,
    saving: "21%",
  },
];

export default function BundlesPage() {
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
          Bundle Deals
        </span>{" "}
      </nav>{" "}
      <h1
        className="text-3xl md:text-4xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Bundle Deals
      </h1>{" "}
      <p className="text-[var(--muted-text)] max-w-xl mb-10">
        {" "}
        Buy curated sets and save more. Every bundle is handpicked for maximum
        comfort and value.{" "}
      </p>{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {" "}
        {BUNDLES.map((b) => (
          <div
            key={b.name}
            className="border border-[var(--border)] rounded-xl p-6 space-y-4"
          >
            {" "}
            <div className="inline-block text-xs font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
              {" "}
              Save {b.saving}
            </div>{" "}
            <div>
              {" "}
              <h2
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-inter)",
                }}
              >
                {b.name}
              </h2>{" "}
              <p className="text-sm text-[var(--muted-text)] mt-1">
                {b.desc}
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-2xl font-bold">Rs. {b.price.toLocaleString()}</p>{" "}
              <p className="text-sm text-[var(--muted-text)] line-through">
                Rs. {b.original.toLocaleString()}
              </p>{" "}
            </div>{" "}
            <button className="btn-primary w-full !py-2.5 !text-sm">
              {" "}
              Add Bundle to Cart <ArrowRight className="w-4 h-4" />{" "}
            </button>{" "}
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
