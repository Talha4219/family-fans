import { getProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import { Sparkles, Percent, Tag, Zap } from "lucide-react";
import PageAnimate from "@/components/PageAnimate";
export const metadata = {
  title: "On Sale | Premium Gear & Incredible Savings",
  description:
    "Discover the best deals on premium gear. Limited time offers and seasonal sales across all categories.",
};
export default async function SalePage() {
  const products = await getProducts();
  const saleProducts = products.filter((p) => p.isOnSale);
  return (
    <PageAnimate>
      {" "}
      <div className="min-h-screen bg-[#F8FAFC]">
        {" "}
        {/* SEO Header */}{" "}
        <div className="bg-white border-b border-slate-100 py-24 relative overflow-hidden">
          {" "}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] animate-pulse">
            {" "}
            <Percent className="w-64 h-64 text-[zinc-950]" />{" "}
          </div>{" "}
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            {" "}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-600/10 border border-lime-600/20 text-lime-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              {" "}
              <Sparkles className="w-3 h-3" /> Incentive Layer Activated{" "}
            </div>{" "}
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 text-[zinc-950]">
              The <span className="text-lime-600">Sale</span> Sector
            </h1>{" "}
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
              {" "}
              Precision-engineered discounts on world-class gear. Sequential
              pricing active: Sale + Deal + Coupon stackable.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="max-w-7xl mx-auto px-6 -mt-12 pb-24">
          {" "}
          {/* Discovery UI */}{" "}
          <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
            {" "}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              {" "}
              <div className="flex items-center gap-4">
                {" "}
                <div className="w-12 h-12 rounded-2xl bg-lime-50 flex items-center justify-center text-lime-600">
                  {" "}
                  <Tag className="w-6 h-6" />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h2 className="text-2xl font-black text-[zinc-950] tracking-tighter uppercase">
                    Active Nodes
                  </h2>{" "}
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {saleProducts.length} Items Detected
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="flex items-center gap-3">
                {" "}
                <div className="hidden md:block text-right">
                  {" "}
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Global Status
                  </p>{" "}
                  <p className="text-xs font-black text-green-500 uppercase tracking-widest">
                    Optimization High
                  </p>{" "}
                </div>{" "}
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-300">
                  {" "}
                  <Zap className="w-5 h-5" />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {saleProducts.length === 0 ? (
              <div className="py-24 text-center">
                {" "}
                <h3 className="text-2xl font-black text-[zinc-950] mb-4 uppercase">
                  No Active Reductions
                </h3>{" "}
                <p className="text-slate-400 max-w-sm mx-auto">
                  The sale sector is currently at base capacity. Synchronize
                  later for new incentives.
                </p>{" "}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {" "}
                {saleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </PageAnimate>
  );
}
