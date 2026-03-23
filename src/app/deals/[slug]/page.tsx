import { Metadata } from "next";
import { getProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { TrendingUp, Sparkles, DollarSign, Zap } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const DEAL_TYPES: Record<
  string,
  {
    label: string;
    description: string;
    icon: any;
    filter?: (p: any) => boolean;
  }
> = {
  "best-deals": {
    label: "Best Deals",
    description:
      "Hand-picked premium comfort solutions at the lowest prices ever.",
    icon: Sparkles,
    filter: (p) => (p.discount || 0) > 15,
  },
  "trending-deals": {
    label: "Trending Now",
    description:
      "What everyone is buying right now. Modern fans and smart heaters.",
    icon: TrendingUp,
    filter: (p) => (p.rating || 0) >= 4.5,
  },
  "under-50": {
    label: "Under $50",
    description:
      "Quality accessories and compact comfort solutions that fit any budget.",
    icon: DollarSign,
    filter: (p) => p.price < 50,
  },
  "under-100": {
    label: "Under $100",
    description:
      "Premium performance without the premium price tag. Essential home comfort.",
    icon: Zap,
    filter: (p) => p.price < 100,
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const deal = DEAL_TYPES[slug];
  if (!deal) return { title: "Deal Not Found | FamilyFans" };

  return {
    title: `${deal.label} — Top Savings | FamilyFans`,
    description: deal.description,
  };
}

export default async function DealsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const deal = DEAL_TYPES[slug];
  if (!deal) notFound();

  const Icon = deal.icon;
  const allProducts = await getProducts();
  const products = deal.filter ? allProducts.filter(deal.filter) : allProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Deals", href: "/deals/best-deals" },
          { label: deal.label },
        ]}
      />
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-[var(--muted)] rounded-2xl mb-6 text-[var(--color-primary)]">
          <Icon className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
          {deal.label}
        </h1>
        <p className="text-[var(--muted-text)] text-lg max-w-2xl mx-auto">
          {deal.description}
        </p>
      </div>

      <div className="flex items-center justify-between mb-10 pb-4 border-b border-[var(--border)]">
        <div className="font-bold text-lg">Discovery Grid</div>
        <div className="flex gap-4 text-sm font-medium text-[var(--muted-text)]">
          <span>{products.length} Items Found</span>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-[var(--border)] rounded-xl">
          <h2 className="text-lg font-medium mb-2">No deals found here</h2>
          <p className="text-[var(--muted-text)] text-sm mb-6">
            Try searching for other collections!
          </p>
        </div>
      )}

      <div className="mt-20 bg-foreground text-white p-12 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Wait, there's more!</h2>
          <p className="text-white/60">
            New deals are added every single day. Keep checking back.
          </p>
        </div>
        <button className="bg-white text-foreground px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
          View Daily Drops
        </button>
      </div>
    </div>
  );
}
