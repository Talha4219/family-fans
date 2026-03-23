import {
  Zap,
  Plus,
  Search,
  Clock,
  Box,
  Calendar,
  Trash2,
  Edit,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { getDeals, deleteDeal } from "@/lib/actions";
import { Deal, BlogPost } from "@/lib/types";
export default async function DealsPage() {
  const deals = await getDeals();
  const activeDeals = deals.filter(
    (d: BlogPost | Deal) => (d as Deal).isActive && new Date((d as Deal).endDate) > new Date(),
  ).length;
  async function handleDelete(id: string) {
    "use server";
    await deleteDeal(id);
  }
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Temporal Promotions
          </p>
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            Flash <span className="text-lime-600">Deals</span>
          </h1>
        </div>
        <Link
          href="/admin/offers/deals/add"
          className="btn-primary flex items-center gap-3"
        >
          <Plus className="w-4 h-4" /> New Deal Node
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Active Now", count: activeDeals, icon: Zap },
          { label: "Total Nodes", count: deals.length, icon: Box },
          {
            label: "Scheduled",
            count: deals.filter((d: Deal) => new Date(d.startDate) > new Date())
              .length,
            icon: Calendar,
          },
          {
            label: "Expired",
            count: deals.filter((d: Deal) => new Date(d.endDate) < new Date()).length,
            icon: Clock,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm group hover:border-lime-600 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:bg-lime-50 group-hover:text-lime-600 transition-colors">
              <item.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              {item.label}
            </p>
            <p className="text-2xl font-black text-[zinc-950]">
              {item.count}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search flash deals..."
              className="bg-transparent border-none text-sm font-black text-[zinc-950] focus:ring-0 w-full"
            />
          </div>
        </div>
        {deals.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-[zinc-950] mb-2 uppercase">
              No pulse detected
            </h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm">
              Temporal promotions are currently inactive. Click 'New Deal Node'
              to synchronize.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-slate-50"><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Deal Title</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Products</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Discount</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Timeline</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Sync Status</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th></tr></thead>
              <tbody>
                {deals.map((deal) => (
                  <tr
                    key={deal.id}
                    className="border-b border-slate-50/50 hover:bg-slate-50/50 transition-colors"
                  ><td className="px-8 py-6">
                      <p className="text-sm font-black text-[zinc-950] uppercase tracking-tight">
                        {deal.title}
                      </p>
                    </td><td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Box className="w-3 h-3 text-slate-400" />
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          {deal.productIds.length} Targeted
                        </p>
                      </div>
                    </td><td className="px-8 py-6">
                      <span className="px-3 py-1 bg-lime-600 text-white text-[10px] font-black rounded-lg shadow-lg shadow-lime-600/10">
                        {deal.discountType === "percentage"
                          ? `-${deal.discountValue}%`
                          : `-$${deal.discountValue}`}
                      </span>
                    </td><td className="px-8 py-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {new Date(deal.startDate).toLocaleString([], {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    </td><td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${deal.isActive && new Date(deal.endDate) > new Date() ? "bg-lime-600 animate-pulse" : "bg-slate-300"}`}
                        />
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest ${deal.isActive && new Date(deal.endDate) > new Date() ? "text-lime-600" : "text-slate-400"}`}
                        >
                          {deal.isActive && new Date(deal.endDate) > new Date()
                            ? "Processing"
                            : "Terminated"}
                        </span>
                      </div>
                    </td><td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-lime-600 shadow-sm border border-transparent hover:border-slate-100">
                          <Edit className="w-4 h-4" />
                        </button>
                        <form
                          action={handleDelete.bind(null, deal.id)}
                        >
                          <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-red-500 shadow-sm border border-transparent hover:border-slate-100">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
