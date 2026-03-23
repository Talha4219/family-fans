import { getProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
import { Zap, Timer, Sparkles, Boxes } from "lucide-react";
import PageAnimate from "@/components/PageAnimate";
export const metadata = {
  title: "Flash Deals | Limited Time Precision Offers",
  description:
    "High-velocity deals on premium gear. Act fast, these offers expire as the clock ticks down.",
};
export default async function DealsPage() {
  const products = await getProducts();
  const dealProducts = products.filter((p) => p.deal);
  return (
    <PageAnimate>
      {" "}
      <div className="min-h-screen bg-[#F8FAFC]">
        {" "}
        {/* SEO Header */}{" "}
        <div className="bg-[zinc-950] text-white py-24 relative overflow-hidden">
          {" "}
          <div className="absolute top-0 left-0 p-12 opacity-10">
            {" "}
            <Zap className="w-80 h-80" />{" "}
          </div>{" "}
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            {" "}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-600/10 border border-lime-600/20 text-lime-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              {" "}
              <Timer className="w-3 h-3 animate-pulse" /> Temporal Engine
              Synchronized{" "}
            </div>{" "}
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">
              {" "}
              Flash <span className="text-lime-600">Deals</span>{" "}
            </h1>{" "}
            <p className="text-slate-200 font-medium text-lg max-w-2xl mx-auto">
              {" "}
              Time-sensitive hardware nodes optimized for immediate acquisition.
              Redemption windows are terminating.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="max-w-7xl mx-auto px-6 -mt-12 pb-24">
          {" "}
          <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
            {" "}
            <div className="flex items-center gap-4 mb-12">
              {" "}
              <div className="w-12 h-12 rounded-2xl bg-lime-600 flex items-center justify-center text-white shadow-lg shadow-lime-600/20">
                {" "}
                <Zap className="w-6 h-6" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h2 className="text-2xl font-black text-[zinc-950] tracking-tighter uppercase">
                  Live Nodes
                </h2>{" "}
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {dealProducts.length} Priority Vectors
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {dealProducts.length === 0 ? (
              <div className="py-24 text-center">
                {" "}
                <Boxes className="w-16 h-16 text-slate-100 mx-auto mb-6" />{" "}
                <h3 className="text-2xl font-black text-[zinc-950] mb-4 uppercase">
                  All Systems Neutral
                </h3>{" "}
                <p className="text-slate-400 max-w-sm mx-auto">
                  The flash deal engine is cooling down. No active temporal
                  nodes detected.
                </p>{" "}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {" "}
                {dealProducts.map((product) => (
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
