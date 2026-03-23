import {
  Ticket,
  Plus,
  Search,
  Percent,
  ShieldCheck,
  Trash2,
  Calendar,
  Zap,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import OfferModel from "@/models/Offer";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
async function getCoupons() {
  await dbConnect();
  return await OfferModel.find({}).sort({ createdAt: -1 });
}
export default async function CouponsPage() {
  const coupons = await getCoupons();
  async function deleteCoupon(id: string) {
    "use server";
    await dbConnect();
    await OfferModel.findByIdAndDelete(id);
    revalidatePath("/admin/offers/coupons");
  }
  const activeCount = coupons.filter(
    (c) => c.isActive && new Date(c.expiryDate) > new Date(),
  ).length;
  return (
    <div className="space-y-12">
      {" "}
      {/* Header section with Stats */}{" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Incentive Layer
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Coupon <span className="text-lime-600">Vault</span>{" "}
          </h1>{" "}
        </div>{" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="hidden md:flex flex-col text-right">
            {" "}
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Active Nodes
            </p>{" "}
            <p className="text-xs font-black text-green-500 uppercase tracking-widest">
              {activeCount} Systems Priority
            </p>{" "}
          </div>{" "}
          <Link
            href="/admin/offers/coupons/add"
            className="btn-primary flex items-center gap-3 shadow-xl shadow-lime-600/20"
          >
            {" "}
            <Plus className="w-4 h-4" /> Generate Code{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
      {/* Stats Grid */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {" "}
        {[
          { label: "Active Now", count: activeCount, icon: Zap },
          { label: "Total Issued", count: coupons.length, icon: Ticket },
          {
            label: "Avg Value",
            count:
              coupons.length > 0
                ? (
                    coupons.reduce((sum, c) => sum + c.discountValue, 0) /
                    coupons.length
                  ).toFixed(1)
                : "0",
            icon: Percent,
          },
          {
            label: "Used Sync",
            count: coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0),
            icon: ShieldCheck,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm group hover:border-lime-600 transition-all"
          >
            {" "}
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:bg-lime-50 group-hover:text-lime-600 transition-colors">
              {" "}
              <item.icon className="w-6 h-6" />{" "}
            </div>{" "}
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              {item.label}
            </p>{" "}
            <p className="text-2xl font-black text-[zinc-950]">
              {item.label === "Avg Value" ? `${item.count}%` : item.count}
            </p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {/* List Section */}{" "}
      <div className="bg-white rounded-[3.5rem] p-12 border border-slate-50 shadow-sm space-y-10">
        {" "}
        {coupons.length === 0 ? (
          <div className="py-20 text-center">
            {" "}
            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
              {" "}
              <Ticket className="w-10 h-10 text-slate-200" />{" "}
            </div>{" "}
            <h3 className="text-xl font-black text-[zinc-950] mb-2 uppercase">
              Vault Depleted
            </h3>{" "}
            <p className="text-slate-400 font-medium max-w-xs mx-auto text-xs">
              No active coupon codes detected in the incentive layer.
              Synchronize new codes to begin.
            </p>{" "}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            {coupons.map((coupon) => {
              const isExpired = new Date(coupon.expiryDate) < new Date();
              const isLive = coupon.isActive && !isExpired;
              return (
                <div
                  key={coupon._id}
                  className="p-10 bg-slate-50 rounded-[3rem] group hover:bg-white transition-all border border-transparent hover:border-lime-100 hover:shadow-2xl hover:shadow-lime-600/5 relative overflow-hidden"
                >
                  {" "}
                  <div className="flex items-center justify-between mb-10 relative z-10">
                    {" "}
                    <div className="flex flex-col gap-1">
                      {" "}
                      <span className="px-6 py-2 bg-white rounded-xl text-xs font-black tracking-[0.2em] text-[zinc-950] shadow-sm border border-slate-100 uppercase">
                        {coupon.code}
                      </span>{" "}
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2 ml-1">
                        {coupon.title}
                      </p>{" "}
                    </div>{" "}
                    <div className="flex items-center gap-3">
                      {" "}
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${isLive ? "text-green-500" : "text-slate-400"}`}
                      >
                        {" "}
                        {isLive
                          ? "Live"
                          : isExpired
                            ? "Expired"
                            : "Staged"}{" "}
                      </span>{" "}
                      <form
                        action={deleteCoupon.bind(null, coupon._id.toString())}
                      >
                        {" "}
                        <button className="p-3 bg-white rounded-xl text-slate-300 hover:text-red-500 transition-colors shadow-sm border border-slate-100">
                          {" "}
                          <Trash2 className="w-4 h-4" />{" "}
                        </button>{" "}
                      </form>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-end justify-between relative z-10">
                    {" "}
                    <div>
                      {" "}
                      <p className="text-4xl font-black text-[zinc-950] tracking-tighter">
                        {" "}
                        {coupon.discountType === "percentage"
                          ? `${coupon.discountValue}%`
                          : `$${coupon.discountValue}`}{" "}
                        <span className="text-xs uppercase tracking-widest text-slate-400 ml-2">
                          Off
                        </span>{" "}
                      </p>{" "}
                      <div className="flex items-center gap-2 mt-4">
                        {" "}
                        <CreditCard className="w-3 h-3 text-lime-600" />{" "}
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Min Order: ${coupon.minOrderValue}
                        </p>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="text-right">
                      {" "}
                      <div className="flex items-center justify-end gap-2 mb-1">
                        {" "}
                        <Zap className="w-3 h-3 text-lime-600" />{" "}
                        <p className="text-sm font-black text-[zinc-950] uppercase">
                          {coupon.usageCount || 0}
                          <span className="text-slate-300 mx-1">/</span>
                          {coupon.usageLimit || "∞"}
                        </p>{" "}
                      </div>{" "}
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Redemptions Status
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Subtle expiry indicator */}{" "}
                  <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                    {" "}
                    <div className="flex items-center gap-2">
                      {" "}
                      <Calendar className="w-3 h-3 text-slate-300" />{" "}
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        {" "}
                        Valid until{" "}
                        {new Date(coupon.expiryDate).toLocaleDateString()}{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
              );
            })}{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
