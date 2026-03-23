import { getCoupons } from "@/lib/actions";

import { Ticket, ShieldCheck, Zap, Sparkles, Copy, Timer } from "lucide-react";

import PageAnimate from "@/components/PageAnimate";

export const metadata = {
  title: "Coupon Vault | Exclusive Member Incentives",
  description:
    "Access our exclusive collection of promotional codes. Precision savings for premium gear acquisitions.",
};

export default async function PublicCouponsPage() {
  // We need to implement or use an existing getCoupons that fetches active public coupons
  // For now, we'll use a fetch logic similar to the admin page but filtered
  const coupons = await getCoupons();

  const activeCoupons = coupons.filter(
    (c: any) => c.isActive && new Date(c.expiryDate) > new Date(),
  );

  return (
    <PageAnimate>
      {" "}
      <div className="min-h-screen bg-[#F8FAFC]">
        {" "}
        {/* SEO Header */}
        <div className="bg-[zinc-950] text-white py-24 relative overflow-hidden">
          {" "}
          <div className="absolute top-0 right-0 p-12 opacity-10">
            {" "}
            <Ticket className="w-80 h-80 rotate-12" />{" "}
          </div>{" "}
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            {" "}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-600/10 border border-lime-600/20 text-lime-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              {" "}
              <ShieldCheck className="w-3 h-3" /> Authentication Layer:
              Exclusive{" "}
            </div>{" "}
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">
              {" "}
              The <span className="text-lime-600">Vault</span>{" "}
            </h1>{" "}
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">
              {" "}
              High-precision promotional codes for the elite tier. Sequential
              pricing logic automatically applies these at the final stage.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="max-w-7xl mx-auto px-6 -mt-12 pb-24">
          {" "}
          <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
            {" "}
            <div className="flex items-center gap-4 mb-12">
              {" "}
              <div className="w-12 h-12 rounded-2xl bg-lime-50 flex items-center justify-center text-lime-600">
                {" "}
                <Zap className="w-6 h-6" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h2 className="text-2xl font-black text-[zinc-950] tracking-tighter uppercase">
                  Active Incentives
                </h2>{" "}
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {activeCoupons.length}
                  Redemption Nodes
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {activeCoupons.length === 0 ? (
              <div className="py-24 text-center">
                {" "}
                <h3 className="text-2xl font-black text-[zinc-950] mb-4 uppercase">
                  Vault Locked
                </h3>{" "}
                <p className="text-slate-400 max-w-sm mx-auto">
                  No public incentive codes are currently active. Join our
                  newsletter for priority access.
                </p>{" "}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {" "}
                {activeCoupons.map((coupon: any) => (
                  <div
                    key={coupon._id.toString()}
                    className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-lime-200 hover:shadow-2xl hover:shadow-lime-600/5 transition-all relative overflow-hidden"
                  >
                    {" "}
                    <div className="flex items-start justify-between mb-8">
                      {" "}
                      <div>
                        {" "}
                        <p className="text-4xl font-black text-[zinc-950] tracking-tighter group-hover:text-lime-600 transition-colors">
                          {" "}
                          {coupon.discountType === "percentage"
                            ? `${coupon.discountValue}
%`
                            : `$${coupon.discountValue}
`}
                          <span className="text-xs uppercase tracking-widest text-slate-400 ml-2">
                            Off
                          </span>{" "}
                        </p>{" "}
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                          {coupon.title}
                        </p>{" "}
                      </div>{" "}
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-300 group-hover:text-lime-600 transition-colors">
                        {" "}
                        <Sparkles className="w-6 h-6" />{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex items-center gap-2 mb-8">
                      {" "}
                      <Timer className="w-3 h-3 text-slate-300" />{" "}
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        {" "}
                        Valid until{" "}
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                      </p>{" "}
                    </div>{" "}
                    <div className="flex items-center justify-between gap-4">
                      {" "}
                      <div className="flex-grow bg-white border border-slate-100 rounded-xl px-6 py-4 text-center">
                        {" "}
                        <span className="text-lg font-black tracking-[0.2em] text-[zinc-950]">
                          {coupon.code}
                        </span>{" "}
                      </div>{" "}
                      <button className="p-4 bg-[zinc-950] text-white rounded-xl hover:bg-lime-600 transition-colors shadow-lg">
                        {" "}
                        <Copy className="w-5 h-5" />{" "}
                      </button>{" "}
                    </div>{" "}
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center mt-6">
                      {" "}
                      * Min Order: ${coupon.minOrderValue}| Single Usage{" "}
                    </p>{" "}
                  </div>
                ))}
              </div>
            )}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </PageAnimate>
  );
}
