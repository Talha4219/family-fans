import { Metadata } from "next";
import { getProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

const SALE_TYPES: Record<
  string,
  { label: string; description: string; tag: string }
> = {
  "flash-sale": {
    label: "Flash Sale",
    description:
      "Limited time offers! Grab these deals before the clock runs out.",
    tag: "Flash",
  },
  clearance: {
    label: "Clearance Sale",
    description:
      "Last chance to buy! Premium fans and heaters at unbeatable prices.",
    tag: "Clearance",
  },
  "summer-sale": {
    label: "Summer Sale 2026",
    description:
      "Stay cool with our biggest discounts of the season on all fans.",
    tag: "Summer",
  },
  "winter-sale": {
    label: "Winter Warmth Sale",
    description: "Cozy up with premium heaters at special winter prices.",
    tag: "Winter",
  },
  "black-friday": {
    label: "Black Friday Deals",
    description: "The biggest sale of the year is here. Don't miss out!",
    tag: "Black Friday",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const sale = SALE_TYPES[slug];
  if (!sale) return { title: "Sale Not Found | FamilyFans" };

  return {
    title: `${sale.label} — Exclusive Savings | FamilyFans`,
    description: sale.description,
  };
}

export default async function SalePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const sale = SALE_TYPES[slug];
  if (!sale) notFound();

  const allProducts = await getProducts();
  const products = allProducts.filter((p) => p.discount && p.discount > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Sale", href: "/sale/flash-sale" },
          { label: sale.label },
        ]}
      />

      <div className="bg-gradient-to-r from-red-600 to-lime-600 rounded-3xl p-8 md:p-12 text-white mb-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            Limited Time Promotion
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            {sale.label}
          </h1>
          <p className="text-lg text-white/90 mb-8">{sale.description}</p>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">Up to 70%</span>
              <span className="text-xs uppercase opacity-70">Discount</span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">Free</span>
              <span className="text-xs uppercase opacity-70">Shipping</span>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[20rem] font-black opacity-10 select-none pointer-events-none">
          SALE
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Featured Items</h2>
        <div className="text-sm text-[var(--muted-text)]">
          Showing {products.length} products
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
          <h2 className="text-lg font-medium mb-2">
            No items in this sale yet
          </h2>
          <p className="text-[var(--muted-text)] text-sm">
            Check back again soon!
          </p>
        </div>
      )}
    </div>
  );
}
