import { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Home,
  ShoppingBag,
  Mail,
  Calendar,
  Truck,
  ShieldCheck,
  Zap,
} from "lucide-react";
export const metadata: Metadata = {
  title: "Order Confirmed — ElectroShop Premium",
  description:
    "Your ElectroShop order has been placed successfully. We're preparing your premium electronics for shipment.",
  robots: { index: false, follow: false },
};
export default function OrderConfirmationPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen py-20 px-6">
      {" "}
      <div className="max-w-3xl mx-auto">
        {" "}
        {/* Celebratory Header */}{" "}
        <div className="text-center mb-16 space-y-6">
          {" "}
          <div className="relative inline-block">
            {" "}
            <div className="w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20 relative z-10 animate-in zoom-in duration-700">
              {" "}
              <CheckCircle2 className="w-12 h-12 text-white" />{" "}
            </div>{" "}
            <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl animate-pulse" />{" "}
          </div>{" "}
          <div className="space-y-2">
            {" "}
            <p className="text-xs font-black uppercase tracking-[0.3em] text-lime-600">
              Transaction Successful
            </p>{" "}
            <h1 className="text-5xl font-black text-[zinc-950] tracking-tighter">
              {" "}
              Order Confirmed{" "}
            </h1>{" "}
            <p className="text-slate-400 font-medium text-lg max-w-md mx-auto">
              {" "}
              Thank you for choosing ElectroShop. Your premium technology is on
              its way.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {" "}
          {/* Order Details Card */}{" "}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
            {" "}
            <div className="flex items-center gap-3 text-lime-600">
              {" "}
              <Zap className="w-5 h-5" />{" "}
              <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
                Order Info
              </h3>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <div className="flex justify-between items-center">
                {" "}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Order ID
                </span>{" "}
                <span className="text-sm font-black text-[zinc-950]">
                  #ESH-{(Math.random() * 90000 + 10000).toFixed(0)}
                </span>{" "}
              </div>{" "}
              <div className="flex justify-between items-center">
                {" "}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Date
                </span>{" "}
                <span className="text-sm font-black text-[zinc-950]">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>{" "}
              </div>{" "}
              <div className="flex justify-between items-center">
                {" "}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Payment
                </span>{" "}
                <span className="text-sm font-black text-[zinc-950]">
                  Credit Card •••• 4242
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Delivery Card */}{" "}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
            {" "}
            <div className="flex items-center gap-3 text-lime-600">
              {" "}
              <Truck className="w-5 h-5" />{" "}
              <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
                Delivery
              </h3>{" "}
            </div>{" "}
            <div className="space-y-4">
              {" "}
              <div className="flex justify-between items-center text-sm">
                {" "}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Estimated
                </span>{" "}
                <span className="text-sm font-black text-[zinc-950]">
                  3-5 Business Days
                </span>{" "}
              </div>{" "}
              <div className="flex justify-between items-start text-sm">
                {" "}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Address
                </span>{" "}
                <span className="text-sm font-black text-[zinc-950] text-right">
                  {" "}
                  45HW+XG5,
                  <br /> Rana Colony Kangniwala, Gujranwala{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Next Steps */}{" "}
        <div className="bg-[zinc-950] rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden mb-12">
          {" "}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-600 rounded-full opacity-5 -mr-32 -mt-32" />{" "}
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {" "}
            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center flex-shrink-0 border border-white/5">
              {" "}
              <Mail className="w-8 h-8 text-lime-600" />{" "}
            </div>{" "}
            <div className="flex-grow text-center md:text-left">
              {" "}
              <h4 className="text-xl font-black tracking-tighter mb-2">
                Check your email
              </h4>{" "}
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                {" "}
                We've sent a detailed confirmation to your inbox. You'll receive
                another update once your items have cleared our quality
                inspection and are ready for shipment.{" "}
              </p>{" "}
            </div>{" "}
            <Link
              href="/account/orders"
              className="btn-primary !py-4 !px-8 text-xs whitespace-nowrap shadow-xl shadow-lime-600/20"
            >
              {" "}
              View Order Details{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
        {/* Footer Actions */}{" "}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {" "}
          <Link
            href="/shop"
            className="btn-secondary !bg-white border border-slate-200 !px-10 flex items-center gap-3 group"
          >
            {" "}
            <ShoppingBag className="w-4 h-4 text-lime-600 group-hover:scale-110 transition-transform" />{" "}
            Explore More{" "}
          </Link>{" "}
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[zinc-950] transition-colors flex items-center gap-2"
          >
            {" "}
            <Home className="w-4 h-4" /> Back to Home{" "}
          </Link>{" "}
        </div>{" "}
        {/* Trust Footer */}{" "}
        <div className="mt-20 pt-10 border-t border-slate-200 flex flex-wrap justify-center gap-8 opacity-40">
          {" "}
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            {" "}
            <ShieldCheck className="w-4 h-4" /> Protected Purchase{" "}
          </div>{" "}
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            {" "}
            <Package className="w-4 h-4" /> Premium Packaging{" "}
          </div>{" "}
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            {" "}
            <Calendar className="w-4 h-4" /> 2-Year Warranty{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
