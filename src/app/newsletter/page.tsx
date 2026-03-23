import { Metadata } from "next";

import Link from "next/link";

import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscribe to Our Newsletter & Save 10% | FamilyFans",
  description:
    "Join the FamilyFans newsletter to get 10% off your first order. Receive exclusive early access to new fans and heaters, plus expert home comfort tips.",
  keywords: [
    "FamilyFans newsletter",
    "newsletter signup",
    "10% off coupon",
    "home comfort tips",
  ],
  alternates: {
    canonical: "https://FamilyFans.com/newsletter",
  },
  openGraph: {
    title: "Subscribe & Save 10% | FamilyFans",
    description:
      "Join our newsletter for 10% off your first order and exclusive tips.",
    url: "https://FamilyFans.com/newsletter",
    type: "website",
  },
};

export default function NewsletterPage() {
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
          Newsletter
        </span>{" "}
      </nav>{" "}
      <div className="border border-[var(--border)] rounded-2xl p-8 md:p-12 text-center bg-[var(--muted)]">
        {" "}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          {" "}
          <Mail className="w-8 h-8 text-[var(--foreground)]" />{" "}
        </div>{" "}
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          {" "}
          Unlock 10% Off{" "}
        </h1>{" "}
        <p className="text-[var(--muted-text)] max-w-md mx-auto mb-8">
          {" "}
          Join 200,000+ subscribers getting exclusive discounts, early sale
          access, and expert home comfort tips delivered directly to their
          inbox.{" "}
        </p>{" "}
        <form className="max-w-md mx-auto space-y-4">
          {" "}
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full px-5 py-3 rounded-md border border-[var(--border)] focus:outline-none focus:border-[var(--foreground)] transition-colors text-center"
          />{" "}
          <button type="submit" className="btn-primary w-full py-3 text-base">
            {" "}
            Subscribe & Get Discount{" "}
          </button>{" "}
          <p className="text-xs text-[var(--muted-text)] mt-4">
            {" "}
            By subscribing, you agree to our{" "}
            <Link
              href="/privacy"
              className="underline hover:text-[var(--foreground)]"
            >
              Privacy Policy
            </Link>
            . You can unsubscribe at any time.{" "}
          </p>{" "}
        </form>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
        {" "}
        {[
          {
            title: "Exclusive Deals",
            desc: "Subscribers get access to sales 24 hours early.",
          },
          {
            title: "Expert Tips",
            desc: "Weekly guides on saving energy and optimizing comfort.",
          },
          {
            title: "No Spam",
            desc: "We only send 2 emails a week. Unsubscribe anytime.",
          },
        ].map((feature) => (
          <div key={feature.title} className="text-center">
            {" "}
            <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-2" />{" "}
            <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>{" "}
            <p className="text-xs text-[var(--muted-text)]">
              {feature.desc}
            </p>{" "}
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
