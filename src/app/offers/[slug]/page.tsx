import { Metadata } from "next";
import { getProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gift, Package, Ticket, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const OFFER_TYPES: Record<
  string,
  { label: string; description: string; icon: any; color: string }
> = {
  "bundle-deals": {
    label: "Bundle Deals",
    description:
      "Save big when you buy more. Perfectly paired comfort solutions.",
    icon: Package,
    color: "bg-blue-600",
  },
  "buy-one-get-one": {
    label: "Buy 1 Get 1 (BOGO)",
    description:
      "Special BOGO offers on selected accessories and comfort products.",
    icon: Gift,
    color: "bg-purple-600",
  },
  coupons: {
    label: "Limited Coupons",
    description: "Exclusive discount codes for our community members.",
    icon: Ticket,
    color: "bg-emerald-600",
  },
  "referral-offers": {
    label: "Referral Rewards",
    description: "Share the comfort with friends and earn exclusive rewards.",
    icon: Clock,
    color: "bg-amber-600",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = OFFER_TYPES[slug];
  if (!offer) return { title: "Offer Not Found | FamilyFans" };

  return {
    title: `${offer.label} — Exclusive Offers | FamilyFans`,
    description: offer.description,
  };
}

export default async function OffersPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const offer = OFFER_TYPES[slug];
  if (!offer) notFound();

  const Icon = offer.icon;

  const allProducts = await getProducts();
  // Placeholder logic for products
  const products = allProducts.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Offers", href: "/offers/bundle-deals" },
          { label: offer.label },
        ]}
      />
      <div
        className={`rounded-3xl p-8 md:p-12 text-white mb-12 shadow-2xl ${offer.color} relative overflow-hidden`}
      >
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="p-6 bg-white/10 backdrop-blur-xl rounded-full">
            <Icon className="w-16 h-16" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {offer.label}
            </h1>
            <p className="text-lg text-white/80 max-w-xl">
              {offer.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center mb-4 text-[var(--color-primary)] font-bold text-xl">
              {i}
            </div>
            <h3 className="font-bold mb-2">Exclusive Deal #{i}</h3>
            <p className="text-sm text-[var(--muted-text)] mb-4">
              Unlock this offer by applying the code at checkout or following
              the bundle instructions.
            </p>
            <button className="text-[var(--color-primary)] font-bold text-sm hover:underline">
              Learn More →
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-8">Applicable Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-16 bg-[var(--muted)] p-8 rounded-3xl text-center border border-[var(--border)]">
        <Ticket className="w-10 h-10 mx-auto mb-4 text-[var(--muted-text)]" />
        <h3 className="text-xl font-bold mb-2">Want even more savings?</h3>
        <p className="text-[var(--muted-text)] mb-6 max-w-md mx-auto">
          Join our newsletter and receive a special 15% discount code for your
          first order.
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="flex-grow p-3 rounded-xl border border-[var(--border)] focus:ring-2 ring-[var(--color-primary)]/20 outline-none"
          />
          <button className="btn-primary">Join</button>
        </div>
      </div>
    </div>
  );
}
