import {
  Ticket,
  Plus,
  Search,
  Trash2,
  Edit,
  Calendar,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { getSales, deleteSale } from "@/lib/actions";

export default async function SalesPage() {
  const sales = await getSales();
  const activeSalesCount = sales.filter(
    (s: any) => s.isActive && new Date(s.endDate) > new Date(),
  ).length;

  async function handleDelete(id: string) {
    "use server";
    await deleteSale(id);
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Store Promotions
          </p>
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            Price <span className="text-lime-600">Sales</span>
          </h1>
        </div>
        <Link
          href="/admin/offers/sales/add"
          className="btn-primary flex items-center gap-3"
        >
          <Plus className="w-4 h-4" /> Create New Sale
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Active Sales
          </p>
          <p className="text-3xl font-black text-[zinc-950]">
            {activeSalesCount}
          </p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Total Managed
          </p>
          <p className="text-3xl font-black text-[zinc-950]">
            {sales.length}
          </p>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/10 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Next Cycle
          </p>
          <p className="text-3xl font-black text-white uppercase tracking-tighter">
            Automatic
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search sales..."
              className="bg-transparent border-none text-sm font-black text-[zinc-950] focus:ring-0 w-full"
            />
          </div>
        </div>

        {sales.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-8 h-8 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-[zinc-950] mb-2 uppercase">
              No sales found
            </h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm">
              You haven&apos;t created any scheduled sales yet. Click &apos;Create New Sale&apos; to begin.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50"><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Sale Name</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Target</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Value</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th><th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th></tr>
              </thead>
              <tbody>
                {sales.map((sale: any) => (
                  <tr key={sale._id} className="border-b border-slate-50/50 hover:bg-slate-50/50 transition-colors"><td className="px-8 py-6">
                      <p className="text-sm font-black text-[zinc-950] uppercase tracking-tight">
                        {sale.name}
                      </p>
                    </td><td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3 text-slate-400" />
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          {sale.applyTo === "all"
                            ? "Entire Store"
                            : sale.applyTo === "category"
                              ? `${sale.categoryIds.length} Categories`
                              : `${sale.productIds.length} Products`}
                        </p>
                      </div>
                    </td><td className="px-8 py-6">
                      <span className="px-3 py-1 bg-lime-50 text-lime-600 text-[10px] font-black rounded-lg">
                        {sale.discountType === "percentage"
                          ? `-${sale.discountValue}%`
                          : `-Rs. ${sale.discountValue}`}
                      </span>
                    </td><td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <p className="text-[10px] font-black uppercase tracking-widest">
                          {new Date(sale.startDate).toLocaleDateString()} - {new Date(sale.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td><td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${sale.isActive ? "bg-emerald-500" : "bg-slate-300"}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${sale.isActive ? "text-emerald-600" : "text-slate-400"}`}>
                          {sale.isActive ? "Live" : "Inactive"}
                        </span>
                      </div>
                    </td><td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/offers/sales/${sale._id}/edit`}
                          className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-lime-600 shadow-sm"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={handleDelete.bind(null, sale._id.toString())}>
                          <button
                            type="submit"
                            className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-red-500 shadow-sm"
                          >
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
