import { Metadata } from "next";

import Link from "next/link";

import { Gift, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Gift Cards — Give the Gift of Comfort | FamilyFans",
  description:
    "Give the perfect gift with an FamilyFans digital gift card. Available from $25 to $500. Redeemable on all fans, heaters, and accessories. Never expires.",
  keywords: [
    "FamilyFans gift card",
    "fan gift card",
    "heater gift",
    "digital gift card",
  ],
  alternates: {
    canonical: "https://FamilyFans.com/gift-cards",
  },
  openGraph: {
    title: "Gift Cards | FamilyFans",
    description:
      "Digital gift cards from $25–$500. Perfect for any occasion. Never expires.",
    url: "https://FamilyFans.com/gift-cards",
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

const AMOUNTS = [25, 50, 100, 150, 200, 500];

export default function GiftCardsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
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
          Gift Cards
        </span>{" "}
      </nav>{" "}
      <div className="flex items-center gap-2 mb-2">
        {" "}
        <Gift className="w-5 h-5 text-[var(--highlight)]" />{" "}
        <span className="text-xs uppercase tracking-widest font-semibold text-[var(--highlight)]">
          Digital gift card
        </span>{" "}
      </div>{" "}
      <h1
        className="text-3xl md:text-4xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Give the Gift of Comfort
      </h1>{" "}
      <p className="text-[var(--muted-text)] max-w-xl mb-10">
        Our digital gift cards are emailed instantly and can be used on any
        product. They never expire and are fully reloadable.
      </p>{" "}
      <div className="border border-[var(--border)] rounded-2xl p-6 md:p-8 mb-8">
        {" "}
        <h2
          className="text-lg font-bold mb-5"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          Select an Amount
        </h2>{" "}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {" "}
          {AMOUNTS.map((amount) => (
            <button
              key={amount}
              className={`py-3 rounded-xl border text-sm font-semibold transition-colors ${
                amount === 100
                  ? "bg-[var(--foreground)] text-white border-[var(--foreground)]"
                  : "border-[var(--border)] hover:border-[var(--foreground)]"
              }
`}
            >
              {" "}
              ${amount}
            </button>
          ))}
        </div>{" "}
        <div className="space-y-1.5 mb-6">
          {" "}
          <label className="text-sm font-medium">Recipient email</label>{" "}
          <input
            type="email"
            placeholder="friend@example.com"
            className="w-full px-4 py-2.5 rounded-md border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--foreground)]"
          />{" "}
        </div>{" "}
        <div className="space-y-1.5 mb-6">
          {" "}
          <label className="text-sm font-medium">
            Personal message (optional)
          </label>{" "}
          <textarea
            rows={2}
            placeholder="Happy birthday! Enjoy..."
            className="w-full px-4 py-2.5 rounded-md border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--foreground)] resize-none"
          />{" "}
        </div>{" "}
        <button className="btn-primary w-full py-3">
          {" "}
          Purchase Gift Card <ArrowRight className="w-4 h-4" />{" "}
        </button>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {" "}
        {[
          "Delivered by email instantly",
          "Redeemable on all products",
          "Never expires — no fees",
        ].map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2.5 p-4 bg-[var(--muted)] rounded-xl"
          >
            {" "}
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />{" "}
            <p className="text-xs font-medium">{feature}</p>{" "}
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
