import { Metadata } from "next";

import Link from "next/link";

import {
  Network,
  ShoppingBag,
  Flame,
  Target,
  Crown,
  Info,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "HTML Sitemap — Structural Directory | FamilyFans",
  description:
    "Browse the complete directory of FamilyFans pages. Structural overview of Categories, Sales, Offers, and Global Directives.",
  alternates: {
    canonical: "https://FamilyFans.com/sitemap-page",
  },
};

const SITE_MAP = [
  {
    title: "Structural Shop",
    icon: ShoppingBag,
    color: "text-blue-500",
    links: [
      {
        href: "/shop",
        label: "All Architectural Nodes",
      },
      {
        href: "/shop?category=electronics",
        label: "Electronics Protocol",
      },
      {
        href: "/shop?category=electronics&sub=smartphones",
        label: "Smartphones Node",
      },
      {
        href: "/shop?category=electronics&sub=android-phones",
        label: "Android Systems",
      },
      {
        href: "/shop?category=electronics&sub=iphone",
        label: "iOS Integration",
      },
      {
        href: "/shop?category=electronics&sub=laptops",
        label: "Portable Comms (Laptops)",
      },
      {
        href: "/shop?category=electronics&sub=gaming-laptops",
        label: "High-Performance Compute",
      },
      {
        href: "/shop?category=home-living",
        label: "Environmental Control (Home)",
      },
      {
        href: "/shop?category=home-living&sub=fans",
        label: "Atmospheric Circulation",
      },
      {
        href: "/shop?category=home-living&sub=heaters",
        label: "Thermal Regulation",
      },
    ],
  },
  {
    title: "Inventory Liquidations",
    icon: Flame,
    color: "text-red-500",
    links: [
      {
        href: "/sale",
        label: "Liquidation Dashboard",
      },
      {
        href: "/flash-sale",
        label: "24-Hour Flash Protocol",
      },
      {
        href: "/clearance",
        label: "Final Ingress (Clearance)",
      },
      {
        href: "/summer-sale",
        label: "Seasonal: Summer Release",
      },
      {
        href: "/winter-sale",
        label: "Seasonal: Winter Mitigation",
      },
      {
        href: "/black-friday",
        label: "Holiday: Black Friday",
      },
      {
        href: "/cyber-monday",
        label: "Holiday: Cyber Monday",
      },
      {
        href: "/holiday-sale",
        label: "Holiday: Seasonal Festive",
      },
    ],
  },
  {
    title: "Strategic Offers",
    icon: Target,
    color: "text-lime-600",
    links: [
      {
        href: "/offers",
        label: "Initiative Overview",
      },
      {
        href: "/offers/bundle-deals",
        label: "Bundle Optimizations",
      },
      {
        href: "/offers/buy-one-get-one",
        label: "BOGO Expansion",
      },
      {
        href: "/offers/coupons",
        label: "Digital Vouchers",
      },
      {
        href: "/offers/limited-time-deals",
        label: "Priority Access Windows",
      },
      {
        href: "/offers/referral-offers",
        label: "Referral Ecosystem",
      },
    ],
  },
  {
    title: "Acquisition Tiers",
    icon: Crown,
    color: "text-purple-500",
    links: [
      {
        href: "/deals",
        label: "Primary Deals Portal",
      },
      {
        href: "/deals/best-deals",
        label: "High-Yield Selections",
      },
      {
        href: "/deals/trending",
        label: "Market Velocity Items",
      },
      {
        href: "/deals/under-50",
        label: "Entry-Tier: Under $50",
      },
      {
        href: "/deals/under-100",
        label: "Core-Tier: Under $100",
      },
      {
        href: "/new-arrivals",
        label: "Fresh Ingress (New)",
      },
      {
        href: "/best-sellers",
        label: "High-Volume Catalog",
      },
    ],
  },
  {
    title: "Support & Logistics",
    icon: HelpCircle,
    color: "text-emerald-500",
    links: [
      {
        href: "/contact",
        label: "Comms Center (Contact)",
      },
      {
        href: "/help",
        label: "Resource Hub (Help)",
      },
      {
        href: "/faq",
        label: "Protocol Queries (FAQ)",
      },
      {
        href: "/shipping",
        label: "Logistics Framework",
      },
      {
        href: "/returns",
        label: "Resolution Protocols",
      },
      {
        href: "/track-order",
        label: "Real-time Telemetry",
      },
    ],
  },
  {
    title: "Global Directives",
    icon: ShieldCheck,
    color: "text-slate-400",
    links: [
      {
        href: "/about",
        label: "Origin Story (About)",
      },
      {
        href: "/blog",
        label: "Operational Log (Blog)",
      },
      {
        href: "/affiliate",
        label: "Agent Program (Affiliate)",
      },
      {
        href: "/privacy",
        label: "Data Protection",
      },
      {
        href: "/terms",
        label: "Binding Directives",
      },
      {
        href: "/cookies",
        label: "Tracking Protocols",
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {" "}
      <nav className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2">
        {" "}
        <Link href="/" className="hover:text-lime-600 transition-colors">
          Home
        </Link>{" "}
        <span>/</span>{" "}
        <span className="text-[zinc-950]">Structural Directory</span>{" "}
      </nav>{" "}
      <div className="flex items-center gap-3 mb-12">
        {" "}
        <div className="w-12 h-12 rounded-2xl bg-[zinc-950] flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
          {" "}
          <Network className="w-6 h-6" />{" "}
        </div>{" "}
        <div>
          {" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            Architecture Map
          </h1>{" "}
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Complete structural indexing of the site matrix
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {" "}
        {SITE_MAP.map((group) => (
          <div
            key={group.title}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm"
          >
            {" "}
            <div className="flex items-center gap-3 mb-8">
              {" "}
              <group.icon
                className={`w-5 h-5 ${group.color}
`}
              />{" "}
              <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
                {" "}
                {group.title}
              </h2>{" "}
            </div>{" "}
            <ul className="space-y-4">
              {" "}
              {group.links.map((link) => (
                <li key={link.href}>
                  {" "}
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-lime-600 transition-colors uppercase tracking-[0.1em]"
                  >
                    {" "}
                    <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-lime-600" />{" "}
                    {link.label}
                  </Link>{" "}
                </li>
              ))}
            </ul>{" "}
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
