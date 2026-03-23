import { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/actions";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import PageAnimate from "@/components/PageAnimate";
import ShopClientSection from "@/components/ShopClientSection";

export const metadata: Metadata = {
  title: "Shop All Products — FamilyFans",
  description: "Browse our full collection of premium fans and heaters. Engineered for excellence.",
};

export default async function ShopPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <PageAnimate>
      <div className="bg-[#FBFCFD] min-h-screen">
        {/* Header Section */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 pt-12 pb-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10">
              <Link href="/" className="hover:text-lime-600 transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" />
              </Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <span className="text-lime-600">Shop</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-black text-[zinc-950] tracking-tighter uppercase leading-[0.9] mb-6">
                  Our <span className="text-lime-600">Collection</span>
                </h1>
                <p className="text-slate-500 font-medium text-xl leading-relaxed max-w-2xl">
                  Discover our curated selection of premium home appliances — designed for style and performance.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] flex flex-col flex-shrink-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Available
                </span>
                <span className="text-2xl font-black text-[zinc-950]">
                  {products.length} <span className="text-lime-600">Products</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <ShopClientSection products={products} categories={categories} />
        </div>
      </div>
    </PageAnimate>
  );
}
