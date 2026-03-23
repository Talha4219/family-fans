import { Metadata } from "next";

import Link from "next/link";

import { Users, DollarSign, BarChart, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Program — Earn Commissions | FamilyFans",
  description:
    "Join the FamilyFans Affiliate Program and earn up to 15% commission on premium fans and heaters. High conversion rates, 30-day cookie, and dedicated support.",
  alternates: {
    canonical: "https://FamilyFans.com/affiliate",
  },
  openGraph: {
    title: "Affiliate Program | FamilyFans",
    description: "Earn up to 15% commission promoting FamilyFans products.",
    url: "https://FamilyFans.com/affiliate",
    type: "website",
  },
};

export default function AffiliatePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
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
          Affiliate Program
        </span>{" "}
      </nav>{" "}
      <div className="text-center mb-16">
        {" "}
        <div className="inline-flex items-center gap-2 mb-4 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          {" "}
          <DollarSign className="w-4 h-4" /> Earn up to 15% Commission{" "}
        </div>{" "}
        <h1
          className="text-4xl md:text-5xl font-black mb-4"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          {" "}
          Partner with FamilyFans{" "}
        </h1>{" "}
        <p className="text-[var(--muted-text)] max-w-2xl mx-auto text-lg mb-8">
          {" "}
          Turn your audience into income. We offer one of the most competitive
          affiliate programs in the home tech industry.{" "}
        </p>{" "}
        <div className="flex gap-4 justify-center">
          {" "}
          <button className="btn-primary !py-3 !px-8">Apply Now</button>{" "}
          <Link href="/contact" className="btn-secondary !py-3 !px-8">
            Contact Us
          </Link>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {" "}
        {[
          {
            icon: DollarSign,
            title: "High Conversions",
            desc: "Our products boast a 4.5% average conversion rate, meaning more earnings per click for you.",
          },
          {
            icon: BarChart,
            title: "30-Day Cookie",
            desc: "You get credit for any purchases made within 30 days of a user clicking your affiliate link.",
          },
          {
            icon: Users,
            title: "Dedicated Support",
            desc: "Access to a dedicated affiliate manager, custom banners, and exclusive seasonal promotions.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="border border-[var(--border)] rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
          >
            {" "}
            <div className="w-12 h-12 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-4">
              {" "}
              <Icon className="w-6 h-6 text-[var(--foreground)]" />{" "}
            </div>{" "}
            <h3
              className="text-lg font-bold mb-2"
              style={{
                fontFamily: "var(--font-inter)",
              }}
            >
              {title}
            </h3>{" "}
            <p className="text-sm text-[var(--muted-text)]">{desc}</p>{" "}
          </div>
        ))}
      </div>{" "}
      <div className="bg-[var(--foreground)] text-white rounded-2xl p-8 md:p-12 flex flex-col items-center text-center">
        {" "}
        <h2
          className="text-2xl font-bold mb-3"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          Ready to start earning?
        </h2>{" "}
        <p className="text-white/70 max-w-md mb-8">
          Approval typically takes 24-48 business hours. Join hundreds of
          successful partners today.
        </p>{" "}
        <button className="bg-white text-[var(--foreground)] font-bold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
          {" "}
          Submit Application <ArrowRight className="w-4 h-4" />{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}
