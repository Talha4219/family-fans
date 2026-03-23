import { Ticket, Zap, Percent, Bell, Plus, Filter } from "lucide-react";
import Link from "next/link";
export default function OffersPage() {
  return (
    <div className="space-y-12">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Promotional Interface
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter">
            {" "}
            Offers &{" "}
            <span className="text-lime-600 uppercase">Discounts</span>{" "}
          </h1>{" "}
        </div>{" "}
        <div className="flex items-center gap-3">
          {" "}
          <button className="btn-secondary !px-6">
            <Filter className="w-4 h-4" />
          </button>{" "}
          <Link
            href="/admin/offers/coupons"
            className="btn-primary flex items-center gap-3"
          >
            {" "}
            <Plus className="w-4 h-4" /> New Promotion{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {" "}
        {[
          {
            label: "Active Codes",
            val: "12",
            icon: Ticket,
            sub: "BLACKFRIDAY25 +11",
            link: "/admin/offers/coupons",
          },
          {
            label: "Flash Events",
            val: "2",
            icon: Zap,
            sub: "Ends in 4h 20m",
            link: "/admin/offers/deals",
          },
          {
            label: "Direct Sales",
            val: "5",
            icon: Percent,
            sub: "Automatic Discounts",
            link: "/admin/offers/sales",
          },
          {
            label: "Redemptions",
            val: "840",
            icon: Bell,
            sub: "Last 30 Days",
            link: "#",
          },
        ].map((item) => (
          <Link
            href={item.link || "#"}
            key={item.label}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm group hover:border-lime-600 transition-all block"
          >
            {" "}
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:bg-lime-50 group-hover:text-lime-600 transition-colors">
              {" "}
              <item.icon className="w-6 h-6" />{" "}
            </div>{" "}
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              {item.label}
            </p>{" "}
            <p className="text-2xl font-black text-[zinc-950] leading-tight mb-2 tracking-tighter uppercase">
              {item.val}
            </p>{" "}
            <p className="text-[10px] font-black text-lime-600 uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
              {item.sub}
            </p>{" "}
          </Link>
        ))}{" "}
      </div>{" "}
      <div className="bg-[zinc-950] rounded-[3rem] p-12 text-white overflow-hidden relative group">
        {" "}
        <div className="relative z-10">
          {" "}
          <h2 className="text-2xl font-black tracking-tighter mb-4 uppercase">
            Advanced <span className="text-lime-600 text-3xl">Control</span>
          </h2>{" "}
          <div className="flex flex-wrap gap-4 mt-8">
            {" "}
            <Link
              href="/admin/offers/sales"
              className="px-8 py-4 bg-lime-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-lime-700 transition-colors"
            >
              Manage Direct Sales
            </Link>{" "}
            <Link
              href="/admin/offers/deals"
              className="px-8 py-4 bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              Configure Flash Deals
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
