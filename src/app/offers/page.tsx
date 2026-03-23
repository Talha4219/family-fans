import { Metadata } from "next";
import Link from "next/link";
import {
  Gift,
  Package,
  Ticket,
  Clock,
  ArrowRight,
  Zap,
  Target,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
export const metadata: Metadata = {
  title: "FamilyFans Offers — Exclusive Bundles & Coupons",
  description:
    "Maximize your value with FamilyFans's exclusive offers. Explore Bundle Deals, Coupons, BOGO promotions, and more.",
  keywords: [
    "offers",
    "bundle deals",
    "coupons",
    "buy one get one",
    "promotions",
  ],
};
const OFFERS = [
  {
    id: "bundle-deals",
    title: "Bundle Deals",
    description:
      "Cohesive comfort solutions. Perfectly paired units for maximum operational efficiency.",
    href: "/offers/bundle-deals",
    icon: Package,
    color: "bg-blue-500",
    tag: "Efficiency",
  },
  {
    id: "coupons",
    title: "Member Credits",
    description:
      "Digital vouchers and community codes for elite network participants.",
    href: "/offers/coupons",
    icon: Ticket,
    color: "bg-emerald-500",
    tag: "Verified",
  },
  {
    id: "limited-time-deals",
    title: "Priority Windows",
    description: "Time-locked opportunities for high-value acquisitions.",
    href: "/offers/limited-time-deals",
    icon: Clock,
    color: "bg-lime-600",
    tag: "Temporal",
  },
  {
    id: "buy-one-get-one",
    title: "BOGO Interface",
    description:
      "Expansion protocol: Acquire one main unit, receive a secondary node at zero cost.",
    href: "/offers/buy-one-get-one",
    icon: Gift,
    color: "bg-purple-500",
    tag: "Expansion",
  },
];
export default function OffersLandingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {" "}
      <Breadcrumbs items={[{ label: "Offers" }]} />{" "}
      <div className="mb-12">
        {" "}
        <div className="flex items-center gap-2 mb-3">
          {" "}
          <Target className="w-5 h-5 text-lime-600" />{" "}
          <span className="text-xs uppercase tracking-[0.2em] font-black text-lime-600">
            Value Optimization
          </span>{" "}
        </div>{" "}
        <h1 className="text-4xl md:text-6xl font-black text-[zinc-950] tracking-tighter mb-4 uppercase">
          {" "}
          Strategic <span className="text-lime-600">Initiatives</span>{" "}
        </h1>{" "}
        <p className="text-lg text-slate-500 max-w-2xl">
          {" "}
          High-yield acquisition programs designed for members seeking optimized
          environment control at scale.{" "}
        </p>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {" "}
        {OFFERS.map((offer) => (
          <Link
            key={offer.id}
            href={offer.href}
            className="group flex flex-col justify-between p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-lime-600/20 hover:shadow-2xl transition-all"
          >
            {" "}
            <div>
              {" "}
              <div className="flex justify-between items-center mb-8">
                {" "}
                <div
                  className={`w-12 h-12 rounded-2xl ${offer.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {" "}
                  <offer.icon className="w-6 h-6" />{" "}
                </div>{" "}
                <span className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-slate-50 rounded-md text-slate-400 group-hover:text-lime-600 transition-colors">
                  {" "}
                  {offer.tag}{" "}
                </span>{" "}
              </div>{" "}
              <h2 className="text-lg font-black text-[zinc-950] mb-3 uppercase tracking-tight leading-none group-hover:text-lime-600 transition-colors">
                {" "}
                {offer.title}{" "}
              </h2>{" "}
              <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                {" "}
                {offer.description}{" "}
              </p>{" "}
            </div>{" "}
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[zinc-950] group-hover:gap-4 transition-all">
              {" "}
              Initiate <ArrowRight className="w-4 h-4" />{" "}
            </div>{" "}
          </Link>
        ))}{" "}
      </div>{" "}
      {/* Premium Rewards Panel */}{" "}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {" "}
        <div className="lg:col-span-2 bg-gradient-to-br from-[zinc-950] to-slate-800 rounded-[3rem] p-10 md:p-12 text-white flex flex-col md:flex-row gap-10 items-center border border-white/5">
          {" "}
          <div className="w-24 h-24 rounded-[2rem] bg-lime-600 flex items-center justify-center shrink-0 shadow-2xl shadow-lime-600/20">
            {" "}
            <Zap className="w-12 h-12 text-white" />{" "}
          </div>{" "}
          <div className="text-center md:text-left">
            {" "}
            <h3 className="text-2xl font-black mb-3 uppercase tracking-tighter">
              Referral Protocol 2.0
            </h3>{" "}
            <p className="text-slate-400 text-sm mb-6 max-w-md">
              Distribute specialized comfort links to your social network. Each
              verified acquisition grants you $25 in operational credit.
            </p>{" "}
            <Link
              href="/offers/referral-offers"
              className="inline-flex items-center gap-2 text-lime-600 text-xs font-black uppercase tracking-[0.2em] hover:gap-4 transition-all"
            >
              {" "}
              Access Portal <ArrowRight className="w-4 h-4" />{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
        <div className="bg-white border border-slate-100 rounded-[3rem] p-10 flex flex-col justify-center text-center shadow-sm">
          {" "}
          <h3 className="text-6xl font-black text-[zinc-950] mb-2 tracking-tighter">
            -15%
          </h3>{" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
            Baseline Reduction
          </p>{" "}
          <p className="text-[10px] text-slate-300 uppercase font-black leading-relaxed">
            System-wide discount applied to your inaugural acquisition upon
            newsletter synchronization.
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
