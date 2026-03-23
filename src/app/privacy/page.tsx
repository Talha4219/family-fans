import { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — How We Protect Your Data | FamilyFans",
  description:
    "Read FamilyFans's Privacy Policy to learn how we collect, use, and protect your personal data. We are fully GDPR and CCPA compliant. Last updated March 2026.",
  alternates: {
    canonical: "https://FamilyFans.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | FamilyFans",
    description: "How FamilyFans collects, uses, and protects your data.",
    url: "https://FamilyFans.com/privacy",
    type: "website",
  },
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly (name, email, shipping address, payment info) and automatically (device type, IP address, pages visited, referral source). We use cookies and similar tracking technologies.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to: process and fulfill orders, send order confirmations and shipping updates, provide customer support, send marketing emails (with your consent), improve our website and products, and comply with legal obligations.",
  },
  {
    title: "3. Sharing Your Information",
    body: "We do not sell your personal data. We share data with trusted partners only as needed: payment processors (Stripe), shipping carriers (UPS, FedEx), email platforms (for transactional emails). All partners are bound by data processing agreements.",
  },
  {
    title: "4. Data Retention",
    body: "We retain your personal data for as long as necessary to provide services and comply with legal requirements. Account data is retained for the duration of your account. Order data is retained for 7 years for tax purposes.",
  },
  {
    title: "5. Your Rights",
    body: "Under GDPR and CCPA you have the right to: access your data, correct inaccurate data, delete your data ('right to be forgotten'), opt out of marketing, and data portability. Contact privacy@FamilyFans.com to exercise these rights.",
  },
  {
    title: "6. Cookies",
    body: "We use essential cookies (for cart and session), analytics cookies (Google Analytics), and marketing cookies. You can manage your cookie preferences at any time via the cookie banner or your browser settings.",
  },
  {
    title: "7. Contact Us",
    body: "For privacy questions, contact: privacy@FamilyFans.com or write to FamilyFans Inc., 123 Innovation Drive, Silicon Valley, CA 94025, United States.",
  },
];

export default function PrivacyPage() {
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
          Privacy Policy
        </span>{" "}
      </nav>{" "}
      <h1
        className="text-3xl md:text-4xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-inter)",
        }}
      >
        Privacy Policy
      </h1>{" "}
      <p className="text-sm text-[var(--muted-text)] mb-10">
        Last updated: March 14, 2026 · Effective: March 14, 2026
      </p>{" "}
      <p className="text-[var(--muted-text)] mb-8">
        {" "}
        FamilyFans Inc. (&quot;FamilyFans&quot;, &quot;we&quot;,
        &quot;our&quot;) is committed to protecting your privacy. This policy
        explains what data we collect, why, and how we keep it safe.{" "}
      </p>{" "}
      <div className="space-y-8">
        {" "}
        {SECTIONS.map(({ title, body }) => (
          <section key={title}>
            {" "}
            <h2
              className="text-lg font-bold mb-2"
              style={{
                fontFamily: "var(--font-inter)",
              }}
            >
              {title}
            </h2>{" "}
            <p className="text-sm text-[var(--muted-text)] leading-relaxed">
              {body}
            </p>{" "}
          </section>
        ))}
      </div>{" "}
      <div className="mt-12 flex gap-3 flex-wrap">
        {" "}
        <Link href="/terms" className="btn-secondary !text-sm !py-2">
          Terms & Conditions
        </Link>{" "}
        <Link href="/cookies" className="btn-secondary !text-sm !py-2">
          Cookie Policy
        </Link>{" "}
        <Link href="/contact" className="btn-secondary !text-sm !py-2">
          Contact Us
        </Link>{" "}
      </div>{" "}
    </div>
  );
}
