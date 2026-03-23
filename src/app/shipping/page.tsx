import { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, MapPin, Package, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Information — Delivery Times & Rates",
  description:
    "Learn about FamilyFans's shipping options, delivery times, and rates. Free standard shipping on orders over Rs. 5,000. Express and same-day options available.",
  keywords: [
    "FamilyFans shipping",
    "delivery times",
    "free shipping",
    "fast delivery",
    "shipping rates",
  ],
  alternates: {
    canonical: "https://FamilyFans.com/shipping",
  },
  openGraph: {
    title: "Shipping Information | FamilyFans",
    description:
      "Free shipping over Rs. 5,000. Learn about delivery times and options.",
    url: "https://FamilyFans.com/shipping",
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

const SHIPPING_OPTIONS = [
  {
    name: "Standard Shipping",
    time: "3–5 Business Days",
    price: "Rs. 350",
    free: "Free over Rs. 5,000",
  },
  {
    name: "Express Shipping",
    time: "1–2 Business Days",
    price: "Rs. 850",
    free: null,
  },
  {
    name: "Overnight Shipping",
    time: "Next Business Day",
    price: "Rs. 1,500",
    free: null,
  },
];

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
      <nav className="text-sm text-[var(--muted-text)] mb-6 flex items-center gap-2">
        <Link
          href="/"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          Home
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">
          Shipping
        </span>
      </nav>
      <div className="flex items-center gap-2 mb-2">
        <Truck className="w-5 h-5 text-[var(--highlight)]" />
        <span className="text-xs uppercase tracking-widest font-semibold text-[var(--highlight)]">
          Delivery
        </span>
      </div>
      <h1
        className="text-3xl md:text-4xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Shipping Information
      </h1>
      <p className="text-[var(--muted-text)] mb-10">
        Fast, reliable delivery on all orders. Free standard shipping when you
        spend over Rs. 5,000.
      </p>
      {/* Shipping Options */}
      <h2
        className="text-xl font-bold mb-4"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Shipping Options
      </h2>
      <div className="border border-[var(--border)] rounded-xl overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead><tr className="bg-[var(--muted)] border-b border-[var(--border)]"><th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Method</th><th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Delivery Time</th><th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--muted-text)]">Cost</th></tr></thead>
          <tbody className="divide-y divide-[var(--border)]">
            {SHIPPING_OPTIONS.map((opt) => (
              <tr
                key={opt.name}
                className="hover:bg-[var(--muted)] transition-colors"
              ><td className="px-5 py-4 font-medium">{opt.name}</td><td className="px-5 py-4 text-[var(--muted-text)]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {opt.time}
                  </span>
                </td><td className="px-5 py-4">
                  <span className="font-semibold">{opt.price}</span>
                  {opt.free && (
                    <span className="block text-xs text-green-600 mt-0.5">
                      {opt.free}
                    </span>
                  )}
                </td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* FAQ Snippets */}
      <div className="space-y-5">
        <h2
          className="text-xl font-bold"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          Common Questions
        </h2>
        {[
          {
            q: "When will my order ship?",
            a: "Orders placed before 2PM EST ship the same business day. Orders after that ship the next business day.",
          },
          {
            q: "Can I track my order?",
            a: "Yes. You'll receive a tracking email as soon as your order ships. You can also track it at /track-order.",
          },
        ].map(({ q, a }) => (
          <div key={q} className="border border-[var(--border)] rounded-xl p-5">
            <h3 className="font-medium text-sm mb-1">{q}</h3>
            <p className="text-sm text-[var(--muted-text)]">{a}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex gap-3">
        <Link
          href="/returns"
          className="btn-secondary !text-sm !py-2 inline-flex"
        >
          Return Policy
        </Link>
        <Link
          href="/track-order"
          className="btn-primary !text-sm !py-2 inline-flex"
        >
          Track Order <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
