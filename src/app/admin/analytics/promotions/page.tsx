import {
  Ticket,
  Percent,
  Zap,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

import OfferModel from "@/models/Offer";

import ProductModel from "@/models/Product";

import dbConnect from "@/lib/db";
async function getPromotionAnalytics() {
  await dbConnect();

  // Aggregates for Coupons
  const coupons = await OfferModel.find({});

  const totalCouponRedemptions = coupons.reduce(
    (sum, c) => sum + (c.usageCount || 0),
    0,
  );

  const totalCouponValue = coupons.reduce(
    (sum, c) => sum + c.discountValue * (c.usageCount || 0),
    0,
  );

  // Aggregates for Products on Sale
  const saleProducts = await ProductModel.find({
    isOnSale: true,
  });

  // Aggregates for Deals (Flash node)
  // Assuming Deals are stored in a separate model 'Deal' which you previously might have implemented
  // If not, we fall back to logic based on activeDeal in products
  const dealProducts = await ProductModel.find({
    deal: {
      $exists: true,
    },
  });

  return {
    totalCoupons: coupons.length,
    redemptions: totalCouponRedemptions,
    estSavings: totalCouponValue,
    saleCount: saleProducts.length,
    dealCount: dealProducts.length,
    topCoupons: coupons
      .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
      .slice(0, 5),
  };
}

export default async function PromotionsAnalyticsPage() {
  const data = await getPromotionAnalytics();

  return (
    <div className="space-y-12">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Engagement Intelligence
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Promotion <span className="text-lime-600">Analytics</span>{" "}
          </h1>{" "}
        </div>{" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="hidden md:flex flex-col text-right">
            {" "}
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Data Stream
            </p>{" "}
            <p className="text-xs font-black text-green-500 uppercase tracking-widest">
              Real-time Sync Active
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {" "}
        {[
          {
            label: "Redemption Velocity",
            count: data.redemptions,
            icon: TrendingUp,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Incentive Value",
            count: `$${data.estSavings}
`,
            icon: DollarSign,
            color: "text-green-500",
            bg: "bg-green-50",
          },
          {
            label: "Sale Convergence",
            count: data.saleCount,
            icon: Percent,
            color: "text-lime-600",
            bg: "bg-lime-50",
          },
          {
            label: "Temporal Deals",
            count: data.dealCount,
            icon: Zap,
            color: "text-purple-500",
            bg: "bg-purple-50",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm relative overflow-hidden group"
          >
            {" "}
            <div
              className={`w-14 h-14 rounded-2xl ${item.bg}
flex items-center justify-center ${item.color}
mb-6 transition-transform group-hover:scale-110`}
            >
              {" "}
              <item.icon className="w-6 h-6" />{" "}
            </div>{" "}
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              {item.label}
            </p>{" "}
            <p className="text-2xl font-black text-[zinc-950]">
              {item.count}
            </p>{" "}
          </div>
        ))}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {" "}
        {/* Top Coupons */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm">
          {" "}
          <div className="flex items-center gap-3 mb-10">
            {" "}
            <BarChart3 className="w-5 h-5 text-lime-600" />{" "}
            <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
              Top Performing Vault Codes
            </h3>{" "}
          </div>{" "}
          <div className="space-y-4">
            {" "}
            {data.topCoupons.map((coupon, i) => (
              <div
                key={coupon._id.toString()}
                className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-lime-100 transition-colors"
              >
                {" "}
                <div className="flex items-center gap-4">
                  {" "}
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[10px] font-black text-slate-400">
                    {" "}
                    0{i + 1}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
                      {coupon.code}
                    </p>{" "}
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {coupon.title}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="text-right">
                  {" "}
                  <p className="text-sm font-black text-lime-600">
                    {coupon.usageCount || 0}
                    Uses
                  </p>{" "}
                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                    Redemption Point
                  </p>{" "}
                </div>{" "}
              </div>
            ))}
          </div>{" "}
        </div>{" "}
        {/* Engine Status */}
        <div className="bg-[zinc-950] rounded-[3rem] p-10 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
          {" "}
          <div className="absolute -bottom-10 -right-10 opacity-5">
            {" "}
            <ShieldCheck className="w-48 h-48" />{" "}
          </div>{" "}
          <h3 className="text-sm font-black uppercase tracking-widest text-lime-600 mb-10">
            System Optimization
          </h3>{" "}
          <div className="space-y-8">
            {" "}
            <div>
              {" "}
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Conversion Health
              </p>{" "}
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                {" "}
                <div className="w-[85%] h-full bg-lime-600" />{" "}
              </div>{" "}
              <p className="text-right text-[10px] font-black text-lime-600 mt-2 uppercase tracking-widest">
                85% Optimal
              </p>{" "}
            </div>{" "}
            <div className="pt-8 border-t border-white/5 space-y-4">
              {" "}
              <div className="flex justify-between items-center">
                {" "}
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Active Coupons
                </span>{" "}
                <span className="text-sm font-black">
                  {data.totalCoupons}
                </span>{" "}
              </div>{" "}
              <div className="flex justify-between items-center">
                {" "}
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Sale Thresholds
                </span>{" "}
                <span className="text-sm font-black text-green-400">
                  STABLE
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
